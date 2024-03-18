import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SoundVolumeContext = createContext();

export const useSoundVolume = () => useContext(SoundVolumeContext);

export const SoundVolumeProvider = ({ children }) => {

  const [volume, setVolume] = useState(0.5);

  useEffect(() => {

    const fetchVolume = async () => {

      try {

        const savedVolume = await AsyncStorage.getItem('volume');

        if (savedVolume !== null) {

          setVolume(parseFloat(savedVolume)); 

        }

      } catch (error) {

        console.error('Error al obtener el volumen guardado:', error);

      }

    };

    fetchVolume(); 

  }, []);

  const changeVolume = async (newVolume) => {

    try {

      setVolume(newVolume);

      await AsyncStorage.setItem('volume', String(newVolume));

    } catch (error) {

      console.error('Error al guardar el volumen:', error);

    }

  };

  return (

  <SoundVolumeContext.Provider value={{ volume, changeVolume }}>

      {children}
  
  </SoundVolumeContext.Provider>

);

};
