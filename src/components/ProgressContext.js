
import React, { createContext, useContext, useState } from 'react';

import moment from 'moment'

const ProgressContext = createContext();


export const ProgressProvider = ({ children }) => {

  const [progreso, setProgreso] = useState(0);

  const [rutinaCompletadaDiaria, setRutinaCompletadaDiaria] = useState({
    Lunes: false,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });

  const [categoriaActual, setCategoriaActual] = useState(null)

  const [progresoCuerpo , setProgresoCuerpo] = useState(0);

  const [progresoBrazos, setProgresoBrazos] = useState(0);

  const [progresoPierna, setProgresoPierna] = useState(0);

  const [progresoPecho, setProgresoPecho] = useState(0);

  const [progresoEspalda, setProgresoEspalda] = useState(0);

  const [progresoAbdomen, setProgresoAbdomen] = useState(0);


  const marcarRutinaCompletadaDiaria = (dia) => {
    setRutinaCompletadaDiaria((prev) => ({ ...prev, [dia]: true }));
  };

  const actualizarProgreso = (nuevoProgreso, nuevaCategoria) => {
  
    setProgreso(nuevoProgreso);

    if (nuevaCategoria === 'Brazos') {
  
      setProgresoBrazos((prevProgresoBrazos) => prevProgresoBrazos + 1);
  
    } else if (nuevaCategoria === 'Piernas') {
  
      setProgresoPierna((prevProgresoPierna) => prevProgresoPierna + 1);
  
    } else if (nuevaCategoria === 'Cuerpo Completo') {

      setProgresoCuerpo((prevProgresoCuerpo) => prevProgresoCuerpo + 1);

    } else if (nuevaCategoria === 'Pecho') {

      setProgresoPecho((prevProgresoPecho) => prevProgresoPecho + 1);

    } else if (nuevaCategoria === 'Espalda') {

      setProgresoEspalda((prevProgresoEspalda) => prevProgresoEspalda + 1);

    } else if (nuevaCategoria === 'Abdomen') {

      setProgresoAbdomen((prevProgresoAbdomen) => prevProgresoAbdomen + 1);
    
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

      progresoCuerpo,

      progresoPecho,

      progresoEspalda,

      progresoAbdomen,

      rutinaCompletadaDiaria,

      setProgresoAbdomen,

      setProgresoEspalda,

      setProgresoPecho,

      setProgresoCuerpo,
  
      setProgresoPierna,
  
      setProgresoBrazos,
  
      actualizarProgreso,

      marcarRutinaCompletadaDiaria,
  
    }}
  
  >
  
      {children}
  
    </ProgressContext.Provider>
  
  );

};

export const useProgress = () => {

  return useContext(ProgressContext);

};
