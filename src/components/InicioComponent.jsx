
import React, { useEffect, useState } from 'react';

import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';

import NavbarComponent from './NavbarComponent';

import { useNavigation } from '@react-navigation/native';

import { useProgress } from './ProgressContext';

import { Image } from 'react-native-elements';

import Calendario from './Calendario';

import BannerCarousel from './BannerCarousel';


const InicioComponente = () => {

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

  const navigate = useNavigation();

  const [activeSection, setActiveSection] = useState('perfil');

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

  const handleSectionPress = (section) => {
  
    setActiveSection(section);
  
  };

  const escogerLugar = () => {
  
    navigate.navigate('Place');
  
  };

  return (
  
  <View style={styles.container}>
  
      <ImageBackground
  
      source={require('../../assets/images/Fondo-pantalla-metal.jpg')}
      
      style={styles.backgroundImage}
      
      >

        <NavbarComponent activeSection={activeSection} handleSectionPress={handleSectionPress} />
                    <BannerCarousel/>
        <View style={styles.banner}>
  
        <View style={styles.encabezado}>
  
        <Text style={styles.encabezadoTexto}>Progreso General: {progreso}%</Text>
    
        </View>

        <View style={styles.listaProgresos}>
        
        <View style={styles.columnaProgresos}>

        <View style={styles.itemProgreso}>
        
          <Image source={require('../../assets/images/CuerpoCompleto.png')} style={styles.imagenIcono} />
        
          <Text style={styles.estadisticaTexto}>{progresoCuerpo}%</Text>
        
        </View>

        <View style={styles.itemProgreso}>
        
          <Image source={require('../../assets/images/Brazo.png')} style={styles.imagenIcono} />
        
          <Text style={styles.estadisticaTexto}>{progresoBrazos}%</Text>
        
        </View>
        
        <View style={styles.itemProgreso}>
        
          <Image source={require('../../assets/images/Pierna.png')} style={styles.imagenIcono} />
        
          <Text style={styles.estadisticaTexto}>{progresoPierna}%</Text>
        
        </View>
        
        </View>

        <View style={styles.columnaProgresos}>
        
        <View style={styles.itemProgreso}>
        
          <Image source={require('../../assets/images/Pecho.png')} style={styles.imagenIcono} />
        
          <Text style={styles.estadisticaTexto}>{progresoPecho}%</Text>
        
        </View>
        
        <View style={styles.itemProgreso}>
        
          <Image source={require('../../assets/images/Espalda.png')} style={styles.imagenIcono} />
        
          <Text style={styles.estadisticaTexto}>{progresoEspalda}%</Text>
        
        </View>
        
        <View style={styles.itemProgreso}>
        
          <Image source={require('../../assets/images/Abdomen.png')} style={styles.imagenIcono} />
        
          <Text style={styles.estadisticaTexto}>{progresoAbdomen}%</Text>
        
        </View>
        
        </View>
      
      </View>
    
    </View>

    <Calendario/>



      
        <TouchableOpacity style={styles.buttonContainer} onPress={escogerLugar}>
      
          <Text  style={styles.buttonText}>Empezar Rutina</Text>
      
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
  
  banner: {
  
    backgroundColor: 'white',
  
    position: 'relative',
  
    top: -20,
  
    padding: 10,
  
    borderRadius: 8,
  
    margin: 10,
  
  },
  
  encabezado: {
  
    marginBottom: 10,
  
  },
  
  encabezadoTexto: {
  
    color: 'yellow',
  
    borderRadius: 10,
  
    fontSize: 18,
  
    fontWeight: 'bold',
  
    backgroundColor: 'black',
  
    padding: 15,
  
  },
  
  listaProgresos: {
  
    flexDirection: 'row',
  
    backgroundColor: 'white'
  
  },
  
  columnaProgresos: {
  
    flex: 1, 
  
  },

  buttonContainer: {
    
    marginTop: -100,

    marginBottom: 60,
    
    marginLeft: 10,
    
    backgroundColor: 'yellow',
    
    padding: 10,
    
    borderRadius: 20,

    borderColor: 'black',

    borderWidth: 5,
    
    width: '95%',
  
  },

  buttonText: {
  
    textAlign: 'center',
  
    fontSize: 18,
  
    color: 'black',
  
    fontWeight: 'bold',
  
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

export default InicioComponente;
