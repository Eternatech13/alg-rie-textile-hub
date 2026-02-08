import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Accueil', href: '/' },
      { label: 'Catégories', href: '/catalogue' },
      { label: 'Societe de Textile ', href: '/societes-textiles' },
      { label: 'À propos', href: '/a-propos' },
    ],
    sectors: [
      { label: 'Femme', href: '/categorie/femme' },
      { label: 'Homme', href: '/categorie/homme' },
      { label: 'Enfant', href: '/categorie/enfant' },
      { label: 'Professionnel', href: '/categorie/professionnel' },
    ],
    social: [
      { icon: Facebook, href: '#', label: 'Facebook' },
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-heading font-bold text-lg">S</span>
              </div>
              <span className="font-heading font-bold text-lg">Salaate Bladi</span>
            </div>
            <p className="text-white/70 text-xs mb-4 leading-relaxed">
              La marketplace textile #1 en Algérie. Valorisation du savoir-faire local.
            </p>
            <div className="flex gap-2">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Secteurs */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3">Secteurs</h3>
            <ul className="space-y-2">
              {footerLinks.sectors.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-white/70 text-xs">
                  Tlemcen,Algérie
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="tel:+213 555791587"
                  className="text-white/70 hover:text-white transition-colors text-xs"
                >
                  +213 555791587
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="mailto:contact@salaatebladi.dz"
                  className="text-white/70 hover:text-white transition-colors text-xs"
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
        <div className="section-container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/60 text-xs">
              © {currentYear} Salaate Bladi. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <a href="/mentions-legales" className="text-white/60 hover:text-white text-xs transition-colors">
                Mentions légales
              </a>
              <a href="/cgu" className="text-white/60 hover:text-white text-xs transition-colors">
                CGU
              </a>
              <a href="/confidentialite" className="text-white/60 hover:text-white text-xs transition-colors">
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
