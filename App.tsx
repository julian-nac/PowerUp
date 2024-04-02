import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('Token de registro del dispositivo:', token);
      } else {
        console.log('No se pudo obtener el token de registro del dispositivo');
      }
    } catch (error) {
      console.error('Error al obtener el token de registro del dispositivo:', error);
    }
  };

  useEffect(() => {
    getToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('¡Nuevo mensaje de FCM!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return <AppNavigator />;
};

export default App;
