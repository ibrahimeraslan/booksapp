import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
interface HeaderProps {
  title: string;
}
const HeaderWithText: React.FC<HeaderProps> = ({title}) => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle="light-content"
      />
      <View style={Style.container}>
        <Text style={Style.text}>{title}</Text>
      </View>
    </>
  );
};
const Style = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
export default HeaderWithText;
