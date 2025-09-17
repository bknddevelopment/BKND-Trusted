// Sign up endpoint

import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createdResponse, errorResponse, validationErrorResponse, serverErrorResponse } from '@/utils/api-response'
import { validateRequest, signUpSchema } from '@/utils/validation'
import { hashPassword, generateTokens } from '@/utils/auth'
import { checkRateLimit } from '@/utils/rate-limit'

const prisma = new PrismaClient()

// POST /api/auth/signup - Create a new user account
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip || 'anonymous'
    const rateLimit = await checkRateLimit(identifier, 'public')

    if (!rateLimit.success) {
      return errorResponse(
        {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many signup attempts',
          details: rateLimit.info,
        },
        429
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = await validateRequest(signUpSchema, body)

    if (!validationResult.success) {
      return validationErrorResponse(validationResult.errors)
    }

    const data = validationResult.data

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    })

    if (existingUser) {
      return errorResponse(
        {
          code: 'EMAIL_EXISTS',
          message: 'An account with this email already exists',
        },
        409
      )
    }

    // Hash password
    const passwordHash = await hashPassword(data.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password_hash: passwordHash,
        first_name: data.firstName,
        last_name: data.lastName,
        display_name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        city: data.city,
        state_code: data.stateCode,
        zip_code: data.zipCode,
        role: 'USER',
        email_verified: false,
      },
    })

    // Generate JWT tokens
    const tokens = await generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Create session
    await prisma.session.create({
      data: {
        sessionToken: tokens.refreshToken,
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    })

    return createdResponse({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      tokens,
      message: 'Account created successfully',
    })
  } catch (error) {
    return serverErrorResponse(error)
  }
}