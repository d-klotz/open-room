import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import Api from '../services/api';

const SpotList = ({ tech, navigation }) => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const loadSpots = async () => {
      const response = await Api.get('/spots', {
        params: { tech }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  const handleNavigation  = (id) => {
    navigation.navigate('Book', { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Companies using <Text style={styles.bold}>{tech}</Text></Text>

      <FlatList 
        style={styles.list}
        data={spots}
        keyExtractor={item => spots._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image 
              source={{ uri: item.thumbnail_url }}
              style={styles.thumbnail}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `$${item.price}/day` : 'Free'}</Text>
            <TouchableOpacity style={styles.buttom} onPress={() => handleNavigation(item._id)}>
              <Text>Book it now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
     marginTop: 30
  },
  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15
  },
  bold: {
    fontWeight: 'bold'
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginRight: 15
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default withNavigation(SpotList);
