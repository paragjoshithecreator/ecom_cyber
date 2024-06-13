import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {GlobalStyles, globalColor} from '../GlobalStyles';

export default function Notification() {
  const NotifyList = [
    {id: 1, title: 'Deal of the day'},
    {id: 2, title: 'Hot Deals'},
    {id: 3, title: 'Best Sellers'},
    {id: 4, title: 'New Items'},
    {id: 5, title: 'New Items'},
    {id: 6, title: 'New Items'},
  ];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={NotifyList}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}>
            <View style={styles.list}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 20,
    paddingHorizontal: 5,
  },
  list: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  itemText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});
