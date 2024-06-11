import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddCartList from './AddCartList';
import AddButton from './AddButton';
import {useNavigation} from '@react-navigation/native';
import {globalColor} from '../GlobalStyles';

export default function Filter() {
  const listRef = useRef();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <AddCartList listRef={listRef} />
      </View>
      {/*  <View style={styles.innerView}>
        <AddButton
          title={'Back To Home'}
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  innerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listView: {
    backgroundColor: globalColor.lightWhite,
    flex: 1,
    paddingBottom: '30%',
  },
});
