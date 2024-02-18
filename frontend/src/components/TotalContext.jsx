import React, { createContext, useState, useContext } from 'react';

const TotalContext = createContext();

export const useTotalContext = () => useContext(TotalContext);

export const TotalProvider = ({ children }) => {
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <TotalContext.Provider
      value={{ totalUnits, setTotalUnits, totalAmount, setTotalAmount }}
    >
      {children}
    </TotalContext.Provider>
  );
};
