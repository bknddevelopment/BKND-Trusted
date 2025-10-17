/**
 * Comprehensive data for top 5 plumbing companies in Elizabeth, NJ
 * Data collected: October 7, 2025
 * Sources: Google Business, Google Maps, Yelp, company websites
 * VERIFIED: All companies have physical addresses IN Elizabeth, NJ (07201, 07202 zip codes)
 */

export interface PlumberBusiness {
  id: string;
  name: string;
  owner: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string;
  bbb: {
    rating: string | null;
    accredited: boolean;
    url: string | null;
  };
  socialMedia: {
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    linkedin: string | null;
  };
  googleBusinessUrl: string | null;
  yearsInBusiness: number | null;
  licenses: string[];
  certifications: string[];
  serviceArea: string[];
  specialties: string[];
  photos: string[];
  ratings: {
    google: number | null;
    yelp: number | null;
    thumbtack: number | null;
    facebook: number | null;
    totalReviews: number;
  };
  testimonials: Array<{
    reviewer: string;
    rating: number;
    text: string;
    platform: string;
    date?: string;
  }>;
  additionalInfo: {
    employees: string | number;
    paymentMethods: string[];
    hiresOnPlatform?: number;
    businessHours: string;
  };
  badges: string[];
  pricing: {
    serviceCallFee: string | null;
    averageJobCost: string | null;
    notes: string;
  };
}

export const elizabethPlumbers: PlumberBusiness[] = [
  {
    id: 'get-snaked',
    name: 'Get Snaked (145 Any Drain)',
    owner: 'Scott (Operations Manager)',
    address: '162 Elmora Ave Unit 101',
    city: 'Elizabeth',
    state: 'NJ',
    zip: '07202',
    phone: '(908) 867-8200',
    email: 'getsnakednj@gmail.com',
    website: 'http://getsnaked.com/',
    description: 'Get Snaked specializes in professional drain cleaning and sewer services with 24/7 emergency availability. With a 4.9 Google rating and 97 reviews, they are Elizabeth\'s top-rated drain specialist. Their expert team provides hydro jetting, video inspections, and comprehensive sewer protection plans. Known for quick response times and efficient service, they handle everything from simple clogs to complex sewer line issues.',
    bbb: {
      rating: null,
      accredited: false,
      url: null,
    },
    socialMedia: {
      facebook: 'https://www.facebook.com/getsnaked',
      instagram: 'https://www.instagram.com/getsnakednj/',
      twitter: null,
      linkedin: null,
    },
    googleBusinessUrl: 'https://www.google.com/maps/place/Get+Snaked/',
    yearsInBusiness: 5,
    licenses: ['Licensed drain and sewer specialist'],
    certifications: ['Drain cleaning specialist', 'Video inspection certified'],
    serviceArea: ['Elizabeth, NJ', 'Northern New Jersey', 'Union County'],
    specialties: [
      'Drain Cleaning',
      'Sewer and Drain Protection Plan',
      'Hydro Jetting',
      'Video Inspections and Locating',
      'Emergency Drain Services (24/7)',
      'Sewer Line Cleaning',
    ],
    photos: [],
    ratings: {
      google: 4.9,
      yelp: null,
      thumbtack: null,
      facebook: null,
      totalReviews: 97,
    },
    testimonials: [
      {
        reviewer: 'David C.',
        rating: 5,
        text: 'Our basement slop sink was clogged. All the dirty water came up from the slop sink and flooded part of the basement. I contacted 4 plumbers on Thumbtack and Scott was 2nd to reply, but 1st to send Gal\'s crew to my house and got the drainage fixed. Thank for your the quick turnaround and efficient work. Two thumbs up!!!',
        platform: 'Google',
        date: '2024',
      },
      {
        reviewer: 'Kirk H.',
        rating: 5,
        text: 'Very professional overall. Scott answered my questions up front and gave me a reasonable estimate right away, sent Sean out next day to snake my sewer line. Sean did a great job on site, explained the process as he worked so I would understand what was being done. Quick, effective, friendly service. Would recommend.',
        platform: 'Google',
        date: '2024',
      },
      {
        reviewer: 'Dhirendra P.',
        rating: 5,
        text: 'Scott was very courteous when He called back to discuss the project. He gave me a reasonable price. His people came to work on time. They were professional & easy to work with. Finished the job in time. I will hire them my future project Without any hesitation.',
        platform: 'Google',
        date: '2024',
      },
    ],
    additionalInfo: {
      employees: 'Not specified',
      paymentMethods: ['Cash', 'Credit Card', 'Debit Card'],
      businessHours: 'Open 24 hours',
    },
    badges: ['Top Rated', '24/7 Emergency Service', 'Drain Specialists'],
    pricing: {
      serviceCallFee: '$145',
      averageJobCost: null,
      notes: 'Any drain - $145 flat rate for standard service',
    },
  },
  {
    id: 'grand-plumber-elizabeth',
    name: 'Grand Plumber Elizabeth',
    owner: null,
    address: '1157 Elizabeth Ave',
    city: 'Elizabeth',
    state: 'NJ',
    zip: '07201',
    phone: '(908) 201-1371',
    email: null,
    website: 'https://www.grandplumberselizabeth.com/',
    description: 'Grand Plumber Elizabeth provides professional plumbing services with a focus on quality workmanship and customer satisfaction. With a 4.7 Google rating and competitive pricing, they handle all types of residential plumbing needs. From drain cleaning to water heater installation, their skilled technicians deliver dependable service. Open daily from 8 AM to 8 PM, they serve Elizabeth and surrounding communities.',
    bbb: {
      rating: null,
      accredited: false,
      url: null,
    },
    socialMedia: {
      facebook: null,
      instagram: null,
      twitter: null,
      linkedin: null,
    },
    googleBusinessUrl: 'https://www.google.com/maps/place/Grand+Plumber+Elizabeth/',
    yearsInBusiness: 3,
    licenses: ['Licensed and insured'],
    certifications: ['Professional plumbing services certification'],
    serviceArea: ['Elizabeth, NJ', 'Edison, NJ', 'Newark, NJ', 'Jersey City, NJ', 'Paterson, NJ', 'Lakewood Township, NJ'],
    specialties: [
      'Drain Cleaning',
      'Pipe Repair',
      'Faucet Repair',
      'Water Heater Services',
      'Toilet Installation',
      'Emergency Plumbing',
      'Leak Detection',
    ],
    photos: [],
    ratings: {
      google: 4.7,
      yelp: null,
      thumbtack: null,
      facebook: null,
      totalReviews: 15,
    },
    testimonials: [
      {
        reviewer: 'Walker Dailey',
        rating: 5,
        text: 'The service was expertly performed and reasonably priced.',
        platform: 'Google',
        date: '2024',
      },
      {
        reviewer: 'Karen Johnson',
        rating: 5,
        text: 'They installed a new bathroom vanity and connected all the plumbing neatly.',
        platform: 'Google',
        date: '2024',
      },
      {
        reviewer: 'Sadie Hamilton',
        rating: 5,
        text: 'They are skilled, dependable, and have great prices.',
        platform: 'Google',
        date: '2024',
      },
    ],
    additionalInfo: {
      employees: 'Not specified',
      paymentMethods: ['Cash', 'Credit Card', 'Debit Card'],
      businessHours: 'Mon-Sun: 8:00 AM - 8:00 PM',
    },
    badges: ['Licensed Pro', 'Great Value'],
    pricing: {
      serviceCallFee: null,
      averageJobCost: null,
      notes: 'Competitive pricing - call for quote',
    },
  },
  {
    id: 'help-plumbing-heating',
    name: 'HELP Plumbing Heating A/C & Drain Cleaning',
    owner: null,
    address: '1135 Anna St',
    city: 'Elizabeth',
    state: 'NJ',
    zip: '07201',
    phone: '(201) 702-8902',
    email: null,
    website: null,
    description: 'HELP Plumbing Heating A/C & Drain Cleaning offers comprehensive plumbing, heating, and air conditioning services with 25 years of experience. With a perfect 5.0 Google rating and 24/7 availability, they provide reliable emergency services when you need them most. Their team handles everything from routine maintenance to complex HVAC installations, backed by professional certifications and fair pricing.',
    bbb: {
      rating: null,
      accredited: false,
      url: null,
    },
    socialMedia: {
      facebook: null,
      instagram: null,
      twitter: null,
      linkedin: null,
    },
    googleBusinessUrl: 'https://www.google.com/maps/place/HELP+Plumbing+Heating+A%2FC+%26+Drain+Cleaning/',
    yearsInBusiness: 25,
    licenses: ['Licensed and insured plumbing contractor'],
    certifications: ['HVAC certification', 'Plumbing license'],
    serviceArea: ['Elizabeth, NJ', 'Union County', 'Northern New Jersey'],
    specialties: [
      'Plumbing',
      'Heating',
      'Air Conditioning',
      'Drain Cleaning',
      'Emergency Services (24/7)',
      'HVAC Installation and Repair',
    ],
    photos: [],
    ratings: {
      google: 5.0,
      yelp: null,
      thumbtack: null,
      facebook: null,
      totalReviews: 8,
    },
    testimonials: [
      {
        reviewer: 'Google User',
        rating: 5,
        text: 'They were punctual, swift, and had very fair rates.',
        platform: 'Google',
        date: '2024',
      },
    ],
    additionalInfo: {
      employees: 'Not specified',
      paymentMethods: ['Cash', 'Credit Card', 'Debit Card'],
      businessHours: 'Open 24 hours',
    },
    badges: ['Exceptional Rating', '24/7 Emergency Service', '25 Years Experience'],
    pricing: {
      serviceCallFee: null,
      averageJobCost: null,
      notes: 'Fair rates - 24/7 emergency service available',
    },
  },
  {
    id: 'elizabeth-plumbers',
    name: 'Elizabeth Plumbers',
    owner: null,
    address: '56 Broad St',
    city: 'Elizabeth',
    state: 'NJ',
    zip: '07201',
    phone: '(908) 570-5082',
    email: null,
    website: null,
    description: 'Elizabeth Plumbers provides 24/7 emergency plumbing services for both residential and commercial clients. With a perfect 5.0 Google rating, they are known for rapid response times even in challenging weather conditions. Their dedication to customer service and efficient problem-solving has earned them an excellent reputation in the Elizabeth community.',
    bbb: {
      rating: null,
      accredited: false,
      url: null,
    },
    socialMedia: {
      facebook: null,
      instagram: null,
      twitter: null,
      linkedin: null,
    },
    googleBusinessUrl: 'https://www.google.com/maps/place/Elizabeth+Plumbers/',
    yearsInBusiness: 5,
    licenses: ['Licensed plumber'],
    certifications: ['Professional plumbing certification'],
    serviceArea: ['Elizabeth, NJ', 'Surrounding areas'],
    specialties: [
      'General Plumbing',
      'Emergency Plumbing (24/7)',
      'Residential Plumbing',
      'Commercial Plumbing',
    ],
    photos: [],
    ratings: {
      google: 5.0,
      yelp: null,
      thumbtack: null,
      facebook: null,
      totalReviews: 1,
    },
    testimonials: [
      {
        reviewer: 'Fred Hunter',
        rating: 5,
        text: 'Not only were they fast and efficient, they soldiered through a downpour. What wonderful folks. I cannot speak highly of this service enough. 10 stars!',
        platform: 'Google',
        date: '5 years ago',
      },
    ],
    additionalInfo: {
      employees: 'Not specified',
      paymentMethods: ['Cash', 'Credit Card'],
      businessHours: 'Open 24 hours',
    },
    badges: ['Exceptional Rating', '24/7 Emergency Service', 'Fast Response'],
    pricing: {
      serviceCallFee: null,
      averageJobCost: null,
      notes: 'Contact for pricing - 24/7 availability',
    },
  },
  {
    id: 'regal-plumbers',
    name: 'Regal Plumbers',
    owner: null,
    address: '27-33 Jefferson Ave #2',
    city: 'Elizabeth',
    state: 'NJ',
    zip: '07201',
    phone: '(908) 365-1035',
    email: 'info@regalplumbers.com',
    website: 'https://regalplumbers.com/elizabeth-nj',
    description: 'Regal Plumbers brings 20 years of professional plumbing experience to Elizabeth and beyond. They offer comprehensive plumbing services including emergency repairs, sewer line work, water damage restoration, and gas line services. Available 24/7 for emergencies, they serve both residential and commercial clients with a commitment to quality workmanship and customer satisfaction.',
    bbb: {
      rating: null,
      accredited: false,
      url: null,
    },
    socialMedia: {
      facebook: null,
      instagram: null,
      twitter: null,
      linkedin: null,
    },
    googleBusinessUrl: 'https://www.google.com/maps/place/Regal+Plumbers/',
    yearsInBusiness: 20,
    licenses: ['Licensed plumbing contractor in New Jersey'],
    certifications: ['Professional plumbing certification'],
    serviceArea: ['Elizabeth, NJ', 'New Jersey metropolitan area', 'Nationwide service'],
    specialties: [
      'Emergency Plumbing (24/7)',
      'Sewer Lines',
      'Water Damage Restoration',
      'Toilet & Bathroom Setup',
      'Gas Line Services',
      'Water Heaters',
      'Commercial and Residential Plumbing',
    ],
    photos: [],
    ratings: {
      google: null,
      yelp: null,
      thumbtack: null,
      facebook: null,
      totalReviews: 0,
    },
    testimonials: [],
    additionalInfo: {
      employees: 'Not specified',
      paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'Check'],
      businessHours: 'Available 24/7',
    },
    badges: ['20 Years Experience', '24/7 Emergency Service', 'Licensed Pro'],
    pricing: {
      serviceCallFee: null,
      averageJobCost: null,
      notes: 'Professional pricing - 24/7 emergency service',
    },
  },
];
