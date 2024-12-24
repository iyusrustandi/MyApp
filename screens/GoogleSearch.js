import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/logo.png';

const screenWidth = Dimensions.get('window').width;

const GoogleSearch = () => {
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com/webhp');
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  const handleNavigationStateChange = (navState) => {
    setCurrentUrl(navState.url);
  };

  const goBack = () => {
    if (webViewRef.current && currentUrl !== 'https://www.google.com/webhp') {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Tombol Back dengan ikon dan tulisan */}
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-back" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Judul Header */}
        <Text style={styles.heading}>Jaktourband</Text>

        {/* Logo */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.logoButton}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView ref={webViewRef} source={{uri: currentUrl}} style={{flex: 1}} onNavigationStateChange={handleNavigationStateChange} />
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

export default GoogleSearch;
