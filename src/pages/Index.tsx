import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import OriginStorySection from "@/components/sections/OriginStorySection";
import NutritionSection from "@/components/sections/NutritionSection";
import UsageOccasionsSection from "@/components/sections/UsageOccasionsSection";
import IngredientsShowcase from "@/components/sections/IngredientsShowcase";
import CallToActionSection from "@/components/sections/CallToActionSection";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )} */}
      
      <div className="min-h-screen">
        <Header />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="occasions">
          <UsageOccasionsSection />
        </section>

        <section id="story">
          <OriginStorySection />
        </section>
        
        

        <section id="nutrition">
          <NutritionSection />
        </section>
        
        
        
        <section id="ingredients">
          <IngredientsShowcase />
        </section>
        
        <CallToActionSection />
      </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
