// En un archivo separado, por ejemplo, ProgressContext.js
import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progreso, setProgreso] = useState(0);

  const actualizarProgreso = (nuevoProgreso) => {
    setProgreso(nuevoProgreso);
  };

  return (
    <ProgressContext.Provider value={{ progreso, actualizarProgreso }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  return useContext(ProgressContext);
};
