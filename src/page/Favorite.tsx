import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';
import 'moment/locale/tr';
moment.locale('tr');
import HeaderWithBackAndText from '../component/HeaderWithBackAndText';
import BookItemFavorite from '../component/BookItemFavorite';
import Spinner from '../component/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface IFavoriteItem {
  id: string;
  authors: string[];
  thumbnail: string | undefined;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  publishedDate: string | null;
  pageCount: number | null | string;
}
interface IFavoriteProps {
  navigation: any;
}
const Favorite = ({navigation}: IFavoriteProps) => {
  const [spinner, setSpinner] = useState<boolean>(true);
  const [favoriteList, setFavoriteList] = useState<IFavoriteItem[]>([]);
  const getFavoriteBooks = async () => {
    try {
      const bookData: string | null = await AsyncStorage.getItem(
        'FavoriteList',
      );
      if (bookData) {
        setFavoriteList(JSON.parse(bookData));
      }
    } catch (e) {
      setFavoriteList([]);
    }
    setSpinner(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavoriteBooks();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={Style.container}>
      <HeaderWithBackAndText
        navigation={navigation}
        title={'Favori Kitaplarım'}
      />
      {spinner && <Spinner />}
      {favoriteList.length ? (
        <FlatList
          data={favoriteList}
          renderItem={({item}) => (
            <BookItemFavorite navigation={navigation} item={item} />
          )}
          numColumns={2}
          horizontal={false}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={Style.notFound}>Kayıt Bulunamadı</Text>
      )}
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  notFound: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 15,
  },
});

export default Favorite;
