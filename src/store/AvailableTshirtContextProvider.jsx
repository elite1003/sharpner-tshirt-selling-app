import React, { useReducer } from "react";
import AvailableTshirtContext from "./available-tshirt-context";

const defaultState = {
  items: [],
};

const availableTshirtReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
    };
  }
  if (action.type === "REDUCE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedItem = {
      ...existingItem,
      largeSizeQuantity:
        action.item.size === "L"
          ? existingItem.largeSizeQuantity - 1
          : existingItem.largeSizeQuantity,
      mediumSizeQuantity:
        action.item.size === "M"
          ? existingItem.mediumSizeQuantity - 1
          : existingItem.mediumSizeQuantity,
      smallSizeQuantity:
        action.item.size === "L"
          ? existingItem.smallSizeQuantity - 1
          : existingItem.smallSizeQuantity,
    };
    const updatedItems = [...state.items];
    updatedItems[existingItemIndex] = updatedItem;
    return {
      items: updatedItems,
    };
  }
  return defaultState;
};

const AvailableTshirtContextProvider = (props) => {
  const [availableTshirtState, dispatchAvailableTshirtAction] = useReducer(
    availableTshirtReducer,
    defaultState
  );

  const addAvailableTshirtHandler = (item) => {
    dispatchAvailableTshirtAction({ type: "ADD", item: item });
  };

  const availableTshirtContext = {
    items: availableTshirtState.items,
    addItem: addAvailableTshirtHandler,
  };
  return (
    <AvailableTshirtContext.Provider value={availableTshirtContext}>
      {props.children}
    </AvailableTshirtContext.Provider>
  );
};

export default AvailableTshirtContextProvider;
