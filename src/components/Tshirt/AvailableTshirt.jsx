import React, { useContext } from "react";
import classes from "./AvailableTshirt.module.css";
import TshirtItem from "./TshirtItem/TshirtItem";
import Card from "../UI/Card";
import AvailableTshirtContext from "../../store/available-tshirt-context";

const AvailableTshirt = () => {
  const AvailableTshirtCtx = useContext(AvailableTshirtContext);
  const { items } = AvailableTshirtCtx;
  const tshirtsList = items.map((tshirt) => (
    <TshirtItem
      id={tshirt.id}
      key={tshirt.id}
      name={tshirt.name}
      price={tshirt.price}
      description={tshirt.description}
      largeSizeQuantity={tshirt.largeSizeQuantity}
      mediumSizeQuantity={tshirt.mediumSizeQuantity}
      smallSizeQuantity={tshirt.smallSizeQuantity}
    />
  ));
  return (
    <section className={classes.tshirt}>
      <Card>
        <ul>{tshirtsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableTshirt;
