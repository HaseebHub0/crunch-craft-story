import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface StaggeredContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggeredContainer({ 
  children, 
  staggerDelay = 0.1,
  className = ""
}: StaggeredContainerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {child}
            </motion.div>
          ))
        : <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
      }
    </motion.div>
  );
}