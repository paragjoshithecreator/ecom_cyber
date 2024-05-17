import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function AddButton({title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 35,
    marginLeft: 10,
    backgroundColor: '#EFD81B',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },
});
