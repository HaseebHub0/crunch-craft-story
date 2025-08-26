import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { API_ENDPOINTS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/config/api';

export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface UseReviewsOptions {
  productId: string;
}

interface UseReviewsReturn {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  averageRating: number;
  submitReview: (reviewData: Omit<Review, 'id' | 'date'>) => Promise<boolean>;
  refreshReviews: () => Promise<void>;
}

export const useReviews = ({ productId }: UseReviewsOptions): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  // Fetch reviews from API
  const fetchReviewsFromAPI = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINTS.GET_REVIEWS(productId));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.reviews || []);
      } else {
        throw new Error(data.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reviews';
      setError(errorMessage);
      console.error('Error fetching reviews:', err);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  // Submit review to API
  const submitReviewToAPI = useCallback(async (reviewData: Omit<Review, 'id' | 'date'>): Promise<boolean> => {
    try {
      const response = await fetch(API_ENDPOINTS.SUBMIT_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success(SUCCESS_MESSAGES.REVIEW_SUBMITTED);
        return true;
      } else {
        throw new Error(data.error || 'Failed to submit review');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit review';
      toast.error(errorMessage);
      console.error('Error submitting review:', err);
      return false;
    }
  }, []);

  // Main submit review function
  const submitReview = useCallback(async (reviewData: Omit<Review, 'id' | 'date'>): Promise<boolean> => {
    return submitReviewToAPI(reviewData);
  }, [submitReviewToAPI]);

  // Refresh reviews function
  const refreshReviews = useCallback(async () => {
    await fetchReviewsFromAPI();
  }, [fetchReviewsFromAPI]);

  // Initial load
  useEffect(() => {
    fetchReviewsFromAPI();
  }, [productId, fetchReviewsFromAPI]);

  return {
    reviews,
    isLoading,
    error,
    averageRating,
    submitReview,
    refreshReviews,
  };
};
