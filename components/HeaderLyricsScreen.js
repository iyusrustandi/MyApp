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
        <Icon name="arrow-back" size={32} color="#fff" fontWeight="bold" />
      </TouchableOpacity>

      {/* Artist and Song Title */}
      <View style={styles.titleContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.headerText} numberOfLines={1}>
            {artist} - {song}
          </Text>
        </ScrollView>
      </View>

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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#050A30',
    elevation: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  backButton: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  logoButton: {
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
});

export default Header;
