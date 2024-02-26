
import React, { useState } from 'react';

import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';

import { rutinas } from '../data/ejerciciosCasa.json';


const RutinaItem = ({ rutina, onPress }) => {
  
  return (
  
  <TouchableOpacity style={styles.rutinaContainer} onPress={onPress}>
  
      <Text style={styles.rutinaText}>{`Ejercicios: ${rutina.ejercicios.length}`}</Text>
  
      {rutina.zona && <Text style={styles.rutinaText}>{` / Zona: ${rutina.zona}`}</Text>}
  
    </TouchableOpacity>
  
  );

};


const CasaComponente = () => {

  const [zonaSeleccionada, setZonaSeleccionada] = useState(null)

  const navigation = useNavigation();


  const rutinasPorCategoria = rutinas.reduce((acc, rutina) => {

    if (!acc[rutina.categoria]) {

      acc[rutina.categoria] = {

        ejercicios: [],

        imagen: rutina.imagen,

      };

    }

    acc[rutina.categoria].ejercicios.push(rutina);

    return acc;

  }, {});


  const handleRutinaPress = (rutina) => {

    navigation.navigate('Rutina', { rutina });

  };

  return (

    <View style={styles.container}>

      <ImageBackground
    
      source={require('../../assets/images/Fondo-pantalla-metal.jpg')}
    
      style={styles.backgroundImage}
      
      >
      
        <ScrollView>

        <View style={styles.filterContainer}>
            <Text style={styles.filterText}>Filtrar por Zona:</Text>
            <Picker
              selectedValue={zonaSeleccionada}
              onValueChange={(itemValue) => setZonaSeleccionada(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Todas" value={null} />
              <Picker.Item label="Cuerpo Completo" value="Cuerpo Completo" />
              {/* Agrega más Picker.Item según las zonas que tengas */}
            </Picker>
          </View>

      
          {Object.entries(rutinasPorCategoria).map(([categoria, datosCategoria], index) => (
      
          <View key={index} style={index === 0 ? styles.firstCategoriaContainer : null}>
          
              <View style={styles.categoriaContainer}>
          
                <Image source={{ uri: datosCategoria.imagen }} style={styles.categoriaImage} />
          
                <Text style={styles.categoriaText}>{categoria}</Text>
          
              </View>
          
              {datosCategoria.ejercicios
                .filter((rutina) => (zonaSeleccionada ? rutina.zona === zonaSeleccionada : true))
                .map((rutina, rutinaIndex) => (
          
          <RutinaItem
          
          key={rutinaIndex}
          
          rutina={rutina}
          
          onPress={() => handleRutinaPress(rutina)}
          
          />
          
          ))}
          
            </View>
          
          ))}
        
        </ScrollView>
      
      </ImageBackground>
    
    </View>
  
  );

};



const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

  backgroundImage: {

    flex: 1,

    resizeMode: 'cover',

    justifyContent: 'center',

  },

  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    marginVertical: 10,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
    marginRight: 20,
  },
  picker: {
    flex: 1,
    height: 40,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  firstCategoriaContainer: {

    marginTop: 20, 

  },

  categoriaContainer: {

    backgroundColor: 'black',

    flexDirection: 'row',

    alignItems: 'center',

    padding: 20,

    marginBottom: 10,

    borderColor: 'yellow',

    borderWidth: 3,

  },

  categoriaImage: {

    width: 50,

    height: 50,

    marginRight: 20,

  },

  categoriaText: {

    color: 'white',

    fontSize: 18,

    fontWeight: 'bold',

  },

  rutinaContainer: {

    backgroundColor: 'yellow',

    flexDirection: 'row',

    borderColor: 'black',

    width: '90%',

    marginLeft: 20,

    borderWidth: 7,

    borderRadius: 30,

    padding: 20,

    marginBottom: 10,

  },

  rutinaText: {

    color: 'black',

    fontSize: 16,

    fontWeight: 'bold',

  },

});

export default CasaComponente;
