import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Spinner = () => {
  return (
    <View style={Style.container}>
      <LottieView
        source={require('../file/loader.json')}
        autoPlay
        loop
        style={{width: wp('50%'), height: wp('50%')}}
      />
    </View>
  );
};
const Style = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
export default Spinner;
