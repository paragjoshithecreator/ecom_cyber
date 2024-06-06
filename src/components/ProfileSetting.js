import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { globalColor } from '../GlobalStyles';

export default function ProfileSetting({label, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('../assets/img/profile.png')}
        />
        <Text style={styles.settingText}>{label}</Text>
      </View>
      <Image
        style={styles.image}
        source={require('../assets/img/right_arrow.png')}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  imageView: {flexDirection: 'row'},
  image: {width: 24, height: 24, borderRadius: 20},
  settingText: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '400',
    color: globalColor.black,
  },
  arrow: {
    width: 24,
    height: 24,
  },
});
