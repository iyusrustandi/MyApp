import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import google from '../assets/chrome.png';

const {width, height} = Dimensions.get('window');

const HeaderDataScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Tombol Back */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={width * 0.07} color="#fff" />
      </TouchableOpacity>

      {/* Judul Header */}
      <Text style={styles.heading}>Jaktourband Songlist</Text>

      {/* Tombol navigasi halaman Google */}
      <TouchableOpacity onPress={() => navigation.navigate('GoogleSearch')} style={styles.googleButton}>
        <Image source={google} style={styles.google} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#050A30',
    elevation: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    padding: width * 0.02,
  },
  googleButton: {
    padding: width * 0.015,
  },
  google: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
});

export default HeaderDataScreen;
