import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SongItem = ({artist, song, lyricsUrl, youtubeUrl, navigation}) => {
  // Fungsi untuk menangani navigasi ke halaman Lyrics
  const handleLyricsPress = () => {
    if (lyricsUrl) {
      navigation.navigate('LyricsScreen', {
        url: lyricsUrl,
        artist: artist,
        song: song,
      });
    } else {
      console.warn('Lyrics URL is missing.');
    }
  };

  // Fungsi untuk menangani navigasi ke halaman YouTube
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
        <View style={styles.lyricButtonContainer}>
          <Text style={styles.buttonText}>Lyrics</Text>
        </View>
      </TouchableOpacity>

      {/* Tombol untuk membuka halaman YouTube */}
      <TouchableOpacity onPress={handleYoutubePress} activeOpacity={0.7}>
        <View style={styles.youtubeButtonContainer}>
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
    borderBottomColor: '#fff',
    paddingVertical: 4,
  },
  tableCell: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  lyricButtonContainer: {
    backgroundColor: '#0804f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  youtubeButtonContainer: {
    backgroundColor: '#ff1100',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SongItem;
