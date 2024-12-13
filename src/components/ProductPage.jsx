import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../services/productService";
import shoppingCartService from "../services/shoppingCartService";
import userService from "../services/userService";
import ReviewList from "./ReviewList";
import "./ProductDescription.css";

const ProductDescription = ({ addToCart, user }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [recommend, setRecommend] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        if (productData) {
          setProduct(productData);
          setReviews(productData.reviews);
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

    const currentUser = userService.getCurrentUser();
    if (currentUser && currentUser.role === "admin") {
      setIsAdmin(true);
    }
  }, [productId]);

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

  const handleReviewSubmit = async (e, recommendation) => {
    e.preventDefault();
    const reviewData = {
      text: comment,
      recommend: recommendation,
      author: user._id,
    };

    try {
      if (isEditing && editingReviewId) {
        await productService.editReview(productId, editingReviewId, reviewData);
      } else {
        await productService.createReview(productId, reviewData);
      }

      const updatedProduct = await productService.getProductById(productId);
      setReviews(updatedProduct.reviews || []);
      setComment("");
      setIsEditing(false);
      setEditingReviewId(null);
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  return (
    <div className="pageContainer">
      <div className="contentContainer">
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

            <button className="buyNowButton" onClick={handleAddToCart}>
              Add to Cart
            </button>
            
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

            <ReviewList
              reviews={reviews}
              productId={productId}
              onSubmitReview={handleReviewSubmit}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setEditingReviewId={setEditingReviewId}
              setComment={setComment}
              comment={comment}
              recommend={recommend}
              setRecommend={setRecommend}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
