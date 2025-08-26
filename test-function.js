/**
 * Test script for the Netlify reviews function
 * Run this to test if the function is working locally
 */

import fetch from 'node-fetch';

const TEST_URL = 'http://localhost:8888/.netlify/functions/reviews';

async function testFunction() {
  console.log('🧪 Testing Netlify reviews function...');
  
  try {
    // Test GET request
    console.log('\n📤 Testing GET request...');
    const getResponse = await fetch(`${TEST_URL}?productId=test123`);
    console.log('GET Status:', getResponse.status);
    console.log('GET Headers:', Object.fromEntries(getResponse.headers.entries()));
    
    // Test POST request
    console.log('\n📤 Testing POST request...');
    const postResponse = await fetch(TEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: 'test123',
        name: 'Test User',
        rating: 5,
        comment: 'Test comment'
      })
    });
    console.log('POST Status:', postResponse.status);
    console.log('POST Headers:', Object.fromEntries(postResponse.headers.entries()));
    
    // Test OPTIONS request (CORS preflight)
    console.log('\n📤 Testing OPTIONS request...');
    const optionsResponse = await fetch(TEST_URL, {
      method: 'OPTIONS',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('OPTIONS Status:', optionsResponse.status);
    console.log('OPTIONS Headers:', Object.fromEntries(optionsResponse.headers.entries()));
    
    console.log('\n✅ Function test completed!');
    
  } catch (error) {
    console.error('❌ Function test failed:', error.message);
    console.log('\n💡 Make sure to run: netlify dev');
  }
}

testFunction();
