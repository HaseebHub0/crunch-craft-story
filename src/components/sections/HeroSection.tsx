import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import heroProduct from "@/assets/hero-product.jpg";
import { Sparkles, Zap, Heart } from "lucide-react";

const FloatingIngredient = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: 1, 
      y: 0,
      rotate: [0, 5, -5, 0],
    }}
    transition={{ 
      duration: 0.8, 
      delay,
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    whileHover={{ scale: 1.1 }}
  >
    {children}
  </motion.div>
);

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden spice-texture"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(214, 35, 35, 0.85), rgba(247, 181, 0, 0.75)), url(${heroProduct})`,
        }}
      />
      
      {/* Floating Ingredients */}
      <FloatingIngredient className="top-20 left-10 text-6xl" delay={0.2}>
        🥜
      </FloatingIngredient>
      <FloatingIngredient className="top-32 right-16 text-5xl" delay={0.4}>
        🌰
      </FloatingIngredient>
      <FloatingIngredient className="bottom-40 left-20 text-4xl" delay={0.6}>
        🥨
      </FloatingIngredient>
      <FloatingIngredient className="top-1/2 right-8 text-5xl" delay={0.8}>
        🍇
      </FloatingIngredient>
      <FloatingIngredient className="bottom-32 right-1/4 text-6xl" delay={1.0}>
        🌶️
      </FloatingIngredient>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Pakasain Protein{" "}
            <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
              Nimko
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-white/95 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Power in Every Crunch
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 font-nunito font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Fuel your day with the bold taste and unbeatable nutrition of Pakistan's most innovative high-protein snack. 
            22g of protein per 100g serving.
          </motion.p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 text-white">
            <Zap className="w-5 h-5 text-accent" />
            <span className="font-montserrat font-bold">22g Protein</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 text-white">
            <Heart className="w-5 h-5 text-success" />
            <span className="font-montserrat font-bold">Natural Ingredients</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-montserrat font-bold">Authentic Taste</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Button 
            variant="hero" 
            size="xl"
            className="px-12 py-6 text-xl font-montserrat font-black animate-pulse-glow"
          >
            Order Now
          </Button>
          <Button 
            variant="premium" 
            size="xl"
            className="px-12 py-6 text-xl font-montserrat font-black"
          >
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}