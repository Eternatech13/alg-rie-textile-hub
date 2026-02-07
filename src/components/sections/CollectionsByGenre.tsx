import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCategories } from '@/data/mockProducts';

const CollectionsByGenre = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-section text-foreground mb-4">
              Explorez nos collections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Découvrez notre sélection de produits textiles algériens organisée par catégorie
            </p>
          </div>
          
        </motion.div>

        {/* Horizontal Scrollable Categories */}
        <div className="relative">
          {/* Left Arrow - Positioned on the left side */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center text-foreground hover:bg-white hover:scale-105 transition-all"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow - Positioned on the right side */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center text-foreground hover:bg-white hover:scale-105 transition-all"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mockCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-start"
              >
                <Link
                  to={`/categorie/${category.slug}`}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden card-hover block"
                >
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="font-heading font-bold text-2xl text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">
                        {category.productCount} produits
                      </span>
                      <span className="inline-flex items-center gap-1 text-white text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        Explorer
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile scroll indicators */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex gap-2">
              {mockCategories.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-muted-foreground/30"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsByGenre;
