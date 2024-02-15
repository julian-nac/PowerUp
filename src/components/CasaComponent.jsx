import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { elementosDeportivos } from '../data/elementosDeportivos.json'

const CasaComponente = () => {
  // Filtra los elementos deportivos por ubicación "casa"
  const elementosEnCasa = elementosDeportivos.filter(
    (elemento) => elemento.ubicacion === 'casa'
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elementos Deportivos en Casa:</Text>
      <FlatList
        data={elementosEnCasa}
        keyExtractor={(item) => item.nombre}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default CasaComponente;
