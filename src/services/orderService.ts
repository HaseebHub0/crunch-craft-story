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
  getDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Order, OrderFormData, OrderStatus } from '../types/order';
import { FreeDeliveryService } from './freeDeliveryService';

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
      // Get current order to check if it used free delivery
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      const orderDoc = await getDoc(orderRef);
      
      if (!orderDoc.exists()) {
        throw new Error('Order not found');
      }
      
      const currentOrder = orderDoc.data() as Order;
      const previousStatus = currentOrder.status;
      const usedFreeDelivery = currentOrder.usedFreeDelivery || false;
      
      // Update order status in Firebase
      await updateDoc(orderRef, {
        status,
        updatedAt: Timestamp.fromDate(new Date()),
      });
      
      // Handle counter synchronization based on status changes
      if (usedFreeDelivery) {
        // If order is being canceled and previously wasn't canceled
        if (status === 'canceled' && previousStatus !== 'canceled') {
          FreeDeliveryService.handleOrderCancellation(true);
        }
        // If order is being restored from canceled status
        else if (previousStatus === 'canceled' && status !== 'canceled') {
          FreeDeliveryService.handleOrderRestoration(true);
        }
      }
      
      console.log('Order status updated:', orderId, `${previousStatus} → ${status}`, usedFreeDelivery ? '(used free delivery)' : '');
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  // Delete order
  static async deleteOrder(orderId: string): Promise<void> {
    try {
      // Get order data before deleting to check if it used free delivery
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      const orderDoc = await getDoc(orderRef);
      
      if (orderDoc.exists()) {
        const orderData = orderDoc.data() as Order;
        const usedFreeDelivery = orderData.usedFreeDelivery || false;
        
        // Delete the order
        await deleteDoc(orderRef);
        
        // Handle counter synchronization
        if (usedFreeDelivery) {
          FreeDeliveryService.handleOrderDeletion(true);
        }
        
        console.log('Order deleted:', orderId, usedFreeDelivery ? '(restored free delivery counter)' : '');
      } else {
        // Order doesn't exist, just attempt to delete
        await deleteDoc(orderRef);
        console.log('Order deleted:', orderId, '(order not found)');
      }
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
