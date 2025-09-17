// Sign in endpoint

import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { successResponse, errorResponse, validationErrorResponse, serverErrorResponse } from '@/utils/api-response'
import { validateRequest, signInSchema } from '@/utils/validation'
import { verifyPassword, generateTokens } from '@/utils/auth'
import { checkRateLimit } from '@/utils/rate-limit'

const prisma = new PrismaClient()

// POST /api/auth/signin - Sign in to an existing account
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip || 'anonymous'
    const rateLimit = await checkRateLimit(identifier, 'public')

    if (!rateLimit.success) {
      return errorResponse(
        {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many signin attempts',
          details: rateLimit.info,
        },
        429
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = await validateRequest(signInSchema, body)

    if (!validationResult.success) {
      return validationErrorResponse(validationResult.errors)
    }

    const data = validationResult.data

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
      include: {
        businesses: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
          where: {
            status: {
              in: ['PENDING', 'VERIFIED'],
            },
          },
        },
      },
    })

    if (!user || !user.password_hash) {
      return errorResponse(
        {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
        401
      )
    }

    // Check if user is banned
    if (user.is_banned) {
      return errorResponse(
        {
          code: 'ACCOUNT_BANNED',
          message: user.ban_reason || 'Your account has been suspended',
        },
        403
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(data.password, user.password_hash)

    if (!isValidPassword) {
      return errorResponse(
        {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
        401
      )
    }

    // Generate JWT tokens
    const tokens = await generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      businessId: user.businesses[0]?.id, // Include first business if owner
    })

    // Clean up old sessions
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
        expires: {
          lt: new Date(),
        },
      },
    })

    // Create new session
    await prisma.session.create({
      data: {
        sessionToken: tokens.refreshToken,
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    })

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        last_login_at: new Date(),
      },
    })

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        emailVerified: user.email_verified,
        businesses: user.businesses,
      },
      tokens,
      message: 'Signed in successfully',
    })
  } catch (error) {
    return serverErrorResponse(error)
  }
}