/**
 * Google Apps Script for handling Pakasian Protein Nimko orders
 * 
 * Setup Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Create a Google Sheet for orders
 * 5. Update SHEET_ID with your Google Sheet ID
 * 6. Deploy as Web App with "Execute as: Me" and "Who has access: Anyone"
 * 7. Copy the Web App URL and add it to your Netlify environment variables
 */

// Configuration
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Orders'; // Name of the sheet tab

function doPost(e) {
  try {
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    console.log('Received order data:', data);
    
    // Validate required fields
    const requiredFields = ['orderId', 'name', 'phone', 'email', 'address', 'city', 'cart', 'totalAmount'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            message: `Missing required field: ${field}`
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Open the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet '${SHEET_NAME}' not found`);
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const cartItems = data.cart.map(item => 
      `${item.name} (${item.quantity}x - PKR ${item.price})`
    ).join('; ');
    
    const rowData = [
      timestamp,                    // A: Order Date
      data.orderId,                // B: Order ID
      data.name,                   // C: Customer Name
      data.phone,                  // D: Phone
      data.email,                  // E: Email
      data.address,                // F: Address
      data.city,                   // G: City
      data.pincode || '',          // H: Pincode
      cartItems,                   // I: Cart Items
      data.totalAmount,            // J: Total Amount
      'Pending',                   // K: Status
      data.orderDate || timestamp.toLocaleString() // L: Formatted Order Date
    ];
    
    // Add the row to the sheet
    const lastRow = sheet.getLastRow();
    const newRowIndex = lastRow + 1;
    
    sheet.getRange(newRowIndex, 1, 1, rowData.length).setValues([rowData]);
    
    console.log(`Order added to row ${newRowIndex}`);
    
    // Send email notification (optional)
    try {
      sendEmailNotification(data, newRowIndex);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the entire operation if email fails
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Order saved successfully',
        rowId: newRowIndex,
        timestamp: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing order:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(orderData, rowIndex) {
  const subject = `New Order: ${orderData.orderId} - Pakasian Protein Nimko`;
  
  const emailBody = `
New order received!

Order Details:
- Order ID: ${orderData.orderId}
- Customer: ${orderData.name}
- Phone: ${orderData.phone}
- Email: ${orderData.email}
- Address: ${orderData.address}, ${orderData.city}
- Total Amount: PKR ${orderData.totalAmount}

Items:
${orderData.cart.map(item => `- ${item.name} (${item.quantity}x) - PKR ${item.price}`).join('\n')}

Order Date: ${orderData.orderDate}
Sheet Row: ${rowIndex}

Please process this order as soon as possible.
  `;
  
  // Replace with your email
  const adminEmail = 'your-email@example.com';
  
  MailApp.sendEmail({
    to: adminEmail,
    subject: subject,
    body: emailBody
  });
  
  console.log('Email notification sent to:', adminEmail);
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Pakasian Protein Nimko Order API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Function to create the orders sheet with proper headers
 * Run this once to set up your sheet
 */
function setupOrdersSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
    
    // Add headers
    const headers = [
      'Order Date', 'Order ID', 'Customer Name', 'Phone', 'Email', 
      'Address', 'City', 'Pincode', 'Items', 'Total Amount', 'Status', 'Formatted Date'
    ];
    
    newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    newSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    
    console.log('Orders sheet created with headers');
  } else {
    console.log('Orders sheet already exists');
  }
}
