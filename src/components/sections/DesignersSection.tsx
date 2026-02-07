import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockDesignerProfiles } from '@/data/mockDesigners';
import { Button } from '@/components/ui/button';

const DesignersSection = () => {
  const featuredDesigners = mockDesignerProfiles.filter(d => d.featured);

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-section text-foreground mb-4">
            Nos Designers Partenaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des designers algériens passionnés qui collaborent avec nos sociétés textiles pour créer des collections uniques
          </p>
        </motion.div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDesigners.map((designer, index) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-4 border border-border hover:border-primary/20 card-hover text-center"
            >
              {/* Photo */}
              <div className="relative w-32 h-32   mx-auto mb-6">
                <img
                  src={designer.photo}
                  alt={designer.name}
                  className="w-full h-full rounded-full object-cover border-4 border-secondary/20"
                  loading="lazy"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium whitespace-nowrap">
                  {designer.specialties[0]}
                </div>
              </div>

              {/* Info */}
              <h3 className="font-heading font-semibold text-xl text-card-foreground mb-2">
                {designer.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {designer.bio}
              </p>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
                asChild
              >
                <Link to={`/designer/${designer.id}`}>
                  Voir le portfolio
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link to="/designers">
              Voir tous les designers
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignersSection;
