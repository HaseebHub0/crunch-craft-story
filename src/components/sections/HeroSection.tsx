import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Heart, ArrowRight } from "lucide-react";
import heroProduct from "@/assets/Products/Product.webp";
import proteinNimko from "@/assets/Protien-Nimko.webp";
import tick from "@/assets/3d_icons/3dicons-tick-dynamic.png";

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background: "linear-gradient(135deg, #fefefe 0%, #f8fafc 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-red-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-green-400 rounded-lg"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center min-h-screen">
          
          {/* Left Section - Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 text-center lg:text-left"
          >
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-gray-900 mb-4 lg:mb-6 leading-tight"
            >
              Pakasian{" "}
              <span className="text-red-600">
                Protein
              </span>{" "}
              <span className="text-green-600">
                Nimko
              </span>
            </motion.h1>

            {/* Subtitle - Simplified for mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed font-body max-w-md lg:max-w-none"
            >
              <span className="hidden md:inline">
                Experience the authentic taste of Pakistan's finest ingredients, 
                crafted with love and packed with premium protein for your healthy lifestyle.
              </span>
              <span className="md:hidden">
                Authentic Pakistani taste with premium protein for your healthy lifestyle.
              </span>
            </motion.p>

            {/* Feature Pills - Simplified for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8 justify-center lg:justify-start"
            >
              <div className="bg-red-50 border border-red-200 rounded-full px-3 py-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="font-medium text-xs lg:text-sm text-red-700">22g Protein</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-full px-3 py-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-600" />
                <span className="font-medium text-xs lg:text-sm text-green-700">100% Natural</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto lg:mx-0"
            >
              <span className="relative z-10">Order Now</span>
              <img src={tick} alt="tick" className="w-8 h-8 lg:w-10 lg:h-10" />
            </motion.button>
          </motion.div>

          {/* Middle Section - Main Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-1 flex justify-center order-2 lg:order-none"
          >
            <div className="relative">
              {/* Main Product Image */}
              <motion.img
                src={heroProduct}
                alt="Pakasain Protein Nimko - Main Product"
                className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-contain relative z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 to-green-200/20 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </motion.div>

          {/* Right Section - Additional Image & Content - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex lg:col-span-1 flex-col items-end text-right"
          >
            {/* Secondary Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative mb-8"
            >
              <motion.img
                src={proteinNimko}
                alt="Pakasain Protein Nimko - Premium Quality"
                className="w-full max-w-sm rounded-2xl shadow-xl object-contain"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Quality Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                PREMIUM
              </motion.div>
            </motion.div>

            {/* Right Side Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 font-heading">
                Traditional Recipe
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Made with authentic Pakistani spices and premium ingredients, 
                preserving the rich cultural heritage in every bite.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
