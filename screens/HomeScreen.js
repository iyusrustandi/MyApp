import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions, PixelRatio} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import backgroundImg from '../assets/background.png';
import Header from '../components/HeaderHomeScreen';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const fontSize = (size) => size * PixelRatio.getFontScale();
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
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid data format');
      }
      const slides = response.data.map((item) => item.slideshow).filter((url) => typeof url === 'string' && url.trim() !== '');
      setImages(slides);
    } catch (error) {
      console.warn('Error fetching slideshow data:', error);
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header />
        {images.length > 0 ? <Image source={{uri: images[currentImgIndex]}} style={styles.homeImg} /> : <Text style={styles.loadingText}>Loading slides...</Text>}
        <Text style={styles.title}>Welcome to Jaktour Band</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AboutScreen')}>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DataScreen')}>
            <Text style={styles.buttonText}>Songlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GalleryScreen')}>
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HistoryScreen')}>
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version: 2.0.0</Text>
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
    paddingHorizontal: screenWidth * 0.05,
  },
  homeImg: {
    width: homeImgWidth,
    height: homeImgHeight,
    marginBottom: screenHeight * 0.02,
    borderRadius: 8,
  },
  loadingText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontStyle: 'italic',
    marginBottom: screenHeight * 0.02,
  },
  title: {
    color: '#fff',
    fontSize: fontSize(24),
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.02,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 25,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.06,
    borderRadius: 8,
    width: screenWidth * 0.35,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize(18),
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: screenHeight * 0.02,
    width: '100%',
    alignItems: 'center',
  },
  versionText: {
    fontSize: fontSize(12),
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
