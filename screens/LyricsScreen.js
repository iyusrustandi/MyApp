import React, {useState, useEffect} from 'react';
import {View, ImageBackground, StyleSheet, ActivityIndicator, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import Header from '../components/HeaderLyricsScreen';
import backgroundImg from '../assets/background.png';

const LyricsScreen = () => {
  const route = useRoute();
  const {url, artist, song} = route.params || {};
  const [loading, setLoading] = useState(true);

  // Fungsi untuk menyimpan riwayat lirik
  const saveToHistory = async () => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem('lyricsHistory')) || [];
      const newEntry = {artist, song, url, timestamp: new Date().toISOString()};

      // Hindari duplikasi entri
      const updatedHistory = [newEntry, ...history.filter((item) => item.url !== url)];

      await AsyncStorage.setItem('lyricsHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  useEffect(() => {
    if (url) {
      saveToHistory(); // Simpan riwayat saat lirik dibuka
    }
  }, [url]);

  const injectedJS = `
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://jaktourband.vercel.app/style/react-native-style.css';
    document.head.appendChild(link);
  `;

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header artist={artist} song={song} />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading lyrics...</Text>
          </View>
        )}

        {url ? (
          <WebView key={url} source={{uri: url}} injectedJavaScript={injectedJS} onLoad={() => setLoading(false)} onLoadStart={() => setLoading(true)} scalesPageToFit={true} style={{flex: 1}} />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No lyrics URL provided.</Text>
          </View>
        )}
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
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default LyricsScreen;
