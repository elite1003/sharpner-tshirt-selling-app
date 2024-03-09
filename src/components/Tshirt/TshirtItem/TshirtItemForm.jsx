import classes from "./TshirtItemForm.module.css";

const TshirtItemForm = (props) => {
  const btnClickHandler = (value, size) => {
    props.onAddToCart(value, size);
    props.updateQuantity(size);
  };
  return (
    <form className={classes.form}>
      <button
        onClick={(e) => {
          e.preventDefault();
          btnClickHandler(1, "L");
        }}
      >
        buy Large <span>{props.largeSizeQuantity}</span>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          btnClickHandler(1, "M");
        }}
      >
        buy Medium <span>{props.mediumSizeQuantity}</span>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          btnClickHandler(1, "S");
        }}
      >
        buy Small <span>{props.smallSizeQuantity}</span>
      </button>
    </form>
  );
};

export default TshirtItemForm;
