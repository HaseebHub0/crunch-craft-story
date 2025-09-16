exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only handle POST requests for orders
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the order data
    const orderData = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['orderId', 'name', 'phone', 'email', 'address', 'city', 'cart', 'totalAmount'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            error: `Missing required field: ${field}` 
          }),
        };
      }
    }

    // Google Apps Script Web App URL
    // Replace this with your actual Google Apps Script URL
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    console.log('Sending order to Google Sheets:', {
      orderId: orderData.orderId,
      customerName: orderData.name,
      totalAmount: orderData.totalAmount,
      itemCount: orderData.cart.length
    });

    // Send data to Google Apps Script
    try {
      const gasResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!gasResponse.ok) {
        throw new Error(`Google Apps Script error: ${gasResponse.status}`);
      }

      const gasResult = await gasResponse.json();
      console.log('Google Apps Script response:', gasResult);

      if (!gasResult.success) {
        throw new Error(gasResult.message || 'Failed to save to Google Sheets');
      }

      // Return success response
      const response = {
        success: true,
        message: 'Order placed successfully and saved to Google Sheets',
        orderId: orderData.orderId,
        estimatedDelivery: '3-5 business days',
        sheetRowId: gasResult.rowId || null
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response),
      };

    } catch (gasError) {
      console.error('Google Apps Script error:', gasError);
      
      // Even if Google Sheets fails, we can still process the order
      const response = {
        success: true,
        message: 'Order placed successfully (Google Sheets update failed)',
        orderId: orderData.orderId,
        estimatedDelivery: '3-5 business days',
        warning: 'Order data could not be saved to Google Sheets'
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response),
      };
    }

  } catch (error) {
    console.error('Error processing order:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      }),
    };
  }
};
