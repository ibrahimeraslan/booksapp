import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  View,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/tr';
moment.locale('tr');
import HeaderWithBackAndText from '../component/HeaderWithBackAndText';
import Spinner from '../component/Spinner';
import BookItem from '../component/BookItem';
interface ISearchItem {
  id: string;
  volumeInfo: any | null;
}
interface ISearchProps {
  navigation: any;
}
const Search = ({navigation}: ISearchProps) => {
  const [spinner, setSpinner] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [bookList, setBookList] = useState<ISearchItem[]>([]);
  const getBooks = async (searchKey: string) => {
    Keyboard.dismiss();
    setSpinner(true);
    try {
      const {data} = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          searchKey +
          '&maxResults=40&filter=ebooks&printType=all&key=AIzaSyCM3ixDdehH-VejHk07m7TyzfUniTObgu0',
      );
      setBookList(data.totalItems ? data.items : []);
    } catch (e) {
      setBookList([]);
    }
    setSpinner(false);
  };
  return (
    <SafeAreaView style={Style.container}>
      <HeaderWithBackAndText navigation={navigation} title={'Kitap Ara'} />
      {spinner && <Spinner />}
      <View style={Style.searchPanel}>
        <TextInput
          autoFocus={true}
          placeholder={'Kitap Adını Yazın'}
          onChangeText={text => setSearchText(text)}
          style={Style.input}
        />
        <Button title={'🔍\nAra'} onPress={() => getBooks(searchText)} />
      </View>
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
  banner: {
    width: 200,
    height: 100,
  },
  title: {
    color: '#000',
    fontSize: 16,
  },
  author: {
    color: '#999',
    fontSize: 15,
    flexDirection: 'column',
  },
  date: {
    color: '#ccc',
    fontSize: 14,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  text: {
    color: '#000',
  },
  notFound: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 15,
  },
  input: {
    borderWidth: 0.5,
    marginRight: 10,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 3,
  },
  searchPanel: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'center',
  },
});

export default Search;
