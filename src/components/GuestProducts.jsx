import { useEffect, useState } from 'react';
import productService from '../services/productService'; // assuming you have a product service to fetch products
// import './GuestProducts.css';

const GuestProducts = () => {
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts(); // Assuming this is the function to get products
        if (Array.isArray(products)) {
          setProductList(products); // Update state with fetched products
        } else {
          throw new Error('Products data is not an array');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts(); // Fetch the products on mount
  }, []); // Empty dependency array means this runs once when the component mounts

  // If there's an error, display it
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list">
      <h1>Our Products</h1>
      {productList.length === 0 ? (
        <div className="no-products-message">No products available.</div>
      ) : (
        <div className="product-container">
          {productList.map((product) => (
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
                <button className="view-details-button">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestProducts;
