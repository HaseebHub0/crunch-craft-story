import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dumbbell, Coffee, Users, Briefcase } from "lucide-react";

export default function UsageOccasionsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const occasions = [
    {
      icon: Dumbbell,
      title: "Post-Workout Snack",
      description: "Fuel your recovery with 22g of protein",
      image: "🏋️‍♂️",
      gradient: "from-primary to-primary/70",
      time: "After Exercise",
      benefit: "Muscle Recovery"
    },
    {
      icon: Briefcase,
      title: "Office Energy Boost",
      description: "Beat the afternoon slump with nutritious crunch",
      image: "💼",
      gradient: "from-success to-success/70",
      time: "3-4 PM",
      benefit: "Sustained Energy"
    },
    {
      icon: Coffee,
      title: "Tea-Time Treat",
      description: "Perfect companion for your evening chai",
      image: "🍵",
      gradient: "from-accent to-accent/70",
      time: "Evening",
      benefit: "Social Snacking"
    },
    {
      icon: Users,
      title: "Family Gatherings",
      description: "Share the tradition with loved ones",
      image: "👨‍👩‍👧‍👦",
      gradient: "from-primary/80 to-accent/60",
      time: "Anytime",
      benefit: "Togetherness"
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-subtle relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
            Perfect For{" "}
            <span className="gradient-text">Every</span>{" "}
            Occasion
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-3xl mx-auto">
            From morning motivation to evening relaxation, discover when Pakasain fits perfectly into your lifestyle
          </p>
        </motion.div>

        {/* Occasions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              className="group"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-floating hover:shadow-elegant transition-all duration-300 hover:scale-105">
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-br ${occasion.gradient} p-8 text-center relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 text-4xl">{occasion.image}</div>
                    <div className="absolute bottom-4 right-4 text-4xl opacity-50">{occasion.image}</div>
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative z-10"
                  >
                    <occasion.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Large Emoji */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl mb-4 relative z-10"
                  >
                    {occasion.image}
                  </motion.div>
                  
                  {/* Time Badge */}
                  <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 inline-block relative z-10">
                    <span className="text-white font-poppins font-medium text-sm">
                      {occasion.time}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-bold text-foreground mb-3">
                    {occasion.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-inter mb-4 leading-relaxed">
                    {occasion.description}
                  </p>
                  
                  {/* Benefit Badge */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                    <span className="text-sm font-poppins font-semibold text-primary">
                      {occasion.benefit}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-elegant max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 text-6xl">🌟</div>
              <div className="absolute bottom-8 right-8 text-6xl">🌿</div>
            </div>
            
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="relative z-10"
            >
              <p className="text-2xl lg:text-3xl font-poppins font-semibold text-foreground leading-relaxed mb-6">
                "From workouts to gatherings, Pakasain Protein Nimko brings{" "}
                <span className="gradient-text">authentic Pakistani flavor</span>{" "}
                to every moment that matters."
              </p>
              
              <div className="flex justify-center items-center gap-4">
                <div className="w-16 h-1 bg-gradient-primary rounded-full"></div>
                <span className="text-muted-foreground font-inter italic">
                  Nutrition meets tradition
                </span>
                <div className="w-16 h-1 bg-gradient-primary rounded-full"></div>
              </div>
            </motion.blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}