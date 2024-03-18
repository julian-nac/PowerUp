import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { useSoundVolume } from './SoundContext';

const SoundVolumeControl = () => {
  const { volume, changeVolume } = useSoundVolume();
  const [sliderValue, setSliderValue] = useState(volume);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    changeVolume(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Volumen</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
        thumbTintColor="#FFD700" // Color del botón deslizante
        minimumTrackTintColor="#FFD700" // Color de la barra de seguimiento del deslizador
      />
      <Text style={styles.volumeText}>Volumen: {sliderValue.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fondo negro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD700', // Texto amarillo
  },
  slider: {
    width: '80%',
    marginBottom: 30,
  },
  volumeText: {
    fontSize: 18,
    color: '#FFF', // Texto blanco
  },
});

export default SoundVolumeControl;
