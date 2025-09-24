# Email Notification System Setup Guide

## Overview
This guide will help you set up the email notification system for Pakasian Protein Nimko orders. The system uses EmailJS to send automated emails to both customers and admin when an order is placed.

## Features
- ✅ **Customer Email Confirmation**: Beautiful HTML email with order details
- ✅ **Admin Email Notification**: Detailed order information for processing
- ✅ **Automatic Sending**: Emails sent automatically on order placement
- ✅ **Professional Templates**: Branded email templates with company information
- ✅ **Error Handling**: Graceful handling of email failures

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail**: Most common choice
   - **Outlook**: Microsoft accounts
   - **Yahoo**: Yahoo Mail
   - **Custom SMTP**: For custom email servers

### Step 3: Configure Email Service
1. **Gmail Setup**:
   - Service ID: `gmail`
   - Connect your Gmail account
   - Allow EmailJS to send emails on your behalf

2. **Outlook Setup**:
   - Service ID: `outlook`
   - Connect your Outlook account
   - Authorize EmailJS

### Step 4: Create Email Templates

#### Customer Confirmation Template
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Template ID: `template_customer_confirmation`
4. Subject: `🎉 Order Confirmed - Pakasian Protein Nimko`
5. Content: Use the HTML template from `src/config/emailTemplates.ts`

#### Admin Notification Template
1. Create another template
2. Template ID: `template_admin_order`
3. Subject: `🛍️ New Order Received - Order #{{order_id}}`
4. Content: Use the admin HTML template from `src/config/emailTemplates.ts`

### Step 5: Get Your Keys
1. Go to **Account** → **General**
2. Copy your **Public Key**
3. Note your **Service ID**

### Step 6: Update Configuration
Update `src/config/emailTemplates.ts`:

```typescript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id_here', // Replace with your EmailJS service ID
  PUBLIC_KEY: 'your_public_key_here', // Replace with your EmailJS public key
  CUSTOMER_TEMPLATE_ID: 'template_customer_confirmation',
  ADMIN_TEMPLATE_ID: 'template_admin_order',
  
  // Update these with your actual details
  ADMIN_EMAIL: 'admin@pakasianfoods.com',
  COMPANY_EMAIL: 'info@pakasianfoods.com',
  COMPANY_PHONE: '+92 300 1234567',
  WEBSITE_URL: 'https://pakasianshop.com',
  COMPANY_NAME: 'Pakasian Protein Nimko'
};
```

### Step 7: Test the System
1. Place a test order on your website
2. Check both customer and admin emails
3. Verify email templates display correctly

## Email Templates Variables

### Customer Email Variables:
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email address
- `{{order_id}}` - Unique order ID
- `{{order_date}}` - Order placement date
- `{{items_list}}` - Formatted list of ordered items
- `{{total_amount}}` - Total order amount
- `{{delivery_address}}` - Customer's delivery address
- `{{estimated_delivery}}` - Estimated delivery time
- `{{company_name}}` - Your company name
- `{{company_email}}` - Your company email
- `{{company_phone}}` - Your company phone
- `{{website_url}}` - Your website URL

### Admin Email Variables:
- `{{order_id}}` - Unique order ID
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email address
- `{{customer_phone}}` - Customer's phone number
- `{{customer_address}}` - Customer's delivery address
- `{{order_date}}` - Order placement date
- `{{items_list}}` - Formatted list of ordered items
- `{{total_amount}}` - Total order amount
- `{{admin_email}}` - Admin email address
- `{{company_name}}` - Your company name

## Troubleshooting

### Common Issues:

1. **Emails not sending**:
   - Check EmailJS service configuration
   - Verify public key is correct
   - Check browser console for errors

2. **Template variables not working**:
   - Ensure template variables match exactly
   - Check for typos in variable names
   - Verify template is saved in EmailJS dashboard

3. **Gmail authentication issues**:
   - Re-authorize Gmail service in EmailJS
   - Check if 2FA is enabled (may need app password)

4. **Rate limiting**:
   - Free EmailJS accounts have sending limits
   - Consider upgrading for higher volume

## EmailJS Pricing
- **Free Plan**: 200 emails/month
- **Paid Plans**: Start from $15/month for 1,000 emails

## Security Notes
- Never commit your EmailJS public key to public repositories
- Use environment variables for production
- Regularly rotate your keys
- Monitor email sending logs

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

## Next Steps
1. Set up your EmailJS account
2. Configure the email templates
3. Update the configuration file
4. Test with a real order
5. Monitor email delivery success rates

---

**Note**: This system works alongside the existing WhatsApp notifications. Both systems will run in parallel for maximum reach.
