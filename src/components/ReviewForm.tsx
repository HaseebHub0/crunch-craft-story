import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS, API_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/config/api";

const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be 1-5"),
  comment: z.string().min(1, "Comment is required").max(500, "Comment must be less than 500 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: string;
  onSubmitSuccess: () => void;
  apiEndpoint: string;
}

export default function ReviewForm({ productId, onSubmitSuccess, apiEndpoint }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = rating >= star;
          const isHalfFilled = rating >= star - 0.5 && rating < star;
          
          return (
            <button
              key={star}
              type="button"
              className={`transition-all duration-200 ${
                interactive ? 'hover:scale-110' : ''
              }`}
              onClick={interactive ? () => handleRatingChange(star) : undefined}
              onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
              onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            >
              {isFilled ? (
                <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ) : isHalfFilled ? (
                <StarHalf className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ) : (
                <Star className="w-8 h-8 text-gray-300 hover:text-yellow-300" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setIsSubmitting(true);
      const reviewData = {
        productId,
        name: data.name,
        rating: data.rating,
        comment: data.comment,
      };

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success(SUCCESS_MESSAGES.REVIEW_SUBMITTED);
          reset();
          setSelectedRating(0);
          onSubmitSuccess();
        } else {
          toast.error(result.error || ERROR_MESSAGES.SERVER_ERROR);
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error response:', errorData);
        toast.error(errorData.error || ERROR_MESSAGES.SERVER_ERROR);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoverRating || selectedRating;

  return (
    <div className="border-t border-gray-200 pt-8 mb-8">
      <h3
        className="text-xl font-semibold text-gray-900 mb-4"
        style={{ fontFamily: "'Montserrat', serif" }}
      >
        Write a Review
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Interactive Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rating *
          </label>
          <div className="flex items-center gap-4">
            {renderStars(displayRating, true)}
            <span className="text-lg font-medium text-gray-700">
              {displayRating > 0 ? `${displayRating}/5` : 'Select rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-2">{errors.rating.message}</p>
          )}
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </div>

        {/* Comment Field */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Comment *
          </label>
          <textarea
            {...register('comment')}
            id="comment"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Share your experience with this product..."
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-2">{errors.comment.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Maximum 500 characters
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || selectedRating === 0}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
}
