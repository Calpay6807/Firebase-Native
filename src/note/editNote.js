import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CostumeButton from '../components/ui/costumeButton';
import CostumeInputText from '../components/ui/textInput';
import firestore from '@react-native-firebase/firestore';
import {NOTELİST} from '../utils/routes';
import {useNavigation} from '@react-navigation/native';

const EditNote = ({route}) => {
  const {item} = route?.params;
  const [title, setTitle] = useState(item.title);
  const [descriptions, setDescription] = useState(item?.descriptions);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSaveNote = () => {
    setLoading(true);
    const form = {
      title: title,
      descriptions: descriptions,
      region: item?.region,
    };
    firestore()
      .collection('Notes')
      .doc(item?.id)
      .update(form)
      .then(() => {
        Alert.alert('Başarılı', 'Not Başarılı Bir Şekilde değişti,.', [
          {
            text: 'Tamam',
            onPress: () => navigation.navigate(NOTELİST),
            style: 'cancel',
          },
        ]);
      })
      .catch(eror => {
        console.log(eror);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View>
      <CostumeInputText
        placeHolder={'Tittle Area'}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <CostumeInputText
        placeHolder={'Description Area'}
        value={descriptions}
        onChangeText={text => setDescription(text)}
      />
      <CostumeButton
        loading={loading}
        disabled={!title || !descriptions}
        title={'Onayla'}
        onPress={handleSaveNote}
      />
    </View>
  );
};

export default EditNote;

const styles = StyleSheet.create({});
