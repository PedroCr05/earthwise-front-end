import { Link } from "react-router-dom";
import productService from "../services/productService";
import { useEffect, useState } from "react";
import "./ProductList.css";
import "../App.css";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products when the component is mounted
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
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="product-container">
          {productList.length === 0 ? (
            <div className="no-products-message">No products available.</div>
          ) : (
            productList.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="product-image"
                />
                <div className="product-details">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-description">
                    {product.productDescription}
                  </div>
                  <div className="product-price">${product.productPrice}</div>
                  <Link to={`/product/${product._id}`} className="view-details-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductList;
