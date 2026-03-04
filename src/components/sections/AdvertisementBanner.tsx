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
    title: "",
    subtitle: "",
    image: "/banner-partenaires.png"
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    image: "/banner-jeans.png"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${advertisements[currentIndex].image})` }}
          />
          
          {/* No overlay */}
          
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
