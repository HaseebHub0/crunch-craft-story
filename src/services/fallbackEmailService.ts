// Fallback Email Service - Simple mailto links when EmailJS is not configured

export interface EmailData {
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

export class FallbackEmailService {
  // Generate admin notification email (opens default email client)
  static generateAdminEmail(orderData: EmailData): void {
    const subject = `New Order: ${orderData.orderId} - Pakasian Protein Nimko`;
    
    const body = `
New order received!

ORDER DETAILS:
- Order ID: ${orderData.orderId}
- Customer: ${orderData.customerName}
- Phone: ${orderData.customerPhone}
- Email: ${orderData.customerEmail}
- Address: ${orderData.customerAddress}
- Total Amount: PKR ${orderData.totalAmount.toLocaleString()}

ITEMS ORDERED:
${orderData.items.map(item => 
  `- ${item.name} (${item.quantity}x) - PKR ${item.price.toLocaleString()}`
).join('\n')}

ORDER DATE: ${orderData.orderDate}

Please process this order as soon as possible.

---
Pakasian Order System
    `.trim();

    const mailtoLink = `mailto:admin@pakasianfoods.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    if (typeof window !== 'undefined') {
      window.open(mailtoLink, '_blank');
    }
    
    console.log('📧 Admin email opened in default email client');
  }

  // Generate customer confirmation email
  static generateCustomerEmail(orderData: EmailData): void {
    const subject = `Order Confirmation #${orderData.orderId} - Pakasian Protein Nimko`;
    
    const body = `
Dear ${orderData.customerName},

Thank you for your order! We have received your order and will process it shortly.

ORDER DETAILS:
- Order ID: ${orderData.orderId}
- Items: ${orderData.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}
- Total: PKR ${orderData.totalAmount.toLocaleString()}
- Order Date: ${orderData.orderDate}

DELIVERY ADDRESS:
${orderData.customerAddress}

ESTIMATED DELIVERY: 3-5 business days

We will contact you when your order is shipped.

If you have any questions, please contact us:
- Phone: +92 300 1234567
- Email: info@pakasianfoods.com

Thank you for choosing Pakasian Protein Nimko!

Best regards,
Pakasian Team
    `.trim();

    const mailtoLink = `mailto:${orderData.customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Copy email content to clipboard as backup
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`To: ${orderData.customerEmail}\nSubject: ${subject}\n\n${body}`);
      console.log('📧 Customer email content copied to clipboard');
    }
    
    console.log('📧 Customer email prepared (copy from clipboard to send)');
    alert(`Customer email content copied to clipboard!\n\nTo: ${orderData.customerEmail}\nSubject: ${subject}\n\nPlease paste and send manually.`);
  }

  // Send both notifications
  static sendOrderNotifications(orderData: EmailData): {
    adminEmailSent: boolean;
    customerEmailSent: boolean;
  } {
    console.log('📧 Using fallback email service (EmailJS not configured)');
    
    try {
      // Generate admin email
      this.generateAdminEmail(orderData);
      
      // Generate customer email  
      this.generateCustomerEmail(orderData);
      
      return {
        adminEmailSent: true,
        customerEmailSent: true
      };
    } catch (error) {
      console.error('Fallback email service error:', error);
      return {
        adminEmailSent: false,
        customerEmailSent: false
      };
    }
  }

  // Generate WhatsApp message for customer
  static sendWhatsAppNotification(orderData: EmailData): void {
    const message = `
Hello ${orderData.customerName}! 

Your order #${orderData.orderId} from Pakasian Protein Nimko has been confirmed.

Order Details:
${orderData.items.map(item => `• ${item.name} (${item.quantity}x)`).join('\n')}

Total: PKR ${orderData.totalAmount.toLocaleString()}
Estimated Delivery: 3-5 business days

We will contact you soon to confirm delivery details.

Thank you for your order! 🙏

- Pakasian Team
    `.trim();

    // Clean phone number (remove non-digits)
    const cleanPhone = orderData.customerPhone.replace(/\D/g, '');
    
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
    
    console.log('📱 WhatsApp message opened for customer:', orderData.customerName);
  }
}
