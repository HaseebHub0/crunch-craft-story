// API Configuration for Product Review System

// Netlify Function Proxy URL (calls the reviews function internally)
export const REVIEWS_API_BASE = "/.netlify/functions/reviews-v2";

// API Endpoints
export const API_ENDPOINTS = {
  // Submit a new review
  SUBMIT_REVIEW: REVIEWS_API_BASE,

  // Get reviews for a specific product
  GET_REVIEWS: (productId: string) => `${REVIEWS_API_BASE}?productId=${productId}`,
} as const;

// API Configuration
export const API_CONFIG = {
  // Request timeout in milliseconds
  TIMEOUT: 15000,

  // Retry attempts for failed requests
  MAX_RETRIES: 3,

  // Headers for all requests
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  CORS_ERROR: "Cross-origin request blocked. Please try again or contact support.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  REVIEW_SUBMITTED: "Review submitted successfully!",
  REVIEWS_LOADED: "Reviews loaded successfully.",
} as const;
