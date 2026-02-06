import { motion } from 'framer-motion';
import { MapPin, CreditCard, Shield, Award, Truck, Headphones } from 'lucide-react';

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: MapPin,
      title: 'Textile Local',
      description: 'Valorisation du savoir-faire algérien et des artisans locaux. Produits 100% Made in Algeria.',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: CreditCard,
      title: 'Facilité Paiement',
      description: 'Paiement sécurisé via CCP et financement social disponible pour les professionnels.',
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: Shield,
      title: 'Qualité Garantie',
      description: 'Produits vérifiés et contrôlés. Garantie satisfaction ou remboursement.',
      color: 'bg-premium/10 text-premium',
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Fournisseurs certifiés et conformes aux normes nationales et internationales.',
      color: 'bg-secondary/30 text-primary',
    },
    {
      icon: Truck,
      title: 'Livraison Nationale',
      description: 'Livraison dans les 48 wilayas sous 48-72h. Suivi en temps réel.',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Une équipe dédiée pour vous accompagner dans vos achats et répondre à vos questions.',
      color: 'bg-accent/10 text-accent',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-muted/50 via-background to-secondary/10">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Pourquoi nous choisir
          </span>
          <h2 className="text-section text-foreground mb-4">
            Nos Avantages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Salaate Bladi vous offre une expérience d'achat textile unique et sécurisée
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/20 card-hover"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${advantage.color} mb-4`}>
                <advantage.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
