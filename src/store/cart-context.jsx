import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  initialiseCart: (items) => {},
});

export default CartContext;
