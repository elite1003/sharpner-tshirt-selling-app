import React, { useContext } from "react";
import TshirtItemForm from "./TshirtItemForm";
import classes from "./TshirtItem.module.css";
import CartContext from "../../../store/cart-context";
import AvailableTshirtContext from "../../../store/available-tshirt-context";
import { URL } from "../../../store/env/globals";

const TshirtItem = (props) => {
  const cartCtx = useContext(CartContext);
  const availableTshirtCtx = useContext(AvailableTshirtContext);
  const price = `Rs ${props.price.toFixed(2)}`;

  const addToCartHandler = (amount, size) => {
    cartCtx.addItem({
      id: props.id,
      price: +props.price,
      amount: +amount,
      name: props.name,
      size: size,
    });
  };
  const updateQuantity = async (size) => {
    let body;
    if (size === "L") {
      body = { largeSizeQuantity: props.largeSizeQuantity - 1 };
    } else if (size === "M") {
      body = { mediumSizeQuantity: props.mediumSizeQuantity - 1 };
    } else {
      body = { smallSizeQuantity: props.smallSizeQuantity - 1 };
    }
    try {
      await fetch(`${URL}/product/${props.id}.json`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (e) {
      alert("from TshirtItem Component", e.message);
    }
    availableTshirtCtx.removeItem(props.id, size);
  };
  return (
    <li className={classes.tshirt}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <TshirtItemForm
          onAddToCart={addToCartHandler}
          updateQuantity={updateQuantity}
          largeSizeQuantity={props.largeSizeQuantity}
          mediumSizeQuantity={props.mediumSizeQuantity}
          smallSizeQuantity={props.smallSizeQuantity}
        />
      </div>
    </li>
  );
};

export default TshirtItem;
