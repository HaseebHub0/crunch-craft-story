// Simple WhatsApp notification service

export interface WhatsAppOrderData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export class WhatsAppService {
  // Send WhatsApp message to customer
  static sendOrderConfirmation(orderData: WhatsAppOrderData): void {
    const message = `
🎉 *Order Confirmed!*

Hello ${orderData.customerName}!

Your order has been confirmed:

*Order ID:* ${orderData.orderId}

*Items:*
${orderData.items.map(item => 
  `• ${item.name} (${item.quantity}x) - PKR ${item.price.toLocaleString()}`
).join('\n')}

*Total:* PKR ${orderData.totalAmount.toLocaleString()}

*Delivery Address:* ${orderData.customerAddress}

*Estimated Delivery:* 3-5 business days

Thank you for choosing Pakasian Protein Nimko! 🙏

For any queries, contact us at:
📞 +92 301 9671010
📧 infopakasian@gmail.com

- Pakasian Team
    `.trim();

    // Clean phone number (remove non-digits and ensure Pakistan format)
    let cleanPhone = orderData.customerPhone.replace(/\D/g, '');
    
    // Add Pakistan country code if not present
    if (!cleanPhone.startsWith('92') && cleanPhone.length === 11) {
      cleanPhone = '92' + cleanPhone.substring(1);
    }
    
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
    
    console.log('📱 WhatsApp message sent to customer:', orderData.customerName);
  }

  // Admin notification via WhatsApp (to admin number)
  static sendAdminNotification(orderData: WhatsAppOrderData): void {
  const adminPhone = '923019671010'; // admin WhatsApp number (new)
    
    const message = `
🛍️ *New Order Received!*

*Order ID:* ${orderData.orderId}
*Customer:* ${orderData.customerName}
*Phone:* ${orderData.customerPhone}
*Address:* ${orderData.customerAddress}

*Items:*
${orderData.items.map(item => 
  `• ${item.name} (${item.quantity}x) - PKR ${item.price.toLocaleString()}`
).join('\n')}

*Total:* PKR ${orderData.totalAmount.toLocaleString()}

Please process this order ASAP! 🚀

- Pakasian Order System
    `.trim();

    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
    
    console.log('📱 Admin WhatsApp notification sent');
  }
}
