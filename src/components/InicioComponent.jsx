
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

      setProgresoBrazos(progresoBrazos + 1);
  
    }
  
  }, [categoriaActual, progresoBrazos]);

  useEffect(() => {

    if (categoriaActual === 'Piernas') {

      setProgresoPierna(progresoPierna + 1)
  
    }
  
  }, [categoriaActual, progresoPierna])

  useEffect(() => {

    if (categoriaActual === 'Cuerpo Completo') {

      setProgresoCuerpo(progresoCuerpo + 1)
    }
  
  }, [categoriaActual, progresoCuerpo])

  useEffect(() => {

    if (categoriaActual === 'Pecho') {

      setProgresoPecho(progresoPecho + 1)
    }
  
  }, [categoriaActual, progresoPecho])

  useEffect(() => {

    if (categoriaActual === 'Espalda') {

      setProgresoEspalda(progresoEspalda + 1)
    }
  
  }, [categoriaActual, progresoEspalda])

  useEffect(() => {

    if (categoriaActual === 'Abdomen') {

      setProgresoAbdomen(progresoAbdomen + 1)
    }
  }, [categoriaActual, progresoAbdomen])

  useEffect(() => {
   
    if (categoriaActual) {

      actualizarProgreso(progreso + 1, null);
   
    }
  
  }, [categoriaActual, progreso]);

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



      
        <TouchableOpacity onPress={escogerLugar}>
      
          <Text>Empezar Rutina</Text>
      
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
