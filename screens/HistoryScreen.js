import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, Modal, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import Header from '../components/Header';
import backgroundImg from '../assets/background.png';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = JSON.parse(await AsyncStorage.getItem('lyricsHistory')) || [];
        setHistory(storedHistory);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Fungsi untuk mengelompokkan data berdasarkan tanggal
  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const dateKey = new Date(item.timestamp).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});
  };

  const groupedHistory = groupByDate(history);
  const sortedDates = Object.keys(groupedHistory).reverse(); // Urutkan dari terbaru ke terlama

  // Fungsi untuk menampilkan modal konfirmasi sebelum menghapus
  const confirmDelete = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Fungsi untuk menghapus item dari history
  const deleteHistoryItem = async () => {
    if (selectedItem) {
      const newHistory = history.filter((item) => item.timestamp !== selectedItem.timestamp);
      setHistory(newHistory);
      await AsyncStorage.setItem('lyricsHistory', JSON.stringify(newHistory));
      setModalVisible(false);
      setSelectedItem(null);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="History" />

      <ImageBackground source={backgroundImg} style={styles.background}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            data={sortedDates}
            keyExtractor={(date) => date}
            contentContainerStyle={styles.content}
            renderItem={({item: date}) => (
              <View style={styles.dateSection}>
                <Text style={styles.dateHeader}>{date}</Text>
                {groupedHistory[date].map((entry, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.time}>
                      {new Date(entry.timestamp).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h23',
                      })}
                    </Text>
                    <Text style={styles.songTitle}>
                      {entry.artist} - {entry.song}
                    </Text>
                    <TouchableOpacity onPress={() => confirmDelete(entry)} style={styles.deleteButton}>
                      <AntDesign name="delete" size={14} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          />
        )}
      </ImageBackground>

      {/* Modal Konfirmasi Hapus */}
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Yakin ingin menghapus lagu ini dari history?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={deleteHistoryItem}>
                <Text style={styles.buttonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 16,
  },
  loader: {
    marginTop: 20,
  },
  content: {
    paddingBottom: 20,
  },
  dateSection: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'left',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 6,
  },
  time: {
    fontSize: 14,
    color: '#000',
    width: 60,
    textAlign: 'center',
    marginRight: 12,
  },
  songTitle: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1A1A40',
    padding: 20,
    borderRadius: 8,
    width: '75%',
    alignItems: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
