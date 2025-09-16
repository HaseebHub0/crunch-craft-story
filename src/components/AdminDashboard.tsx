import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types/order';
import { OrderService } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string>('');
  
  const { signOut, user } = useAuth();

  useEffect(() => {
    // Subscribe to real-time order updates
    const unsubscribe = OrderService.subscribeToOrders((updatedOrders) => {
      setOrders(updatedOrders);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    setActionLoading(orderId);
    try {
      await OrderService.updateOrderStatus(orderId, status);
    } catch (err: any) {
      setError(err.message || 'Failed to update order status');
      setTimeout(() => setError(''), 3000);
    } finally {
      setActionLoading('');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    setActionLoading(orderId);
    try {
      await OrderService.deleteOrder(orderId);
    } catch (err: any) {
      setError(err.message || 'Failed to delete order');
      setTimeout(() => setError(''), 3000);
    } finally {
      setActionLoading('');
    }
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const totalRevenue = orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.totalPrice, 0);

    return { totalOrders, pendingOrders, completedOrders, totalRevenue };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">📦</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalOrders}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">⏳</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.pendingOrders}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">✅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.completedOrders}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">PKR {stats.totalRevenue.toLocaleString()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              All orders are updated in real-time
            </p>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order.id} className="px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{order.name}</h4>
                          <p className="text-sm text-gray-600">{order.phone}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <span className="text-lg font-semibold text-gray-900">
                            PKR {order.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <strong>Address:</strong> {order.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Items:</strong> {order.items.map(item => 
                            `${item.name} (${item.quantity}x)`
                          ).join(', ')}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Order Date:</strong> {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(order.id!, 'pending')}
                          disabled={actionLoading === order.id}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            order.status === 'pending'
                              ? 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                        >
                          {actionLoading === order.id ? 'Updating...' : 'Pending'}
                        </button>
                        
                        <button
                          onClick={() => handleStatusUpdate(order.id!, 'completed')}
                          disabled={actionLoading === order.id}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-200 text-green-800 cursor-not-allowed'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {actionLoading === order.id ? 'Updating...' : 'Completed'}
                        </button>
                        
                        <button
                          onClick={() => handleStatusUpdate(order.id!, 'canceled')}
                          disabled={actionLoading === order.id}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            order.status === 'canceled'
                              ? 'bg-red-200 text-red-800 cursor-not-allowed'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {actionLoading === order.id ? 'Updating...' : 'Canceled'}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteOrder(order.id!)}
                          disabled={actionLoading === order.id}
                          className="px-3 py-1 rounded text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400"
                        >
                          {actionLoading === order.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
