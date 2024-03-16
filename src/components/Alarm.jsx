import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

    const currentDate = new Date();
    const currentTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      selectedHour,
      selectedMinute,
    );

    const nextDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
      selectedHour,
      selectedMinute,
    );

    PushNotification.localNotificationSchedule({
      message: '¡Es hora de hacer ejercicio!',
      date: currentTime,
      allowWhileIdle: true,
    });

    PushNotification.localNotificationSchedule({
      message: '¡Es hora de hacer ejercicio!',
      date: nextDay,
      allowWhileIdle: true,
    });
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
          display="clock"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ExerciseAlarmComponent;
