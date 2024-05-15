import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {ItemData} from '../DummyData';

export default function FreeShopView() {
  return (
    <View style={styles.root}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={ItemData}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.container}>
            <View style={styles.list}>
              <Image style={styles.image} source={item.image} />

              <View style={styles.listView}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.discription}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 5,
  },
  container: {
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  listView: {marginHorizontal: 10},
  list: {
    flexDirection: 'row',
    margin: 1,
    backgroundColor: '#36454f',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  text: {
    fontSize: 12,
    color: '#ffffff',
  },
});
