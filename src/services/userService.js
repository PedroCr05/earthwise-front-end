import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

// Sign up a new user
const signup = async (body) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, body);
    return res.data;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Sign in an existing user by username/password
const signin = async (body) => {
  try {
    const res = await axios.post(`${BASE_URL}/signin`, body);
    if (res.data.token) {
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data as well
    }
    return res.data;
  } catch (error) {
    console.error(
      "Error during signin:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Sign out the current user
const signout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");

  window.location.href = "/"; // Redirect to home page or login page
};

// Get user data by ID (instead of using /me, we now fetch user by ID)
const getUserById = async (userId) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }

  try {
    const res = await axios.get(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching user by ID:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Get current user from local storage
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Fetch user from 'user' key
  return user; // Return null if no user exists
};

export default { signup, signin, signout, getUserById, getCurrentUser };
