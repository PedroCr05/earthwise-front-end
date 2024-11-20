import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`;

const reviewService = {
  // Add a review to a product
  addReview: async (productId, reviewData) => {
    try {
      const token = localStorage.getItem("authToken"); // Get the auth token
      const res = await axios.post(
        `${BASE_URL}/product/${productId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // Return the response data
    } catch (error) {
      console.error("Error adding review:", error.response?.data || error.message);
      throw error;
    }
  },

  // Optionally, fetch reviews for a product
  getReviewsByProduct: async (productId) => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${productId}`);
      return res.data; // Return reviews for the product
    } catch (error) {
      console.error("Error fetching reviews:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default reviewService;
