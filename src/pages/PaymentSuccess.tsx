import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Mail, Download, Home, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const orderDetails = {
    orderNumber: "PAK-2024-001",
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      { name: "Pakasian Protein Nimko", quantity: 2, price: 1399 },
      { name: "Pakasian Protein Nimko - Family Pack", quantity: 1, price: 2499 }
    ],
    total: 5297,
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{
            fontFamily: "'Montserrat', serif"
          }}>
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2" style={{
            fontFamily: "'Nunito', serif"
          }}>
            Thank you for your order. Your payment has been processed successfully.
          </p>
          
          <p className="text-gray-500">
            Order #{orderDetails.orderNumber} • {orderDetails.orderDate}
          </p>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-medium">PKR {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>PKR {orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Confirmation</h3>
              <p className="text-sm text-gray-600">
                You'll receive an email confirmation with your order details
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600">
                We'll prepare your order and ship it within 1-2 business days
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">
                Estimated delivery: {orderDetails.estimatedDelivery}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Shipping Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              <strong>{orderDetails.shippingAddress.name}</strong><br />
              {orderDetails.shippingAddress.address}<br />
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
                <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold hover:shadow-lg">
                <Home className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            
            <Button variant="secondary" size="lg" className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold hover:border-gray-400">
              <Download className="w-5 h-5 mr-2" />
              Download Receipt
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="text-red-600 hover:text-red-700 underline">Contact our support team</Link>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-2xl p-6 border border-red-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Track Your Order</h3>
            <p className="text-gray-600 mb-4">
              You'll receive tracking information via email once your order ships.
            </p>
            <Button variant="secondary" className="border-red-300 text-red-700 hover:bg-red-50">
              <ShoppingBag className="w-4 h-4 mr-2" />
              View Order Status
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
