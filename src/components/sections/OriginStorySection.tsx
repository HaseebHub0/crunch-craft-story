import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Wheat, Sparkles, Clock, Award } from "lucide-react";

export default function OriginStorySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const ingredients = [
    { name: "Black Chickpea Flour", icon: "🌾", delay: 0.2 },
    { name: "Premium Almonds", icon: "🥜", delay: 0.4 },
    { name: "Roasted Chickpeas", icon: "🥨", delay: 0.6 },
    { name: "Pistachios & Walnuts", icon: "🌰", delay: 0.8 },
    { name: "Sweet Raisins", icon: "🍇", delay: 1.0 },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-subtle relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl">🌾</div>
        <div className="absolute bottom-20 right-10 text-8xl">🥜</div>
        <div className="absolute top-1/2 left-1/4 text-6xl">✨</div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-primary font-poppins font-semibold text-lg">
                  The Origin Story
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl lg:text-5xl font-poppins font-bold text-foreground leading-tight"
              >
                Where{" "}
                <span className="gradient-text">Tradition</span>{" "}
                Meets{" "}
                <span className="text-success">Nutrition</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-muted-foreground font-inter leading-relaxed"
              >
                For generations, nimko has been Pakistan's beloved snack—bringing families together 
                during tea time, celebrations, and everyday moments. We honor this cherished tradition 
                while innovating for today's health-conscious lifestyle.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg text-muted-foreground font-inter leading-relaxed"
              >
                Pakasain Protein Nimko transforms this classic with premium nuts, legumes, and 
                traditional spices—delivering 22g of protein without compromising the authentic 
                flavors you love.
              </motion.p>
            </div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white rounded-xl p-6 shadow-floating hover:shadow-elegant transition-all duration-300">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-poppins font-semibold text-foreground mb-2">
                  Time-Honored Recipe
                </h4>
                <p className="text-sm text-muted-foreground">
                  Authentic Pakistani spices and traditional preparation methods
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-floating hover:shadow-elegant transition-all duration-300">
                <Award className="w-8 h-8 text-success mb-3" />
                <h4 className="font-poppins font-semibold text-foreground mb-2">
                  Premium Quality
                </h4>
                <p className="text-sm text-muted-foreground">
                  Carefully selected nuts and legumes for superior nutrition
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Animated Ingredients */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-elegant">
              <h3 className="text-2xl font-poppins font-bold text-center mb-8 text-foreground">
                Premium Ingredients
              </h3>
              
              <div className="space-y-6">
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={ingredient.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: ingredient.delay,
                      ease: "easeOut"
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105"
                  >
                    <motion.span 
                      className="text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ 
                        duration: 2, 
                        delay: ingredient.delay,
                        repeat: Infinity,
                        repeatType: "loop" 
                      }}
                    >
                      {ingredient.icon}
                    </motion.span>
                    <div>
                      <h4 className="font-poppins font-semibold text-foreground">
                        {ingredient.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Naturally rich in protein and nutrients
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Decoration */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Wheat className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}