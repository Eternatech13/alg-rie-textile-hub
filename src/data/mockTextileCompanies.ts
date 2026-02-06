export interface ProductionUnit {
  id: string;
  name: string;
  domain: string;
  specialty: string;
  machines: string[];
  monthlyCapacity: number;
  location: string;
}

export interface SubCompany {
  id: string;
  name: string;
  domain: string;
  wilaya: string;
  productionUnits: ProductionUnit[];
  productCount: number;
}

export interface TextileCompany {
  id: string;
  name: string;
  type: 'public' | 'private';
  logo: string;
  coverImage: string;
  wilaya: string;
  address: string;
  description: string;
  yearFounded: number;
  verified: boolean;
  
  // Domains & Specialties
  textileDomains: string[];
  productTypes: string[];
  certifications: string[];
  
  // Industrial Structure
  isMotherCompany: boolean;
  subCompanies: SubCompany[];
  totalProductionUnits: number;
  annualProductionVolume: number;
  
  // Performance
  productCount: number;
  orderCount: number;
  designerPartnerCount: number;
  qualityRating: number;
  
  // Contact
  phone: string;
  email: string;
  website?: string;
  
  // Related entities
  designerIds: string[];
}

export const textileDomains = [
  'Textile traditionnel',
  'Textile moderne',
  'Textile médical',
  'Textile professionnel',
  'Textile sportif',
  'Textile scolaire',
  'Fabrication tissus',
  'Broderie artisanale',
  'Confection industrielle',
  'Textile technique',
];

export const productTypes = [
  'Vêtements femme',
  'Vêtements homme',
  'Vêtements enfant',
  'Uniformes professionnels',
  'Tissus bruts',
  'Accessoires textile',
  'Linge de maison',
  'Textile médical',
];

export const wilayas = [
  'Alger',
  'Oran',
  'Constantine',
  'Tizi Ouzou',
  'Annaba',
  'Sétif',
  'Blida',
  'Batna',
  'Béjaïa',
  'Tlemcen',
  'Biskra',
  'Djelfa',
];

export const mockTextileCompanies: TextileCompany[] = [
  {
    id: 'tc_001',
    name: 'Cotonnière d\'Algérie',
    type: 'public',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=400&fit=crop',
    wilaya: 'Alger',
    address: 'Zone Industrielle Rouiba, Alger',
    description: 'Leader national de la production de coton et tissus naturels depuis 1962. Notre expertise s\'étend sur plus de 60 ans dans le domaine textile algérien. Nous sommes fiers de fournir des matières premières de qualité supérieure aux industries textiles locales.',
    yearFounded: 1962,
    verified: true,
    textileDomains: ['Fabrication tissus', 'Textile technique', 'Confection industrielle'],
    productTypes: ['Tissus bruts', 'Vêtements homme', 'Vêtements femme'],
    certifications: ['ISO 9001', 'Certifiée Sallate Bladi', 'Production industrielle'],
    isMotherCompany: true,
    subCompanies: [
      {
        id: 'sc_001_1',
        name: 'Cotonnière Est',
        domain: 'Fabrication tissus',
        wilaya: 'Constantine',
        productionUnits: [
          {
            id: 'pu_001_1_1',
            name: 'Unité Filature Constantine',
            domain: 'Filature',
            specialty: 'Fils de coton',
            machines: ['Métiers à filer', 'Bobinoirs', 'Retordeuses'],
            monthlyCapacity: 50000,
            location: 'Zone Industrielle Palma',
          },
          {
            id: 'pu_001_1_2',
            name: 'Unité Tissage Constantine',
            domain: 'Tissage',
            specialty: 'Tissus coton',
            machines: ['Métiers à tisser', 'Ourdissoirs', 'Encolleuses'],
            monthlyCapacity: 35000,
            location: 'Zone Industrielle Palma',
          },
        ],
        productCount: 45,
      },
      {
        id: 'sc_001_2',
        name: 'Cotonnière Ouest',
        domain: 'Textile technique',
        wilaya: 'Oran',
        productionUnits: [
          {
            id: 'pu_001_2_1',
            name: 'Unité Technique Oran',
            domain: 'Textile technique',
            specialty: 'Tissus techniques',
            machines: ['Métiers techniques', 'Enduction', 'Laminage'],
            monthlyCapacity: 25000,
            location: 'Zone Industrielle Es-Senia',
          },
        ],
        productCount: 32,
      },
    ],
    totalProductionUnits: 3,
    annualProductionVolume: 1200000,
    productCount: 156,
    orderCount: 2340,
    designerPartnerCount: 12,
    qualityRating: 4.8,
    phone: '+213 21 54 78 90',
    email: 'contact@cotonniere-algerie.dz',
    website: 'www.cotonniere-algerie.dz',
    designerIds: ['des_001', 'des_003'],
  },
  {
    id: 'tc_002',
    name: 'Textile Industries Algeria',
    type: 'private',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop',
    wilaya: 'Oran',
    address: 'Zone Industrielle Es-Senia, Oran',
    description: 'Spécialiste des textiles techniques et uniformes professionnels. Notre entreprise fournit les secteurs médical, sécurité et hôtellerie avec des produits de haute qualité répondant aux normes internationales.',
    yearFounded: 1985,
    verified: true,
    textileDomains: ['Textile professionnel', 'Textile médical', 'Textile technique'],
    productTypes: ['Uniformes professionnels', 'Textile médical', 'Vêtements homme', 'Vêtements femme'],
    certifications: ['ISO 9001', 'ISO 14001', 'Certifiée Sallate Bladi', 'Production industrielle'],
    isMotherCompany: true,
    subCompanies: [
      {
        id: 'sc_002_1',
        name: 'TIA Medical',
        domain: 'Textile médical',
        wilaya: 'Oran',
        productionUnits: [
          {
            id: 'pu_002_1_1',
            name: 'Unité Confection Médicale',
            domain: 'Confection',
            specialty: 'Blouses et tuniques médicales',
            machines: ['Machines à coudre industrielles', 'Découpe laser', 'Broderie'],
            monthlyCapacity: 15000,
            location: 'Zone Industrielle Es-Senia',
          },
        ],
        productCount: 28,
      },
      {
        id: 'sc_002_2',
        name: 'TIA Sécurité',
        domain: 'Textile professionnel',
        wilaya: 'Alger',
        productionUnits: [
          {
            id: 'pu_002_2_1',
            name: 'Unité Confection Sécurité',
            domain: 'Confection',
            specialty: 'Tenues haute visibilité',
            machines: ['Machines à coudre', 'Application bandes réfléchissantes', 'Thermocollage'],
            monthlyCapacity: 12000,
            location: 'Zone Industrielle Rouiba',
          },
        ],
        productCount: 22,
      },
    ],
    totalProductionUnits: 2,
    annualProductionVolume: 450000,
    productCount: 89,
    orderCount: 1560,
    designerPartnerCount: 5,
    qualityRating: 4.6,
    phone: '+213 41 23 45 67',
    email: 'contact@tia.dz',
    website: 'www.tia.dz',
    designerIds: ['des_002'],
  },
  {
    id: 'tc_003',
    name: 'Atelier Tizi-Ouzou',
    type: 'private',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=400&fit=crop',
    wilaya: 'Tizi Ouzou',
    address: 'Centre Artisanal, Tizi Ouzou',
    description: 'Artisans spécialisés dans la préservation du savoir-faire kabyle. Nos créations allient tradition ancestrale et design contemporain, fabriquées entièrement à la main par des maîtres artisans.',
    yearFounded: 1978,
    verified: true,
    textileDomains: ['Textile traditionnel', 'Broderie artisanale'],
    productTypes: ['Vêtements femme', 'Accessoires textile'],
    certifications: ['Certifiée Sallate Bladi', 'Production artisanale', 'Label Patrimoine'],
    isMotherCompany: false,
    subCompanies: [],
    totalProductionUnits: 1,
    annualProductionVolume: 15000,
    productCount: 45,
    orderCount: 890,
    designerPartnerCount: 8,
    qualityRating: 4.9,
    phone: '+213 26 12 34 56',
    email: 'contact@atelier-tizi.dz',
    designerIds: ['des_001', 'des_003'],
  },
  {
    id: 'tc_004',
    name: 'TextilEduc Algérie',
    type: 'public',
    logo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=1200&h=400&fit=crop',
    wilaya: 'Constantine',
    address: 'Zone Industrielle El Khroub, Constantine',
    description: 'Fournisseur officiel des uniformes scolaires pour les établissements publics. Nous habillons des millions d\'élèves algériens avec des produits durables et confortables.',
    yearFounded: 1990,
    verified: true,
    textileDomains: ['Textile scolaire', 'Confection industrielle'],
    productTypes: ['Vêtements enfant', 'Uniformes professionnels'],
    certifications: ['ISO 9001', 'Certifiée Sallate Bladi', 'Production industrielle', 'Norme Éducation Nationale'],
    isMotherCompany: true,
    subCompanies: [
      {
        id: 'sc_004_1',
        name: 'TextilEduc Est',
        domain: 'Textile scolaire',
        wilaya: 'Constantine',
        productionUnits: [
          {
            id: 'pu_004_1_1',
            name: 'Unité Confection Uniformes',
            domain: 'Confection',
            specialty: 'Uniformes scolaires',
            machines: ['Chaîne de montage automatisée', 'Découpe automatique', 'Finition'],
            monthlyCapacity: 80000,
            location: 'Zone Industrielle El Khroub',
          },
        ],
        productCount: 34,
      },
      {
        id: 'sc_004_2',
        name: 'TextilEduc Centre',
        domain: 'Textile scolaire',
        wilaya: 'Alger',
        productionUnits: [
          {
            id: 'pu_004_2_1',
            name: 'Unité Distribution Centre',
            domain: 'Logistique',
            specialty: 'Distribution nationale',
            machines: ['Système tri automatique', 'Conditionnement'],
            monthlyCapacity: 100000,
            location: 'Zone Industrielle Rouiba',
          },
        ],
        productCount: 33,
      },
    ],
    totalProductionUnits: 2,
    annualProductionVolume: 2000000,
    productCount: 67,
    orderCount: 5600,
    designerPartnerCount: 3,
    qualityRating: 4.5,
    phone: '+213 31 78 90 12',
    email: 'contact@textileduc.dz',
    website: 'www.textileduc.dz',
    designerIds: [],
  },
  {
    id: 'tc_005',
    name: 'Élégance Textile',
    type: 'private',
    logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&h=400&fit=crop',
    wilaya: 'Alger',
    address: 'Quartier des Affaires, Alger Centre',
    description: 'Créateur de mode algérien alliant tradition et modernité. Notre maison propose des collections haut de gamme pour l\'homme et la femme contemporains.',
    yearFounded: 2005,
    verified: true,
    textileDomains: ['Textile moderne', 'Confection industrielle'],
    productTypes: ['Vêtements homme', 'Vêtements femme', 'Accessoires textile'],
    certifications: ['Certifiée Sallate Bladi', 'Label Qualité Premium'],
    isMotherCompany: false,
    subCompanies: [],
    totalProductionUnits: 1,
    annualProductionVolume: 45000,
    productCount: 78,
    orderCount: 1230,
    designerPartnerCount: 15,
    qualityRating: 4.7,
    phone: '+213 21 67 89 01',
    email: 'contact@elegance-textile.dz',
    website: 'www.elegance-textile.dz',
    designerIds: ['des_002', 'des_004'],
  },
  {
    id: 'tc_006',
    name: 'Maison Nour',
    type: 'private',
    logo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1200&h=400&fit=crop',
    wilaya: 'Annaba',
    address: 'Boulevard de l\'ALN, Annaba',
    description: 'Mode féminine moderne respectueuse des traditions. Spécialisée dans les abayas et hijabs élégants, nous proposons des créations uniques pour la femme musulmane moderne.',
    yearFounded: 2010,
    verified: true,
    textileDomains: ['Textile moderne', 'Textile traditionnel'],
    productTypes: ['Vêtements femme', 'Accessoires textile'],
    certifications: ['Certifiée Sallate Bladi', 'Production artisanale'],
    isMotherCompany: false,
    subCompanies: [],
    totalProductionUnits: 1,
    annualProductionVolume: 35000,
    productCount: 112,
    orderCount: 2100,
    designerPartnerCount: 6,
    qualityRating: 4.8,
    phone: '+213 38 45 67 89',
    email: 'contact@maison-nour.dz',
    website: 'www.maison-nour.dz',
    designerIds: ['des_001', 'des_003'],
  },
  {
    id: 'tc_007',
    name: 'Textile Sport Algérie',
    type: 'private',
    logo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=400&fit=crop',
    wilaya: 'Sétif',
    address: 'Zone Industrielle, Sétif',
    description: 'Leader dans la fabrication de vêtements sportifs et techniques. Nous équipons les clubs sportifs algériens et produisons des tenues de haute performance.',
    yearFounded: 1995,
    verified: true,
    textileDomains: ['Textile sportif', 'Textile technique'],
    productTypes: ['Vêtements homme', 'Vêtements femme', 'Vêtements enfant'],
    certifications: ['ISO 9001', 'Certifiée Sallate Bladi', 'Production industrielle'],
    isMotherCompany: true,
    subCompanies: [
      {
        id: 'sc_007_1',
        name: 'TSA Performance',
        domain: 'Textile sportif',
        wilaya: 'Sétif',
        productionUnits: [
          {
            id: 'pu_007_1_1',
            name: 'Unité Maillots',
            domain: 'Confection',
            specialty: 'Maillots sportifs',
            machines: ['Sublimation', 'Découpe numérique', 'Assemblage'],
            monthlyCapacity: 40000,
            location: 'Zone Industrielle Sétif',
          },
        ],
        productCount: 56,
      },
    ],
    totalProductionUnits: 1,
    annualProductionVolume: 500000,
    productCount: 95,
    orderCount: 1800,
    designerPartnerCount: 4,
    qualityRating: 4.6,
    phone: '+213 36 12 34 56',
    email: 'contact@tsa-sport.dz',
    website: 'www.tsa-sport.dz',
    designerIds: ['des_004'],
  },
  {
    id: 'tc_008',
    name: 'Tissages de Kabylie',
    type: 'private',
    logo: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=400&fit=crop',
    wilaya: 'Béjaïa',
    address: 'Village Artisanal, Béjaïa',
    description: 'Préservation et valorisation des tissages traditionnels kabyles. Nos artisans perpétuent un savoir-faire millénaire transmis de génération en génération.',
    yearFounded: 1965,
    verified: true,
    textileDomains: ['Textile traditionnel', 'Broderie artisanale', 'Fabrication tissus'],
    productTypes: ['Tissus bruts', 'Accessoires textile', 'Linge de maison'],
    certifications: ['Certifiée Sallate Bladi', 'Production artisanale', 'Label Patrimoine UNESCO'],
    isMotherCompany: false,
    subCompanies: [],
    totalProductionUnits: 1,
    annualProductionVolume: 8000,
    productCount: 38,
    orderCount: 650,
    designerPartnerCount: 10,
    qualityRating: 5.0,
    phone: '+213 34 56 78 90',
    email: 'contact@tissages-kabylie.dz',
    designerIds: ['des_001', 'des_003'],
  },
];

export const getCompanyById = (id: string): TextileCompany | undefined => {
  return mockTextileCompanies.find(company => company.id === id);
};

export const filterCompanies = (
  companies: TextileCompany[],
  filters: {
    search?: string;
    type?: 'public' | 'private' | 'all';
    domains?: string[];
    wilayas?: string[];
    productTypes?: string[];
    certifications?: string[];
    isMotherCompany?: boolean | null;
  }
): TextileCompany[] => {
  return companies.filter(company => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        company.name.toLowerCase().includes(searchLower) ||
        company.description.toLowerCase().includes(searchLower) ||
        company.textileDomains.some(d => d.toLowerCase().includes(searchLower)) ||
        company.wilaya.toLowerCase().includes(searchLower) ||
        company.productTypes.some(p => p.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Type filter
    if (filters.type && filters.type !== 'all' && company.type !== filters.type) {
      return false;
    }

    // Domains filter
    if (filters.domains && filters.domains.length > 0) {
      const hasMatchingDomain = filters.domains.some(d => 
        company.textileDomains.includes(d)
      );
      if (!hasMatchingDomain) return false;
    }

    // Wilayas filter
    if (filters.wilayas && filters.wilayas.length > 0) {
      if (!filters.wilayas.includes(company.wilaya)) return false;
    }

    // Product types filter
    if (filters.productTypes && filters.productTypes.length > 0) {
      const hasMatchingProductType = filters.productTypes.some(p => 
        company.productTypes.includes(p)
      );
      if (!hasMatchingProductType) return false;
    }

    // Structure filter
    if (filters.isMotherCompany !== null && filters.isMotherCompany !== undefined) {
      if (company.isMotherCompany !== filters.isMotherCompany) return false;
    }

    return true;
  });
};

export const getTextileCompanyById = (id: string): TextileCompany | undefined => {
  return mockTextileCompanies.find(company => company.id === id);
};
