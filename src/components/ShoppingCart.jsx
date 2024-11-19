import { useEffect, useState } from "react";
import shoppingCartService from "../services/shoppingCartService";
import "./ShoppingCart.css";
import "../App.css";

const ShoppingCart = ({ cart }) => {
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await shoppingCartService.getCartItems();
        console.log("Fetched cart items:", items);
        setCartItems(items.length > 0 ? items : cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [cart]);

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
