import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/tr';
moment.locale('tr');
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import HeaderWithBackAndText from '../component/HeaderWithBackAndText';
interface IPropParams {
  id: string | null;
  authors: string[];
  thumbnail: string | undefined;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  publishedDate: string | null;
  pageCount: number | null | string;
}
interface IDetailProp {
  navigation: any;
  route: {
    params: IPropParams;
  };
}
const addMyFavorite = async (propData: IPropParams) => {
  try {
    let favoriteData: string | null = await AsyncStorage.getItem(
      'FavoriteList',
    );
    let newList: object | any = [];
    if (favoriteData) {
      newList = JSON.parse(favoriteData);
    }
    let controlFavorite = newList.find((c: any) => c.id === propData.id);
    if (controlFavorite) {
      newList = newList.filter((c: any) => c.id !== propData.id);
      Alert.alert(
        'Bilgilendirme',
        'Kitap favorilerinizden başarıyla çıkarıldı.',
        [
          {
            text: 'Tamam',
            onPress: () =>
              AsyncStorage.setItem('FavoriteList', JSON.stringify(newList)),
          },
        ],
        {
          cancelable: false,
        },
      );
    } else {
      newList.push(propData);
      Alert.alert(
        'Bilgilendirme',
        'Kitap başarıyla favorilerinize eklendi.',
        [
          {
            text: 'Tamam',
            onPress: () =>
              AsyncStorage.setItem('FavoriteList', JSON.stringify(newList)),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  } catch (e) {
    Alert.alert(
      'Bilgilendirme',
      'Kitap favorilerinize eklenemedi. Lütfen tekrar deneyin.',
      [{text: 'Tamam', onPress: () => null}],
      {cancelable: false},
    );
  }
};
const BookDetail = ({navigation, route}: IDetailProp) => {
  const params: IPropParams = route.params;
  console.log(params);
  return (
    <SafeAreaView style={Style.container}>
      <HeaderWithBackAndText navigation={navigation} title={'Kitap Detayı'} />
      <ScrollView contentContainerStyle={Style.startPage}>
        <Image
          source={{uri: params.thumbnail}}
          style={Style.bookImage}
          resizeMode="contain"
        />
        <Text style={Style.title}>{params.title}</Text>
        <Text style={Style.subTitle}>
          {params.subtitle || 'Alt Başlık Bulunamadı'}
        </Text>
        {params.authors ? (
          params.authors.map((author: string, index: number) => (
            <Text key={index.toString()} style={Style.author}>
              {author}
            </Text>
          ))
        ) : (
          <Text style={Style.author} numberOfLines={1}>
            Yazar Bilinmiyor
          </Text>
        )}
        {params.pageCount && <Text>Sayfa Sayısı: {params.pageCount}</Text>}
        {params.publishedDate && (
          <Text style={Style.date}>
            {moment(params.publishedDate).format('L')}
          </Text>
        )}
        <View style={Style.buttonView}>
          <Button
            title="Favorilerime Ekle"
            onPress={() => addMyFavorite(params)}
          />
        </View>
        <Text style={Style.text}>{params.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const Style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  startPage: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {width: wp('60%'), height: wp('60%')},
  title: {
    color: '#000',
    fontSize: 16,
  },
  subTitle: {
    fontSize: 14,
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
  buttonView: {
    marginVertical: 5,
  },
  text: {
    color: '#000',
  },
});
export default BookDetail;
