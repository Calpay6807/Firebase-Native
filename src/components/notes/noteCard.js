import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../thema/appColor';
import {SmsEdit} from 'iconsax-react-native';
import {EDİTNOTE, NOTEDETAİL} from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';

export default function NoteCard({item}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        minHeight: 100,
        margin: 10,
        backgroundColor: AppColors.NOTE,
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
      }}>
      <Pressable
        onPress={() => navigation.navigate(NOTEDETAİL, {item: item})}
        style={{flex: 5}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>{item.title}</Text>
        <Text>{item.descrption}</Text>
        <Text
          style={{
            marginVertical: 10,
            color: AppColors.DATE,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          {item.date}
        </Text>
      </Pressable>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Pressable onPress={() => navigation.navigate(EDİTNOTE, {item})}>
          <SmsEdit color={AppColors.BLACK} size={30} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
