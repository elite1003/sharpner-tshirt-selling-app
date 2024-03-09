import React from "react";
import AddTshirtForm from "./AddTshirtForm";
import AvailableTshirt from "./AvailableTshirt";
import AvailableTshirtContextProvider from "../../store/AvailableTshirtContextProvider";
const Meals = () => {
  return (
    <AvailableTshirtContextProvider>
      <AddTshirtForm />
      <AvailableTshirt />
    </AvailableTshirtContextProvider>
  );
};

export default Meals;
