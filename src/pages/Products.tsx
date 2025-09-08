import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, Gift } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFreeOrders } from "@/contexts/FreeOrdersContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyOfferBar from "@/components/StickyOfferBar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SimplePopup from "@/components/SimplePopup";

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
  const { isOfferActive } = useFreeOrders();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: "1",
      name: "Pakasian Protein Nimko",
      price: 1399,
      image: "Products/Product1.png",
      description: "Premium Pakistani snack with 22g protein per 100g serving",
      weight: "1 kg",
      protein: "22g"
    }
  ];

  const handleAddToCart = (product: Product) => {
    addItem({
      ...product,
      quantity: 1
    });
    setAddedItems(prev => new Set(prev).add(product.id));

    // ✅ Redirect to cart page immediately
    navigate("/cart");

    // Optional: reset added state after 2s
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <>
      <StickyOfferBar />
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 md:py-24" style={{ paddingTop: '60px' }}>
      <div className="container mx-auto px-4 max-w-7xl mt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Montserrat', serif" }}
          >
            Our Products
          </h1>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: "'Nunito', serif" }}
          >
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
              <div className="relative h-100 bg-gray-100">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-50 h-50 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.protein} Protein
                </div>
                {isOfferActive() && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 animate-offer-pulse"
                  >
                    <Gift className="w-4 h-4" />
                    FREE!
                  </motion.div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "'Montserrat', serif" }}
                >
                  {product.name}
                </h3>
                
                <p
                  className="text-gray-600 mb-4"
                  style={{ fontFamily: "'Nunito', serif" }}
                >
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {isOfferActive() ? (
                      <>
                        <span className="text-xl font-bold text-gray-500 line-through">
                          PKR {product.price}
                        </span>
                        <span className="text-2xl font-black text-green-600">
                          FREE!
                        </span>
                      </>
                    ) : (
                      <div className="text-2xl font-bold text-gray-900">
                        PKR {product.price}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{product.weight}</div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* <Button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-3 ${
                      addedItems.has(product.id)
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
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
                  </Button> */}
                  
                  <Link to={`/product/${product.id}`}>
                    <Button
                      variant="outline"
                      className="w-full py-3 border-2 border-gray-300 hover:border-red-500 hover:text-red-600 transition-all duration-300"
                    >
                      Order Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-3xl p-8 md:p-12 border border-red-100">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Montserrat', serif" }}
            >
              Ready to Experience Authentic Pakistani Flavors?
            </h2>
            <p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "'Nunito', serif" }}
            >
              Add your favorite products to cart and enjoy the perfect blend of tradition and nutrition.
            </p>
            
            <div className="flex justify-center">
              <Link to="/cart">
                <Button 
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold hover:shadow-lg"
                >
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </motion.div> */}
      </div>
      </div>
      <Footer />
      <ExitIntentPopup />
      <SimplePopup />
    </>
  );
}
