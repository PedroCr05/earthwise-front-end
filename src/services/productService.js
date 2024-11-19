import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;

const getAuthToken = () => {
  return localStorage.getItem("authToken");
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

export default { getProducts, getProductById };
