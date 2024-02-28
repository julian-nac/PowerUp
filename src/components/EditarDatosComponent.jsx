import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const EditarDatos = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newYearsold, setNewYearsold] = useState('');
  const [newExpectweight, setNewExpectweight] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);

        const allUsersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setUserData(allUsersData[0]);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const db = getFirestore();
      const userDocRef = doc(collection(db, 'users'), userData.id);

      await updateDoc(userDocRef, {
        weight: newWeight || userData.weight,
        height: newHeight || userData.height,
        yearsold: newYearsold || userData.yearsold,
        expectweight: newExpectweight || userData.expectweight,
      });

      setUserData({
        ...userData,
        weight: newWeight || userData.weight,
        height: newHeight || userData.height,
        yearsold: newYearsold || userData.yearsold,
        expectweight: newExpectweight || userData.expectweight,
      });

      setNewWeight('');
      setNewHeight('');
      setNewYearsold('');
      setNewExpectweight('');

      setIsEditing(false);
      console.log('Datos actualizados con éxito');
    } catch (error) {
      console.error('Error al actualizar datos en Firestore:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="yellow" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Datos:</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Peso:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={newWeight}
            onChangeText={(text) => setNewWeight(text)}
          />
        ) : (
          <Text style={styles.value}>{userData.weight}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Altura:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={newHeight}
            onChangeText={(text) => setNewHeight(text)}
          />
        ) : (
          <Text style={styles.value}>{userData.height}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Edad:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={newYearsold}
            onChangeText={(text) => setNewYearsold(text)}
          />
        ) : (
          <Text style={styles.value}>{userData.yearsold}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Peso Ideal:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={newExpectweight}
            onChangeText={(text) => setNewExpectweight(text)}
          />
        ) : (
          <Text style={styles.value}>{userData.expectweight}</Text>
        )}
      </View>


      {isEditing && (
        <Button title="Guardar Cambios" onPress={handleSaveChanges} />
      )}

      {!isEditing && (
        <Button title="Editar Datos" onPress={() => setIsEditing(true)} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  loadingContainer: {
    
      position: 'absolute',
      
      top: 0,
      
      bottom: 0,
      
      left: 0,
      
      right: 0,
      
      backgroundColor: 'black',
      
      justifyContent: 'center',
      
      alignItems: 'center',
    
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
  label: {
    flex: 1,
    color: 'white',
  },
  input: {
    flex: 2,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
    color: 'white',
  },
  value: {
    flex: 2,
    height: 40,
    paddingHorizontal: 8,
    marginTop: 20,
    marginRight: 18,
    color: 'white',
  },
  editIcon: {
    fontSize: 20,
    color: 'white',
  },
});

export default EditarDatos;
