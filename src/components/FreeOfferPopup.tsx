import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFreeOrders } from '@/contexts/FreeOrdersContext';
import { Button } from '@/components/ui/button';
import { X, Gift, Star, Clock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const FreeOfferPopup: React.FC = () => {
  const { state, setFreeOfferPopupShown, isOfferActive } = useFreeOrders();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isOfferActive() || state.hasShownFreeOfferPopup) {
      return;
    }

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
      setFreeOfferPopupShown();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOfferActive, state.hasShownFreeOfferPopup, setFreeOfferPopupShown]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleClaimNow = () => {
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header with animated background */}
            <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-6 text-white overflow-hidden">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-2 right-2"
              >
                <Gift className="w-8 h-8 text-yellow-300" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold font-montserrat mb-2"
              >
                🎉 Special Offer Alert! 🎉
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-yellow-100 font-nunito"
              >
                Get your first Protein Nimko pack absolutely FREE!
              </motion.p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                >
                  <Flame className="w-4 h-4" />
                  Only {state.remainingFreeOrders} free orders left!
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 text-gray-700"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">Premium Quality Protein Nimko</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">22g Protein per 100g serving</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">Traditional Pakistani Recipe</span>
                  </div>
                </motion.div>

                {/* Price display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl border-2 border-green-200"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold text-gray-500 line-through">PKR 1,399</span>
                    <span className="text-3xl font-black text-green-600">FREE!</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Limited time offer - First 20 orders only!</p>
                </motion.div>
              </div>

              <div className="space-y-3">
                <Link to="/products" onClick={handleClaimNow}>
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Claim Your FREE Pack Now!
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-xl"
                >
                  Maybe Later
                </Button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FreeOfferPopup;
