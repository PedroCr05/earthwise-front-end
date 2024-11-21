import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const getUserRole = () => {
  const token = getAuthToken();
  if (token) {
    const decoded = JSON.parse(atob(token.split('.')[1])); 
    return decoded.role; 
  }
  return null;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all products
const getProducts = async () => {
  try {
    const res = await axiosInstance.get();
    return res.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
};

// Get a specific product by ID
const getProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching product details:", error);
    throw error;
  }
};

// Create a new product (Admin only)
const createProduct = async (productData) => {
  try {
    if (getUserRole() !== "admin") {
      throw new Error("Unauthorized: Only Admin can create products");
    }

    const res = await axiosInstance.post("/", productData);
    return res.data;
  } catch (error) {
    console.log("Error creating product:", error);
    throw error;
  }
};

// Update a product (Admin only)
const updateProduct = async (id, productData) => {
  try {
    if (getUserRole() !== "admin") {
      throw new Error("Unauthorized: Only Admin can update products");
    }

    const res = await axiosInstance.put(`/${id}`, productData);
    return res.data;
  } catch (error) {
    console.log("Error updating product:", error);
    throw error;
  }
};

// Delete a product (Admin only)
const deleteProduct = async (id) => {
  try {
    if (getUserRole() !== "admin") {
      throw new Error("Unauthorized: Only Admin can delete products");
    }

    const res = await axiosInstance.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting product:", error);
    throw error;
  }
};

//Create Review
const createReview = async (productId, reviewData) => {
  try {
    const response = await axiosInstance.post(
      `/${productId}/reviews`,
      reviewData
    );
    return response.data;
  } catch (error) {
    handleError(error, "add review");
  }
};

//Edit Review
const editReview = async (productId, reviewId, reviewData) => {
  try {
    const response = await axiosInstance.put(
      `/${productId}/reviews/${reviewId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    handleError(error, "edit review");
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  editReview,

};
