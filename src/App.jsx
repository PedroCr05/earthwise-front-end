import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import ProductDescription from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
// import shipping from './components/shipping'
import "./App.css";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cartItems, { ...product, quantity }];
    console.log("Updated Cart:", updatedCart);
    setCartItems(updatedCart);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/product/:productId"
          element={<ProductDescription addToCart={addToCart} />}
        />
        <Route path="/cart" element={<ShoppingCart cart={cartItems} />} />
      </Routes>
    </>
  );
}; 

export default App;
