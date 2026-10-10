import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Order } from '@/types';

type OrdersValue = {
  placedOrders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
};

const OrdersContext = createContext<OrdersValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);

  // New orders go first so the newest shows at the top. The id is a simple counter.
  const addOrder = (order: Omit<Order, 'id'>) => {
    setPlacedOrders((prev) => [{ ...order, id: 2001 + prev.length }, ...prev]);
  };

  return (
    <OrdersContext.Provider value={{ placedOrders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used inside <OrdersProvider>');
  return ctx;
}