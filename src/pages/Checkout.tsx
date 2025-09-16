import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useFreeOrders } from "../contexts/FreeOrdersContext";
import { useNavigate } from "react-router-dom";
import { toast } from "../hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyOfferBar from "@/components/StickyOfferBar";
import { OrderService } from "../services/orderService";
import { WhatsAppService } from "../services/whatsappService";
import { FacebookPixelService } from "../services/facebookPixelService";

export default function Checkout() {
  const { state, getTotalPrice, clearCart } = useCart();
  const { decreaseFreeOrders, isOfferActive } = useFreeOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if cart is empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    // Phone validation (Pakistan format)
    if (formData.phone.trim() && !/^(\+92|0)?[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Pakistani phone number";
    }

    // Email validation
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    // Track checkout initiation
    FacebookPixelService.trackInitiateCheckout(getTotalPrice(), state.items.length);
    
    setIsLoading(true);

    try {
      // Generate a unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Format cart items
      const formattedCartItems = state.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        weight: item.weight,
        quantity: item.quantity,
        image: item.image
      }));

      // Save to Firebase for admin dashboard
      try {
        const firebaseOrderData = {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: `${formData.address.trim()}, ${formData.city.trim()}`,
          items: formattedCartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          totalPrice: getTotalPrice()
        };
        
        const firebaseOrderId = await OrderService.createOrder(firebaseOrderData);
        console.log("✅ Order saved to Firebase with ID:", firebaseOrderId);
      } catch (firebaseError) {
        console.error("Failed to save to Firebase:", firebaseError);
        throw new Error("Failed to save order. Please try again.");
      }

      // Optional: Send WhatsApp notification
      if (window.confirm("Send WhatsApp notifications for this order?")) {
        const whatsappData = {
          orderId: orderId,
          customerName: formData.name.trim(),
          customerPhone: formData.phone.trim(),
          customerAddress: `${formData.address.trim()}, ${formData.city.trim()}`,
          items: formattedCartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: getTotalPrice()
        };
        
        // Send admin notification
        WhatsAppService.sendAdminNotification(whatsappData);
        
        // Send customer confirmation
        setTimeout(() => {
          WhatsAppService.sendOrderConfirmation(whatsappData);
        }, 1000);
      }

      // Track successful purchase
      FacebookPixelService.trackPurchase(
        orderId,
        getTotalPrice(),
        formattedCartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      );

      // Track order completion
      FacebookPixelService.trackCompleteRegistration();

      // Decrease free orders counter if offer is active
      if (isOfferActive()) {
        decreaseFreeOrders();
      }

      // Clear cart and show success message
      clearCart();
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order has been placed and saved to admin dashboard.`,
        variant: "default",
      });

      // Navigate to home page
      navigate("/");
      
    } catch (error: any) {
      console.error("Error placing order:", error);
      
      let errorMessage = "There was an error placing your order. Please try again.";
      
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Order Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      <StickyOfferBar />
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 md:py-24" style={{ paddingTop: '60px' }}>
        <div className="container mx-auto px-4 max-w-3xl mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Checkout
            </h1>

            {/* Order Summary */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">PKR {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-300">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-red-600">PKR {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                }`}
              >
                {isLoading ? 'Placing Order...' : `Place Order - PKR ${totalPrice.toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
