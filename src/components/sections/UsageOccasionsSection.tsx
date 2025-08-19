import AfterExerciseIcon from "@/assets/3d_icons/3dicons-gym-dynamic-color.png";
import BoostIcon from "@/assets/3d_icons/3dicons-sun-front-color.png";
import ChaiIcon from "@/assets/3d_icons/3dicons-tea-cup-dynamic-premium.png";
import FamilyIcon from "@/assets/3d_icons/3dicons-heart-dynamic-color.png";

export default function OccasionSection() {
  return (
    <section className="py-16 bg-red">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* After Exercise */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <img src={AfterExerciseIcon} alt="After Exercise" className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h3 className="text-xl font-semibold text-[#9d0803] mb-2">After Exercise</h3>
            <p className="text-gray-600 mb-3">Fuel your muscles with premium protein for optimal recovery and growth.</p>
          </div>

          {/* 3-4 PM Boost */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <img src={BoostIcon} alt="Boost" className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">3-4 PM Boost</h3>
            <p className="text-gray-600 mb-3">Beat the afternoon slump with sustained energy from complex carbs and protein.</p>
          </div>

          {/* Evening Chai */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <img src={ChaiIcon} alt="Chai" className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Evening Chai</h3>
            <p className="text-gray-600 mb-3">Perfect companion for your evening chai with authentic Pakistani flavors.</p>
          </div>

          {/* Family Gatherings */}
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition text-center">
            <img src={FamilyIcon} alt="Family" className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
            <h3 className="text-xl font-semibold text-pink-700 mb-2">Family Gatherings</h3>
            <p className="text-gray-600 mb-3">Share the tradition with loved ones during special moments and celebrations.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
