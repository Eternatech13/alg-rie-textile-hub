export interface DesignerProfile {
  id: string;
  name: string;
  photo: string;
  coverImage?: string;
  bio: string;
  experience: string;
  inspirations: string;
  artisticStyle: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  stats: {
    designsPublished: number;
    productsSold: number;
    partnerCompanies: number;
    popularity: number;
  };
  featured: boolean;
  verified: boolean;
  joinedDate: string;
  location: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface Design {
  id: string;
  name: string;
  description: string;
  designerId: string;
  category: string;
  subcategory: string;
  images: string[];
  status: 'disponible' | 'exclusif' | 'sous_convention';
  partneredCompanyId?: string;
  partneredCompanyName?: string;
  popularity: number;
  orderCount: number;
  likes: number;
  isNew: boolean;
  createdAt: string;
  collection?: string;
  materials: string[];
  techniques: string[];
  colors: string[];
  targetAudience: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface DesignerReview {
  id: string;
  designerId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ConventionRequest {
  type: 'sallate_bladi' | 'direct';
  productionUnitId: string;
  designerPercentage: number;
  duration: string;
  isExclusive: boolean;
  productionVolume: string;
  notes: string;
}

export const mockDesignerProfiles: DesignerProfile[] = [
  {
    id: "des_001",
    name: "Amina Bouaziz",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
    bio: "Designer primée fusionnant l'artisanat kabyle avec les tendances contemporaines. Mon parcours a commencé dans les ateliers familiaux de Tizi Ouzou, où j'ai appris les secrets du tissage traditionnel.",
    experience: "15 ans d'expérience dans le textile traditionnel et moderne",
    inspirations: "Les motifs berbères ancestraux, la nature méditerranéenne, l'architecture mauresque",
    artisticStyle: "Fusion tradition-modernité avec une touche minimaliste",
    specialties: ["Mode traditionnelle", "Haute couture", "Textile artisanal", "Broderie kabyle"],
    rating: 4.8,
    reviewCount: 127,
    stats: {
      designsPublished: 48,
      productsSold: 1250,
      partnerCompanies: 8,
      popularity: 95
    },
    featured: true,
    verified: true,
    joinedDate: "2019-03-15",
    location: "Tizi Ouzou",
    socialLinks: {
      instagram: "@amina_design_dz",
      website: "www.aminabouaziz.dz"
    }
  },
  {
    id: "des_002",
    name: "Karim Benali",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=1200&h=400&fit=crop",
    bio: "Créateur de costumes et chemises sur mesure pour l'homme algérien moderne. Je crois que l'élégance masculine peut être à la fois traditionnelle et contemporaine.",
    experience: "12 ans dans la mode masculine haut de gamme",
    inspirations: "Le dandysme algérien, les coupes italiennes, le minimalisme japonais",
    artisticStyle: "Élégance masculine raffinée",
    specialties: ["Mode masculine", "Costumes sur mesure", "Chemises premium", "Tenues de cérémonie"],
    rating: 4.7,
    reviewCount: 89,
    stats: {
      designsPublished: 35,
      productsSold: 890,
      partnerCompanies: 5,
      popularity: 88
    },
    featured: true,
    verified: true,
    joinedDate: "2020-01-10",
    location: "Alger",
    socialLinks: {
      instagram: "@karim_benali_mode"
    }
  },
  {
    id: "des_003",
    name: "Yasmine Hadj",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=400&fit=crop",
    bio: "Pionnière de la mode durable en Algérie. Je travaille exclusivement avec des tissus locaux et des techniques artisanales pour créer une mode responsable et authentique.",
    experience: "10 ans en mode éthique et durable",
    inspirations: "L'écologie, les savoir-faire ancestraux, le zéro déchet",
    artisticStyle: "Mode éthique et épurée",
    specialties: ["Mode éthique", "Upcycling textile", "Slow fashion", "Tissus naturels"],
    rating: 4.9,
    reviewCount: 156,
    stats: {
      designsPublished: 62,
      productsSold: 1580,
      partnerCompanies: 12,
      popularity: 97
    },
    featured: true,
    verified: true,
    joinedDate: "2018-06-20",
    location: "Oran",
    socialLinks: {
      instagram: "@yasmine_eco_mode",
      facebook: "YasmineHadjDesign"
    }
  },
  {
    id: "des_004",
    name: "Omar Mesbah",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop",
    bio: "Fusion du street style avec les motifs traditionnels algériens. Je crée pour la jeunesse qui veut affirmer son identité avec fierté.",
    experience: "7 ans dans le streetwear et la mode urbaine",
    inspirations: "La culture hip-hop, le graffiti algérien, les motifs géométriques berbères",
    artisticStyle: "Streetwear identitaire",
    specialties: ["Streetwear", "Mode urbaine", "T-shirts graphiques", "Sneakers design"],
    rating: 4.6,
    reviewCount: 78,
    stats: {
      designsPublished: 42,
      productsSold: 720,
      partnerCompanies: 4,
      popularity: 82
    },
    featured: false,
    verified: true,
    joinedDate: "2021-02-14",
    location: "Constantine"
  },
  {
    id: "des_005",
    name: "Fatima Zeroual",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1200&h=400&fit=crop",
    bio: "Spécialiste des tenues professionnelles et uniformes d'entreprise. Je conçois des vêtements qui allient confort, durabilité et image de marque.",
    experience: "18 ans dans le textile professionnel",
    inspirations: "L'ergonomie, l'identité corporate, les uniformes militaires historiques",
    artisticStyle: "Professionnel et fonctionnel",
    specialties: ["Uniformes entreprise", "Textile professionnel", "Tenues médicales", "Workwear"],
    rating: 4.7,
    reviewCount: 95,
    stats: {
      designsPublished: 55,
      productsSold: 2100,
      partnerCompanies: 15,
      popularity: 90
    },
    featured: true,
    verified: true,
    joinedDate: "2017-09-01",
    location: "Blida"
  },
  {
    id: "des_006",
    name: "Rachid Amrani",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=1200&h=400&fit=crop",
    bio: "Designer spécialisé dans la mode enfant et les uniformes scolaires. Chaque création est pensée pour le confort et la sécurité des plus jeunes.",
    experience: "14 ans dans la mode enfant",
    inspirations: "Le monde de l'enfance, les couleurs vives, la praticité",
    artisticStyle: "Ludique et fonctionnel",
    specialties: ["Mode enfant", "Uniformes scolaires", "Vêtements bébé", "Textile anti-allergique"],
    rating: 4.8,
    reviewCount: 112,
    stats: {
      designsPublished: 68,
      productsSold: 3200,
      partnerCompanies: 10,
      popularity: 93
    },
    featured: true,
    verified: true,
    joinedDate: "2016-04-12",
    location: "Sétif"
  }
];

export const mockDesigns: Design[] = [
  {
    id: "design_001",
    name: "Robe Kabyle Printemps",
    description: "Robe traditionnelle kabyle réinterprétée avec des lignes modernes. Broderies faites main sur tissu coton premium.",
    designerId: "des_001",
    category: "Femme",
    subcategory: "Robes",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop"
    ],
    status: "disponible",
    popularity: 95,
    orderCount: 156,
    likes: 342,
    isNew: false,
    createdAt: "2024-01-15",
    collection: "Printemps 2024",
    materials: ["Coton bio", "Fil de soie"],
    techniques: ["Broderie main", "Couture traditionnelle"],
    colors: ["Blanc", "Bleu indigo", "Or"],
    targetAudience: ["Femme"],
    priceRange: { min: 12000, max: 18000 }
  },
  {
    id: "design_002",
    name: "Ensemble Berbère Moderne",
    description: "Ensemble deux pièces inspiré des motifs berbères avec une coupe contemporaine.",
    designerId: "des_001",
    category: "Femme",
    subcategory: "Ensembles",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop"
    ],
    status: "sous_convention",
    partneredCompanyId: "tc_001",
    partneredCompanyName: "Cotonnière d'Algérie",
    popularity: 88,
    orderCount: 89,
    likes: 256,
    isNew: false,
    createdAt: "2023-11-20",
    collection: "Automne 2023",
    materials: ["Lin algérien", "Coton"],
    techniques: ["Tissage jacquard", "Impression"],
    colors: ["Terracotta", "Beige", "Marron"],
    targetAudience: ["Femme"],
    priceRange: { min: 8500, max: 12000 }
  },
  {
    id: "design_003",
    name: "Costume Algérois Premium",
    description: "Costume trois pièces haute couture pour l'homme algérien moderne. Coupe italienne, finitions artisanales.",
    designerId: "des_002",
    category: "Homme",
    subcategory: "Costumes",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop"
    ],
    status: "disponible",
    popularity: 92,
    orderCount: 67,
    likes: 189,
    isNew: true,
    createdAt: "2024-02-01",
    collection: "Business 2024",
    materials: ["Laine mérinos", "Soie"],
    techniques: ["Couture haute gamme", "Doublure main"],
    colors: ["Noir", "Gris anthracite", "Bleu marine"],
    targetAudience: ["Homme"],
    priceRange: { min: 45000, max: 75000 }
  },
  {
    id: "design_004",
    name: "Chemise Lin Méditerranée",
    description: "Chemise en lin algérien avec col mandarin et broderie discrète sur le poignet.",
    designerId: "des_002",
    category: "Homme",
    subcategory: "Chemises",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop"
    ],
    status: "exclusif",
    partneredCompanyId: "tc_002",
    partneredCompanyName: "Élégance Textile",
    popularity: 85,
    orderCount: 234,
    likes: 445,
    isNew: false,
    createdAt: "2023-09-10",
    collection: "Été 2023",
    materials: ["Lin 100%"],
    techniques: ["Tissage artisanal"],
    colors: ["Blanc", "Bleu ciel", "Beige"],
    targetAudience: ["Homme"],
    priceRange: { min: 4500, max: 6500 }
  },
  {
    id: "design_005",
    name: "Robe Éco-Responsable",
    description: "Robe longue conçue à partir de chutes de tissus récupérés. Chaque pièce est unique.",
    designerId: "des_003",
    category: "Femme",
    subcategory: "Robes",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop"
    ],
    status: "disponible",
    popularity: 97,
    orderCount: 189,
    likes: 567,
    isNew: true,
    createdAt: "2024-01-28",
    collection: "Zero Waste 2024",
    materials: ["Tissus recyclés", "Coton bio"],
    techniques: ["Upcycling", "Patchwork"],
    colors: ["Multicolore", "Naturel"],
    targetAudience: ["Femme"],
    priceRange: { min: 9000, max: 15000 }
  },
  {
    id: "design_006",
    name: "Hoodie Amazigh",
    description: "Sweat à capuche avec motifs amazighs sérigraphiés. Coton bio certifié.",
    designerId: "des_004",
    category: "Mixte",
    subcategory: "Sweatshirts",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop"
    ],
    status: "disponible",
    popularity: 89,
    orderCount: 456,
    likes: 892,
    isNew: false,
    createdAt: "2023-12-05",
    collection: "Urban Roots",
    materials: ["Coton bio", "Polyester recyclé"],
    techniques: ["Sérigraphie", "Broderie machine"],
    colors: ["Noir", "Blanc", "Kaki"],
    targetAudience: ["Homme", "Femme"],
    priceRange: { min: 3500, max: 5500 }
  },
  {
    id: "design_007",
    name: "Uniforme Médical Confort+",
    description: "Blouse médicale ergonomique avec poches fonctionnelles et tissu antibactérien.",
    designerId: "des_005",
    category: "Professionnel",
    subcategory: "Médical",
    images: [
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&h=800&fit=crop"
    ],
    status: "sous_convention",
    partneredCompanyId: "tc_004",
    partneredCompanyName: "Textile Médical Algérie",
    popularity: 94,
    orderCount: 890,
    likes: 234,
    isNew: false,
    createdAt: "2023-06-15",
    collection: "Healthcare Pro",
    materials: ["Polyester technique", "Coton antibactérien"],
    techniques: ["Couture renforcée", "Traitement antimicrobien"],
    colors: ["Blanc", "Bleu chirurgical", "Vert"],
    targetAudience: ["Homme", "Femme"],
    priceRange: { min: 4000, max: 6000 }
  },
  {
    id: "design_008",
    name: "Ensemble Scolaire Premium",
    description: "Uniforme scolaire résistant et confortable pour les enfants. Tissu anti-taches.",
    designerId: "des_006",
    category: "Enfant",
    subcategory: "Uniformes",
    images: [
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&h=800&fit=crop"
    ],
    status: "sous_convention",
    partneredCompanyId: "tc_003",
    partneredCompanyName: "TextilEduc Algérie",
    popularity: 91,
    orderCount: 2340,
    likes: 156,
    isNew: false,
    createdAt: "2023-08-20",
    collection: "École 2023-2024",
    materials: ["Polycoton", "Gabardine"],
    techniques: ["Couture industrielle", "Traitement anti-taches"],
    colors: ["Bleu marine", "Gris", "Blanc"],
    targetAudience: ["Enfant"],
    priceRange: { min: 2800, max: 4500 }
  }
];

export const mockDesignerReviews: DesignerReview[] = [
  {
    id: "rev_001",
    designerId: "des_001",
    userId: "user_001",
    userName: "Samira B.",
    userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Travail exceptionnel ! La robe que j'ai commandée est magnifique, les broderies sont d'une finesse incroyable.",
    createdAt: "2024-01-20"
  },
  {
    id: "rev_002",
    designerId: "des_001",
    userId: "user_002",
    userName: "Nadia K.",
    userPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Amina a su parfaitement comprendre mes attentes. Le design est unique et de très haute qualité.",
    createdAt: "2024-01-15"
  },
  {
    id: "rev_003",
    designerId: "des_001",
    userId: "user_003",
    userName: "Fatima M.",
    userPhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    rating: 4,
    comment: "Belle création, livraison un peu longue mais le résultat en valait la peine.",
    createdAt: "2024-01-10"
  },
  {
    id: "rev_004",
    designerId: "des_002",
    userId: "user_004",
    userName: "Ahmed R.",
    userPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Mon costume de mariage était parfait ! Karim est un vrai professionnel.",
    createdAt: "2024-02-01"
  },
  {
    id: "rev_005",
    designerId: "des_003",
    userId: "user_005",
    userName: "Leila S.",
    userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    comment: "J'adore le concept éco-responsable. La robe est magnifique et je suis fière de porter du durable.",
    createdAt: "2024-01-25"
  }
];

export const getDesignerById = (id: string): DesignerProfile | undefined => {
  return mockDesignerProfiles.find(d => d.id === id);
};

export const getDesignsByDesignerId = (designerId: string): Design[] => {
  return mockDesigns.filter(d => d.designerId === designerId);
};

export const getDesignById = (id: string): Design | undefined => {
  return mockDesigns.find(d => d.id === id);
};

export const getDesignerReviews = (designerId: string): DesignerReview[] => {
  return mockDesignerReviews.filter(r => r.designerId === designerId);
};

export const formatDesignerJoinDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
};
