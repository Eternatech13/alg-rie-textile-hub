import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockTextileCompanies } from '@/data/mockTextileCompanies';
import { Button } from '@/components/ui/button';

const SuppliersSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Partenaires certifiés
          </span>
          <h2 className="text-section text-foreground mb-4">
            Nos Sociétés Textiles Partenaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des entreprises textiles algériennes de confiance, vérifiées et conventionnées
          </p>
        </motion.div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTextileCompanies.slice(0, 6).map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl border border-border hover:border-primary/20 card-hover overflow-hidden"
            >
              <Link to={`/societe-textile/${supplier.id}`} className="block p-6 hover:bg-muted/20 transition-colors">
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-muted/50">
                  <img
                    src={supplier.logo}
                    alt={supplier.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-card-foreground truncate">
                      {supplier.name}
                    </h3>
                    {supplier.verified && (
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      supplier.type === 'public'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {supplier.type === 'public' ? 'Publique' : 'Privée'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {supplier.wilaya}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mt-4 mb-4 line-clamp-2">
                {supplier.description}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4">
                {supplier.textileDomains.slice(0, 3).map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-1 rounded-lg bg-muted text-muted-foreground text-xs"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              </Link>
              
              {/* Footer with separate link for products */}
              <div className="flex items-center justify-between p-6 pt-4 border-t border-border bg-muted/10">
                <span className="text-sm text-muted-foreground">
                  {supplier.productCount} produits
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  asChild
                >
                  <Link to={`/societe-textile/${supplier.id}#produits`} onClick={(e) => e.stopPropagation()}>
                    Voir produits
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </div>
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
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link to="/societes-textiles">
              Voir toutes les sociétés
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SuppliersSection;
