import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const homeImgWidth = screenWidth * 0.8;
const homeImgHeight = homeImgWidth * (9 / 16);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [aboutData, setAboutData] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [slideshowUrls, setSlideshowUrls] = useState([]);

  useEffect(() => {
    console.log('Fetching background data...');
    fetchBackground();
    console.log('Fetching about data...');
    fetchAboutData();
    console.log('Starting image slideshow...');
    startImageSlideshow();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get('https://jaktourband.vercel.app/home.json');
      setAboutData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBackground = async () => {
    try {
      const response = await axios.get('https://jaktourband.vercel.app/background.json');
      console.log('Background Response:', response.data);
      setBackgroundUrl(response.data[0].background);
      console.log('Background URL:', response.data[0].background);
    } catch (error) {
      console.error('Error fetching background:', error);
    }
  };

  const fetchSlideshow = async () => {
    try {
      const response = await axios.get('https://jaktourband.vercel.app/slideshow.json');
      return response.data.map((item) => item.slideshow);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const startImageSlideshow = () => {
    setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % slideshowUrls.length);
    }, 3000);
  };

  const handleNavigateToDataScreen = () => {
    navigation.navigate('DataScreen');
  };

  const handleNavigateToAboutPage = () => {
    if (aboutData.length > 0) {
      navigation.navigate('Lyrics', {url: aboutData[0].about});
    }
  };

  return (
    <ImageBackground source={{uri: backgroundUrl}} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={{uri: slideshowUrls[currentImgIndex]}} style={{...styles.homeImg, width: homeImgWidth, height: homeImgHeight}} />
        <Text style={styles.title}>Welcome to Jaktour Band</Text>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToAboutPage}>
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToDataScreen}>
          <Text style={styles.buttonText}>Songlist</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version : 1.0.6</Text>
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
    bottom: 2, // Adjust as needed
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
