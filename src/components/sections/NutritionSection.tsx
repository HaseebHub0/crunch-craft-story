import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Zap, Heart, Clock, Trophy, Target, Leaf, Star, TrendingUp } from "lucide-react";

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  inView: boolean;
}

const Counter = ({ end, duration, suffix = "", inView }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);

  return (
    <span
      className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white block"
      style={{
        fontFamily: "'Montserrat', serif",
        textShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      {count}{suffix}
    </span>
  );
};

export default function NutritionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nutritionFacts = [
    {
      icon: Target,
      title: "22g Protein",
      value: "22g",
      description: "High-quality protein for muscle building and recovery",
      color: "#9d0803",
      bgColor: "rgba(157, 8, 3, 0.1)"
    },
    {
      icon: Leaf,
      title: "Natural Fiber",
      value: "8g",
      description: "Dietary fiber for digestive health and satiety",
      color: "#55a743",
      bgColor: "rgba(85, 167, 67, 0.1)"
    },
    {
      icon: Zap,
      title: "Healthy Fats",
      value: "15g",
      description: "Essential fatty acids from premium nuts and seeds",
      color: "#fbbf24",
      bgColor: "rgba(251, 191, 36, 0.1)"
    },
    {
      icon: Heart,
      title: "Low Sugar",
      value: "3g",
      description: "Minimal added sugars for balanced nutrition",
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.1)"
    }
  ];

  

  return (
    <section 
      ref={ref}
      className="py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden bg-gray-50"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-gray-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-gray-400 rounded-lg"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-gray-400 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2" style={{
            fontFamily: "'Montserrat', serif"
          }}>
            Nutrition That{" "}
            <span style={{color: '#9d0803'}}>Powers</span>{" "}
            Your Day
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4" style={{
            fontFamily: "'Nunito', serif"
          }}>
            Experience the perfect balance of taste and nutrition with every crunchy bite. 
            Packed with premium ingredients and authentic Pakistani flavors.
          </p>
        </div>

        {/* Main Protein Counter */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="relative px-4">
            <div 
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl mx-auto max-w-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #9d0803 0%,rgb(13, 14, 13) 100%)'
              }}
            >
              
              
              <p className="text-white/90 text-base sm:text-lg md:text-xl font-semibold mb-4" style={{
                fontFamily: "'Nunito', serif"
              }}>
                Protein Power Per 100g
              </p>
              
              <Counter end={22} duration={2} suffix="g" inView={inView} />
              
              <p className="text-white/90 text-sm sm:text-base md:text-lg mt-4 px-2" style={{
                fontFamily: "'Nunito', serif"
              }}>
                Fuel your muscles and satisfy your cravings
              </p>
            </div>
          </div>
        </div>

       

        
      </div>
    </section>
  );
}