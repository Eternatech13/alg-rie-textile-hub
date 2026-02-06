import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Accueil', href: '/' },
      { label: 'Catégories', href: '/categories' },
      { label: 'Fournisseurs', href: '/fournisseurs' },
      { label: 'À propos', href: '/a-propos' },
    ],
    sectors: [
      { label: 'Habillement', href: '/categories/habillement' },
      { label: 'Professionnel', href: '/categories/professionnel' },
      { label: 'Décoration', href: '/categories/decoration' },
      { label: 'Artisanat', href: '/categories/artisanat' },
    ],
    social: [
      { icon: Facebook, href: '#', label: 'Facebook' },
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-heading font-bold text-xl">S</span>
              </div>
              <span className="font-heading font-bold text-xl">Salaate Bladi</span>
            </div>
            <p className="text-white/70 text-sm mb-6">
              La marketplace textile #1 en Algérie. Valorisation du savoir-faire local et connexion entre producteurs et acheteurs.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Secteurs */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Secteurs</h3>
            <ul className="space-y-3">
              {footerLinks.sectors.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  123 Rue Didouche Mourad, Alger Centre, Algérie
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a
                  href="tel:+213555123456"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  +213 555 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a
                  href="mailto:contact@salaatebladi.dz"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  contact@salaatebladi.dz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Salaate Bladi. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a href="/mentions-legales" className="text-white/60 hover:text-white text-sm transition-colors">
                Mentions légales
              </a>
              <a href="/cgu" className="text-white/60 hover:text-white text-sm transition-colors">
                CGU
              </a>
              <a href="/confidentialite" className="text-white/60 hover:text-white text-sm transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
