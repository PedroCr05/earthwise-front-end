import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

// Helper function to handle errors
const handleError = (error, context) => {
  const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
  console.error(`Error during ${context}:`, error.response?.data || error.message);
  throw new Error(errorMessage); 
};

// Sign up a new user
const signup = async (body) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, body);
    return res.data;
  } catch (error) {
    handleError(error, "signup");
  }
};

// Sign in an existing user by username/password
const signin = async (body) => {
  try {
    const res = await axios.post(`${BASE_URL}/signin`, body);
    if (res.data.token) {
      
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
     
      if (!localStorage.getItem("authToken")) {
        throw new Error("Failed to save authentication token.");
      }

      const user = res.data.user;
      if (!user || !user._id || !user.username || !user.email) {
        throw new Error("User data is incomplete.");
      }
    }
    return res.data;
  } catch (error) {
    handleError(error, "signin");
  }
};

// Sign out the current user
const signout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.location.replace("/"); 
};

// Get user data by ID or username (Requires Authentication)
const getUserById = async (userId) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found. Please sign in.");
  }

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // Log the userId to check if it's correct
  console.log('User ID:', userId);

  try {
    let res;
    if (isValidObjectId(userId)) {
      res = await axios.get(`${BASE_URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      res = await axios.get(`${BASE_URL}/username/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return res.data;
  } catch (error) {
    handleError(error, "fetching user by ID or username");
    throw error; 
  }
};

// Get current user from local storage (No authentication required)
const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user && (!user._id || !user.username || !user.email)) {
      console.error("User data is incomplete. Please sign in again.");
      localStorage.removeItem("user"); 
      return null;
    }
    return user || null; 
  } catch (error) {
    console.error("Error parsing user from localStorage:", error.message);
    return null;
  }
};

// Utility function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; 
};

// Fetch username and user ID for the current user
const getUsernameAndUserId = () => {
  const user = getCurrentUser();
  if (user) {
    return {
      username: user.username,
      userId: user._id,
    };
  }
  return null;
};

export default { signup, signin, signout, getUserById, getCurrentUser, isAuthenticated, getUsernameAndUserId };

