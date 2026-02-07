import { motion } from 'framer-motion';
import { UserPlus, ShoppingBag, CreditCard, Truck, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: 'Inscription',
      description: 'Créez votre compte client ou société en quelques minutes',
      color: 'from-cyan-500 to-teal-600',
    },
    {
      icon: ShoppingBag,
      number: '02',
      title: 'Choix produit',
      description: 'Parcourez notre catalogue et sélectionnez vos produits',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: CreditCard,
      number: '03',
      title: 'Paiement',
      description: 'Paiement sécurisé via CCP ou carte bancaire',
      color: 'from-cyan-600 to-teal-700',
    },
    {
      icon: Truck,
      number: '04',
      title: 'Livraison',
      description: 'Livraison nationale sous 48-72h partout en Algérie',
      color: 'from-teal-600 to-cyan-700',
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
            Processus simple
          </span>
          <h2 className="text-section text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus d'achat simplifié pour vous permettre de commander facilement
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted/30 rounded-full hidden lg:block -translate-y-12" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 via-cyan-600 to-teal-600 rounded-full hidden lg:block -translate-y-12"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="relative text-center group"
              >
                {/* Icon Container with Dynamic Colors */}
                <div className="relative inline-flex mb-6">
                  <motion.div 
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.span 
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-foreground text-background font-heading font-bold text-sm flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  >
                    {step.number}
                  </motion.span>
                </div>

                {/* Content */}
                <motion.h3 
                  className="font-heading font-bold text-xl text-foreground mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {step.description}
                </motion.p>

                {/* Enhanced Arrow for connection (except last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute top-12 -right-4 hidden lg:block"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    <motion.div
                      className="relative"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                      {/* Animated pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 0, 0.7]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
