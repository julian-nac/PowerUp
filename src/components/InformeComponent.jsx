
import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useProgress } from './ProgressContext';

import { Image } from 'react-native-elements';



const InformeComponent = () => {

  const { progreso,
          categoriaActual, 
          setProgresoBrazos, 
          progresoBrazos, 
          setProgresoPierna,
          progresoPierna,
          setProgresoCuerpo,
          progresoCuerpo,
          setProgresoPecho,
          progresoPecho,
          setProgresoEspalda,
          progresoEspalda,
          setProgresoAbdomen,
          progresoAbdomen,
          actualizarProgreso 
        } = useProgress();

  const navigation = useNavigation();

  const [infoText, setInfoText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
   
    if (categoriaActual === 'Brazos') {
   
      setProgresoBrazos((prevProgress) => prevProgress + 1);
   
    } else if (categoriaActual === 'Piernas') {
   
      setProgresoPierna((prevProgress) => prevProgress + 1);
   
    } else if (categoriaActual === 'Cuerpo Completo') {
   
      setProgresoCuerpo((prevProgress) => prevProgress + 1);
   
    } else if (categoriaActual === 'Pecho') {
   
      setProgresoPecho((prevProgress) => prevProgress + 1);
   
    } else if (categoriaActual === 'Espalda') {
   
      setProgresoEspalda((prevProgress) => prevProgress + 1);
   
    } else if (categoriaActual === 'Abdomen') {
   
      setProgresoAbdomen((prevProgress) => prevProgress + 1);
   
    }
  
  }, [categoriaActual, setProgresoBrazos, setProgresoPierna, setProgresoCuerpo, setProgresoPecho, setProgresoEspalda, setProgresoAbdomen]);

  useEffect(() => {
  
    if (categoriaActual) {
  
      actualizarProgreso((prevProgress) => prevProgress + 1, null);
  
    }
  
  }, [categoriaActual, actualizarProgreso]);

  const promedioGeneralActual =
 
  (progresoBrazos +
 
    progresoPierna +
 
    progresoCuerpo +
 
    progresoPecho +
 
    progresoEspalda +
 
    progresoAbdomen) / 6;

const promedioGeneralNecesario = promedioGeneralActual * (6 / 7);

const showDetails = (info) => {
 
  setInfoText(info);
 
  setModalVisible(true);

};

  return (
  
  <View style={styles.container}>

    <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
  
     <Image source={require('../../assets/images/back.png')} style={styles.logo} />

    </TouchableOpacity>

        <View style={styles.graficoContainer}>
        
        <View style={styles.banner}>
  
        <View style={styles.encabezado}>
  
        <Text style={styles.encabezadoTexto}>Progreso General: {progreso} exp.</Text>
    
        </View>
        
          <View style={styles.columnaBarras}>
            
            <View style={styles.barraContainer}>

              <View style={[styles.barra, { height: `${progresoCuerpo}%` }]} />
        
              <Text style={styles.valor}>{progresoCuerpo}%</Text>
        
              <Text style={styles.label}>Cuerpo C.</Text>
        
            </View>
        
            <View style={styles.barraContainer}>

              <View style={[styles.barra, { height: `${progresoBrazos}%` }]} />
        
              <Text style={styles.valor}>{progresoBrazos}%</Text>
        
              <Text style={styles.label}>Brazos</Text>
        
            </View>
        
            <View style={styles.barraContainer}>

              <View style={[styles.barra, { height: `${progresoPierna}%` }]} />
        
              <Text style={styles.valor}>{progresoPierna}%</Text>
        
              <Text style={styles.label}>Piernas</Text>
        
            </View>
        
            <View style={styles.barraContainer}>

              <View style={[styles.barra, { height: `${progresoPecho}%` }]} />
        
              <Text style={styles.valor}>{progresoPecho}%</Text>
        
              <Text style={styles.label}>Pecho</Text>
        
            </View>
        
            <View style={styles.barraContainer}>

              <View style={[styles.barra, { height: `${progresoEspalda}%` }]} />
        
              <Text style={styles.valor}>{progresoEspalda}%</Text>
        
              <Text style={styles.label}>Espalda</Text>
        
            </View>
        
            <View style={styles.barraContainer}>

              <View style={[styles.barra, { height: `${progresoAbdomen}%` }]} />
        
              <Text style={styles.valor}>{progresoAbdomen}%</Text>
        
              <Text style={styles.label}>Abdomen</Text>
        
            </View>
        
          </View>
       
        </View>
     
      </View>
     
      <View style={styles.informeContainer}>
     
        <Text style={styles.labelt}>
     
          Progreso recomendado para todas las partes del cuerpo: {promedioGeneralNecesario.toFixed(2)}%
     
          <TouchableOpacity onPress={() => showDetails('El Progreso Recomendado es el promedio del porcentaje de todas las zonas de tu cuerpo trabajadas en tus rutinas. Este porcentaje refleja el nivel de equilibrio recomendado para tu progreso físico. Si el porcentaje de una zona del cuerpo está por debajo del promedio recomendado, considera priorizar esa zona en tus rutinas para lograr un desarrollo corporal más equilibrado y completo.')}>
     
            <Image source={require('../../assets/images/info_icon.png')} style={styles.icon} />
     
          </TouchableOpacity>
     
        </Text>
     
        <Text style={styles.labelt}>
     
          Promedio actual de progreso: {promedioGeneralActual.toFixed(2)}%
     
          <TouchableOpacity onPress={() => showDetails('El Promedio Actual es el cálculo del porcentaje promedio de progreso en cada zona del cuerpo. Proporciona una visión general de cómo estás progresando en tus rutinas de ejercicio en todas las áreas específicas del cuerpo. Si el promedio actual es bajo, puede indicar que hay áreas específicas del cuerpo que necesitan más atención o enfoque en tus rutinas de ejercicio. Utiliza este promedio para evaluar tu avance general y ajustar tu entrenamiento según sea necesario.')}>
     
            <Image source={require('../../assets/images/info_icon.png')} style={styles.icon} />
     
          </TouchableOpacity>
     
        </Text>
     
      </View>
     
      <Modal
     
      animationType="slide"
      
      transparent={true}
      
      visible={modalVisible}
      
      onRequestClose={() => {
      
        setModalVisible(!modalVisible);
      
      }}
      
      >
      
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      
          <View style={styles.centeredView}>
      
            <View style={styles.modalView}>
      
              <Text style={styles.modalText}>{infoText}</Text>
      
            </View>
      
          </View>
      
        </TouchableWithoutFeedback>
     
      </Modal>

    </View>
 
 );

};

const styles = StyleSheet.create({

  container: {
  
    flex: 1,

    backgroundColor: 'black',

    justifyContent: 'center',
  
  },

  goBack: {

    position: 'absolute',

    top: 20,

    right: 1,

  },
  
  encabezado: {
  
    marginBottom: 20,
  
  },
  
  encabezadoTexto: {
  
    fontSize: 20,
  
    fontWeight: 'bold',
  
    color: 'white',
  
  },
  
  graficoContainer: {
  
    flexDirection: 'row',
  
    justifyContent: 'space-around',
  
    alignItems: 'flex-end',
  
    width: '98%',
  
    marginLeft: 5,
  
    height: '70%',
  
    marginTop: 0,
  
    backgroundColor: '#0D0D0D',
  
    padding: 20,
  
    borderColor: 'white',
  
    borderWidth: 1,
  
  },
  
  columnaBarras: {
  
    flexDirection: 'row',
  
    justifyContent: 'center',
  
    alignItems: 'flex-end',
  
    flex: 1,
  
  },
  
  barraContainer: {
  
    alignItems: 'center',
  
    marginHorizontal: 5,
  
  },
  
  barra: {
  
    width: 20,
  
    backgroundColor: 'yellow',
  
    borderColor: 'white',
  
    borderWidth: 1,
  
    borderRadius: 5,
  
    marginVertical: 5,
  
  },
  
  label: {
  
    color: '#555',
  
    fontSize: 12,
  
    marginTop: 5,
  
  },
  
  labelt: {
  
    fontSize: 15,
  
    color: 'white',
  
    marginTop: 10,
  
    marginLeft: 10,
  
    flexDirection: 'row',
  
    alignItems: 'center',
  
  },
  
  icon: {
  
    width: 14,
  
    height: 14,
  
    marginLeft: 5,
  
  },
  
  valor: {
  
    color: '#555',
  
    fontSize: 12,
  
    marginTop: 2,
  
  },
  
  modalView: {
  
    margin: 20,
  
    backgroundColor: '#FFFFFF',
  
    borderRadius: 20,
  
    padding: 20,
  
    alignItems: 'center',
  
    shadowColor: '#000',
  
    shadowOffset: {
  
      width: 0,
  
      height: 2,
  
    },
  
    shadowOpacity: 0.25,
  
    shadowRadius: 4,
  
    elevation: 5,
  
  },
  
  modalText: {
  
    fontSize: 18,
  
    textDecorationStyle: 'dashed',
  
    fontFamily: 'Cochin',
  
    color: 'black',
  
    textAlign: 'left',
  
    lineHeight: 24,
  
  },
  
  centeredView: {
  
    flex: 1,
  
    justifyContent: 'center',
  
    alignItems: 'center',
  
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  
  },
  
  promedioGeneralContainer: {
  
    marginTop: 20,
  
    paddingHorizontal: 20,
  
    alignItems: 'center',
  
  },
  
  promedioGeneralTexto: {
  
    color: 'white',
  
    fontSize: 16,
  
    marginBottom: 5,
  
  },
  
  promedioGeneralValor: {
  
    color: 'white',
  
    fontSize: 20,
  
    fontWeight: 'bold',
  
  },
  
  logo: {
  
    width: 32, 

    height: 32,

    marginRight: 10,

  },
  
  listaProgresos: {
  
    flexDirection: 'row',
  
    backgroundColor: 'white'
  
  },
  
  columnaProgresos: {
  
    flex: 1, 
  
  },
  
  estadisticaTexto: {
  
    color: 'black',
  
    fontSize: 16,
  
    marginLeft: 10,
  
    marginBottom: 5,
  
  },

  itemProgreso: {
  
    flexDirection: 'row',
  
    alignItems: 'center',
  
    marginBottom: 10,
  
  },
  
  imagenIcono: {
  
    width: 30,
  
    height: 30,
  
    marginRight: 0,
  
  },

});

export default InformeComponent;
