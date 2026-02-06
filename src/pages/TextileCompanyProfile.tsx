import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Star,
  Calendar,
  Phone,
  Mail,
  Globe,
  Factory,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Award,
  Layers,
  Send,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getCompanyById } from '@/data/mockTextileCompanies';
import { mockProducts, mockDesigners, formatPrice } from '@/data/mockProducts';

const TextileCompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const company = getCompanyById(id || '');
  const [activeTab, setActiveTab] = useState('presentation');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="section-container pt-32 pb-20 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Société non trouvée</h1>
          <p className="text-muted-foreground mb-6">
            La société que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <Link to="/societes-textiles">
            <Button>Retour à la liste</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related designers
  const relatedDesigners = mockDesigners.filter((d) =>
    company.designerIds.includes(d.id)
  );

  // Get related products (mock - filter by supplier name similarity)
  const relatedProducts = mockProducts.slice(0, 6);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const stats = [
    {
      icon: Package,
      value: company.productCount,
      label: 'Produits',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: ShoppingCart,
      value: company.orderCount,
      label: 'Commandes',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Users,
      value: company.designerPartnerCount,
      label: 'Designers',
      color: 'text-secondary-foreground',
      bgColor: 'bg-secondary',
    },
    {
      icon: TrendingUp,
      value: `${(company.annualProductionVolume / 1000).toFixed(0)}K`,
      label: 'Production/an',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Cover */}
      <section className="relative pt-20">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={company.coverImage}
            alt={company.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="section-container relative -mt-24">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-background overflow-hidden bg-muted shadow-lg">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-3">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/societes-textiles">
                        Sociétés textiles
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{company.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                {/* Name & Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    {company.name}
                  </h1>
                  {company.verified && (
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20 gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Certifiée
                    </Badge>
                  )}
                  <Badge
                    className={
                      company.type === 'public'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary text-secondary-foreground'
                    }
                  >
                    {company.type === 'public' ? 'Publique' : 'Privée'}
                  </Badge>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {company.address}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Depuis {company.yearFounded}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    {company.qualityRating}/5
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{company.description}</p>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {company.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="gap-1">
                      <Award className="w-3 h-3" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:w-40">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.bgColor} rounded-xl p-3 text-center`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                    <p className={`text-xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="section-padding">
        <div className="section-container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-muted/50 p-1 rounded-xl mb-8">
              <TabsTrigger value="presentation" className="rounded-lg">
                Présentation
              </TabsTrigger>
              <TabsTrigger value="structure" className="rounded-lg">
                Structure industrielle
              </TabsTrigger>
              <TabsTrigger value="products" className="rounded-lg">
                Produits
              </TabsTrigger>
              <TabsTrigger value="designers" className="rounded-lg">
                Designers
              </TabsTrigger>
              <TabsTrigger value="domains" className="rounded-lg">
                Domaines textile
              </TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg">
                Contact
              </TabsTrigger>
            </TabsList>

            {/* Présentation Tab */}
            <TabsContent value="presentation">
              <div className="grid md:grid-cols-2 gap-8">
                {/* About */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <h3 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    À propos
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.description}
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Année de création</p>
                        <p className="font-medium">{company.yearFounded}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Factory className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Unités de production</p>
                        <p className="font-medium">{company.totalProductionUnits}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Volume annuel</p>
                        <p className="font-medium">
                          {company.annualProductionVolume.toLocaleString()} unités
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Domains Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <h3 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Domaines d'expertise
                  </h3>
                  <div className="space-y-3">
                    {company.textileDomains.map((domain, index) => (
                      <motion.div
                        key={domain}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-primary/10 transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-primary" />
                        </div>
                        <span className="flex-1 font-medium">{domain}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Structure Tab */}
            <TabsContent value="structure">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {company.isMotherCompany && company.subCompanies.length > 0 ? (
                  <div className="space-y-6">
                    {/* Mother Company */}
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-semibold">
                            {company.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Société mère • {company.subCompanies.length} sous-sociétés
                          </p>
                        </div>
                      </div>

                      {/* Sub Companies */}
                      <Accordion type="multiple" className="space-y-4">
                        {company.subCompanies.map((subCompany) => (
                          <AccordionItem
                            key={subCompany.id}
                            value={subCompany.id}
                            className="border border-border rounded-xl px-4"
                          >
                            <AccordionTrigger className="hover:no-underline py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                  <Factory className="w-5 h-5 text-accent" />
                                </div>
                                <div className="text-left">
                                  <h4 className="font-semibold">{subCompany.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {subCompany.domain} • {subCompany.wilaya}
                                  </p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                              <div className="pl-14 space-y-4">
                                <p className="text-sm text-muted-foreground">
                                  {subCompany.productionUnits.length} unité(s) de
                                  production • {subCompany.productCount} produits
                                </p>

                                {/* Production Units */}
                                <div className="grid gap-3">
                                  {subCompany.productionUnits.map((unit) => (
                                    <div
                                      key={unit.id}
                                      className="bg-muted/50 rounded-xl p-4"
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <h5 className="font-medium">{unit.name}</h5>
                                        <Badge variant="secondary">
                                          {unit.monthlyCapacity.toLocaleString()}/mois
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-3">
                                        {unit.specialty} • {unit.location}
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {unit.machines.slice(0, 3).map((machine) => (
                                          <Badge
                                            key={machine}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {machine}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card rounded-2xl border border-border p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Factory className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Société indépendante
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Cette société opère de manière indépendante avec{' '}
                      {company.totalProductionUnits} unité(s) de production.
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-heading font-semibold">
                    Produits de {company.name}
                  </h3>
                  <Button variant="outline">
                    Voir tout
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-all"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                          Local
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-1 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {product.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          <Button size="sm" variant="ghost">
                            Détails
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Designers Tab */}
            <TabsContent value="designers">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {relatedDesigners.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedDesigners.map((designer, index) => (
                      <motion.div
                        key={designer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-2xl border border-border p-6 text-center group hover:shadow-lg transition-all"
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/10">
                          <img
                            src={designer.photo}
                            alt={designer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-semibold mb-1">{designer.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {designer.specialty}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                          {designer.bio}
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Voir profil
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-2xl border border-border p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Aucun designer partenaire
                    </h3>
                    <p className="text-muted-foreground">
                      Cette société n'a pas encore de designers partenaires référencés.
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Domains Tab */}
            <TabsContent value="domains">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {company.textileDomains.map((domain, index) => (
                  <motion.div
                    key={domain}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Layers className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{domain}</h4>
                    <p className="text-sm text-muted-foreground">
                      Voir les produits de ce domaine
                    </p>
                    <ArrowRight className="w-4 h-4 text-primary mt-3 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <div className="grid md:grid-cols-5 gap-8">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-2 bg-card rounded-2xl border border-border p-6"
                >
                  <h3 className="text-xl font-heading font-semibold mb-6">
                    Informations de contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Adresse</p>
                        <p className="font-medium">{company.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-medium">{company.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{company.email}</p>
                      </div>
                    </div>
                    {company.website && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Globe className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Site web</p>
                          <p className="font-medium">{company.website}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-3 bg-card rounded-2xl border border-border p-6"
                >
                  <h3 className="text-xl font-heading font-semibold mb-6">
                    Demande de collaboration
                  </h3>
                  {submitSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-accent" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">
                        Message envoyé !
                      </h4>
                      <p className="text-muted-foreground">
                        Nous reviendrons vers vous très bientôt.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            Nom complet
                          </label>
                          <Input
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, name: e.target.value })
                            }
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, email: e.target.value })
                            }
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Sujet
                        </label>
                        <Input
                          value={contactForm.subject}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, subject: e.target.value })
                          }
                          placeholder="Objet de votre demande"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Message
                        </label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, message: e.target.value })
                          }
                          placeholder="Décrivez votre projet ou demande..."
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          'Envoi en cours...'
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer la demande
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Similar Companies */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Sociétés similaires
              </h2>
              <p className="text-muted-foreground mt-1">
                Découvrez d'autres sociétés dans le même domaine
              </p>
            </div>
            <Link to="/societes-textiles">
              <Button variant="outline">
                Voir toutes
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          {/* Would show similar companies here */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TextileCompanyProfile;
