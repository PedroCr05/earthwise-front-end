import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:3000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Log the full API response

        // Adjust the code based on the actual structure of response.data
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else if (Array.isArray(response.data)) {
          // Handle case where products are returned directly as an array
          setProducts(response.data);
        } else {
          throw new Error("Unexpected response format.");
        }
      } catch (err) {
        console.error("Error fetching products:", {
          message: err.message,
          stack: err.stack,
          response: err.response,
        });

        setError(
          err.response?.data?.message ||
            "Failed to fetch products. Please check your connection or try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {user.username || "User"}!</h2>
      </header>

      {user && (
        <section className="user-info-section">
          <h3>Your Information</h3>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
        </section>
      )}

      <section className="product-section">
        <h3>Available Products</h3>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <ProductList products={products} />
        )}
      </section>
    </div>
  );
};

export default Dashboard;










// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import userService from "../services/userService";
// import "./Dashboard.css";

// const Dashboard = ({ user, setUser }) => {
//   // const [user, setUser] = useState(null);
//   const [role, setRole] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch current user
//   useEffect(() => {
//     const currentUser = userService.getCurrentUser();
//     if (currentUser) {
//       setUser(currentUser);
//       setRole(currentUser.role || "User");
//     } else {
//       navigate("/signin");
//     }
//   }, [navigate]);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("authToken"); // Retrieve the token

//       try {
//         const response = await axios.get("http://localhost:3000/products", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token in the header
//           },
//         });
//         console.log("API Response:", response.data);

//         // Access the 'products' array from the response object
//         if (response.data && Array.isArray(response.data.products)) {
//           setProducts(response.data.products); // Set products from the response
//         } else {
//           throw new Error("Unexpected response format.");
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err.message);
//         setError("Unable to fetch products. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Render when user data is loading
//   if (!user) {
//     return <p>Loading user data...</p>;
//   }

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h2>Welcome, {user.username || "User"}!</h2>
//         {role && <p>You are logged in as a {role}.</p>}
//       </header>

//       <section className="user-info-section">
//         <h3>Your Information</h3>
//         <p>Username: {user.username}</p>
//         <p>Name: {user.name}</p>
//         <p>Email: {user.email}</p>
//         <p>Phone Number: {user.phoneNumber}</p>
//       </section>

//       <section className="product-section">
//         <h3>Available Products</h3>
//         {loading ? (
//           <p>Loading products...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : products.length > 0 ? (
//           <ul className="product-list">
//             {products.map((product) => (
//               <li key={product._id} className="product-item">
//                 <img
//                   src={product.productImage}
//                   alt={product.productName}
//                   className="product-image"
//                 />
//                 <h4>{product.productName}</h4>
//                 <p>{product.productDescription}</p>
//                 <p className="product-price">
//                   ${product.productPrice.toFixed(2)}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No products available at the moment.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
