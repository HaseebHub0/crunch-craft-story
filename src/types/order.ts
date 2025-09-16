export interface Order {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'completed' | 'canceled';

export interface OrderFormData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
}
