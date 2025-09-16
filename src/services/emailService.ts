import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_your_id';
const EMAILJS_TEMPLATE_ID_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN || 'template_admin';
const EMAILJS_TEMPLATE_ID_CUSTOMER = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CUSTOMER || 'template_customer';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

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
  }>;
  totalAmount: number;
  orderDate: string;
}

export class EmailService {
  // Send email to admin (company)
  static async sendAdminNotification(orderData: EmailOrderData): Promise<boolean> {
    try {
      const templateParams = {
        to_name: 'Pakasian Team',
        to_email: 'admin@pakasianfoods.com', // Company email
        order_id: orderData.orderId,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_address: orderData.customerAddress,
        order_items: orderData.items.map(item => 
          `${item.name} (${item.quantity}x) - PKR ${item.price}`
        ).join(', '),
        total_amount: `PKR ${orderData.totalAmount.toLocaleString()}`,
        order_date: orderData.orderDate,
        message: `New order received from ${orderData.customerName}. Please process this order as soon as possible.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_ADMIN,
        templateParams
      );

      console.log('Admin email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send admin email:', error);
      return false;
    }
  }

  // Send confirmation email to customer
  static async sendCustomerConfirmation(orderData: EmailOrderData): Promise<boolean> {
    try {
      const templateParams = {
        to_name: orderData.customerName,
        to_email: orderData.customerEmail,
        order_id: orderData.orderId,
        customer_name: orderData.customerName,
        order_items: orderData.items.map(item => 
          `${item.name} (${item.quantity}x) - PKR ${item.price}`
        ).join(', '),
        total_amount: `PKR ${orderData.totalAmount.toLocaleString()}`,
        order_date: orderData.orderDate,
        delivery_address: orderData.customerAddress,
        estimated_delivery: '3-5 business days',
        company_name: 'Pakasian Protein Nimko',
        company_phone: '+92 300 1234567',
        company_email: 'info@pakasianfoods.com',
        message: `Thank you for your order! We have received your order and will process it shortly. You will receive another email when your order is shipped.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_CUSTOMER,
        templateParams
      );

      console.log('Customer email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send customer email:', error);
      return false;
    }
  }

  // Send both emails (admin + customer)
  static async sendOrderNotifications(orderData: EmailOrderData): Promise<{
    adminEmailSent: boolean;
    customerEmailSent: boolean;
  }> {
    console.log('Sending email notifications for order:', orderData.orderId);
    
    const [adminEmailSent, customerEmailSent] = await Promise.all([
      this.sendAdminNotification(orderData),
      this.sendCustomerConfirmation(orderData)
    ]);

    return {
      adminEmailSent,
      customerEmailSent
    };
  }

  // Send order status update email to customer
  static async sendStatusUpdateEmail(
    customerEmail: string,
    customerName: string,
    orderId: string,
    newStatus: string,
    message?: string
  ): Promise<boolean> {
    try {
      const statusMessages = {
        pending: 'Your order is being processed and will be shipped soon.',
        completed: 'Your order has been completed and delivered successfully!',
        canceled: 'Your order has been canceled. If you have any questions, please contact us.'
      };

      const templateParams = {
        to_name: customerName,
        to_email: customerEmail,
        order_id: orderId,
        order_status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
        status_message: message || statusMessages[newStatus as keyof typeof statusMessages] || 'Your order status has been updated.',
        company_name: 'Pakasian Protein Nimko',
        company_phone: '+92 300 1234567',
        company_email: 'info@pakasianfoods.com'
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        'template_status_update', // You'll need to create this template
        templateParams
      );

      console.log('Status update email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send status update email:', error);
      return false;
    }
  }
}
