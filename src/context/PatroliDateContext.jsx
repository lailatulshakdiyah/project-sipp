"use client";

import { createContext, useContext, useState } from "react";

export const PatroliDateContext = createContext();

export const PatroliDateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState("07-02-2025");

  return (
    <PatroliDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </PatroliDateContext.Provider>
  );
};

export const usePatroliDate = () => useContext(PatroliDateContext);