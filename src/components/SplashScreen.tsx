import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Heart, Shield, Award } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  const steps = [
    { icon: Shield, text: "Premium Quality", color: "text-success" },
    { icon: Zap, text: "22g Protein Power", color: "text-accent" },
    { icon: Heart, text: "Natural Ingredients", color: "text-primary" },
    { icon: Award, text: "Authentic Taste", color: "text-accent" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLogo) return;
    
    const stepTimer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(onComplete, 1500);
      }
    }, 1200);

    return () => clearTimeout(stepTimer);
  }, [currentStep, showLogo, steps.length, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-primary via-accent to-success flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 400],
                y: [0, (Math.random() - 0.5) * 400],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={showLogo ? { 
              scale: [0, 1.2, 1], 
              rotate: [0, 360, 0] 
            } : {}}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.6, 1]
            }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/30">
              <span className="text-white font-montserrat font-black text-4xl">P</span>
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={showLogo ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl font-montserrat font-black text-white mb-4"
          >
            PAKASAIN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showLogo ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl font-nunito font-semibold text-white/90 mb-12"
          >
            Protein Nimko
          </motion.p>

          {/* Feature Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isActive ? { 
                    opacity: 1, 
                    x: 0,
                    scale: isCurrent ? [1, 1.1, 1] : 1
                  } : {}}
                  transition={{ 
                    duration: 0.6,
                    scale: {
                      duration: 0.4,
                      times: [0, 0.5, 1]
                    }
                  }}
                  className="flex items-center justify-center gap-4 text-white"
                >
                  <motion.div
                    animate={isCurrent ? { 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ 
                      duration: 0.8,
                      scale: { times: [0, 0.5, 1] }
                    }}
                    className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ${
                      isActive ? 'ring-2 ring-white/50' : ''
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </motion.div>
                  <span className="text-lg font-nunito font-semibold">
                    {step.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Loading Bar */}
          <motion.div 
            className="mt-12 w-64 mx-auto h-1 bg-white/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={showLogo ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${((currentStep + 1) / steps.length) * 100}%` 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}