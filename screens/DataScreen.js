import React, {useState, useEffect, useRef} from 'react';
import {View, ImageBackground, FlatList, Dimensions, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import Header from '../components/HeaderDataScreen';
import SearchBar from '../components/SearchBar';
import SongItem from '../components/SongItem';
import Menu from '../components/Menu';
import backgroundImg from '../assets/background.png';

const screenWidth = Dimensions.get('window').width;

const DataScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalData, setTotalData] = useState(25);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jaktourband.vercel.app/api/data.json');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchData();
  }, [searchQuery, totalData]);

  const searchData = () => {
    const filteredData = data.filter((item) => item.artist.toLowerCase().includes(searchQuery.toLowerCase()) || item.song.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(totalData === 'allsongs' ? filteredData : filteredData.slice(0, parseInt(totalData)));
    setErrorMessage(filteredData.length === 0 && searchQuery.trim() !== '' ? 'No results found' : '');
  };

  const renderItem = ({item}) => <SongItem artist={item.artist} song={item.song} lyricsUrl={item.lyrics} youtubeUrl={item.youtube} navigation={navigation} />;

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
        {isMenuOpen && <Menu onHistoryPress={() => navigation.navigate('History')} />}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} totalData={totalData} setTotalData={setTotalData} />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <FlatList data={searchQuery !== '' ? searchResults : data.slice(0, parseInt(totalData))} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        <View style={styles.totalTextBackground}>
          <Text style={styles.totalText}>Total Song: {data.length}</Text>
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
  },
  totalTextBackground: {
    padding: 8,
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#050A30',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 10,
  },
});

export default DataScreen;
