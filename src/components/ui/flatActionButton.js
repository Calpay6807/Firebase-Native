import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Additem} from 'iconsax-react-native';
import {AppColors} from '../../thema/appColor';
import {ADDNOTE, EDİTNOTE, SELECETCORDİNATE} from '../../utils/routes';
const {width, height} = Dimensions.get('window');

const FlatActionButton = props => {
  const {navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SELECETCORDİNATE)}
      style={{
        width: width * 0.18,
        height: height * 0.08,
        backgroundColor: AppColors.BEJ,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        position: 'absolute',
        bottom: 30,
        right: 10,
      }}>
      <Additem size={40} color={AppColors.BLACK} />
    </TouchableOpacity>
  );
};

export default FlatActionButton;

const styles = StyleSheet.create({});
