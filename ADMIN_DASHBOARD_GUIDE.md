# Admin Dashboard Guide - Pakasian Protein Nimko

## 🎯 Overview
Complete admin dashboard for managing orders, customers, and business analytics.

## 🚀 Access Dashboard

### URL: `https://yoursite.com/admin`

### Login Credentials:
- **Username:** `admin`
- **Password:** `pakasian2024`

## 📊 Dashboard Features

### 1. **Statistics Overview**
- 📦 Total Orders
- ⏳ Pending Orders  
- 💰 Total Revenue
- 📈 Average Order Value

### 2. **Order Management**
- ✅ View all orders
- 🔍 Filter by status (All, Pending, Processing, Shipped, Delivered, Cancelled)
- 👁️ View order details
- 📱 Send WhatsApp messages
- ✉️ Send emails
- 🗑️ Delete orders

### 3. **Order Status Updates**
- **Pending** → **Processing** → **Shipped** → **Delivered**
- **Cancelled** (if needed)

### 4. **Customer Communication**
- **WhatsApp Integration:** Direct links to send messages
- **Email Integration:** Opens email client with pre-filled content
- **Order Confirmations:** Automatic message templates

## 🛠️ How to Use

### **Step 1: Access Dashboard**
1. Go to `yoursite.com/admin`
2. Enter login credentials
3. Click "Sign In"

### **Step 2: View Orders**
- Dashboard shows all orders automatically
- Use filter buttons to view specific status orders
- Statistics update in real-time

### **Step 3: Manage Orders**
1. **View Details:** Click the eye icon (👁️) on any order
2. **Update Status:** In order details, click status buttons
3. **Contact Customer:** Use WhatsApp or Email buttons
4. **Delete Order:** Use delete button if needed

### **Step 4: Customer Communication**

#### **WhatsApp Messages:**
- Click WhatsApp button
- Pre-filled message opens
- Customize and send

#### **Email Communication:**
- Click Email button  
- Email client opens with template
- Customize and send

## 📱 Mobile Responsive
- ✅ Works on desktop, tablet, and mobile
- ✅ Touch-friendly interface
- ✅ Responsive design

## 🔒 Security Features
- 🔐 Password protection
- 🔄 Session management
- 🚪 Secure logout
- 💾 Local data storage

## 📊 Data Storage
- **localStorage:** Orders stored locally in browser
- **Automatic Backup:** Orders saved when placed
- **Data Persistence:** Data remains between sessions
- **100 Order Limit:** Keeps latest 100 orders

## 🔧 Customization

### **Change Login Credentials:**
Edit in `src/pages/admin/AdminLogin.tsx`:
```javascript
if (credentials.username === 'YOUR_USERNAME' && credentials.password === 'YOUR_PASSWORD') {
```

### **Modify Order Status:**
Edit in `src/pages/admin/AdminDashboard.tsx`:
```javascript
status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
```

### **Update WhatsApp Template:**
```javascript
const message = `Your custom message template here`;
```

## 📈 Business Analytics

### **Key Metrics:**
- **Total Revenue:** Sum of all orders
- **Order Volume:** Number of orders per day/week
- **Average Order Value:** Revenue ÷ Number of orders
- **Status Distribution:** Pending vs Completed orders

### **Export Data:**
Orders can be exported by copying from browser localStorage:
```javascript
// In browser console:
console.log(JSON.stringify(JSON.parse(localStorage.getItem('pakasianOrders')), null, 2));
```

## 🚨 Troubleshooting

### **Can't Login:**
- Check username/password spelling
- Clear browser cache
- Try incognito/private mode

### **Orders Not Showing:**
- Click "Refresh Orders" button
- Check if orders were placed after dashboard setup
- Verify localStorage data exists

### **WhatsApp Not Working:**
- Ensure WhatsApp is installed
- Check phone number format
- Try opening WhatsApp manually first

## 🔄 Updates & Maintenance

### **Regular Tasks:**
- Review pending orders daily
- Update order statuses
- Respond to customer inquiries
- Monitor revenue trends

### **Weekly Tasks:**
- Export order data for backup
- Review customer feedback
- Update inventory based on orders

## 💡 Pro Tips

1. **Quick Status Update:** Use keyboard shortcuts in order details
2. **Bulk Actions:** Filter orders first, then process similar ones
3. **Customer Service:** Use WhatsApp for quick updates
4. **Data Backup:** Regularly export order data
5. **Mobile Management:** Use mobile browser for on-the-go management

## 🆘 Support

For technical issues:
1. Check browser console for errors
2. Clear browser cache and cookies
3. Try different browser
4. Contact developer for advanced issues

---

**Dashboard Version:** 1.0  
**Last Updated:** December 2024  
**Compatible:** All modern browsers
