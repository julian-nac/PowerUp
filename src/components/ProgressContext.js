
import React, { createContext, useContext, useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


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

  const [categoriaActual, setCategoriaActual] = useState(null);

  const [progresoCuerpo, setProgresoCuerpo] = useState(0);

  const [progresoBrazos, setProgresoBrazos] = useState(0);

  const [progresoPierna, setProgresoPierna] = useState(0);

  const [progresoPecho, setProgresoPecho] = useState(0);

  const [progresoEspalda, setProgresoEspalda] = useState(0);

  const [progresoAbdomen, setProgresoAbdomen] = useState(0);


  
  const marcarRutinaCompletadaDiaria = async (dia) => {
  
    try {
  
      setRutinaCompletadaDiaria((prev) => {
  
        const nuevoEstado = { ...prev, [dia]: true };
  
        AsyncStorage.setItem('rutinaCompletadaDiaria', JSON.stringify(nuevoEstado));
  
        return nuevoEstado;
  
      });
  
      console.log('Datos guardados correctamente en AsyncStorage');
  
    } catch (error) {
  
      console.error('Error al guardar rutinaCompletadaDiaria en AsyncStorage:', error);
  
    }
  
  };


  const cargarRutinaCompletadaDiaria = async () => {
  
    try {
  
      const datosGuardados = await AsyncStorage.getItem('rutinaCompletadaDiaria');
  
      if (datosGuardados) {
  
        const parsedData = JSON.parse(datosGuardados);
  
        console.log('Datos cargados desde AsyncStorage:', parsedData);
  
        setRutinaCompletadaDiaria(parsedData);
  
      }
  
    } catch (error) {
  
      console.error('Error al cargar datos desde AsyncStorage:', error);
  
    }
  
  };

  useEffect(() => {
  
    cargarRutinaCompletadaDiaria();
  
  }, []);

  
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