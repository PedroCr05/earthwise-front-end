import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import ProductList from "./components/productList";
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <h1>Hello</h1>
      <ProductList />
    </>
  );
};

export default App;
