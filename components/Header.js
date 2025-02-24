import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';

const Header = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Tombol Back dengan ikon dan tulisan */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Judul Header */}
      <Text style={styles.heading}>{title}</Text>

      {/* Logo */}
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.logoButton}>
        <Image source={logo} style={styles.logo} />
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
  logoButton: {
    borderRadius: 8,
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  logo: {
    width: 90,
    height: 45,
    resizeMode: 'contain',
  },
});

export default Header;
