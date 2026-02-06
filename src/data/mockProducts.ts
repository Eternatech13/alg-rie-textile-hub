export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  sector: string;
  price: number;
  currency: string;
  image: string;
  supplier: {
    id: string;
    name: string;
  };
  tags: string[];
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
  productCount: number;
}

export interface Supplier {
  id: string;
  name: string;
  type: 'public' | 'private';
  wilaya: string;
  specialty: string[];
  logo: string;
  description: string;
  verified: boolean;
  productCount: number;
}

export interface Designer {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  bio: string;
  collections: string[];
  featured: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "prod_001",
    name: "Tissu Coton Bio Premium",
    description: "Tissu 100% coton bio cultivé en Algérie, idéal pour confection de vêtements de qualité. Texture douce et respirante.",
    category: "Tissus",
    subcategory: "Coton",
    sector: "Textile habillement",
    price: 2500,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop",
    supplier: { id: "supp_001", name: "Cotonnière d'Algérie" },
    tags: ["bio", "premium", "local"],
    featured: true,
  },
  {
    id: "prod_002",
    name: "Ensemble Professionnel Médical",
    description: "Tenue médicale complète pour personnel hospitalier. Tissu antibactérien et confortable pour longues heures de travail.",
    category: "Professionnel",
    subcategory: "Tenue médicale",
    sector: "Textile professionnel",
    price: 4800,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=300&fit=crop",
    supplier: { id: "supp_002", name: "Textile Industries Algeria" },
    tags: ["médical", "antibactérien", "confort"],
    featured: true,
  },
  {
    id: "prod_003",
    name: "Robe Kabyle Traditionnelle Moderne",
    description: "Robe traditionnelle kabyle revisitée avec touches contemporaines. Broderies faites main par artisans locaux.",
    category: "Femme",
    subcategory: "Robes",
    sector: "Artisanat",
    price: 15000,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop",
    supplier: { id: "supp_003", name: "Atelier Tizi-Ouzou" },
    tags: ["traditionnel", "fait main", "kabyle"],
    featured: true,
  },
  {
    id: "prod_004",
    name: "Uniforme Scolaire Fille",
    description: "Uniforme scolaire pour fille, tissu résistant et facile d'entretien. Conforme aux normes éducatives nationales.",
    category: "Enfant",
    subcategory: "Uniformes scolaires",
    sector: "Textile scolaire",
    price: 3200,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400&h=300&fit=crop",
    supplier: { id: "supp_004", name: "TextilEduc Algérie" },
    tags: ["scolaire", "résistant", "fille"],
    featured: false,
  },
  {
    id: "prod_005",
    name: "Chemise Lin Homme Premium",
    description: "Chemise en lin algérien de haute qualité. Coupe moderne et élégante pour homme d'affaires.",
    category: "Homme",
    subcategory: "Chemises",
    sector: "Prêt-à-porter",
    price: 5500,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
    supplier: { id: "supp_005", name: "Élégance Textile" },
    tags: ["lin", "premium", "affaires"],
    featured: true,
  },
  {
    id: "prod_006",
    name: "Tissu Polyester Technique",
    description: "Tissu polyester haute performance pour vêtements de sport et tenues techniques. Séchage rapide et anti-transpiration.",
    category: "Tissus",
    subcategory: "Polyester",
    sector: "Textile technique",
    price: 1800,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    supplier: { id: "supp_001", name: "Cotonnière d'Algérie" },
    tags: ["technique", "sport", "performance"],
    featured: false,
  },
  {
    id: "prod_007",
    name: "Abaya Moderne Élégante",
    description: "Abaya contemporaine aux finitions soignées. Tissu fluide et léger, parfaite pour toutes occasions.",
    category: "Femme",
    subcategory: "Abaya",
    sector: "Mode femme",
    price: 8500,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&h=300&fit=crop",
    supplier: { id: "supp_006", name: "Maison Nour" },
    tags: ["abaya", "élégant", "moderne"],
    featured: true,
  },
  {
    id: "prod_008",
    name: "Tenue Sécurité Haute Visibilité",
    description: "Ensemble de sécurité avec bandes réfléchissantes. Conforme aux normes de sécurité algériennes et internationales.",
    category: "Professionnel",
    subcategory: "Tenue sécurité",
    sector: "Textile sécurité",
    price: 6200,
    currency: "DZD",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    supplier: { id: "supp_002", name: "Textile Industries Algeria" },
    tags: ["sécurité", "réfléchissant", "norme"],
    featured: false,
  },
];

export const mockCategories: Category[] = [
  {
    id: "cat_001",
    name: "Femme",
    slug: "femme",
    description: "Collection complète de vêtements féminins",
    icon: "User",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
    subcategories: [
      { id: "sub_001", name: "Robes", slug: "robes" },
      { id: "sub_002", name: "Ensembles", slug: "ensembles" },
      { id: "sub_003", name: "Abaya", slug: "abaya" },
      { id: "sub_004", name: "Tenue sport", slug: "tenue-sport" },
      { id: "sub_005", name: "Tenue professionnelle", slug: "tenue-pro" },
    ],
    productCount: 156,
  },
  {
    id: "cat_002",
    name: "Homme",
    slug: "homme",
    description: "Mode masculine élégante et moderne",
    icon: "User",
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&h=400&fit=crop",
    subcategories: [
      { id: "sub_006", name: "Chemises", slug: "chemises" },
      { id: "sub_007", name: "Ensembles", slug: "ensembles" },
      { id: "sub_008", name: "Tenue traditionnelle", slug: "traditionnel" },
      { id: "sub_009", name: "Tenue sport", slug: "sport" },
    ],
    productCount: 124,
  },
  {
    id: "cat_003",
    name: "Enfant",
    slug: "enfant",
    description: "Vêtements pour les plus jeunes",
    icon: "Baby",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&h=400&fit=crop",
    subcategories: [
      { id: "sub_010", name: "Bébé", slug: "bebe" },
      { id: "sub_011", name: "Fille", slug: "fille" },
      { id: "sub_012", name: "Garçon", slug: "garcon" },
      { id: "sub_013", name: "Uniformes scolaires", slug: "uniforme" },
    ],
    productCount: 98,
  },
  {
    id: "cat_004",
    name: "Professionnel",
    slug: "professionnel",
    description: "Tenues pour tous les secteurs professionnels",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    subcategories: [
      { id: "sub_014", name: "Tenue médicale", slug: "medical" },
      { id: "sub_015", name: "Uniforme entreprise", slug: "entreprise" },
      { id: "sub_016", name: "Tenue sécurité", slug: "securite" },
      { id: "sub_017", name: "Tenue hôtellerie", slug: "hotellerie" },
    ],
    productCount: 87,
  },
  {
    id: "cat_005",
    name: "Tissus",
    slug: "tissus",
    description: "Matières premières textiles de qualité",
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop",
    subcategories: [
      { id: "sub_018", name: "Coton", slug: "coton" },
      { id: "sub_019", name: "Polyester", slug: "polyester" },
      { id: "sub_020", name: "Jeans", slug: "jeans" },
      { id: "sub_021", name: "Textile médical", slug: "textile-medical" },
      { id: "sub_022", name: "Textile traditionnel", slug: "traditionnel" },
    ],
    productCount: 203,
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: "supp_001",
    name: "Cotonnière d'Algérie",
    type: "public",
    wilaya: "Alger",
    specialty: ["Coton", "Lin", "Tissus naturels"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
    description: "Leader national de la production de coton et tissus naturels depuis 1962.",
    verified: true,
    productCount: 156,
  },
  {
    id: "supp_002",
    name: "Textile Industries Algeria",
    type: "private",
    wilaya: "Oran",
    specialty: ["Textile technique", "Vêtements professionnels"],
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
    description: "Spécialiste des textiles techniques et uniformes professionnels.",
    verified: true,
    productCount: 89,
  },
  {
    id: "supp_003",
    name: "Atelier Tizi-Ouzou",
    type: "private",
    wilaya: "Tizi Ouzou",
    specialty: ["Artisanat", "Textile traditionnel", "Broderie"],
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    description: "Artisans spécialisés dans la préservation du savoir-faire kabyle.",
    verified: true,
    productCount: 45,
  },
  {
    id: "supp_004",
    name: "TextilEduc Algérie",
    type: "public",
    wilaya: "Constantine",
    specialty: ["Uniformes scolaires", "Textile enfant"],
    logo: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=200&fit=crop",
    description: "Fournisseur officiel des uniformes scolaires pour les établissements publics.",
    verified: true,
    productCount: 67,
  },
  {
    id: "supp_005",
    name: "Élégance Textile",
    type: "private",
    wilaya: "Alger",
    specialty: ["Prêt-à-porter", "Mode haut de gamme"],
    logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop",
    description: "Créateur de mode algérien alliant tradition et modernité.",
    verified: true,
    productCount: 78,
  },
  {
    id: "supp_006",
    name: "Maison Nour",
    type: "private",
    wilaya: "Annaba",
    specialty: ["Mode femme", "Abaya", "Hijab"],
    logo: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&h=200&fit=crop",
    description: "Mode féminine moderne respectueuse des traditions.",
    verified: true,
    productCount: 112,
  },
];

export const mockDesigners: Designer[] = [
  {
    id: "des_001",
    name: "Amina Bouaziz",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    specialty: "Textile traditionnel moderne",
    bio: "Designer primée fusionnant l'artisanat kabyle avec les tendances contemporaines.",
    collections: ["col_001", "col_002"],
    featured: true,
  },
  {
    id: "des_002",
    name: "Karim Benali",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    specialty: "Mode masculine",
    bio: "Créateur de costumes et chemises sur mesure pour l'homme algérien moderne.",
    collections: ["col_003"],
    featured: true,
  },
  {
    id: "des_003",
    name: "Yasmine Hadj",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    specialty: "Mode éthique",
    bio: "Pionnière de la mode durable en Algérie, utilisant exclusivement des tissus locaux.",
    collections: ["col_004", "col_005"],
    featured: true,
  },
  {
    id: "des_004",
    name: "Omar Mesbah",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    specialty: "Streetwear algérien",
    bio: "Fusion du street style avec les motifs traditionnels algériens.",
    collections: ["col_006"],
    featured: false,
  },
];

export const formatPrice = (price: number, currency: string = "DZD"): string => {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
};
