// import axios from "axios";

// const BASE_URL = `${
//   import.meta.env.VITE_BACK_END_SERVER_URL
// }/product/:productId`;

// const getAuthToken = () => {
//   return localStorage.getItem("authToken");
// };

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Get all reviews
// const getReviews = async (productId) => {
//   try {
//     const res = await axiosInstance.get(`${BASE_URL}`);
//     return res.data;
//   } catch (error) {
//     console.log("Error fetching reviews:", error);
//     throw error;
//   }
// };

// //Get Reviews By ProductId
// const getReviewsByProductId = async (productId) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/product/${productId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching reviews for product ${productId}:`, error);
//       throw error;
//     }
//   },

// export default { getReviews };
