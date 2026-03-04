// Mock Admin Data

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ccpNumber: string;
  ccpValidated: boolean;
  isIndependent: boolean;
  partnerCompany?: string;
  createdAt: string;
  status: 'active' | 'suspended';
  ordersCount: number;
  totalSpent: number;
}

export interface AdminDesigner {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  appliedAt: string;
  approvedAt?: string;
  collectionsCount: number;
  revenue: number;
  portfolio: string;
}

export interface AdminTextileCompany {
  id: string;
  name: string;
  type: 'public' | 'private';
  wilaya: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  appliedAt: string;
  approvedAt?: string;
  productsCount: number;
  capacity: string;
  certifications: string[];
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  clientEmail: string;
  date: string;
  status: 'pending' | 'confirmed' | 'production' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  itemsCount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'overdue' | 'refunded';
}

export interface AdminPayment {
  id: string;
  orderNumber: string;
  clientName: string;
  date: string;
  amount: number;
  method: 'full' | 'installment' | 'company';
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  companyName?: string;
  installmentInfo?: string;
}

export interface AdminPromoCode {
  id: string;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  minAmount: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface AdminReview {
  id: string;
  productName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  reported: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  target: 'all' | 'clients' | 'designers' | 'companies';
  sentAt: string;
  readCount: number;
  totalCount: number;
}

// KPIs
export const adminKPIs = {
  totalRevenue: 4850000,
  revenueGrowth: 12.5,
  totalOrders: 342,
  ordersGrowth: 8.3,
  totalUsers: 1254,
  usersGrowth: 15.2,
  activeProducts: 186,
  productsGrowth: 5.7,
  pendingCCP: 12,
  pendingDesigners: 3,
  pendingCompanies: 2,
  overduePayments: 5,
};

export const revenueByMonth = [
  { month: 'Sep', revenue: 320000 },
  { month: 'Oct', revenue: 380000 },
  { month: 'Nov', revenue: 420000 },
  { month: 'Déc', revenue: 510000 },
  { month: 'Jan', revenue: 480000 },
  { month: 'Fév', revenue: 560000 },
  { month: 'Mar', revenue: 620000 },
];

export const ordersByCategory = [
  { category: 'Femme', count: 145 },
  { category: 'Homme', count: 98 },
  { category: 'Enfant', count: 56 },
  { category: 'Professionnel', count: 43 },
];

export const mockAdminUsers: AdminUser[] = [
  { id: 'u1', firstName: 'Mohamed', lastName: 'Benali', email: 'mohamed.b@email.com', phone: '0555123456', ccpNumber: '0012345678', ccpValidated: true, isIndependent: true, createdAt: '2026-01-15', status: 'active', ordersCount: 5, totalSpent: 45600 },
  { id: 'u2', firstName: 'Amina', lastName: 'Kaci', email: 'amina.k@email.com', phone: '0555789012', ccpNumber: '0023456789', ccpValidated: false, isIndependent: false, partnerCompany: 'CHU Mustapha', createdAt: '2026-02-01', status: 'active', ordersCount: 2, totalSpent: 18000 },
  { id: 'u3', firstName: 'Yacine', lastName: 'Rahmani', email: 'yacine.r@email.com', phone: '0555345678', ccpNumber: '0034567890', ccpValidated: false, isIndependent: true, createdAt: '2026-02-20', status: 'active', ordersCount: 0, totalSpent: 0 },
  { id: 'u4', firstName: 'Fatima', lastName: 'Zohra', email: 'fatima.z@email.com', phone: '0555456789', ccpNumber: '0045678901', ccpValidated: true, isIndependent: false, partnerCompany: 'SONELGAZ', createdAt: '2026-01-28', status: 'suspended', ordersCount: 8, totalSpent: 72000 },
  { id: 'u5', firstName: 'Karim', lastName: 'Messaoudi', email: 'karim.m@email.com', phone: '0555567890', ccpNumber: '0056789012', ccpValidated: true, isIndependent: true, createdAt: '2026-02-10', status: 'active', ordersCount: 3, totalSpent: 28500 },
];

export const mockAdminDesigners: AdminDesigner[] = [
  { id: 'd1', name: 'Amira Design', email: 'amira@design.dz', phone: '0555111222', specialty: 'Mode féminine traditionnelle', status: 'approved', appliedAt: '2025-12-01', approvedAt: '2025-12-15', collectionsCount: 4, revenue: 850000, portfolio: 'https://example.com' },
  { id: 'd2', name: 'Karim Fashion', email: 'karim@fashion.dz', phone: '0555222333', specialty: 'Mode homme élégante', status: 'approved', appliedAt: '2026-01-05', approvedAt: '2026-01-12', collectionsCount: 3, revenue: 620000, portfolio: 'https://example.com' },
  { id: 'd3', name: 'Nour Création', email: 'nour@creation.dz', phone: '0555333444', specialty: 'Mode enfant', status: 'pending', appliedAt: '2026-02-28', collectionsCount: 0, revenue: 0, portfolio: 'https://example.com' },
  { id: 'd4', name: 'Atlas Mode', email: 'atlas@mode.dz', phone: '0555444555', specialty: 'Tenues professionnelles', status: 'pending', appliedAt: '2026-03-01', collectionsCount: 0, revenue: 0, portfolio: 'https://example.com' },
  { id: 'd5', name: 'Sahara Couture', email: 'sahara@couture.dz', phone: '0555555666', specialty: 'Mode traditionnelle', status: 'rejected', appliedAt: '2026-02-15', collectionsCount: 0, revenue: 0, portfolio: 'https://example.com' },
];

export const mockAdminCompanies: AdminTextileCompany[] = [
  { id: 'tc1', name: 'EATIT', type: 'public', wilaya: 'Alger', email: 'contact@eatit.dz', phone: '021123456', status: 'approved', appliedAt: '2025-11-01', approvedAt: '2025-11-20', productsCount: 45, capacity: '50,000 pièces/mois', certifications: ['ISO 9001', 'OEKO-TEX'] },
  { id: 'tc2', name: 'Texalg', type: 'private', wilaya: 'Oran', email: 'info@texalg.dz', phone: '041234567', status: 'approved', appliedAt: '2025-12-10', approvedAt: '2026-01-05', productsCount: 32, capacity: '30,000 pièces/mois', certifications: ['ISO 9001'] },
  { id: 'tc3', name: 'Fil d\'Or', type: 'private', wilaya: 'Constantine', email: 'contact@fildor.dz', phone: '031345678', status: 'pending', appliedAt: '2026-02-25', productsCount: 0, capacity: '15,000 pièces/mois', certifications: [] },
  { id: 'tc4', name: 'SOITEX', type: 'public', wilaya: 'M\'sila', email: 'soitex@soitex.dz', phone: '035456789', status: 'pending', appliedAt: '2026-03-02', productsCount: 0, capacity: '40,000 pièces/mois', certifications: ['ISO 9001', 'ISO 14001'] },
];

export const mockAdminOrders: AdminOrder[] = [
  { id: 'ao1', orderNumber: 'CMD-2026-0451', clientName: 'Mohamed Benali', clientEmail: 'mohamed.b@email.com', date: '2026-02-15', status: 'delivered', total: 12600, itemsCount: 3, paymentMethod: 'Intégral', paymentStatus: 'paid' },
  { id: 'ao2', orderNumber: 'CMD-2026-0489', clientName: 'Amina Kaci', clientEmail: 'amina.k@email.com', date: '2026-02-28', status: 'shipped', total: 10800, itemsCount: 1, paymentMethod: 'Facilité', paymentStatus: 'pending' },
  { id: 'ao3', orderNumber: 'CMD-2026-0512', clientName: 'Karim Messaoudi', clientEmail: 'karim.m@email.com', date: '2026-03-02', status: 'production', total: 11000, itemsCount: 3, paymentMethod: 'Société', paymentStatus: 'paid' },
  { id: 'ao4', orderNumber: 'CMD-2026-0523', clientName: 'Fatima Zohra', clientEmail: 'fatima.z@email.com', date: '2026-03-03', status: 'pending', total: 6500, itemsCount: 1, paymentMethod: 'Intégral', paymentStatus: 'pending' },
  { id: 'ao5', orderNumber: 'CMD-2026-0530', clientName: 'Yacine Rahmani', clientEmail: 'yacine.r@email.com', date: '2026-03-04', status: 'confirmed', total: 8200, itemsCount: 2, paymentMethod: 'Facilité', paymentStatus: 'pending' },
];

export const mockAdminPayments: AdminPayment[] = [
  { id: 'ap1', orderNumber: 'CMD-2026-0451', clientName: 'Mohamed Benali', date: '2026-02-15', amount: 12600, method: 'full', status: 'paid' },
  { id: 'ap2', orderNumber: 'CMD-2026-0489', clientName: 'Amina Kaci', date: '2026-02-28', amount: 10800, method: 'installment', status: 'pending', installmentInfo: '1/3 payé - 5000 DA/mois' },
  { id: 'ap3', orderNumber: 'CMD-2026-0512', clientName: 'Karim Messaoudi', date: '2026-03-02', amount: 11000, method: 'company', status: 'paid', companyName: 'CHU Mustapha' },
  { id: 'ap4', orderNumber: 'CMD-2026-0523', clientName: 'Fatima Zohra', date: '2026-03-03', amount: 6500, method: 'full', status: 'pending' },
  { id: 'ap5', orderNumber: 'CMD-2026-0402', clientName: 'Nadia B.', date: '2026-01-28', amount: 8000, method: 'installment', status: 'overdue', installmentInfo: '2/4 payé - en retard' },
];

export const mockAdminPromoCodes: AdminPromoCode[] = [
  { id: 'pc1', code: 'BIENVENUE10', discount: 10, type: 'percent', minAmount: 3000, maxUses: 500, usedCount: 234, startDate: '2026-01-01', endDate: '2026-06-30', isActive: true },
  { id: 'pc2', code: 'ETE2026', discount: 15, type: 'percent', minAmount: 5000, maxUses: 200, usedCount: 45, startDate: '2026-03-01', endDate: '2026-08-31', isActive: true },
  { id: 'pc3', code: 'LIVRAISON', discount: 500, type: 'fixed', minAmount: 5000, maxUses: 300, usedCount: 120, startDate: '2026-01-01', endDate: '2026-12-31', isActive: true },
  { id: 'pc4', code: 'HIVER25', discount: 25, type: 'percent', minAmount: 8000, maxUses: 100, usedCount: 100, startDate: '2025-11-01', endDate: '2026-02-28', isActive: false },
];

export const mockAdminReviews: AdminReview[] = [
  { id: 'ar1', productName: 'Robe Kabyle Traditionnelle', userName: 'Amina K.', rating: 5, comment: 'Magnifique robe, les broderies sont superbes !', date: '2026-02-20', status: 'approved', reported: false },
  { id: 'ar2', productName: 'Chemise Blanche Classique', userName: 'Karim M.', rating: 4, comment: 'Bon rapport qualité-prix.', date: '2026-02-18', status: 'approved', reported: false },
  { id: 'ar3', productName: 'Ensemble Sport Homme', userName: 'Anonyme', rating: 1, comment: 'Contenu inapproprié signalé...', date: '2026-03-01', status: 'pending', reported: true },
  { id: 'ar4', productName: 'Abaya Noire Classique', userName: 'Fatima Z.', rating: 5, comment: 'Excellent tissu fluide.', date: '2026-03-02', status: 'pending', reported: false },
];

export const mockAdminNotifications: AdminNotification[] = [
  { id: 'an1', title: 'Soldes de printemps', message: 'Profitez de -20% sur toute la collection printemps !', target: 'all', sentAt: '2026-03-01', readCount: 856, totalCount: 1254 },
  { id: 'an2', title: 'Mise à jour conditions', message: 'Les conditions générales ont été mises à jour.', target: 'clients', sentAt: '2026-02-15', readCount: 432, totalCount: 980 },
  { id: 'an3', title: 'Nouveau module revenus', message: 'Consultez vos revenus détaillés dans votre espace.', target: 'designers', sentAt: '2026-02-20', readCount: 12, totalCount: 15 },
];
