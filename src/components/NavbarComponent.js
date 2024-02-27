import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
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

          <TouchableOpacity onPress={() => onSectionPress('perfil')}>
            <Text style={styles.menuItem}>Perfil</Text>
          </TouchableOpacity>
          <View style={styles.userDataContainer}>
            <TouchableOpacity onPress={handleEditUserData}>
              <Text style={styles.editUserDataText}>Editar Datos</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => onSectionPress('avances')}>
            <Text style={styles.menuItem}>Avances</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onSectionPress('tienda')}>
            <Text style={styles.menuItem}>Tienda</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onSectionPress('configuracion')}>
            <Text style={styles.menuItem}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onSectionPress('apoyarnos')}>
            <Text style={styles.menuItem}>Apoyarnos</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    width: '100%',
    top: 2,
    backgroundColor: 'black',
    padding: 18,
  },
  menuIcon: {
    color: 'white',
    fontSize: 24,
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
    color: 'white',
    fontSize: 24,
  },
  menuItem: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
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
