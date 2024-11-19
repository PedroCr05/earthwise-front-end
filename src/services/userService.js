import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

// Sign up a new user
const signup = async (body) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, body);
    return res.data;
  } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message);
    throw error; 
  }
};

// Sign in an existing user by username/password
const signin = async (body) => {
  try {
    const res = await axios.post(`${BASE_URL}/signin`, body);
    if (res.data.token) {
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); 
    }
    return res.data; 
  } catch (error) {
    console.error("Error during signin:", error.response?.data || error.message);
    throw error; 
  }
};

// Sign out the current user
const signout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");

  window.location.href = "/"; 
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
    console.error("Error fetching user by ID:", error.response?.data || error.message);
    return null; 
  }
};

const getCurrentUser = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user")); 
  if (!token || !user) {
    return null; 
  }

  return { token, ...user }; 
};

export default { signup, signin, signout, getUserById, getCurrentUser };
