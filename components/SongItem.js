import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const SongItem = ({artist, song, lyricsUrl, youtubeUrl, navigation}) => {
  // Fungsi untuk navigasi ke halaman Lyrics
  const handleLyricsPress = () => {
    if (lyricsUrl) {
      navigation.navigate('LyricsScreen', {url: lyricsUrl, artist, song});
    } else {
      console.warn('Lyrics URL is missing.');
    }
  };

  // Fungsi untuk navigasi ke halaman YouTube
  const handleYoutubePress = () => {
    if (youtubeUrl) {
      navigation.navigate('NewPage', {url: youtubeUrl});
    } else {
      console.warn('YouTube URL is missing.');
    }
  };

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{artist}</Text>
      <Text style={styles.tableCell}>{song}</Text>

      {/* Tombol untuk membuka halaman Lyrics */}
      <TouchableOpacity onPress={handleLyricsPress} activeOpacity={0.7}>
        <View style={[styles.buttonContainer, styles.lyricButton]}>
          <Text style={styles.buttonText}>Lyrics</Text>
        </View>
      </TouchableOpacity>

      {/* Tombol untuk membuka halaman YouTube */}
      <TouchableOpacity onPress={handleYoutubePress} activeOpacity={0.7}>
        <View style={[styles.buttonContainer, styles.youtubeButton]}>
          <Text style={styles.buttonText}>YouTube</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tableCell: {
    flex: 2,
    fontSize: width * 0.03,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    paddingHorizontal: 8,
  },
  buttonContainer: {
    minWidth: 50,
    width: width * 0.2,
    paddingVertical: width * 0.015,
    paddingHorizontal: width * 0.03,
    borderRadius: 8,
    alignItems: 'center',
  },
  lyricButton: {
    backgroundColor: '#0804f9',
  },
  youtubeButton: {
    backgroundColor: '#ff1100',
  },
  buttonText: {
    fontSize: width * 0.03,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SongItem;
