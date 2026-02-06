import { motion } from 'framer-motion';
import { UserPlus, ShoppingBag, CreditCard, Truck } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: 'Inscription',
      description: 'Créez votre compte client ou société en quelques minutes',
    },
    {
      icon: ShoppingBag,
      number: '02',
      title: 'Choix produit',
      description: 'Parcourez notre catalogue et sélectionnez vos produits',
    },
    {
      icon: CreditCard,
      number: '03',
      title: 'Paiement',
      description: 'Paiement sécurisé via CCP ou carte bancaire',
    },
    {
      icon: Truck,
      number: '04',
      title: 'Livraison',
      description: 'Livraison nationale sous 48-72h partout en Algérie',
    },
  ];

  return (
    <section className="section-padding bg-primary text-primary-foreground overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4">
            Processus simple
          </span>
          <h2 className="text-section text-white mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Un processus d'achat simplifié pour vous permettre de commander facilement
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 hidden lg:block -translate-y-8" />
          <div className="absolute top-1/2 left-0 right-0 hidden lg:block -translate-y-8">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Icon Container */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <step.icon className="w-10 h-10 text-accent" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-accent-foreground font-heading font-bold text-sm flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-xl text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
