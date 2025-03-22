import classes from "./TshirttemForm.module.css";

const TshirtItemForm = (props) => {
  const buyTshirtHandler = (amount, size) => {
    props.onAddToCart(amount, size);
    props.updateQuantity(size);
  };
  return (
    <form className={classes.form}>
      {+props.largeSizeQuantity > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            buyTshirtHandler(1, "L");
          }}
        >
          buy Large <span>{props.largeSizeQuantity}</span>
        </button>
      )}
      {+props.mediumSizeQuantity > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            buyTshirtHandler(1, "M");
          }}
        >
          buy Medium <span>{props.mediumSizeQuantity}</span>
        </button>
      )}
      {+props.smallSizeQuantity > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            buyTshirtHandler(1, "S");
          }}
        >
          buy Small <span>{props.smallSizeQuantity}</span>
        </button>
      )}
    </form>
  );
};

export default TshirtItemForm;
