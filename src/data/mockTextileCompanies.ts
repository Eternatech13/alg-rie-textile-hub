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
    name: 'TEXALG',
    type: 'public',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DuqaoXSIlFiR8A9VIBfOVrtPB4Ae7yl1rg&s',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWlXTIc5s6xQP1VZ43ReXx3sfYVQ6MQXAqaA&s',
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
        name: 'ELCOVEL',
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
        name: 'SOTEXHAM',
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
    totalProductionUnits: 11,
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
    name: 'C&H',
    type: 'public',
    logo: 'data:image/jpeg;base64,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',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbY7oyFoe8ZsHEd2vVC1I148ZeePwyxfFYDA&s',
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
    totalProductionUnits: 11,
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
    name: 'TDA',
    type: 'private',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjjUBUMpKZ_oxUrezpBc7pSmwtBfwSztjVnw&s',
    coverImage: 'https://flockyou.fr/wp-content/uploads/blog/towel-1838210_1920-1024x683.jpg',
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
    totalProductionUnits: 6,
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
    name: 'ACED',
    type: 'public',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3uHq516V5J7MuhX8HzBCrBZzAOFJsaU9RgA&s',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC0iJsznV1EoOMQlACTcJTB1f3L4u7uCksyw&s',
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
    totalProductionUnits: 6,
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
    name: 'LEATHER INDUSTRY ',
    type: 'private',
    logo: 'data:image/jpeg;base64,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',
    coverImage: 'data:image/jpeg;base64,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',
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
