// Cloud storage utilities for cross-device order sync

const CLOUD_STORAGE_KEY = 'pakasian-orders-cloud';

export interface CloudStorageOrder {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  cart: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    weight: string;
  }>;
  totalAmount: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: string;
}

// Simple cloud storage using a free service like JSONBin or your own endpoint
const CLOUD_ENDPOINT = 'https://api.jsonbin.io/v3/b/YOUR_BIN_ID'; // Replace with your JSONBin URL
const API_KEY = '$2a$10$YOUR_API_KEY'; // Replace with your JSONBin API key

export class CloudOrderStorage {
  
  // Upload orders to cloud
  static async uploadOrders(orders: CloudStorageOrder[]): Promise<boolean> {
    try {
      // For demo, we'll use localStorage as fallback
      // In production, replace with actual cloud API
      
      const response = await fetch(CLOUD_ENDPOINT, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify({
          orders: orders,
          lastUpdated: new Date().toISOString(),
          device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
        }),
      });

      if (!response.ok) {
        throw new Error('Cloud upload failed');
      }

      console.log('Orders uploaded to cloud successfully');
      return true;
    } catch (error) {
      console.error('Cloud upload error:', error);
      
      // Fallback: Store in localStorage with sync flag
      localStorage.setItem('pakasianOrdersCloudBackup', JSON.stringify({
        orders,
        lastUpdated: new Date().toISOString(),
        needsSync: true
      }));
      
      return false;
    }
  }

  // Download orders from cloud
  static async downloadOrders(): Promise<CloudStorageOrder[]> {
    try {
      const response = await fetch(CLOUD_ENDPOINT, {
        headers: {
          'X-Master-Key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Cloud download failed');
      }

      const data = await response.json();
      console.log('Orders downloaded from cloud successfully');
      
      return data.record?.orders || [];
    } catch (error) {
      console.error('Cloud download error:', error);
      
      // Fallback: Try to get from localStorage backup
      const backup = localStorage.getItem('pakasianOrdersCloudBackup');
      if (backup) {
        const backupData = JSON.parse(backup);
        return backupData.orders || [];
      }
      
      return [];
    }
  }

  // Sync local storage with cloud
  static async syncOrders(): Promise<CloudStorageOrder[]> {
    try {
      // Get local orders
      const localOrders = JSON.parse(localStorage.getItem('pakasianOrders') || '[]');
      
      // Get cloud orders
      const cloudOrders = await this.downloadOrders();
      
      // Merge orders (remove duplicates by orderId)
      const mergedOrders = this.mergeOrders(localOrders, cloudOrders);
      
      // Save merged orders locally
      localStorage.setItem('pakasianOrders', JSON.stringify(mergedOrders));
      
      // Upload merged orders to cloud
      await this.uploadOrders(mergedOrders);
      
      console.log('Orders synced successfully');
      return mergedOrders;
    } catch (error) {
      console.error('Sync error:', error);
      
      // Return local orders if sync fails
      return JSON.parse(localStorage.getItem('pakasianOrders') || '[]');
    }
  }

  // Merge orders from different sources
  private static mergeOrders(localOrders: CloudStorageOrder[], cloudOrders: CloudStorageOrder[]): CloudStorageOrder[] {
    const orderMap = new Map<string, CloudStorageOrder>();
    
    // Add cloud orders first
    cloudOrders.forEach(order => {
      orderMap.set(order.orderId, order);
    });
    
    // Add local orders (will overwrite if same orderId and newer)
    localOrders.forEach(order => {
      const existing = orderMap.get(order.orderId);
      if (!existing || new Date(order.timestamp) > new Date(existing.timestamp)) {
        orderMap.set(order.orderId, order);
      }
    });
    
    // Convert back to array and sort by timestamp
    return Array.from(orderMap.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
}

// Simple alternative using URL sharing
export class URLOrderSharing {
  
  // Generate shareable URL with order data
  static generateShareURL(orders: CloudStorageOrder[]): string {
    const compressedData = btoa(JSON.stringify({
      orders: orders.slice(0, 10), // Limit to 10 orders for URL length
      timestamp: Date.now()
    }));
    
    return `${window.location.origin}/admin?data=${compressedData}`;
  }
  
  // Extract orders from URL
  static extractOrdersFromURL(): CloudStorageOrder[] | null {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    
    if (!data) return null;
    
    try {
      const decodedData = JSON.parse(atob(data));
      return decodedData.orders || [];
    } catch (error) {
      console.error('Error extracting orders from URL:', error);
      return null;
    }
  }
}
