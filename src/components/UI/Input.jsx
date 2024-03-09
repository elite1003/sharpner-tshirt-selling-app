import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        id={props.id}
      />
    </div>
  );
};

export default Input;
