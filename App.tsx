
import React, { useState } from 'react';

import { View, Text, TextInput, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native';

import { Button } from 'react-native-elements';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

import { firebaseConfig } from './firebase-config';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';


function HomeScreen() {

  return (

  <View>

      <Text>Hola Mundo</Text>

  </View>

);

}


function LoginScreen() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  
  const handleCreateAccount = () => {

    createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential: UserCredential) => {

      console.log('Account created');

      const user = userCredential.user;

      console.log(user);

    })

    .catch((error) => {

      console.error('Error creating account:', error.message);

    });

  };


  const handleSignIn = () => {

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential: UserCredential) => {

      console.log('Signed In');

      const user = userCredential.user;

      console.log(user);

      navigation.navigate('Home');

    })

    .catch((error) => {

      console.error('Error signing in:', error.message);

    });

  };

  return (

    <View style={styles.container}>

      <ImageBackground
      
        source={require('./assets/images/Fondo-pantalla-metal.jpg')}

        style={styles.backgroundImage}

      >

      <KeyboardAvoidingView
      
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        style={styles.container}

      >


        

      <Image
          
          source={require('./assets/images/Logo-PowerUp.png')} 
          
          style={styles.logo}
      
      />

      <Text style={styles.title}>No hay mejor momento ¡Empieza con tu rutina diaria!</Text>

     
      <View style={styles.inputsContainer}>

      <TextInput
      
      style={styles.input}
      
      placeholder="Correo Electrónico"
      
      keyboardType="email-address"
      
      autoCapitalize="none"

      placeholderTextColor={styles.placeholder.color} 
      
      onChangeText={(text) => setEmail(text)}
      
      />

      <TextInput
      
      style={styles.input}
      
      placeholder="Contraseña"
      
      secureTextEntry

      placeholderTextColor={styles.placeholder.color}
      
      onChangeText={(text) => setPassword(text)}
      
      />

      </View>


      <View style={styles.buttonContainer}>
  
      <Button
    
      title="Registrarse"
      
      onPress={handleCreateAccount}
      
      buttonStyle={styles.registerButton}

      titleStyle={styles.buttonText}
      
      />
      
      <Button
      
      title="Iniciar Sesión"
      
      onPress={handleSignIn}
      
      buttonStyle={styles.loginButton}

      titleStyle={styles.buttonText}
      
      />

      </View>
      
      </KeyboardAvoidingView>
      
      </ImageBackground>
    
    </View>
  
  );

}

const Stack = createNativeStackNavigator(); 

export default function App() {

  return (

<NavigationContainer>

<Stack.Navigator initialRouteName="Login">

   <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

   <Stack.Screen name="Home" component={HomeScreen} />

</Stack.Navigator>

</NavigationContainer>

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

title: {
  color: 'white',
  fontSize: 25,
  fontWeight: 'bold',
  marginBottom: 30,
  textAlign: 'center',
  letterSpacing: 1,
  fontFamily: 'Arial, sans-serif',
  textShadowColor: 'black',  // Color del delineado
  textShadowOffset: { width: 3, height: 3 },  // Ajusta según sea necesario
  textShadowRadius: 5,
},

  

  logo: {
    
    width: '100%',
    
    height: '35%',
    
    resizeMode: 'contain',
    
    marginTop: '15%',
    
    marginBottom: '5%', 
  
  },

  containerinput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  
  inputsContainer: {
    width: '100%',
    marginBottom: 100,
  },


  
  input: {
    height: 55,
    width: '100%',
    borderColor: 'yellow',
    borderWidth: 2,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: 'black',
    fontSize: 18,
    color: 'white',  // Color del texto blanco
  },
  
  placeholder: {
    color: '#575756',  // Color gris claro
    fontSize: 18,
  },

  buttonContainer: {
    marginTop: -90,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  registerButton: {
    marginLeft: 20,
    width: '90%',  // Ajusta el ancho del botón "Registrarse"
    height: 60,  // Ajusta la altura del botón "Registrarse"
    backgroundColor: 'yellow',
    borderRadius: 40,  // Radio de las esquinas
    borderWidth: 7,  // Ancho del borde
    borderColor: 'black',  // Color del borde
    marginBottom: 20,
  },
  loginButton: {
    marginLeft: 20,
    width: '90%',  // Ajusta el ancho del botón "Iniciar Sesión"
    height: 60,  // Ajusta la altura del botón "Iniciar Sesión"
    backgroundColor: 'yellow',
    borderRadius: 40,  // Radio de las esquinas
    borderWidth: 7,  // Ancho del borde
    borderColor: 'black',  // Color del borde
  },
  buttonText: {
    color: 'black',
    fontSize: 22,
  },

});
