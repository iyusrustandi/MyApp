import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const FooterDataScreen = ({handlePrevious, handleNext, totalSongs}) => {
  return (
    <View style={styles.totalContainer}>
      <TouchableOpacity style={styles.button} onPress={handlePrevious}>
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.totalText}>Total Song: {totalSongs}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#050A30',
  },
  button: {
    backgroundColor: '#050A30',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FooterDataScreen;
