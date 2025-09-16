import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Order, OrderFormData, OrderStatus } from '../types/order';

const ORDERS_COLLECTION = 'orders';

export class OrderService {
  // Create a new order
  static async createOrder(orderData: OrderFormData): Promise<string> {
    try {
      const now = new Date();
      const order: Omit<Order, 'id'> = {
        ...orderData,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
        ...order,
        createdAt: Timestamp.fromDate(order.createdAt),
        updatedAt: Timestamp.fromDate(order.updatedAt),
      });

      console.log('Order created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  // Get all orders (for admin dashboard)
  static async getAllOrders(): Promise<Order[]> {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Order;
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  // Update order status
  static async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: Timestamp.fromDate(new Date()),
      });
      console.log('Order status updated:', orderId, status);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  // Delete order
  static async deleteOrder(orderId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
      console.log('Order deleted:', orderId);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw new Error('Failed to delete order');
    }
  }

  // Subscribe to real-time order updates
  static subscribeToOrders(callback: (orders: Order[]) => void): () => void {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const orders = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Order;
      });
      
      callback(orders);
    }, (error) => {
      console.error('Error in orders subscription:', error);
    });
  }
}
