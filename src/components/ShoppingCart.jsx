import { useEffect, useState, useRef } from "react";
import shoppingCartService from "../services/shoppingCartService";
import "./NavBar.css";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState(null); 
  const [editingItemId, setEditingItemId] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const isMounted = useRef(false);

  // Refresh Cart
  const refreshCart = async () => {
    setLoading(true);
    try {
      const fetchedItems = await shoppingCartService.getCartItems();
      setCartItems(fetchedItems || []);
    } catch (err) {
      setError("Failed to load cart items.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Item Deletion
  const handleRemoveItem = async (itemId) => {
    try {
      await shoppingCartService.removeItemFromCart(itemId);
      refreshCart();
    } catch (error) {
      setError("Failed to remove item.");
      console.error(error);
    }
  };

  // Handle Quantity Edit
  const handleEditQuantity = (itemId, currentQuantity) => {
    setEditingItemId(itemId);
    setEditedQuantity(currentQuantity);
    setError(null); 
  };

  // Save Updated Quantity
  const handleSaveQuantity = async (itemId) => {
    if (
      editedQuantity === null ||
      editedQuantity < 1 ||
      isNaN(editedQuantity)
    ) {
      setError("Please select a valid quantity.");
      return;
    }

    try {
      await shoppingCartService.updateItemInCart(itemId, {
        quantity: editedQuantity,
      });
      setEditingItemId(null);
      refreshCart(); 
    } catch (err) {
      setError("Failed to update quantity.");
      console.error(err);
    }
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.productPrice * item.quantity;
    }, 0).toFixed(2);
  };

  // Handle "Buy Now" button click
  const handleBuyNow = () => {
    setShowModal(true); 
  };

  useEffect(() => {
    if (!isMounted.current) {
      refreshCart(); // Fetch cart on mount
      isMounted.current = true;
    }
  }, [editedQuantity]); // Refresh cart when quantity is updated

  return (
    <div className="shoppingCartContainer">
      {loading && <p className="loading">Loading cart items...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="cartItems">
        {cartItems.length === 0 ? (
          <p className="emptyCart">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <li key={item._id} className="cartItem">
              <img src={item.productImage} alt={item.productName} />
              <div className="cartItemDetails">
                <p className="cartItemName">{item.productName}</p>
                <p className="cartItemPrice">{`$${item.productPrice}`}</p>

                {editingItemId === item._id ? (
                  <div className="quantityEdit">
                    <select
                      value={editedQuantity}
                      onChange={(e) =>
                        setEditedQuantity(Number(e.target.value))
                      }
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => handleSaveQuantity(item._id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="cartItemQuantity">
                    Quantity: {item.quantity}
                    <button
                      onClick={() =>
                        handleEditQuantity(item._id, item.quantity)
                      }
                    >
                      Update QTY
                    </button>
                  </p>
                )}
                <p className="cartItemTotalPrice">
                  {`Total: $${(item.productPrice * item.quantity).toFixed(2)}`}
                </p>
              </div>
              <button
                className="removeButton"
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Subtotal */}
      {cartItems.length > 0 && (
        <div className="cartSubtotal">
          <p className="subtotalLabel">Subtotal</p>
          <p className="subtotalPrice">${calculateSubtotal()}</p>
        </div>
      )}

      {/* Buy Now Button */}
      <button className="buyNowButton" onClick={handleBuyNow}>
        Buy Now
      </button>

      {/* Modal for order completion */}
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p>Thank you for your order!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
