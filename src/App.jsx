import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import ProductDescription from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import NewProduct from "./components/NewProduct"; // Import NewProduct
import "./App.css";
import EditProduct from "./components/EditProduct";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from local storage on initial load to maintain session
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setUser({
        username: localStorage.getItem("username"),
        // You can also add other user details if necessary (e.g., role, email)
      });
    }
  }, []);

  const addToCart = (product, quantity) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCart);
    }
  };

  const handleUserLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null); // Reset user state
    navigate("/"); // Navigate to the landing page (or sign-in page)
  };

  return (
    <>
      <NavBar user={user} onLogout={handleUserLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/product/:productId"
          element={<ProductDescription addToCart={addToCart} />}
        />
        <Route path="/cart" element={<ShoppingCart user={user} />} />
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/new-product" element={<NewProduct />} />{" "}
        {/* Route for NewProduct */}
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
};

export default App;
