import React, { useState } from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarComponent from './NavbarComponent';
import { useNavigation } from '@react-navigation/native';
import { useProgress } from './ProgressContext';

const InicioComponente = () => {
  const { progreso } = useProgress()
  const navigate = useNavigation();
  const [activeSection, setActiveSection] = useState('perfil');

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

        <Text style={styles.estadisticaTexto}>Progreso: {progreso}%</Text>

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
