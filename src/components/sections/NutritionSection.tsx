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

  const benefits = [
    {
      icon: Zap,
      title: "Muscle Recovery",
      description: "Perfect post-workout snack with 22g protein per serving",
      color: "#9d0803",
      features: ["Muscle building", "Recovery support", "Satiety"]
    },
    {
      icon: Heart,
      title: "Heart Health",
      description: "Natural nuts and legumes support cardiovascular wellness",
      color: "#55a743",
      features: ["Omega-3 fatty acids", "Antioxidants", "Fiber"]
    },
    {
      icon: Clock,
      title: "Sustained Energy",
      description: "Complex carbs and protein for lasting energy release",
      color: "#fbbf24",
      features: ["Slow release", "No crashes", "Mental clarity"]
    },
    {
      icon: Star,
      title: "Authentic Taste",
      description: "Traditional Pakistani spices with modern nutrition",
      color: "#f59e0b",
      features: ["Bold flavors", "Balanced seasoning", "Cultural heritage"]
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
          <div className="inline-block p-3 bg-gradient-to-r from-red-600 to-green-600 rounded-full mb-4 sm:mb-6">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          
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
                background: 'linear-gradient(135deg, #9d0803 0%, #55a743 100%)'
              }}
            >
              {/* Floating elements */}
              <div className="absolute top-4 right-4 text-2xl sm:text-4xl opacity-20">🏆</div>
              <div className="absolute bottom-4 left-4 text-xl sm:text-3xl opacity-20">💪</div>
              
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

        {/* Nutrition Facts Grid */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2">
            {nutritionFacts.map((fact, index) => (
              <div
                key={fact.title}
                className="bg-white rounded-xl sm:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center group"
              >
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{backgroundColor: fact.bgColor}}
                >
                  <fact.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{color: fact.color}} />
                </div>
                
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{color: fact.color}}>
                  {fact.value}
                </div>
                
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                  {fact.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-100"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{backgroundColor: `${benefit.color}15`}}
                >
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" style={{color: benefit.color}} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3" style={{
                    fontFamily: "'Montserrat', serif"
                  }}>
                    {benefit.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed" style={{
                    fontFamily: "'Nunito', serif"
                  }}>
                    {benefit.description}
                  </p>
                  
                  <div className="space-y-1 sm:space-y-2">
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{backgroundColor: benefit.color}}></div>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center px-2">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-5xl mx-auto border border-gray-100">
            <div className="inline-block p-3 bg-gradient-to-r from-red-600 to-green-600 rounded-full mb-4 sm:mb-6">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2" style={{
              fontFamily: "'Montserrat', serif"
            }}>
              Perfect for Fitness Enthusiasts & Snack Lovers
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4" style={{
              fontFamily: "'Nunito', serif"
            }}>
              Whether you're recovering from a workout or need a satisfying snack, 
              Pakasain Protein Nimko delivers the nutrition and taste you crave.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-red-200">
                <span className="font-semibold text-red-800 text-sm sm:text-base">✓ Post-Workout Recovery</span>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-200">
                <span className="font-semibold text-green-800 text-sm sm:text-base">✓ Office Energy Boost</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-yellow-200">
                <span className="font-semibold text-yellow-800 text-sm sm:text-base">✓ Tea-Time Treat</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-green-600 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                🍽️ Order Now
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 font-bold rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                📊 View Full Nutrition
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}