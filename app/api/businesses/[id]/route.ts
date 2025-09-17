// Individual Business API endpoints - Get, Update, Delete

import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import {
  successResponse,
  errorResponse,
  noContentResponse,
  notFoundResponse,
  validationErrorResponse,
  serverErrorResponse,
  rateLimitExceededResponse,
} from '@/utils/api-response'
import { validateRequest, updateBusinessSchema } from '@/utils/validation'
import { withAuth, withOptionalAuth, withBusinessOwnerAuth } from '@/middleware/auth'
import { checkRateLimit } from '@/utils/rate-limit'
import { cache, cacheKeys, CACHE_TTL } from '@/utils/cache'

const prisma = new PrismaClient()

interface RouteParams {
  params: {
    id: string
  }
}

// GET /api/businesses/[id] - Get a single business
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    // Rate limiting
    const identifier = request.ip || 'anonymous'
    const rateLimit = await checkRateLimit(identifier, 'public')

    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.info)
    }

    // Check cache
    const cacheKey = cacheKeys.business(id)
    const cached = await cache.get(cacheKey)

    if (cached) {
      return successResponse(cached, undefined, { 'X-Cache': 'HIT' })
    }

    // Fetch business from database
    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            display_name: true,
          },
        },
        services: {
          include: {
            category: true,
            service_type: true,
          },
        },
        hours: {
          orderBy: { day: 'asc' },
        },
        city: true,
        county: true,
        state: true,
        media: {
          orderBy: [{ is_primary: 'desc' }, { display_order: 'asc' }],
        },
        certifications: {
          where: { is_verified: true },
        },
        pricing_items: {
          where: { is_active: true },
        },
        service_areas: true,
        reviews: {
          where: { status: 'APPROVED' },
          take: 5,
          orderBy: { created_at: 'desc' },
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
                display_name: true,
                avatar_url: true,
              },
            },
          },
        },
      },
    })

    if (!business) {
      return notFoundResponse('Business not found')
    }

    // Transform data for response
    const transformedBusiness = {
      id: business.id,
      name: business.name,
      slug: business.slug,
      legalName: business.legal_name,
      status: business.status,
      verified: business.status === 'VERIFIED',
      verificationLevel: business.verification_level,
      verifiedAt: business.verified_at,

      // Contact
      contact: {
        email: business.email,
        phone: business.phone,
        phoneSecondary: business.phone_secondary,
        website: business.website,
      },

      // Location
      location: {
        addressLine1: business.address_line1,
        addressLine2: business.address_line2,
        city: business.city?.name,
        county: business.county?.name,
        state: business.state.name,
        stateCode: business.state.code,
        zipCode: business.postal_code,
        latitude: business.latitude,
        longitude: business.longitude,
        serviceRadius: business.service_radius_miles,
      },

      // Business details
      description: business.description,
      shortDescription: business.short_description,
      yearEstablished: business.year_established,
      employeeCount: business.employee_count,
      priceRange: business.price_range,

      // Payment and certifications
      payment: {
        acceptsCreditCards: business.accepts_credit_cards,
        acceptsCash: business.accepts_cash,
        acceptsCheck: business.accepts_check,
      },
      certifications: {
        licensed: business.is_licensed,
        insured: business.is_insured,
        bonded: business.is_bonded,
        licenseNumber: business.license_number,
        insuranceAmount: business.insurance_amount,
        certificates: business.certifications.map((cert) => ({
          name: cert.name,
          issuer: cert.issuer,
          issueDate: cert.issue_date,
          expiryDate: cert.expiry_date,
        })),
      },

      // Emergency services
      emergency: {
        available: business.offers_emergency,
        fee: business.emergency_fee,
      },

      // Statistics
      stats: {
        rating: business.average_rating,
        reviewCount: business.total_reviews,
        responseTime: business.response_time_hours,
        completionRate: business.completion_rate,
      },

      // Services
      services: business.services.map((s) => ({
        id: s.id,
        category: s.category.name,
        categorySlug: s.category.slug,
        serviceType: s.service_type?.name,
        isPrimary: s.is_primary,
      })),

      // Hours
      hours: business.hours.map((h) => ({
        day: h.day,
        open: h.open_time,
        close: h.close_time,
        isClosed: h.is_closed,
      })),

      // Service areas
      serviceAreas: business.service_areas.map((area) => ({
        zipCode: area.zip_code,
        city: area.city_name,
        state: area.state_code,
        isPrimary: area.is_primary,
      })),

      // Pricing
      pricing: business.pricing_items.map((item) => ({
        name: item.name,
        description: item.description,
        priceMin: item.price_min,
        priceMax: item.price_max,
        priceFixed: item.price_fixed,
        priceUnit: item.price_unit,
      })),

      // Media
      media: {
        logo: business.logo_url,
        coverImage: business.cover_image_url,
        gallery: business.media.map((m) => ({
          url: m.url,
          type: m.type,
          title: m.title,
          description: m.description,
          isPrimary: m.is_primary,
        })),
      },

      // Recent reviews
      recentReviews: business.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        content: review.content,
        date: review.created_at,
        author: {
          name:
            review.user.display_name ||
            `${review.user.first_name} ${review.user.last_name[0]}.`,
          avatar: review.user.avatar_url,
        },
      })),

      // Metadata
      featured: business.featured_until
        ? new Date(business.featured_until) > new Date()
        : false,
      displayPriority: business.display_priority,
      createdAt: business.created_at,
      updatedAt: business.updated_at,
      lastActiveAt: business.last_active_at,
    }

    // Cache the result
    await cache.set(cacheKey, transformedBusiness, CACHE_TTL.LONG)

    return successResponse(transformedBusiness, undefined, { 'X-Cache': 'MISS' })
  } catch (error) {
    return serverErrorResponse(error)
  }
}

// PATCH /api/businesses/[id] - Update a business
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    // Business owner authentication required
    const authResult = await withBusinessOwnerAuth(request, id)

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
    const validationResult = await validateRequest(updateBusinessSchema, body)

    if (!validationResult.success) {
      return validationErrorResponse(validationResult.errors)
    }

    const data = validationResult.data

    // Check if business exists
    const existingBusiness = await prisma.business.findUnique({
      where: { id },
    })

    if (!existingBusiness) {
      return notFoundResponse('Business not found')
    }

    // Update the business
    const updatedBusiness = await prisma.business.update({
      where: { id },
      data: {
        name: data.name,
        legal_name: data.legalName,
        email: data.email,
        phone: data.phone,
        website: data.website,
        description: data.description,
        short_description: data.shortDescription,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2,
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
        updated_at: new Date(),
      },
    })

    // Invalidate cache
    await cache.invalidateRelated('business', id)

    return successResponse({
      id: updatedBusiness.id,
      name: updatedBusiness.name,
      message: 'Business updated successfully',
    })
  } catch (error) {
    return serverErrorResponse(error)
  }
}

// DELETE /api/businesses/[id] - Delete a business
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    // Business owner authentication required
    const authResult = await withBusinessOwnerAuth(request, id)

    if (!authResult.success) {
      return authResult.response
    }

    const { user } = authResult

    // Rate limiting
    const rateLimit = await checkRateLimit(user.userId, 'authenticated')

    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.info)
    }

    // Check if business exists
    const business = await prisma.business.findUnique({
      where: { id },
    })

    if (!business) {
      return notFoundResponse('Business not found')
    }

    // Soft delete by setting status to ARCHIVED
    await prisma.business.update({
      where: { id },
      data: {
        status: 'ARCHIVED',
        updated_at: new Date(),
      },
    })

    // Invalidate cache
    await cache.invalidateRelated('business', id)

    return noContentResponse()
  } catch (error) {
    return serverErrorResponse(error)
  }
}