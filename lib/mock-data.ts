import { Business, Review, Category, Location } from './types';

export const mockCategories: Category[] = [
  {
    id: 'hvac',
    name: 'HVAC',
    icon: '🔥',
    count: 245,
    popular: true,
    description: 'Heating, ventilation, and air conditioning services'
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '🚿',
    count: 312,
    popular: true,
    description: 'Professional plumbing and pipe services'
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    count: 189,
    popular: true,
    description: 'Licensed electrical contractors and services'
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '🧹',
    count: 423,
    popular: true,
    description: 'House cleaning and commercial cleaning services'
  },
  {
    id: 'landscaping',
    name: 'Landscaping',
    icon: '🌿',
    count: 267,
    popular: true,
    description: 'Lawn care, gardening, and landscape design'
  },
  {
    id: 'roofing',
    name: 'Roofing',
    icon: '🏠',
    count: 156,
    popular: true,
    description: 'Roof repair, replacement, and maintenance'
  }
];

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Premium HVAC Solutions',
    category: 'HVAC',
    rating: 4.9,
    reviewCount: 287,
    description: 'Expert HVAC services with 24/7 emergency support. Certified technicians, satisfaction guaranteed.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800',
    location: {
      city: 'Austin',
      state: 'Texas',
      address: '123 Main St, Austin, TX 78701'
    },
    verified: true,
    featured: true,
    yearsInBusiness: 15,
    license: 'TACLA28492E',
    insurance: true,
    bond: true,
    services: ['AC Repair', 'Heating Installation', 'Duct Cleaning', 'Maintenance'],
    priceRange: '$$$',
    availability: 'available',
    responseTime: '< 1 hour',
    completedJobs: 3420,
    badges: [
      { type: 'verified', label: 'Verified Business' },
      { type: 'licensed', label: 'Licensed' },
      { type: 'insured', label: 'Insured' },
      { type: 'top-rated', label: 'Top Rated' }
    ]
  },
  {
    id: '2',
    name: 'Swift Plumbing Pros',
    category: 'Plumbing',
    rating: 4.8,
    reviewCount: 412,
    description: 'Fast, reliable plumbing services. Same-day service available. Licensed and insured professionals.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
    location: {
      city: 'Dallas',
      state: 'Texas',
      address: '456 Oak Ave, Dallas, TX 75201'
    },
    verified: true,
    featured: true,
    yearsInBusiness: 12,
    license: 'RMP-42918',
    insurance: true,
    bond: true,
    services: ['Leak Repair', 'Drain Cleaning', 'Water Heater', 'Emergency Service'],
    priceRange: '$$',
    availability: 'available',
    responseTime: '< 30 min',
    completedJobs: 5831,
    badges: [
      { type: 'verified', label: 'Verified Business' },
      { type: 'fast-response', label: 'Fast Response' },
      { type: 'licensed', label: 'Licensed' },
      { type: 'insured', label: 'Insured' }
    ]
  },
  {
    id: '3',
    name: 'Elite Electrical Services',
    category: 'Electrical',
    rating: 4.7,
    reviewCount: 198,
    description: 'Professional electrical contractors. Residential and commercial. Safety certified.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    location: {
      city: 'Houston',
      state: 'Texas',
      address: '789 Electric Blvd, Houston, TX 77001'
    },
    verified: true,
    featured: false,
    yearsInBusiness: 8,
    license: 'TECL32847',
    insurance: true,
    bond: false,
    services: ['Wiring', 'Panel Upgrades', 'Lighting', 'Troubleshooting'],
    priceRange: '$$$',
    availability: 'busy',
    responseTime: '< 2 hours',
    completedJobs: 2156,
    badges: [
      { type: 'verified', label: 'Verified Business' },
      { type: 'licensed', label: 'Licensed' },
      { type: 'top-rated', label: 'Top Rated' }
    ]
  },
  {
    id: '4',
    name: 'Sparkle Clean Services',
    category: 'Cleaning',
    rating: 4.9,
    reviewCount: 567,
    description: 'Professional house cleaning. Eco-friendly products. Satisfaction guaranteed or money back.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    location: {
      city: 'San Antonio',
      state: 'Texas',
      address: '321 Clean Way, San Antonio, TX 78201'
    },
    verified: true,
    featured: true,
    yearsInBusiness: 6,
    license: 'CLS-89234',
    insurance: true,
    bond: true,
    services: ['Deep Cleaning', 'Regular Cleaning', 'Move-in/out', 'Office Cleaning'],
    priceRange: '$$',
    availability: 'available',
    responseTime: 'Same day',
    completedJobs: 8234,
    badges: [
      { type: 'verified', label: 'Verified Business' },
      { type: 'bonded', label: 'Bonded' },
      { type: 'top-rated', label: 'Top Rated' }
    ]
  },
  {
    id: '5',
    name: 'Green Thumb Landscaping',
    category: 'Landscaping',
    rating: 4.6,
    reviewCount: 234,
    description: 'Full-service landscaping and lawn care. Design, installation, and maintenance.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    location: {
      city: 'Fort Worth',
      state: 'Texas',
      address: '654 Garden Rd, Fort Worth, TX 76101'
    },
    verified: true,
    featured: false,
    yearsInBusiness: 10,
    license: 'LLS-45612',
    insurance: true,
    bond: false,
    services: ['Lawn Care', 'Tree Service', 'Design', 'Irrigation'],
    priceRange: '$$',
    availability: 'available',
    responseTime: '< 24 hours',
    completedJobs: 1892,
    badges: [
      { type: 'verified', label: 'Verified Business' },
      { type: 'licensed', label: 'Licensed' },
      { type: 'insured', label: 'Insured' }
    ]
  },
  {
    id: '6',
    name: 'Top Tier Roofing',
    category: 'Roofing',
    rating: 4.8,
    reviewCount: 143,
    description: 'Expert roofing services. Storm damage specialists. Lifetime warranty available.',
    image: 'https://images.unsplash.com/photo-1562113350-96ac96a1e911?w=800',
    location: {
      city: 'Plano',
      state: 'Texas',
      address: '987 Roof Ave, Plano, TX 75023'
    },
    verified: true,
    featured: true,
    yearsInBusiness: 20,
    license: 'RCL-78234',
    insurance: true,
    bond: true,
    services: ['Roof Repair', 'Replacement', 'Inspection', 'Storm Damage'],
    priceRange: '$$$$',
    availability: 'available',
    responseTime: 'Same day',
    completedJobs: 3421,
    badges: [
      { type: 'verified', label: 'Verified Business' },
      { type: 'licensed', label: 'Licensed' },
      { type: 'bonded', label: 'Bonded' },
      { type: 'insured', label: 'Insured' }
    ]
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    businessId: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10B981&color=fff',
      location: 'Austin, TX'
    },
    rating: 5,
    date: '2024-01-15',
    content: 'Excellent service! The technician arrived on time, was very professional, and fixed our AC quickly. Highly recommend!',
    verified: true,
    helpful: 23
  },
  {
    id: 'r2',
    businessId: '2',
    author: {
      name: 'Mike Chen',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=10B981&color=fff',
      location: 'Dallas, TX'
    },
    rating: 5,
    date: '2024-01-10',
    content: 'Swift Plumbing saved the day! Had a major leak and they arrived within 30 minutes. Professional and fair pricing.',
    verified: true,
    helpful: 18
  },
  {
    id: 'r3',
    businessId: '4',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=10B981&color=fff',
      location: 'San Antonio, TX'
    },
    rating: 5,
    date: '2024-01-08',
    content: 'Best cleaning service in town! They are thorough, use eco-friendly products, and my house has never looked better.',
    verified: true,
    helpful: 34
  }
];

export const topLocations: Location[] = [
  { city: 'Austin', state: 'Texas', stateCode: 'TX', businessCount: 1234, popular: true },
  { city: 'Dallas', state: 'Texas', stateCode: 'TX', businessCount: 1567, popular: true },
  { city: 'Houston', state: 'Texas', stateCode: 'TX', businessCount: 2134, popular: true },
  { city: 'San Antonio', state: 'Texas', stateCode: 'TX', businessCount: 987, popular: true },
  { city: 'Fort Worth', state: 'Texas', stateCode: 'TX', businessCount: 756, popular: true },
  { city: 'Plano', state: 'Texas', stateCode: 'TX', businessCount: 543, popular: true },
  { city: 'Irving', state: 'Texas', stateCode: 'TX', businessCount: 432, popular: false },
  { city: 'Arlington', state: 'Texas', stateCode: 'TX', businessCount: 521, popular: false }
];