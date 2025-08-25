# Order Integration Documentation

## Overview
This document explains how the frontend checkout system integrates with the Google Apps Script backend for order processing.

## Data Flow

### 1. Frontend (Checkout.tsx)
- User fills out checkout form with shipping information
- Cart items are formatted and included in the order
- Order data is sent to Netlify function endpoint: `/.netlify/functions/proxy`

### 2. Netlify Function (proxy.js)
- Receives order data from frontend
- Forwards data to Google Apps Script endpoint
- Handles CORS and error responses
- Returns structured response to frontend

### 3. Google Apps Script Backend
- Receives order data and stores it in Google Sheets
- Sends email notifications to admin and customer
- Returns success/error response

## Order Data Structure

The frontend sends the following data structure:

```json
{
  "orderId": "ORD-1234567890-abc123def",
  "name": "Customer Name",
  "phone": "03001234567",
  "email": "customer@example.com",
  "address": "Complete address",
  "city": "City Name",
  "pincode": "12345",
  "cart": [
    {
      "id": "product-1",
      "name": "Product Name",
      "price": 1000,
      "weight": "500g",
      "quantity": 2,
      "image": "image-url"
    }
  ],
  "totalAmount": 2000,
  "orderDate": "December 15, 2024 at 02:30 PM"
}
```

## Validation Rules

### Frontend Validation
- **Name**: Minimum 2 characters
- **Phone**: Exactly 11 digits (Pakistan format)
- **Email**: Valid email format
- **Address**: Minimum 10 characters
- **City**: Minimum 2 characters
- **Pincode**: 5-6 digits

### Backend Validation
- All required fields must be present
- Cart must contain valid items
- Order ID must be unique

## Error Handling

### Frontend Errors
- Form validation errors
- Network errors
- Server response errors

### Backend Errors
- Missing required data
- Google Sheets API errors
- Email sending failures

## Success Flow

1. User submits valid form
2. Frontend sends data to Netlify function
3. Netlify function forwards to Google Apps Script
4. Google Apps Script stores order and sends emails
5. Success response returned to frontend
6. Cart cleared and success message shown
7. User redirected to home page

## Testing

To test the integration:

1. Add items to cart
2. Navigate to checkout
3. Fill out form with valid data
4. Submit order
5. Check browser console for order data
6. Verify order appears in Google Sheets
7. Check email notifications

## Troubleshooting

### Common Issues
- **CORS errors**: Check Netlify function headers
- **Network errors**: Verify Google Apps Script URL
- **Validation errors**: Check form data format
- **Email failures**: Verify email configuration in Google Apps Script

### Debug Information
- Check browser console for order data logs
- Verify Netlify function logs
- Check Google Apps Script execution logs
