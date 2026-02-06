import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PromotionalBanner from '@/components/banner/PromotionalBanner';
import HeroSection from '@/components/hero/HeroSection';
import AdvertisementBanner from '@/components/sections/AdvertisementBanner';
import ProductSection from '@/components/products/ProductSection';
import CollectionsByGenre from '@/components/sections/CollectionsByGenre';
import DesignersSection from '@/components/sections/DesignersSection';
import SuppliersSection from '@/components/sections/SuppliersSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromotionalBanner />
      <Header />
      
      <main className="flex-1">
        {/* Section 1: Hero with Flashlight Effect */}
        <HeroSection />
        
        {/* Section 2: Advertisement Banner Carousel */}
        <AdvertisementBanner />
        
        {/* Section 3: Featured Products */}
        <ProductSection />
        
        {/* Section 4: Collections by Genre */}
        <CollectionsByGenre />
        
        {/* Section 5: Partner Designers */}
        <DesignersSection />
        
        {/* Section 6: Textile Companies */}
        <SuppliersSection />
        
        {/* Section 7: How It Works */}
        <HowItWorksSection />
        
        {/* Section 8: Advantages */}
        <AdvantagesSection />
        
        {/* Section 9: Contact */}
        <ContactSection />
      </main>
      
      {/* Section 10: Footer */}
      <Footer />
    </div>
  );
};

export default Index;
