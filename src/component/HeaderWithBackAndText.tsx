import React from 'react';
import {View, Text, StatusBar, StyleSheet, Pressable} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
interface HeaderProps {
  navigation: any;
  title: string;
}
const HeaderWithBackAndText: React.FC<HeaderProps> = ({navigation, title}) => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle="light-content"
      />
      <View style={Style.container}>
        <Pressable onPress={() => navigation.goBack()} style={Style.backBtn}>
          <Icon name="chevron-left" style={Style.backBtnIcon} />
        </Pressable>
        <Text style={Style.text}>{title}</Text>
      </View>
    </>
  );
};
const Style = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  backBtn: {},
  backBtnIcon: {
    color: '#fff',
    fontSize: 20,
    padding: 15,
  },
});
export default HeaderWithBackAndText;
