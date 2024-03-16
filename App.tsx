import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  // Función para obtener el token de registro del dispositivo
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('Token de registro del dispositivo:', token);
        // Aquí puedes guardar el token en tu servidor o utilizarlo como necesites
      } else {
        console.log('No se pudo obtener el token de registro del dispositivo');
      }
    } catch (error) {
      console.error('Error al obtener el token de registro del dispositivo:', error);
    }
  };

  useEffect(() => {
    // Obtener el token de registro del dispositivo al cargar la aplicación
    getToken();

    // Suscribirse a los mensajes de FCM
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('¡Nuevo mensaje de FCM!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return <AppNavigator />;
};

export default App;
