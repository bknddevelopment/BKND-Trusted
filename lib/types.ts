export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  location: {
    city: string;
    state: string;
    address: string;
  };
  verified: boolean;
  featured: boolean;
  yearsInBusiness: number;
  license?: string;
  insurance?: boolean;
  bond?: boolean;
  services: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  availability: 'available' | 'busy' | 'booked';
  responseTime: string;
  completedJobs: number;
  badges: Badge[];
}

export interface Badge {
  type: 'verified' | 'licensed' | 'insured' | 'bonded' | 'top-rated' | 'fast-response';
  label: string;
  icon?: string;
}

export interface Review {
  id: string;
  businessId: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  popular: boolean;
  description: string;
}

export interface Location {
  city: string;
  state: string;
  stateCode: string;
  businessCount: number;
  popular: boolean;
}