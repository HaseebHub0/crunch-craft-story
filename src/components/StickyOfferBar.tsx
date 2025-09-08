import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFreeOrders } from '@/contexts/FreeOrdersContext';
import { Clock, Flame } from 'lucide-react';

const StickyOfferBar: React.FC = () => {
  const { state, isOfferActive } = useFreeOrders();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [50, 0]);

  if (!isOfferActive()) {
    return null;
  }

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed top-0 left-0 right-0 z-[99] bg-gradient-to-r from-orange-500 via-red-600 to-red-700 text-white shadow-lg"
    >
      <div className="container mx-auto max-w-7xl px-4 py-2">
        <div className="flex items-center justify-center gap-3 text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame className="w-5 h-5 text-yellow-300" />
          </motion.div>
          
          <motion.span
            key={state.remainingFreeOrders}
            initial={{ scale: 1.2, color: '#fbbf24' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base font-bold font-montserrat"
          >
            🔥 Hurry! Only <span className="text-yellow-300 font-black text-lg animate-countdown-flash">{state.remainingFreeOrders}</span> free orders left!
          </motion.span>
          
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Clock className="w-5 h-5 text-yellow-300" />
          </motion.div>
        </div>
      </div>

      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-800">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ 
            width: `${(state.remainingFreeOrders / state.totalFreeOrders) * 100}%`
          }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
        />
      </div>
    </motion.div>
  );
};

export default StickyOfferBar;
