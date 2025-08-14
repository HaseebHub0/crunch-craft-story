import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Info, Sparkles, Leaf, Award, Heart, Zap } from "lucide-react";

export default function IngredientsShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [hoveredIngredient, setHoveredIngredient] = useState<string | null>(null);

  const ingredients = [
    {
      id: "chickpea-flour",
      name: "Black Chickpea Flour",
      emoji: "🌾",
      fact: "Rich in fiber and plant-based protein, providing sustained energy and digestive health",
      nutrition: "High in protein & fiber",
      color: "#9d0803",
      benefits: ["Muscle building", "Digestive health", "Sustained energy"]
    },
    {
      id: "besan",
      name: "Premium Besan",
      emoji: "🥄",
      fact: "Traditional gram flour that's naturally gluten-free and packed with essential nutrients",
      nutrition: "Gluten-free protein source",
      color: "#55a743",
      benefits: ["Gluten-free", "Protein rich", "Traditional"]
    },
    {
      id: "almonds",
      name: "Roasted Almonds",
      emoji: "🥜",
      fact: "Packed with vitamin E, healthy fats, and magnesium for heart health and brain function",
      nutrition: "Vitamin E & healthy fats",
      color: "#fbbf24",
      benefits: ["Heart health", "Brain function", "Antioxidants"]
    },
    {
      id: "pistachios",
      name: "Premium Pistachios", 
      emoji: "🌰",
      fact: "Excellent source of antioxidants and supports eye health with lutein and zeaxanthin",
      nutrition: "Antioxidants & minerals",
      color: "#f59e0b",
      benefits: ["Eye health", "Antioxidants", "Minerals"]
    },
    {
      id: "walnuts",
      name: "Fresh Walnuts",
      emoji: "🌰",
      fact: "Brain-boosting omega-3 fatty acids and protein powerhouse for cognitive health",
      nutrition: "Omega-3 fatty acids",
      color: "#8b5cf6",
      benefits: ["Brain health", "Omega-3", "Protein"]
    },
    {
      id: "chickpeas",
      name: "Roasted Chickpeas",
      emoji: "🥨",
      fact: "Complete protein source with all essential amino acids for muscle development",
      nutrition: "Complete protein profile",
      color: "#ec4899",
      benefits: ["Complete protein", "Muscle growth", "Amino acids"]
    },
    {
      id: "raisins",
      name: "Sweet Raisins",
      emoji: "🍇",
      fact: "Natural sweetness with iron and potassium for energy and blood health",
      nutrition: "Natural energy & minerals",
      color: "#06b6d4",
      benefits: ["Natural energy", "Iron", "Potassium"]
    },
    {
      id: "spices",
      name: "Traditional Spices",
      emoji: "🌶️",
      fact: "Authentic blend of salt, red chili, and garlic for bold flavor and metabolism boost",
      nutrition: "Metabolism boosting",
      color: "#ef4444",
      benefits: ["Metabolism", "Authentic taste", "Digestive"]
    },
  ];

  const qualityFeatures = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "No artificial colors, flavors, or preservatives",
      color: "#55a743"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Carefully sourced and tested ingredients",
      color: "#fbbf24"
    },
    {
      icon: Heart,
      title: "Health Focused",
      description: "Nutrition-first approach to snacking",
      color: "#9d0803"
    },
    {
      icon: Zap,
      title: "Energy Rich",
      description: "Sustained energy from natural sources",
      color: "#f59e0b"
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden"
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
            <Leaf className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
            Premium{" "}
            <span style={{color: '#9d0803'}}>Ingredients</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{
            fontFamily: "'Lora', serif"
          }}>
            Discover the carefully selected ingredients that make every bite nutritious and delicious. 
            Each component is chosen for its nutritional value and authentic taste.
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIngredient(ingredient.id)}
              onMouseLeave={() => setHoveredIngredient(null)}
            >
              {/* Main Card */}
              <div 
                className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden border border-gray-100"
                style={{borderColor: `${ingredient.color}20`}}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-2 right-2 text-2xl md:text-4xl opacity-30">{ingredient.emoji}</div>
                  <div className="absolute bottom-2 left-2 text-xl md:text-3xl opacity-20">{ingredient.emoji}</div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    animate={{ 
                      scale: hoveredIngredient === ingredient.id ? 1.2 : 1,
                      rotate: hoveredIngredient === ingredient.id ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl md:text-5xl mb-3 md:mb-4"
                  >
                    {ingredient.emoji}
                  </motion.div>
                  
                  <h3 className="font-bold text-sm md:text-lg mb-2 text-gray-900" style={{
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {ingredient.name}
                  </h3>
                  
                  <div 
                    className="rounded-full px-3 py-1 text-xs font-medium text-white mb-3"
                    style={{backgroundColor: ingredient.color}}
                  >
                    {ingredient.nutrition}
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-1">
                    {ingredient.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-1 justify-center">
                        <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: ingredient.color}}></div>
                        <span className="text-xs text-gray-600 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Info Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: hoveredIngredient === ingredient.id ? 1 : 0,
                    scale: hoveredIngredient === ingredient.id ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-2 right-2"
                >
                  <Info className="w-4 h-4 md:w-5 md:h-5" style={{color: ingredient.color}} />
                </motion.div>
              </div>

              {/* Hover Fact Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredIngredient === ingredient.id ? 1 : 0,
                  y: hoveredIngredient === ingredient.id ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl p-3 md:p-4 shadow-2xl border border-gray-100 z-20"
                style={{ 
                  pointerEvents: hoveredIngredient === ingredient.id ? 'auto' : 'none'
                }}
              >
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed" style={{
                  fontFamily: "'Lora', serif"
                }}>
                  {ingredient.fact}
                </p>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quality Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
            Our Quality Promise
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + (index * 0.1) }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <div 
                  className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{backgroundColor: `${feature.color}15`}}
                >
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8" style={{color: feature.color}} />
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-2" style={{
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {feature.title}
                </h4>
                
                <p className="text-sm text-gray-600 leading-relaxed" style={{
                  fontFamily: "'Lora', serif"
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div 
            className="rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto relative overflow-hidden border border-gray-100"
            style={{
              background: 'linear-gradient(135deg, #9d0803 0%, #55a743 100%)'
            }}
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 text-6xl">🌟</div>
              <div className="absolute bottom-8 right-8 text-6xl">🌿</div>
            </div>
            
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 relative z-10" style={{
                fontFamily: "'Playfair Display', serif"
              }}
            >
              Crafted with Love, Powered by Nature
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 relative z-10" style={{
                fontFamily: "'Lora', serif"
              }}
            >
              Every ingredient is carefully sourced and perfectly seasoned with traditional Pakistani 
              spices to create an authentic taste that honors our heritage while fueling your modern lifestyle.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <span className="text-white font-semibold">✓ No Artificial Colors</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <span className="text-white font-semibold">✓ Natural Flavors</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <span className="text-white font-semibold">✓ Premium Quality</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}