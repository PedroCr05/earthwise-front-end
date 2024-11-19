import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import authService from "../services/userService";

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    authService.signout();
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="favicon_io/apple-touch-icon.png" alt="Site Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <ul></ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            {user ? (
              <button className="nav-button" onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/signin" className="nav-button">
                  Sign In
                </Link>
                <Link to="/signup" className="nav-button">
                  Sign Up
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
