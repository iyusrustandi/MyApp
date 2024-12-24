import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import backgroundImg from '../assets/background.png';
import Header from '../components/HeaderHomeScreen';

const screenWidth = Dimensions.get('window').width;
const homeImgWidth = screenWidth * 0.8;
const homeImgHeight = homeImgWidth * (9 / 16);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    fetchSlideshowData();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const fetchSlideshowData = async () => {
    try {
      const response = await axios.get('https://jaktourband.vercel.app/api/slideshow.json');
      const slides = response.data.map((item) => item.slideshow);
      setImages(slides);
    } catch (error) {
      console.error('Error fetching slideshow data:', error);
    }
  };

  const handleNavigateToDataScreen = () => {
    navigation.navigate('DataScreen');
  };

  const handleNavigateToAboutPage = () => {
    navigation.navigate('NewPage', {url: 'https://jaktourband.vercel.app/'});
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header />
        {images.length > 0 ? <Image source={{uri: images[currentImgIndex]}} style={{...styles.homeImg, width: homeImgWidth, height: homeImgHeight}} /> : <Text style={styles.loadingText}>Loading slides...</Text>}
        <Text style={styles.title}>Welcome to Jaktour Band</Text>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToAboutPage}>
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToDataScreen}>
          <Text style={styles.buttonText}>Songlist</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version: 1.2.0</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeImg: {
    marginBottom: 20,
    borderRadius: 8,
  },
  loadingText: {
    color: '#fff',
    fontSize: screenWidth * 0.04,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: screenWidth * 0.07,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  versionText: {
    fontSize: screenWidth * 0.025,
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
