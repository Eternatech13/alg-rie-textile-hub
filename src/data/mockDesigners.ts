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
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkC-UBFQE-TZjsTe5IaTeIqp-IpPAtXsz7w&s",
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
    coverImage: "https://media.istockphoto.com/id/1293366109/fr/photo/celui-ci-match-parfait-avec-moi.jpg?s=612x612&w=0&k=20&c=muf3m06ZGIH21taMsvQaGSrOlns7401f4Xx0Tm9PAq8=",
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
    coverImage: "https://i.pinimg.com/1200x/a9/d7/57/a9d7576167ef54c37b625636b6e13a51.jpg",
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
    coverImage: "https://i.pinimg.com/1200x/fc/91/8a/fc918ad6c979aa2cea78bf3cd39abe2f.jpg",
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
    coverImage: "https://i.pinimg.com/736x/dc/6b/7b/dc6b7b9cd7be30b4c71e165b585a0306.jpg",
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
    coverImage: "https://www.betterteam.com/images/fashion-designer-job-description-4628x3575-2020125.jpeg?crop=4:3,smart&width=1200&dpr=2&format=pjpg&auto=webp&quality=85",
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
      "https://tizi-ouzou.mta.gov.dz/wp-content/uploads/sites/62/2022/02/a8.jpg"
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
      "https://tizi-ouzou.mta.gov.dz/wp-content/uploads/sites/62/2022/02/a9.jpg"
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
    name: "Costume  Premium",
    description: "Costume trois pièces haute couture pour l'homme algérien moderne. Coupe italienne, finitions artisanales.",
    designerId: "des_002",
    category: "Homme",
    subcategory: "Costumes",
    images: [
      "https://jakamenalgerie.com/wp-content/uploads/2025/09/JK42SF02M062_028-370x444.jpg",
      
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd48N8dR7DSFTw4p1hIhKL0PcO5O457NJEdI4-ON52Xw&s",
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
    id: "design_0013",
    name: "Robe Marron",
    description: "Robe longue conçue à partir de chutes de tissus récupérés. Chaque pièce est unique.",
    designerId: "des_003",
    category: "Femme",
    subcategory: "Robes",
    images: [
      "https://i.pinimg.com/236x/ed/fa/68/edfa68168b1597ef45c2c104fca281a3.jpg",
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
    id: "design_0014",
    name: "Robe Noir",
    description: "Robe longue conçue à partir de chutes de tissus récupérés. Chaque pièce est unique.",
    designerId: "des_003",
    category: "Femme",
    subcategory: "Robes",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNR4Ed-MUzpICUYDzaFVYzlwqY6Y7NTCbK4A&s",
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
    id: "design_0014",
    name: "Robe Rose",
    description: "Robe longue conçue à partir de chutes de tissus récupérés. Chaque pièce est unique.",
    designerId: "des_003",
    category: "Femme",
    subcategory: "Robes",
    images: [
      "https://saruimagine.com/wp-content/uploads/2025/08/retouch_2025080411285378-768x1166.jpg",
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
    id: "design_005",
    name: "Robe",
    description: "Robe longue conçue à partir de chutes de tissus récupérés. Chaque pièce est unique.",
    designerId: "des_003",
    category: "Femme",
    subcategory: "Robes",
    images: [
      "https://media.modz.fr/pictures/2024/06-juin/6466705/modele3/robes-mi-longues-femme-jaune-joon-6466705_081.jpg",
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
      "https://the-luxury-affair.com/cdn/shop/files/untitled-249.jpg?v=1757332200&width=533"
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
    name: "Tenue de sécurité ",
    description: "Blouse médicale ergonomique avec poches fonctionnelles et tissu antibactérien.",
    designerId: "des_005",
    category: "Professionnel",
    subcategory: "Médical",
    images: [
      "https://oranprotection.com/wp-content/uploads/2024/07/Tenue-de-securite-Kaki-MADE-IN-BLADI.webp"
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
    id: "design_0010",
    name: "vêtements de travail ",
    description: "Blouse médicale ergonomique avec poches fonctionnelles et tissu antibactérien.",
    designerId: "des_005",
    category: "Professionnel",
    subcategory: "Médical",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQduz4vzxtsIc2OXgVlVdGjFLmL_ZKmhDwpjA&s"
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
    id: "design_0011",
    name: "tenue professionnelle haute visibilité",
    description: "Blouse médicale ergonomique avec poches fonctionnelles et tissu antibactérien.",
    designerId: "des_005",
    category: "Professionnel",
    subcategory: "Médical",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJgbQp62f5BT8_G3AG0Agnii7J4tmy7hbGw&s"
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
    id: "design_0012",
    name: "vêtements de travail ",
    description: "Blouse médicale ergonomique avec poches fonctionnelles et tissu antibactérien.",
    designerId: "des_005",
    category: "Professionnel",
    subcategory: "Médical",
    images: [
      "https://www.roidutablier.com/blog/wp-content/uploads/2015/06/combinaison-de-travail-en-coton.jpg"
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
    name: " t-shirts",
    description: "Uniforme scolaire résistant et confortable pour les enfants. Tissu anti-taches.",
    designerId: "des_006",
    category: "Enfant",
    subcategory: "Uniformes",
    images: [
      "https://media.canva.com/v2/mockup-template-rasterize/color0:171618/image0:s3%3A%2F%2Ftemplate.canva.com%2FEAGUeH0Sp8o%2F1%2F0%2F933w-69r3EbdGmF4.png/mockuptemplateid:FqXFzEXX7/size:L?csig=AAAAAAAAAAAAAAAAAAAAAEJmPo1pedRaQJIf-EFGrM5DHabkRhI1lI8nVkcA4m4_&exp=1770552743&osig=AAAAAAAAAAAAAAAAAAAAAOjntRd6w_O8r5Q4xnkllwe25GPOQOq6a_ZjJ-xT3s0I&seoslug=red-and-black-minimalist-rose-t-shirt&signer=marketplace-rpc",
      "data:image/jpeg;base64,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"
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
  },
  {
    id: "design_009",
    name: " t-shirts",
    description: "Uniforme scolaire résistant et confortable pour les enfants. Tissu anti-taches.",
    designerId: "des_006",
    category: "Enfant",
    subcategory: "Uniformes",
    images: [
      
      "data:image/jpeg;base64,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"
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
