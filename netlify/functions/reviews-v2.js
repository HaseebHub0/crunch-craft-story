const fs = require('fs');
const path = require('path');

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

  try {
    // Path to reviews data file
    const reviewsFilePath = path.join(process.cwd(), 'reviews-data.json');
    
    if (event.httpMethod === 'GET') {
      // Get reviews for a specific product
      const productId = event.queryStringParameters?.productId;
      
      if (!productId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Product ID is required' }),
        };
      }

      try {
        // Try to read the reviews file
        let reviews = [];
        if (fs.existsSync(reviewsFilePath)) {
          const reviewsData = fs.readFileSync(reviewsFilePath, 'utf8');
          reviews = JSON.parse(reviewsData);
        }

        // Filter reviews for the specific product
        const productReviews = reviews.filter(review => review.productId === productId);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            reviews: productReviews,
            totalReviews: productReviews.length,
          }),
        };
      } catch (error) {
        console.error('Error reading reviews:', error);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            reviews: [],
            totalReviews: 0,
          }),
        };
      }
    }

    if (event.httpMethod === 'POST') {
      // Submit a new review
      const reviewData = JSON.parse(event.body);
      
      // Validate required fields
      const requiredFields = ['productId', 'name', 'rating', 'comment'];
      for (const field of requiredFields) {
        if (!reviewData[field]) {
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

      // Validate rating
      if (reviewData.rating < 1 || reviewData.rating > 5) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            error: 'Rating must be between 1 and 5' 
          }),
        };
      }

      try {
        // Read existing reviews
        let reviews = [];
        if (fs.existsSync(reviewsFilePath)) {
          const reviewsData = fs.readFileSync(reviewsFilePath, 'utf8');
          reviews = JSON.parse(reviewsData);
        }

        // Create new review
        const newReview = {
          id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          productId: reviewData.productId,
          name: reviewData.name.trim(),
          rating: parseInt(reviewData.rating),
          comment: reviewData.comment.trim(),
          date: new Date().toISOString(),
        };

        // Add new review to the beginning of the array
        reviews.unshift(newReview);

        // Keep only the latest 100 reviews to avoid file getting too large
        if (reviews.length > 100) {
          reviews = reviews.slice(0, 100);
        }

        // Write back to file
        fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Review submitted successfully',
            review: newReview,
          }),
        };
      } catch (error) {
        console.error('Error saving review:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            success: false, 
            error: 'Failed to save review. Please try again.' 
          }),
        };
      }
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in reviews function:', error);
    
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
