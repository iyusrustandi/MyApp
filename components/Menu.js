import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Menu = ({onHistoryPress}) => (
  <View style={styles.menuContainer}>
    <TouchableOpacity onPress={onHistoryPress}>
      <Text style={styles.menuItem}>History</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 65,
    right: 0,
    backgroundColor: '#0F0F',
    padding: 25,
    borderRadius: 8,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
});

export default Menu;
