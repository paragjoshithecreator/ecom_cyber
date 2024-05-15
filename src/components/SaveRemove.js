import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function SaveRemove({image, children, color, text, brcolor}) {
  return (
    <TouchableOpacity style={[styles.container, brcolor]}>
      <Image style={[styles.image, {tintColor: color}]} source={image} />
      <Text style={[styles.text, {color: color}]}>{children}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  text: {
    fontSize: 12,
  },
});
