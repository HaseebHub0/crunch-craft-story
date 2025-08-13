import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Story", href: "#story" },
    { name: "Nutrition", href: "#nutrition" },
    { name: "Occasions", href: "#occasions" },
    { name: "Ingredients", href: "#ingredients" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-montserrat font-black text-xl">P</span>
            </div>
            <div>
            <h1 className="font-montserrat font-black text-lg text-foreground">
              PAKASAIN
            </h1>
            <p className="text-xs text-muted-foreground -mt-1 font-nunito">
              Protein Power
            </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="font-nunito font-semibold text-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop
            </Button>
            <Button variant="hero" size="sm">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="block font-nunito font-semibold text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop
              </Button>
              <Button variant="hero" size="sm" className="w-full">
                Order Now
              </Button>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}