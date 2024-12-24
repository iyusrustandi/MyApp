import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = ({route}) => {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    const fetchHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('history');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        setHistory(parsedHistory);
      }
    };

    fetchHistory();
  }, []);

  const saveHistory = async (newHistoryItem) => {
    const updatedHistory = [...history, newHistoryItem];
    setHistory(updatedHistory);
    await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  const {history: historyFromParams} = route.params || [];
  React.useEffect(() => {
    if (historyFromParams.length > 0) {
      saveHistory(historyFromParams);
    }
  }, [historyFromParams]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>History</Text>
      <FlatList data={history} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => <Text style={styles.historyItem}>{item}</Text>} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  historyItem: {
    fontSize: 16,
  },
});

export default History;
