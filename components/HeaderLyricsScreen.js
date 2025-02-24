import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';

const Header = ({artist, song}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Tombol Back di sebelah kiri */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Artist and Song Title */}
      <View style={styles.titleContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.headerText} numberOfLines={1}>
            {artist} - {song}
          </Text>
        </ScrollView>
      </View>

      {/* Logo di sebelah kanan */}
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
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 115,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  logoButton: {
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
