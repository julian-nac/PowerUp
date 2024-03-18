
import React, { useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';

import { doc, getDoc } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';


const NavbarComponent = ({ activeSection, onSectionPress, userData, onEditUserData }) => {

  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {

    setMenuVisible(!menuVisible);

  };

const fetchUserData = async () => {

  try {

    const userDocRef = doc(db, 'usuarios', userData.uid);

    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {

      const userDataFromFirestore = userDoc.data();

      onEditUserData(userDataFromFirestore);

    } else {

      console.error('El documento del usuario no existe en Firestore');

    }

  } catch (error) {

    console.error('Error al obtener los datos del usuario desde Firestore:', error);

  }

};

  const handleEditUserData = () => {
    
    navigation.navigate('EditarDatos', { userData, onUserDataUpdate: fetchUserData });
    
    setMenuVisible(false);
  
  };

  const handleInforme = () => {

    navigation.navigate('Informe');

    setMenuVisible(false);

  };

  const handleAlarm = () => {

    navigation.navigate('Alarm');

    setMenuVisible(false);

  };

  const handleVolumen = () => {

    navigation.navigate('Volumen');

    setMenuVisible(false);

  };

  return (
    
    <View style={styles.navbar}>

    
      <TouchableOpacity onPress={toggleMenu}>
    
        <Text style={styles.menuIcon}>☰</Text>
    
      </TouchableOpacity>
    
      <ScrollView>
    
      <Modal
    
      transparent
      
      visible={menuVisible}
      
      animationType="slide"
      
      onRequestClose={() => setMenuVisible(false)}
      
      >
      
     <View style={styles.menuContainer}>
    
          <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
    
            <Text style={styles.closeButtonText}>✕</Text>
    
          </TouchableOpacity>

          <View style={styles.logoContainer}>
    
          <Image source={require('../../assets/images/user.png')} style={styles.logo} />
    
            <Text style={styles.menuItem}>Perfil</Text>
    
            <View style={styles.line} />
    
          </View>

          <View style={styles.userDataContainer}>
    
            <TouchableOpacity onPress={handleEditUserData}>
    
              <Text style={styles.editUserDataText}>Editar Datos</Text>
    
            </TouchableOpacity>
    
          </View>

          <View style={styles.logoContainer}>
    
          <Image source={require('../../assets/images/stats.png')} style={styles.logo} />
    
            <Text style={styles.menuItem}>Avances</Text>
    
            <View style={styles.line} />
    
          </View>

          <View style={styles.userDataContainer}>
    
            <TouchableOpacity onPress={handleInforme}>
    
              <Text style={styles.editUserDataText}>Informe</Text>
    
            </TouchableOpacity>
    
            <TouchableOpacity>
    
              <Text style={styles.editUserDataText}>Objetivo</Text>
    
            </TouchableOpacity>
    
          </View>

    
          <View style={styles.logoContainer}>
    
          <Image source={require('../../assets/images/shop.png')} style={styles.logo} />
    
            <Text style={styles.menuItem}>Tienda</Text>
    
            <View style={styles.line} />
    
          </View>

          <View style={styles.userDataContainer}>
    
            <TouchableOpacity>
    
              <Text style={styles.editUserDataText}>Comprar</Text>
    
            </TouchableOpacity>
    
          </View>

          <View style={styles.logoContainer}>
    
          <Image source={require('../../assets/images/config.png')} style={styles.logo} />
    
            <Text style={styles.menuItem}>Configuración</Text>
    
            <View style={styles.line} />
    
          </View>

          <View style={styles.userDataContainer}>
    
            <TouchableOpacity onPress={handleAlarm}>
    
              <Text style={styles.editUserDataText}>Alarmas</Text>
    
            </TouchableOpacity>
    
            <TouchableOpacity onPress={handleVolumen}>
    
              <Text style={styles.editUserDataText}>Sonido</Text>
    
            </TouchableOpacity>
    
            <TouchableOpacity>
    
              <Text style={styles.editUserDataText}>Ajustes De Entrenamientos</Text>
    
            </TouchableOpacity>
    
          </View>
    
        </View>
    
        </Modal>
    
      </ScrollView>
   
    </View>
 
 );

};

const styles = StyleSheet.create({

  navbar: {

    position: 'absolute',

    borderColor: 'yellow',

    borderBottomWidth: 2, 

    width: '100%',

    top: 0,

    backgroundColor: 'black',

    padding: 18,

  },
  
  menuIcon: {
  
    color: 'yellow',
  
    textAlign: 'right',
  
    fontSize: 24,
  
  },
  
  editUserDataText: {
  
    fontSize: 18,
  
    fontWeight: 'bold',
  
    marginLeft: 5,
  
    marginBottom: 10,
  
    marginTop: 5,
  
  },
  
  logoContainer: {
  
    flexDirection: 'row',
  
    alignItems: 'center',
  
    marginVertical: 20,
  
  },
  
  logo: {
  
    width: 32,
  
    height: 32,
  
    marginRight: 10,
  
  },
  
  menuContainer: {
  
    flex: 1,
  
    backgroundColor: 'black',
  
    padding: 20,
  
  },
  
  closeButton: {
  
    alignSelf: 'flex-end',
  
  },
  
  closeButtonText: {
  
    color: 'yellow',
  
    fontSize: 24,
  
  },
  
  menuItem: {
  
    color: 'white',
  
    fontSize: 20,
  
    marginVertical: 10,
  
    fontWeight: 'bold'
  
  },
  
  line: {
  
    position: 'absolute',
  
    bottom: 0,
  
    left: 0,
  
    width: '100%', 
  
    height: 2,
  
    backgroundColor: 'yellow',
  
  },
  
  navbarItem: {
  
    paddingVertical: 5,
  
  },
  
  activeNavItem: {
  
    borderBottomWidth: 2,
  
    borderColor: 'white',
  
  },
  
  navbarText: {
  
    color: 'white',
  
  },

});

export default NavbarComponent;
