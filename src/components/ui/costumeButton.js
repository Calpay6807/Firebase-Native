import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppColors} from '../../thema/appColor';

const CostumeButton = props => {
  const {title, disabled, loading} = props;
  return (
    <TouchableOpacity
      {...props}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            {
              color: AppColors.WHITE,
              fontSize: 16,
              fontWeight: '500',
              padding: 10,
              borderRadius: 10,
            },
            {backgroundColor: disabled ? AppColors.GRAY : AppColors.GREEN},
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CostumeButton;

const styles = StyleSheet.create({});
