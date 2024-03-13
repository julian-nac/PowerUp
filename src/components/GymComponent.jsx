
import React, { useState, useRef } from 'react';

import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { rutinas } from '../data/ejerciciosGym.json';


const GymComponente = () => {

  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);

  const scrollViewRef = useRef(null);

  const navigation = useNavigation();

  const zonasUnicas = [...new Set(rutinas.map((rutina) => rutina.zona))].filter(Boolean);

  const handleZonaPress = (zona) => {
   
    setZonaSeleccionada(zona);
   
    scrollViewRef.current?.scrollTo({ y: 1000, animated: true });
  
  };

  const handleRutinaPress = (rutina) => {
  
    navigation.navigate('Rutina', { rutina });
  
  };

  return (
  
  <View style={styles.container}>
  
      <ImageBackground
  
      source={require('../../assets/images/Fondo-pantalla-metal.jpg')}
      
      style={styles.backgroundImage}
      
      >
      
        <ScrollView ref={scrollViewRef}>
      
          <View style={styles.filterContainer}>
      
            <Text style={styles.filterText}>Seleccionar Zona:</Text>
      
          </View>


          <View style={styles.zonasContainer}>

            {zonasUnicas.map((zona, index) => (

          <TouchableOpacity
          
          key={index}
          
          style={styles.zonaContainer}
          
          onPress={() => handleZonaPress(zona)}
          
          >
          
          <Image source={{ uri: rutinas.find((rutina) => rutina.zona === zona)?.banner }} style={styles.zonaImage} />
    
          </TouchableOpacity>

          ))}
          
          </View>

          {zonaSeleccionada && (
          
          <View style={styles.rutinasContainer}>
          
              <Text style={styles.rutinasText}>{`Rutinas para ${zonaSeleccionada}:`}</Text>
          
              {rutinas
          
          .filter((rutina) => rutina.zona === zonaSeleccionada)
          
          .map((rutina, index) => (
          
            <TouchableOpacity
          
            key={index}
          
            style={styles.rutinaContainer}
          
            onPress={() => handleRutinaPress(rutina)}
          
          >
          
          <Image source={{ uri: rutina.imagen }} style={styles.rutinaImage} />
          
          <Text style={styles.rutinaText}>{`Ejercicios: ${rutina.ejercicios.length}`}</Text>
          
          <Text style={styles.rutinaText}>{`Categoría: ${rutina.categoria}`}</Text>
          
         </TouchableOpacity>
  
          ))}
          
            </View>
          
          )}
        
        </ScrollView>
      
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
  },
  filterContainer: {
    padding: 16,
    backgroundColor: 'black',
    borderBottomColor: 'yellow',
    borderWidth: 2,
  },
  filterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  zonasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
  },
  zonaContainer: {
    alignItems: 'center',
    margin: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.93)',
    borderRadius: 8,
  },
  zonaImage: {
    width: 180,
    height: 230,
  },
  zonaText: {
    fontSize: 16,
  },
  rutinasContainer: {
    marginTop: 16,
    padding: 16,
  },
  rutinasText: {
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    borderBottomColor: 'yellow',
    borderWidth: 2,
    marginBottom: 8,
  },
  rutinaContainer: {
    alignItems: 'center',
    marginVertical: 8,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    borderRadius: 8,
  },
  rutinaImage: {
    width: 90, // Ajusta el ancho según tus necesidades
    height: 90, // Ajusta la altura según tus necesidades
    marginBottom: 8,
  },
  rutinaText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
});

export default GymComponente;
