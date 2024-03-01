
import React, { useEffect, useState } from 'react';

import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';

import NavbarComponent from './NavbarComponent';

import { useNavigation } from '@react-navigation/native';

import { useProgress } from './ProgressContext';


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
        

        <Text style={styles.estadisticaTexto}>Progreso General: {progreso}%</Text>
        
        <Text style={styles.estadisticaTexto}>Progreso de Cuerpo Completo: {progresoCuerpo}%</Text>

        <Text style={styles.estadisticaTexto}>Progreso de Brazos: {progresoBrazos}%</Text>

        <Text style={styles.estadisticaTexto}>Progreso de Pierna: {progresoPierna}%</Text>

        <Text style={styles.estadisticaTexto}>Progreso de Pecho: {progresoPecho}%</Text>

        <Text style={styles.estadisticaTexto}>Progreso de Espalda: {progresoEspalda}%</Text>

        <Text style={styles.estadisticaTexto}>Progreso de Abdomen: {progresoAbdomen}%</Text>

      
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
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bodyPartsContainer: {
    flexDirection: 'column',
    marginTop: 5,
  },
  bodyPartItem: {
    marginBottom: 5,
  },
  bodyPartText: {
    fontSize: 14,
  },
});

export default InicioComponente;
