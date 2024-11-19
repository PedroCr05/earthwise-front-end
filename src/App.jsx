import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import "./App.css";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import { Route, Router, Routes } from "react-router-dom";
import ProductList from "./components/productList";

const App = () => {
  const [user, setUser] = useState({});
  console.log("user", user);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/sign-in"
          element={<SigninForm user={user} setUser={setUser} />}
        />
        <Route
          path="/sign-up"
          element={<SignupForm user={user} setUser={setUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
