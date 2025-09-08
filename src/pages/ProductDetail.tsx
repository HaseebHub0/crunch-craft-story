import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, Gift } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFreeOrders } from "@/contexts/FreeOrdersContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import StarRating from "@/components/StarRating";
import { useReviews } from "@/hooks/useReviews";
import { API_ENDPOINTS } from "@/config/api";
import productImage from "/Products/Product1.png";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyOfferBar from "@/components/StickyOfferBar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SimplePopup from "@/components/SimplePopup";

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
  const { isOfferActive, state } = useFreeOrders();
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
    <>
      <StickyOfferBar />
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 md:py-24" style={{ paddingTop: '60px' }}>
      <div className="container mx-auto px-4 max-w-7xl mt-20">
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
              {isOfferActive() && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 animate-offer-pulse"
                >
                  <Gift className="w-4 h-4" />
                  FREE!
                </motion.div>
              )}
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
                <div className="flex items-center gap-3">
                  {isOfferActive() ? (
                    <>
                      <span className="text-2xl font-bold text-gray-500 line-through">
                        PKR {product.price}
                      </span>
                      <span className="text-3xl font-black text-green-600">
                        FREE!
                      </span>
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-gray-900">
                      PKR {product.price}
                    </div>
                  )}
                </div>
                <div className="text-lg text-gray-500">{product.weight}</div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(product)}
                className={`w-full py-4 text-lg ${
                  addedItems.has(product.id)
                    ? "bg-green-600 hover:bg-green-700"
                    : isOfferActive()
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                } text-white font-bold transition-all duration-300`}
                disabled={addedItems.has(product.id)}
              >
                {addedItems.has(product.id) ? (
                  <>
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    Added to Cart!
                  </>
                ) : isOfferActive() ? (
                  <>
                    <Gift className="w-6 h-6 mr-2" />
                    Get FREE Pack!
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

        {/* Special Offer Banner */}
        {isOfferActive() && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-2xl p-6 shadow-lg"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 Limited Time Offer! 🎉</h3>
              <p className="text-lg mb-4">Get your first Protein Nimko pack absolutely FREE!</p>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-yellow-400 text-red-800 px-4 py-2 rounded-full font-bold">
                  Only {state.remainingFreeOrders} free orders left!
                </div>
                <div className="text-sm text-yellow-100">
                  Hurry up before they're gone!
                </div>
              </div>
            </div>
          </motion.div>
        )}

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
      <Footer />
      <ExitIntentPopup />
      <SimplePopup />
    </>
  );
}
