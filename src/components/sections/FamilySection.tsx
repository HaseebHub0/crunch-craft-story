import { motion } from 'framer-motion';
import { Heart, Users, Shield, Star } from 'lucide-react';

const FamilySection = () => {
  
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Family content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Main heading with family emphasis */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
              >
                All-Rounder Snack
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
              >
                Snack Aisa Jo{' '}
                <span className="text-red-600">Mummy Bhi</span>{' '}
                Approve Kare
              </motion.h2>
              
                             <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 viewport={{ once: true }}
                 className="text-xl text-gray-600 leading-relaxed"
               >
                 Mid-day snack ho ya Netflix & Chill— Sahibzada Nimko har waqt fit.
                 A wholesome snack that brings families together.
               </motion.p>
               
               {/* Family benefits */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.5 }}
                 viewport={{ once: true }}
                 className="flex flex-wrap gap-3"
               >
                 
                 
               </motion.div>
             </div>
          </motion.div>

                     {/* Right side - Family image and content */}
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
             className="relative space-y-6"
           >
             {/* Main family image */}
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               viewport={{ once: true }}
               className="relative"
             >
               <img 
                 src="/image.png" 
                 alt="Family enjoying Sahibzada Nimko snacks" 
                 className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white "
               />
               
            
             </motion.div>

             
             
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FamilySection;
