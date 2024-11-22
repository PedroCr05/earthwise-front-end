import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { useEffect, useState } from "react";
import "./EditProduct.css";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await productService.updateProduct(productId, product);
      navigate("/products"); // Redirect to product list after update
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again later.");
    }
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={product.productDescription}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">Product Price</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={product.productPrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productImage">Product Image URL</label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={product.productImage}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default EditProduct;





