import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const CostumeAnimation = () => {
  return (
    <View style={{width: 100, height: 100}}>
      <LottieView
        source={require('../../assets/animations/geo.json')}
        autoPlay
        loop
        style={{width: 100, height: 85}}
      />
    </View>
  );
};

export default CostumeAnimation;

const styles = StyleSheet.create({});
