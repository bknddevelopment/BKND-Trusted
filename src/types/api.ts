// API Types and Interfaces

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ApiMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  field?: string
}

export interface ApiMeta {
  page?: number
  pageSize?: number
  total?: number
  totalPages?: number
  hasNext?: boolean
  hasPrev?: boolean
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FilterParams {
  search?: string
  category?: string
  status?: string
  verified?: boolean
  city?: string
  state?: string
  zipCode?: string
  radius?: number
  lat?: number
  lng?: number
  priceRange?: string
  rating?: number
  services?: string[]
  availability?: string
}

export interface BusinessFilters extends FilterParams {
  minRating?: number
  maxPrice?: number
  minPrice?: number
  emergency?: boolean
  open24Hours?: boolean
}

export interface ReviewFilters {
  businessId?: string
  userId?: string
  rating?: number
  verified?: boolean
  status?: 'PENDING' | 'APPROVED' | 'FLAGGED' | 'REMOVED'
}

export interface AuthPayload {
  email: string
  password: string
}

export interface TokenPayload {
  userId: string
  email: string
  role: string
  businessId?: string
  exp?: number
  iat?: number
}

export interface JWTTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: Date
}

export interface WebhookEvent {
  id: string
  type: string
  data: any
  timestamp: Date
  signature?: string
}