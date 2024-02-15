
import React, { useState } from 'react';

import { View, Text, TextInput, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';

import { Button } from 'react-native-elements';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../../firebase-config';

import { useNavigation } from '@react-navigation/native';

import SuccessMessage from './SuccessMessage';


export default function LoginComponent() {

    const [email, setEmail] = useState('');
  
    const [password, setPassword] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const [successType, setSuccessType] = useState('');
  
    const navigation = useNavigation()
  
    
    const app = initializeApp(firebaseConfig);
  
    const auth = getAuth(app);
  
    
    const handleCreateAccount = () => {
  
      if (!email || !password) {
       
        console.error('Todos los campos deben completarse');
       
          return;
      
        }
  
      createUserWithEmailAndPassword(auth, email, password)
  
      .then((userCredential: UserCredential) => {
  
        console.log('Account created');
  
        const user = userCredential.user;
  
        console.log(user);

        setSuccessMessage('Registro Completo! Bienvenido.');

        setSuccessType('signup');

      })
  
      .catch((error) => {
        
        if (error.code === 'auth/email-already-in-use') {
        
          console.error('Este correo ya está registrado');
       
        } else {
  
          console.error('Error creating account:', error.message);
        
        }
      
      });
  
    };
  
  
    const handleSignIn = () => {
  
      if (!email || !password) {
       
        console.error('Todos los campos deben completarse');
       
          return;
      
        }
  
        signInWithEmailAndPassword(auth, email, password)
        
        .then((userCredential: UserCredential) => {
        
          console.log('Signed In');
        
          const user = userCredential.user;
                
          navigation.navigate('Home');
        
        })
        
        .catch((error) => {
        
          if (error.code === 'auth/user-not-found') {
        
            Alert.alert(
        
              'Inicio de sesión fallido',
        
              'El correo electrónico no está registrado. Por favor, regístrate primero.',
        
              [{ text: 'OK', style: 'cancel' }]
        
              );
        
            } else if (error.code === 'auth/wrong-password') {
        
              Alert.alert(
        
                'Inicio de sesión fallido',
        
                'Contraseña incorrecta. Por favor, verifica tu contraseña.',
        
                [{ text: 'OK', style: 'cancel' }]
        
                );
        
              } else {
        
                Alert.alert(
        
                  'Inicio de sesión fallido',
        
                  'Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo.',
        
                  [{ text: 'OK', style: 'cancel' }]
        
                  );
        
                }
        
              });
    
            };
  
            return (
  
      <View style={styles.container}>
  
        <ImageBackground
        
          source={require('../../assets/images/Fondo-pantalla-metal.jpg')}
  
          style={styles.backgroundImage}
  
        >
  
        <KeyboardAvoidingView
        
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  
          style={styles.container}
  
        >

    {successMessage && successType === 'signup' && <SuccessMessage message={successMessage} />}

  
        <Image
            
            source={require('../../assets/images/Logo-PowerUp.png')} 
            
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
  
      fontSize: 22,
  
      fontWeight: 'bold',

      marginLeft: 10,

      marginRight: 10,
  
      marginBottom: 30,
  
      textAlign: 'center',
    
      fontFamily: 'Arial, sans-serif',
  
      textShadowColor: 'black', 
  
      textShadowOffset: { width: 3, height: 3 }, 
  
      textShadowRadius: 5,
  
    },
  
    logo: {
      
      width: '100%',
      
      height: '30%',
      
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

      marginLeft: '5%',
  
      width: '90%',
  
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
  
      color: 'white',
  
    },
    
    placeholder: {
    
      color: '#575756',
    
      fontSize: 17,
    
    },
  
    buttonContainer: {
    
      marginTop: -100,
    
      justifyContent: 'space-between',
    
      paddingVertical: 10,
    
    },
    
    registerButton: {
    
      marginLeft: 28,
    
      width: '85%', 
    
      height: 60,
    
      backgroundColor: 'yellow',
    
      borderRadius: 40, 
    
      borderWidth: 7,
    
      borderColor: 'black',
    
      marginBottom: 20,
    
    },
  
    loginButton: {
  
      marginLeft: 28,
  
      width: '85%',  
  
      height: 60, 
  
      backgroundColor: 'yellow',
  
      borderRadius: 40, 
  
      borderWidth: 7, 
  
      borderColor: 'black',
  
    },
  
    buttonText: {
  
      color: 'black',
     
      fontSize: 20,
    
    },
  
    alertContainer: {
    
      backgroundColor: '#F8D7DA', 
    
      padding: 20,
    
      borderRadius: 10,
    
    },
   
    alertTitle: {
   
      fontSize: 18,
   
      fontWeight: 'bold',
   
      color: '#721C24',
   
    },
   
    alertMessage: {
   
      fontSize: 16,
   
      color: '#721C24',
   
    },
  
  });
  