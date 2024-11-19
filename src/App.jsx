import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import "./App.css";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </div>
  );
};

export default App;
