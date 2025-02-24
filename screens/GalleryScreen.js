import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, ActivityIndicator, Dimensions, ScrollView, Image, FlatList} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import backgroundImg from '../assets/background.png';
import {WebView} from 'react-native-webview';

const {width, height} = Dimensions.get('window');

const GalleryScreen = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    axios
      .get('https://jaktourband.vercel.app/api/gallery.json')
      .then((response) => {
        setImages(response.data);
        setLoadingImages(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoadingImages(false);
      });

    axios
      .get('https://jaktourband.vercel.app/api/videogallery.json')
      .then((response) => {
        setVideos(response.data);
        setLoadingVideos(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setLoadingVideos(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Gallery" />
      <ImageBackground source={backgroundImg} style={styles.background}>
        {/* Gallery Gambar */}
        <Text style={styles.sectionTitle}>Image Gallery</Text>
        {loadingImages ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {images.map((item) => (
              <View key={item.id} style={styles.slide}>
                <Image source={{uri: item.src}} style={styles.image} />
                <View style={styles.yearContainer}>
                  <Text style={styles.year}>{item.year}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Gallery Video */}
        <Text style={styles.sectionTitle}>Video Gallery</Text>
        {loadingVideos ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={videos}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Grid 2 kolom
            contentContainerStyle={styles.videoGrid}
            renderItem={({item}) => (
              <View style={styles.videoContainer}>
                <WebView source={{uri: item.url}} style={styles.video} />
              </View>
            )}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
  },
  carousel: {
    width,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: width, // Lebar penuh
    height: height * 0.5, // Tinggi 50% dari layar
    resizeMode: 'contain', // Agar gambar tidak terpotong
  },
  yearContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  year: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  videoGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: width * 0.45,
    height: 150,
    margin: 5,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
});

export default GalleryScreen;
