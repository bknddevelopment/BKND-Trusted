// Authentication middleware

import { NextRequest } from 'next/server'
import { verifyToken, extractBearerToken } from '@/utils/auth'
import { unauthorizedResponse, forbiddenResponse } from '@/utils/api-response'
import { TokenPayload } from '@/types/api'

export interface AuthenticatedRequest extends NextRequest {
  user?: TokenPayload
}

// Verify JWT token middleware
export async function withAuth(
  request: NextRequest,
  requiredRole?: string
): Promise<{ success: true; user: TokenPayload } | { success: false; response: Response }> {
  const token = extractBearerToken(request.headers.get('authorization'))

  if (!token) {
    return {
      success: false,
      response: unauthorizedResponse('Missing authentication token'),
    }
  }

  const payload = await verifyToken(token)

  if (!payload) {
    return {
      success: false,
      response: unauthorizedResponse('Invalid or expired token'),
    }
  }

  // Check role if required
  if (requiredRole) {
    const roleHierarchy: Record<string, number> = {
      USER: 1,
      BUSINESS_OWNER: 2,
      MODERATOR: 3,
      ADMIN: 4,
    }

    const userLevel = roleHierarchy[payload.role] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0

    if (userLevel < requiredLevel) {
      return {
        success: false,
        response: forbiddenResponse('Insufficient permissions'),
      }
    }
  }

  return {
    success: true,
    user: payload,
  }
}

// Optional authentication middleware
export async function withOptionalAuth(
  request: NextRequest
): Promise<TokenPayload | null> {
  const token = extractBearerToken(request.headers.get('authorization'))

  if (!token) {
    return null
  }

  return await verifyToken(token)
}

// API key authentication middleware
export async function withApiKey(
  request: NextRequest
): Promise<{ success: true; apiKey: string } | { success: false; response: Response }> {
  const apiKey = request.headers.get('x-api-key')

  if (!apiKey) {
    return {
      success: false,
      response: unauthorizedResponse('Missing API key'),
    }
  }

  // Validate API key format
  if (!apiKey.startsWith('bknd_') || apiKey.length !== 37) {
    return {
      success: false,
      response: unauthorizedResponse('Invalid API key format'),
    }
  }

  // TODO: Validate API key against database
  // For now, we'll accept any properly formatted key

  return {
    success: true,
    apiKey,
  }
}

// Business owner authorization middleware
export async function withBusinessOwnerAuth(
  request: NextRequest,
  businessId: string
): Promise<{ success: true; user: TokenPayload } | { success: false; response: Response }> {
  const authResult = await withAuth(request)

  if (!authResult.success) {
    return authResult
  }

  const { user } = authResult

  // Admin can access any business
  if (user.role === 'ADMIN') {
    return { success: true, user }
  }

  // Business owner can only access their own business
  if (user.role === 'BUSINESS_OWNER' && user.businessId === businessId) {
    return { success: true, user }
  }

  return {
    success: false,
    response: forbiddenResponse('Access denied to this business'),
  }
}