import React, { useState } from 'react';
import { EmailService } from '../services/emailService';
import { toast } from '../hooks/use-toast';

// Component for testing email functionality (Admin only)
const EmailTestComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('test@example.com');

  const handleTestEmail = async () => {
    setIsLoading(true);
    
    try {
      // Create test order data
      const testOrderData = {
        orderId: `TEST-${Date.now()}`,
        customerName: 'Test Customer',
        customerEmail: testEmail,
  customerPhone: '+92 301 9671010',
        customerAddress: 'Test Address, Karachi, Pakistan',
        items: [
          {
            name: 'Best Protein Nimko in Pakistan',
            quantity: 1,
            price: 1399,
            weight: '1 kg'
          }
        ],
        totalAmount: 1399,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        estimatedDelivery: '3-5 business days'
      };

      // Send test emails
      const results = await EmailService.sendOrderEmails(testOrderData);

      if (results.customerEmailSent && results.adminEmailSent) {
        toast({
          title: '✅ Email Test Successful',
          description: 'Both customer and admin emails sent successfully!',
          variant: 'default',
        });
      } else if (results.customerEmailSent) {
        toast({
          title: '⚠️ Partial Success',
          description: 'Customer email sent, but admin email failed.',
          variant: 'default',
        });
      } else if (results.adminEmailSent) {
        toast({
          title: '⚠️ Partial Success',
          description: 'Admin email sent, but customer email failed.',
          variant: 'default',
        });
      } else {
        toast({
          title: '❌ Email Test Failed',
          description: 'Both emails failed to send. Check configuration.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Email test error:', error);
      toast({
        title: '❌ Email Test Error',
        description: 'An error occurred while testing emails.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmailService = async () => {
    setIsLoading(true);
    
    try {
      const success = await EmailService.testEmailService();
      
      if (success) {
        toast({
          title: '✅ Service Test Successful',
          description: 'EmailJS service is properly configured.',
          variant: 'default',
        });
      } else {
        toast({
          title: '❌ Service Test Failed',
          description: 'EmailJS service configuration has issues.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Service test error:', error);
      toast({
        title: '❌ Service Test Error',
        description: 'Failed to test email service configuration.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Email System Test</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="test-email" className="block text-sm font-medium text-gray-700 mb-2">
            Test Email Address
          </label>
          <input
            type="email"
            id="test-email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="test@example.com"
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={handleTestEmailService}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Email Service'}
          </button>

          <button
            onClick={handleTestEmail}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Test Order Emails'}
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p><strong>Test Email Service:</strong> Tests basic EmailJS configuration</p>
          <p><strong>Send Test Order Emails:</strong> Sends actual order confirmation emails</p>
        </div>
      </div>
    </div>
  );
};

export default EmailTestComponent;
