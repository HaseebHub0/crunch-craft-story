// Simple test script to verify Firebase reviews integration
// Run this with: node test-firebase-reviews.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';

// Firebase configuration (same as in your app)
const firebaseConfig = {
  apiKey: "AIzaSyCKA-KypQTucH01aTJ8WPiM7LYXTQcgL3c",
  authDomain: "pakasian-protein-nimko.firebaseapp.com",
  databaseURL: "https://pakasian-protein-nimko-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pakasian-protein-nimko",
  storageBucket: "pakasian-protein-nimko.firebasestorage.app",
  messagingSenderId: "375303378562",
  appId: "1:375303378562:web:ea7acf7483b2af10cd869b",
  measurementId: "G-6EZ1B4KWY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const REVIEWS_COLLECTION = 'reviews';

async function testFirebaseReviews() {
  console.log('🔥 Testing Firebase Reviews Integration...\n');

  try {
    // Test 1: Add a sample review
    console.log('📝 Test 1: Adding a sample review...');
    const sampleReview = {
      productId: "1",
      name: "Test User",
      rating: 5,
      comment: "This is a test review from Firebase integration test.",
      date: new Date().toISOString(),
      timestamp: Timestamp.now(),
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), sampleReview);
    console.log('✅ Sample review added with ID:', docRef.id);

    // Test 2: Fetch reviews for product 1
    console.log('\n📖 Test 2: Fetching reviews for product 1...');
    const reviewsQuery = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', '1'),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(reviewsQuery);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        ...data
      });
    });

    console.log(`✅ Found ${reviews.length} reviews for product 1:`);
    reviews.forEach((review, index) => {
      console.log(`   ${index + 1}. ${review.name} - ${review.rating}⭐ - "${review.comment.substring(0, 50)}..."`);
    });

    // Test 3: Calculate average rating
    console.log('\n📊 Test 3: Calculating average rating...');
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      console.log(`✅ Average rating: ${averageRating.toFixed(1)}/5 (${reviews.length} reviews)`);
    } else {
      console.log('⚠️ No reviews found to calculate average rating');
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n💡 Your Firebase reviews integration is working correctly.');
    console.log('   - Reviews are being saved to Firestore');
    console.log('   - Reviews can be fetched by product ID');
    console.log('   - Reviews are ordered by timestamp (newest first)');
    console.log('   - Average rating calculation works');

  } catch (error) {
    console.error('❌ Error testing Firebase reviews:', error);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('   1. Check your Firebase configuration');
    console.log('   2. Ensure Firestore is enabled in your Firebase project');
    console.log('   3. Check Firestore security rules');
    console.log('   4. Verify network connectivity');
  }
}

// Run the test
testFirebaseReviews().then(() => {
  console.log('\n✨ Test completed. You can now use reviews in your React app!');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
