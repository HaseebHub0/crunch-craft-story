/**
 * Test script for the new file-based review system
 * Run this to test if the system works locally
 */

const TEST_URL = 'http://localhost:8888/.netlify/functions/reviews';

async function testFileBasedSystem() {
  console.log('🧪 Testing File-Based Review System...');
  
  try {
    // Test GET request for existing reviews
    console.log('\n📤 Testing GET request for product 1...');
    const getResponse = await fetch(`${TEST_URL}?productId=1`);
    console.log('GET Status:', getResponse.status);
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('GET Response:', JSON.stringify(getData, null, 2));
    } else {
      console.log('GET failed with status:', getResponse.status);
    }
    
    // Test POST request to add a new review
    console.log('\n📤 Testing POST request to add review...');
    const postResponse = await fetch(TEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: '1',
        name: 'Test User',
        rating: 5,
        comment: 'This is a test review from the new file-based system!'
      })
    });
    console.log('POST Status:', postResponse.status);
    
    if (postResponse.ok) {
      const postData = await postResponse.json();
      console.log('POST Response:', JSON.stringify(postData, null, 2));
    } else {
      console.log('POST failed with status:', postResponse.status);
    }
    
    // Test GET request again to see if the new review was added
    console.log('\n📤 Testing GET request again to see new review...');
    const getResponse2 = await fetch(`${TEST_URL}?productId=1`);
    console.log('GET Status:', getResponse2.status);
    
    if (getResponse2.ok) {
      const getData2 = await getResponse2.json();
      console.log('GET Response (after adding review):', JSON.stringify(getData2, null, 2));
    } else {
      console.log('GET failed with status:', getResponse2.status);
    }
    
    console.log('\n✅ File-based system test completed!');
    
  } catch (error) {
    console.error('❌ File-based system test failed:', error.message);
    console.log('\n💡 Make sure to run: netlify dev');
  }
}

// Run the test
testFileBasedSystem();
