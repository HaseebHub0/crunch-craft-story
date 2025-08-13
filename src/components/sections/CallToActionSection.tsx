import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Package, Truck } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

export default function CallToActionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-hero relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 text-8xl opacity-10">🌟</div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-10">🥜</div>
        <div className="absolute top-1/2 left-1/4 text-6xl opacity-5">✨</div>
        <div className="absolute top-1/3 right-1/4 text-6xl opacity-5">🌶️</div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
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
                className="bg-white rounded-3xl p-8 shadow-elegant"
              >
                <img 
                  src={heroProduct} 
                  alt="Pakasain Protein Nimko - Premium Pakistani Snack"
                  className="w-full h-80 object-cover rounded-2xl"
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
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow"
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
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-floating"
              >
                <Package className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Product Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">22g</div>
                <div className="text-white/90 font-poppins font-medium">Protein per 100g</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">100%</div>
                <div className="text-white/90 font-poppins font-medium">Natural</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl lg:text-6xl font-poppins font-bold mb-6 leading-tight"
            >
              Ready to{" "}
              <span className="text-accent">Power Up</span>{" "}
              Your Day?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl lg:text-2xl text-white/90 font-inter mb-8 leading-relaxed"
            >
              Join thousands who've discovered the perfect balance of authentic Pakistani taste 
              and modern nutrition. Your taste buds and your body will thank you.
            </motion.p>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-4 mb-10"
            >
              {[
                "✓ 22g protein per 100g serving",
                "✓ Premium nuts & legumes", 
                "✓ Authentic Pakistani spices",
                "✓ Perfect for any occasion"
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  className="flex items-center gap-3 text-lg font-inter"
                >
                  <span className="text-accent text-xl">✓</span>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button 
                variant="premium" 
                size="xl"
                className="px-10 py-6 text-lg font-poppins font-bold group relative overflow-hidden"
              >
                <motion.span
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Order Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Button>

              <Button 
                variant="ghost" 
                size="xl"
                className="px-10 py-6 text-lg font-poppins font-bold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              >
                <ExternalLink className="w-5 h-5 mr-3" />
                Visit Pak Asian Foods
              </Button>
            </motion.div>

            {/* Shipping Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-8 flex items-center gap-4 text-white/80"
            >
              <Truck className="w-6 h-6 text-accent" />
              <span className="font-inter">Free shipping on orders over $50</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-2xl lg:text-3xl font-poppins font-semibold text-white/95 leading-relaxed"
            >
              "Pakasain Protein Nimko – Where Tradition Meets Nutrition"
            </motion.blockquote>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="mt-6 flex justify-center items-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 2.1 + (i * 0.1) }}
                  className="text-2xl"
                >
                  ⭐
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}