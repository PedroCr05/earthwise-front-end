import { useEffect, useState } from "react";
import shoppingCartService from "../services/shoppingCartService";
import "./ShoppingCart.css";
import "../App.css";

const ShoppingCart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      console.log("No user detected. Clearing cart.");
      setCartItems([]);
      return;
    }

    console.log("Fetching cart items for user:", user);

    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const items = await shoppingCartService.getCartItems();
        setCartItems(items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load shopping cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  if (!user) {
    return <div className="loginPrompt">Please log in to view your shopping cart.</div>;
  }

  if (loading) {
    return (
      <div className="shoppingCartContainer">
        <h1>Shopping Cart</h1>
        <div className="loading">Loading your cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shoppingCartContainer">
        <h1>Shopping Cart</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="shoppingCartContainer">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="emptyCart">Your cart is empty</div>
      ) : (
        <div className="cartItems">
          {cartItems.map((item, idx) => (
            <div key={idx} className="cartItem">
              <img src={item.productImage} alt={item.productName} className="cartItemImage" />
              <div className="cartItemDetails">
                <div className="cartItemName">{item.productName}</div>
                <div className="cartItemQuantity">Quantity: {item.quantity}</div>
                <div className="cartItemPrice">Price: ${item.productPrice}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;