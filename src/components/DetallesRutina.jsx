
import React, { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Modal, TouchableHighlight} from 'react-native';

import moment from 'moment'; 

import Sound from 'react-native-sound'

import Gif from 'react-native-gif'

import 'moment/locale/es';

import { useProgress } from './ProgressContext';

import { useSoundVolume } from './SoundContext';


const DetallesRutina = ({ route, navigation }) => {

  const { rutina } = route.params;

  const [indiceEjercicio, setIndiceEjercicio] = useState(0);

  const [showCongratsModal, setShowCongratsModal] = useState(false)

  const { progreso, actualizarProgreso, marcarRutinaCompletadaDiaria} = useProgress()

  const { volume } = useSoundVolume()

  const [showRestModal, setShowRestModal] = useState(false);

  const [restTime, setRestTime] = useState(15);
  
  let restInterval; 


  moment.locale('es'); 

  const soundFile = require('../../assets/sound/complete-notification.mp3')
  
  const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
   
    if
    
    (error) {
   
      console.error
   
    }
  
  })

  useEffect(() => {
 
    if (showRestModal) {
 
      setRestTime(15);
 
      startRestTimer();
 
    } else {
 
      clearInterval(restInterval);
 
    }

    return () => clearInterval(restInterval);
 
  }, [showRestModal]);

 
  const startRestTimer = () => {
 
    restInterval = setInterval(() => {
 
      setRestTime(prevRestTime => {
 
        if (prevRestTime > 0) {
 
          return prevRestTime - 1;
 
        } else {
 
          handleCloseRestModal();
 
          return prevRestTime;
 
        }
 
      });
 
    }, 1000);
 
  };

  const handleCloseRestModal = () => {
   
    clearInterval(restInterval); 
   
    setShowRestModal(false); 
  
  };

  const handleEjercicioSiguiente = () => {
    
    if (indiceEjercicio < rutina.ejercicios.length - 1){

      setIndiceEjercicio(indiceEjercicio + 1)
    }
  
  }

  const handleSiguienteEjercicio = () => {
  
    if (indiceEjercicio < rutina.ejercicios.length - 1) {
  
      setIndiceEjercicio(indiceEjercicio + 1);

      sound.setVolume(volume)

      sound.play()

      setShowRestModal(true);
  
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

  const handleCloseModalRut = () => {
 
    setShowCongratsModal(false);
 
    navigation.navigate('Place');
 
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
  <Modal animationType="slide" transparent={true} visible={showRestModal}>
    
    <View style={styles.modalContainerTimer}>
    
      <View style={styles.modalContentTimer}>
    
        <Text style={styles.counterTextTimer}>{restTime.toString().padStart(2, '0')}</Text>
      
      <View style={styles.circleContainer}>
      
        <View style={[styles.circleProgress, { borderBottomColor: restTime > 0 ? 'black' : 'transparent', borderBottomWidth: restTime > 0 ? restTime * 10 : 0 }]} />
      
      </View>
      
        <Text style={styles.text}>Respira hondo. Prepárate para el siguiente ejercicio!</Text>
      
      <TouchableOpacity onPress={handleCloseRestModal} style={styles.closeButtonTimer}>
      
        <Text style={styles.closeButtonTextTimer}>Continuar</Text>
      
      </TouchableOpacity>
   
      </View>
  
    </View>

  </Modal>

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
        
          style={{ width: 300, height: 250}}
      
          />
          
            <Text style={styles.congratsText}>¡Rutina Completada!</Text>
          
            <Text style={styles.congratsText}>% Progreso Guardado %</Text>

              
          <View style={styles.buttonContainer}>
          
            <TouchableHighlight
          
            style={styles.volverButton}
          
            onPress={handleCloseModal}
          
            >
            
            <Text style={styles.volverButtonText}>Volver a Inicio</Text>

            </TouchableHighlight>
          
            <TouchableHighlight
          
            style={styles.volverButton}
            
            onPress={handleCloseModalRut}
            
            >
            
            <Text style={styles.volverButtonText}>Volver a Rutina</Text>

            </TouchableHighlight>
      
            </View>
             
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

  text: {

  fontSize: 18,

  color: 'white',

  fontWeight: 'bold',

  textAlign: 'center'

  },


  modalContainerTimer: {
   
    flex: 1,
   
    justifyContent: 'center',
   
    alignItems: 'center',
   
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  
  },
  
  modalContentTimer: {
  
    backgroundColor: 'black',
  
    padding: 60,
  
    alignItems: 'center',

    borderWidth: 5,
    
    borderColor: '#fff',
  
    borderRadius: 20,
  
  },
  
  counterTextTimer: {
  
    zIndex: 1000,
  
    fontSize: 50,
  
    color: 'yellow',
  
    fontWeight: 'bold',
  
    position: 'absolute',
  
    top: '46%',
  
    left: '71%',
  
    transform: [{ translateX: -25 }, { translateY: -25 }],
  
    textShadowColor: '#000',
  
    textShadowOffset: { width: 1, height: 1 },
  
    textShadowRadius: 8, 
  
  },
  
  circleContainer: {
  
    width: 200,
  
    height: 200,
  
    borderRadius: 100,
  
    justifyContent: 'center',
  
    alignItems: 'center',
  
    marginBottom: 20,
  
    backgroundColor: 'yellow',
  
    borderWidth: 5,
  
    borderColor: '#fff',
  
    position: 'relative', 
  
  },
  
  circleProgress: {
  
    width: 160,
  
    height: 160,
  
    borderRadius: 80,
  
    backgroundColor: 'white',
  
  },
  
  closeButtonTimer: {
  
    backgroundColor: 'yellow',
  
    paddingVertical: 10,
  
    paddingHorizontal: 20,
  
    borderRadius: 20,
  
    marginTop: 20,
  
  },
  
  closeButtonTextTimer: {
  
    color: '#000',
  
    fontWeight: 'bold',
  
    fontSize: 16,
  
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

  buttonContainer: {
 
    flexDirection: 'row',
 
  },
  
  modalContainer: {
 
    flex: 1,
 
    justifyContent: 'center',
 
    alignItems: 'center',
 
  },
 
  modalBackground: {
 
    flex: 1,
 
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
 
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

    marginBottom: 10,

  },

  volverButton: {

    backgroundColor: 'yellow',

    paddingVertical: 10,

    paddingHorizontal: 20,

    borderRadius: 5,

    marginRight: 10,

    marginLeft: 10,

    marginTop: 20,

  },

  volverButtonText: {

    color: 'black',

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