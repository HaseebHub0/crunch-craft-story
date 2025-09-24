# EmailJS Template Setup Guide

## Problem
Both emails (customer confirmation and admin notification) are going to the company email instead of the customer getting their confirmation email.

## Solution
You need to create EmailJS templates with proper `to_email` configuration.

## Step-by-Step Setup

### 1. Go to EmailJS Dashboard
Visit: https://dashboard.emailjs.com/admin/templates

### 2. Create Customer Template
Click **"Create New Template"**

**Template Settings:**
- **Template ID**: `template_customer`
- **Template Name**: `Customer Order Confirmation`
- **Subject**: `🎉 Order Confirmed - Pakasian Protein Nimko`

**Important**: In the template content, make sure to include:
```
To: {{to_email}}

Hello {{customer_name}}!

Your order has been confirmed.

Order Details:
- Order ID: {{order_id}}
- Total: {{total_amount}}
- Delivery Address: {{delivery_address}}

Thank you!
```

**Key Point**: The `{{to_email}}` variable will automatically route the email to the customer's email address.

### 3. Create Admin Template
Click **"Create New Template"** again

**Template Settings:**
- **Template ID**: `template_admin_order`
- **Template Name**: `Admin Order Notification`
- **Subject**: `🛍️ New Order - {{order_id}}`

**Template Content:**
```
To: {{to_email}}

New Order Received!

Order ID: {{order_id}}
Customer: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Total: {{total_amount}}

Please process this order.
```

**Key Point**: The `{{to_email}}` variable will route this to the company email.

### 4. Email Routing Explanation

**Customer Email**:
- `to_email: orderData.customerEmail` (sends to customer)
- Template: `template_customer`

**Admin Email**:
- `to_email: 'infopakasian@gmail.com'` (sends to company)
- Template: `template_admin_order`

### 5. Test the Setup

After creating both templates:

1. **Place a test order**
2. **Check console** for success messages
3. **Verify emails**:
   - Customer should receive confirmation email
   - Company should receive order notification

## Common Issues & Fixes

### Issue: Both emails going to company
**Cause**: Missing `to_email` parameter in templates
**Fix**: Add `{{to_email}}` in template content

### Issue: Template not found error
**Cause**: Template IDs don't exist in dashboard
**Fix**: Create templates with exact IDs:
- `template_customer`
- `template_admin_order`

### Issue: Emails not sending
**Cause**: Email service not connected
**Fix**: Check EmailJS dashboard → Email Services → Make sure service is "Connected"

## Template Variables Reference

### Customer Template Variables:
- `{{to_email}}` - Customer's email (auto-filled)
- `{{customer_name}}` - Customer's name
- `{{order_id}}` - Order ID
- `{{total_amount}}` - Total amount
- `{{delivery_address}}` - Delivery address
- `{{items_list}}` - List of items

### Admin Template Variables:
- `{{to_email}}` - Company email (auto-filled)
- `{{order_id}}` - Order ID
- `{{customer_name}}` - Customer's name
- `{{customer_email}}` - Customer's email
- `{{customer_phone}}` - Customer's phone
- `{{total_amount}}` - Total amount

## Quick Test

After setup, you should see in console:
```
✅ Customer confirmation email sent: 200
✅ Admin notification email sent: 200
```

And emails should go to:
- **Customer**: Their email address
- **Company**: infopakasian@gmail.com

## Need Help?

If still having issues:
1. Check EmailJS dashboard for template IDs
2. Verify email service is connected
3. Check console for detailed error messages
4. Make sure templates have `{{to_email}}` variable
