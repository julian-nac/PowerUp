// PlaceScreen.js (o el nombre que tengas para tu archivo)
import React from 'react';
import PlaceComponent from '../components/PlaceComponent';; // Asegúrate de tener la ruta correcta

const PlaceScreen = () => {
    const handlePlaceSelection = (selectedPlace: string) => {
      // Lógica para manejar la selección del lugar
      console.log('Lugar seleccionado:', selectedPlace);
    };
  
    return (
      <PlaceComponent handlePlaceSelection={handlePlaceSelection} />
    );
  };
  
  export default PlaceScreen;