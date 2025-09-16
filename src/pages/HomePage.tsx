import React from 'react';
import OrderForm from '../components/OrderForm';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Pakasian Protein Nimko
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Premium Pakistani snack with 22g protein per 100g serving
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              🔥 22g Protein
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              🌿 100% Natural
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              🇵🇰 Made in Pakistan
            </span>
          </div>
        </div>

        {/* Product Image */}
        <div className="text-center mb-12">
          <img
            src="/Products/Product1.png"
            alt="Pakasian Protein Nimko"
            className="mx-auto h-64 w-64 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Order Form */}
        <OrderForm />

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💪</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">High Protein</h3>
            <p className="text-gray-600">22g protein per 100g serving for your fitness goals</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Natural Ingredients</h3>
            <p className="text-gray-600">Made with authentic Pakistani spices and natural ingredients</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Fast Delivery</h3>
            <p className="text-gray-600">Quick delivery across Pakistan within 3-5 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
