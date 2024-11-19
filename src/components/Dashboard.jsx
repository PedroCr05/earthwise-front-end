import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
import userService from "../services/userService";
import './Dashboard.css'; 

const Dashboard = () => {
  const [user, setUser] = useState(null); 
  const [role, setRole] = useState(""); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser); // Set user data from localStorage
      setRole(currentUser.role); // Set role of the user
    } else {
      navigate("/signin"); // Redirect if no user is found
    }
  }, [navigate]);

  // Fetch all products from the site when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Axios call to fetch all products
        const res = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`
        );
        console.log("Fetched all products:", res.data); // Log fetched products

        // Ensure the response is an array of products
        if (Array.isArray(res.data)) {
          setProducts(res.data); // Set the products in state
        } else {
          setError("Invalid data format received.");
        }
      } catch (err) {
        console.error("Error fetching products:", err); // Log any errors
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

  if (!user) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {user.username || "User"}!</h2>
        {role && <p>You are logged in as a {role}.</p>}
      </header>

      <section className="user-info-section">
        <h3>Your Information</h3>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phoneNumber}</p>
      </section>

      <section className="product-section">
        <h3>Available Products</h3>
        {loading ? (
          <p>Loading products...</p> 
        ) : error ? (
          <p className="error">{error}</p> 
        ) : products.length === 0 ? (
          <p>No products available at the moment.</p> 
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <h4>{product.productName}</h4>
                <p>{product.productDescription}</p>
                <p className="product-price">${product.productPrice}</p>
              </li> 
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
