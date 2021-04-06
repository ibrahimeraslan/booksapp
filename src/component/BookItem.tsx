import React from 'react';
import {Text, StyleSheet, Pressable, Image} from 'react-native';
import moment from 'moment';
interface IBook {
  id: string;
  volumeInfo: any | null;
}
interface HeaderProps {
  navigation: any;
  item: IBook;
}
const BookItem: React.FC<HeaderProps> = ({navigation, item}) => {
  return (
    <Pressable
      style={Style.item}
      onPress={() =>
        navigation.navigate('BookDetail', {
          id: item.id,
          authors: item.volumeInfo.authors,
          thumbnail: item.volumeInfo.imageLinks.thumbnail,
          title: item.volumeInfo.title,
          subtitle: item.volumeInfo.subtitle,
          description: item.volumeInfo.description,
          publishedDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
        })
      }>
      <Image
        source={{uri: item.volumeInfo.imageLinks.thumbnail}}
        style={Style.banner}
        resizeMode="contain"
      />
      <Text style={Style.title} numberOfLines={1}>
        {item.volumeInfo.title}
      </Text>
      {item.volumeInfo.authors ? (
        item.volumeInfo.authors.map((author: string, index: number) => (
          <Text key={index.toString()} style={Style.author}>
            {author}
          </Text>
        ))
      ) : (
        <Text style={Style.author} numberOfLines={1}>
          Yazar Bilinmiyor
        </Text>
      )}
      {item.volumeInfo.publishedDate && (
        <Text style={Style.date} numberOfLines={1}>
          {moment(item.volumeInfo.publishedDate).format('L')}
        </Text>
      )}
    </Pressable>
  );
};
const Style = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
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
  text: {
    color: '#000',
  },
});
export default BookItem;
