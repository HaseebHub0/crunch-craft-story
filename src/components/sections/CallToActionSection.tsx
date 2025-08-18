import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Package, Truck, Star, Heart, Zap, Shield } from "lucide-react";
import heroProduct from "@/assets/Products/Product1.png";

export default function CallToActionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const features = [
    {
      icon: Zap,
      title: "22g Protein",
      description: "per 100g serving",
      color: "#9d0803"
    },
    {
      icon: Heart,
      title: "100% Natural",
      description: "no artificial ingredients",
      color: "#55a743"
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "carefully sourced",
      color: "#fbbf24"
    }
  ];

  const benefits = [
    "✓ 22g protein per 100g serving",
    "✓ Premium nuts & legumes", 
    "✓ Authentic Pakistani spices",
    "✓ Perfect for any occasion",
    "✓ Gluten-free & natural",
    "✓ Traditional recipe"
  ];

  // const testimonials = [
  //   {
  //     text: "Amazing taste and great protein content!",
  //     rating: 5,
  //     author: "Fitness Enthusiast"
  //   },
  //   {
  //     text: "Authentic Pakistani flavors with modern nutrition",
  //     rating: 5,
  //     author: "Food Lover"
  //   },
  //   {
  //     text: "Perfect post-workout snack, highly recommend!",
  //     rating: 5,
  //     author: "Health Conscious"
  //   }
  // ];

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #9d0803 0%, #55a743 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-lg"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Mobile Layout: Stacked */}
        <div className="lg:hidden mb-12">
          {/* Mobile: Content First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-center mb-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{
                fontFamily: "'Montserrat', serif"
              }}
            >
              Ready to{" "}
              <span className="text-yellow-300">Power Up</span>{" "}
              Your Day?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed" style={{
                fontFamily: "'Nunito', serif"
              }}
            >
              Join thousands who've discovered the perfect balance of authentic Pakistani taste 
              and modern nutrition.
            </motion.p>

            {/* Mobile: Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-3 gap-3 mb-6"
            >
              {features.map((feature, index) => (
                <div key={feature.title} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/30">
                  <feature.icon className="w-6 h-6 mx-auto mb-2" style={{color: feature.color}} />
                  <div className="text-sm font-bold text-white">{feature.title}</div>
                  <div className="text-xs text-white/80">{feature.description}</div>
                </div>
              ))}
            </motion.div>

            {/* Mobile: CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-8"
            >
              <Link to="/checkout">
                <Button 
                  size="lg"
                  className="w-full max-w-xs px-8 py-4 text-lg font-bold bg-white hover:bg-gray-100 text-gray-800 border-2 border-white/50 shadow-2xl"
                  style={{
                    fontFamily: "'Montserrat', serif"
                  }}
                >
                  Order Now
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

            </div>
          </motion.div>
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
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
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <img 
                  src={heroProduct} 
                  alt="Pakasain Protein Nimko - Premium Pakistani Snack"
                  className="w-full h-80 object-contain rounded-2xl"
                  loading="eager"
                />
              </motion.div>

        
            </div>

            {/* Desktop: Product Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {features.map((feature, index) => (
                <div key={feature.title} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                  <feature.icon className="w-8 h-8 mx-auto mb-2" style={{color: feature.color}} />
                  <div className="text-lg font-bold text-white">{feature.title}</div>
                  <div className="text-sm text-white/80">{feature.description}</div>
                </div>
              ))}
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
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" style={{
                fontFamily: "'Montserrat', serif"
              }}
            >
              Ready to{" "}
              <span className="text-yellow-300">Power Up</span>{" "}
              Your Day?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed" style={{
                fontFamily: "'Nunito', serif"
              }}
            >
              Join thousands who've discovered the perfect balance of authentic Pakistani taste 
              and modern nutrition. Your taste buds and your body will thank you.
            </motion.p>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span className="text-sm md:text-base">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop: CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 mb-8"
            >
              <Link to="/checkout">
                <Button 
                  size="xl"
                  className="px-10 py-6 text-lg font-bold bg-white hover:bg-gray-100 text-gray-800 border-2 border-white/50 shadow-2xl group relative overflow-hidden"
                  style={{
                    fontFamily: "'Montserrat', serif"
                  }}
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
              </Link>

              <Button 
                variant="outline" 
                size="xl"
                className="px-10 py-6 text-lg font-bold text-black border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
                style={{
                  fontFamily: "'Montserrat', serif"
                }}
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
              className="flex items-center gap-4 text-white/80"
            >
              <Truck className="w-6 h-6 text-yellow-300" />
              <span className="font-medium">Free shipping on orders over $50</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Testimonials Grid
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16 md:mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center" style={{
            fontFamily: "'Playfair Display', serif"
          }}>
            What Our Customers Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.8 + (index * 0.1) }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-3 italic" style={{
                  fontFamily: "'Lora', serif"
                }}>
                  "{testimonial.text}"
                </p>
                <p className="text-white/70 text-sm font-medium">
                  - {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

      </div>
    </section>
  );
}