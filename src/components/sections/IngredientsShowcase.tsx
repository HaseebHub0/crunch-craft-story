import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Info, Sparkles } from "lucide-react";

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
      fact: "Rich in fiber and plant-based protein, providing sustained energy",
      nutrition: "High in protein & fiber",
      color: "from-amber-400 to-amber-600"
    },
    {
      id: "besan",
      name: "Premium Besan",
      emoji: "🥄",
      fact: "Traditional gram flour that's naturally gluten-free and nutritious",
      nutrition: "Gluten-free protein source",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: "almonds",
      name: "Roasted Almonds",
      emoji: "🥜",
      fact: "Packed with vitamin E, healthy fats, and magnesium for heart health",
      nutrition: "Vitamin E & healthy fats",
      color: "from-brown-400 to-amber-700"
    },
    {
      id: "pistachios",
      name: "Premium Pistachios", 
      emoji: "🌰",
      fact: "Excellent source of antioxidants and supports eye health",
      nutrition: "Antioxidants & minerals",
      color: "from-green-400 to-green-600"
    },
    {
      id: "walnuts",
      name: "Fresh Walnuts",
      emoji: "🌰",
      fact: "Brain-boosting omega-3 fatty acids and protein powerhouse",
      nutrition: "Omega-3 fatty acids",
      color: "from-brown-500 to-amber-600"
    },
    {
      id: "chickpeas",
      name: "Roasted Chickpeas",
      emoji: "🥨",
      fact: "Complete protein source with all essential amino acids",
      nutrition: "Complete protein profile",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: "raisins",
      name: "Sweet Raisins",
      emoji: "🍇",
      fact: "Natural sweetness with iron and potassium for energy",
      nutrition: "Natural energy & minerals",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: "spices",
      name: "Traditional Spices",
      emoji: "🌶️",
      fact: "Authentic blend of salt, red chili, and garlic for bold flavor",
      nutrition: "Metabolism boosting",
      color: "from-red-400 to-red-600"
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 spice-texture opacity-20" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-foreground">
              Premium{" "}
              <span className="gradient-text">Ingredients</span>
            </h2>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          
          <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto">
            Discover the carefully selected ingredients that make every bite nutritious and delicious
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
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
              <div className={`bg-gradient-to-br ${ingredient.color} rounded-2xl p-6 text-white shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 text-4xl opacity-30">{ingredient.emoji}</div>
                  <div className="absolute bottom-2 left-2 text-3xl opacity-20">{ingredient.emoji}</div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ 
                      scale: hoveredIngredient === ingredient.id ? 1.2 : 1,
                      rotate: hoveredIngredient === ingredient.id ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl mb-4"
                  >
                    {ingredient.emoji}
                  </motion.div>
                  
                  <h3 className="font-poppins font-bold text-lg mb-2">
                    {ingredient.name}
                  </h3>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                    {ingredient.nutrition}
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
                  className="absolute top-3 right-3"
                >
                  <Info className="w-5 h-5 text-white/80" />
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
                className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl p-4 shadow-elegant border z-20"
                style={{ 
                  pointerEvents: hoveredIngredient === ingredient.id ? 'auto' : 'none'
                }}
              >
                <p className="text-sm text-foreground font-inter leading-relaxed">
                  {ingredient.fact}
                </p>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-border"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-primary rounded-3xl p-12 text-center shadow-elegant"
        >
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6"
          >
            Crafted with Love, Powered by Nature
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-xl text-white/90 font-inter max-w-3xl mx-auto mb-8"
          >
            Every ingredient is carefully sourced and perfectly seasoned with traditional Pakistani 
            spices to create an authentic taste that honors our heritage while fueling your modern lifestyle.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-poppins font-semibold">✓ No Artificial Colors</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-poppins font-semibold">✓ Natural Flavors</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-poppins font-semibold">✓ Premium Quality</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}