// Authentication utilities using jose (edge-compatible JWT library)

import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import bcrypt from 'bcryptjs'
import { TokenPayload, JWTTokens } from '@/types/api'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)
const JWT_EXPIRES_IN = '1h'
const REFRESH_TOKEN_EXPIRES_IN = '7d'

// Generate JWT tokens
export async function generateTokens(payload: TokenPayload): Promise<JWTTokens> {
  const accessToken = await new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET)

  const refreshToken = await new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES_IN)
    .sign(JWT_SECRET)

  return {
    accessToken,
    refreshToken,
    expiresIn: 3600, // 1 hour in seconds
  }
}

// Verify JWT token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as TokenPayload
  } catch (error) {
    return null
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Extract token from Authorization header
export function extractBearerToken(authHeader?: string): string | null {
  if (!authHeader) return null

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null
  }

  return parts[1]
}

// Generate API key
export function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let apiKey = 'bknd_'

  for (let i = 0; i < 32; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return apiKey
}

// Permission checking
export function hasPermission(
  userRole: string,
  requiredRole: string
): boolean {
  const roleHierarchy: Record<string, number> = {
    USER: 1,
    BUSINESS_OWNER: 2,
    MODERATOR: 3,
    ADMIN: 4,
  }

  const userLevel = roleHierarchy[userRole] || 0
  const requiredLevel = roleHierarchy[requiredRole] || 0

  return userLevel >= requiredLevel
}