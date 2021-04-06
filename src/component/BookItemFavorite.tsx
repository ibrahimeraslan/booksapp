import React from 'react';
import {Text, StyleSheet, Pressable, Image} from 'react-native';
import moment from 'moment';
interface IBook {
  id: string;
  authors: string[];
  thumbnail: string | undefined;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  publishedDate: string | null;
  pageCount: number | null | string;
}
interface HeaderProps {
  navigation: any;
  item: IBook;
}
const BookItemFavorite: React.FC<HeaderProps> = ({navigation, item}) => {
  return (
    <Pressable
      style={Style.item}
      onPress={() =>
        navigation.navigate('BookDetail', {
          id: item.id,
          authors: item.authors,
          thumbnail: item.thumbnail,
          title: item.title,
          subtitle: item.subtitle,
          description: item.description,
          publishedDate: item.publishedDate,
          pageCount: item.pageCount,
        })
      }>
      <Image
        source={{uri: item.thumbnail}}
        style={Style.banner}
        resizeMode="contain"
      />
      <Text style={Style.title} numberOfLines={1}>
        {item.title}
      </Text>
      {item.authors ? (
        item.authors.map((author: string, index: number) => (
          <Text key={index.toString()} style={Style.author}>
            {author}
          </Text>
        ))
      ) : (
        <Text style={Style.author} numberOfLines={1}>
          Yazar Bilinmiyor
        </Text>
      )}
      {item.publishedDate && (
        <Text style={Style.date} numberOfLines={1}>
          {moment(item.publishedDate).format('L')}
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
export default BookItemFavorite;
