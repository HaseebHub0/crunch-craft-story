import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";

interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
}

export default function ReviewsList({ reviews, isLoading }: ReviewsListProps) {
  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          if (rating >= star) {
            return <Star key={star} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />;
          } else if (rating >= star - 0.5) {
            return <StarHalf key={star} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />;
          } else {
            return <Star key={star} className={`${sizeClasses[size]} text-gray-300`} />;
          }
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="text-gray-500 mt-2">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">No reviews yet</p>
        <p className="text-gray-400 text-sm">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">
                  {review.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(review.rating, 'sm')}
                  <span className="text-sm text-gray-500 font-medium">{review.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500 block">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span className="text-xs text-gray-400 block mt-1">
                {new Date(review.date).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
          
          <div className="pl-15">
            <p className="text-gray-700 leading-relaxed text-base">{review.comment}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
