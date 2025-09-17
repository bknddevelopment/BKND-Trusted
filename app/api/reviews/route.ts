// Reviews API endpoints - List and Create

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
  reviewFiltersSchema,
  createReviewSchema,
} from '@/utils/validation'
import { withAuth } from '@/middleware/auth'
import { checkRateLimit } from '@/utils/rate-limit'
import { cache, cacheKeys, CACHE_TTL } from '@/utils/cache'

const prisma = new PrismaClient()

// GET /api/reviews - List reviews with filters
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

    // Validate pagination
    const paginationResult = await validateRequest(paginationSchema, {
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    })

    if (!paginationResult.success) {
      return validationErrorResponse(paginationResult.errors)
    }

    // Validate filters
    const filtersResult = await validateRequest(reviewFiltersSchema, queryParams)

    if (!filtersResult.success) {
      return validationErrorResponse(filtersResult.errors)
    }

    const { page, pageSize, sortBy, sortOrder } = paginationResult.data
    const filters = filtersResult.data

    // Check cache for business-specific reviews
    if (filters.businessId && !filters.userId) {
      const cacheKey = cacheKeys.reviewList(filters.businessId, page)
      const cached = await cache.get(cacheKey)

      if (cached) {
        return paginatedResponse(
          cached.reviews,
          page,
          pageSize,
          cached.total,
          { 'X-Cache': 'HIT' }
        )
      }
    }

    // Build query conditions
    const where: any = {
      status: filters.status || 'APPROVED', // Default to approved reviews
    }

    if (filters.businessId) {
      where.business_id = filters.businessId
    }

    if (filters.userId) {
      where.user_id = filters.userId
    }

    if (filters.rating) {
      where.rating = filters.rating
    }

    if (filters.verified !== undefined) {
      where.is_verified = filters.verified
    }

    // Execute queries
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: sortBy
          ? { [sortBy]: sortOrder }
          : { created_at: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              display_name: true,
              avatar_url: true,
              city: true,
              state_code: true,
            },
          },
          business: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.review.count({ where }),
    ])

    // Transform data
    const transformedReviews = reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      serviceDate: review.service_date,
      serviceType: review.service_type,
      projectCost: review.project_cost,
      status: review.status,
      verified: review.is_verified,
      helpfulCount: review.helpful_count,
      images: review.images,
      author: {
        id: review.user.id,
        name:
          review.user.display_name ||
          `${review.user.first_name} ${review.user.last_name[0]}.`,
        avatar: review.user.avatar_url,
        location: review.user.city
          ? `${review.user.city}, ${review.user.state_code}`
          : null,
      },
      business: {
        id: review.business.id,
        name: review.business.name,
        slug: review.business.slug,
      },
      response: review.response,
      responseDate: review.response_date,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
    }))

    // Cache if business-specific
    if (filters.businessId && !filters.userId) {
      const cacheKey = cacheKeys.reviewList(filters.businessId, page)
      await cache.set(
        cacheKey,
        { reviews: transformedReviews, total },
        CACHE_TTL.MEDIUM
      )
    }

    return paginatedResponse(
      transformedReviews,
      page,
      pageSize,
      total,
      filters.businessId ? { 'X-Cache': 'MISS' } : undefined
    )
  } catch (error) {
    return serverErrorResponse(error)
  }
}

// POST /api/reviews - Create a review
export async function POST(request: NextRequest) {
  try {
    // Authentication required
    const authResult = await withAuth(request)

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
    const validationResult = await validateRequest(createReviewSchema, body)

    if (!validationResult.success) {
      return validationErrorResponse(validationResult.errors)
    }

    const data = validationResult.data

    // Check if business exists
    const business = await prisma.business.findUnique({
      where: { id: data.businessId },
    })

    if (!business) {
      return errorResponse({
        code: 'BUSINESS_NOT_FOUND',
        message: 'Business not found',
      })
    }

    // Check if user already reviewed this business
    const existingReview = await prisma.review.findUnique({
      where: {
        business_id_user_id: {
          business_id: data.businessId,
          user_id: user.userId,
        },
      },
    })

    if (existingReview) {
      return errorResponse(
        {
          code: 'DUPLICATE_REVIEW',
          message: 'You have already reviewed this business',
        },
        409
      )
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        business_id: data.businessId,
        user_id: user.userId,
        rating: data.rating,
        title: data.title,
        content: data.content,
        service_date: data.serviceDate ? new Date(data.serviceDate) : null,
        service_type: data.serviceType,
        project_cost: data.projectCost,
        images: data.images || null,
        status: 'PENDING', // Reviews start as pending for moderation
        is_verified: false, // Will be verified if we can match with a transaction
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            display_name: true,
          },
        },
      },
    })

    // Update business statistics (in a real app, this might be done async)
    const [reviewCount, avgRating] = await Promise.all([
      prisma.review.count({
        where: {
          business_id: data.businessId,
          status: 'APPROVED',
        },
      }),
      prisma.review.aggregate({
        where: {
          business_id: data.businessId,
          status: 'APPROVED',
        },
        _avg: {
          rating: true,
        },
      }),
    ])

    await prisma.business.update({
      where: { id: data.businessId },
      data: {
        total_reviews: reviewCount,
        average_rating: avgRating._avg.rating || 0,
      },
    })

    // Invalidate cache
    await cache.invalidateRelated('business', data.businessId)
    await cache.deletePattern(cacheKeys.reviewList(data.businessId, 1))

    return createdResponse({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      status: review.status,
      author: {
        name:
          review.user.display_name ||
          `${review.user.first_name} ${review.user.last_name}`,
      },
      message: 'Review submitted successfully. It will be published after moderation.',
    })
  } catch (error) {
    return serverErrorResponse(error)
  }
}