import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CostumeButton from '../components/ui/costumeButton';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {EDİTNOTE} from '../utils/routes';

const NoteDetail = ({route}) => {
  const {item} = route?.params;
  const navigation = useNavigation();
  const handleDelete = () => {
    firestore()
      .collection('Notes')
      .doc(item?.id)
      .delete()
      .then(() => {
        Alert.alert('Başarılı', 'Not Başarılı Bir Şekilde Silindi.', [
          {
            text: 'Tamam',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ]);
      })
      .catch(eror => {
        Alert.alert('Başarısız', 'Not Silme Başarısız.');
      });
  };

  return (
    <SafeAreaView style={{flex: 1, margin: 5}}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{flex: 1}}>
            <Text>ID</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text>{item.id}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 0.5,
            borderTopColor: 'gray',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text>Title</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text>{item.title}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 0.5,
            borderTopColor: 'gray',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text>Description</Text>
          </View>
          <View style={{flex: 4, alignItems: 'flex-end'}}>
            <Text>{item.descriptions}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            flex: 1,
          }}>
          <CostumeButton
            onPress={() => navigation.navigate(EDİTNOTE, {item: item})}
            title="Düzenle"
          />
          <CostumeButton onPress={handleDelete} title="Sil" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({});
