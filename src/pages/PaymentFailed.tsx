import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, CreditCard, Phone, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PaymentFailed() {
  const orderDetails = {
    orderNumber: "PAK-2024-001",
    orderDate: new Date().toLocaleDateString(),
    total: 5297,
    errorMessage: "Payment was declined by your bank. Please check your card details and try again."
  };

  const commonIssues = [
    {
      title: "Insufficient Funds",
      description: "Ensure your account has sufficient funds for the transaction",
      icon: CreditCard
    },
    {
      title: "Card Expired",
      description: "Check if your card has expired and use a valid card",
      icon: CreditCard
    },
    {
      title: "Incorrect CVV",
      description: "Verify the 3-digit security code on the back of your card",
      icon: CreditCard
    },
    {
      title: "Billing Address Mismatch",
      description: "Ensure your billing address matches your card statement",
      icon: CreditCard
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
          >
            <AlertCircle className="w-12 h-12 text-red-600" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{
            fontFamily: "'Montserrat', serif"
          }}>
            Payment Failed
          </h1>
          
          <p className="text-lg text-gray-600 mb-2" style={{
            fontFamily: "'Nunito', serif"
          }}>
            We're sorry, but your payment could not be processed.
          </p>
          
          <p className="text-gray-500">
            Order #{orderDetails.orderNumber} • {orderDetails.orderDate}
          </p>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-red-50 rounded-2xl border border-red-200 p-6 md:p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Error</h3>
              <p className="text-red-700 mb-4">
                {orderDetails.errorMessage}
              </p>
              <p className="text-red-600 text-sm">
                Don't worry, your order has been saved and no charges were made to your account.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">Pakasain Protein Nimko</span>
                <span className="text-gray-500 ml-2">x2</span>
              </div>
              <span className="font-medium">PKR 2798</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">Pakasain Protein Nimko - Family Pack</span>
                <span className="text-gray-500 ml-2">x1</span>
              </div>
              <span className="font-medium">PKR 2499</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>PKR {orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Common Issues */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Payment Issues</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {commonIssues.map((issue, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <issue.icon className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{issue.title}</h3>
                    <p className="text-sm text-gray-600">{issue.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/checkout">
              <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold hover:shadow-lg">
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="secondary" size="lg" className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold hover:border-gray-400">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            Need immediate assistance? Contact our support team
          </div>
        </motion.div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-4">
                Speak with a customer service representative
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                +1 (555) 123-4567
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Send us a detailed message
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                support@pakasain.com
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Alternative Payment</h3>
              <p className="text-sm text-gray-600 mb-4">
                Try a different payment method
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                View Options
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-2xl p-6 border border-red-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Still Having Issues?</h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help you complete your order successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="secondary" className="border-red-300 text-red-700 hover:bg-red-50">
                Live Chat
              </Button>
              <Button variant="secondary" className="border-green-300 text-green-700 hover:bg-green-50">
                FAQ
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
