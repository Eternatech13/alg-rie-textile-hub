// Types
export interface Design {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  images: string[];
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  suggestedPrice: number;
  createdAt: string;
  updatedAt: string;
  textileCompany?: string;
  conventionId?: string;
  salesCount: number;
  revenue: number;
}

export interface Convention {
  id: string;
  companyName: string;
  companyLogo: string;
  status: 'pending' | 'active' | 'completed' | 'rejected';
  percentage: number;
  productsCount: number;
  startDate: string;
  endDate?: string;
  totalRevenue: number;
  description: string;
}

export interface DesignerOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  designName: string;
  designImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  designerRevenue: number;
  status: 'pending' | 'production' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  textileCompany: string;
}

export interface RevenueEntry {
  id: string;
  month: string;
  year: number;
  amount: number;
  source: 'convention' | 'direct_sale';
  designName: string;
  conventionName?: string;
  status: 'pending' | 'paid';
  paidDate?: string;
}

export interface DesignerNotification {
  id: string;
  type: 'convention' | 'order' | 'design' | 'payment' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

export interface DesignerStats {
  totalDesigns: number;
  approvedDesigns: number;
  pendingDesigns: number;
  activeConventions: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
}

// Mock Data
export const mockDesigns: Design[] = [
  {
    id: 'design_001',
    name: 'Robe Kabyle Moderne',
    description: 'Robe traditionnelle kabyle revisitée avec des touches modernes',
    category: 'Femme',
    subcategory: 'Robes',
    images: ['/placeholder.svg'],
    status: 'approved',
    suggestedPrice: 8500,
    createdAt: '2025-12-01',
    updatedAt: '2025-12-15',
    textileCompany: 'EATIT Draâ Ben Khedda',
    conventionId: 'conv_001',
    salesCount: 45,
    revenue: 38250,
  },
  {
    id: 'design_002',
    name: 'Costume Homme Classique',
    description: 'Costume deux pièces en tissu algérien de haute qualité',
    category: 'Homme',
    subcategory: 'Costumes',
    images: ['/placeholder.svg'],
    status: 'approved',
    suggestedPrice: 12000,
    createdAt: '2025-11-15',
    updatedAt: '2025-12-01',
    textileCompany: 'Texalg Relizane',
    conventionId: 'conv_002',
    salesCount: 28,
    revenue: 33600,
  },
  {
    id: 'design_003',
    name: 'Uniforme Scolaire Premium',
    description: 'Uniforme scolaire confortable et durable pour enfants',
    category: 'Enfant',
    subcategory: 'Uniformes',
    images: ['/placeholder.svg'],
    status: 'pending',
    suggestedPrice: 3500,
    createdAt: '2026-01-10',
    updatedAt: '2026-01-10',
    salesCount: 0,
    revenue: 0,
  },
  {
    id: 'design_004',
    name: 'Blouse Médicale Ergonomique',
    description: 'Blouse médicale avec design ergonomique pour professionnels de santé',
    category: 'Professionnel',
    subcategory: 'Médical',
    images: ['/placeholder.svg'],
    status: 'draft',
    suggestedPrice: 4500,
    createdAt: '2026-02-01',
    updatedAt: '2026-02-20',
    salesCount: 0,
    revenue: 0,
  },
  {
    id: 'design_005',
    name: 'Gandoura Festive',
    description: 'Gandoura pour homme avec broderies traditionnelles',
    category: 'Homme',
    subcategory: 'Traditionnel',
    images: ['/placeholder.svg'],
    status: 'rejected',
    suggestedPrice: 6000,
    createdAt: '2025-10-20',
    updatedAt: '2025-11-05',
    salesCount: 0,
    revenue: 0,
  },
  {
    id: 'design_006',
    name: 'Hijab Collection Été',
    description: 'Collection de hijabs légers pour la saison estivale',
    category: 'Femme',
    subcategory: 'Accessoires',
    images: ['/placeholder.svg'],
    status: 'approved',
    suggestedPrice: 1800,
    createdAt: '2026-01-20',
    updatedAt: '2026-02-10',
    textileCompany: 'EATIT Draâ Ben Khedda',
    conventionId: 'conv_001',
    salesCount: 120,
    revenue: 21600,
  },
];

export const mockConventions: Convention[] = [
  {
    id: 'conv_001',
    companyName: 'EATIT Draâ Ben Khedda',
    companyLogo: '/placeholder.svg',
    status: 'active',
    percentage: 10,
    productsCount: 12,
    startDate: '2025-06-01',
    totalRevenue: 59850,
    description: 'Convention pour la production de vêtements traditionnels et modernes femme',
  },
  {
    id: 'conv_002',
    companyName: 'Texalg Relizane',
    companyLogo: '/placeholder.svg',
    status: 'active',
    percentage: 12,
    productsCount: 5,
    startDate: '2025-09-01',
    totalRevenue: 33600,
    description: 'Convention pour la production de costumes homme haut de gamme',
  },
  {
    id: 'conv_003',
    companyName: 'Soitex Bouira',
    companyLogo: '/placeholder.svg',
    status: 'pending',
    percentage: 8,
    productsCount: 0,
    startDate: '2026-03-01',
    totalRevenue: 0,
    description: 'Proposition de convention pour textile médical et professionnel',
  },
  {
    id: 'conv_004',
    companyName: 'COTITEX Tlemcen',
    companyLogo: '/placeholder.svg',
    status: 'completed',
    percentage: 15,
    productsCount: 8,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    totalRevenue: 45000,
    description: 'Convention annuelle pour textile traditionnel',
  },
];

export const mockDesignerOrders: DesignerOrder[] = [
  {
    id: 'dord_001',
    orderNumber: 'CMD-2026-0451',
    clientName: 'Amina B.',
    designName: 'Robe Kabyle Moderne',
    designImage: '/placeholder.svg',
    quantity: 2,
    unitPrice: 8500,
    totalPrice: 17000,
    designerRevenue: 1700,
    status: 'delivered',
    date: '2026-02-15',
    textileCompany: 'EATIT Draâ Ben Khedda',
  },
  {
    id: 'dord_002',
    orderNumber: 'CMD-2026-0467',
    clientName: 'Karim M.',
    designName: 'Costume Homme Classique',
    designImage: '/placeholder.svg',
    quantity: 1,
    unitPrice: 12000,
    totalPrice: 12000,
    designerRevenue: 1440,
    status: 'production',
    date: '2026-02-20',
    textileCompany: 'Texalg Relizane',
  },
  {
    id: 'dord_003',
    orderNumber: 'CMD-2026-0489',
    clientName: 'Fatima Z.',
    designName: 'Hijab Collection Été',
    designImage: '/placeholder.svg',
    quantity: 5,
    unitPrice: 1800,
    totalPrice: 9000,
    designerRevenue: 900,
    status: 'shipped',
    date: '2026-02-28',
    textileCompany: 'EATIT Draâ Ben Khedda',
  },
  {
    id: 'dord_004',
    orderNumber: 'CMD-2026-0502',
    clientName: 'Youcef L.',
    designName: 'Robe Kabyle Moderne',
    designImage: '/placeholder.svg',
    quantity: 1,
    unitPrice: 8500,
    totalPrice: 8500,
    designerRevenue: 850,
    status: 'pending',
    date: '2026-03-01',
    textileCompany: 'EATIT Draâ Ben Khedda',
  },
];

export const mockRevenueEntries: RevenueEntry[] = [
  { id: 'rev_001', month: 'Septembre', year: 2025, amount: 12500, source: 'convention', designName: 'Robe Kabyle Moderne', conventionName: 'EATIT Draâ Ben Khedda', status: 'paid', paidDate: '2025-10-05' },
  { id: 'rev_002', month: 'Octobre', year: 2025, amount: 18000, source: 'convention', designName: 'Costume Homme Classique', conventionName: 'Texalg Relizane', status: 'paid', paidDate: '2025-11-05' },
  { id: 'rev_003', month: 'Novembre', year: 2025, amount: 15200, source: 'convention', designName: 'Robe Kabyle Moderne', conventionName: 'EATIT Draâ Ben Khedda', status: 'paid', paidDate: '2025-12-05' },
  { id: 'rev_004', month: 'Décembre', year: 2025, amount: 22400, source: 'convention', designName: 'Hijab Collection Été', conventionName: 'EATIT Draâ Ben Khedda', status: 'paid', paidDate: '2026-01-05' },
  { id: 'rev_005', month: 'Janvier', year: 2026, amount: 19800, source: 'convention', designName: 'Costume Homme Classique', conventionName: 'Texalg Relizane', status: 'paid', paidDate: '2026-02-05' },
  { id: 'rev_006', month: 'Février', year: 2026, amount: 25600, source: 'convention', designName: 'Robe Kabyle Moderne', conventionName: 'EATIT Draâ Ben Khedda', status: 'pending' },
  { id: 'rev_007', month: 'Mars', year: 2026, amount: 4890, source: 'direct_sale', designName: 'Hijab Collection Été', status: 'pending' },
];

export const mockNotifications: DesignerNotification[] = [
  { id: 'notif_001', type: 'convention', title: 'Nouvelle convention proposée', message: 'Soitex Bouira souhaite établir une convention avec vous.', date: '2026-03-03', read: false, link: '/designer/conventions' },
  { id: 'notif_002', type: 'order', title: 'Nouvelle commande', message: 'CMD-2026-0502 — Robe Kabyle Moderne commandée par Youcef L.', date: '2026-03-01', read: false, link: '/designer/commandes' },
  { id: 'notif_003', type: 'payment', title: 'Paiement reçu', message: 'Votre paiement de 19 800 DA pour Janvier 2026 a été versé.', date: '2026-02-05', read: true, link: '/designer/revenus' },
  { id: 'notif_004', type: 'design', title: 'Design approuvé', message: 'Votre design "Hijab Collection Été" a été approuvé.', date: '2026-02-10', read: true, link: '/designer/designs' },
  { id: 'notif_005', type: 'design', title: 'Design rejeté', message: 'Votre design "Gandoura Festive" a été rejeté. Motif : qualité images insuffisante.', date: '2025-11-05', read: true, link: '/designer/designs' },
];

export const mockDesignerStats: DesignerStats = {
  totalDesigns: 6,
  approvedDesigns: 3,
  pendingDesigns: 1,
  activeConventions: 2,
  totalOrders: 4,
  totalRevenue: 118390,
  monthlyRevenue: 25600,
  pendingPayments: 30490,
};

export const mockMonthlyRevenue = [
  { month: 'Sep', revenue: 12500 },
  { month: 'Oct', revenue: 18000 },
  { month: 'Nov', revenue: 15200 },
  { month: 'Déc', revenue: 22400 },
  { month: 'Jan', revenue: 19800 },
  { month: 'Fév', revenue: 25600 },
  { month: 'Mar', revenue: 4890 },
];
