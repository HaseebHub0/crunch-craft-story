import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import NutritionSection from "@/components/sections/NutritionSection";
import UsageOccasionsSection from "@/components/sections/UsageOccasionsSection";
import BadgesSection from "@/components/sections/badges";
import CallToActionSection from "@/components/sections/CallToActionSection";
import LogoSection from "@/components/sections/LogoSection";
import FamilySection from "@/components/sections/FamilySection";
import SplashScreen from "@/components/SplashScreen";
import StickyOfferBar from "@/components/StickyOfferBar";
import SEO from "@/components/SEO";

import SimplePopup from "@/components/SimplePopup";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <SEO
        title="Protein Nimko - 22g Protein Pakistani Snack | Pakasian Premium Nimko"
        description="Best Protein Nimko in Pakistan - 22g protein per 100g serving. Premium Pakistani protein nimko snacks with authentic taste and superior nutrition. Order now!"
        keywords="protein nimko, protein nimko pakistan, best protein nimko, pakistani protein nimko, high protein nimko, protein nimko snacks, nimko protein, protein rich nimko, healthy nimko, protein nimko online, buy protein nimko, protein nimko delivery, pakistani snacks protein, nimko with protein, protein nimko brand"
        url="https://pakasianshop.com/"
        type="website"
      />
      {/* {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
       */}
      <div className="min-h-screen">
        <StickyOfferBar />
        <Header />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="occasions">
          <UsageOccasionsSection />
        </section>

        <section id="family">
          <FamilySection />
        </section>
        <section id="logos">
          <LogoSection />
        </section>
        <section id="nutrition">
          <NutritionSection />
        </section>
        
        <section id="badges">
          <BadgesSection />
        </section>
        
        
        
        <CallToActionSection />
        
        
       
      </main>
        
        <Footer />
        <SimplePopup />
      </div>
    </>
  );
};

export default Index;
