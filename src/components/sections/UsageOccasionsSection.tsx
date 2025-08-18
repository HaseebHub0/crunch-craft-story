import { Dumbbell, Coffee, Users, Briefcase } from "lucide-react";

export default function OccasionSection() {
  return (
    <section className="py-16 bg-red">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* After Exercise */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <Dumbbell size={40} className="text-[#9d0803]" />
            </div>
            <h3 className="text-xl font-semibold text-[#9d0803] mb-2">
              After Exercise
            </h3>
            <p className="text-gray-600 mb-3">Fuel your muscles with premium protein for optimal recovery and growth.</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Protein Synthesis</li>
              <li>✔ Muscle Repair</li>
              <li>✔ Muscle Recovery</li>
            </ul>
          </div>

          {/* Office Energy Boost */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <Briefcase size={40} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              3-4 PM Boost
            </h3>
            <p className="text-gray-600 mb-3">Beat the afternoon slump with sustained energy from complex carbs and protein.</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Mental Clarity</li>
              <li>✔ No Sugar Crashes</li>
              <li>✔ Sustained Energy</li>
            </ul>
          </div>

          {/* Tea-Time Tradition */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <Coffee size={40} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Evening Chai
            </h3>
            <p className="text-gray-600 mb-3">Perfect companion for your evening chai with authentic Pakistani flavors.</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Traditional Taste</li>
              <li>✔ Social Bonding</li>
              <li>✔ Cultural Experience</li>
            </ul>
          </div>

          {/* Family Gatherings */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <Users size={40} className="text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2">
              Family Gatherings
            </h3>
            <p className="text-gray-600 mb-3">Share the tradition with loved ones during special moments and celebrations.</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Cultural Heritage</li>
              <li>✔ Family Bonding</li>
              <li>✔ Togetherness</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
