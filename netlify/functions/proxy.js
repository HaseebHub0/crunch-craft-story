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

    // Log the order (in production, you'd send this to your backend)
    console.log('Order received:', {
      orderId: orderData.orderId,
      customerName: orderData.name,
      totalAmount: orderData.totalAmount,
      itemCount: orderData.cart.length
    });

    // For now, we'll simulate a successful order
    // In production, you'd send this to Google Apps Script or your backend
    const response = {
      success: true,
      message: 'Order placed successfully',
      orderId: orderData.orderId,
      estimatedDelivery: '3-5 business days'
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };

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
