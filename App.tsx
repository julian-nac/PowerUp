import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
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
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Registrarse" onPress={handleCreateAccount} />
      <Button title="Iniciar Sesión" onPress={handleSignIn} />
    </View>
  );
}

const Stack = createNativeStackNavigator();  // Crear el Stack Navigator

export default function App() {
  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName="Login">
   <Stack.Screen name="Login" component={LoginScreen} />
   <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
