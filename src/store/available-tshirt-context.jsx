import React from "react";

const AvailableTshirtContext = React.createContext({
  items: [],
  addItem: (item) => {},
});

export default AvailableTshirtContext;
