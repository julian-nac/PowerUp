// En un archivo separado, por ejemplo, ProgressContext.js
import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progreso, setProgreso] = useState(0);
  const [categoriaActual, setCategoriaActual] = useState(null)
  const [progresoBrazos, setProgresoBrazos] = useState(0);
  const [progresoPierna, setProgresoPierna] = useState(0);

  const actualizarProgreso = (nuevoProgreso, nuevaCategoria) => {
    setProgreso(nuevoProgreso);

    if (nuevaCategoria === 'Brazos') {
      setProgresoBrazos((prevProgresoBrazos) => prevProgresoBrazos + 10);
    } else if (nuevaCategoria === 'Piernas') {
      setProgresoPierna((prevProgresoPierna) => prevProgresoPierna + 10);
    }

    setCategoriaActual(nuevaCategoria);
  };

  return (
    <ProgressContext.Provider
      value={{
        progreso,
        categoriaActual,
        progresoBrazos,
        progresoPierna,
        setProgresoPierna,
        setProgresoBrazos,
        actualizarProgreso,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  return useContext(ProgressContext);
};
