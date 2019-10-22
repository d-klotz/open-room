import React, { useState } from 'react';
import { SafeAreaView, AsyncStorage, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import api from '../services/api';

const Book = ({ navigation }) => {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  const handleSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user');
    await api.post(`/spots/${id}/bookings`, { date }, {
      headers: {
        user_id
      }
    });

    Alert.alert('Your booking request has been sent.');
    navigation.navigate('List');
  }

  const handleCancel = () => {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.lable}>Date</Text>
      <TextInput 
        style={styles.input}
        placeholder="When do you want to come?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
        />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book this place</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  lable: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 50
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
  },
});

export default Book;
