import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

const SpecialOfferBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-3 px-4 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: ['-100%', '100%'],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            x: ['100%', '-100%'],
            rotate: [360, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-300 rounded-full opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center gap-3 text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Gift className="w-6 h-6 text-yellow-300" />
          </motion.div>
          
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl font-bold font-montserrat tracking-wide"
          >
            🎉 First 20 Orders FREE – Limited Time Only! 🎉
          </motion.h2>
          
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm md:text-base text-yellow-100 mt-1 font-nunito"
        >
          Don't miss out on this exclusive offer! Claim your free Protein Nimko pack now.
        </motion.p>
      </div>

      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 border-2 border-yellow-300 rounded-none animate-offer-pulse"
      />
    </motion.div>
  );
};

export default SpecialOfferBanner;
