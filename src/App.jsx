import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
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
    </div>
  );
};

export default App;
