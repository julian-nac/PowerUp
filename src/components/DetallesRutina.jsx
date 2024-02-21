import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';

const DetallesRutina = ({ route, navigation }) => {
  const { rutina } = route.params;
  const [indiceEjercicio, setIndiceEjercicio] = useState(0);

  const handleSiguienteEjercicio = () => {
    if (indiceEjercicio < rutina.ejercicios.length - 1) {
      setIndiceEjercicio(indiceEjercicio + 1);
    } else {
      // Redirigir a alguna pantalla cuando se completen todos los ejercicios
      navigation.navigate('Place');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: rutina.imagen }} style={styles.imagen} />
        <Text style={styles.categoriaText}>{rutina.categoria}</Text>
        <Text style={styles.zonaText}>{rutina.zona}</Text>
      </View>

      <View style={styles.ejerciciosContainer}>
        <View style={styles.ejercicioContainer}>
          <Text style={styles.nombreText}>{rutina.ejercicios[indiceEjercicio].nombre}</Text>
          <Text style={styles.descripcionText}>{rutina.ejercicios[indiceEjercicio].descripcion}</Text>
          <Text style={styles.duracionText}>{`Duración: ${rutina.ejercicios[indiceEjercicio].duracion}`}</Text>
        </View>
      </View>

      <Button title="Siguiente Ejercicio" onPress={handleSiguienteEjercicio} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  categoriaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  zonaText: {
    fontSize: 16,
    color: '#888',
  },
  ejerciciosContainer: {
    padding: 20,
  },
  ejercicioContainer: {
    marginBottom: 20,
  },
  nombreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descripcionText: {
    fontSize: 14,
    color: '#444',
  },
  duracionText: {
    fontSize: 12,
    color: '#666',
  },
});

export default DetallesRutina;
