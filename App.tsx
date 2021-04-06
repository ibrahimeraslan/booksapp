import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Home from './src/page/Home';
import Search from './src/page/Search';
import Favorite from './src/page/Favorite';
import BookDetail from './src/page/BookDetail';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#999',
        labelStyle: {fontSize: 13},
        tabStyle: {
          paddingVertical: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Kitaplar',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Ara',
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favoriler',
          tabBarIcon: ({color}) => <Icon name="star" color={color} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Tabs">
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
