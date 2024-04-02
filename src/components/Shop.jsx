import React, { useEffect } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';

import { firebase } from '@react-native-firebase/analytics';

import { useNavigation } from '@react-navigation/native';


const PromotionsComponent = () => {

  const navigation = useNavigation()

  const promotions = [

    { id: 1, brand: 'GymWear', description: '¡Hasta 50% de descuento en ropa deportiva!', url: 'https://www.gymwear.com' },

    { id: 2, brand: 'FitSupps', description: '¡Oferta exclusiva! 2x1 en suplementos seleccionados.', url: 'https://www.fitsupps.com' },

    { id: 3, brand: 'ActiveGear', description: '¡Descubre nuestras nuevas líneas de equipamiento deportivo!', url: 'https://www.activegear.com' },

  ];

  const handlePromotionClick = (url) => {
  
    Linking.openURL(url);
    
    firebase.analytics().logEvent('promotion_click_test', { promotion_url: url });
  };

  useEffect(() => {
  
    firebase.analytics().setAnalyticsCollectionEnabled(true);
  
  }, []);

  return (
  
  <View style={styles.container}>

    <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>

    <Image source={require('../../assets/images/back.png')} style={styles.logo} />

    </TouchableOpacity>
  
    {promotions.map((promotion) => (

    <TouchableOpacity
    
    key={promotion.id}
    
    style={styles.promotionContainer}
    
    onPress={() => handlePromotionClick(promotion.url)}
    
    >
    
      <Text style={styles.brandText}>{promotion.brand}</Text>
  
        <Text style={styles.descriptionText}>{promotion.description}</Text>
    
    </TouchableOpacity>
    
    ))}
    
    </View>
  
  );

};

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    backgroundColor: 'black',

  },

  promotionContainer: {

    marginBottom: 20,

    padding: 15,

    borderRadius: 10,

    borderBottomColor: 'yellow',

    borderWidth: 1,

    backgroundColor: '#333', 

  },

  brandText: {

    fontSize: 18,

    fontWeight: 'bold',

    color: '#fff', 

    marginBottom: 5,

  },

  descriptionText: {

    fontSize: 16,

    color: '#fff', 

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

export default PromotionsComponent;