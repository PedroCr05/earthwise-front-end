import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../services/productService"; // Import productService
import shoppingCartService from "../services/shoppingCartService";
import "./ProductDescription.css";
import "../App.css";

const ProductDescription = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId); // Use productService
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("An error occurred while fetching the product.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error if any
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = async () => {
    try {
      const item = {
        productId: product._id,
        productName: product.productName,
        productPrice: product.productPrice,
        productImage: product.productImage,
        quantity: quantity,
      };
      console.log("Adding to cart:", item);
      // Simulate adding to cart backend service
      await shoppingCartService.addItemToCart(item);
      addToCart(product, quantity);
      console.log("Item added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="productDescriptionContainer">
      <div className="productDetails">
        <div className="productImage">
          <img src={product.productImage} alt={product.productName} />
        </div>

        <div className="productInfo">
          <h1>{product.productName}</h1>
          <p className="productDescription">{product.productDescription}</p>
          <div className="productPrice">${product.productPrice}</div>
          
          <div className="quantityContainer">
            <label htmlFor="quantity">Qty: </label>
            <select id="quantity" value={quantity} onChange={handleQuantityChange}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>

          <button className="buyNowButton" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
