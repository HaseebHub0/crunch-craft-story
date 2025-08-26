# CORS Issue Fix Guide

## Problem
Your website is experiencing CORS (Cross-Origin Resource Sharing) errors when trying to submit reviews to the Google Apps Script. The error occurs because:

1. The frontend is trying to call the Google Apps Script directly
2. Google Apps Script doesn't have CORS headers configured
3. The Netlify function proxy isn't properly deployed

## Solution
We've implemented a multi-layered solution:

### 1. Netlify Function Proxy
Created a `reviews.js` function in `.netlify/functions-internal/` that:
- Acts as a proxy between your frontend and Google Apps Script
- Handles CORS headers properly
- Supports both GET and POST requests
- Provides fallback error handling

### 2. Updated API Configuration
- Modified `src/config/api.ts` to use the Netlify function endpoint
- Added better error messages for CORS issues
- Increased timeout for better reliability

### 3. Enhanced ReviewForm Component
- Added fallback mechanism to demo data if API fails
- Better error handling and user feedback
- Graceful degradation when server is unavailable

### 4. CORS Headers in netlify.toml
- Added proper CORS headers to the Netlify configuration
- Ensures all requests are handled with proper CORS support

## Deployment Steps

### Option 1: Automatic Deployment
```bash
npm run deploy
```

### Option 2: Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify
npm run deploy:functions
```

### Option 3: Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## Testing the Fix

1. **Deploy the functions** using one of the methods above
2. **Test the review submission** on your website
3. **Check the browser console** for any remaining errors
4. **Verify the Netlify function logs** in your Netlify dashboard

## Fallback Mechanism

If the API still fails after deployment:
1. Users will see a prompt asking if they want to save reviews locally
2. Reviews will be stored in demo mode using localStorage
3. The site continues to function without the backend

## Troubleshooting

### Function Not Found (404)
- Ensure the function is properly deployed
- Check the `.netlify/functions/` directory
- Verify the function name matches the API endpoint

### CORS Still Blocking
- Check that the function is returning proper CORS headers
- Verify the netlify.toml configuration
- Ensure the function is accessible at the correct URL

### Google Apps Script Issues
- Verify the Google Apps Script URL is correct
- Check that the script is published and accessible
- Ensure the script can handle the data format you're sending

## File Structure
```
.netlify/
├── functions-internal/
│   ├── reviews.js          # Main reviews function
│   └── proxy.js            # Order proxy function
├── functions/
│   ├── reviews.zip         # Compiled function
│   └── proxy.zip           # Compiled proxy
└── netlify.toml            # Netlify configuration

src/
├── components/
│   └── ReviewForm.tsx      # Updated with fallback
├── config/
│   └── api.ts              # Updated API configuration
└── hooks/
    └── useReviews.ts       # Uses correct endpoints
```

## Next Steps

1. **Deploy the functions** using the provided scripts
2. **Test the review system** thoroughly
3. **Monitor the Netlify function logs** for any issues
4. **Consider implementing** a more robust error handling system
5. **Add monitoring** for the Google Apps Script integration

## Support

If you continue to experience issues:
1. Check the Netlify function logs in your dashboard
2. Verify the Google Apps Script is working independently
3. Test the function locally using Netlify CLI
4. Consider using the fallback demo mode for immediate functionality
