import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useFreeOrders } from "../contexts/FreeOrdersContext";
import { useNavigate } from "react-router-dom";
import { toast } from "../hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyOfferBar from "@/components/StickyOfferBar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SimplePopup from "@/components/SimplePopup";

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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if cart is empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Please add some items to your cart before checkout.</p>
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 11-digit phone number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters long";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters long";
    }

    // Pincode validation
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Postal code is required";
    } else if (!/^\d{5,6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Please enter a valid 5-6 digit postal code";
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
    setIsLoading(true);

    try {
      // Generate a unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Format cart items to match what the backend expects
      const formattedCartItems = state.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        weight: item.weight,
        quantity: item.quantity,
        image: item.image
      }));

      const orderData = {
        orderId: orderId,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        cart: formattedCartItems,
        totalAmount: getTotalPrice(),
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log("Sending order data:", orderData);
      console.log("Cart items count:", formattedCartItems.length);
      console.log("Total amount:", getTotalPrice());

      // Send to Netlify function which will proxy to Google Apps Script
      const endpoint = "/.netlify/functions/proxy";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Backend response:", result);

      if (!result.success) {
        throw new Error(result.message || "Order failed");
      }

      // Decrease free orders counter if offer is active
      if (isOfferActive()) {
        decreaseFreeOrders();
      }

      // Clear cart and show success message
      clearCart();
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order #${orderId} has been placed. Check your email for confirmation.`,
        duration: 8000,
      });

      // Navigate to success page or home
      navigate("/");
    } catch (error: any) {
      console.error("Error placing order:", error);
      
      let errorMessage = "There was an error placing your order. Please try again.";
      
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message.includes("HTTP error")) {
        errorMessage = "Server error. Please try again in a few minutes.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Order Failed ❌",
        description: errorMessage,
        variant: "destructive",
        duration: 8000,
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
      <div className="min-h-screen bg-gray-50 py-8" style={{ paddingTop: '60px' }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-20">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Checkout</h1>
            <p className="text-red-100">Complete your order</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.weight}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">PKR {item.price}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-red-600">PKR {totalPrice}</span>
                  </div>
                  {isOfferActive() && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <span className="font-semibold">🚚 FREE Delivery Applied!</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        You saved PKR 200 on delivery charges
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                    placeholder="e.g., 03001234567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  <p className="text-xs text-gray-500 mt-1">Enter 11-digit phone number (e.g., 03001234567)</p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Complete Address *
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
                    placeholder="Enter your complete address including street, house number, area, etc."
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  <p className="text-xs text-gray-500 mt-1">Please provide your complete address for accurate delivery</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter Postal Code"
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    `Place Order - PKR ${totalPrice}`
                  )}
                </button>

                {isLoading && (
                  <p className="text-sm text-gray-600 text-center">
                    Please wait while we process your order...
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
      <ExitIntentPopup />
      <SimplePopup />
    </>
  );
}
