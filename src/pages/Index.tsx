import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PromotionalBanner from '@/components/banner/PromotionalBanner';
import HeroSection from '@/components/hero/HeroSection';
import ProductSection from '@/components/products/ProductSection';
import CollectionsByGenre from '@/components/sections/CollectionsByGenre';
import DesignersSection from '@/components/sections/DesignersSection';
import SuppliersSection from '@/components/sections/SuppliersSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromotionalBanner />
      <Header />
      
      <main className="flex-1">
        {/* Section 1: Hero with Flashlight Effect */}
        <HeroSection />
        
        {/* Section 2: Featured Products */}
        <ProductSection />
        
        {/* Section 3: Collections by Genre */}
        <CollectionsByGenre />
        
        {/* Section 4: Partner Designers */}
        <DesignersSection />
        
        {/* Section 5: Textile Companies */}
        <SuppliersSection />
        
        {/* Section 6: How It Works */}
        <HowItWorksSection />
        
        {/* Section 7: Advantages */}
        <AdvantagesSection />
      </main>
      
      {/* Section 8: Footer */}
      <Footer />
    </div>
  );
};

export default Index;
