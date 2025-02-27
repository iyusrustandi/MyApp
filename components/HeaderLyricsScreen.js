import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';

const {width} = Dimensions.get('window');

const Header = ({artist, song}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Tombol Back di sebelah kiri */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={width * 0.08} color="#fff" />
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
    maxWidth: '60%',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: width * 0.045,
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
    width: width * 0.15,
    height: width * 0.1,
    resizeMode: 'contain',
  },
});

export default Header;
