import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        totalAmount: existingCartItem.totalAmount + existingCartItem.price,
        amount: existingCartItem.amount + +action.item.amount,
        largeSizeQuantity:
          action.item.size === "L"
            ? action.item.amount + existingCartItem.largeSizeQuantity
            : existingCartItem.largeSizeQuantity,
        mediumSizeQuantity:
          action.item.size === "M"
            ? action.item.amount + existingCartItem.mediumSizeQuantity
            : existingCartItem.mediumSizeQuantity,
        smallSizeQuantity:
          action.item.size === "S"
            ? action.item.amount + existingCartItem.smallSizeQuantity
            : existingCartItem.smallSizeQuantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const item = {
        id: action.item.id,
        totalAmount: action.item.price,
        name: action.item.name,
        price: action.item.price,
        amount: action.item.amount,
        largeSizeQuantity: action.item.size === "L" ? action.item.amount : 0,
        mediumSizeQuantity: action.item.size === "M" ? action.item.amount : 0,
        smallSizeQuantity: action.item.size === "S" ? action.item.amount : 0,
      };
      updatedItems = state.items.concat(item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
