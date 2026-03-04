export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const mockReviews: ProductReview[] = [
  { id: 'rev_001', productId: 'prod_f001', userName: 'Amina K.', rating: 5, comment: 'Magnifique robe kabyle, les broderies sont superbes. Je recommande !', date: '2026-02-20', verified: true },
  { id: 'rev_002', productId: 'prod_f001', userName: 'Fatima Z.', rating: 4, comment: 'Très belle qualité, la taille correspond bien. Livraison rapide.', date: '2026-02-15', verified: true },
  { id: 'rev_003', productId: 'prod_f001', userName: 'Nadia B.', rating: 5, comment: 'Excellente qualité, tissu doux et confortable. Parfait pour les fêtes.', date: '2026-01-28', verified: true },
  { id: 'rev_004', productId: 'prod_h001', userName: 'Karim M.', rating: 5, comment: 'Chemise impeccable, coupe parfaite. Très satisfait.', date: '2026-02-18', verified: true },
  { id: 'rev_005', productId: 'prod_h001', userName: 'Yacine R.', rating: 4, comment: 'Bon rapport qualité-prix. Le coton est de bonne qualité.', date: '2026-02-10', verified: true },
  { id: 'rev_006', productId: 'prod_h004', userName: 'Omar S.', rating: 5, comment: 'Costume magnifique, coupe italienne. Parfait pour les occasions.', date: '2026-02-22', verified: true },
  { id: 'rev_007', productId: 'prod_f002', userName: 'Samira D.', rating: 4, comment: 'Robe légère et confortable, idéale pour l\'été. Les couleurs sont vives.', date: '2026-02-25', verified: true },
  { id: 'rev_008', productId: 'prod_e003', userName: 'Leila H.', rating: 5, comment: 'Ma fille adore ! Les couleurs sont superbes et le tissu est doux.', date: '2026-03-01', verified: true },
];

export const mockPromoCodes = [
  { code: 'BIENVENUE10', discount: 10, type: 'percent' as const, minAmount: 3000, maxUses: 1, description: '-10% sur votre première commande' },
  { code: 'ETE2026', discount: 15, type: 'percent' as const, minAmount: 5000, maxUses: 3, description: '-15% sur la collection été' },
  { code: 'LIVRAISON', discount: 500, type: 'fixed' as const, minAmount: 5000, maxUses: 2, description: 'Livraison offerte' },
];

export function getReviewsForProduct(productId: string) {
  return mockReviews.filter(r => r.productId === productId);
}

export function getAverageRating(productId: string) {
  const reviews = getReviewsForProduct(productId);
  if (reviews.length === 0) return { average: 0, count: 0 };
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { average: Math.round(avg * 10) / 10, count: reviews.length };
}
