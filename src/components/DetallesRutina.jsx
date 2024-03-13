
import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Modal, TouchableHighlight } from 'react-native';

import moment from 'moment'; 

import Sound from 'react-native-sound'

import Gif from 'react-native-gif'

import 'moment/locale/es';

import { useProgress } from './ProgressContext';


const DetallesRutina = ({ route, navigation }) => {

  const { rutina } = route.params;

  const [indiceEjercicio, setIndiceEjercicio] = useState(0);

  const [showCongratsModal, setShowCongratsModal] = useState(false)

  const { progreso, actualizarProgreso, marcarRutinaCompletadaDiaria} = useProgress()

  moment.locale('es'); 

  const soundFile = require('../../assets/sound/complete-notification.mp3')
  
  const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
   
    if(error) {
   
      console.error
   
    }
  
  })

  const handleEjercicioSiguiente = () => {
    
    if (indiceEjercicio < rutina.ejercicios.length - 1){

      setIndiceEjercicio(indiceEjercicio + 1)
    }
  
  }

  const handleSiguienteEjercicio = () => {
  
    if (indiceEjercicio < rutina.ejercicios.length - 1) {
  
      setIndiceEjercicio(indiceEjercicio + 1);

      sound.play()
  
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
      
      marcarRutinaCompletadaDiaria(diaActual);

      setShowCongratsModal(true)

    }
  };

  const handleCloseModal = () => {
    setShowCongratsModal(false);
    navigation.navigate('Inicio');
  };


  const handleEjercicioAnterior = () => {
  
    if (indiceEjercicio > 0) {
  
      setIndiceEjercicio(indiceEjercicio - 1)
  
    }
  
  }

  const avances = (indiceEjercicio + 1) / rutina.ejercicios.length;


  return (

<View style={styles.container}>

    <ImageBackground

        source={require('../../assets/images/Fondo-pantalla-metal.jpg')}

        style={styles.backgroundImage}

    >

    <Modal
        animationType="slide"
        transparent={true}
        visible={showCongratsModal}
        onRequestClose={() => {
          setShowCongratsModal(!showCongratsModal);
        }}
      >
        <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Gif
        source={require('../../assets/images/trophy.gif')}
        style={{ width: 200, height: 200 }}
      />
            <Text style={styles.congratsText}>¡Felicitaciones! Progreso guardado</Text>
            <TouchableHighlight
              style={styles.volverButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.volverButtonText}>Volver a Inicio</Text>
            </TouchableHighlight>
          </View>
        </View>
        </View>
      </Modal>

      <View style={styles.header}>

        <Text style={styles.zonaText}>{rutina.zona}</Text>

      </View>

      <View style={styles.ejerciciosContainer}>

        <View style={styles.ejercicioContainer}>

          <Image

          source={{ uri: rutina.ejercicios[indiceEjercicio].gif }}

          style={styles.imagen}

          />

          <TouchableOpacity style={styles.arrowButtonLeft} onPress={handleEjercicioAnterior}>
        
          <Text style={styles.arrowText}>◁</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.circleButton} onPress={handleSiguienteEjercicio}>

            <Text style={styles.buttonText}>✓</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.arrowButtonRigth} onPress={handleEjercicioSiguiente}>
        
          <Text style={styles.arrowText}>▷</Text>

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

  arrowButtonLeft: {
  
    position: 'absolute',
  
    top: '56%',
  
    left: 70,
  
    paddingHorizontal: 16,
  
  },
  
  arrowButtonRigth: {
  
    position: 'absolute',
  
    top: '56%',
  
    left: 194,
  
    paddingHorizontal: 16,
  
  },
  
  arrowText: {
  
    fontSize: 54,
  
    color: 'yellow',
  
    fontWeight: 'bold'
  
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Ajusta el último valor para cambiar la opacidad
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1d1e21',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  trofeoLogo: {
    width: 350,
    height: 150,
    marginBottom: 20,
  },
  congratsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  volverButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  volverButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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