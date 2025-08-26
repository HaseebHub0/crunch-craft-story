# Product Review System

A comprehensive product review system for React applications with Google Apps Script backend integration.

## Features

### ✨ Frontend Features
- **Interactive Star Rating System**: Clickable star ratings with hover effects
- **Review Form**: Clean, validated form for submitting reviews
- **Reviews Display**: Beautiful, animated list of customer reviews
- **Average Rating Calculation**: Automatic calculation and display of average ratings
- **Responsive Design**: Mobile-friendly interface with smooth animations
- **Form Validation**: Client-side validation using Zod schema
- **Toast Notifications**: User feedback for form submissions

### 🔧 Backend Features
- **Google Apps Script Integration**: Serverless backend using Google Sheets
- **RESTful API**: Clean endpoints for submitting and retrieving reviews
- **Data Validation**: Server-side validation of review data
- **Automatic Timestamps**: Automatic date and timestamp generation
- **Error Handling**: Comprehensive error handling and user feedback

## Architecture

```
Frontend (React) ←→ Google Apps Script ←→ Google Sheets
     ↓                    ↓                    ↓
  Components         API Endpoints      Data Storage
  - ReviewForm       - POST /           - Reviews Table
  - ReviewsList      - GET /?productId  - Product Data
  - StarRating       - Error Handling   - Timestamps
```

## Components

### 1. ReviewForm (`src/components/ReviewForm.tsx`)
- Interactive star rating selection
- Form validation using Zod
- Error handling and user feedback
- Responsive design with animations

### 2. ReviewsList (`src/components/ReviewsList.tsx`)
- Displays all reviews for a product
- Loading states and empty states
- Animated review cards
- Sorted by newest first

### 3. StarRating (`src/components/StarRating.tsx`)
- Reusable star rating component
- Multiple sizes (sm, md, lg)
- Optional score display
- Consistent styling across the app

### 4. ProductDetail (`src/pages/ProductDetail.tsx`)
- Product information display
- Integrated review system
- Navigation and cart integration
- Responsive layout

## Setup Instructions

### 1. Frontend Setup

1. **Install Dependencies** (already included in your project):
   ```bash
   npm install react-hook-form @hookform/resolvers zod sonner
   ```

2. **Update Configuration**:
   - Edit `src/config/api.ts`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your actual URL

3. **Add Routes**:
   - The route `/product/:productId` is already added to `App.tsx`

### 2. Backend Setup

1. **Create Google Sheet**:
   - Create a new spreadsheet called `ProductReviews`
   - Set up columns: ID, ProductID, Name, Rating, Comment, Date, Timestamp

2. **Create Google Apps Script**:
   - Follow the detailed guide in `GOOGLE_APPS_SCRIPT_SETUP.md`
   - Deploy as a web app
   - Copy the web app URL

3. **Update Frontend Config**:
   - Replace the placeholder URL in `src/config/api.ts`

## Usage

### Adding Reviews
1. Navigate to a product detail page (`/product/:productId`)
2. Scroll down to the "Customer Reviews" section
3. Click on stars to select rating (1-5)
4. Fill in your name and comment
5. Click "Submit Review"

### Viewing Reviews
- Reviews are automatically loaded when visiting a product page
- Reviews are sorted by newest first
- Average rating is calculated and displayed
- Star ratings are visually represented

## API Endpoints

### Submit Review
```
POST / (Google Apps Script Web App URL)
Content-Type: application/json

{
  "productId": "string",
  "name": "string",
  "rating": number (1-5),
  "comment": "string",
  "date": "ISO string"
}
```

### Get Reviews
```
GET /?productId=XXX
Response: { "success": true, "reviews": [...] }
```

## Configuration

### Environment Variables
```bash
# Optional: Set in .env file
REACT_APP_REVIEWS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### API Configuration (`src/config/api.ts`)
```typescript
export const API_CONFIG = {
  TIMEOUT: 10000,           // Request timeout
  MAX_RETRIES: 3,           // Retry attempts
  DEFAULT_HEADERS: { ... }  // Default headers
};
```

## Customization

### Styling
- All components use Tailwind CSS classes
- Custom colors can be modified in `tailwind.config.ts`
- Animations use Framer Motion for smooth transitions

### Validation Rules
- Rating: Required, 1-5 range
- Name: Required, minimum 1 character
- Comment: Required, maximum 500 characters

### Adding New Fields
1. Update the Zod schema in `ReviewForm.tsx`
2. Add the field to the Google Sheet
3. Update the Google Apps Script code
4. Modify the Review interface

## Error Handling

### Frontend Errors
- Form validation errors (displayed inline)
- Network errors (toast notifications)
- Server errors (user-friendly messages)

### Backend Errors
- Missing required fields
- Invalid rating range
- Spreadsheet access issues
- JSON parsing errors

## Performance Considerations

### Frontend
- Lazy loading of review components
- Debounced form submissions
- Optimized re-renders with React hooks

### Backend
- Efficient Google Sheets queries
- Minimal data transfer
- Caching considerations for high-traffic sites

## Security

### Current Implementation
- Basic input validation
- No authentication (public access)
- CORS handled by Google Apps Script

### Production Recommendations
- Add rate limiting
- Implement user authentication
- Add CAPTCHA for review submissions
- Validate user permissions

## Testing

### Manual Testing
1. Submit a review with valid data
2. Test form validation with invalid data
3. Verify reviews appear in Google Sheet
4. Check review retrieval on product pages

### Automated Testing
- Unit tests for components
- Integration tests for API calls
- E2E tests for complete user flows

## Troubleshooting

### Common Issues

1. **Reviews not loading**:
   - Check Google Apps Script URL in config
   - Verify spreadsheet permissions
   - Check browser console for errors

2. **Form submission fails**:
   - Verify all required fields are filled
   - Check network connectivity
   - Review Google Apps Script logs

3. **CORS errors**:
   - Ensure Google Apps Script is deployed as web app
   - Check access permissions in deployment settings

### Debug Steps
1. Check browser console for errors
2. Verify Google Apps Script execution logs
3. Test API endpoints directly
4. Check spreadsheet permissions and structure

## Future Enhancements

### Planned Features
- Review moderation system
- Review helpfulness voting
- Review photo attachments
- Review analytics dashboard
- Email notifications for new reviews

### Technical Improvements
- Implement caching layer
- Add review search and filtering
- Optimize for large review datasets
- Add review export functionality

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Google Apps Script logs
3. Verify configuration settings
4. Test with minimal data

## License

This review system is part of your existing project and follows the same license terms.
