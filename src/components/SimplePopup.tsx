import React, { useEffect, useState } from 'react';
import { useFreeOrders } from '@/contexts/FreeOrdersContext';
import { Button } from '@/components/ui/button';
import { X, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const SimplePopup: React.FC = () => {
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

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="bg-red-600 text-white p-4 rounded-t-lg -m-6 mb-4">
          <h2 className="text-xl font-bold">🎉 Special Offer! 🎉</h2>
          <p className="text-red-100">Get your first Protein Nimko pack FREE!</p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-lg font-bold text-gray-500 line-through">PKR 1,399</span>
              <span className="text-2xl font-black text-green-600">FREE!</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Only {state.remainingFreeOrders} free orders left!
            </p>
          </div>

          <div className="space-y-2">
            <Link to="/products" onClick={handleClose}>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Gift className="w-4 h-4 mr-2" />
                Claim Your FREE Pack Now!
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePopup;
