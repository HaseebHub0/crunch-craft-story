import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Zap, Heart, Clock, Trophy } from "lucide-react";

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  inView: boolean;
}

const Counter = ({ end, duration, suffix = "", inView }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);

  return (
    <motion.span
      className="text-6xl lg:text-8xl font-poppins font-bold gradient-text"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {count}{suffix}
    </motion.span>
  );
};

export default function NutritionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const benefits = [
    {
      icon: Zap,
      title: "High Protein",
      description: "22g protein per 100g serving for muscle recovery and satiety",
      color: "text-primary",
    },
    {
      icon: Heart,
      title: "Nut & Legume Powered",
      description: "Packed with natural nutrients from premium nuts and legumes",
      color: "text-success",
    },
    {
      icon: Clock,
      title: "Perfect Anytime Snack",
      description: "From workouts to gatherings, fuel your day with authentic taste",
      color: "text-accent",
    },
    {
      icon: Trophy,
      title: "Bold Authentic Flavor",
      description: "True to our traditional nimko roots with balanced seasoning",
      color: "text-primary",
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 spice-texture opacity-30" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
            Nutrition That{" "}
            <span className="gradient-text">Powers</span>{" "}
            Your Day
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto">
            Experience the perfect balance of taste and nutrition with every crunchy bite
          </p>
        </motion.div>

        {/* Main Protein Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-primary rounded-3xl p-12 shadow-elegant mx-auto max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/90 text-xl font-poppins mb-4"
            >
              Protein Power Per 100g
            </motion.p>
            
            <Counter end={22} duration={2} suffix="g" inView={inView} />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/90 text-lg font-inter mt-4"
            >
              Fuel your muscles and satisfy your cravings
            </motion.p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.7 + (index * 0.1),
                ease: "easeOut"
              }}
              className="bg-white rounded-2xl p-8 shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-105 text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center group-hover:shadow-glow`}
              >
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </motion.div>
              
              <h3 className="text-xl font-poppins font-bold text-foreground mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground font-inter leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-secondary rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-poppins font-bold text-foreground mb-4">
              Perfect for Fitness Enthusiasts & Snack Lovers
            </h3>
            <p className="text-lg text-muted-foreground font-inter mb-6">
              Whether you're recovering from a workout or need a satisfying snack, 
              Pakasain Protein Nimko delivers the nutrition and taste you crave.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-full px-6 py-3 shadow-md">
                <span className="font-poppins font-semibold text-primary">✓ Post-Workout Recovery</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 shadow-md">
                <span className="font-poppins font-semibold text-success">✓ Office Energy Boost</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 shadow-md">
                <span className="font-poppins font-semibold text-accent">✓ Tea-Time Treat</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}