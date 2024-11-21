
import axios from 'axios';

// Define the base URL for your API
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;


// Add a review for a specific product
const addReview = async (productId, reviewData) => {
    try {
      const response = await axios.post(`${BASE_URL}/${productId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error.response || error.message);
      throw new Error('Error submitting review');
    }
  };
  

// Get reviews for a specific product
const getReviewsForProduct = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.response || error.message);
    throw new Error('Error fetching reviews');
  }
};

export default {
  addReview,
  getReviewsForProduct,
};
