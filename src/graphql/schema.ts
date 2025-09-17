// GraphQL Schema Definition

export const typeDefs = `#graphql
  scalar DateTime
  scalar JSON
  scalar Float

  # Enums
  enum BusinessStatus {
    PENDING
    VERIFIED
    SUSPENDED
    ARCHIVED
  }

  enum PriceRange {
    BUDGET
    MODERATE
    PREMIUM
    LUXURY
  }

  enum UserRole {
    USER
    BUSINESS_OWNER
    MODERATOR
    ADMIN
  }

  enum ReviewStatus {
    PENDING
    APPROVED
    FLAGGED
    REMOVED
  }

  enum DayOfWeek {
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

  # Types
  type Business {
    id: ID!
    name: String!
    slug: String!
    legalName: String
    status: BusinessStatus!
    verified: Boolean!
    verificationLevel: String

    contact: ContactInfo!
    location: Location!
    details: BusinessDetails!
    services: [Service!]!
    hours: [BusinessHours!]!
    pricing: [PricingItem!]!
    reviews(first: Int, after: String, rating: Int): ReviewConnection!
    media: Media!
    stats: BusinessStats!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ContactInfo {
    email: String!
    phone: String!
    phoneSecondary: String
    website: String
  }

  type Location {
    addressLine1: String!
    addressLine2: String
    city: String!
    county: String
    state: String!
    stateCode: String!
    zipCode: String!
    latitude: Float!
    longitude: Float!
    serviceRadius: Float!
  }

  type BusinessDetails {
    description: String
    shortDescription: String
    yearEstablished: Int
    employeeCount: Int
    priceRange: PriceRange
    acceptsCreditCards: Boolean!
    acceptsCash: Boolean!
    acceptsCheck: Boolean!
    isLicensed: Boolean!
    isInsured: Boolean!
    isBonded: Boolean!
    licenseNumber: String
    insuranceAmount: Float
    offersEmergency: Boolean!
    emergencyFee: Float
  }

  type Service {
    id: ID!
    category: String!
    categorySlug: String!
    serviceType: String
    isPrimary: Boolean!
  }

  type BusinessHours {
    day: DayOfWeek!
    open: String!
    close: String!
    isClosed: Boolean!
  }

  type PricingItem {
    name: String!
    description: String
    priceMin: Float
    priceMax: Float
    priceFixed: Float
    priceUnit: String
  }

  type Media {
    logo: String
    coverImage: String
    gallery: [MediaItem!]!
  }

  type MediaItem {
    url: String!
    type: String!
    title: String
    description: String
    isPrimary: Boolean!
  }

  type BusinessStats {
    rating: Float!
    reviewCount: Int!
    responseTime: Int
    completionRate: Float
  }

  type Review {
    id: ID!
    rating: Int!
    title: String
    content: String!
    serviceDate: DateTime
    serviceType: String
    projectCost: Float
    status: ReviewStatus!
    verified: Boolean!
    helpfulCount: Int!
    images: [String!]
    author: Author!
    business: Business!
    response: String
    responseDate: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Author {
    id: ID!
    name: String!
    avatar: String
    location: String
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    displayName: String
    phone: String
    city: String
    stateCode: String
    zipCode: String
    role: UserRole!
    businesses: [Business!]!
    reviews: [Review!]!
    createdAt: DateTime!
  }

  type DynamicPricing {
    businessId: ID!
    date: DateTime!
    basePrice: Float!
    currentPrice: Float!
    demandMultiplier: Float!
    factors: JSON!
  }

  type Availability {
    businessId: ID!
    date: DateTime!
    slots: [TimeSlot!]!
  }

  type TimeSlot {
    startTime: String!
    endTime: String!
    available: Boolean!
    capacity: Int
    booked: Int!
    price: Float
  }

  # Connections (for pagination)
  type BusinessConnection {
    edges: [BusinessEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type BusinessEdge {
    node: Business!
    cursor: String!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type ReviewEdge {
    node: Review!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  # Search result
  type SearchResult {
    businesses: BusinessConnection!
    facets: SearchFacets!
  }

  type SearchFacets {
    categories: [CategoryFacet!]!
    priceRanges: [PriceRangeFacet!]!
    ratings: [RatingFacet!]!
    cities: [CityFacet!]!
  }

  type CategoryFacet {
    name: String!
    slug: String!
    count: Int!
  }

  type PriceRangeFacet {
    range: PriceRange!
    count: Int!
  }

  type RatingFacet {
    rating: Int!
    count: Int!
  }

  type CityFacet {
    name: String!
    count: Int!
  }

  # Input Types
  input BusinessFilter {
    search: String
    category: String
    city: String
    state: String
    zipCode: String
    lat: Float
    lng: Float
    radius: Float
    priceRange: PriceRange
    minRating: Float
    verified: Boolean
    emergency: Boolean
    services: [String!]
  }

  input CreateBusinessInput {
    name: String!
    email: String!
    phone: String!
    addressLine1: String!
    city: String!
    state: String!
    postalCode: String!
    latitude: Float!
    longitude: Float!
    categoryId: ID!
    description: String
  }

  input UpdateBusinessInput {
    name: String
    email: String
    phone: String
    website: String
    description: String
    shortDescription: String
    priceRange: PriceRange
    offersEmergency: Boolean
    emergencyFee: Float
  }

  input CreateReviewInput {
    businessId: ID!
    rating: Int!
    title: String
    content: String!
    serviceDate: DateTime
    serviceType: String
    projectCost: Float
    images: [String!]
  }

  input PaginationInput {
    first: Int
    after: String
    last: Int
    before: String
  }

  # Mutations
  type Mutation {
    # Business mutations
    createBusiness(input: CreateBusinessInput!): Business!
    updateBusiness(id: ID!, input: UpdateBusinessInput!): Business!
    deleteBusiness(id: ID!): Boolean!
    verifyBusiness(id: ID!, level: String!): Business!

    # Review mutations
    createReview(input: CreateReviewInput!): Review!
    updateReview(id: ID!, content: String!, rating: Int!): Review!
    deleteReview(id: ID!): Boolean!
    respondToReview(id: ID!, response: String!): Review!
    markReviewHelpful(id: ID!): Review!

    # Availability mutations
    updateAvailability(businessId: ID!, date: DateTime!, slots: [TimeSlotInput!]!): Availability!

    # Lead mutations
    createLead(businessId: ID!, name: String!, email: String!, phone: String!, message: String!): Boolean!
  }

  input TimeSlotInput {
    startTime: String!
    endTime: String!
    available: Boolean!
    capacity: Int
    price: Float
  }

  # Queries
  type Query {
    # Business queries
    business(id: ID, slug: String): Business
    businesses(filter: BusinessFilter, pagination: PaginationInput): BusinessConnection!
    searchBusinesses(query: String!, filter: BusinessFilter, pagination: PaginationInput): SearchResult!
    nearbyBusinesses(lat: Float!, lng: Float!, radius: Float!, category: String, pagination: PaginationInput): BusinessConnection!

    # Review queries
    review(id: ID!): Review
    reviews(businessId: ID, userId: ID, status: ReviewStatus, pagination: PaginationInput): ReviewConnection!

    # User queries
    user(id: ID!): User
    me: User

    # Pricing queries
    dynamicPricing(businessId: ID!, date: DateTime!): DynamicPricing!
    availability(businessId: ID!, date: DateTime!): Availability!

    # Category queries
    categories: [Category!]!
    category(slug: String!): Category

    # Stats queries
    businessStats(id: ID!): BusinessStats!
    platformStats: PlatformStats!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    description: String
    icon: String
    parent: Category
    children: [Category!]!
    businessCount: Int!
  }

  type PlatformStats {
    totalBusinesses: Int!
    totalReviews: Int!
    totalUsers: Int!
    averageRating: Float!
  }

  # Subscriptions
  type Subscription {
    # Real-time business updates
    businessUpdated(id: ID!): Business!

    # Real-time review updates
    newReview(businessId: ID!): Review!

    # Real-time availability updates
    availabilityChanged(businessId: ID!): Availability!

    # Real-time pricing updates
    priceChanged(businessId: ID!): DynamicPricing!
  }
`