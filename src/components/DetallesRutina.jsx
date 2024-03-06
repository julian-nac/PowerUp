
import React, { useState } from 'react';

import { View, Text, Button, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';

import moment from 'moment';  

import 'moment/locale/es'; // Importa la localización en español

import { useProgress } from './ProgressContext';


const DetallesRutina = ({ route, navigation }) => {

  const { rutina } = route.params;

  const [indiceEjercicio, setIndiceEjercicio] = useState(0);

  const { progreso, actualizarProgreso, marcarRutinaCompletadaDiaria} = useProgress()

  moment.locale('es'); // Establece la localización en español


  const handleSiguienteEjercicio = () => {
  
    if (indiceEjercicio < rutina.ejercicios.length - 1) {
  
      setIndiceEjercicio(indiceEjercicio + 1);
  
    } else {
  
      const categoriaDeRutina = rutina.zona;

      if (categoriaDeRutina === 'Brazos') {
        
        actualizarProgreso(progreso + 1, categoriaDeRutina);

      } else if (categoriaDeRutina === 'Piernas') {
        
        actualizarProgreso(progreso + 1, categoriaDeRutina);

      } else if (categoriaDeRutina === 'Cuerpo Completo') {

        actualizarProgreso(progreso + 1, categoriaDeRutina)

      } else if (categoriaDeRutina === 'Pecho') {

        actualizarProgreso(progreso + 1, categoriaDeRutina)

      } else if (categoriaDeRutina === 'Espalda'){

        actualizarProgreso(progreso + 1, categoriaDeRutina)

     } else if (categoriaDeRutina === 'Abdomen'){

        actualizarProgreso(progreso + 1, categoriaDeRutina)

      } else {
      
        actualizarProgreso(progreso + 1, null);
        
      }

      const diaActual = moment().format('dddd');
      
      marcarRutinaCompletadaDiaria(diaActual); // Marcar el lunes como completado

      navigation.navigate('Inicio');
    }
  };

  const avances = (indiceEjercicio + 1) / rutina.ejercicios.length;


  return (

<View style={styles.container}>

    <ImageBackground

        source={require('../../assets/images/Fondo-pantalla-metal.jpg')}

        style={styles.backgroundImage}

    >

      <View style={styles.header}>

        <Text style={styles.zonaText}>{rutina.zona}</Text>

      </View>

      <View style={styles.ejerciciosContainer}>

        <View style={styles.ejercicioContainer}>

          <Image

          source={{ uri: rutina.ejercicios[indiceEjercicio].gif }}

          style={styles.imagen}

          />

          <TouchableOpacity style={styles.circleButton} onPress={handleSiguienteEjercicio}>

            <Text style={styles.buttonText}>✓</Text>

          </TouchableOpacity>

          <Text style={styles.nombreText}>{rutina.ejercicios[indiceEjercicio].nombre}{` : ${rutina.ejercicios[indiceEjercicio].duracion}`}</Text>

          <Text style={styles.descripcionText}>{rutina.ejercicios[indiceEjercicio].descripcion}</Text>

        </View>

      </View>

      <View style={styles.progressBarContainer}>

        <View style={styles.progressBar}>

          <View style={{ width: `${avances * 100}%`, height: '100%', backgroundColor: 'yellow' }} />

        </View>

      </View>

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
  
  header: {
  
    alignItems: 'center',
  
    marginTop: 0,
  
    marginLeft: -10,
  
    marginRight: -10,
  
    backgroundColor: 'yellow',
  
    borderColor: 'black',
  
    borderWidth: 5,
  
    padding: 20,
  
  },
  
  zonaText: {
  
    fontSize: 22,
  
    color: 'black',
  
    fontWeight: 'bold'
  
  },
  
  imagen: {
  
    width: 300,
  
    height: 250,
  
    marginBottom: 10,
  
    alignSelf: 'center',
  
  },
  
  ejerciciosContainer: {
  
    padding: 20,
  
  },
  
  ejercicioContainer: {
  
    marginBottom: 20,
  
    height: 550, 
  
  },
  
  nombreText: {
  
    fontSize: 20,
  
    fontWeight: 'bold',
  
    color: 'white',
  
    marginTop: '5%',
  
    textAlign: 'center'
  
  },
  
  descripcionText: {
  
    fontSize: 15,
  
    color: 'white',
  
    marginTop: '5%',
  
    textAlign: 'center'
  
  },
  
  circleButton: {
  
    width: 80,
  
    height: 80,
  
    borderRadius: 125,
  
    backgroundColor: 'yellow',
  
    alignSelf: 'center',
  
    justifyContent: 'center',
  
    borderColor: 'black',
  
    borderWidth: 5,
  
    alignItems: 'center',
  
    marginTop: 50,
  
  },
  
  buttonText: {
  
    color: 'black',
  
    fontSize: 30,
  
    fontWeight: 'bold',
  
  },
  
  progressBarContainer: {
  
    position: 'absolute',
  
    top: 10,
  
    bottom: 0,
  
    left: 0,
  
    right: 0,
  
    height: 30,
  
  },
  
  progressBar: {
  
    height: '100%',
  
  },

});

export default DetallesRutina