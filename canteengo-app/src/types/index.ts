

export type Category = 
{ id: number; 
  name: string; 
  emoji: string };

export type Food = {
  id: number;
  name: string;
  price: number;
  stall: string;
  category: string;
  description: string;
  emoji: string;
};

export type Stall = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  hours: string;
  emoji: string;
};

export type Deal = 
{ id: number; 
  title: string; 
  description: string; 
  price: string };

export type Order = {
  id: number;
  status: 'Preparing' | 'Ready for pickup' | 'Picked up';
  total: number;
  pickup_time: string;
  items: string[];
};

export type Announcement = { id: number; title: string; message: string };
export type CartItem = { food: Food; qty: number };
