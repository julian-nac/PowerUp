
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

  const AsyncStorageKeys = {

    Progreso: 'progreso',

    ProgresoBrazos: 'progresoBrazos',

    ProgresoPierna: 'progresoPierna',

    ProgresoCuerpo: 'progresoCuerpo',

    ProgresoPecho: 'progresoPecho',

    ProgresoEspalda: 'progresoEspalda',

    ProgresoAbdomen: 'progresoAbdomen',

  };

  const cargarProgreso = async (key, setProgreso) => {

    try {

      const progresoGuardado = await AsyncStorage.getItem(key);

      if (progresoGuardado) {

        setProgreso(parseInt(progresoGuardado, 10));

      }

    } catch (error) {

      console.error(`Error al cargar ${key} desde AsyncStorage:`, error);

    }

  };

  const guardarProgreso = async (key, nuevoProgreso) => {

    try {

      await AsyncStorage.setItem(key, nuevoProgreso.toString());

    } catch (error) {

      console.error(`Error al guardar ${key} en AsyncStorage:`, error);

    }

  };
  
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

  useEffect(() => {
  
    cargarProgreso(AsyncStorageKeys.Progreso, setProgreso);
  
    cargarProgreso(AsyncStorageKeys.ProgresoBrazos, setProgresoBrazos);
  
    cargarProgreso(AsyncStorageKeys.ProgresoPierna, setProgresoPierna);
  
    cargarProgreso(AsyncStorageKeys.ProgresoCuerpo, setProgresoCuerpo);
  
    cargarProgreso(AsyncStorageKeys.ProgresoPecho, setProgresoPecho);
  
    cargarProgreso(AsyncStorageKeys.ProgresoEspalda, setProgresoEspalda);
  
    cargarProgreso(AsyncStorageKeys.ProgresoAbdomen, setProgresoAbdomen);
  
  }, []);

  useEffect(() => {
  
    guardarProgreso(AsyncStorageKeys.Progreso, progreso)
  
    guardarProgreso(AsyncStorageKeys.ProgresoBrazos, progresoBrazos);
  
    guardarProgreso(AsyncStorageKeys.ProgresoPierna, progresoPierna);
  
    guardarProgreso(AsyncStorageKeys.ProgresoCuerpo, progresoCuerpo);
  
    guardarProgreso(AsyncStorageKeys.ProgresoPecho, progresoPecho);
  
    guardarProgreso(AsyncStorageKeys.ProgresoEspalda, progresoEspalda);
  
    guardarProgreso(AsyncStorageKeys.ProgresoAbdomen, progresoAbdomen);
  
  }, [progreso, progresoBrazos, progresoPierna, progresoCuerpo, progresoPecho, progresoEspalda, progresoAbdomen]);


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