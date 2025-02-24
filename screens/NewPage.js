import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../components/Header';

const NewPage = ({route}) => {
  const {url} = route.params;
  const webViewRef = useRef(null);

  return (
    <View style={styles.container}>
      <Header title="Jaktourband" />
      <WebView ref={webViewRef} source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewPage;
