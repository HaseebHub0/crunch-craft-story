import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/emailTemplates';

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_wkkaz3v";
const EMAILJS_PUBLIC_KEY = "Lf6JuKXlVJhdGPXFg";
  const ADMIN_EMAIL_TEMPLATE_ID = "template_admin_order";
  const CUSTOMER_EMAIL_TEMPLATE_ID = "template_customer"; // Update this to match your existing template ID

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
        to_email: orderData.customerEmail, // This is crucial - sends to customer
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail, // This variable will be used in template "To" field
        order_id: orderData.orderId,
        order_date: orderData.orderDate,
        items_list: this.formatItemsForEmail(orderData.items),
        total_amount: `PKR ${orderData.totalAmount.toLocaleString()}`,
        delivery_address: orderData.customerAddress,
        estimated_delivery: orderData.estimatedDelivery || '3-5 business days',
        company_name: 'Pakasian Protein Nimko',
        company_email: 'infopakasian@gmail.com',
        company_phone: '+92 300 1234567',
        website_url: 'https://pakasianshop.com'
      };

      console.log('🔍 Debug - Sending customer email with params:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: CUSTOMER_EMAIL_TEMPLATE_ID,
        templateParams: templateParams,
        toEmail: templateParams.to_email,
        customerEmail: orderData.customerEmail,
        message: 'Customer email should go to: ' + orderData.customerEmail
      });

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        CUSTOMER_EMAIL_TEMPLATE_ID,
        templateParams,
        {
          // This ensures the email goes to the customer
          publicKey: EMAILJS_PUBLIC_KEY
        }
      );

      console.log('✅ Customer confirmation email sent:', response.status);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send customer email:', error);
      console.error('❌ Error details:', {
        status: error.status,
        text: error.text,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: CUSTOMER_EMAIL_TEMPLATE_ID
      });
      return false;
    }
  }

  // Send order notification email to admin/company
  static async sendAdminNotification(orderData: EmailOrderData): Promise<boolean> {
    try {
      this.initialize();

      const templateParams = {
        to_email: 'infopakasian@gmail.com', // This sends to company admin
        order_id: orderData.orderId,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_address: orderData.customerAddress,
        order_date: orderData.orderDate,
        items_list: this.formatItemsForEmail(orderData.items),
        total_amount: `PKR ${orderData.totalAmount.toLocaleString()}`,
        admin_email: 'infopakasian@gmail.com',
        company_name: 'Pakasian Protein Nimko'
      };

      console.log('🔍 Debug - Sending admin email with params:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: ADMIN_EMAIL_TEMPLATE_ID,
        templateParams: templateParams,
        toEmail: templateParams.to_email,
        adminEmail: 'infopakasian@gmail.com',
        message: 'Admin email should go to: infopakasian@gmail.com'
      });

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        ADMIN_EMAIL_TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Admin notification email sent:', response.status);
      return true;
    } catch (error: any) {
      console.error('❌ Failed to send admin email:', error);
      console.error('❌ Error details:', {
        status: error.status,
        text: error.text,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: ADMIN_EMAIL_TEMPLATE_ID
      });
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

      console.log('🔍 Testing EmailJS configuration:', {
        serviceId: EMAILJS_SERVICE_ID,
        publicKey: EMAILJS_PUBLIC_KEY,
        templateId: 'template_test'
      });

      // You can create a test template or use an existing one
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        'template_test', // Replace with your test template ID
        testParams
      );

      console.log('✅ Email service test successful');
      return true;
    } catch (error: any) {
      console.error('❌ Email service test failed:', error);
      console.error('❌ Test error details:', {
        status: error.status,
        text: error.text,
        serviceId: EMAILJS_SERVICE_ID
      });
      return false;
    }
  }

  // Debug EmailJS configuration
  static debugConfiguration(): void {
    console.log('🔍 EmailJS Configuration Debug:');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Public Key:', EMAILJS_PUBLIC_KEY);
    console.log('Customer Template ID:', CUSTOMER_EMAIL_TEMPLATE_ID);
    console.log('Admin Template ID:', ADMIN_EMAIL_TEMPLATE_ID);
    
    // Check if EmailJS is properly initialized
    if (typeof window !== 'undefined') {
      // Use type assertion to avoid TypeScript error
      console.log('EmailJS initialized:', !!(window as any).emailjs);
    }

    console.log('\n📋 Next Steps:');
    console.log('1. Go to: https://dashboard.emailjs.com/admin/templates');
    console.log('2. Check if template_customer_confirmation exists');
    console.log('3. If not, create it or use an existing template ID');
    console.log('4. Update CUSTOMER_EMAIL_TEMPLATE_ID in the code');
  }

  // Test with a simple template (for debugging)
  static async testWithSimpleTemplate(): Promise<boolean> {
    try {
      this.initialize();
      
      // Try with a very basic template
      const simpleParams = {
        to_email: 'test@example.com',
        message: 'Test email from Pakasian'
      };

      console.log('🧪 Testing with simple template...');
      
      // Try common template IDs
      const commonTemplateIds = [
        'template_1',
        'template_default',
        'template_basic',
        'template_customer_confirmation'
      ];

      for (const templateId of commonTemplateIds) {
        try {
          console.log(`Testing template: ${templateId}`);
          const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            templateId,
            simpleParams
          );
          console.log(`✅ Template ${templateId} works! Status:`, response.status);
          return true;
        } catch (error: any) {
          console.log(`❌ Template ${templateId} failed:`, error.text);
        }
      }

      console.log('❌ No working templates found');
      return false;
    } catch (error: any) {
      console.error('❌ Simple template test failed:', error);
      return false;
    }
  }
}
