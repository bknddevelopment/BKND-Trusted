// API response utilities

import { NextResponse } from 'next/server'
import { ApiResponse, ApiError, ApiMeta, RateLimitInfo } from '@/types/api'
import { getRateLimitHeaders } from './rate-limit'
import { ZodError } from 'zod'
import { formatZodError } from './validation'

// Success response
export function successResponse<T = any>(
  data: T,
  meta?: ApiMeta,
  headers?: Record<string, string>
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta,
    },
    {
      status: 200,
      headers,
    }
  )
}

// Created response
export function createdResponse<T = any>(
  data: T,
  headers?: Record<string, string>
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status: 201,
      headers,
    }
  )
}

// No content response
export function noContentResponse(
  headers?: Record<string, string>
): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers,
  })
}

// Error response
export function errorResponse(
  error: string | ApiError,
  status: number = 400,
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  const apiError: ApiError =
    typeof error === 'string'
      ? { code: 'ERROR', message: error }
      : error

  return NextResponse.json(
    {
      success: false,
      error: apiError,
    },
    {
      status,
      headers,
    }
  )
}

// Validation error response
export function validationErrorResponse(
  error: ZodError | Record<string, string[]>,
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  const details = error instanceof ZodError ? formatZodError(error) : error

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details,
      },
    },
    {
      status: 400,
      headers,
    }
  )
}

// Unauthorized response
export function unauthorizedResponse(
  message: string = 'Authentication required',
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message,
      },
    },
    {
      status: 401,
      headers,
    }
  )
}

// Forbidden response
export function forbiddenResponse(
  message: string = 'Access denied',
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'FORBIDDEN',
        message,
      },
    },
    {
      status: 403,
      headers,
    }
  )
}

// Not found response
export function notFoundResponse(
  message: string = 'Resource not found',
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message,
      },
    },
    {
      status: 404,
      headers,
    }
  )
}

// Rate limit exceeded response
export function rateLimitExceededResponse(
  rateLimitInfo: RateLimitInfo
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests',
        details: {
          limit: rateLimitInfo.limit,
          remaining: rateLimitInfo.remaining,
          reset: rateLimitInfo.reset,
        },
      },
    },
    {
      status: 429,
      headers: getRateLimitHeaders(rateLimitInfo),
    }
  )
}

// Internal server error response
export function serverErrorResponse(
  error: unknown,
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  // Log the actual error for debugging
  console.error('Server error:', error)

  // Don't expose internal error details in production
  const message =
    process.env.NODE_ENV === 'development' && error instanceof Error
      ? error.message
      : 'Internal server error'

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message,
      },
    },
    {
      status: 500,
      headers,
    }
  )
}

// Paginated response helper
export function paginatedResponse<T = any>(
  data: T[],
  page: number,
  pageSize: number,
  total: number,
  headers?: Record<string, string>
): NextResponse<ApiResponse<T[]>> {
  const totalPages = Math.ceil(total / pageSize)

  return successResponse(
    data,
    {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    headers
  )
}

// Method not allowed response
export function methodNotAllowedResponse(
  allowedMethods: string[],
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: `Method not allowed. Allowed methods: ${allowedMethods.join(', ')}`,
      },
    },
    {
      status: 405,
      headers: {
        ...headers,
        Allow: allowedMethods.join(', '),
      },
    }
  )
}

// Service unavailable response
export function serviceUnavailableResponse(
  message: string = 'Service temporarily unavailable',
  retryAfter?: number,
  headers?: Record<string, string>
): NextResponse<ApiResponse> {
  const responseHeaders = { ...headers }

  if (retryAfter) {
    responseHeaders['Retry-After'] = retryAfter.toString()
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message,
      },
    },
    {
      status: 503,
      headers: responseHeaders,
    }
  )
}