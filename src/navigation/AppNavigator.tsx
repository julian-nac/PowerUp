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


const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (

<NavigationContainer>

      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Place" component={PlaceScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Casa" component={CasaScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Gym" component={GymScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Park" component={ParkScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Rutina" component={RutinaScreen} options={{ headerShown: false }} />

      </Stack.Navigator>

</NavigationContainer>

);

};

export default AppNavigator;