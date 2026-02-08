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
    image: "https://i.pinimg.com/736x/57/89/11/5789118ed47d5e0afcd568658e79b86c.jpg"
  },
  {
    id: 2,
    title: "Artisanat Premium",
    subtitle: "Des créations uniques par nos meilleurs artisans",
    image: "https://i.pinimg.com/736x/9a/bc/f5/9abcf5341e12009a0d6f77bd82b06773.jpg"
  },
  {
    id: 3,
    title: "Offre Professionnels",
    subtitle: "-20% sur les commandes en gros pour les entreprises",
    image: "https://i.pinimg.com/1200x/88/7a/71/887a71bd6d227e1b2c0553aa88d6684c.jpg"
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
    <section className="relative h-[280px] md:h-[350px] overflow-hidden bg-primary">
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
            className="absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: `url(${advertisements[currentIndex].image})` }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Content - Title and Description Top Left */}
          <div className="relative h-full section-container flex items-start pt-16">
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
