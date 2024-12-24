import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import google from '../assets/google.png';

const Header = ({toggleMenu}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Tombol Back dengan ikon dan tulisan */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={32} color="#fff" fontWeight="bold" />
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
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#050A30',
    elevation: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  google: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});

export default Header;
