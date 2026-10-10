import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CartItem, Food } from '@/types';

type CartValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (food: Food, qty?: number) => void;
  changeQty: (foodId: number, delta: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (food: Food, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.food.id === food.id);
      if (found) {
        return prev.map((i) => (i.food.id === food.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { food, qty }];
    });
  };

  const changeQty = (foodId: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.food.id === foodId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clear = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((sum, i) => sum + i.qty * i.food.price, 0),
      addItem,
      changeQty,
      clear,
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
