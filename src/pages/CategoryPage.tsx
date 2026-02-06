import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockCategories, mockProducts } from '@/data/mockProducts';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = useMemo(() => {
    return mockCategories.find(c => c.slug === slug);
  }, [slug]);

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return mockProducts.filter(p => 
      p.category.toLowerCase() === category.name.toLowerCase()
    );
  }, [category]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="section-container py-32 text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            Catégorie non trouvée
          </h1>
          <Link to="/catalogue" className="text-primary hover:underline">
            Retour au catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
        </div>
        
        <div className="relative section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/catalogue" className="hover:text-white transition-colors">Catalogue</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{category.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-white/80 mb-6">
              {category.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                {category.productCount} produits disponibles
              </span>
              <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                {category.subcategories.length} sous-catégories
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="section-container section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8"
        >
          Explorez les sous-catégories
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.subcategories.map((subcategory, index) => {
            // Count products for this subcategory
            const subcategoryProducts = mockProducts.filter(p => 
              p.subcategory.toLowerCase() === subcategory.name.toLowerCase()
            );

            return (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/categorie/${slug}/${subcategory.slug}`}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 card-hover"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    {/* Placeholder image - in real app, each subcategory would have its own image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-3xl font-heading font-bold text-primary">
                          {subcategory.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
                        {subcategory.name}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {subcategoryProducts.length || Math.floor(Math.random() * 30) + 10} produits
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Products from Category */}
      {categoryProducts.length > 0 && (
        <section className="section-container pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Produits populaires
            </h2>
            <Link
              to={`/catalogue?category=${slug}`}
              className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/produit/${product.id}`}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 card-hover"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {product.featured && (
                      <span className="absolute top-4 left-4 badge-featured">
                        Vedette
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.supplier.name}</p>
                    <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="font-heading font-bold text-primary">
                      {new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD', minimumFractionDigits: 0 }).format(product.price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CategoryPage;
