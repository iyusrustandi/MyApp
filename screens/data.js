import React, {useState, useEffect, useRef} from 'react';
import {View, ImageBackground, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

import logo from '../assets/logo.png';
import backgroundImg from '../assets/background.png';

const screenWidth = Dimensions.get('window').width;
const logoSize = screenWidth * 0.1;

const DataScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalData, setTotalData] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://iyusrustandi.github.io/jaktourband/data.json');
      // const response = await axios.get('https://jaktourband.com/data.json');
      setData(response.data);
      searchData();
    } catch (error) {
      console.error(error);
    }
  };

  const searchData = () => {
    const filteredData = data.filter((item) => item.artist.toLowerCase().includes(searchQuery.toLowerCase()) || item.song.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(totalData === 'allsongs' ? filteredData : filteredData.slice(0, parseInt(totalData)));

    if (filteredData.length === 0 && searchQuery.trim() !== '') {
      setErrorMessage(
        <TouchableOpacity onPress={() => navigation.navigate('GoogleSearch')}>
          <Text style={styles.trySearchText}>Coba cari disini</Text>
        </TouchableOpacity>
      );
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    searchData();
  }, [searchQuery, totalData]);

  const handleOpenURL = (url) => {
    navigation.navigate('Lyrics', {url});
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  // Fetch data on component mount and then every 1 minute (60000 milliseconds)
  useEffect(() => {
    fetchData();
  }, []);

  useInterval(() => {
    fetchData();
  }, 60000); // Fetch data every 1 minute (60000 milliseconds)

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.heading}>Songlist</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search by artist or song" value={searchQuery} onChangeText={(text) => setSearchQuery(text)} onSubmitEditing={searchData} />
          <Picker style={styles.dropdown} selectedValue={totalData} onValueChange={(value) => setTotalData(value)}>
            <Picker.Item label="10" value="10" />
            <Picker.Item label="25" value="25" />
            <Picker.Item label="50" value="50" />
            <Picker.Item label="100" value="100" />
          </Picker>
        </View>
        {errorMessage ? <View>{errorMessage}</View> : null}
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Artis</Text>
            <Text style={styles.cell}>Song</Text>
            <Text style={styles.cell}>Lyrics</Text>
            <Text style={styles.cell}>Youtube</Text>
          </View>
          {data.map((item) => (
            <View style={styles.row} key={item.song}>
              <Text style={styles.cell}>{item.artist}</Text>
              <Text style={styles.cell}>{item.song}</Text>
              <TouchableOpacity style={[styles.cell, styles.lyricButtonContainer]} onPress={() => navigation.navigate('NewPage', {lyrics: item.lyrics})}>
                <Text style={styles.buttonText}>Lyrics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.cell, styles.youtubeButtonContainer]} onPress={() => navigation.navigate('YouTube', {youtube: item.youtube})}>
                <Text style={styles.buttonText}>YouTube</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text style={styles.totalText}>Total Song: {data.length}</Text>
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
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 89,
    height: 35,
    marginRight: 8,
    paddingHorizontal: 50,
  },
  heading: {
    fontSize: screenWidth * 0.07,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  table: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '70%',
    backgroundColor: '#fff',
  },
  dropdown: {
    flex: 1,
    height: 20,
    marginBottom: 16,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    width: '30%',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: '#fff',
  },
  trySearchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
});

export default DataScreen;
