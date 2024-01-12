import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../thema/appColor';
import {Smileys, TextItalic, Ticket2} from 'iconsax-react-native';

const CostumeInputText = ({value, placeHolder, onChangeText}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text style={{alignSelf: 'flex-start', fontSize: 14, fontWeight: '500'}}>
        {placeHolder}
        {placeHolder == 'Description Area' ? (
          <Smileys size={20} color={AppColors.GRAY} />
        ) : (
          <Ticket2 size={20} color={AppColors.GRAY} />
        )}
      </Text>
      <TextInput
        style={{
          color: AppColors.BLACK,
          width: '100%',
          height: 50,
          borderWidth: 0.5,
          borderRadius: 20,
          borderColor: AppColors.GRAY,
          marginVertical: 10,
        }}
        placeHolder={placeHolder}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CostumeInputText;

const styles = StyleSheet.create({});
