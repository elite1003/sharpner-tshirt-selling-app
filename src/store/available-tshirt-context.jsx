import React from "react";

const AvailableTshirtContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id, size) => {},
});

export default AvailableTshirtContext;
