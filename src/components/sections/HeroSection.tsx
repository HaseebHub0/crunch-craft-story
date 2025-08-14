import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroProduct from "@/assets/Protien-Nimko.webp";
import { Sparkles, Zap, Heart, Utensils, ChefHat, Package } from "lucide-react";

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #9d0803 0%, #55a743 100%)'
      }}
    >
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        {/* Desktop decorative elements */}
        <div className="hidden md:block">
          <div className="absolute top-20 left-10 text-6xl animate-bounce">🍽️</div>
          <div className="absolute top-32 right-16 text-5xl animate-pulse">🥘</div>
          <div className="absolute bottom-40 left-20 text-4xl animate-bounce" style={{animationDelay: '1s'}}>🌶️</div>
          <div className="absolute top-1/2 right-8 text-5xl animate-pulse" style={{animationDelay: '0.5s'}}>🍴</div>
          <div className="absolute bottom-32 right-1/4 text-6xl animate-bounce" style={{animationDelay: '1.5s'}}>🥄</div>
        </div>
        
        {/* Mobile decorative elements */}
        <div className="md:hidden">
          <div className="absolute top-16 left-6 text-4xl animate-bounce">🍽️</div>
          <div className="absolute top-24 right-8 text-3xl animate-pulse">🥘</div>
          <div className="absolute bottom-32 left-12 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🌶️</div>
          <div className="absolute top-1/2 right-6 text-3xl animate-pulse" style={{animationDelay: '0.5s'}}>🍴</div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Mobile Layout: Stacked */}
        <div className="md:hidden">
          {/* Mobile: Content First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-center mb-8"
          >
            {/* Chef Hat Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                <ChefHat className="w-8 h-8 text-white mx-auto" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              Pakasain{" "}
              <span className="block text-yellow-300 font-bold text-3xl" style={{
                fontFamily: "'Dancing Script', cursive",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
              }}>
                Protein Nimko
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl font-serif font-bold text-white/95 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
              }}
            >
              A Culinary Journey of{" "}
              <span className="text-yellow-300">Flavor & Nutrition</span>
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg text-white/90 max-w-md mx-auto mb-6 font-sans font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontFamily: "'Lora', 'Georgia', serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
              }}
            >
              Experience the authentic taste of Pakistan's finest ingredients, 
              crafted with love and packed with 22g of premium protein per serving.
            </motion.p>

            {/* Mobile: Feature Pills */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-white shadow-lg border border-white/30">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="font-serif font-bold text-sm" style={{fontFamily: "'Playfair Display', serif"}}>22g Protein</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-white shadow-lg border border-white/30">
                <Heart className="w-4 h-4 text-green-300" />
                <span className="font-serif font-bold text-sm" style={{fontFamily: "'Playfair Display', serif"}}>Natural</span>
              </div>
            </motion.div>

            {/* Mobile: CTA Button */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Link to="/products">
                <Button 
                  size="lg"
                  className="w-full max-w-xs px-8 py-4 text-lg font-serif font-bold bg-white hover:bg-gray-100 text-gray-800 border-2 border-white/50 shadow-2xl"
                  style={{
                    fontFamily: "'Playfair Display', serif"
                  }}
                >
                  🍽️ Order Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile: Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 0.5, -0.5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white rounded-2xl p-6 shadow-2xl"
              >
                <img 
                  src={heroProduct} 
                  alt="Pakasain Protein Nimko - Premium Pakistani Snack"
                  className="w-full h-64 object-contain rounded-xl"
                  loading="eager"
                />
              </motion.div>

              {/* Mobile: Floating Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-3 -right-3 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-xl">🏆</span>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 3, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-3 -left-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Package className="w-6 h-6" style={{color: '#55a743'}} />
              </motion.div>
            </div>

            {/* Mobile: Product Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/30">
                <div className="text-2xl mb-1 font-bold text-white">22g</div>
                <div className="text-white/90 text-sm font-medium">Protein per 100g</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/30">
                <div className="text-2xl mb-1 font-bold text-white">100%</div>
                <div className="text-white/90 text-sm font-medium">Natural</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="hidden md:grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Product Image */}
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <img 
                  src={heroProduct} 
                  alt="Pakasain Protein Nimko - Premium Pakistani Snack"
                  className="w-full h-96 object-contain rounded-2xl"
                  loading="eager"
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">🏆</span>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Package className="w-8 h-8" style={{color: '#55a743'}} />
              </motion.div>
            </div>

            {/* Product Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-3xl mb-2 font-bold text-white">22g</div>
                <div className="text-white/90 font-medium">Protein per 100g</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-3xl mb-2 font-bold text-white">100%</div>
                <div className="text-white/90 font-medium">Natural</div>
              </div>
            </motion.div>

            {/* Desktop: CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Link to="/products">
                <Button 
                  size="xl"
                  className="px-12 py-6 text-xl font-serif font-bold bg-white hover:bg-gray-100 text-gray-800 border-2 border-white/50 shadow-2xl"
                  style={{
                    fontFamily: "'Playfair Display', serif"
                  }}
                >
                  🍽️ Order Now
                </Button>
              </Link>
            </motion.div>
         
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white order-1 lg:order-2"
          >
            {/* Chef Hat Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                <ChefHat className="w-12 h-12 text-white mx-auto" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              Pakasain{" "}
              <span className="block text-yellow-300 font-bold" style={{
                fontFamily: "'Dancing Script', cursive",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)"
              }}>
                Protein Nimko
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white/95 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
              }}
            >
              A Culinary Journey of{" "}
              <span className="text-yellow-300">Flavor & Nutrition</span>
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 max-w-3xl mb-8 font-sans font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontFamily: "'Lora', 'Georgia', serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
              }}
            >
              Experience the authentic taste of Pakistan's finest ingredients, 
              crafted with love and packed with 22g of premium protein per serving. 
              Every bite tells a story of tradition and innovation.
            </motion.p>

            {/* Feature Pills with Brand Colors */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 text-white shadow-lg border border-white/30">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-serif font-bold" style={{fontFamily: "'Playfair Display', serif"}}>22g Protein</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 text-white shadow-lg border border-white/30">
                <Heart className="w-5 h-5 text-green-300" />
                <span className="font-serif font-bold" style={{fontFamily: "'Playfair Display', serif"}}>Natural Ingredients</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 text-white shadow-lg border border-white/30">
                <Utensils className="w-5 h-5 text-red-300" />
                <span className="font-serif font-bold" style={{fontFamily: "'Playfair Display', serif"}}>Authentic Taste</span>
              </div>
            </motion.div>

           

             
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center bg-white/10 backdrop-blur-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}