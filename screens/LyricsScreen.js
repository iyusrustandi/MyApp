import React from 'react';
import {View, ImageBackground, StyleSheet, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import Header from '../components/HeaderLyricsScreen';
import backgroundImg from '../assets/background.png';

const LyricsScreen = () => {
  const route = useRoute();
  const {url, artist, song} = route.params || {};

  const injectedJS = `
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://jaktourband.vercel.app/style/react-native-style.css';
    document.head.appendChild(link);
  `;

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Menggunakan komponen Header */}
        <Header artist={artist} song={song} />

        {/* WebView untuk menampilkan halaman lirik */}
        {url ? (
          <WebView source={{uri: url}} injectedJavaScript={injectedJS} startInLoadingState={true} renderLoading={() => <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />} scalesPageToFit={true} style={{flex: 1}} />
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
  loader: {
    flex: 1,
    justifyContent: 'center',
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
