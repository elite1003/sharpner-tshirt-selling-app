import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          {+props.largeSizeQuantity > 0 && (
            <span className={classes.amount}>{props.largeSizeQuantity} L</span>
          )}
          {+props.mediumSizeQuantity > 0 && (
            <span className={classes.amount}>{props.mediumSizeQuantity} M</span>
          )}
          {+props.smallSizeQuantity > 0 && (
            <span className={classes.amount}>{props.smallSizeQuantity} S</span>
          )}
        </div>
      </div>
      <div className={classes.action}>
        <span className={classes.price}>{props.totalAmount}</span>
      </div>
    </li>
  );
};

export default CartItem;
