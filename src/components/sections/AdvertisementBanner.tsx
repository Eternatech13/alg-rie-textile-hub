import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Advertisement {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const advertisements: Advertisement[] = [
  {
    id: 1,
    title: "Collection Printemps 2024",
    subtitle: "Découvrez les nouvelles tendances textiles algériennes",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Artisanat Premium",
    subtitle: "Des créations uniques par nos meilleurs artisans",
    image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Offre Professionnels",
    subtitle: "-20% sur les commandes en gros pour les entreprises",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&auto=format&fit=crop&q=80"
  }
];

const AdvertisementBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % advertisements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${advertisements[currentIndex].image})` }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          
          {/* Content - Only Captions */}
          <div className="relative h-full section-container flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                {advertisements[currentIndex].title}
              </h2>
              <p className="text-lg md:text-xl text-white/80">
                {advertisements[currentIndex].subtitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default AdvertisementBanner;
