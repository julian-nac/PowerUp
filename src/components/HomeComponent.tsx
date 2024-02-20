
import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { firebaseConfig } from '../../firebase-config';

import { getFirestore, collection, addDoc, getDoc, setDoc, doc } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

import { useNavigation } from '@react-navigation/native';


export default function HomeComponent() {

  const [weight, setWeight] = useState('');

  const [height, setHeight] = useState('');

  const [goal, setGoal] = useState('');

  const [loading, setLoading] = useState(true);


  const navigation = useNavigation();
  
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);
  
  const db = getFirestore(app);


  useEffect(() => {
  
    checkUserDetails();
  
  }, []);

  
  const checkUserDetails = async () => {
  
    try {
  
      const user = auth.currentUser;
  
      if (!user) {
  
        console.error('Usuario no autenticado.');
  
        setLoading(false);
  
        return;
  
      }

      const userDocRef = doc(collection(db, 'users'), user.uid);
      
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data()?.dataEntered) {
      
        console.log('El usuario ya ha introducido datos anteriormente.');

        navigation.navigate('Place');
      
      }

      setLoading(false);

    } catch (error) {
     
      console.error('Error checking user details:', error);
     
      setLoading(false);
    
    }
  
  };

  const handleSaveData = async () => {
 
    try {
 
      if (!weight || !height || !goal) {
 
        console.error('Todos los campos deben completarse');
 
        return;
 
      }

      setLoading(true);

      const user = auth.currentUser;
     
      if (!user) {
     
        console.error('Usuario no autenticado.');
     
        setLoading(false); 
     
        return;
     
      }

      const usersCollection = collection(db, 'users');
      
      const userDocRef = doc(usersCollection, user.uid);

      const existingUserDoc = await getDoc(userDocRef);

      if (existingUserDoc.exists() && existingUserDoc.data()?.dataEntered) {

        console.log('El usuario ya ha introducido datos anteriormente.');

        setLoading(false);

        navigation.navigate('Place');

        return;

      }

      await setDoc(userDocRef, {

        weight,

        height,

        goal,

        dataEntered: true,

      });

      console.log('Datos del usuario guardados con éxito.');

      setLoading(false);

      navigation.navigate('Place');

    } catch (error) {

      console.error('Error al guardar los datos del usuario:', error);

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator size="large" color="#FFD700" />
      
      </View>
    
    );
  
  }


  return (

  <View style={styles.container}>

      <ImageBackground
        
        source={require('../../assets/images/Fondo-pantalla-metal.jpg')}

        style={styles.backgroundImage}

      >

      <Text style={styles.subtitle}>Para una mejor experiencia con la rutina, necesitamos tus siguientes datos:</Text>


      <TextInput
      
      style={styles.input}
      
      placeholder="Peso (kg)"
      
      keyboardType="numeric"
      
      value={weight}
      
      onChangeText={(text) => setWeight(text)}
      
      />
      
      <TextInput
      
      style={styles.input}
      
      placeholder="Altura (cm)"
      
      keyboardType="numeric"
      
      value={height}
      
      onChangeText={(text) => setHeight(text)}
      
      />
      
      <View style={styles.inputContainer}>
      
        <Picker
      
        selectedValue={goal}
      
        onValueChange={(itemValue, itemIndex) => setGoal(itemValue)}
      
        style={styles.picker}
      
        >
        
        <Picker.Item label="Selecciona un objetivo" value="" />
        
        <Picker.Item label="Bajar de peso" value="weight_loss" />
        
        <Picker.Item label="Ganar masa muscular" value="muscle_gain" />
        
        <Picker.Item label="Definición" value="definition" />
      
        </Picker>
      
      </View>


      <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveData}>
      
        <Text style={styles.buttonText}>Guardar Datos</Text>
      
      </TouchableOpacity>

      {loading && (
    
      <ActivityIndicator
      
      style={styles.loadingIndicator}
      
      size="large"
      
      color="yellow"
    
    />
      
    )}
     
      </ImageBackground>
    
    </View>
  
  );

}


const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

  loadingContainer: {
   
    flex: 1,
   
    justifyContent: 'center',
   
    alignItems: 'center',
   
    backgroundColor: 'black',
  
  },

  backgroundImage: {
  
    flex: 1,

    resizeMode: 'cover',

    justifyContent: 'center',

  },

  subtitle: {

    marginLeft: 10,

    marginRight: 10,

    fontSize: 21,

    fontWeight: 'bold',

    fontFamily: 'Arial, sans-serif',

    color: 'white',

    textAlign: 'center',

    marginBottom: 20,

    textShadowColor: 'black', 

    textShadowOffset: { width: 3, height: 3 }, 

    textShadowRadius: 5,
  
  },

  input: {
  
    height: 50,
  
    width: '90%',
  
    fontWeight: 'bold',
  
    borderRadius: 20,

    borderColor: 'gray',
  
    borderWidth: 3,
  
    marginBottom: 20,
  
    marginLeft: 20,
  
    paddingLeft: 10,
  
    fontSize: 15,
  
  },

  picker: {
  
    height: 50,
  
    borderColor: 'gray',
  
  },
  
  inputContainer: {
  
    borderColor: 'gray',
  
    borderWidth: 3,
  
    width: '90%',
  
    borderRadius: 20,
  
    overflow: 'hidden',
  
    marginLeft: 20,
  
  },

  buttonContainer: {
    
    marginTop: 20,
    
    marginLeft: 20,
    
    backgroundColor: 'yellow',
    
    padding: 10,
    
    borderRadius: 20,

    borderColor: 'black',

    borderWidth: 5,
    
    width: '90%',
  
  },

  buttonText: {
  
    textAlign: 'center',
  
    fontSize: 18,
  
    color: 'black',
  
    fontWeight: 'bold',
  
  },

  loadingIndicator: {
    
    position: 'absolute',
    
    top: 0,
    
    bottom: 0,
    
    left: 0,
    
    right: 0,
    
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    
    justifyContent: 'center',
    
    alignItems: 'center',
  
  }
  
});
