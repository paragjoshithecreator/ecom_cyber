import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function ShopButton({children}) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.button}>{children}</Text>
      {/* <Image
        style={{marginLeft: 5, width: 20, height: 10}}
        source={require('../assets/img/right_arrow.png')}
      /> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
    // marginTop: 30,
    // marginBottom: 10,
    flexDirection: 'row',
    // paddingHorizontal: 10,
  },
  button: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 12,
  },
});
