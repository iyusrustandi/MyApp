// App.js
import React, {useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DataScreen from './screens/DataScreen';
import NewPage from './screens/NewPage';
import HomeScreen from './screens/HomeScreen';
import GoogleSearch from './screens/GoogleSearch';
import HistoryScreen from './screens/HistoryScreen';
import LyricsScreen from './screens/LyricsScreen';
import AboutScreen from './screens/AboutScreen';
import GalleryScreen from './screens/GalleryScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="DataScreen" component={DataScreen} options={{headerShown: false}} />
            <Stack.Screen name="NewPage" component={NewPage} options={{headerShown: false}} />
            <Stack.Screen name="GoogleSearch" component={GoogleSearch} options={{headerShown: false}} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{headerShown: false}} />
            <Stack.Screen name="LyricsScreen" component={LyricsScreen} options={{headerShown: false}} />
            <Stack.Screen name="AboutScreen" component={AboutScreen} options={{headerShown: false}} />
            <Stack.Screen name="GalleryScreen" component={GalleryScreen} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
