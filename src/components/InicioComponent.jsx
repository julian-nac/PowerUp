import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import NavbarComponent from './NavbarComponent';

const InicioComponente = () => {
  const [activeSection, setActiveSection] = ('perfil')

  const handleSectionPress = (section) => {
    setActiveSection(section);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Fondo-pantalla-metal.jpg')} 
        style={styles.backgroundImage}
      >
              <NavbarComponent activeSection={activeSection} handleSectionPress={handleSectionPress} />

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
});

export default InicioComponente;