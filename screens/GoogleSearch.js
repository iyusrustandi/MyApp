import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import Header from '../components/Header';

const GoogleSearch = () => {
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com/webhp');
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  const handleNavigationStateChange = (navState) => {
    setCurrentUrl(navState.url);
  };

  const goBack = () => {
    if (webViewRef.current && currentUrl !== 'https://www.google.com/webhp') {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Jaktourband" onBack={goBack} />
      <WebView ref={webViewRef} source={{uri: currentUrl}} style={{flex: 1}} onNavigationStateChange={handleNavigationStateChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GoogleSearch;
