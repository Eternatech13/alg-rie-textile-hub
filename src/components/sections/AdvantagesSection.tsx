import { motion } from 'framer-motion';
import { MapPin, CreditCard, Shield, Award, Truck, Headphones, Star, Users, Clock } from 'lucide-react';

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: MapPin,
      title: 'Textile Local',
      description: 'Valorisation du savoir-faire algérien et des artisans locaux. Produits 100% Made in Algeria.',
      color: 'from-cyan-500 to-teal-600',
      details: ['500+ artisans partenaires', 'Tradition préservée', 'Économie locale'],
    },
    {
      icon: CreditCard,
      title: 'Facilité Paiement',
      description: 'Paiement sécurisé via CCP et financement social disponible pour les professionnels.',
      color: 'from-teal-500 to-cyan-600',
      details: ['Paiement CCP sécurisé', 'Financement jusqu\'à 12 mois', 'Factures électroniques'],
    },
    {
      icon: Shield,
      title: 'Qualité Garantie',
      description: 'Produits vérifiés et contrôlés. Garantie satisfaction ou remboursement.',
      color: 'from-cyan-600 to-teal-700',
      details: ['Contrôle qualité strict', 'Garantie 30 jours', 'Retour gratuit'],
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Fournisseurs certifiés et conformes aux normes nationales et internationales.',
      color: 'from-teal-600 to-cyan-700',
      details: ['ISO 9001 certifié', 'Normes OEKO-TEX', 'Labels écologiques'],
    },
    {
      icon: Truck,
      title: 'Livraison Nationale',
      description: 'Livraison dans les 48 wilayas sous 48-72h. Suivi en temps réel.',
      color: 'from-cyan-500 to-teal-600',
      details: ['48 wilayas couvertes', 'Suivi GPS temps réel', 'Livraison express'],
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Une équipe dédiée pour vous accompagner dans vos achats et répondre à vos questions.',
      color: 'from-teal-500 to-cyan-600',
      details: ['Support multilingue', 'Chat en direct', 'Assistance technique'],
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-muted/30 to-muted/10 overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative text-center"
            >
              {/* Icon Container with Dynamic Colors */}
              <div className="relative inline-flex mb-6">
                <motion.div 
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${advantage.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <advantage.icon className="w-10 h-10 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.h3 
                className="font-heading font-bold text-xl text-foreground mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                {advantage.title}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.4 }}
              >
                {advantage.description}
              </motion.p>

              {/* Details List */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.5 }}
              >
                {advantage.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.6 + detailIndex * 0.1 }}
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600" />
                    <span>{detail}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats Badge */}
              <motion.div
                className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center shadow-md"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.15 + 0.2, 
                  type: "spring",
                  stiffness: 200
                }}
              >
                <Star className="w-4 h-4 text-white fill-white" />
              </motion.div>

              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
