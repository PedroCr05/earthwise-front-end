import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
import userService from "../services/userService";
import { useEffect, useState } from "react";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    if (currentUser && currentUser.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        console.log("Fetched products data:", response);

        // Directly use response if it contains an array of products
        if (!Array.isArray(response)) {
          throw new Error("Products data is not an array");
        }

        setProductList(response);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProductList((prevList) =>
        prevList.filter((product) => product._id !== productId)
      );
      setModalMessage("Product deleted successfully");
      setModalVisible(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again later.");
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage("");
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
                      onClick={() => handleViewDetails(product._id)}
                    >
                      View Details
                    </button>

                    {/* Admin options */}
                    {isAdmin && (
                      <div className="admin-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEditProduct(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
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

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductList;



// import { useNavigate } from "react-router-dom";
// import productService from "../services/productService";
// import userService from "../services/userService";
// import { useEffect, useState } from "react";
// import "./ProductList.css";

// const ProductList = () => {
//   const navigate = useNavigate();
//   const [productList, setProductList] = useState([]);
//   const [error, setError] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const currentUser = userService.getCurrentUser();
//     if (currentUser && currentUser.role === "admin") {
//       setIsAdmin(true);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await productService.getProducts();
//         console.log("Fetched products data:", response);

//         // Directly use response if it contains an array of products
//         if (!Array.isArray(response)) {
//           throw new Error("Products data is not an array");
//         }

//         setProductList(response);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products. Please try again later.");
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleDeleteProduct = async (productId) => {
//     try {
//       await productService.deleteProduct(productId);
//       setProductList((prevList) =>
//         prevList.filter((product) => product._id !== productId)
//       );
//       setError("Product deleted successfully");
//       setTimeout(() => setError(null), 3000);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       setError("Failed to delete product. Please try again later.");
//     }
//   };

//   const handleViewDetails = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const handleEditProduct = (productId) => {
//     navigate(`/edit-product/${productId}`);
//   };

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="page-container">
//       <main className="main-content">
//         <div className="product-container">
//           {productList.length === 0 ? (
//             <div className="no-products-message">No products available.</div>
//           ) : (
//             productList.map((product) => (
//               <div key={product._id} className="product-card">
//                 <img
//                   src={product.productImage}
//                   alt={product.productName}
//                   className="product-image"
//                 />
//                 <div className="product-details">
//                   <div className="product-name">{product.productName}</div>
//                   <div className="product-description">
//                     {product.productDescription}
//                   </div>
//                   <div className="product-price">${product.productPrice}</div>
//                   <div className="button-container">
//                     <button
//                       className="view-details-button"
//                       onClick={() => handleViewDetails(product._id)}
//                     >
//                       View Details
//                     </button>

//                     {/* Admin options */}
//                     {isAdmin && (
//                       <div className="admin-actions">
//                         <button
//                           className="edit-button"
//                           onClick={() => handleEditProduct(product._id)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="delete-button"
//                           onClick={() => handleDeleteProduct(product._id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProductList;
