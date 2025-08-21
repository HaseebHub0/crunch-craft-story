import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  weight: string;
  protein: string;
}

export default function Products() {
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const products: Product[] = [
    {
      id: "1",
      name: "Pakasain Protein Nimko",
      price: 24.99,
      image: "/src/assets/Protien-Nimko.webp",
      description: "Premium Pakistani snack with 22g protein per 100g serving",
      weight: "250g",
      protein: "22g"
    },
    {
      id: "2",
      name: "Pakasain Protein Nimko - Family Pack",
      price: 44.99,
      image: "/src/assets/spice-background.webp",
      description: "Larger pack perfect for families and gatherings",
      weight: "500g",
      protein: "22g"
    },
    {
      id: "3",
      name: "Pakasain Protein Nimko - Travel Size",
      price: 14.99,
      image: "/src/assets/floating-ingredients.png",
      description: "Perfect for on-the-go nutrition and travel",
      weight: "150g",
      protein: "22g"
    }
  ];

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1
    });
    setAddedItems(prev => new Set(prev).add(product.id));
    
    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{
            fontFamily: "'Montserrat', serif"
          }}>
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" style={{
            fontFamily: "'Nunito', serif"
          }}>
            Discover our range of premium Pakistani Protein Nimko products, 
            each crafted with authentic flavors and superior nutrition.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.protein} Protein
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{
                  fontFamily: "'Montserrat', serif"
                }}>
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4" style={{
                  fontFamily: "'Nunito', serif"
                }}>
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.weight}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 ${
                    addedItems.has(product.id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  } text-white font-bold transition-all duration-300`}
                  disabled={addedItems.has(product.id)}
                >
                  {addedItems.has(product.id) ? (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-3xl p-8 md:p-12 border border-red-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{
                fontFamily: "'Montserrat', serif"
            }}>
              Ready to Experience Authentic Pakistani Flavors?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" style={{
              fontFamily: "'Nunito', serif"
            }}>
              Add your favorite products to cart and enjoy the perfect blend of tradition and nutrition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cart">
                <Button 
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold hover:shadow-lg"
                >
                  View Cart
                </Button>
              </Link>
              <Button 
                variant="secondary" 
                size="lg"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold hover:border-gray-400"
              >
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
