import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import authService from "../services/userService";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    authService.signout();
    if (setUser) {
      setUser(null);
    }
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/favicon_io/apple-touch-icon.png" alt="Site Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li className="link-to-pages">
            <Link to="/" className="center-me">
              Home
            </Link>
          </li>
          <li className="link-to-pages">
            <Link to="/products" className="center-me">
              Products
            </Link>
          </li>
          <li className="link-to-pages">
            <Link to="/dashboard" className="center-me">
              Dashboard
            </Link>
          </li>
          <li className="link-to-pages">
            <Link to="/cart" className="center-me">
              Cart
            </Link>
          </li>
          {user ? (
            <li>
              <button className="nav-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin" className="nav-button">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="nav-button">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
