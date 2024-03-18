import React, { createContext, useContext, useState } from 'react';

const SoundVolumeContext = createContext();

export const useSoundVolume = () => useContext(SoundVolumeContext);

export const SoundVolumeProvider = ({ children }) => {
  const [volume, setVolume] = useState(0.5); // Establece el valor inicial del volumen

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  return (
    <SoundVolumeContext.Provider value={{ volume, changeVolume }}>
      {children}
    </SoundVolumeContext.Provider>
  );
};
