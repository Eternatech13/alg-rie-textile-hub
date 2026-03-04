export interface ClientOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'production' | 'shipped' | 'delivered' | 'cancelled';
  items: ClientOrderItem[];
  subtotal: number;
  deliveryCost: number;
  discount: number;
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  address: ClientAddress;
}

export interface ClientOrderItem {
  id: string;
  productName: string;
  productImage: string;
  designer: string;
  textileCompany: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ClientAddress {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  wilaya: string;
  postalCode: string;
  isDefault: boolean;
}

export interface ClientPayment {
  id: string;
  orderNumber: string;
  date: string;
  amount: number;
  method: 'full' | 'installment' | 'company';
  status: 'paid' | 'pending' | 'overdue';
  installmentDetails?: {
    totalAmount: number;
    monthlyAmount: number;
    paidMonths: number;
    totalMonths: number;
    nextDueDate: string;
  };
  companyName?: string;
}

export interface FavoriteItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  designer: string;
  price: number;
  originalPrice?: number;
  category: string;
  addedAt: string;
  inStock: boolean;
}

export interface ClientNotification {
  id: string;
  type: 'order' | 'payment' | 'promo' | 'system' | 'delivery';
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

// Mock Data
export const mockClientOrders: ClientOrder[] = [
  {
    id: 'ord_001',
    orderNumber: 'CMD-2026-0451',
    date: '2026-02-15',
    status: 'delivered',
    items: [
      { id: 'oi_001', productName: 'Robe Kabyle Moderne', productImage: '/placeholder.svg', designer: 'Amira Design', textileCompany: 'EATIT', size: 'M', color: 'Bleu', quantity: 1, unitPrice: 8500, totalPrice: 8500 },
      { id: 'oi_002', productName: 'Hijab Soie Naturelle', productImage: '/placeholder.svg', designer: 'Amira Design', textileCompany: 'EATIT', size: 'Unique', color: 'Beige', quantity: 2, unitPrice: 1800, totalPrice: 3600 },
    ],
    subtotal: 12100,
    deliveryCost: 500,
    discount: 0,
    total: 12600,
    deliveryMethod: 'Standard',
    paymentMethod: 'Paiement intégral',
    estimatedDelivery: '2026-02-22',
    trackingNumber: 'DZ-2026-78451',
    address: { id: 'addr_001', label: 'Maison', fullName: 'Mohamed B.', phone: '0555123456', address: '12 Rue Didouche Mourad', city: 'Alger Centre', wilaya: 'Alger', postalCode: '16000', isDefault: true },
  },
  {
    id: 'ord_002',
    orderNumber: 'CMD-2026-0489',
    date: '2026-02-28',
    status: 'shipped',
    items: [
      { id: 'oi_003', productName: 'Costume Homme Classique', productImage: '/placeholder.svg', designer: 'Karim Fashion', textileCompany: 'Texalg', size: 'L', color: 'Noir', quantity: 1, unitPrice: 12000, totalPrice: 12000 },
    ],
    subtotal: 12000,
    deliveryCost: 0,
    discount: 1200,
    total: 10800,
    deliveryMethod: 'Express',
    paymentMethod: 'Facilité paiement',
    estimatedDelivery: '2026-03-05',
    trackingNumber: 'DZ-2026-78502',
    address: { id: 'addr_001', label: 'Maison', fullName: 'Mohamed B.', phone: '0555123456', address: '12 Rue Didouche Mourad', city: 'Alger Centre', wilaya: 'Alger', postalCode: '16000', isDefault: true },
  },
  {
    id: 'ord_003',
    orderNumber: 'CMD-2026-0512',
    date: '2026-03-02',
    status: 'production',
    items: [
      { id: 'oi_004', productName: 'Uniforme Scolaire Premium', productImage: '/placeholder.svg', designer: 'École Design', textileCompany: 'Soitex', size: '12 ans', color: 'Bleu marine', quantity: 3, unitPrice: 3500, totalPrice: 10500 },
    ],
    subtotal: 10500,
    deliveryCost: 500,
    discount: 0,
    total: 11000,
    deliveryMethod: 'Standard',
    paymentMethod: 'Paiement société',
    estimatedDelivery: '2026-03-15',
    address: { id: 'addr_002', label: 'Bureau', fullName: 'Mohamed B.', phone: '0555123456', address: '45 Boulevard Amirouche', city: 'Tizi Ouzou', wilaya: 'Tizi Ouzou', postalCode: '15000', isDefault: false },
  },
  {
    id: 'ord_004',
    orderNumber: 'CMD-2026-0523',
    date: '2026-03-03',
    status: 'pending',
    items: [
      { id: 'oi_005', productName: 'Gandoura Festive', productImage: '/placeholder.svg', designer: 'Tradition DZ', textileCompany: 'COTITEX', size: 'XL', color: 'Blanc', quantity: 1, unitPrice: 6000, totalPrice: 6000 },
    ],
    subtotal: 6000,
    deliveryCost: 500,
    discount: 0,
    total: 6500,
    deliveryMethod: 'Standard',
    paymentMethod: 'Paiement intégral',
    estimatedDelivery: '2026-03-12',
    address: { id: 'addr_001', label: 'Maison', fullName: 'Mohamed B.', phone: '0555123456', address: '12 Rue Didouche Mourad', city: 'Alger Centre', wilaya: 'Alger', postalCode: '16000', isDefault: true },
  },
];

export const mockClientAddresses: ClientAddress[] = [
  { id: 'addr_001', label: 'Maison', fullName: 'Mohamed B.', phone: '0555123456', address: '12 Rue Didouche Mourad', city: 'Alger Centre', wilaya: 'Alger', postalCode: '16000', isDefault: true },
  { id: 'addr_002', label: 'Bureau', fullName: 'Mohamed B.', phone: '0555789012', address: '45 Boulevard Amirouche', city: 'Tizi Ouzou', wilaya: 'Tizi Ouzou', postalCode: '15000', isDefault: false },
];

export const mockClientPayments: ClientPayment[] = [
  { id: 'pay_001', orderNumber: 'CMD-2026-0451', date: '2026-02-15', amount: 12600, method: 'full', status: 'paid' },
  {
    id: 'pay_002', orderNumber: 'CMD-2026-0489', date: '2026-02-28', amount: 10800, method: 'installment', status: 'pending',
    installmentDetails: { totalAmount: 10800, monthlyAmount: 5000, paidMonths: 1, totalMonths: 3, nextDueDate: '2026-03-28' },
  },
  { id: 'pay_003', orderNumber: 'CMD-2026-0512', date: '2026-03-02', amount: 11000, method: 'company', status: 'paid', companyName: 'CHU Mustapha' },
  { id: 'pay_004', orderNumber: 'CMD-2026-0523', date: '2026-03-03', amount: 6500, method: 'full', status: 'pending' },
];

export const mockFavorites: FavoriteItem[] = [
  { id: 'fav_001', productId: 'prod_001', productName: 'Robe Kabyle Moderne', productImage: '/placeholder.svg', designer: 'Amira Design', price: 8500, category: 'Femme > Robes', addedAt: '2026-02-10', inStock: true },
  { id: 'fav_002', productId: 'prod_003', productName: 'Costume Trois Pièces', productImage: '/placeholder.svg', designer: 'Karim Fashion', price: 15000, originalPrice: 18000, category: 'Homme > Costumes', addedAt: '2026-02-20', inStock: true },
  { id: 'fav_003', productId: 'prod_005', productName: 'Karakou Algérois', productImage: '/placeholder.svg', designer: 'Tradition DZ', price: 25000, category: 'Femme > Traditionnel', addedAt: '2026-03-01', inStock: false },
  { id: 'fav_004', productId: 'prod_007', productName: 'Blouse Médicale Pro', productImage: '/placeholder.svg', designer: 'MedWear', price: 4500, category: 'Professionnel > Médical', addedAt: '2026-03-02', inStock: true },
];

export const mockClientNotifications: ClientNotification[] = [
  { id: 'cn_001', type: 'delivery', title: 'Commande expédiée', message: 'Votre commande CMD-2026-0489 a été expédiée. Numéro de suivi : DZ-2026-78502', date: '2026-03-03', read: false, link: '/mon-compte/commandes' },
  { id: 'cn_002', type: 'payment', title: 'Paiement reçu', message: 'Votre paiement de 12 600 DA pour la commande CMD-2026-0451 a été confirmé.', date: '2026-02-15', read: false, link: '/mon-compte/paiements' },
  { id: 'cn_003', type: 'payment', title: 'Échéance à venir', message: 'Rappel : votre prochaine mensualité de 5 000 DA est prévue le 28/03/2026.', date: '2026-03-01', read: false, link: '/mon-compte/paiements' },
  { id: 'cn_004', type: 'promo', title: 'Nouveautés printemps', message: 'Découvrez notre nouvelle collection printemps 2026 avec -10% sur votre première commande !', date: '2026-02-25', read: true },
  { id: 'cn_005', type: 'order', title: 'Commande confirmée', message: 'Votre commande CMD-2026-0512 est en cours de production.', date: '2026-03-02', read: true, link: '/mon-compte/commandes' },
  { id: 'cn_006', type: 'system', title: 'CCP en cours de validation', message: 'Votre numéro CCP est en cours de vérification. Vous serez notifié une fois validé.', date: '2026-02-10', read: true },
];
