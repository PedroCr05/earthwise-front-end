import { Link } from "react-router-dom";
import "../components/NavBar.css";
import "../App.css"
const NavBar = () => {
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
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/sign-out">Sign Out</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
