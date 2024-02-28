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
    // Obtener una referencia al documento del usuario en Firestore
    const userDocRef = doc(db, 'usuarios', userData.uid);

    // Obtener los datos del documento
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Actualizar el estado de userData con los datos del usuario
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
    // Aquí llamamos a onEditUserData si es necesario
    // Además, asumo que fetchUserData es una función que debería llamarse al actualizar los datos del usuario
    navigation.navigate('EditarDatos', { userData, onUserDataUpdate: fetchUserData });
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
            <TouchableOpacity>
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
            <TouchableOpacity>
              <Text style={styles.editUserDataText}>Alarmas</Text>
            </TouchableOpacity>
            <TouchableOpacity>
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
    borderBottomWidth: 2,  // Agregamos solo el borde inferior
    width: '100%',  // Cambié '102%' a '100%' para asegurarme de que ocupe el ancho completo
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
    width: 32, // Ajusta el ancho según tus necesidades
    height: 32, // Ajusta la altura según tus necesidades
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
    width: '100%', // O el ancho que desees
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
