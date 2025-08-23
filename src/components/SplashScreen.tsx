import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Heart, Shield, Award, Star, CheckCircle } from "lucide-react";
// import logo from "@/assets/logo.webp";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const steps = [
    { 
      icon: Shield, 
      text: "Premium Quality", 
      color: "#55a743",
      description: "Crafted with excellence"
    },
    { 
      icon: Zap, 
      text: "22g Protein Power", 
      color: "#fbbf24",
      description: "Maximum nutrition"
    },
    { 
      icon: Heart, 
      text: "Natural Ingredients", 
      color: "#9d0803",
      description: "Pure & authentic"
    },
    { 
      icon: Award, 
      text: "Authentic Taste", 
      color: "#f59e0b",
      description: "Traditional recipe"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLogo) return;
    
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(contentTimer);
  }, [showLogo]);

  useEffect(() => {
    if (!showContent) return;
    
    const stepTimer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(onComplete, 2000);
      }
    }, 1500);

    return () => clearTimeout(stepTimer);
  }, [currentStep, showContent, steps.length, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #9d0803 0%, #55a743 100%)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Desktop: Floating geometric shapes */}
          <div className="hidden md:block">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-20 left-20 w-32 h-32 border-2 border-white/20 rounded-full"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 0.8, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-lg"
            />
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-full"
            />
          </div>
          
          {/* Mobile: Smaller floating elements */}
          <div className="md:hidden">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-16 left-8 w-12 h-12 border border-white/20 rounded-full"
            />
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute bottom-16 right-8 w-10 h-10 border border-white/20 rounded-lg"
            />
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center w-full max-w-4xl">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={showLogo ? { 
                scale: [0, 1.3, 1], 
                rotate: [0, 360, 0],
                opacity: 1
              } : {}}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.6, 1]
              }}
              className="mb-8 md:mb-12"
            >
              <div className="relative">
                {/* Mobile: Smaller logo container */}
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
                  <img src="/logo.webp" alt="Pakasain Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
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
                  className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 mx-auto bg-white/20 rounded-2xl md:rounded-3xl blur-xl"
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={showLogo ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)"
              }}
            >
              PAKASAIN
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={showLogo ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 mb-12 md:mb-16"
              style={{
                fontFamily: "'Dancing Script', cursive",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}
            >
              Protein Nimko
            </motion.p>

            {/* Feature Steps - Mobile: Vertical, Desktop: Grid */}
            <div className="mb-12 md:mb-16">
              {/* Mobile: Vertical Stack */}
              <div className="md:hidden space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50, scale: 0.8 }}
                      animate={showContent ? { 
                        opacity: isActive ? 1 : 0.3, 
                        x: isActive ? 0 : -20, 
                        scale: isActive ? 1 : 0.9
                      } : {}}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        ease: "easeOut"
                      }}
                      className="relative"
                    >
                      <div className={`
                        bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 
                        transition-all duration-500 transform
                        ${isActive ? 'shadow-xl' : 'shadow-lg'}
                        ${isCurrent ? 'scale-105 ring-2 ring-white/40' : ''}
                      `}>
                        <div className="flex items-center gap-4">
                          {/* Icon Container */}
                          <motion.div
                            animate={isCurrent ? { 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            } : {}}
                            transition={{ 
                              duration: 1.5,
                              scale: { times: [0, 0.5, 1] }
                            }}
                            className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 flex-shrink-0"
                          >
                            <Icon className="w-6 h-6" style={{color: step.color}} />
                          </motion.div>
                          
                          {/* Text Content */}
                          <div className="text-left flex-1">
                            <h3 className="text-base font-bold text-white mb-1 font-serif">
                              {step.text}
                            </h3>
                            <p className="text-sm text-white/80 font-medium">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress Indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-b-xl origin-left"
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Desktop: Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={showContent ? { 
                        opacity: isActive ? 1 : 0.3, 
                        y: isActive ? 0 : 20, 
                        scale: isActive ? 1 : 0.9
                      } : {}}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        ease: "easeOut"
                      }}
                      className="relative group"
                    >
                      <div className={`
                        bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 
                        transition-all duration-500 transform
                        ${isActive ? 'shadow-2xl' : 'shadow-lg'}
                        ${isCurrent ? 'scale-105 ring-2 ring-white/40' : 'hover:scale-102'}
                      `}>
                        {/* Icon Container */}
                        <motion.div
                          animate={isCurrent ? { 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          } : {}}
                          transition={{ 
                            duration: 1.5,
                            scale: { times: [0, 0.5, 1] }
                          }}
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                        >
                          <Icon className="w-8 h-8" style={{color: step.color}} />
                        </motion.div>
                        
                        {/* Text Content */}
                        <h3 className="text-lg font-bold text-white mb-2 font-serif text-center">
                          {step.text}
                        </h3>
                        <p className="text-sm text-white/80 font-medium text-center">
                          {step.description}
                        </p>
                        
                        {/* Progress Indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-b-2xl origin-left"
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Loading Progress */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showContent ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 text-white/80 mb-4">
                <span className="text-sm font-medium">Loading experience...</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-4 h-4 text-yellow-300" />
                </motion.div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-64 md:w-80 mx-auto h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/60 to-white/40 rounded-full relative"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${((currentStep + 1) / steps.length) * 100}%` 
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{ 
                      x: [-100, 100],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </motion.div>
              </div>
              
              {/* Progress Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-white/60 text-sm mt-3 font-medium"
              >
                Step {currentStep + 1} of {steps.length}
              </motion.p>
            </motion.div>

            {/* Bottom Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/20">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                <span className="text-white/90 font-medium text-xs md:text-sm">
                  Where Tradition Meets Innovation
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}