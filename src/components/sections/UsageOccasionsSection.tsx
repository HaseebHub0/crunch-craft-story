import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dumbbell, Coffee, Users, Briefcase, Clock, Star, Heart, Zap } from "lucide-react";

export default function UsageOccasionsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const occasions = [
    {
      icon: Dumbbell,
      title: "Post-Workout Recovery",
      description: "Fuel your muscles with 22g of premium protein for optimal recovery and growth",
      image: "🏋️‍♂️",
      color: "#9d0803",
      time: "After Exercise",
      benefit: "Muscle Recovery",
      features: ["Protein synthesis", "Muscle repair", "Energy restoration"]
    },
    {
      icon: Briefcase,
      title: "Office Energy Boost",
      description: "Beat the afternoon slump with sustained energy from complex carbs and protein",
      image: "💼",
      color: "#55a743",
      time: "3-4 PM",
      benefit: "Sustained Energy",
      features: ["Mental clarity", "No sugar crashes", "Productivity boost"]
    },
    {
      icon: Coffee,
      title: "Tea-Time Tradition",
      description: "Perfect companion for your evening chai with authentic Pakistani flavors",
      image: "🍵",
      color: "#fbbf24",
      time: "Evening",
      benefit: "Cultural Experience",
      features: ["Traditional taste", "Social bonding", "Relaxation"]
    },
    {
      icon: Users,
      title: "Family Gatherings",
      description: "Share the tradition with loved ones during special moments and celebrations",
      image: "👨‍👩‍👧‍👦",
      color: "#f59e0b",
      time: "Anytime",
      benefit: "Togetherness",
      features: ["Cultural heritage", "Family bonding", "Shared memories"]
    },
  ];

  const additionalOccasions = [
    {
      icon: Clock,
      title: "Morning Motivation",
      description: "Start your day with protein-rich nutrition and authentic taste",
      color: "#8b5cf6",
      time: "Breakfast",
      benefit: "Morning Energy"
    },
    {
      icon: Star,
      title: "Movie Night Snack",
      description: "Healthy alternative to popcorn with bold flavors and nutrition",
      color: "#ec4899",
      time: "Evening",
      benefit: "Entertainment"
    },
    {
      icon: Heart,
      title: "Date Night",
      description: "Impress with unique, healthy snacks that tell a story",
      color: "#ef4444",
      time: "Romantic",
      benefit: "Connection"
    },
    {
      icon: Zap,
      title: "Travel Companion",
      description: "Portable nutrition for adventures and long journeys",
      color: "#06b6d4",
      time: "On-the-go",
      benefit: "Convenience"
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fefefe 0%, #f8fafc 100%)'
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block p-3 bg-gradient-to-r from-red-600 to-green-600 rounded-full mb-6"
          >
            <Clock className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
            Perfect For{" "}
            <span style={{color: '#9d0803'}}>Every</span>{" "}
            Occasion
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{
            fontFamily: "'Lora', serif"
          }}>
            From morning motivation to evening relaxation, discover when Pakasain fits perfectly into your lifestyle. 
            Every moment becomes special with authentic Pakistani flavors.
          </p>
        </motion.div>

        {/* Main Occasions Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              className="group"
            >
              {/* Card */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                {/* Header with Brand Color */}
                <div 
                  className="p-6 md:p-8 text-center relative overflow-hidden"
                  style={{backgroundColor: `${occasion.color}15`}}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 text-4xl">{occasion.image}</div>
                    <div className="absolute bottom-4 right-4 text-4xl opacity-50">{occasion.image}</div>
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center relative z-10"
                    style={{backgroundColor: `${occasion.color}20`}}
                  >
                    <occasion.icon className="w-8 h-8" style={{color: occasion.color}} />
                  </motion.div>
                  
                  {/* Large Emoji */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl md:text-6xl mb-4 relative z-10"
                  >
                    {occasion.image}
                  </motion.div>
                  
                  {/* Time Badge */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block relative z-10 border border-white/50">
                    <span className="font-medium text-sm text-gray-800">
                      {occasion.time}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3" style={{
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {occasion.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed" style={{
                    fontFamily: "'Lora', serif"
                  }}>
                    {occasion.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-2 mb-4">
                    {occasion.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: occasion.color}}></div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Benefit Badge */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: occasion.color}}></div>
                    <span className="text-sm font-semibold" style={{color: occasion.color}}>
                      {occasion.benefit}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Occasions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
            More Perfect Moments
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {additionalOccasions.map((occasion, index) => (
              <motion.div
                key={occasion.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 text-center">
                  <div 
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{backgroundColor: `${occasion.color}15`}}
                  >
                    <occasion.icon className="w-6 h-6 md:w-8 md:h-8" style={{color: occasion.color}} />
                  </div>
                  
                  <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2">
                    {occasion.title}
                  </h4>
                  
                  <p className="text-xs md:text-sm text-gray-600 mb-3 leading-relaxed">
                    {occasion.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 font-medium">
                    {occasion.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto border border-gray-100 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 text-6xl">🌟</div>
              <div className="absolute bottom-8 right-8 text-6xl">🌿</div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="inline-block p-3 bg-gradient-to-r from-red-600 to-green-600 rounded-full mb-6"
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="relative z-10"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-relaxed mb-6" style={{
                fontFamily: "'Playfair Display', serif"
              }}>
                "From workouts to gatherings, Pakasain Protein Nimko brings{" "}
                <span style={{color: '#9d0803'}}>authentic Pakistani flavor</span>{" "}
                to every moment that matters."
              </p>
              
              <div className="flex justify-center items-center gap-4">
                <div className="w-16 h-1 rounded-full" style={{background: 'linear-gradient(to right, #9d0803, #55a743)'}}></div>
                <span className="text-gray-600 italic" style={{fontFamily: "'Lora', serif"}}>
                  Nutrition meets tradition
                </span>
                <div className="w-16 h-1 rounded-full" style={{background: 'linear-gradient(to right, #9d0803, #55a743)'}}></div>
              </div>
            </motion.blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}