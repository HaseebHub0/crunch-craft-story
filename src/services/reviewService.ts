import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface Review {
  id?: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  timestamp?: Timestamp;
}

export interface ReviewInput {
  productId: string;
  name: string;
  rating: number;
  comment: string;
}

const REVIEWS_COLLECTION = 'reviews';

/**
 * Add a new review to Firebase
 */
export const addReview = async (reviewData: ReviewInput): Promise<string> => {
  try {
    const reviewWithTimestamp = {
      ...reviewData,
      date: new Date().toISOString(),
      timestamp: Timestamp.now(),
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), reviewWithTimestamp);
    console.log('Review added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Failed to save review. Please try again.');
  }
};

/**
 * Get all reviews for a specific product
 */
export const getReviewsByProductId = async (productId: string): Promise<Review[]> => {
  try {
    const reviewsQuery = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(reviewsQuery);
    
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        productId: data.productId,
        name: data.name,
        rating: data.rating,
        comment: data.comment,
        date: data.date,
        timestamp: data.timestamp
      });
    });

    console.log(`Found ${reviews.length} reviews for product ${productId}`);
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews. Please try again.');
  }
};

/**
 * Get all reviews (for admin purposes)
 */
export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const reviewsQuery = query(
      collection(db, REVIEWS_COLLECTION),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(reviewsQuery);
    
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        productId: data.productId,
        name: data.name,
        rating: data.rating,
        comment: data.comment,
        date: data.date,
        timestamp: data.timestamp
      });
    });

    console.log(`Found ${reviews.length} total reviews`);
    return reviews;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw new Error('Failed to fetch reviews. Please try again.');
  }
};

/**
 * Calculate average rating for a product
 */
export const getAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

/**
 * Validate review data before submission
 */
export const validateReviewData = (reviewData: ReviewInput): boolean => {
  if (!reviewData.name || reviewData.name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }
  
  if (!reviewData.comment || reviewData.comment.trim().length < 10) {
    throw new Error('Comment must be at least 10 characters long');
  }
  
  if (reviewData.rating < 1 || reviewData.rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  
  if (!reviewData.productId || reviewData.productId.trim().length === 0) {
    throw new Error('Product ID is required');
  }
  
  return true;
};
