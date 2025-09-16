import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get, onValue, off, remove, update } from 'firebase/database';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
    apiKey: "AIzaSyCKA-KypQTucH01aTJ8WPiM7LYXTQcgL3c",
    authDomain: "pakasian-protein-nimko.firebaseapp.com",
    databaseURL: "https://pakasian-protein-nimko-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pakasian-protein-nimko",
    storageBucket: "pakasian-protein-nimko.firebasestorage.app",
    messagingSenderId: "375303378562",
    appId: "1:375303378562:web:ea7acf7483b2af10cd869b",
    measurementId: "G-6EZ1B4KWY1"
  };
// Initialize Firebase - Always use real config now that it's set up
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export interface Order {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode?: string;
  cart: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    weight: string;
    image?: string;
  }>;
  totalAmount: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: string;
  createdAt: number;
  updatedAt: number;
}

export class OrderDatabase {
  
  // Add new order to Firebase
  static async addOrder(orderData: Omit<Order, 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const ordersRef = ref(database, 'orders');
      const newOrderRef = push(ordersRef);
      
      const order: Order = {
        ...orderData,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      await set(newOrderRef, order);
      console.log('Order added to Firebase:', newOrderRef.key);
      
      // Also backup to localStorage
      this.backupToLocalStorage([order]);
      
      return newOrderRef.key;
    } catch (error) {
      console.error('Error adding order to Firebase:', error);
      
      // Fallback to localStorage if Firebase fails
      this.addToLocalStorage(orderData);
      return null;
    }
  }
  
  // Get all orders from Firebase
  static async getAllOrders(): Promise<Order[]> {
    try {
      const ordersRef = ref(database, 'orders');
      const snapshot = await get(ordersRef);
      
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const orders: Order[] = Object.keys(ordersData).map(key => ({
          ...ordersData[key],
          firebaseKey: key
        }));
        
        // Sort by creation time (newest first)
        orders.sort((a, b) => b.createdAt - a.createdAt);
        
        console.log(`Loaded ${orders.length} orders from Firebase`);
        
        // Backup to localStorage
        this.backupToLocalStorage(orders);
        
        return orders;
      } else {
        console.log('No orders found in Firebase');
        
        // Try to load from localStorage backup
        return this.getFromLocalStorage();
      }
    } catch (error) {
      console.error('Error loading orders from Firebase:', error);
      
      // Fallback to localStorage
      return this.getFromLocalStorage();
    }
  }
  
  // Listen for real-time updates
  static listenForOrders(callback: (orders: Order[]) => void): () => void {
    const ordersRef = ref(database, 'orders');
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const orders: Order[] = Object.keys(ordersData).map(key => ({
          ...ordersData[key],
          firebaseKey: key
        }));
        
        // Sort by creation time (newest first)
        orders.sort((a, b) => b.createdAt - a.createdAt);
        
        console.log(`Real-time update: ${orders.length} orders`);
        
        // Backup to localStorage
        this.backupToLocalStorage(orders);
        
        callback(orders);
      } else {
        console.log('No orders in Firebase');
        callback([]);
      }
    }, (error) => {
      console.error('Firebase listener error:', error);
      
      // Fallback to localStorage
      const localOrders = this.getFromLocalStorage();
      callback(localOrders);
    });
    
    return () => off(ordersRef, 'value', unsubscribe);
  }
  
  // Update order status
  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    try {
      // Find order by orderId (not Firebase key)
      const ordersRef = ref(database, 'orders');
      const snapshot = await get(ordersRef);
      
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const firebaseKey = Object.keys(ordersData).find(key => 
          ordersData[key].orderId === orderId
        );
        
        if (firebaseKey) {
          const orderRef = ref(database, `orders/${firebaseKey}`);
          await update(orderRef, {
            status: status,
            updatedAt: Date.now()
          });
          
          console.log(`Order ${orderId} status updated to ${status}`);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error updating order status:', error);
      
      // Fallback to localStorage
      this.updateLocalStorageStatus(orderId, status);
      return false;
    }
  }
  
  // Delete order
  static async deleteOrder(orderId: string): Promise<boolean> {
    try {
      // Find order by orderId
      const ordersRef = ref(database, 'orders');
      const snapshot = await get(ordersRef);
      
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const firebaseKey = Object.keys(ordersData).find(key => 
          ordersData[key].orderId === orderId
        );
        
        if (firebaseKey) {
          const orderRef = ref(database, `orders/${firebaseKey}`);
          await remove(orderRef);
          
          console.log(`Order ${orderId} deleted from Firebase`);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error deleting order:', error);
      
      // Fallback to localStorage
      this.deleteFromLocalStorage(orderId);
      return false;
    }
  }
  
  // Sync localStorage with Firebase
  static async syncLocalToFirebase(): Promise<boolean> {
    try {
      const localOrders = this.getFromLocalStorage();
      const firebaseOrders = await this.getAllOrders();
      
      // Find orders that exist locally but not in Firebase
      const newOrders = localOrders.filter(localOrder => 
        !firebaseOrders.some(fbOrder => fbOrder.orderId === localOrder.orderId)
      );
      
      // Upload new orders to Firebase
      for (const order of newOrders) {
        await this.addOrder(order);
      }
      
      console.log(`Synced ${newOrders.length} new orders to Firebase`);
      return true;
    } catch (error) {
      console.error('Error syncing to Firebase:', error);
      return false;
    }
  }
  
  // Backup methods for localStorage fallback
  private static backupToLocalStorage(orders: Order[]): void {
    try {
      localStorage.setItem('pakasianOrdersBackup', JSON.stringify(orders));
      localStorage.setItem('pakasianOrdersLastSync', Date.now().toString());
    } catch (error) {
      console.error('Error backing up to localStorage:', error);
    }
  }
  
  private static getFromLocalStorage(): Order[] {
    try {
      const backup = localStorage.getItem('pakasianOrdersBackup');
      if (backup) {
        return JSON.parse(backup);
      }
      
      // Also check old localStorage format
      const oldOrders = localStorage.getItem('pakasianOrders');
      if (oldOrders) {
        return JSON.parse(oldOrders);
      }
      
      return [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  }
  
  private static addToLocalStorage(orderData: Omit<Order, 'createdAt' | 'updatedAt'>): void {
    try {
      const existingOrders = this.getFromLocalStorage();
      const order: Order = {
        ...orderData,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      existingOrders.unshift(order);
      this.backupToLocalStorage(existingOrders);
    } catch (error) {
      console.error('Error adding to localStorage:', error);
    }
  }
  
  private static updateLocalStorageStatus(orderId: string, status: Order['status']): void {
    try {
      const orders = this.getFromLocalStorage();
      const updatedOrders = orders.map(order => 
        order.orderId === orderId 
          ? { ...order, status, updatedAt: Date.now() }
          : order
      );
      this.backupToLocalStorage(updatedOrders);
    } catch (error) {
      console.error('Error updating localStorage status:', error);
    }
  }
  
  private static deleteFromLocalStorage(orderId: string): void {
    try {
      const orders = this.getFromLocalStorage();
      const filteredOrders = orders.filter(order => order.orderId !== orderId);
      this.backupToLocalStorage(filteredOrders);
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
    }
  }
  
  // Get statistics with safe null checks
  static getStatistics(orders: Order[] = []) {
    const safeOrders = orders || [];
    
    return {
      total: safeOrders.length || 0,
      pending: safeOrders.filter(o => o?.status === 'pending').length || 0,
      processing: safeOrders.filter(o => o?.status === 'processing').length || 0,
      shipped: safeOrders.filter(o => o?.status === 'shipped').length || 0,
      delivered: safeOrders.filter(o => o?.status === 'delivered').length || 0,
      cancelled: safeOrders.filter(o => o?.status === 'cancelled').length || 0,
      totalRevenue: safeOrders.reduce((sum, o) => sum + (o?.totalAmount || 0), 0) || 0,
      averageOrderValue: safeOrders.length > 0 
        ? (safeOrders.reduce((sum, o) => sum + (o?.totalAmount || 0), 0) / safeOrders.length) || 0
        : 0,
      todayOrders: safeOrders.filter(o => {
        if (!o?.createdAt) return false;
        const today = new Date().toDateString();
        const orderDate = new Date(o.createdAt).toDateString();
        return today === orderDate;
      }).length || 0,
      thisWeekRevenue: safeOrders.filter(o => {
        if (!o?.createdAt) return false;
        const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        return o.createdAt > weekAgo;
      }).reduce((sum, o) => sum + (o?.totalAmount || 0), 0) || 0
    };
  }
}

export { database };
