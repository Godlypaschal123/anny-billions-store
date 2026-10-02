export type ProductCategory = 
  | 'all'
  | 'soaps'
  | 'perfumes'
  | 'wealth'
  | 'love'
  | 'cleansing'
  | 'kits'
  | 'beads'
  | 'oils'
  | 'incense';

export interface Product {
  id: string;
  flyerNumber?: number;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  originalPrice: number; // In Nigerian Naira
  promoPrice: number;    // In Nigerian Naira
  image: string;
  tagline: string;
  description: string;
  consecratedWith: string[];
  spiritualBenefits: string[];
  ritualInstructions: string;
  featured?: boolean;
  isBestseller?: boolean;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  consultationType: 'WhatsApp Video/Call' | 'Voice Note & Divine Analysis' | 'Custom Ritual Ceremony';
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  productUsed: string;
  review: string;
  rating: number;
  date: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
