import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../GlobalStyles';

export default function PrimaryButton({children, onLongPress, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({pressed}) =>
        pressed ? GlobalStyles.pressable : GlobalStyles.buttonView
      }>
      <Text style={GlobalStyles.buttonStyles}>{children}</Text>
    </Pressable>
  );
}
