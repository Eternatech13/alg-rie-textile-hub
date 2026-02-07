import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Factory, Palette, Users, FileSignature, Brush, Package, 
  CreditCard, Truck, Building2, Heart, Handshake, TrendingUp,
  Mail, Phone, MapPin, ArrowRight, CheckCircle2, Star
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const About = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais."
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const ecosystemActors = [
    {
      icon: Factory,
      title: "Sociétés Textiles",
      description: "Fabrication de produits textiles locaux, production industrielle et artisanale, collaboration avec designers partenaires.",
      color: "bg-primary"
    },
    {
      icon: Palette,
      title: "Designers",
      description: "Création de designs innovants, collaboration avec l'industrie textile, valorisation de la créativité algérienne.",
      color: "bg-accent"
    },
    {
      icon: Users,
      title: "Clients",
      description: "Accès aux produits textiles locaux, facilités de paiement CCP, conventions sociétés partenaires.",
      color: "bg-secondary"
    }
  ];

  const howItWorksSteps = [
    {
      number: "01",
      title: "Conventions partenaires",
      description: "Signature de conventions avec les sociétés textiles et les sociétés clientes conventionnées."
    },
    {
      number: "02",
      title: "Création designs",
      description: "Création de designs innovants par nos designers partenaires en collaboration avec l'industrie."
    },
    {
      number: "03",
      title: "Production locale",
      description: "Fabrication des produits textiles dans nos unités de production partenaires en Algérie."
    },
    {
      number: "04",
      title: "Commande client",
      description: "Commande simplifiée avec options de facilité de paiement adaptées au marché algérien."
    },
    {
      number: "05",
      title: "Livraison & suivi",
      description: "Livraison nationale rapide et suivi de commande en temps réel partout en Algérie."
    }
  ];

  const visionPoints = [
    "Promotion du textile algérien sur le marché national",
    "Création d'un écosystème numérique innovant",
    "Soutien aux designers locaux et à la créativité",
    "Modernisation du commerce textile en Algérie",
    "Inclusion sociale via les facilités de paiement"
  ];

  const missionPoints = [
    "Connecter designers et industrie textile locale",
    "Faciliter l'accès aux produits textiles algériens",
    "Structurer les conventions entre tous les acteurs",
    "Garantir transparence et traçabilité complète",
    "Offrir des solutions de paiement adaptées"
  ];

  const impactSocial = [
    {
      icon: CreditCard,
      title: "Facilités de paiement",
      description: "Paiement échelonné via CCP pour rendre les produits accessibles à tous."
    },
    {
      icon: Building2,
      title: "Conventions sociétés",
      description: "Partenariats avec les entreprises pour équiper leurs employés."
    },
    {
      icon: Heart,
      title: "Soutien familles",
      description: "Aide à l'accès aux vêtements scolaires et professionnels."
    },
    {
      icon: Users,
      title: "Inclusion économique",
      description: "Participation de tous les citoyens à l'économie textile nationale."
    }
  ];

  const statistics = [
    { value: "50+", label: "Sociétés textiles partenaires" },
    { value: "120+", label: "Designers actifs" },
    { value: "15 000+", label: "Clients inscrits" },
    { value: "5 000+", label: "Produits disponibles" }
  ];

  const partners = [
    { name: "EATIT", type: "Société textile" },
    { name: "SOITEX", type: "Société textile" },
    { name: "Algérie Confection", type: "Société textile" },
    { name: "CHU Mustapha", type: "Société cliente" },
    { name: "SONELGAZ", type: "Société cliente" },
    { name: "Air Algérie", type: "Société cliente" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SECTION 1: Hero Introduction */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>
        
        <div className="relative section-container py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6">
                Marketplace Textile Algérien
              </span>
              <h1 className="text-hero mb-6">
                Sallate Bladi — La plateforme du textile algérien
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Nous connectons les sociétés textiles locales, les designers et les citoyens 
                pour valoriser la production nationale et faciliter l'accès aux produits textiles.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/catalogue">
                    Découvrir nos produits
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/societes-textiles">
                    Sociétés textiles
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-3xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Factory className="w-24 h-24 text-accent mx-auto mb-6" />
                    <p className="text-white/90 text-lg font-medium">
                      Industrie Textile Algérienne
                    </p>
                    <p className="text-white/60 text-sm mt-2">
                      Savoir-faire et innovation
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Notre Vision */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Notre Vision
              </span>
              <h2 className="text-section mb-6">
                Une ambition nationale pour le textile algérien
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Sallate Bladi ambitionne de devenir la référence du textile algérien en créant 
                un écosystème numérique qui connecte tous les acteurs de la filière.
              </p>
              <ul className="space-y-4">
                {visionPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <TrendingUp className="w-10 h-10 text-primary mb-3" />
                      <p className="font-semibold text-foreground">Croissance</p>
                      <p className="text-sm text-muted-foreground">Économie locale</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <Star className="w-10 h-10 text-accent mb-3" />
                      <p className="font-semibold text-foreground">Excellence</p>
                      <p className="text-sm text-muted-foreground">Qualité textile</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <Handshake className="w-10 h-10 text-secondary mb-3" />
                      <p className="font-semibold text-foreground">Partenariat</p>
                      <p className="text-sm text-muted-foreground">Collaboration</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <Heart className="w-10 h-10 text-destructive mb-3" />
                      <p className="font-semibold text-foreground">Impact</p>
                      <p className="text-sm text-muted-foreground">Social positif</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Notre Mission */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-xl" />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
                      <Factory className="w-8 h-8 text-primary" />
                    </div>
                    <div className="aspect-square bg-accent/10 rounded-xl flex items-center justify-center">
                      <Palette className="w-8 h-8 text-accent" />
                    </div>
                    <div className="aspect-square bg-secondary/20 rounded-xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground">
                    Un écosystème connecté pour le textile algérien
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Notre Mission
              </span>
              <h2 className="text-section mb-6">
                Des objectifs clairs pour un impact réel
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Notre mission est de structurer et digitaliser l'ensemble de la chaîne de valeur 
                textile en Algérie.
              </p>
              <ul className="space-y-4">
                {missionPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Écosystème */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Écosystème
            </span>
            <h2 className="text-section mb-4">
              Les acteurs de Sallate Bladi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un réseau de partenaires complémentaires pour une chaîne de valeur textile complète
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {ecosystemActors.map((actor, index) => (
              <motion.div
                key={actor.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full card-hover border-0 shadow-lg overflow-hidden group">
                  <div className={`h-2 ${actor.color}`} />
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl ${actor.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <actor.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-3">
                      {actor.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {actor.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Comment ça marche */}
      <section className="section-padding bg-primary text-primary-foreground overflow-hidden">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4">
              Processus
            </span>
            <h2 className="text-section text-white mb-4">
              Comment fonctionne Sallate Bladi ?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Un processus structuré pour garantir qualité et satisfaction
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/20 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative inline-flex mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-accent">
                      <span className="text-accent font-heading font-bold text-xl">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-white mb-2">
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

      {/* SECTION 6: Valorisation Textile Algérien */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Made in Algeria
              </span>
              <h2 className="text-section mb-6">
                Valorisation du textile algérien 🇩🇿
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Sallate Bladi s'engage à promouvoir le savoir-faire textile national et à soutenir 
                l'économie locale à travers une plateforme dédiée à la production algérienne.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-muted/30 rounded-xl p-4">
                  <Brush className="w-8 h-8 text-accent mb-2" />
                  <p className="font-semibold">Artisanat</p>
                  <p className="text-sm text-muted-foreground">Savoir-faire traditionnel</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <Factory className="w-8 h-8 text-primary mb-2" />
                  <p className="font-semibold">Industrie</p>
                  <p className="text-sm text-muted-foreground">Production moderne</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <Palette className="w-8 h-8 text-secondary mb-2" />
                  <p className="font-semibold">Design</p>
                  <p className="text-sm text-muted-foreground">Créativité locale</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <Package className="w-8 h-8 text-accent mb-2" />
                  <p className="font-semibold">Qualité</p>
                  <p className="text-sm text-muted-foreground">Standards élevés</p>
                </div>
              </div>

              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link to="/catalogue">
                  Explorer les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl">🧵</span>
                      <p className="mt-2 text-sm text-muted-foreground">Tissage</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl">👗</span>
                      <p className="mt-2 text-sm text-muted-foreground">Confection</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl">🎨</span>
                      <p className="mt-2 text-sm text-muted-foreground">Design</p>
                    </div>
                  </div>
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl">🏭</span>
                      <p className="mt-2 text-sm text-muted-foreground">Production</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Impact Social */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Impact Social
            </span>
            <h2 className="text-section mb-4">
              Un engagement pour tous
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sallate Bladi facilite l'accès aux produits textiles pour tous les Algériens
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactSocial.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center card-hover">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Nos Partenaires */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Partenaires
            </span>
            <h2 className="text-section mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sociétés textiles, sociétés clientes et designers partenaires
            </p>
          </motion.div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-2">
                    <Card className="h-full">
                      <CardContent className="flex flex-col items-center justify-center p-6 h-32">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <p className="font-semibold text-center text-sm">{partner.name}</p>
                        <p className="text-xs text-muted-foreground">{partner.type}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* SECTION 9: Statistiques */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4">
              Chiffres Clés
            </span>
            <h2 className="text-section text-white mb-4">
              Sallate Bladi en chiffres
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-heading font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <p className="text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: Équipe (Optionnelle) */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-primary text-sm font-medium mb-4">
              Notre Histoire
            </span>
            <h2 className="text-section mb-4">
              L'équipe Sallate Bladi
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Née de la volonté de moderniser le secteur textile algérien, Sallate Bladi est une 
              initiative portée par une équipe passionnée qui croit au potentiel de l'industrie 
              nationale. Notre vision : créer un pont entre tradition et innovation.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-white flex flex-col justify-center">
                    <h3 className="text-2xl font-heading font-semibold mb-4">
                      Notre Vision Entrepreneuriale
                    </h3>
                    <p className="text-white/80 mb-6">
                      Transformer le paysage textile algérien en créant une marketplace 
                      qui valorise le savoir-faire local tout en répondant aux besoins 
                      des consommateurs modernes.
                    </p>
                    <Button asChild variant="secondary" className="w-fit">
                      <Link to="/devenir-partenaire">
                        Rejoindre l'aventure
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-muted/30 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Handshake className="w-12 h-12 text-primary" />
                      </div>
                      <p className="text-lg font-semibold">Ensemble</p>
                      <p className="text-muted-foreground">Pour le textile algérien</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 11: Contact */}
      <section className="section-padding bg-muted/20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div {...fadeInUp}>
              <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Contact
              </span>
              <h2 className="text-section mb-6">
                Restons en contact
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Une question, une suggestion ou un projet de partenariat ? 
                N'hésitez pas à nous contacter.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">contact@sallatebladi.dz</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p className="text-muted-foreground">+213 XX XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Adresse</p>
                    <p className="text-muted-foreground">Alger, Algérie</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/devenir-partenaire/societe-textile">
                    Devenir partenaire textile
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/devenir-partenaire/designer">
                    Devenir designer
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/inscription-client">
                    Créer un compte client
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-heading font-semibold mb-6">
                    Envoyez-nous un message
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Votre nom"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="votre@email.com"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Votre message..."
                        rows={5}
                        required
                        className="mt-2"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                      Envoyer le message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
