import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../services/productService";
// import "./EditProduct.css";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productImage: "",
    productQuantity: "",
    productSku: "",
    manufacturerSku: "",
    productCategory: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data to populate form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        console.log("Fetched product data:", productData);  // Added log to check the fetched product data
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("An error occurred while fetching the product.");
      } finally {
        setLoading(false); // Always set loading to false after fetching
      }
    };

    fetchProduct();
  }, [productId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productService.updateProduct(productId, product); // Update the product
      navigate(`/product/${productId}`); // Navigate to the product page after updating
    } catch (err) {
      setError("An error occurred while updating the product.");
      console.error("Error updating product:", err);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-product-container">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            onChange={handleFormChange}
            value={product.productName}
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
            value={product.productDescription}
            name="productDescription"
            id="productDescription"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price</label>
          <input
            onChange={handleFormChange}
            value={product.productPrice}
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
            value={product.productImage}
            name="productImage"
            id="productImage"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productQuantity">Product Quantity</label>
          <input
            onChange={handleFormChange}
            value={product.productQuantity}
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
            value={product.productSku}
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
            value={product.manufacturerSku}
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
            value={product.productCategory}
            name="productCategory"
            id="productCategory"
            type="text"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;





// import { useParams, useNavigate } from "react-router-dom"; 
// import { useEffect, useState } from "react";
// import productService from "../services/productService";
// import "./EditProduct.css";

// const EditProduct = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [productDetails, setProductDetails] = useState({
//     productName: "",
//     productDescription: "",
//     productPrice: "",
//     productImage: "",
//     productQuantity: "",
//     productSku: "",
//     manufacturerSku: "",
//     productCategory: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch product data to populate form
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const productData = await productService.getProductById(productId);
//         if (productData) {
//           setProductDetails(productData);
//         } else {
//           setError("Product not found");
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("An error occurred while fetching the product.");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setProductDetails({
//       ...productDetails,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await productService.updateProduct(productId, productDetails); // Update the product
//       navigate(`/product/${productId}`); // Navigate to the product page after updating
//     } catch (err) {
//       setError("An error occurred while updating the product.");
//       console.error("Error updating product:", err);
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <div className="edit-product-container">
//       <h3>Edit Product</h3>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit} className="edit-product-form">
//         <div className="form-group">
//           <label htmlFor="productName">Product Name</label>
//           <input
//             onChange={handleFormChange}
//             value={productDetails.productName}
//             name="productName"
//             id="productName"
//             type="text"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="productDescription">Product Description</label>
//           <textarea
//             onChange={handleFormChange}
//             value={productDetails.productDescription}
//             name="productDescription"
//             id="productDescription"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="productPrice">Product Price</label>
//           <input
//             onChange={handleFormChange}
//             value={productDetails.productPrice}
//             name="productPrice"
//             id="productPrice"
//             type="number"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="productImage">Product Image URL</label>
//           <input
//             onChange={handleFormChange}
//             value={productDetails.productImage}
//             name="productImage"
//             id="productImage"
//             type="text"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="productQuantity">Product Quantity</label>
//           <input
//             onChange={handleFormChange}
//             value={productDetails.productQuantity}
//             name="productQuantity"
//             id="productQuantity"
//             type="number"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="productSku">Product SKU</label>
//           <input
//             onChange={handleFormChange}
//             value={productDetails.productSku}
//             name="productSku"
//             id="productSku"
//             type="text"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="manufacturerSku">Manufacturer SKU</label>
//           <input
//             onChange={handleFormChange}
//             value={productDetails.manufacturerSku}
//             name="manufacturerSku"
//             id="manufacturerSku"
//             type="text"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="productCategory">Product Category</label>
//           <input
//             onChange={handleFormChange}
//             value={productDetails.productCategory}
//             name="productCategory"
//             id="productCategory"
//             type="text"
//             required
//           />
//         </div>
//         <div className="form-actions">
//           <button type="submit">Update Product</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;
