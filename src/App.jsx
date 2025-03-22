import React, { useState, useContext, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Tshirt from "./components/Tshirt/Tshirt";
import CartContext from "./store/cart-context";
import { URL } from "./store/env/globals";

let initialRender = true;
const App = () => {
  const [isCartShown, setIsCartShown] = useState(false);
  const { initialiseCart, totalAmount, items } = useContext(CartContext);
  const showCartHandler = () => {
    setIsCartShown(true);
  };
  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  //initialising cart
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(`${URL}/cart.json`);
      if (!response.ok) {
        throw new Error("fetching cart data failed");
      }
      const data = await response.json();
      if (data) {
        initialiseCart(data.items || [], data.totalAmount);
      } else {
        initialiseCart([], 0);
      }
    };
    try {
      fetchCart();
    } catch (error) {
      alert(error.message);
    }
  }, [initialiseCart]);

  //saving cart to firebase
  useEffect(() => {
    if (initialRender) {
      initialRender = false;
      return;
    }
    const saveCartToFirebase = async () => {
      const response = await fetch(`${URL}/cart.json`, {
        method: "PUT",
        body: JSON.stringify({
          items: items,
          totalAmount: totalAmount,
        }),
      });
      if (!response.ok) {
        throw new Error("saving cart to firebase failed");
      }
    };
    try {
      saveCartToFirebase();
    } catch (error) {
      alert(error.message);
    }
  }, [items, totalAmount]);
  return (
    <>
      {isCartShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main style={{ marginTop: "100px" }}>
        <Tshirt />
      </main>
    </>
  );
};

export default App;
