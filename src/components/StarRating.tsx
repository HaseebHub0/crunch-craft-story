import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  size = 'md', 
  showScore = false, 
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const renderStars = () => {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {[1, 2, 3, 4, 5].map((star) => {
          if (rating >= star) {
            return (
              <Star 
                key={star} 
                className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} 
              />
            );
          } else if (rating >= star - 0.5) {
            return (
              <StarHalf 
                key={star} 
                className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} 
              />
            );
          } else {
            return (
              <Star 
                key={star} 
                className={`${sizeClasses[size]} text-gray-300`} 
              />
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {renderStars()}
      {showScore && (
        <span className="text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}/5
        </span>
      )}
    </div>
  );
}
