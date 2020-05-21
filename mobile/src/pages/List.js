import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet, Platform, Alert } from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';
import Logo from '../assets/logo.png';

const List = ({ navigation }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      const socket = socketio('http://192.168.1.21:3333', {
        query: { user }
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Your booking request at ${booking.spot.company} on the ${booking.date} was ${booking.approved? 'approved' : 'declined'}.`);
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs')
      .then(storagedTechs => {
        if(storagedTechs == null) {
          navigation.navigate('Login')
        }
        const techsArray = storagedTechs.split(',').map(tech => tech.trim());
        setTechs(techsArray);
      })
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      
      <ScrollView>
        {techs.map((tech, i) => <SpotList key={i} tech={tech}/>)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
});

export default List;
