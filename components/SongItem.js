import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SongItem = ({artist, song, lyricsUrl, youtubeUrl, navigation}) => {
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LyricsScreen', {
            url: lyricsUrl, // URL lirik
            artist: artist, // Nama artist
            song: song, // Judul lagu
          })
        }
      >
        <View style={styles.lyricButtonContainer}>
          <Text style={styles.buttonText}>Lyrics</Text>
        </View>
      </TouchableOpacity>

      {/* Tombol untuk membuka halaman YouTube */}
      <TouchableOpacity onPress={handleYoutubePress}>
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
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  lyricButtonContainer: {
    backgroundColor: '#0804f9',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  youtubeButtonContainer: {
    backgroundColor: '#ff1100',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SongItem;
