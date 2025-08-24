import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show logo after 500ms
    const logoTimer = setTimeout(() => setShowLogo(true), 500);
    
    // Show text after 1.5s
    const textTimer = setTimeout(() => setShowText(true), 1500);
    
    // Complete after 3.5s
    const completeTimer = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating red circles */}
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-20 left-20 w-32 h-32 border-2 border-red-300/30 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-20 right-20 w-24 h-24 border-2 border-red-300/30 rounded-full"
          />
          <motion.div
            animate={{ 
              x: [0, 25, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 left-10 w-16 h-16 border border-red-300/20 rounded-full"
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center w-full max-w-2xl">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={showLogo ? { 
                scale: [0, 1.2, 1], 
                opacity: 1
              } : {}}
              transition={{ 
                duration: 1.5,
                ease: "easeOut"
              }}
              className="mb-8"
            >
              <div className="relative">
                {/* Logo Container */}
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
                  <img 
                    src="/logo.webp" 
                    alt="Pakasain Logo" 
                    className="w-24 h-24 md:w-32 md:h-32 object-contain" 
                  />
                </div>
                
                {/* Glow effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 mx-auto bg-white/20 rounded-3xl blur-xl"
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
              style={{
                fontFamily: "'Montserrat', serif",
                textShadow: "0 4px 20px rgba(0,0,0,0.4)"
              }}
            >
              PAKASAIN
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 mb-8"
              style={{
                fontFamily: "'Nunito', serif",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}
            >
              Protein Nimko
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showText ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="text-base md:text-lg text-white/80 max-w-md mx-auto"
              style={{
                fontFamily: "'Nunito', serif"
              }}
            >
              Where tradition meets nutrition
            </motion.p>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showText ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12"
            >
              <div className="flex items-center justify-center gap-3 text-white/70 mb-4">
                <span className="text-sm font-medium">Loading...</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-48 md:w-64 mx-auto h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}