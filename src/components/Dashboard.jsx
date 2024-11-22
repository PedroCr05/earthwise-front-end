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
        <h1>Available Products</h1>
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










