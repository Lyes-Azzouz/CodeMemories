import React from "react";
import { createContext, useState } from "react";

export const CardsContentSelectContext = createContext();

export const CardsContentProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <CardsContentSelectContext.Provider
      value={{ selectedCard, setSelectedCard }}
    >
      {children}
    </CardsContentSelectContext.Provider>
  );
};
