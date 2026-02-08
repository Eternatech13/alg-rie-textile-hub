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
      
      {/* Hero Section with Immersive Image */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://www.e-smarttec.com/images/devenir-partenaire.webp" 
            alt="Devenir Partenaire" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="section-container relative z-10 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              Partenariat
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Rejoignez l'écosystème{' '}
              <span className="text-accent">Sallate Bladi</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Valorisez votre savoir-faire textile et vos créations sur une marketplace algérienne innovante
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-14 text-lg"
                asChild
              >
                <a href="#partner-types">
                  Découvrir les opportunités
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white font-semibold px-8 h-14 text-lg"
                asChild
              >
                <Link to="#">
                  Nous contacter
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/5">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-section text-foreground mb-4">
              Pourquoi devenir partenaire ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profitez d'avantages exclusifs pour développer votre activité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Type Selection */}
      <section id="partner-types" className="section-padding">
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
