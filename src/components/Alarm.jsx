import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

const ExerciseAlarmComponent = () => {
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setAlarmTime(selectedTime);
      scheduleNotification(selectedTime);
    }
  };

  const scheduleNotification = (selectedTime) => {
    const selectedHour = selectedTime.getHours();
    const selectedMinute = selectedTime.getMinutes();

    const currentTime = new Date();
    const selectedTimeToday = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      selectedHour,
      selectedMinute,
    );

    const selectedTimeTomorrow = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate() + 1,
      selectedHour,
      selectedMinute,
    );

    PushNotification.localNotificationSchedule({
      message: '¡Es hora de hacer ejercicio!',
      date: selectedTimeToday,
      allowWhileIdle: true,
      repeatType: 'day', // Repetir la notificación diariamente
    });

    PushNotification.localNotificationSchedule({
      message: '¡Es hora de hacer ejercicio!',
      date: selectedTimeTomorrow,
      allowWhileIdle: true,
      repeatType: 'day', // Repetir la notificación diariamente
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configurar Alarma de Ejercicio</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowPicker(true)}
      >
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
    backgroundColor: '#FFD700',
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
});

export default ExerciseAlarmComponent;
