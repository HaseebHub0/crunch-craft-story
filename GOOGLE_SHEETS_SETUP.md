# Google Sheets Integration Setup

## Overview
Yeh guide aapko batayega ke kaise Google Sheets ke saath orders integrate karein.

## Step 1: Google Sheet Banayein

1. [Google Sheets](https://sheets.google.com) par jayein
2. Naya spreadsheet banayein
3. Sheet ka naam "Pakasian Orders" rakhein
4. Sheet ID copy karein (URL mein jo long string hai)

## Step 2: Google Apps Script Setup

1. [script.google.com](https://script.google.com) par jayein
2. "New project" click karein
3. `google-apps-script.js` file ka code copy paste karein
4. `SHEET_ID` variable mein apni sheet ID paste karein
5. `setupOrdersSheet()` function run karein (ek baar sirf)

## Step 3: Deploy as Web App

1. Apps Script mein "Deploy" > "New deployment" click karein
2. Type: "Web app" select karein
3. Execute as: "Me"
4. Who has access: "Anyone"
5. "Deploy" click karein
6. Web App URL copy karein

## Step 4: Netlify Environment Variables

1. Netlify dashboard mein site settings jayein
2. "Environment variables" section mein jayein
3. Add karein:
   - Key: `GOOGLE_APPS_SCRIPT_URL`
   - Value: Aapka Web App URL

## Step 5: Test Karein

1. Website par order place karein
2. Google Sheet check karein - order data aana chahiye
3. Console logs check karein debugging ke liye

## Sheet Structure

Yeh columns automatically create honge:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Order Date | Order ID | Customer Name | Phone | Email | Address | City | Pincode | Items | Total Amount | Status | Formatted Date |

## Email Notifications

`sendEmailNotification()` function automatically admin ko email bhejega har naye order par.

Email address change karne ke liye:
```javascript
const adminEmail = 'your-email@example.com';
```

## Troubleshooting

### Common Issues:

1. **"Sheet not found" error**
   - Sheet name "Orders" hai ya nahi check karein
   - `setupOrdersSheet()` function run karein

2. **"Permission denied" error**
   - Web App deployment settings check karein
   - "Execute as: Me" aur "Who has access: Anyone" hona chahiye

3. **Orders nahi aa rahe**
   - Console logs check karein
   - Environment variable sahi set hai ya nahi
   - Google Apps Script logs dekhen

### Debug Commands:

```javascript
// Apps Script console mein run karein
console.log('Sheet ID:', SHEET_ID);
console.log('Sheet exists:', SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME) !== null);
```

## Security Notes

- Environment variables use karein sensitive data ke liye
- Google Apps Script mein sirf required permissions dein
- Regular backups lein Google Sheet ka

## Support

Agar koi issue hai to:
1. Console logs check karein
2. Google Apps Script execution logs dekhen  
3. Network tab mein API calls monitor karein
