// Email template configurations for EmailJS

export const EMAIL_TEMPLATES = {
  // Customer order confirmation template
  CUSTOMER_CONFIRMATION: {
    subject: '🎉 Order Confirmed - Pakasian Protein Nimko',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Pakasian Protein Nimko</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .content { padding: 30px; }
          .order-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .order-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .order-item:last-child { border-bottom: none; }
          .total { background: #dc2626; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
          .contact-info { background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .btn { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for choosing Pakasian Protein Nimko</p>
          </div>
          
          <div class="content">
            <h2>Hello {{customer_name}}!</h2>
            <p>Your order has been successfully confirmed. We're excited to prepare your delicious protein nimko!</p>
            
            <div class="order-info">
              <h3>📋 Order Details</h3>
              <p><strong>Order ID:</strong> {{order_id}}</p>
              <p><strong>Order Date:</strong> {{order_date}}</p>
              <p><strong>Estimated Delivery:</strong> {{estimated_delivery}}</p>
            </div>
            
            <div class="order-info">
              <h3>🛍️ Items Ordered</h3>
              {{items_list}}
            </div>
            
            <div class="total">
              Total Amount: {{total_amount}}
            </div>
            
            <div class="order-info">
              <h3>📍 Delivery Address</h3>
              <p>{{delivery_address}}</p>
            </div>
            
            <div class="contact-info">
              <h3>📞 Need Help?</h3>
              <p>For any queries or concerns, please contact us:</p>
              <p><strong>Phone:</strong> {{company_phone}}</p>
              <p><strong>Email:</strong> {{company_email}}</p>
              <p><strong>Website:</strong> <a href="{{website_url}}">{{website_url}}</a></p>
            </div>
            
            <p style="text-align: center;">
              <a href="{{website_url}}" class="btn">Visit Our Website</a>
            </p>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing Pakasian Protein Nimko!</p>
            <p>Best regards,<br>The Pakasian Team</p>
            <p><small>This is an automated email. Please do not reply to this email.</small></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      🎉 Order Confirmed - Pakasian Protein Nimko
      
      Hello {{customer_name}}!
      
      Your order has been successfully confirmed.
      
      Order Details:
      - Order ID: {{order_id}}
      - Order Date: {{order_date}}
      - Estimated Delivery: {{estimated_delivery}}
      
      Items Ordered:
      {{items_list}}
      
      Total Amount: {{total_amount}}
      
      Delivery Address:
      {{delivery_address}}
      
      Need Help?
      Phone: {{company_phone}}
      Email: {{company_email}}
      Website: {{website_url}}
      
      Thank you for choosing Pakasian Protein Nimko!
      Best regards,
      The Pakasian Team
    `
  },

  // Admin order notification template
  ADMIN_NOTIFICATION: {
    subject: '🛍️ New Order Received - Order #{{order_id}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order - {{order_id}}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 700px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .content { padding: 30px; }
          .order-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .order-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .order-item:last-child { border-bottom: none; }
          .total { background: #059669; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; }
          .customer-info { background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛍️ New Order Received!</h1>
            <p>Order #{{order_id}} - {{company_name}}</p>
          </div>
          
          <div class="content">
            <div class="urgent">
              <h3>⚠️ Action Required</h3>
              <p>A new order has been placed and requires processing. Please review the details below and prepare the order for delivery.</p>
            </div>
            
            <div class="order-info">
              <h3>📋 Order Information</h3>
              <p><strong>Order ID:</strong> {{order_id}}</p>
              <p><strong>Order Date:</strong> {{order_date}}</p>
              <p><strong>Total Amount:</strong> {{total_amount}}</p>
            </div>
            
            <div class="customer-info">
              <h3>👤 Customer Details</h3>
              <p><strong>Name:</strong> {{customer_name}}</p>
              <p><strong>Email:</strong> {{customer_email}}</p>
              <p><strong>Phone:</strong> {{customer_phone}}</p>
              <p><strong>Delivery Address:</strong> {{customer_address}}</p>
            </div>
            
            <div class="order-info">
              <h3>🛍️ Items Ordered</h3>
              {{items_list}}
            </div>
            
            <div class="total">
              Total Amount: {{total_amount}}
            </div>
            
            <div class="urgent">
              <h3>📝 Next Steps</h3>
              <ol>
                <li>Review order details</li>
                <li>Prepare items for packaging</li>
                <li>Contact customer if needed</li>
                <li>Arrange delivery</li>
                <li>Update order status in admin dashboard</li>
              </ol>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from the Pakasian Order System.</p>
            <p><strong>Admin Email:</strong> {{admin_email}}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      🛍️ New Order Received - Order #{{order_id}}
      
      A new order has been placed and requires processing.
      
      Order Information:
      - Order ID: {{order_id}}
      - Order Date: {{order_date}}
      - Total Amount: {{total_amount}}
      
      Customer Details:
      - Name: {{customer_name}}
      - Email: {{customer_email}}
      - Phone: {{customer_phone}}
      - Delivery Address: {{customer_address}}
      
      Items Ordered:
      {{items_list}}
      
      Total Amount: {{total_amount}}
      
      Next Steps:
      1. Review order details
      2. Prepare items for packaging
      3. Contact customer if needed
      4. Arrange delivery
      5. Update order status in admin dashboard
      
      This is an automated notification from the Pakasian Order System.
      Admin Email: {{admin_email}}
    `
  }
};

export const EMAIL_CONFIG = {
  // EmailJS service configuration
  SERVICE_ID: 'service_pakasian',
  PUBLIC_KEY: 'your_public_key_here',
  
  // Template IDs
  CUSTOMER_TEMPLATE_ID: 'template_customer_confirmation',
  ADMIN_TEMPLATE_ID: 'template_admin_order',
  
  // Email addresses
  ADMIN_EMAIL: 'admin@pakasianfoods.com',
  COMPANY_EMAIL: 'info@pakasianfoods.com',
  COMPANY_PHONE: '+92 300 1234567',
  WEBSITE_URL: 'https://pakasianshop.com',
  COMPANY_NAME: 'Pakasian Protein Nimko'
};
