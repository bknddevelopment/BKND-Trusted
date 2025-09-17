export interface Business {
  id: string;
  name: string;
  description: string;
  category: ServiceType;
  rating: number;
  trustScore: number; // 0-100
  reviews: number;
  verified: boolean;
  responseTime: string;
  priceRange: PriceRange;
  images: string[];
  location: Location;
  services: Service[];
  availability: Availability;
  badges: Badge[];
  insurance: boolean;
  licensed: boolean;
  yearsInBusiness: number;
  completedJobs: number;
}

export interface ServiceType {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export interface PriceRange {
  min: number;
  max: number;
  unit: 'hour' | 'project' | 'sqft' | 'item';
}

export interface Location {
  address: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceRadius: number; // in miles
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  popular?: boolean;
}

export interface Availability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
  nextAvailable: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  booked?: boolean;
}

export interface Badge {
  type: 'verified' | 'top-rated' | 'quick-responder' | 'eco-friendly' | 'veteran-owned';
  label: string;
  icon?: string;
}

export interface Review {
  id: string;
  businessId: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  rating: number;
  date: string;
  text: string;
  images?: string[];
  response?: {
    text: string;
    date: string;
  };
  helpful: number;
}

export interface SearchFilters {
  serviceType?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: 'today' | 'tomorrow' | 'this-week' | 'flexible';
  rating?: number;
  distance?: number;
  verified?: boolean;
  sortBy?: 'relevance' | 'rating' | 'price' | 'distance' | 'availability';
}

export interface ComparisonItem {
  business: Business;
  selected: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  type: 'before' | 'after' | 'work';
  date?: string;
}