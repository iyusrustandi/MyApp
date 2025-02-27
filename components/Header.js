import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, PixelRatio} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';

const {width, height} = Dimensions.get('window');
const scale = PixelRatio.get();

const Header = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Tombol Back */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={width * 0.07} color="#fff" />
      </TouchableOpacity>

      {/* Judul Header */}
      <Text style={styles.heading} numberOfLines={1}>
        {title}
      </Text>

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
    paddingVertical: 16,
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
    maxWidth: width * 0.6,
  },
  backButton: {
    position: 'absolute',
    left: width * 0.02,
    zIndex: 1,
    padding: width * 0.02,
  },
  logoButton: {
    position: 'absolute',
    right: width * 0.02,
    zIndex: 1,
  },
  logo: {
    width: width * 0.15,
    height: width * 0.1,
    resizeMode: 'contain',
  },
});

export default Header;
