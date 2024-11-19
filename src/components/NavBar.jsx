import { Link, useNavigate } from "react-router-dom";
import "../components/NavBar.css";
import "../App.css";
import authService from "../services/userService";

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  // Handle the signout process
  const handleSignOut = () => {
    authService.signout();
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="favicon_io/apple-touch-icon.png" alt="Site Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
      <ul className="nav-links users-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          {user ? (
            <span onClick={handleSignOut}>Sign Out</span>
          ) : (
            <>
              <Link to="/signin">Sign In</Link> |{" "}
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
