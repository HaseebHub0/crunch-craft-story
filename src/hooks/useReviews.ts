import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { API_ENDPOINTS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/config/api';
import { 
  addReview, 
  getReviewsByProductId, 
  validateReviewData,
  Review as FirebaseReview,
  ReviewInput 
} from '@/services/reviewService';

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

  // Fetch reviews from Firebase
  const fetchReviewsFromFirebase = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const firebaseReviews = await getReviewsByProductId(productId);
      
      // Convert Firebase reviews to the expected format
      const formattedReviews: Review[] = firebaseReviews.map(review => ({
        id: review.id || '',
        productId: review.productId,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        date: review.date
      }));
      
      setReviews(formattedReviews);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reviews';
      setError(errorMessage);
      console.error('Error fetching reviews from Firebase:', err);
      
      // Load demo reviews as fallback
      const demoReviews = [
        {
          id: "demo-001",
          productId: "1",
          name: "Ahmed Khan",
          rating: 5,
          comment: "Excellent protein nimko! Great taste and high protein content. Perfect for my fitness goals.",
          date: "2024-12-15T09:00:00.000Z"
        },
        {
          id: "demo-002",
          productId: "1", 
          name: "Fatima Ali",
          rating: 4,
          comment: "Good quality protein nimko with authentic Pakistani flavors. Highly recommended.",
          date: "2024-12-10T15:30:00.000Z"
        }
      ];
      
      setReviews(demoReviews.filter(review => review.productId === productId));
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  // Submit review to Firebase
  const submitReviewToFirebase = useCallback(async (reviewData: Omit<Review, 'id' | 'date'>): Promise<boolean> => {
    try {
      // Validate review data
      const reviewInput: ReviewInput = {
        productId: reviewData.productId,
        name: reviewData.name,
        rating: reviewData.rating,
        comment: reviewData.comment
      };
      
      validateReviewData(reviewInput);
      
      // Save to Firebase
      const reviewId = await addReview(reviewInput);
      console.log('Review saved with ID:', reviewId);
      
      toast.success('Review submitted successfully!');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit review';
      toast.error(errorMessage);
      console.error('Error submitting review to Firebase:', err);
      return false;
    }
  }, []);

  // Main submit review function
  const submitReview = useCallback(async (reviewData: Omit<Review, 'id' | 'date'>): Promise<boolean> => {
    const success = await submitReviewToFirebase(reviewData);
    if (success) {
      // Refresh reviews after successful submission
      await fetchReviewsFromFirebase();
    }
    return success;
  }, [submitReviewToFirebase, fetchReviewsFromFirebase]);

  // Refresh reviews function
  const refreshReviews = useCallback(async () => {
    await fetchReviewsFromFirebase();
  }, [fetchReviewsFromFirebase]);

  // Initial load
  useEffect(() => {
    fetchReviewsFromFirebase();
  }, [productId, fetchReviewsFromFirebase]);

  return {
    reviews,
    isLoading,
    error,
    averageRating,
    submitReview,
    refreshReviews,
  };
};
