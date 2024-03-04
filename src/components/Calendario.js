// Calendario.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useProgress } from './ProgressContext';

const Calendario = () => {
  const { rutinaCompletadaDiaria } = useProgress();

  console.log('Estado actual de rutinaCompletadaDiaria:', rutinaCompletadaDiaria);

  const díasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  const renderDíasSemana = () => {
    return díasSemana.map((día, index) => (
      <View key={index} style={[styles.día, rutinaCompletadaDiaria[día] && styles.díaCompleto]}>
        <Text>{día}</Text>
      </View>
    ));
  };

  return <View style={styles.container}>{renderDíasSemana()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 8,
    margin: 10,
  },
  día: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
  },
  díaCompleto: {
    backgroundColor: '#27ae60',
  },
});

export default Calendario;
