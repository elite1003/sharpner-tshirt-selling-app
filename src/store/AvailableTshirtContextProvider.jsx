import React, { useCallback, useEffect, useReducer } from "react";
import AvailableTshirtContext from "./available-tshirt-context";
import { URL } from "./env/globals";
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
  if (action.type === "INIT") {
    return {
      items: action.item,
    };
  }
  if (action.type === "REMOVE") {
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
        action.item.size === "S"
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

  const fetchProduct = useCallback(async () => {
    try {
      let availableProduct = [];
      const response = await fetch(`${URL}/product.json`);
      const data = await response.json();
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          availableProduct.push({ ...data[key], id: key });
        }
      }
      dispatchAvailableTshirtAction({ type: "INIT", item: availableProduct });
    } catch (e) {
      alert(e.message);
    }
  }, []);
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  const addAvailableTshirtHandler = (item) => {
    dispatchAvailableTshirtAction({ type: "ADD", item: item });
  };

  const removeAvailableTshirtHandler = (id, size) => {
    dispatchAvailableTshirtAction({
      type: "REMOVE",
      item: { id: id, size: size },
    });
  };
  const availableTshirtContext = {
    items: availableTshirtState.items,
    addItem: addAvailableTshirtHandler,
    removeItem: removeAvailableTshirtHandler,
  };
  return (
    <AvailableTshirtContext.Provider value={availableTshirtContext}>
      {props.children}
    </AvailableTshirtContext.Provider>
  );
};

export default AvailableTshirtContextProvider;
