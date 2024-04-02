import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, LogBox } from 'react-native';

import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import { Image } from 'react-native-elements';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);


const EditarDatos = () => {

  const navigation = useNavigation();

  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editedData, setEditedData] = useState({});

  useEffect(() => {

    const fetchData = async () => {

      try {

        const db = getFirestore();

        const usersCollection = collection(db, 'users');

        const usersSnapshot = await getDocs(usersCollection);

        const allUsersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        if (allUsersData.length > 0) {

          setUserData(allUsersData[0]);

          setEditedData(allUsersData[0]);

        }

        setLoading(false);

      } catch (error) {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  const handleSaveChanges = async () => {

    try {

      setSaving(true);

      const db = getFirestore();

      const userDocRef = doc(collection(db, 'users'), userData.id);

      await updateDoc(userDocRef, editedData);

      setUserData(editedData);

    } catch (error) {

      console.error('Error al actualizar datos en Firestore:', error);

    } finally {

      setSaving(false);

    }

  };

  if (loading || saving) {
  
    return (
  
    <View style={styles.loadingContainer}>
  
        <ActivityIndicator size="large" color="yellow" />
  
    </View>
  
  );
  
  }

  const handleEditField = (label, field) => {
  
    return (
  
    <View style={styles.fieldContainer}>
  
        <Text style={styles.label}>{label}:</Text>
  
        <TextInput
  
        style={styles.input}
        
        keyboardType="numeric"
        
        value={editedData[field]}
        
        onChangeText={(text) => setEditedData({ ...editedData, [field]: text })} 
       
        placeholder={`Nuevo ${label.toLowerCase()}`}
        
        />
      
      </View>
    
    );
  
  };

  return (
    
    <View style={styles.container}>
    
      <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
    
        <Image source={require('../../assets/images/back.png')} style={styles.logo} />
    
      </TouchableOpacity>
    
      <Text style={styles.title}>Tus Datos:</Text>
  
      {handleEditField('Peso', 'weight')}
      {handleEditField('Altura', 'height')}
      {handleEditField('Edad', 'yearsold')}
      {handleEditField('Peso Ideal', 'expectweight')}
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>

        <Text style={styles.buttonTextConfirm}>Guardar Cambios</Text>

      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 16,

    justifyContent: 'center',

    backgroundColor: 'black',

  },

  goBack: {

    position: 'absolute',

    top: 20,

    right: 1,

  },

  loadingContainer: {
    
      position: 'absolute', 
      
      top: 0,
      
      bottom: 0,
      
      left: 0,
      
      right: 0,
      
      backgroundColor: 'black',
      
      justifyContent: 'center',
      
      alignItems: 'center',
    
    },
  
    title: {
  
      fontSize: 20,
  
      fontWeight: 'bold',
  
      marginBottom: 16,
  
      color: 'white',
  
    },
  
    logo: {
  
      width: 32, 
  
      height: 32,
  
      marginRight: 10,
  
    },
  
    fieldContainer: {
  
      flexDirection: 'row',
  
      alignItems: 'center',
  
      padding: 10,
  
      marginBottom: 12,
  
      borderColor: 'white',
  
      borderWidth: 2,
  
    },
  
    label: {
  
      flex: 1,
  
      color: 'white',
  
    },
  
    input: {
  
      flex: 2,
  
      height: 60,
  
      borderColor: 'gray',
  
      borderWidth: 1,
  
      paddingHorizontal: 8,
  
      marginRight: 8,
  
      color: 'white',
  
    },
  
    saveButton: {
  
      backgroundColor: 'yellow',
  
      borderColor: 'black',
  
      borderWidth: 2,
  
      padding: 10,
  
      borderRadius: 5,
  
      alignItems: 'center',
  
    },
  
    buttonTextConfirm: {
  
      color: 'black',
  
      fontSize: 15,
  
      fontWeight: 'bold'
  
    },

  });

export default EditarDatos;
