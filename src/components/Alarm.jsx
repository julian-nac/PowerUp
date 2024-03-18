import React, { useState, useEffect } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import PushNotification from 'react-native-push-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';


const ExerciseAlarmComponent = () => {

  const [alarmTime, setAlarmTime] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);

  const navigation = useNavigation();


  useEffect(() => {

    retrieveAlarmTime();

  }, []);

  const retrieveAlarmTime = async () => {

    try {

      const value = await AsyncStorage.getItem('alarmTime');

      if (value !== null) {

        setAlarmTime(new Date(value));

      }

    } catch (error) {

      console.error('Error al obtener la hora de la alarma:', error);

    }

  };

  const handleTimeChange = (event, selectedTime) => {

    setShowPicker(false);

    if (selectedTime) {

      setAlarmTime(selectedTime);

      scheduleNotification(selectedTime);

      storeAlarmTime(selectedTime);

    }

  };

  const storeAlarmTime = async (selectedTime) => {

    try {

      await AsyncStorage.setItem('alarmTime', selectedTime.toString());

    } catch (error) {

      console.error('Error al almacenar la hora de la alarma:', error);

    }

  };

  const scheduleNotification = (selectedTime) => {

    const selectedHour = selectedTime.getHours();

    const selectedMinute = selectedTime.getMinutes();

    const currentTime = new Date();

    let notificationDate;
    
    if (
    
      selectedHour < currentTime.getHours() ||
    
      (selectedHour === currentTime.getHours() && selectedMinute <= currentTime.getMinutes())
    
      ) {

        const tomorrow = new Date(currentTime);

        tomorrow.setDate(currentTime.getDate() + 1);

        notificationDate = new Date(

          tomorrow.getFullYear(),

          tomorrow.getMonth(),

          tomorrow.getDate(),

          selectedHour,

          selectedMinute

          );

        } else {

          notificationDate = new Date(

            currentTime.getFullYear(),

            currentTime.getMonth(),

            currentTime.getDate(),

            selectedHour,

            selectedMinute

            );

          }

    PushNotification.localNotificationSchedule({
   
      message: '¡Es hora de hacer ejercicio!',

      date: notificationDate,
   
      allowWhileIdle: true,
   
      repeatType: 'day', 
   
    });
  
  };

  const formatTime = (date) => {
   
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  };

  return (
  
  <View style={styles.container}>
  
      <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
  
        <Image source={require('../../assets/images/back.png')} style={styles.logo} />
  
      </TouchableOpacity>
  
      <Text style={styles.header}>Configurar alarma de ejercicio</Text>
  
      <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
  
        <Text style={styles.buttonText}>Seleccionar Hora de Alarma</Text>
  
      </TouchableOpacity>
  
      {showPicker && (
  
      <DateTimePicker
  
      value={alarmTime}
 
      mode="time"
 
      is24Hour={true}
 
      display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
 
      onChange={handleTimeChange}
 
      />
 
 )}
 
      {alarmTime && (
 
 <View style={styles.selectedTimeContainer}>
 
          <Text style={styles.selectedTimeText}>
 
            La alarma está configurada para sonar a las {formatTime(alarmTime)} todos los días.
 
          </Text>
 
        </View>
 
 )}
 
    </View>
 
 );

};


const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: 'black',

    paddingHorizontal: 20,

  },

  header: {

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 20,

    color: 'white',

  },

  button: {

    backgroundColor: 'yellow',

    borderColor: 'white',

    borderWidth: 2,

    padding: 15,

    borderRadius: 10,

    marginBottom: 20,

  },

  buttonText: {

    color: 'black',

    fontSize: 18,

    textAlign: 'center',

  },

  selectedTimeContainer: {

    marginTop: 20,

  },

  selectedTimeText: {

    fontSize: 16,

    color: 'white',

    textAlign: 'center',

  },

  goBack: {

    position: 'absolute',

    top: 20,

    right: 1,

  },
  logo: {
  
    width: 32, 

    height: 32,

    marginRight: 10,

  },
});

export default ExerciseAlarmComponent;
