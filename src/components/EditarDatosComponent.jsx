import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const EditarDatosUsuario = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(); // Inicializa tu conexión a Firestore aquí
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);

        // Mapea los datos de todos los usuarios si es necesario
        const allUsersData = usersSnapshot.docs.map((doc) => doc.data());

        // Aquí, estoy asumiendo que el usuario actual está almacenado en userData
        setUserData(allUsersData[0]); // Puedes ajustar esto según tu lógica

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos de Firestore:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Este efecto se ejecutará solo una vez al montar el componente

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  // Renderiza tu componente con los datos obtenidos de Firestore
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos del Usuario:</Text>
      <Text>Peso: {userData.weight}</Text>
      <Text>Altura: {userData.height}</Text>
      {/* Agrega más campos según sea necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default EditarDatosUsuario;
