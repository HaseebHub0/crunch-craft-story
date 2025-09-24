import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/emailTemplates';

// EmailJS configuration
const EMAILJS_SERVICE_ID = EMAIL_CONFIG.SERVICE_ID;
const EMAILJS_PUBLIC_KEY = EMAIL_CONFIG.PUBLIC_KEY;
const ADMIN_EMAIL_TEMPLATE_ID = EMAIL_CONFIG.ADMIN_TEMPLATE_ID;
const CUSTOMER_EMAIL_TEMPLATE_ID = EMAIL_CONFIG.CUSTOMER_TEMPLATE_ID;

export interface EmailOrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    weight?: string;
  }>;
  totalAmount: number;
  orderDate: string;
  estimatedDelivery?: string;
}

export class EmailService {
  // Initialize EmailJS
  static initialize(): void {
    if (typeof window !== 'undefined') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }

  // Send order confirmation email to customer
  static async sendCustomerConfirmation(orderData: EmailOrderData): Promise<boolean> {
    try {
      this.initialize();

      const templateParams = {
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        order_id: orderData.orderId,
        order_date: orderData.orderDate,
        items_list: this.formatItemsForEmail(orderData.items),
        total_amount: `PKR ${orderData.totalAmount.toLocaleString()}`,
        delivery_address: orderData.customerAddress,
        estimated_delivery: orderData.estimatedDelivery || '3-5 business days',
        company_name: 'Pakasian Protein Nimko',
        company_email: 'info@pakasianfoods.com',
        company_phone: '+92 300 1234567',
        website_url: 'https://pakasianshop.com'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        CUSTOMER_EMAIL_TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Customer confirmation email sent:', response.status);
      return true;
    } catch (error) {
      console.error('❌ Failed to send customer email:', error);
      return false;
    }
  }

  // Send order notification email to admin/company
  static async sendAdminNotification(orderData: EmailOrderData): Promise<boolean> {
    try {
      this.initialize();

      const templateParams = {
        order_id: orderData.orderId,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_address: orderData.customerAddress,
        order_date: orderData.orderDate,
        items_list: this.formatItemsForEmail(orderData.items),
        total_amount: `PKR ${orderData.totalAmount.toLocaleString()}`,
        admin_email: 'admin@pakasianfoods.com',
        company_name: 'Pakasian Protein Nimko'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        ADMIN_EMAIL_TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Admin notification email sent:', response.status);
      return true;
    } catch (error) {
      console.error('❌ Failed to send admin email:', error);
      return false;
    }
  }

  // Send both customer and admin emails
  static async sendOrderEmails(orderData: EmailOrderData): Promise<{
    customerEmailSent: boolean;
    adminEmailSent: boolean;
  }> {
    try {
      // Send both emails in parallel for better performance
      const [customerResult, adminResult] = await Promise.allSettled([
        this.sendCustomerConfirmation(orderData),
        this.sendAdminNotification(orderData)
      ]);

      const customerEmailSent = customerResult.status === 'fulfilled' && customerResult.value;
      const adminEmailSent = adminResult.status === 'fulfilled' && adminResult.value;

      return {
        customerEmailSent,
        adminEmailSent
      };
    } catch (error) {
      console.error('❌ Error sending order emails:', error);
      return {
        customerEmailSent: false,
        adminEmailSent: false
      };
    }
  }

  // Format items for email display
  private static formatItemsForEmail(items: Array<{
    name: string;
    quantity: number;
    price: number;
    weight?: string;
  }>): string {
    return items.map(item => {
      const totalPrice = item.price * item.quantity;
      const weightInfo = item.weight ? ` (${item.weight})` : '';
      return `${item.name}${weightInfo} - Quantity: ${item.quantity} - PKR ${totalPrice.toLocaleString()}`;
    }).join('\n');
  }

  // Test email service configuration
  static async testEmailService(): Promise<boolean> {
    try {
      this.initialize();
      
      const testParams = {
        to_email: 'test@example.com',
        customer_name: 'Test User',
        order_id: 'TEST-001',
        message: 'This is a test email to verify EmailJS configuration.'
      };

      // You can create a test template or use an existing one
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        'template_test', // Replace with your test template ID
        testParams
      );

      console.log('✅ Email service test successful');
      return true;
    } catch (error) {
      console.error('❌ Email service test failed:', error);
      return false;
    }
  }
}
