import React, {useState, useEffect} from 'react';
import {View, ImageBackground, FlatList, Dimensions, StyleSheet, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Header from '../components/HeaderDataScreen';
import SearchBar from '../components/SearchBar';
import SongItem from '../components/SongItem';
import FooterDataScreen from '../components/FooterDataScreen';
import backgroundImg from '../assets/background.png';

const {width, height} = Dimensions.get('window');

const DataScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalData, setTotalData] = useState(25);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jaktourband.vercel.app/api/data.json');
      setData(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchData();
  }, [searchQuery, totalData]);

  const searchData = () => {
    const filteredData = data.filter((item) => item.artist.toLowerCase().includes(searchQuery.toLowerCase()) || item.song.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(totalData === 'allsongs' ? filteredData : filteredData.slice(0, parseInt(totalData)));
    setErrorMessage(filteredData.length === 0 && searchQuery.trim() !== '' ? 'No results found, open' : '');
  };

  const handlePrevious = () => {
    setTotalData((prev) => Math.max(5, prev - 5)); // Minimal 5 lagu
  };

  const handleNext = () => {
    setTotalData((prev) => Math.min(data.length, prev + 5)); // Maksimal jumlah lagu yang tersedia
  };

  const renderItem = ({item}) => <SongItem artist={item.artist} song={item.song} lyricsUrl={item.lyrics} youtubeUrl={item.youtube} navigation={navigation} />;

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} totalData={totalData} setTotalData={setTotalData} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading songlist...</Text>
          </View>
        ) : (
          <>
            {errorMessage ? (
              <View style={styles.errorTextContainer}>
                <Text style={styles.errorText}>No results found, open </Text>
                <TouchableOpacity onPress={() => navigation.navigate('GoogleSearch')}>
                  <Text style={styles.linkText}>Chrome</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <FlatList data={searchQuery !== '' ? searchResults : data.slice(0, parseInt(totalData))} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
            {!loading && <FooterDataScreen handlePrevious={handlePrevious} handleNext={handleNext} totalSongs={data.length} />}
          </>
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
  errorTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  errorText: {
    fontSize: width * 0.03,
    color: '#fff',
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DataScreen;
