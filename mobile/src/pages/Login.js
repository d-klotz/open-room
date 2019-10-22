import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';
import Logo from '../assets/logo.png';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.clear();
    AsyncStorage.getItem('user').then(user => {
      AsyncStorage.getItem('techs').then(storagedTech => {
        if (user && storagedTech) {
          navigation.navigate('List');
        }
      });
    });
  }, []);

  const handleSubmit = async () => {
    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);
    
    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={Logo}/>

      <View style={styles.form}>
        <Text style={styles.lable}>E-mail</Text>
        <TextInput 
          style={styles.input}
          placeholder="Your e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          />
        
        <Text style={styles.lable}>Tech</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your tech stack"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
          />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Find spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lable: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
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
  }
});

export default Login;
