// API validation utilities using Zod

import { z } from 'zod'

// Common validation schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const geoLocationSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radius: z.coerce.number().min(1).max(100).default(25), // miles
})

// Business validation schemas
export const businessFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2).optional(),
  zipCode: z.string().optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  radius: z.coerce.number().min(1).max(100).optional(),
  priceRange: z.enum(['BUDGET', 'MODERATE', 'PREMIUM', 'LUXURY']).optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  verified: z.coerce.boolean().optional(),
  emergency: z.coerce.boolean().optional(),
  services: z.array(z.string()).optional(),
  availability: z.string().optional(), // ISO date string
})

export const createBusinessSchema = z.object({
  name: z.string().min(1).max(200),
  legalName: z.string().max(200).optional(),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
  website: z.string().url().optional(),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),

  // Address
  addressLine1: z.string().min(1).max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  state: z.string().length(2),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/),

  // Location
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  serviceRadiusMiles: z.number().min(0).max(500).default(25),

  // Business details
  yearEstablished: z.number().min(1800).max(new Date().getFullYear()).optional(),
  employeeCount: z.number().positive().optional(),
  priceRange: z.enum(['BUDGET', 'MODERATE', 'PREMIUM', 'LUXURY']).optional(),

  // Services
  categoryId: z.string().uuid(),
  serviceTypeIds: z.array(z.string().uuid()).optional(),

  // Payment methods
  acceptsCreditCards: z.boolean().default(true),
  acceptsCash: z.boolean().default(true),
  acceptsCheck: z.boolean().default(false),

  // Certifications
  isLicensed: z.boolean().default(false),
  isInsured: z.boolean().default(false),
  isBonded: z.boolean().default(false),
  licenseNumber: z.string().max(100).optional(),
  insuranceAmount: z.number().positive().optional(),

  // Emergency services
  offersEmergency: z.boolean().default(false),
  emergencyFee: z.number().positive().optional(),
})

export const updateBusinessSchema = createBusinessSchema.partial()

// Review validation schemas
export const createReviewSchema = z.object({
  businessId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(200).optional(),
  content: z.string().min(10).max(5000),
  serviceDate: z.string().datetime().optional(),
  serviceType: z.string().max(200).optional(),
  projectCost: z.number().positive().optional(),
  images: z.array(z.string().url()).max(10).optional(),
})

export const reviewFiltersSchema = z.object({
  businessId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  verified: z.coerce.boolean().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'FLAGGED', 'REMOVED']).optional(),
})

// User validation schemas
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Password must contain uppercase, lowercase, and number',
    }),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/).optional(),
  city: z.string().max(100).optional(),
  stateCode: z.string().length(2).optional(),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/).optional(),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// Pricing validation schemas
export const pricingItemSchema = z.object({
  serviceTypeId: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
  priceFixed: z.number().positive().optional(),
  priceUnit: z.string().max(50).optional(),
})

// Availability validation schemas
export const availabilitySchema = z.object({
  date: z.string().datetime(),
  slots: z.array(z.object({
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    available: z.boolean(),
    capacity: z.number().positive().optional(),
    price: z.number().positive().optional(),
  })),
})

// Lead validation schemas
export const createLeadSchema = z.object({
  businessId: z.string().uuid(),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
  serviceNeeded: z.string().min(10).max(5000),
  timeline: z.string().max(100).optional(),
  budgetRange: z.string().max(100).optional(),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
})

// Webhook validation schemas
export const webhookSchema = z.object({
  url: z.string().url(),
  events: z.array(z.enum([
    'business.created',
    'business.updated',
    'business.deleted',
    'review.created',
    'review.updated',
    'lead.created',
  ])),
  secret: z.string().min(16).optional(),
})

// API key validation schemas
export const apiKeySchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z.array(z.string()).default(['read']),
  rateLimit: z.number().min(1).max(10000).default(1000),
  expiresAt: z.string().datetime().optional(),
})

// Helper function to validate request data
export async function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: z.ZodError }> {
  try {
    const validData = await schema.parseAsync(data)
    return { success: true, data: validData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

// Format Zod errors for API response
export function formatZodError(error: z.ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {}

  error.errors.forEach((err) => {
    const path = err.path.join('.')
    if (!formatted[path]) {
      formatted[path] = []
    }
    formatted[path].push(err.message)
  })

  return formatted
}