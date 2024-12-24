import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';
import {WebView} from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const NewPage = ({route}) => {
  const {url} = route.params;
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  const handleNavigationStateChange = (navState) => {
    setCurrentUrl(navState.url);
  };

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  // return <WebView source={{ uri: url }} />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Tombol Back dengan ikon dan tulisan */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={32} color="#fff" fontWeight="bold" />
        </TouchableOpacity>

        {/* Judul Header */}
        <Text style={styles.heading}>Jaktourband</Text>

        {/* Logo */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.logoButton}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
      </View>
      <WebView source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  linkBox: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: screenWidth * 0.6,
    marginLeft: 10,
  },
  linkText: {
    fontSize: screenWidth * 0.03,
    color: '#333',
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

export default NewPage;
