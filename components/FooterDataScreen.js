import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

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
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: '#050A30',
    marginHorizontal: width * 0.05,
  },
  button: {
    backgroundColor: '#050A30',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: width * 0.03,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FooterDataScreen;
