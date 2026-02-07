import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Factory, ArrowRight, CheckCircle, Users, TrendingUp, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BecomePartner = () => {
  const benefits = [
    {
      icon: Users,
      title: "Accès à une large clientèle",
      description: "Touchez des milliers de clients à travers l'Algérie"
    },
    {
      icon: TrendingUp,
      title: "Croissance garantie",
      description: "Bénéficiez de notre expertise marketing et commerciale"
    },
    {
      icon: Shield,
      title: "Partenariat sécurisé",
      description: "Contrats clairs et paiements garantis"
    }
  ];

  const partnerTypes = [
    {
      icon: Palette,
      title: "Designer",
      description: "Vous êtes designer textile ou styliste et souhaitez proposer vos créations",
      href: "/devenir-partenaire/designer",
      cta: "Devenir Designer",
      features: [
        "Mettez en valeur vos créations",
        "Collaborez avec des unités textiles",
        "Percevez des revenus sur chaque vente"
      ],
      gradient: "from-primary to-primary/80"
    },
    {
      icon: Factory,
      title: "Société Textile",
      description: "Vous êtes une société textile et souhaitez produire et vendre sur Sallate Bladi",
      href: "/devenir-partenaire/societe-textile",
      cta: "Devenir Société Textile",
      features: [
        "Accédez à de nouveaux marchés",
        "Travaillez avec des designers talentueux",
        "Développez votre production"
      ],
      gradient: "from-accent to-premium"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Partenariat
            </span>
            <h1 className="text-hero text-foreground mb-6">
              Rejoignez l'écosystème{' '}
              <span className="text-gradient-premium">Sallate Bladi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Valorisez votre savoir-faire textile et vos créations sur une marketplace algérienne innovante
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-secondary/5">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Type Selection */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-section text-foreground mb-4">
              Choisissez votre profil partenaire
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sélectionnez le type de partenariat qui correspond à votre activité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {partnerTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="group h-full border-2 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden card-hover">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {type.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {type.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link to={type.href}>
                      <Button className="w-full h-12 rounded-xl font-semibold group/btn">
                        {type.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-primary/5">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Pourquoi nous rejoindre ?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Sallate Bladi est la première marketplace algérienne dédiée au textile. Nous connectons designers, 
              sociétés textiles et clients dans un écosystème innovant et sécurisé.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                100% Algérien
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Paiements sécurisés
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Support dédié
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Visibilité nationale
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomePartner;
