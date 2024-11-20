import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../services/productService";
import shoppingCartService from "../services/shoppingCartService";
import userService from "../services/userService"; 
import reviewService from "../services/reviewService";

import ReviewList from "./ReviewList";

import "./ProductDescription.css";

const ProductDescription = ({ addToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviews, setReviews] = useState([]); 
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(""); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        setProduct(productData);
        setReviews(productData.reviews || []); 
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("An error occurred while fetching the product.");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await userService.getCurrentUser(); 
        if (user && user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error checking user admin status:", err);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
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
        review: product.review,
      };
      await shoppingCartService.addItemToCart(item);
      addToCart(product, quantity);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment || rating <= 0) return;

    const { username, userId } = userService.getUsernameAndUserId() || {};

    const reviewData = {
      recommend: rating >= 4, 
      text: comment,
      rating, 
      author: username ? `${username} (${userId})` : "Anonymous", 
    };

    try {
      await reviewService.addReview(product._id, reviewData);
      setComment(""); 
      setRating(0); 
      const updatedProduct = await productService.getProductById(product._id);
      setReviews(updatedProduct.reviews);
    } catch (err) {
      console.error("Error submitting review:", err);
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
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="addToCartButton">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>

          {isAdmin && (
            <div className="adminButtons">
              <button onClick={() => handleDeleteProduct(product._id)}>Delete Product</button>
              <button onClick={() => handleEditProduct(product._id)}>Edit Product</button>
            </div>
          )}
        </div>
      </div>

      <div className="reviews">
        <h2>Reviews</h2>
        <ReviewList reviews={reviews} />

        <form onSubmit={handleReviewSubmit}>
          <label>Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDescription;
