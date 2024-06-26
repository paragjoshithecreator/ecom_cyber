import {View, TextInput} from 'react-native';
import React from 'react';
import {GlobalStyles, globalColor} from '../GlobalStyles';

export default function Input({
  placeholder,
  onChangeText,
  value,
  cursorColor,
  secureTextEntry,
  onBlur,
  keyboardType,
  maxLength,
}) {
  return (
    <View style={GlobalStyles.inputView}>
      <TextInput
        style={GlobalStyles.inputColor}
        placeholder={placeholder}
        cursorColor={cursorColor}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={'#cccccc'}
        autoCapitalize="none"
        maxLength={maxLength}
      />
    </View>
  );
}
