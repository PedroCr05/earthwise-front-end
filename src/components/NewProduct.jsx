import { useState } from "react";
import axios from "axios";
import "./NewProduct.css";

const NewProduct = () => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productImage: "",
    productQuantity: "",
    productSku: "",
    manufacturerSku: "",
    productCategory: "",
  });

  const [message, setMessage] = useState({ success: "", error: "" });

  // Handle form input changes
  const handleFormChange = (evt) => {
    const { name, value } = evt.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await axios.post("http://localhost:3000/products", productDetails); // Make sure the URL is correct
      setMessage({ success: "Product created successfully!", error: "" });
      setProductDetails({
        productName: "",
        productDescription: "",
        productPrice: "",
        productImage: "",
        productQuantity: "",
        productSku: "",
        manufacturerSku: "",
        productCategory: "",
      });
    } catch (err) {
      setMessage({
        success: "",
        error: err.response?.data?.error || "An error occurred",
      });
    }
  };

  return (
    <div className="new-product-container">
      <h3 className="new-product-title">Create New Product</h3>
      {message.error && <p className="error-message">{message.error}</p>}
      {message.success && <p className="success-message">{message.success}</p>}
      <form className="new-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            onChange={handleFormChange}
            value={productDetails.productName}
            name="productName"
            id="productName"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description</label>
          <textarea
            onChange={handleFormChange}
            value={productDetails.productDescription}
            name="productDescription"
            id="productDescription"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price</label>
          <input
            onChange={handleFormChange}
            value={productDetails.productPrice}
            name="productPrice"
            id="productPrice"
            type="number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image URL</label>
          <input
            onChange={handleFormChange}
            value={productDetails.productImage}
            name="productImage"
            id="productImage"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productQuantity">Product Quantity</label>
          <input
            onChange={handleFormChange}
            value={productDetails.productQuantity}
            name="productQuantity"
            id="productQuantity"
            type="number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productSku">Product SKU</label>
          <input
            onChange={handleFormChange}
            value={productDetails.productSku}
            name="productSku"
            id="productSku"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturerSku">Manufacturer SKU</label>
          <input
            onChange={handleFormChange}
            value={productDetails.manufacturerSku}
            name="manufacturerSku"
            id="manufacturerSku"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCategory">Product Category</label>
          <input
            onChange={handleFormChange}
            value={productDetails.productCategory}
            name="productCategory"
            id="productCategory"
            type="text"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="new-product-button">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
