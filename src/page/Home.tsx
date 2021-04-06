import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/tr';
moment.locale('tr');
import HeaderWithText from '../component/HeaderWithText';
import Spinner from '../component/Spinner';
import BookItem from '../component/BookItem';
interface IBook {
  id: string;
  volumeInfo: any | null;
}
interface IHomeProps {
  navigation: any;
}
const Home = ({navigation}: IHomeProps) => {
  const [spinner, setSpinner] = useState<boolean>(true);
  const [bookList, setBookList] = useState<IBook[]>([]);
  const getBooks = async () => {
    const {data} = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=peyami&maxResults=40&filter=ebooks&printType=all&key=AIzaSyCM3ixDdehH-VejHk07m7TyzfUniTObgu0',
    );
    setBookList(data.items);
    setSpinner(false);
  };
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <SafeAreaView style={Style.container}>
      <HeaderWithText title={'Kitap Listesi'} />
      {spinner && <Spinner />}
      {bookList.length ? (
        <FlatList
          data={bookList}
          renderItem={({item}) => (
            <BookItem navigation={navigation} item={item} />
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

export default Home;
