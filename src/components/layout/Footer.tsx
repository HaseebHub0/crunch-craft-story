import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import logo from "@/assets/logo.webp";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
// import LocationIcon from "@/assets/3d_icons/3dicons-map-pin-dynamic-premium (1).png";
// import PhoneIcon from "@/assets/3d_icons/3dicons-call-only-dynamic-premium.png";
// import MailIcon from "@/assets/3d_icons/3dicons-mail-dynamic-premium.png";

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/15KjrkXxpj/", color: "hover:text-blue-500" },
    { icon: Instagram, href: "https://www.instagram.com/pakasianfoodspk?igsh=MW1qZTFneHV6bXpmcw==", color: "hover:text-pink-500" },
   
  ];

  const quickLinks = [
    { name: "About Us", href: "#story" },
    { name: "Products", href: "#nutrition" },
    { name: "Nutrition Info", href: "#nutrition" },
    { name: "Badges", href: "#badges" },
    { name: "Contact", href: "#contact" },
  ];

  const productLinks = [
    { name: "Pakasian Protein Nimko", href: "#" },
    { name: "Traditional Nimko", href: "#" },
    { name: "Spice Blends", href: "#" },
    { name: "Snack Boxes", href: "#" },
  ];

  return (
    <footer 
      ref={ref}
      className="bg-foreground text-background py-16 relative overflow-hidden"
    >
      

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                <img src="/logo.webp" alt="Pakasian Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-2xl text-background">
                  Pakasian Protein Nimko
                </h3>
                <p className="text-background/70 text-sm">
                  By Pak Asian Foods
                </p>
              </div>
            </div>
            
            <p className="text-background/80 font-inter text-lg leading-relaxed mb-6">
              Where tradition meets nutrition. Experience the authentic taste of Pakistan 
              with the power of modern protein-packed ingredients.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
              <img src="/3d_icons/3dicons-map-pin-dynamic-premium (1).png" alt="Location" className="w-10 h-10 " />
                <span className="text-background/80 font-inter">
                  Nag Shah Chowk, Shujabad Road, Multan
                </span>
              </div>
              <div className="flex items-center gap-3">
              <img src="/3d_icons/3dicons-call-only-dynamic-premium.png" alt="Phone" className="w-10 h-10" />
                <span className="text-background/80 font-inter">
                  +92 315-742222, 061-4231425
                </span>
              </div>
              <div className="flex items-center gap-3">
              <img src="/3d_icons/3dicons-mail-dynamic-premium.png" alt="Mail" className="w-10 h-10 " />
                <span className="text-background/80 font-inter">
                infopakasian@gmail.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="hidden lg:block font-poppins font-bold text-xl text-background mb-6">
              Quick Links
            </h4>
            <ul className="hidden lg:block space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                >
                  <a 
                    href={link.href}
                    className="hidden lg:block text-background/70 hover:text-accent transition-colors font-inter hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          Products 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="hidden lg:block font-poppins font-bold text-xl text-background mb-6">
              Our Products
            </h4>
            <ul className="hidden lg:block space-y-3">
              {productLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                >
                  <a 
                    href={link.href}
                    className="hidden lg:block text-background/70 hover:text-accent transition-colors font-inter hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div> */}
        </div>

        
        {/* Policy Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          <a 
            href="/privacy-policy"
            className="text-background/70 hover:text-accent transition-colors font-inter text-sm"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms-conditions"
            className="text-background/70 hover:text-accent transition-colors font-inter text-sm"
          >
            Terms & Conditions
          </a>
          <a 
            href="/shipping-policy"
            className="text-background/70 hover:text-accent transition-colors font-inter text-sm"
          >
            Shipping Policy
          </a>
          <a 
            href="/return-policy"
            className="text-background/70 hover:text-accent transition-colors font-inter text-sm"
          >
            Return Policy
          </a>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-background/60 font-inter text-center md:text-left"
            >
              © 2024 Pak Asian Foods. All rights reserved. Made with ❤️ for Pakistani food lovers.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center gap-4"
            >
              <span className="text-background/60 font-inter text-sm mr-2">
                Follow us:
              </span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-background/10 backdrop-blur-sm rounded-full flex items-center justify-center text-background/70 ${social.color} transition-all duration-300 hover:bg-background/20`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}