import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {Component, useState} from 'react';
import CostumeInputText from '../components/ui/textInput';
import CostumeButton from '../components/ui/costumeButton';
import firestore from '@react-native-firebase/firestore';
import {HOME} from '../utils/routes';
import {useNavigation} from '@react-navigation/native';

const AddNote = ({route}) => {
  const {cordinate} = route?.params;
  const [title, setTitle] = useState(null);
  const [descriptions, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  console.log(title);

  const handeSaveNote = () => {
    setLoading(true);
    const form = {
      title: title,
      descriptions: descriptions,
      region: cordinate,
    };

    firestore()
      .collection('Notes')
      .add(form)
      .then(() => {
        Alert.alert('Başarılı', 'Not Başarılı Bir Şekilde eklendi.', [
          {
            text: 'Tamam',
            onPress: () => navigation.navigate(HOME),
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
        title={'Kaydet'}
        onPress={handeSaveNote}
      />
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({});
