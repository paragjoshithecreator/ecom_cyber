import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddCartList from './AddCartList';
import AddButton from './AddButton';
import SearchBar from './SearchBar';
import {Image} from 'react-native';

export default function Filter({id}) {
  
  const listRef = useRef();

  /*  useEffect(() => {
    setData(FavItemList);
  }, []);
 */
  const onSearch = text => {
    if (product == '') {
      setData(FavItemList);
    } else {
      let tempList = data.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <AddCartList id={id} listRef={listRef} />
      </View>
      <View style={styles.innerView}>
        <AddButton>Proceed to Buy</AddButton>
      </View>

     
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
    // alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listView: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
