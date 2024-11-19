import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cart`;

const getCartItems = async () => {
  try {
    const res = await axios.get(BASE_URL);
    console.log("getCartItems response:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error fetching cart items:", error);
  }
};

const addItemToCart = async (item) => {
  try {
    const res = await axios.post(BASE_URL, item);
    console.log("addItemToCart response:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error adding item to cart:", error);
  }
};

const removeItemFromCart = async (itemId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${itemId}`);
    console.log("removeItemFromCart response:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error removing item from cart:", error);
  }
};

export default { getCartItems, addItemToCart, removeItemFromCart };
