import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';

import HomeScreen from '../screens/HomeScreen';

import PlaceScreen from '../screens/PlaceScreen';

import CasaScreen from '../screens/CasaScreen';

import GymScreen from '../screens/GymScreen';

import ParkScreen from '../screens/ParqueScreen';

import RutinaScreen from '../screens/RutinaScreen';

import InicioScreen from '../screens/InicioScreen';

import EditarDatosScreen from '../screens/EditarDatosScreen';

import InformeScreen from '../screens/InformeScreen';

import AlarmScreen from '../screens/AlarmScreen';

import VolumenScreen from '../screens/VolumenScreen';

import { SoundVolumeProvider } from '../components/SoundContext';

import { ProgressProvider } from '../components/ProgressContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (

<NavigationContainer>
  
    <ProgressProvider>

    <SoundVolumeProvider>

      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />

        <Stack.Screen name="EditarDatos" component={EditarDatosScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Place" component={PlaceScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Casa" component={CasaScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Gym" component={GymScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Park" component={ParkScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Rutina" component={RutinaScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Informe" component={InformeScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Alarm" component={AlarmScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Volumen" component={VolumenScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
      
    
    </SoundVolumeProvider>

  </ProgressProvider>

</NavigationContainer>

);

};

export default AppNavigator;