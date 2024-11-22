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
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import GuestProducts from "./components/GuestProducts";
import authService from "./services/userService";
import "./App.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user info from localStorage on app load
  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
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
    authService.signout(); // Clear auth-related data
    setUser(null);
    navigate("/");
  };

  console.log("User in App:", user);

  return (
    <>
      <NavBar user={user} setUser={setUser} onLogout={handleUserLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guest-products" element={<GuestProducts />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/product/:productId"
          element={<ProductDescription addToCart={addToCart} user={user} />}
        />
        <Route path="/cart" element={<ShoppingCart user={user} />} />
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} setUser={setUser} />}
        />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
      </Routes>
    </>
  );
};

export default App;
