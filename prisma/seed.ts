/**
 * Database Seeder for BKND Trusted
 * Generates realistic test data at scale
 */

import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Service categories and types
const SERVICE_DATA = {
  'hvac': {
    name: 'HVAC',
    display_name: 'Heating & Air Conditioning',
    services: [
      'AC Repair', 'AC Installation', 'Heating Repair', 'Heating Installation',
      'HVAC Maintenance', 'Duct Cleaning', 'Emergency HVAC Service'
    ]
  },
  'plumbing': {
    name: 'Plumbing',
    display_name: 'Plumbing Services',
    services: [
      'Drain Cleaning', 'Pipe Repair', 'Water Heater Installation', 'Toilet Repair',
      'Faucet Installation', 'Emergency Plumbing', 'Sewer Line Repair'
    ]
  },
  'electrical': {
    name: 'Electrical',
    display_name: 'Electrical Services',
    services: [
      'Electrical Repair', 'Panel Upgrade', 'Outlet Installation', 'Lighting Installation',
      'Ceiling Fan Installation', 'Emergency Electrical', 'EV Charger Installation'
    ]
  },
  'roofing': {
    name: 'Roofing',
    display_name: 'Roofing Services',
    services: [
      'Roof Repair', 'Roof Replacement', 'Gutter Installation', 'Roof Inspection',
      'Emergency Roofing', 'Shingle Replacement', 'Flat Roof Repair'
    ]
  },
  'landscaping': {
    name: 'Landscaping',
    display_name: 'Landscaping & Lawn Care',
    services: [
      'Lawn Mowing', 'Tree Trimming', 'Landscaping Design', 'Sprinkler Repair',
      'Mulching', 'Lawn Fertilization', 'Snow Removal'
    ]
  }
}

// Major US cities with real coordinates
const CITY_DATA = [
  { name: 'New York', state: 'NY', lat: 40.7128, lng: -74.0060, population: 8336817 },
  { name: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437, population: 3979576 },
  { name: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298, population: 2693976 },
  { name: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698, population: 2320268 },
  { name: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.0740, population: 1680992 },
  { name: 'Philadelphia', state: 'PA', lat: 39.9526, lng: -75.1652, population: 1584064 },
  { name: 'San Antonio', state: 'TX', lat: 29.4241, lng: -98.4936, population: 1547253 },
  { name: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611, population: 1423851 },
  { name: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.7970, population: 1343573 },
  { name: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431, population: 978908 },
]

// Business name templates
const BUSINESS_PREFIXES = [
  'Premier', 'Elite', 'Pro', 'Expert', 'Quality', 'Reliable',
  'Fast', 'Affordable', 'Professional', 'Master', 'Advanced'
]

const BUSINESS_SUFFIXES = [
  'Services', 'Solutions', 'Experts', 'Professionals', 'Company',
  'Group', 'Team', 'Specialists', 'Contractors'
]

// Helper functions
function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Generate random business hours
function generateBusinessHours() {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
  const hours = []

  for (const day of days) {
    const isClosed = day === 'SUNDAY' && Math.random() > 0.5
    hours.push({
      day: day as any,
      open_time: isClosed ? '00:00' : '08:00',
      close_time: isClosed ? '00:00' : '18:00',
      is_closed: isClosed
    })
  }

  return hours
}

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data
  await prisma.$transaction([
    prisma.lead.deleteMany(),
    prisma.certification.deleteMany(),
    prisma.businessMedia.deleteMany(),
    prisma.review.deleteMany(),
    prisma.serviceArea.deleteMany(),
    prisma.pricingItem.deleteMany(),
    prisma.businessHours.deleteMany(),
    prisma.businessService.deleteMany(),
    prisma.business.deleteMany(),
    prisma.user.deleteMany(),
    prisma.serviceType.deleteMany(),
    prisma.serviceCategory.deleteMany(),
    prisma.zipCode.deleteMany(),
    prisma.city.deleteMany(),
    prisma.county.deleteMany(),
    prisma.state.deleteMany(),
  ])

  console.log('✨ Cleaned existing data')

  // Create states
  const stateMap = new Map()
  const uniqueStates = [...new Set(CITY_DATA.map(c => c.state))]

  for (const stateCode of uniqueStates) {
    const state = await prisma.state.create({
      data: {
        code: stateCode,
        name: stateCode, // In real app, use full state names
        slug: stateCode.toLowerCase(),
        center_lat: CITY_DATA.find(c => c.state === stateCode)!.lat,
        center_lng: CITY_DATA.find(c => c.state === stateCode)!.lng,
        timezone: 'America/New_York', // Simplified
      }
    })
    stateMap.set(stateCode, state.id)
  }

  console.log(`✅ Created ${uniqueStates.length} states`)

  // Create cities
  const cityMap = new Map()

  for (const cityData of CITY_DATA) {
    const city = await prisma.city.create({
      data: {
        state_id: stateMap.get(cityData.state),
        name: cityData.name,
        slug: generateSlug(cityData.name),
        center_lat: cityData.lat,
        center_lng: cityData.lng,
        population: cityData.population,
        is_major: true,
      }
    })
    cityMap.set(`${cityData.name}-${cityData.state}`, city.id)
  }

  console.log(`✅ Created ${CITY_DATA.length} cities`)

  // Create service categories and types
  const categoryMap = new Map()
  const serviceTypeMap = new Map()

  let displayOrder = 0
  for (const [slug, categoryData] of Object.entries(SERVICE_DATA)) {
    const category = await prisma.serviceCategory.create({
      data: {
        name: categoryData.name,
        slug,
        display_name: categoryData.display_name,
        display_order: displayOrder++,
        description: `Professional ${categoryData.display_name} services`,
      }
    })
    categoryMap.set(slug, category.id)

    // Create service types
    for (const serviceName of categoryData.services) {
      const serviceType = await prisma.serviceType.create({
        data: {
          category_id: category.id,
          name: serviceName,
          slug: generateSlug(serviceName),
          typical_price_min: randomFloat(50, 200),
          typical_price_max: randomFloat(500, 2000),
          duration_minutes: randomInt(30, 240),
          is_emergency: serviceName.includes('Emergency'),
        }
      })
      serviceTypeMap.set(serviceName, serviceType.id)
    }
  }

  console.log(`✅ Created ${categoryMap.size} categories and ${serviceTypeMap.size} service types`)

  // Create users
  const users = []
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create business owners
  for (let i = 1; i <= 50; i++) {
    const user = await prisma.user.create({
      data: {
        email: `owner${i}@example.com`,
        email_verified: true,
        password_hash: hashedPassword,
        first_name: `Owner`,
        last_name: `${i}`,
        display_name: `Business Owner ${i}`,
        role: 'BUSINESS_OWNER',
      }
    })
    users.push(user)
  }

  // Create regular users
  for (let i = 1; i <= 100; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        email_verified: Math.random() > 0.3,
        password_hash: hashedPassword,
        first_name: `User`,
        last_name: `${i}`,
        display_name: `User ${i}`,
        role: 'USER',
      }
    })
    users.push(user)
  }

  console.log(`✅ Created ${users.length} users`)

  // Create businesses
  const businesses = []
  let businessCount = 0

  for (const cityData of CITY_DATA) {
    const cityId = cityMap.get(`${cityData.name}-${cityData.state}`)
    const stateId = stateMap.get(cityData.state)

    // Create 20-50 businesses per city
    const businessesPerCity = randomInt(20, 50)

    for (let i = 0; i < businessesPerCity; i++) {
      const categorySlug = randomElement(Object.keys(SERVICE_DATA))
      const prefix = randomElement(BUSINESS_PREFIXES)
      const suffix = randomElement(BUSINESS_SUFFIXES)
      const businessName = `${prefix} ${SERVICE_DATA[categorySlug].name} ${suffix}`

      // Random location within ~10 miles of city center
      const lat = cityData.lat + randomFloat(-0.15, 0.15)
      const lng = cityData.lng + randomFloat(-0.15, 0.15)

      businessCount++
      const business = await prisma.business.create({
        data: {
          name: businessName,
          slug: `${generateSlug(businessName)}-${cityData.name.toLowerCase()}-${businessCount}`,
          email: `contact${businessCount}@business.com`,
          phone: `555-${String(randomInt(100, 999)).padStart(3, '0')}-${String(randomInt(1000, 9999)).padStart(4, '0')}`,

          address_line1: `${randomInt(100, 9999)} ${randomElement(['Main', 'Oak', 'Elm', 'Park', 'First', 'Second'])} Street`,
          city_id: cityId,
          state_id: stateId,
          postal_code: String(randomInt(10000, 99999)),

          latitude: lat,
          longitude: lng,
          service_radius_miles: randomFloat(10, 50),

          status: randomElement(['VERIFIED', 'VERIFIED', 'VERIFIED', 'PENDING']),
          verification_level: randomElement(['BASIC', 'STANDARD', 'PREMIUM', 'CERTIFIED']),

          description: `${businessName} provides top-quality ${SERVICE_DATA[categorySlug].display_name.toLowerCase()} services in ${cityData.name} and surrounding areas. With over ${randomInt(5, 25)} years of experience, we're committed to excellence and customer satisfaction.`,
          short_description: `Professional ${SERVICE_DATA[categorySlug].display_name.toLowerCase()} services in ${cityData.name}`,

          year_established: randomInt(1990, 2020),
          employee_count: randomInt(2, 50),
          price_range: randomElement(['BUDGET', 'MODERATE', 'PREMIUM', 'LUXURY']),

          is_licensed: Math.random() > 0.2,
          is_insured: Math.random() > 0.1,
          is_bonded: Math.random() > 0.5,
          offers_emergency: Math.random() > 0.6,

          average_rating: randomFloat(3.5, 5),
          total_reviews: randomInt(5, 500),
          response_time_hours: randomInt(1, 24),
          completion_rate: randomFloat(85, 99),

          owner_id: randomElement(users.filter(u => u.role === 'BUSINESS_OWNER')).id,
        }
      })

      // Add business hours
      const hours = generateBusinessHours()
      for (const hour of hours) {
        await prisma.businessHours.create({
          data: {
            business_id: business.id,
            ...hour
          }
        })
      }

      // Add business services
      const categoryId = categoryMap.get(categorySlug)
      await prisma.businessService.create({
        data: {
          business_id: business.id,
          category_id: categoryId,
          is_primary: true
        }
      })

      // Add some additional service categories randomly
      if (Math.random() > 0.5) {
        const otherCategory = randomElement(Object.keys(SERVICE_DATA).filter(s => s !== categorySlug))
        await prisma.businessService.create({
          data: {
            business_id: business.id,
            category_id: categoryMap.get(otherCategory),
            is_primary: false
          }
        })
      }

      businesses.push(business)
    }
  }

  console.log(`✅ Created ${businesses.length} businesses with hours and services`)

  // Create reviews
  let reviewCount = 0
  for (const business of businesses.slice(0, 100)) { // Add reviews to first 100 businesses
    const numReviews = randomInt(3, 20)

    for (let i = 0; i < numReviews; i++) {
      const reviewer = randomElement(users.filter(u => u.role === 'USER'))

      try {
        await prisma.review.create({
          data: {
            business_id: business.id,
            user_id: reviewer.id,
            rating: randomInt(3, 5),
            title: randomElement([
              'Excellent service!',
              'Very professional',
              'Great work',
              'Highly recommend',
              'Good experience',
              'Will use again',
              'Outstanding job'
            ]),
            content: `Had a great experience with ${business.name}. The technician was professional, arrived on time, and completed the work efficiently. ${randomElement(['Pricing was fair.', 'Very satisfied with the results.', 'Would definitely recommend to others.'', 'Excellent customer service.''])}`,
            status: 'APPROVED',
            is_verified: Math.random() > 0.3,
            helpful_count: randomInt(0, 50),
            service_date: new Date(Date.now() - randomInt(1, 365) * 24 * 60 * 60 * 1000),
            project_cost: randomFloat(100, 5000),
          }
        })
        reviewCount++
      } catch (error) {
        // Skip if duplicate user review
      }
    }
  }

  console.log(`✅ Created ${reviewCount} reviews`)

  // Create some pricing items
  let pricingCount = 0
  for (const business of businesses.slice(0, 50)) { // Add pricing to first 50 businesses
    const numItems = randomInt(3, 8)

    for (let i = 0; i < numItems; i++) {
      await prisma.pricingItem.create({
        data: {
          business_id: business.id,
          name: randomElement([
            'Service Call Fee',
            'Hourly Rate',
            'Emergency Service',
            'Weekend Service',
            'Installation',
            'Repair Service',
            'Maintenance Package',
            'Diagnostic Fee'
          ]),
          price_min: randomFloat(50, 200),
          price_max: randomFloat(200, 1000),
          price_unit: randomElement(['per hour', 'per visit', 'per project', 'flat rate']),
        }
      })
      pricingCount++
    }
  }

  console.log(`✅ Created ${pricingCount} pricing items`)

  console.log('\n🎉 Seed completed successfully!')
  console.log(`
  Summary:
  - States: ${uniqueStates.length}
  - Cities: ${CITY_DATA.length}
  - Service Categories: ${categoryMap.size}
  - Service Types: ${serviceTypeMap.size}
  - Users: ${users.length}
  - Businesses: ${businesses.length}
  - Reviews: ${reviewCount}
  - Pricing Items: ${pricingCount}
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })