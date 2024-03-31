/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, BackHandler, Alert, Image, View, Animated, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview';
import { Text } from 'react-native';

const App = () => {
  const [showWebView, setShowWebView] = useState(false);
  const fadeInAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {

    const backAction = () => {
      Alert.alert('Ticket Lagbe', 'Are you sure you want to close the app?', [
        { text: 'YES', onPress: () => BackHandler.exitApp() },
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    setTimeout(() => {
      setShowWebView(true);
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => {
      backHandler.remove();
    };
  }, [showWebView]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#292664', '#292664', '#292664']} style={styles.linearGradient}>
        {showWebView ? (
          <Animated.View style={[styles.webviewContainer,{ opacity: fadeInAnim }]}>
            <WebView
              source={{ uri: 'https://b2bt.tripfindy.com/'}}
              style={styles.webview}
            />
          </Animated.View>
        ) : (
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require('./src/assets/glow.png')}
              style={styles.imageBackground}>
              <View style={styles.imageContent}>
                <Image
                  source={require('./src/assets/logo.png')}
                  style={styles.image}
                />
                <Text style={styles.text}>Ticket Lagbe Ltd.</Text>
              </View>
            </ImageBackground>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    alignItems: 'center',
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    marginTop: -20,
  },
});

export default App;
