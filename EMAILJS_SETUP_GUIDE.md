# 📧 EmailJS Setup Guide - Email Notifications

## Overview
Complete email notification system for Pakasian Protein Nimko orders using EmailJS (free service).

## 🎯 What Emails Are Sent

### 1. **Admin Notification Email** (Company)
- **To**: `admin@pakasianfoods.com`
- **When**: New order placed
- **Contains**: Customer details, order items, total amount

### 2. **Customer Confirmation Email**
- **To**: Customer's email
- **When**: Order placed successfully  
- **Contains**: Order confirmation, delivery details, company contact

### 3. **Status Update Email** (Optional)
- **To**: Customer's email
- **When**: Admin updates order status
- **Contains**: Status change notification

## 🚀 EmailJS Setup (Free - 200 emails/month)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com)
2. Sign up for free account
3. Verify your email

### Step 2: Add Email Service
1. Go to **Email Services** tab
2. Click **Add New Service**
3. Choose **Gmail** (recommended)
4. Connect your Gmail account
5. Note the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

#### Template 1: Admin Notification
1. Go to **Email Templates** tab
2. Click **Create New Template**
3. Template Name: `Admin Order Notification`
4. Template ID: `template_admin` (note this)

**Email Template:**
```html
Subject: New Order #{{order_id}} - Pakasian Protein Nimko

Hello {{to_name}},

You have received a new order!

ORDER DETAILS:
- Order ID: {{order_id}}
- Customer: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}
- Address: {{customer_address}}

ITEMS ORDERED:
{{order_items}}

TOTAL AMOUNT: {{total_amount}}
ORDER DATE: {{order_date}}

Please process this order as soon as possible.

Best regards,
Pakasian Order System
```

#### Template 2: Customer Confirmation
1. Create another template
2. Template Name: `Customer Order Confirmation`
3. Template ID: `template_customer`

**Email Template:**
```html
Subject: Order Confirmation #{{order_id}} - {{company_name}}

Dear {{to_name}},

Thank you for your order! We have received your order and will process it shortly.

ORDER DETAILS:
- Order ID: {{order_id}}
- Items: {{order_items}}
- Total: {{total_amount}}
- Order Date: {{order_date}}

DELIVERY ADDRESS:
{{delivery_address}}

ESTIMATED DELIVERY: {{estimated_delivery}}

We will send you another email when your order is shipped.

If you have any questions, please contact us:
- Phone: {{company_phone}}
- Email: {{company_email}}

Thank you for choosing {{company_name}}!

Best regards,
Pakasian Team
```

### Step 4: Get Public Key
1. Go to **Account** tab
2. Copy your **Public Key** (e.g., `user_abc123xyz`)

### Step 5: Add Environment Variables

Create `.env` file in your project root:
```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=service_your_id
REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN=template_admin
REACT_APP_EMAILJS_TEMPLATE_ID_CUSTOMER=template_customer
REACT_APP_EMAILJS_PUBLIC_KEY=user_your_public_key
```

### Step 6: Add to Netlify Environment Variables
1. Go to Netlify Dashboard
2. Site Settings → Environment Variables
3. Add all 4 variables from `.env` file

## 🧪 Testing Email System

### Test Emails:
1. **Place Test Order**: Use your website checkout
2. **Check Console**: Look for email success/error logs
3. **Check Inbox**: 
   - Admin email should arrive at company email
   - Customer email should arrive at customer's email

### Debug Checklist:
- ✅ EmailJS service connected to Gmail
- ✅ Templates created with correct IDs
- ✅ Environment variables set correctly
- ✅ Public key added to Netlify
- ✅ Gmail allows "less secure apps" (if needed)

## 📊 Email Flow

```
Customer Places Order
        ↓
Firebase Order Saved
        ↓
Email Notifications Sent
   ↙            ↘
Admin Email    Customer Email
(Company)      (Confirmation)
```

## 🎨 Customizing Emails

### Admin Email Variables:
- `{{to_name}}` - Admin name
- `{{order_id}}` - Order ID
- `{{customer_name}}` - Customer name
- `{{customer_email}}` - Customer email
- `{{customer_phone}}` - Phone number
- `{{customer_address}}` - Full address
- `{{order_items}}` - List of items
- `{{total_amount}}` - Total price
- `{{order_date}}` - Order date

### Customer Email Variables:
- `{{to_name}}` - Customer name
- `{{order_id}}` - Order ID
- `{{order_items}}` - Items ordered
- `{{total_amount}}` - Total amount
- `{{delivery_address}}` - Delivery address
- `{{estimated_delivery}}` - Delivery time
- `{{company_name}}` - Your company name
- `{{company_phone}}` - Company phone
- `{{company_email}}` - Company email

## 🔧 Advanced Features

### 1. Email Templates with HTML
You can create beautiful HTML email templates:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2 style="color: #d32f2f;">Order Confirmation</h2>
  <p>Dear {{to_name}},</p>
  <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
    <h3>Order #{{order_id}}</h3>
    <p><strong>Total:</strong> {{total_amount}}</p>
  </div>
</div>
```

### 2. Email Attachments
- Add company logo
- Include order receipt PDF
- Attach product images

### 3. Email Analytics
- Track email open rates
- Monitor delivery success
- A/B test email templates

## 📈 Email Limits & Pricing

### Free Plan:
- ✅ 200 emails/month
- ✅ All features included
- ✅ No credit card required

### Paid Plans:
- **$15/month**: 1,000 emails
- **$30/month**: 5,000 emails
- **$50/month**: 15,000 emails

## 🚨 Troubleshooting

### Common Issues:

1. **Emails not sending**
   - Check environment variables
   - Verify EmailJS service is active
   - Check console for error messages

2. **Gmail blocking emails**
   - Enable "Less secure app access"
   - Use App Passwords if 2FA enabled
   - Try different email provider

3. **Template variables not working**
   - Check variable names match exactly
   - Ensure template IDs are correct
   - Test templates in EmailJS dashboard

4. **Emails going to spam**
   - Set up proper sender name
   - Avoid spam trigger words
   - Use company domain email

### Debug Commands:
```javascript
// Check EmailJS configuration
console.log('EmailJS Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
console.log('EmailJS Public Key:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

// Test email sending
EmailService.sendOrderNotifications(testOrderData)
  .then(result => console.log('Email result:', result));
```

## ✅ Success Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Admin template created
- [ ] Customer template created
- [ ] Environment variables added
- [ ] Test emails sent successfully
- [ ] Production deployment updated

## 🎉 Final Result

After setup, your order flow will be:

1. **Customer places order** → Website
2. **Order saved** → Firebase Database  
3. **Admin notified** → Company email
4. **Customer confirmed** → Customer email
5. **Admin manages** → Admin dashboard
6. **Status updates** → Customer email (optional)

**Total setup time: ~15 minutes**
**Monthly cost: FREE (200 emails)**

Your email notification system is now production-ready! 📧✨
