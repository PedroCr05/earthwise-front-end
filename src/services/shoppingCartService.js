import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cart`;

const getToken = () => localStorage.getItem("authToken");

const getCartItems = async () => {
  try {
    const token = getToken();
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

const addItemToCart = async (item) => {
  try {
    const token = getToken();
    const res = await axios.post(BASE_URL, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

const removeItemFromCart = async (itemId) => {
  try {
    const token = getToken();
    const res = await axios.delete(`${BASE_URL}/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("removeItemFromCart response:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error removing item from cart:", error);
    throw error;
  }
};

export default { getCartItems, addItemToCart, removeItemFromCart };
