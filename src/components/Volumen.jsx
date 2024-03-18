import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Slider } from 'react-native-elements';

import { useSoundVolume } from './SoundContext';

import { useNavigation } from '@react-navigation/native';


const SoundVolumeControl = () => {

  const { volume, changeVolume } = useSoundVolume();

  const [sliderValue, setSliderValue] = useState(volume);

  const navigation = useNavigation()

  const handleSliderChange = (value) => {

    setSliderValue(value);

    changeVolume(value);

  };

  return (

    <View style={styles.container}>

        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>

        <Image source={require('../../assets/images/back.png')} style={styles.logo} />

        </TouchableOpacity>
    
      <Text style={styles.title}>Control de Volumen</Text>
    
      <Slider
    
      style={styles.slider}
      
      minimumValue={0}
      
      maximumValue={1}
      
      value={sliderValue}
      
      onValueChange={handleSliderChange}
      
      thumbTintColor="yellow" 
      
      minimumTrackTintColor="yellow" 
      
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

    backgroundColor: '#000',

  },

  title: {

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 20,

    color: 'yellow', 

  },

  slider: {

    width: '80%',

    marginBottom: 30,

  },

  volumeText: {

    fontSize: 18,

    color: '#FFF',

  },

  goBack: {

    position: 'absolute',

    top: 20,

    right: 1,

  },
  logo: {
  
    width: 32, 

    height: 32,

    marginRight: 10,

  },
});

export default SoundVolumeControl;
