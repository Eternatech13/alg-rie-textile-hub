import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/mockProducts';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  designerName?: string;
}

export interface DeliveryOption {
  id: 'standard' | 'express' | 'pickup';
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export type PaymentOption = 'full' | 'installment' | 'company';

interface CartContextType {
  items: CartItem[];
  deliveryOption: DeliveryOption;
  paymentOption: PaymentOption;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryOption: (option: DeliveryOption) => void;
  setPaymentOption: (option: PaymentOption) => void;
  subtotal: number;
  deliveryCost: number;
  total: number;
  itemCount: number;
  monthlyPayment: number;
  installmentMonths: number;
  isEligibleForInstallment: boolean;
}

const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'standard', name: 'Livraison standard', description: 'Livraison à domicile', price: 500, estimatedDays: '5-7 jours' },
  { id: 'express', name: 'Livraison express', description: 'Livraison rapide', price: 1200, estimatedDays: '2-3 jours' },
  { id: 'pickup', name: 'Point relais', description: 'Retrait en point relais', price: 300, estimatedDays: '4-6 jours' },
];

const CART_STORAGE_KEY = 'sallate_bladi_cart';
const DELIVERY_STORAGE_KEY = 'sallate_bladi_delivery';
const PAYMENT_STORAGE_KEY = 'sallate_bladi_payment';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [deliveryOption, setDeliveryOptionState] = useState<DeliveryOption>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(DELIVERY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DELIVERY_OPTIONS[0];
    }
    return DELIVERY_OPTIONS[0];
  });

  const [paymentOption, setPaymentOptionState] = useState<PaymentOption>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PAYMENT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : 'full';
    }
    return 'full';
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(DELIVERY_STORAGE_KEY, JSON.stringify(deliveryOption));
  }, [deliveryOption]);

  useEffect(() => {
    localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(paymentOption));
  }, [paymentOption]);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    setItems(prev => {
      // Check if item already exists with same product, size, and color
      const existingIndex = prev.findIndex(
        i => i.productId === item.productId && i.size === item.size && i.color === item.color
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        return updated;
      }

      return [...prev, { ...item, id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPaymentOptionState('full');
  }, []);

  const setDeliveryOption = useCallback((option: DeliveryOption) => {
    setDeliveryOptionState(option);
  }, []);

  const setPaymentOption = useCallback((option: PaymentOption) => {
    setPaymentOptionState(option);
  }, []);

  // Computed values
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCost = items.length > 0 ? deliveryOption.price : 0;
  const total = subtotal + deliveryCost;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Payment facility calculations
  const MONTHLY_DEDUCTION = 5000;
  const MAX_INSTALLMENT_AMOUNT = 30000;
  const isEligibleForInstallment = total <= MAX_INSTALLMENT_AMOUNT && total > 0;
  const installmentMonths = Math.ceil(total / MONTHLY_DEDUCTION);
  const monthlyPayment = isEligibleForInstallment ? MONTHLY_DEDUCTION : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        deliveryOption,
        paymentOption,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setDeliveryOption,
        setPaymentOption,
        subtotal,
        deliveryCost,
        total,
        itemCount,
        monthlyPayment,
        installmentMonths,
        isEligibleForInstallment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { DELIVERY_OPTIONS };
