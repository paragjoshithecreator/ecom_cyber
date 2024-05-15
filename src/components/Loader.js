import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

export default function Loader({size, color, animating}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} animating={animating} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
