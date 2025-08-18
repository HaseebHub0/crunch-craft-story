import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Heart, Star, ArrowRight } from "lucide-react";
import heroProduct from "@/assets/Products/Product.webp";
import proteinNimko from "@/assets/Protien-Nimko.webp";
import spiceBackground from "@/assets/spice-background.webp";

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
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
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight"
            >
              Pakasain{" "}
              <span className="text-red-600">
                Protein
              </span>{" "}
              <span className="text-green-600">
                Nimko
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-body max-w-md lg:max-w-none"
            >
              Experience the authentic taste of Pakistan's finest ingredients, 
              crafted with love and packed with premium protein for your healthy lifestyle.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
            >
              <div className="bg-red-50 border border-red-200 rounded-full px-4 py-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="font-medium text-sm text-red-700">22g Protein</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-green-600" />
                <span className="font-medium text-sm text-green-700">100% Natural</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto lg:mx-0"
            >
              Order Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          {/* Middle Section - Main Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="relative">

              {/* Main Product Image */}
              <motion.img
                src={heroProduct}
                alt="Pakasain Protein Nimko - Main Product"
                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-contain relative z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 to-green-200/20 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </motion.div>

          {/* Right Section - Additional Image & Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-1 flex flex-col items-center lg:items-end text-center lg:text-right"
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
              
              {/* Spice Background Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6"
              >
                <img
                  src={spiceBackground}
                  alt="Traditional Pakistani Spices"
                  className="w-full max-w-xs rounded-xl shadow-lg object-cover h-32"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
