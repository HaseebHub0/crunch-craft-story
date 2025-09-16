# 📊 Facebook Pixel Tracking Guide

## Overview
Complete Facebook Pixel (Meta Pixel) implementation for Pakasian Protein Nimko website with comprehensive conversion tracking.

## ✅ What's Implemented

### **Pixel ID**: `1716548252372656`

### **Tracking Events**:
- ✅ **PageView** - Automatic on all pages
- ✅ **ViewContent** - Product and page views
- ✅ **AddToCart** - When items added to cart
- ✅ **InitiateCheckout** - When checkout starts
- ✅ **Purchase** - When order completes (most important!)
- ✅ **CompleteRegistration** - Order form completion
- ✅ **Lead** - Interest tracking
- ✅ **Contact** - Contact form submissions

## 🎯 Tracking Implementation

### **1. Automatic Tracking**
```javascript
// Page views tracked automatically
fbq('track', 'PageView');
```

### **2. Product Page Tracking**
```javascript
// When user views products page
FacebookPixelService.trackViewContent('Products Page', 'Food & Beverage');

// When user views specific product
FacebookPixelService.trackProductView('Pakasian Protein Nimko', 1399);
```

### **3. Add to Cart Tracking**
```javascript
// When user adds item to cart
FacebookPixelService.trackAddToCart('Pakasian Protein Nimko', 1399, 1);
```

### **4. Checkout Tracking**
```javascript
// When user starts checkout
FacebookPixelService.trackInitiateCheckout(totalAmount, itemCount);

// When order is completed
FacebookPixelService.trackPurchase(orderId, totalAmount, items);
```

## 📈 Conversion Events Tracked

### **Standard Events**:
1. **PageView** 📄
   - **When**: Every page load
   - **Purpose**: Track website traffic

2. **ViewContent** 👁️
   - **When**: Product pages, important content
   - **Purpose**: Track user interest

3. **AddToCart** 🛒
   - **When**: Item added to cart
   - **Purpose**: Track purchase intent

4. **InitiateCheckout** 💳
   - **When**: Checkout form opened
   - **Purpose**: Track conversion funnel

5. **Purchase** ✅
   - **When**: Order completed successfully
   - **Purpose**: Track actual conversions
   - **Value**: Order total amount
   - **Currency**: PKR

6. **CompleteRegistration** 📋
   - **When**: Order form submitted
   - **Purpose**: Track form completions

### **Custom Events**:
- **Lead** - Interest in products
- **Contact** - Contact form submissions
- **Search** - Product searches

## 🔍 Facebook Ads Manager Integration

### **Conversion Tracking**:
1. **Purchase Events** - Track actual sales
2. **Add to Cart** - Track purchase intent
3. **Page Views** - Track website traffic
4. **Value-based Optimization** - Optimize for high-value customers

### **Audience Creation**:
- **Website Visitors** - All PageView events
- **Product Viewers** - ViewContent events
- **Cart Abandoners** - AddToCart but no Purchase
- **Purchasers** - Purchase events
- **High-Value Customers** - Purchase events with high value

### **Campaign Optimization**:
- **Conversion Campaigns** - Optimize for Purchase events
- **Traffic Campaigns** - Optimize for PageView events
- **Engagement Campaigns** - Optimize for ViewContent events

## 💰 E-commerce Tracking

### **Purchase Event Data**:
```javascript
{
  value: 1399,              // Order total
  currency: 'PKR',          // Pakistani Rupees
  content_type: 'product',  // Product type
  order_id: 'ORD-123456',  // Unique order ID
  contents: [               // Items purchased
    {
      id: 'item-0',
      quantity: 1,
      item_price: 1399
    }
  ],
  num_items: 1              // Total quantity
}
```

### **Revenue Attribution**:
- Track revenue per ad campaign
- Calculate Return on Ad Spend (ROAS)
- Optimize for high-value customers
- Track lifetime customer value

## 🎯 Marketing Optimization

### **1. Retargeting Campaigns**
```javascript
// Target users who viewed products but didn't buy
Audience: ViewContent AND NOT Purchase (last 30 days)

// Target cart abandoners
Audience: AddToCart AND NOT Purchase (last 7 days)

// Target previous customers
Audience: Purchase (last 180 days)
```

### **2. Lookalike Audiences**
```javascript
// Create lookalike of purchasers
Source: Purchase events (last 180 days)
Size: 1% of Pakistan population

// Create lookalike of high-value customers
Source: Purchase events with value > 2000 PKR
```

### **3. Campaign Optimization**
```javascript
// Optimize for purchases
Objective: Conversions
Optimization Event: Purchase
Bid Strategy: Lowest Cost with Bid Cap

// Optimize for value
Objective: Conversions
Optimization Event: Purchase (Value)
Bid Strategy: Value-based bidding
```

## 📊 Analytics & Reporting

### **Facebook Analytics Dashboard**:
1. **Events Manager** - View all tracked events
2. **Pixel Overview** - Traffic and conversion metrics
3. **Attribution** - Cross-device conversion tracking
4. **Audience Insights** - Customer behavior analysis

### **Key Metrics to Monitor**:
- **Purchase Events** - Total conversions
- **Purchase Value** - Total revenue
- **Cost Per Purchase** - Acquisition cost
- **Return on Ad Spend (ROAS)** - Revenue/Ad Spend
- **Conversion Rate** - Purchases/Visitors

### **Custom Conversions**:
Create custom conversions for specific goals:
- **High-Value Orders** - Purchases > 2000 PKR
- **Repeat Customers** - Multiple purchases
- **Cart Completion** - AddToCart → Purchase

## 🛠️ Technical Implementation

### **Service Class Usage**:
```javascript
import { FacebookPixelService } from '../services/facebookPixelService';

// Track product view
FacebookPixelService.trackProductView('Protein Nimko', 1399);

// Track add to cart
FacebookPixelService.trackAddToCart('Protein Nimko', 1399, 2);

// Track purchase
FacebookPixelService.trackPurchase('ORD-123', 2798, [
  { name: 'Protein Nimko', quantity: 2, price: 1399 }
]);
```

### **Event Parameters**:
All events include:
- **value** - Monetary value in PKR
- **currency** - 'PKR'
- **content_type** - 'product'
- **content_name** - Product/page name
- **content_category** - 'Food & Beverage'

## 🔧 Testing & Debugging

### **Facebook Pixel Helper**:
1. Install **Facebook Pixel Helper** Chrome extension
2. Visit your website
3. Check for:
   - ✅ Pixel fires correctly
   - ✅ Events trigger properly
   - ✅ Parameters pass correctly

### **Events Manager Testing**:
1. Go to **Events Manager** in Facebook
2. Select your Pixel
3. Use **Test Events** tool
4. Perform actions on website
5. Verify events appear in real-time

### **Debug Console**:
```javascript
// Check if pixel is loaded
console.log('Pixel loaded:', FacebookPixelService.isLoaded());

// Check events in browser console
// Events are logged automatically with 📊 prefix
```

## 🎯 Advanced Features

### **1. Dynamic Product Ads**:
- Automatically show products users viewed
- Cross-sell related products
- Retarget cart abandoners with specific items

### **2. Offline Conversions**:
- Track phone orders
- Import offline sales data
- Connect in-store purchases

### **3. Server-Side Events**:
- Send events from server
- Improve data accuracy
- Bypass browser limitations

## 🚀 Campaign Setup Guide

### **1. Create Facebook Ad Campaign**:
```
Campaign Objective: Conversions
Optimization Event: Purchase
Budget: Daily/Lifetime
Audience: Pakistan, Age 25-45, Interests: Health, Fitness
Placements: Automatic
```

### **2. Ad Creative**:
```
Format: Single Image/Video
Image: Product photos
Text: "22g Protein per 100g - Order Now!"
CTA: Shop Now
Landing Page: Your website
```

### **3. Tracking Setup**:
```
Pixel: 1716548252372656
Events: Purchase, AddToCart, ViewContent
Attribution: 7-day click, 1-day view
Conversion Window: 7 days
```

## 📈 Expected Results

### **Tracking Accuracy**: 85-95%
- **Desktop**: ~95% accuracy
- **Mobile**: ~85% accuracy (iOS limitations)
- **Cross-device**: ~80% accuracy

### **Attribution Windows**:
- **Click**: 7 days (default)
- **View**: 1 day (default)
- **Custom**: Up to 28 days

### **Data Retention**: 
- **Event data**: 2 years
- **Audience data**: 180 days maximum
- **Custom audiences**: Refreshed automatically

## ✅ Success Checklist

- [ ] Pixel installed correctly
- [ ] PageView events firing
- [ ] Purchase events tracking
- [ ] Test purchases completed
- [ ] Events Manager showing data
- [ ] Pixel Helper shows green
- [ ] Console logs working
- [ ] Campaign created
- [ ] Audiences built
- [ ] Conversions optimized

## 🎉 Final Result

Your Facebook Pixel is now tracking:
- ✅ **All page visits**
- ✅ **Product views** 
- ✅ **Cart additions**
- ✅ **Checkout starts**
- ✅ **Completed purchases**
- ✅ **Revenue attribution**

**Ready for Facebook Ads optimization and retargeting campaigns!** 🚀📊
