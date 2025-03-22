import React, { useEffect, useState, useContext } from "react";
import Input from "../UI/Input";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddTshirtForm.module.css";
import AvailableTshirtContext from "../../store/available-tshirt-context";
import { URL } from "../../store/env/globals";

const AddTshirtForm = (props) => {
  const [tshirtDescription, setTshirtDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [tshirtName, setTshirtName] = useState("");
  const [largeSizeQuantity, setLargeSizeQuantity] = useState("");
  const [mediumSizeQuantity, setMediumSizeQuantity] = useState("");
  const [smallSizeQuantity, setSmallSizeQuantity] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const AvailableTshirtCtx = useContext(AvailableTshirtContext);

  //set the form validity
  useEffect(() => {
    const id = setTimeout(() => {
      setIsFormValid(
        tshirtDescription.trim().length > 0 &&
          sellingPrice.trim().length > 0 &&
          tshirtName.trim().length > 0 &&
          (largeSizeQuantity.trim().length > 0 ||
            mediumSizeQuantity.trim().length > 0 ||
            smallSizeQuantity.trim().length > 0)
      );
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [
    tshirtName,
    tshirtDescription,
    sellingPrice,
    largeSizeQuantity,
    mediumSizeQuantity,
    smallSizeQuantity,
  ]);

  const tshirtDescriptionInputChangeHandler = (e) => {
    setTshirtDescription(e.target.value);
  };
  const sellingPriceInputChangeHandler = (e) => {
    setSellingPrice(e.target.value);
  };
  const tshirtNameInputChangeHandler = (e) => {
    setTshirtName(e.target.value);
  };
  const largeSizeInputChangeHandler = (e) => {
    setLargeSizeQuantity(e.target.value);
  };
  const mediumSizeInputChangeHandler = (e) => {
    setMediumSizeQuantity(e.target.value);
  };
  const smallSizeInputChangeHandler = (e) => {
    setSmallSizeQuantity(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const tshirtDetail = {
      name: tshirtName,
      price: +sellingPrice,
      description: tshirtDescription,
      largeSizeQuantity: +largeSizeQuantity,
      mediumSizeQuantity: +mediumSizeQuantity,
      smallSizeQuantity: +smallSizeQuantity,
    };
    if (isFormValid) {
      const response = await fetch(`${URL}/product.json`, {
        method: "POST",
        body: JSON.stringify(tshirtDetail),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      AvailableTshirtCtx.addItem({ id: data.name, ...tshirtDetail });
      setTshirtDescription("");
      setSellingPrice("");
      setTshirtName("");
      setLargeSizeQuantity("");
      setMediumSizeQuantity("");
      setSmallSizeQuantity("");
    }
  };

  return (
    <section className={classes.addProduct}>
      <Card>
        <form onSubmit={submitHandler}>
          <Input
            onChange={tshirtNameInputChangeHandler}
            value={tshirtName}
            type="text"
            id="tshirtName"
            label="Tshirt Name"
          />
          <Input
            onChange={tshirtDescriptionInputChangeHandler}
            value={tshirtDescription}
            type="text"
            id="tshirtDesc"
            label="Tshirt Description"
          />
          <Input
            onChange={sellingPriceInputChangeHandler}
            value={sellingPrice}
            type="number"
            id="sellingPrice"
            label="Selling Price"
          />
          <Input
            onChange={largeSizeInputChangeHandler}
            value={largeSizeQuantity}
            type="number"
            id="largeSize"
            label="Large Size Qt."
          />
          <Input
            onChange={mediumSizeInputChangeHandler}
            value={mediumSizeQuantity}
            type="number"
            id="mediumSize"
            label="Medium Size Qt."
          />
          <Input
            onChange={smallSizeInputChangeHandler}
            value={smallSizeQuantity}
            type="number"
            id="smallSize"
            label="Small Size Qt."
          />
          <Button type="submit">Add Product</Button>
        </form>
      </Card>
    </section>
  );
};

export default AddTshirtForm;
