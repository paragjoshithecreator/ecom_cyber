import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddCartList from '../components/AddCartList';
import AddButton from '../components/AddButton';
import {FavItemList} from '../DummyData';
import Filter from '../components/Filter';
import {useRoute} from '@react-navigation/native';
import {globalColor} from '../GlobalStyles';

export default function Explore() {
  const route = useRoute();
  const id = route.params ? route.params.productId : 'No Product selected Yet';

  return (
    <View style={styles.container}>
      <Filter />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    marginTop: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: globalColor.black,
    backgroundColor: globalColor.white,
  },
});
