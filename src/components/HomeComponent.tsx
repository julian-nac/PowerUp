import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';

export default function HomeComponent() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleSaveData = async () => {
    try {
      // Verifica que los datos no estén vacíos
      if (!weight || !height || !goal) {
        console.error('Todos los campos deben completarse');
        return;
      }

      // Guarda los datos en Cloud Firestore
      const usersCollection = collection(db, 'users');
      const docRef = await addDoc(usersCollection, {
        weight,
        height,
        goal,
      });

      console.log('Datos del usuario guardados con éxito. ID del documento:', docRef.id);
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  
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


     
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'white', // Color del texto del subtítulo
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
    
    backgroundColor: 'yellow', // Color verde, puedes ajustar esto
    
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
  
});
