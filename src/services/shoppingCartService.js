import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cart`;

const getToken = () => localStorage.getItem("authToken");

const handleError = (error, context) => {
  const errorMessage =
    error.response?.data?.message || error.message || "An unknown error occurred.";
  console.error(`Error during ${context}:`, error.response?.data || error.message);
  return errorMessage;
};

const checkToken = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  return token;
};

// Get cart items
const getCartItems = async () => {
  try {
    const token = checkToken();
    if (!token) {
      return "No authentication token found. Please log in."; 
    }

    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data && Array.isArray(res.data.products)) {
      return res.data.products;
    } else {
      console.error("Unexpected response structure:", res.data);
      return "Cart items not found in the response."; 
    }
  } catch (error) {
    return handleError(error, "fetching cart items");
  }
};

// Add an item to the cart
const addItemToCart = async (item) => {
  try {
    const token = checkToken();
    if (!token) {
      return "No authentication token found. Please log in.";
    }

    const res = await axios.post(BASE_URL, item, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "adding item to cart");
  }
};

// Update an item in the cart
const updateItemInCart = async (itemId, updatedData) => {
  try {
    const token = checkToken();
    if (!token) {
      return "No authentication token found. Please log in.";
    }

    const res = await axios.put(`${BASE_URL}/${itemId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "updating cart item");
  }
};

// Remove an item from the cart
const removeItemFromCart = async (itemId) => {
  try {
    const token = checkToken();
    if (!token) {
      return "No authentication token found. Please log in.";
    }

    const res = await axios.delete(`${BASE_URL}/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    return handleError(error, "removing item from cart");
  }
};

export default {
  getCartItems,
  addItemToCart,
  updateItemInCart,
  removeItemFromCart,
};
