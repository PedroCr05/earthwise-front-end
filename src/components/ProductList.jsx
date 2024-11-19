import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import productService from "../services/productService";
import userService from "../services/userService"; // Import the user service
import { useEffect, useState } from "react";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin immediately after the component mounts
  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    if (currentUser && currentUser.role === "admin") {
      setIsAdmin(true);
    }
  }, []); // Only runs once when the component mounts

  // Fetch products when the component mounts
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
  }, []); // Only runs once when the component mounts

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProductList((prevList) => prevList.filter((product) => product._id !== productId));
      // Optionally show success feedback
      setError("Product deleted successfully"); // Can be used as feedback instead of alert
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again later.");
    }
  };

  // Handle navigating to product details
  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handle navigating to edit product page
  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`); // Navigate to edit page
  };

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
                  <div className="button-container">
                    <button 
                      className="view-details-button" 
                      onClick={() => handleViewDetails(product._id)}>
                      View Details
                    </button>

                    {/* Admin options */}
                    {isAdmin && (
                      <div className="admin-actions">
                        <button onClick={() => handleEditProduct(product._id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(product._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
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
