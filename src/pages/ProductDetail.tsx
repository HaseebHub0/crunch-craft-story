import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import StarRating from "@/components/StarRating";
import { useReviews } from "@/hooks/useReviews";
import { API_ENDPOINTS } from "@/config/api";
import productImage from "/Products/Product1.png";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  weight: string;
  protein: string;
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  // Use the reviews hook with the new file-based backend
  const { 
    reviews, 
    isLoading: isLoadingReviews, 
    error: reviewsError, 
    averageRating, 
    submitReview, 
    refreshReviews 
  } = useReviews({ 
    productId: productId || ""
  });

  // Mock product data - replace with your actual product fetching logic
  const product: Product = {
    id: productId || "1",
    name: "Pakasian Protein Nimko",
    price: 1399,
    image: productImage,
    description: "Premium Pakistani snack with 22g protein per 100g serving. Made with authentic spices and high-quality ingredients, this protein-rich snack is perfect for health-conscious individuals who love traditional Pakistani flavors.",
    weight: "1 kg",
    protein: "22g"
  };

  // Handle review submission success
  const handleReviewSubmitSuccess = async () => {
    // Refresh reviews to show the new one
    await refreshReviews();
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1
    });
    setAddedItems(prev => new Set(prev).add(product.id));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            ← Back to Products
          </Button>
        </motion.div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {product.protein} Protein
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Montserrat', serif" }}
              >
                {product.name}
              </h1>
              
              <p
                className="text-lg text-gray-600 mb-6 leading-relaxed"
                style={{ fontFamily: "'Nunito', serif" }}
              >
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  PKR {product.price}
                </div>
                <div className="text-lg text-gray-500">{product.weight}</div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(product)}
                className={`w-full py-4 text-lg ${
                  addedItems.has(product.id)
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                } text-white font-bold transition-all duration-300`}
                disabled={addedItems.has(product.id)}
              >
                {addedItems.has(product.id) ? (
                  <>
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Montserrat', serif" }}
              >
                Customer Reviews
              </h2>
              <div className="flex items-center gap-4">
                <StarRating rating={averageRating} size="lg" />
                <span className="text-lg text-gray-600">
                  {averageRating.toFixed(1)}/5 ({reviews.length} reviews)
                </span>
              </div>
              {reviewsError && (
                <p className="text-red-500 text-sm mt-2">
                  {reviewsError} - Unable to load reviews
                </p>
              )}
            </div>
          </div>

          {/* Review Form */}
          <ReviewForm
            productId={productId || ""}
            onSubmitSuccess={handleReviewSubmitSuccess}
            apiEndpoint={API_ENDPOINTS.SUBMIT_REVIEW}
          />

          {/* Reviews List */}
          <div className="border-t border-gray-200 pt-8">
            <h3
              className="text-xl font-semibold text-gray-900 mb-6"
              style={{ fontFamily: "'Montserrat', serif" }}
            >
              All Reviews
            </h3>
            
            <ReviewsList 
              reviews={reviews} 
              isLoading={isLoadingReviews} 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
