// Simple Database Service for Pakasian Orders
// Uses JSONBin.io (free tier: 100,000 requests/month)

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

export interface DatabaseStats {
  totalOrders: number;
  newOrdersToday: number;
  newOrdersThisWeek: number;
  totalRevenue: number;
  averageOrderValue: number;
  statusBreakdown: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

class PakasianDatabase {
  private static readonly STORAGE_KEY = 'pakasian_orders_db';
  private static readonly BACKUP_KEY = 'pakasian_orders_backup';
  
  // Initialize database
  static async initialize(): Promise<void> {
    try {
      // Check if we have existing data
      const existingData = this.getLocalData();
      if (existingData.length === 0) {
        console.log('Database initialized - no existing orders');
      } else {
        console.log(`Database loaded with ${existingData.length} existing orders`);
      }
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }
  
  // Add new order to database
  static async addOrder(orderData: Omit<Order, 'createdAt' | 'updatedAt'>): Promise<boolean> {
    try {
      const order: Order = {
        ...orderData,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      
      // Get existing orders
      const existingOrders = this.getLocalData();
      
      // Add new order at the beginning (newest first)
      existingOrders.unshift(order);
      
      // Save to localStorage
      this.saveLocalData(existingOrders);
      
      // Create backup
      this.createBackup(existingOrders);
      
      console.log(`Order ${order.orderId} added to database`);
      return true;
    } catch (error) {
      console.error('Error adding order:', error);
      return false;
    }
  }
  
  // Get all orders
  static getAllOrders(): Order[] {
    try {
      return this.getLocalData();
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }
  
  // Update order status
  static updateOrderStatus(orderId: string, status: Order['status']): boolean {
    try {
      const orders = this.getLocalData();
      const orderIndex = orders.findIndex(o => o.orderId === orderId);
      
      if (orderIndex !== -1) {
        orders[orderIndex] = {
          ...orders[orderIndex],
          status,
          updatedAt: Date.now()
        };
        
        this.saveLocalData(orders);
        this.createBackup(orders);
        
        console.log(`Order ${orderId} status updated to ${status}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  }
  
  // Delete order
  static deleteOrder(orderId: string): boolean {
    try {
      const orders = this.getLocalData();
      const filteredOrders = orders.filter(o => o.orderId !== orderId);
      
      this.saveLocalData(filteredOrders);
      this.createBackup(filteredOrders);
      
      console.log(`Order ${orderId} deleted from database`);
      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      return false;
    }
  }
  
  // Get database statistics
  static getStatistics(): DatabaseStats {
    try {
      const orders = this.getLocalData();
      const now = Date.now();
      const todayStart = new Date().setHours(0, 0, 0, 0);
      const weekStart = now - (7 * 24 * 60 * 60 * 1000);
      
      return {
        totalOrders: orders.length,
        newOrdersToday: orders.filter(o => o.createdAt >= todayStart).length,
        newOrdersThisWeek: orders.filter(o => o.createdAt >= weekStart).length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
        averageOrderValue: orders.length > 0 
          ? orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) / orders.length 
          : 0,
        statusBreakdown: {
          pending: orders.filter(o => o.status === 'pending').length,
          processing: orders.filter(o => o.status === 'processing').length,
          shipped: orders.filter(o => o.status === 'shipped').length,
          delivered: orders.filter(o => o.status === 'delivered').length,
          cancelled: orders.filter(o => o.status === 'cancelled').length,
        }
      };
    } catch (error) {
      console.error('Error calculating statistics:', error);
      return {
        totalOrders: 0,
        newOrdersToday: 0,
        newOrdersThisWeek: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        statusBreakdown: {
          pending: 0,
          processing: 0,
          shipped: 0,
          delivered: 0,
          cancelled: 0,
        }
      };
    }
  }
  
  // Export all data for backup
  static exportData(): string {
    try {
      const orders = this.getLocalData();
      const stats = this.getStatistics();
      
      const exportData = {
        orders,
        stats,
        exportDate: new Date().toISOString(),
        totalOrders: orders.length
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return '{}';
    }
  }
  
  // Import data from backup
  static importData(jsonData: string): boolean {
    try {
      const importedData = JSON.parse(jsonData);
      
      if (importedData.orders && Array.isArray(importedData.orders)) {
        // Merge with existing orders
        const existingOrders = this.getLocalData();
        const allOrders = [...importedData.orders, ...existingOrders];
        
        // Remove duplicates by orderId
        const uniqueOrders = allOrders.filter((order, index, self) => 
          index === self.findIndex(o => o.orderId === order.orderId)
        );
        
        this.saveLocalData(uniqueOrders);
        this.createBackup(uniqueOrders);
        
        console.log(`Imported ${importedData.orders.length} orders`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
  
  // Search orders
  static searchOrders(query: string): Order[] {
    try {
      const orders = this.getLocalData();
      const searchTerm = query.toLowerCase();
      
      return orders.filter(order => 
        order.orderId.toLowerCase().includes(searchTerm) ||
        order.name.toLowerCase().includes(searchTerm) ||
        order.phone.includes(searchTerm) ||
        order.email.toLowerCase().includes(searchTerm) ||
        order.city.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching orders:', error);
      return [];
    }
  }
  
  // Get orders by date range
  static getOrdersByDateRange(startDate: Date, endDate: Date): Order[] {
    try {
      const orders = this.getLocalData();
      const start = startDate.getTime();
      const end = endDate.getTime();
      
      return orders.filter(order => {
        const orderTime = order.createdAt;
        return orderTime >= start && orderTime <= end;
      });
    } catch (error) {
      console.error('Error filtering orders by date:', error);
      return [];
    }
  }
  
  // Private helper methods
  private static getLocalData(): Order[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      
      // Check old format
      const oldData = localStorage.getItem('pakasianOrders');
      if (oldData) {
        const orders = JSON.parse(oldData);
        // Migrate to new format
        this.saveLocalData(orders);
        return orders;
      }
      
      return [];
    } catch (error) {
      console.error('Error reading local data:', error);
      return [];
    }
  }
  
  private static saveLocalData(orders: Order[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
      localStorage.setItem('pakasian_last_update', Date.now().toString());
    } catch (error) {
      console.error('Error saving local data:', error);
    }
  }
  
  private static createBackup(orders: Order[]): void {
    try {
      const backup = {
        orders,
        backupDate: new Date().toISOString(),
        count: orders.length
      };
      
      localStorage.setItem(this.BACKUP_KEY, JSON.stringify(backup));
    } catch (error) {
      console.error('Error creating backup:', error);
    }
  }
  
  // Restore from backup
  static restoreFromBackup(): boolean {
    try {
      const backup = localStorage.getItem(this.BACKUP_KEY);
      if (backup) {
        const backupData = JSON.parse(backup);
        if (backupData.orders) {
          this.saveLocalData(backupData.orders);
          console.log(`Restored ${backupData.orders.length} orders from backup`);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error restoring from backup:', error);
      return false;
    }
  }
  
  // Clear all data (use with caution)
  static clearAllData(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.BACKUP_KEY);
      console.log('All order data cleared');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}

export default PakasianDatabase;
