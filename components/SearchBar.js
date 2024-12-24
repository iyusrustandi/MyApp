import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SearchBar = ({searchQuery, setSearchQuery, totalData, setTotalData}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput style={styles.searchInput} placeholder="Search by artist or song" value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
      <Picker style={styles.dropdown} selectedValue={totalData} onValueChange={(value) => setTotalData(value)}>
        <Picker.Item label="25" value="25" />
        <Picker.Item label="50" value="50" />
        <Picker.Item label="150" value="150" />
        <Picker.Item label="All Songs" value="allsongs" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  searchInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  dropdown: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#fff',
  },
});

export default SearchBar;
