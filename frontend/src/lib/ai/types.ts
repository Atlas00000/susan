// AI Types and Interfaces

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: string;
  productRecommendations?: string[];
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  productRecommendations?: string[];
}

export interface AISearchQuery {
  query: string;
  filters?: {
    category?: string[];
    priceRange?: [number, number];
    mood?: string[];
    notes?: string[];
  };
}

export interface AISearchResult {
  products: string[];
  interpretation: string;
  confidence: number;
}

export interface QuizEnhancement {
  personalizedDescription: string;
  profileTitle: string;
  topRecommendations: Array<{
    productId: string;
    reasoning: string;
  }>;
}

export interface RateLimitInfo {
  userId: string;
  count: number;
  resetTime: number;
}

