import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Tshirt from "./components/Tshirt/Tshirt";
import CartContextProvider from "./store/CartContextProvider";
const App = () => {
  const [isCartShown, setIsCartShown] = useState(false);
  const showCartHandler = () => {
    setIsCartShown(true);
  };
  const hideCartHandler = () => {
    setIsCartShown(false);
  };
  return (
    <CartContextProvider>
      {isCartShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main style={{ marginTop: "50px" }}>
        <Tshirt />
      </main>
    </CartContextProvider>
  );
};

export default App;
