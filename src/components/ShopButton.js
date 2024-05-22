import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {globalColor} from '../GlobalStyles';

export default function ShopButton({title, backgroundColor, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    color: globalColor.white,
    fontWeight: '600',
    fontSize: 12,
  },
});
