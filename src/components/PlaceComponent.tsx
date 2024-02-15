
import React, { useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image} from 'react-native';


interface PlaceComponentProps {

  handlePlaceSelection: (place: string) => void;

}
    
const PlaceComponent: React.FC<PlaceComponentProps> = ({ handlePlaceSelection }) => {
  
  const [selectedPlace, setSelectedPlace] = useState<string>('');
  
  
  const handleSelectPlace = (place: string) => {
  
    setSelectedPlace(place);
  
  };
  
  
  const handleContinue = () => {
  
    if (selectedPlace) {
  
      handlePlaceSelection(selectedPlace);
  
      } else {
  
      }
  
    };

  return (
 
 <View style={styles.container}>

 
    <ImageBackground
        
        source={require('../../assets/images/Fondo-pantalla-metal.jpg')}

        style={styles.backgroundImage}

      >
 
      <Text style={styles.title}>¿Dónde prefieres hacer ejercicio hoy?</Text>


      <TouchableOpacity
      
      style={[styles.optionButton, selectedPlace === 'parque' && styles.selectedOption]}
      
      onPress={() => handleSelectPlace('parque')}
      
      > 
      
      <View style={styles.optionContainer}>
        
        <Image
      
        source={require('../../assets/images/Parque.png')}  
      
        style={styles.optionImage}
    
        />
      
      <Text style={[styles.optionText, selectedPlace === 'parque' && styles.selectedText]}>Parque</Text>
      
      </View>

      </TouchableOpacity>


      <TouchableOpacity
      
      style={[styles.optionButton, selectedPlace === 'gimnasio' && styles.selectedOption]}
      
      onPress={() => handleSelectPlace('gimnasio')}
      
      > 
      
      <View style={styles.optionContainer}>
        
        <Image
      
        source={require('../../assets/images/Gimnasio.png')}  
      
        style={styles.optionImage}
    
        />
      
      <Text style={[styles.optionText, selectedPlace === 'gimnasio' && styles.selectedText]}>Gimnasio</Text>
      
      </View>

      </TouchableOpacity>


      <TouchableOpacity
      
      style={[styles.optionButton, selectedPlace === 'casa' && styles.selectedOption]}
      
      onPress={() => handleSelectPlace('casa')}
      
      > 
      
      <View style={styles.optionContainer}>
        
        <Image
      
        source={require('../../assets/images/Casa.png')}  
      
        style={styles.optionImage}
    
        />
      
      <Text style={[styles.optionText, selectedPlace === 'casa' && styles.selectedText]}>Casa</Text>
      
      </View>

      </TouchableOpacity>

 
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
 
        <Text style={styles.buttonText}>Continuar</Text>
 
      </TouchableOpacity>
 
      </ImageBackground>
 
    </View>
 
 );

};


const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

  backgroundImage: {
  
    flex: 1,

    resizeMode: 'cover',

    justifyContent: 'center',

  },

  title: {

    marginLeft: 9,

    marginRight: 10,

    fontSize: 21,

    fontWeight: 'bold',

    fontFamily: 'Arial, sans-serif',

    color: 'white',

    textAlign: 'left',

    marginBottom: 20,

    textShadowColor: 'black', 

    textShadowOffset: { width: 3, height: 3 }, 

    textShadowRadius: 5,
  
  },

  optionButton: {

    backgroundColor: 'black',

    borderColor: 'yellow',

    borderWidth: 2,

    padding: 25,

    borderRadius: 0,

    marginBottom: 10,

  },

  selectedOption: {

    backgroundColor: 'yellow',

    borderColor: 'black',

    borderWidth: 2,

  },

  selectedText: {

    color: 'black', 

  },

  optionText: {
 
    fontSize: 18,
 
    fontWeight: 'bold',
 
    color: 'yellow'
 
  },
 
  continueButton: {
 
    marginTop: 20,
    
    marginLeft: 20,
    
    backgroundColor: 'yellow',
    
    padding: 10,
    
    borderRadius: 40,

    borderColor: 'black',

    borderWidth: 8,
    
    width: '90%',
  
  },
 
  buttonText: {
 
    textAlign: 'center',
  
    fontSize: 18,
  
    color: 'black',
  
    fontWeight: 'bold',
  
  },
 
  optionContainer: {
 
    flexDirection: 'row',
 
    alignItems: 'center',
 
  },
  
  optionImage: {
  
    width: 50,
  
    height: 50,
  
    marginRight: 18,
  
  },

});

export default PlaceComponent;
