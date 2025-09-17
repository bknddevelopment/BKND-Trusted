// Business API endpoints - List and Create

import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import {
  successResponse,
  createdResponse,
  errorResponse,
  validationErrorResponse,
  serverErrorResponse,
  paginatedResponse,
  rateLimitExceededResponse,
} from '@/utils/api-response'
import {
  validateRequest,
  paginationSchema,
  businessFiltersSchema,
  createBusinessSchema,
} from '@/utils/validation'
import { withAuth, withOptionalAuth } from '@/middleware/auth'
import { checkRateLimit } from '@/utils/rate-limit'
import { cache, cacheKeys, CACHE_TTL } from '@/utils/cache'

const prisma = new PrismaClient()

// GET /api/businesses - List businesses with filters
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip || 'anonymous'
    const rateLimit = await checkRateLimit(identifier, 'public')

    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.info)
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const queryParams = Object.fromEntries(searchParams.entries())

    // Validate pagination parameters
    const paginationResult = await validateRequest(paginationSchema, {
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    })

    if (!paginationResult.success) {
      return validationErrorResponse(paginationResult.errors)
    }

    // Validate filter parameters
    const filtersResult = await validateRequest(businessFiltersSchema, queryParams)

    if (!filtersResult.success) {
      return validationErrorResponse(filtersResult.errors)
    }

    const { page, pageSize, sortBy, sortOrder } = paginationResult.data
    const filters = filtersResult.data

    // Check cache
    const cacheKey = cacheKeys.businessList({ ...filters, page, pageSize, sortBy, sortOrder })
    const cached = await cache.get(cacheKey)

    if (cached) {
      return paginatedResponse(
        cached.businesses,
        page,
        pageSize,
        cached.total,
        { 'X-Cache': 'HIT' }
      )
    }

    // Build query conditions
    const where: any = {}

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    if (filters.category) {
      where.services = {
        some: {
          category: {
            slug: filters.category,
          },
        },
      }
    }

    if (filters.city) {
      where.city = {
        slug: filters.city,
      }
    }

    if (filters.state) {
      where.state = {
        code: filters.state,
      }
    }

    if (filters.zipCode) {
      where.postal_code = filters.zipCode
    }

    if (filters.verified !== undefined) {
      where.status = filters.verified ? 'VERIFIED' : 'PENDING'
    }

    if (filters.priceRange) {
      where.price_range = filters.priceRange
    }

    if (filters.minRating) {
      where.average_rating = {
        gte: filters.minRating,
      }
    }

    if (filters.emergency) {
      where.offers_emergency = true
    }

    // Geolocation search
    if (filters.lat && filters.lng && filters.radius) {
      // For PostgreSQL with PostGIS, we would use ST_DWithin
      // For now, we'll use a simple bounding box
      const radiusInDegrees = filters.radius / 69 // Approximate miles to degrees

      where.latitude = {
        gte: filters.lat - radiusInDegrees,
        lte: filters.lat + radiusInDegrees,
      }
      where.longitude = {
        gte: filters.lng - radiusInDegrees,
        lte: filters.lng + radiusInDegrees,
      }
    }

    // Only show active/verified businesses
    where.status = { in: ['VERIFIED', 'PENDING'] }

    // Execute queries
    const [businesses, total] = await Promise.all([
      prisma.business.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: sortBy
          ? { [sortBy]: sortOrder }
          : [{ display_priority: 'desc' }, { average_rating: 'desc' }],
        include: {
          services: {
            include: {
              category: true,
              service_type: true,
            },
          },
          city: true,
          state: true,
          media: {
            where: { is_primary: true },
            take: 1,
          },
        },
      }),
      prisma.business.count({ where }),
    ])

    // Transform data for response
    const transformedBusinesses = businesses.map((business) => ({
      id: business.id,
      name: business.name,
      slug: business.slug,
      description: business.short_description,
      status: business.status,
      verified: business.status === 'VERIFIED',
      verificationLevel: business.verification_level,
      location: {
        address: business.address_line1,
        city: business.city?.name,
        state: business.state.name,
        zipCode: business.postal_code,
        latitude: business.latitude,
        longitude: business.longitude,
      },
      contact: {
        email: business.email,
        phone: business.phone,
        website: business.website,
      },
      rating: business.average_rating,
      reviewCount: business.total_reviews,
      priceRange: business.price_range,
      emergency: business.offers_emergency,
      services: business.services.map((s) => ({
        category: s.category.name,
        categorySlug: s.category.slug,
        serviceType: s.service_type?.name,
      })),
      image: business.media[0]?.url || business.logo_url,
    }))

    // Cache the result
    await cache.set(
      cacheKey,
      { businesses: transformedBusinesses, total },
      CACHE_TTL.MEDIUM
    )

    return paginatedResponse(
      transformedBusinesses,
      page,
      pageSize,
      total,
      { 'X-Cache': 'MISS' }
    )
  } catch (error) {
    return serverErrorResponse(error)
  }
}

// POST /api/businesses - Create a new business
export async function POST(request: NextRequest) {
  try {
    // Authentication required
    const authResult = await withAuth(request, 'BUSINESS_OWNER')

    if (!authResult.success) {
      return authResult.response
    }

    const { user } = authResult

    // Rate limiting
    const rateLimit = await checkRateLimit(user.userId, 'authenticated')

    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.info)
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = await validateRequest(createBusinessSchema, body)

    if (!validationResult.success) {
      return validationErrorResponse(validationResult.errors)
    }

    const data = validationResult.data

    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Check if slug already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { slug },
    })

    if (existingBusiness) {
      return errorResponse({
        code: 'DUPLICATE_BUSINESS',
        message: 'A business with this name already exists',
      })
    }

    // Find or create location references
    const [state, city] = await Promise.all([
      prisma.state.findUnique({
        where: { code: data.state },
      }),
      data.city
        ? prisma.city.findFirst({
            where: {
              slug: data.city.toLowerCase().replace(/\s+/g, '-'),
              state: { code: data.state },
            },
          })
        : null,
    ])

    if (!state) {
      return errorResponse({
        code: 'INVALID_STATE',
        message: 'Invalid state code',
      })
    }

    // Create the business
    const business = await prisma.business.create({
      data: {
        name: data.name,
        slug,
        legal_name: data.legalName,
        email: data.email,
        phone: data.phone,
        website: data.website,
        description: data.description,
        short_description: data.shortDescription,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2,
        city_id: city?.id,
        state_id: state.id,
        postal_code: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
        service_radius_miles: data.serviceRadiusMiles,
        year_established: data.yearEstablished,
        employee_count: data.employeeCount,
        price_range: data.priceRange,
        accepts_credit_cards: data.acceptsCreditCards,
        accepts_cash: data.acceptsCash,
        accepts_check: data.acceptsCheck,
        is_licensed: data.isLicensed,
        is_insured: data.isInsured,
        is_bonded: data.isBonded,
        license_number: data.licenseNumber,
        insurance_amount: data.insuranceAmount,
        offers_emergency: data.offersEmergency,
        emergency_fee: data.emergencyFee,
        owner_id: user.userId,
        status: 'PENDING', // New businesses start as pending
      },
      include: {
        state: true,
        city: true,
      },
    })

    // Add services
    if (data.serviceTypeIds && data.serviceTypeIds.length > 0) {
      await prisma.businessService.createMany({
        data: data.serviceTypeIds.map((serviceTypeId, index) => ({
          business_id: business.id,
          category_id: data.categoryId,
          service_type_id: serviceTypeId,
          is_primary: index === 0,
        })),
      })
    } else {
      // Just add the category
      await prisma.businessService.create({
        data: {
          business_id: business.id,
          category_id: data.categoryId,
          is_primary: true,
        },
      })
    }

    // Invalidate cache
    await cache.invalidateRelated('business')

    return createdResponse({
      id: business.id,
      name: business.name,
      slug: business.slug,
      status: business.status,
      message: 'Business created successfully. It will be reviewed and verified soon.',
    })
  } catch (error) {
    return serverErrorResponse(error)
  }
}