import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function CatListSection({
  numColumns,
  title,
  horizontal,
  margin,
  categoryData,
}) {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: 10,
        }}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line}></View>
      </View>
      <FlatList
        horizontal={horizontal}
        numColumns={numColumns}
        data={categoryData}
        renderItem={({item}) => (
          <View style={styles.listView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Explore', {
                  productId: item.name,
                });
              }}
              style={styles.productView}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: 80,
                  height: 80,
                  marginHorizontal: 7,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontWeight: '700',
    marginLeft: 10,
  },
  line: {
    backgroundColor: 'silver',
    width: '100%',
    height: 1,
  },
  listView: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  productView: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  itemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});
