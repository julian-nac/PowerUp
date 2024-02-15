
import React from 'react';

import { View, Text, StyleSheet } from 'react-native';


const SuccessMessage = ({ message }) => {

  return (

    <View style={styles.container}>

      <Text style={styles.text}>{message}</Text>

    </View>
  
  );

};


const styles = StyleSheet.create({

  container: {

    backgroundColor: 'green',

    padding: 10,

    borderRadius: 5,

    position: 'absolute',

    top: 0,

    left: 10,

    right: 10,

    zIndex: 999,

  },

  text: {

    color: 'white',

    fontSize: 16,

    fontWeight: 'bold',

    textAlign: 'center',

  },

});

export default SuccessMessage;