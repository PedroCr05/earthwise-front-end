import { Link } from "react-router-dom";
import productService from "../services/productService";
import { useEffect, useState } from "react";
import "./ProductList.css"; 
import "../App.css"

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        if (!Array.isArray(products)) {
          throw new Error("Products data is not an array");
        }
        setProductList(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="product-container">
          {productList.map((product, idx) => (
            <div key={idx} className="product-card">
              <img src={product.productImage} alt={product.productName} className="product-image" />
              <div className="product-details">
                <div className="product-name">{product.productName}</div>
                <div className="product-description">{product.productDescription}</div>
                <div className="product-price">${product.productPrice}</div>
                <Link to={`/product/${product._id}`} className="view-details-link">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductList;
