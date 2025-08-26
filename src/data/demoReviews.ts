// Demo review data for testing the review system
// This can be used when the Google Apps Script backend is not yet set up

export interface DemoReview {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const demoReviews: DemoReview[] = [
  {
    id: "1",
    productId: "1",
    name: "Ahmed Khan",
    rating: 5,
    comment: "Absolutely amazing product! The authentic Pakistani flavors are incredible and the protein content is perfect for my fitness routine. Highly recommend!",
    date: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    productId: "1",
    name: "Fatima Ali",
    rating: 4,
    comment: "Great taste and good quality. The spices are perfectly balanced and it's a healthy snack option. Will definitely buy again.",
    date: "2024-01-14T14:20:00Z"
  },
  {
    id: "3",
    productId: "1",
    name: "Muhammad Hassan",
    rating: 5,
    comment: "Best protein snack I've ever tried! The traditional recipe with modern nutrition makes it perfect. Love the texture and flavor.",
    date: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    productId: "1",
    name: "Aisha Rahman",
    rating: 4,
    comment: "Delicious and nutritious! Perfect for snacking between meals. The protein content helps me stay full longer. Great product!",
    date: "2024-01-12T16:45:00Z"
  },
  {
    id: "5",
    productId: "1",
    name: "Omar Malik",
    rating: 5,
    comment: "Exceptional quality! The authentic Pakistani taste brings back memories of home. High protein content makes it ideal for athletes.",
    date: "2024-01-11T11:30:00Z"
  }
];

// Function to get demo reviews for a specific product
export const getDemoReviews = (productId: string): DemoReview[] => {
  return demoReviews.filter(review => review.productId === productId);
};

// Function to add a demo review (for testing purposes)
export const addDemoReview = (review: Omit<DemoReview, 'id' | 'date'>): DemoReview => {
  const newReview: DemoReview = {
    ...review,
    id: (demoReviews.length + 1).toString(),
    date: new Date().toISOString()
  };
  
  // In a real app, this would be sent to the backend
  // For demo purposes, we'll just log it
  console.log('Demo review added:', newReview);
  
  return newReview;
};

// Function to calculate average rating from demo reviews
export const getDemoAverageRating = (productId: string): number => {
  const productReviews = getDemoReviews(productId);
  if (productReviews.length === 0) return 0;
  
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / productReviews.length;
};
