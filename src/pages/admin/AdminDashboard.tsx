import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  CheckCircle, 
  Clock, 
  Trash2,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Calendar,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminLogin from "./AdminLogin";
import { CloudOrderStorage, URLOrderSharing } from "@/utils/cloudStorage";
import OrderSync from "@/components/OrderSync";
import { OrderDatabase, Order as FirebaseOrder } from "@/config/firebase";

// Use Firebase Order interface
type Order = FirebaseOrder;

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  // Check authentication and setup real-time listener
  useEffect(() => {
    const authState = localStorage.getItem('pakasianAdminAuth');
    if (authState === 'true') {
      setIsAuthenticated(true);
      setupRealTimeListener();
    } else {
      setIsLoading(false);
    }
    
    // Listen for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      if (isAuthenticated) {
        syncLocalToFirebase();
      }
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    loadOrders();
  };

  const handleLogout = () => {
    localStorage.removeItem('pakasianAdminAuth');
    setIsAuthenticated(false);
  };

  // Setup real-time Firebase listener
  const setupRealTimeListener = () => {
    setIsLoading(true);
    
    // Listen for real-time updates from Firebase
    const unsubscribe = OrderDatabase.listenForOrders((firebaseOrders) => {
      setOrders(firebaseOrders);
      setLastSyncTime(new Date().toLocaleTimeString());
      setIsLoading(false);
    });
    
    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  };
  
  // Sync local storage to Firebase
  const syncLocalToFirebase = async () => {
    try {
      await OrderDatabase.syncLocalToFirebase();
      console.log('Local orders synced to Firebase');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };
  
  // Manual refresh/sync
  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const allOrders = await OrderDatabase.getAllOrders();
      setOrders(allOrders);
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      // Update in Firebase (this will trigger real-time update)
      const success = await OrderDatabase.updateOrderStatus(orderId, newStatus);
      
      if (success) {
        console.log(`Order ${orderId} status updated to ${newStatus}`);
        
        // Close modal if order was selected
        if (selectedOrder?.orderId === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        // Fallback to local update if Firebase fails
        const updatedOrders = orders.map(order => 
          order.orderId === orderId 
            ? { ...order, status: newStatus, updatedAt: Date.now() }
            : order
        );
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      // Delete from Firebase (this will trigger real-time update)
      const success = await OrderDatabase.deleteOrder(orderId);
      
      if (success) {
        console.log(`Order ${orderId} deleted`);
        setSelectedOrder(null);
      } else {
        // Fallback to local delete if Firebase fails
        const updatedOrders = orders.filter(order => order.orderId !== orderId);
        setOrders(updatedOrders);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const sendWhatsApp = (phone: string, name: string, orderId: string) => {
    const message = `Hello ${name}! Your order #${orderId} from Pakasian Protein Nimko has been confirmed. We will process it soon. Thank you for your order!`;
    const whatsappURL = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const sendEmail = (email: string, name: string, orderId: string) => {
    const subject = `Order Confirmation - ${orderId}`;
    const body = `Dear ${name},\n\nThank you for your order #${orderId}. We have received your order and will process it soon.\n\nBest regards,\nPakasian Protein Nimko Team`;
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoURL, '_blank');
  };

  // Filter orders with safe null checks
  const filteredOrders = (orders || []).filter(order => {
    if (!order) return false;
    if (filter === 'all') return true;
    return order.status === filter;
  });

  // Calculate statistics using Firebase method with safe fallback
  const stats = OrderDatabase.getStatistics(orders || []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">
                  Pakasian Protein Nimko Orders Management
                  {lastSyncTime && (
                    <span className="ml-2 text-sm">
                      • Last sync: {lastSyncTime}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-500">
                    {isOnline ? 'Online - Real-time sync active' : 'Offline - Using local data'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={loadOrders} className="bg-red-600 hover:bg-red-700">
                  Refresh
                </Button>
                <Button onClick={syncLocalToFirebase} variant="outline" disabled={!isOnline}>
                  Force Sync
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <Package className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.pending || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">PKR {(stats?.totalRevenue || 0).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">PKR {Math.round(stats?.averageOrderValue || 0).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Sync */}
        <OrderSync 
          orders={orders} 
          onOrdersImported={(importedOrders) => {
            setOrders(importedOrders);
          }} 
        />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  onClick={() => setFilter(status)}
                  className={filter === status ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <Badge variant="secondary" className="ml-2">
                      {(orders || []).filter(o => o?.status === status).length || 0}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Orders ({filteredOrders.length})
            </h2>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order?.orderId || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {(order?.cart?.length || 0)} item(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order?.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        PKR {(order?.totalAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(order?.status || 'pending')}>
                          {order?.status || 'pending'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendWhatsApp(order.phone, order.name, order.orderId)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Order Details - #{selectedOrder.orderId}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  ✕
                </Button>
              </div>

              {/* Customer Info */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{selectedOrder.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{selectedOrder.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{selectedOrder.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{selectedOrder.address}, {selectedOrder.city}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{selectedOrder.orderDate}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.weight}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">PKR {item.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-lg font-bold text-red-600">
                      PKR {selectedOrder.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedOrder.status === status ? "default" : "outline"}
                      onClick={() => updateOrderStatus(selectedOrder.orderId, status as Order['status'])}
                      className={selectedOrder.status === status ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => sendWhatsApp(selectedOrder.phone, selectedOrder.name, selectedOrder.orderId)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send WhatsApp
                </Button>
                <Button
                  onClick={() => sendEmail(selectedOrder.email, selectedOrder.name, selectedOrder.orderId)}
                  variant="outline"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  onClick={() => deleteOrder(selectedOrder.orderId)}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Order
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
