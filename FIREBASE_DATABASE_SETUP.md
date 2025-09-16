# Firebase Database Configuration Fix

## 🚨 Current Error
```
Firebase error. Please ensure that you have the URL of your Firebase Realtime Database instance configured correctly.
```

## ✅ Solution Steps

### Step 1: Enable Realtime Database
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `pakasian-protein-nimko`
3. In the left sidebar, click **"Realtime Database"**
4. Click **"Create Database"** button
5. Choose **"asia-southeast1"** (closest to Pakistan)
6. Start in **"Test mode"** for now
7. Click **"Enable"**

### Step 2: Verify Database URL
After creating the database, your URL should be:
```
https://pakasian-protein-nimko-default-rtdb.asia-southeast1.firebasedatabase.app
```

This matches what you have in your config ✅

### Step 3: Set Database Rules
In Firebase Console > Realtime Database > Rules tab, paste this:

```json
{
  "rules": {
    "orders": {
      ".read": true,
      ".write": true,
      ".indexOn": ["createdAt", "status", "orderId"]
    }
  }
}
```

Click **"Publish"** to save the rules.

### Step 4: Test Database Access
1. Go to Firebase Console > Realtime Database > Data tab
2. You should see an empty database
3. Try adding test data manually to verify it works

### Step 5: Update Security (Optional for now)
For production, you can add authentication later:

```json
{
  "rules": {
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["createdAt", "status", "orderId"]
    }
  }
}
```

## 🔧 If Still Having Issues

### Check 1: Verify Project ID
In your Firebase console, make sure the project ID matches: `pakasian-protein-nimko`

### Check 2: Database Region
If the database was created in a different region, the URL might be different:
- Default: `https://pakasian-protein-nimko-default-rtdb.firebaseio.com`
- Asia: `https://pakasian-protein-nimko-default-rtdb.asia-southeast1.firebasedatabase.app`

### Check 3: Browser Console
Open browser dev tools and check for any additional error messages.

## 🎯 Expected Result
After fixing:
- No Firebase errors in console
- Orders save to Firebase in real-time
- Admin dashboard syncs across devices
- Data persists permanently

## 🚀 Quick Test
1. Fix the database setup above
2. Deploy your site
3. Place a test order
4. Check Firebase Console > Realtime Database > Data
5. You should see the order appear instantly!

---

**The error will disappear once the Realtime Database is properly enabled in your Firebase project! 🔥**
