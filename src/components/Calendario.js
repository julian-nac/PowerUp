import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useProgress } from './ProgressContext';

const Calendario = () => {
  const { rutinaCompletadaDiaria } = useProgress();
  const [estadoRutina, setEstadoRutina] = useState(rutinaCompletadaDiaria);

  useEffect(() => {
    setEstadoRutina(rutinaCompletadaDiaria);
  }, [rutinaCompletadaDiaria]);

  console.log('Estado actual de rutinaCompletadaDiaria:', estadoRutina);

  const díasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  const renderDíasSemana = () => {
    return díasSemana.map((día, index) => (
      <View key={index} style={[styles.día, estadoRutina[día] && styles.díaCompleto]}>
        <Text style={styles.letraDía}>{día.charAt(0).toUpperCase()}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Progreso de esta semana:</Text>
      <View style={styles.calendarioContainer}>{renderDíasSemana()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 130,
  },
  titulo: {
    fontSize: 20,
    paddingRight: 115,
    borderColor: 'yellow',
    borderBottomWidth: 2, 
    padding: 20,
    borderRadius: 10,
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: '#fff', // Blanco
  },
  calendarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: '#000', // Negro
  },
  día: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Blanco
  },
  letraDía: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Negro
  },
  díaCompleto: {
    backgroundColor: '#ffeb3b', // Amarillo
  },
});

export default Calendario;
