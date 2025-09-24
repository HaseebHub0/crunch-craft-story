# EmailJS 400 Error Troubleshooting Guide

## Current Issue
You're getting a 400 error when trying to send emails through EmailJS. This is a common configuration issue.

## Most Common Causes & Solutions

### 1. ❌ Template IDs Don't Exist
**Problem**: The template IDs `template_customer_confirmation` and `template_admin_order` don't exist in your EmailJS dashboard.

**Solution**:
1. Go to your EmailJS dashboard → **Email Templates**
2. Check if these templates exist:
   - `template_customer_confirmation`
   - `template_admin_order`
3. If they don't exist, create them or use existing template IDs

### 2. ❌ Wrong Service ID
**Problem**: Service ID `service_27ga57j` might not be correct.

**Solution**:
1. Go to EmailJS dashboard → **Email Services**
2. Copy the correct Service ID
3. Update `src/services/emailService.ts`:
   ```typescript
   const EMAILJS_SERVICE_ID = "your_actual_service_id";
   ```

### 3. ❌ Email Service Not Connected
**Problem**: Your email service (Gmail/Outlook) is not properly connected.

**Solution**:
1. Go to EmailJS dashboard → **Email Services**
2. Make sure your email service shows "Connected" status
3. If not connected, reconnect it

### 4. ❌ Template Variables Don't Match
**Problem**: Template variables in your EmailJS templates don't match the ones being sent.

**Solution**:
1. Check your EmailJS templates
2. Make sure these variables exist in your templates:
   - `{{customer_name}}`
   - `{{order_id}}`
   - `{{items_list}}`
   - etc.

## Quick Fix Steps

### Step 1: Check Your EmailJS Dashboard
1. Login to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Go to **Email Services** - verify your service is connected
3. Go to **Email Templates** - check if templates exist
4. Copy the correct IDs

### Step 2: Update Configuration
Update `src/services/emailService.ts` with correct IDs:

```typescript
// Replace with your actual IDs from EmailJS dashboard
const EMAILJS_SERVICE_ID = "your_service_id";
const CUSTOMER_EMAIL_TEMPLATE_ID = "your_customer_template_id";
const ADMIN_EMAIL_TEMPLATE_ID = "your_admin_template_id";
```

### Step 3: Create Templates (If Missing)
If templates don't exist, create them in EmailJS dashboard:

#### Customer Template:
- **Template ID**: `template_customer_confirmation`
- **Subject**: `Order Confirmed - Pakasian Protein Nimko`
- **Content**: Simple text for now:
  ```
  Hello {{customer_name}}!
  
  Your order {{order_id}} has been confirmed.
  Total: {{total_amount}}
  
  Thank you!
  ```

#### Admin Template:
- **Template ID**: `template_admin_order`
- **Subject**: `New Order - {{order_id}}`
- **Content**: Simple text for now:
  ```
  New Order Received!
  
  Order ID: {{order_id}}
  Customer: {{customer_name}}
  Total: {{total_amount}}
  ```

### Step 4: Test Again
1. Place a test order
2. Check browser console for debug information
3. Look for the debug logs showing the exact parameters being sent

## Debug Information
The updated code now shows detailed debug information in the console. Look for:
- 🔍 Debug logs showing service ID, template ID, and parameters
- ❌ Error details with status and text
- Configuration debug information

## Alternative: Use Simple Templates First
If you're still having issues, create very simple templates first:

### Minimal Customer Template:
```
Subject: Order Confirmed
Body: Hello {{customer_name}}, your order {{order_id}} is confirmed.
```

### Minimal Admin Template:
```
Subject: New Order
Body: New order {{order_id}} from {{customer_name}}.
```

## Still Having Issues?
1. Check EmailJS dashboard for any error messages
2. Verify your email service connection
3. Try creating a completely new template with a simple ID like `template_1`
4. Check if your EmailJS account has any restrictions

## Need Help?
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- Check EmailJS dashboard for detailed error logs
