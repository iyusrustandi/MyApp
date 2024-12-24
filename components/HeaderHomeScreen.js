import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import logo from '../assets/logo.png';

const Header = ({toggleMenu}) => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1000,
  },
  logo: {
    width: 145,
    height: 52,
  },
});

export default Header;
