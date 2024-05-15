import {View, Text, ImageBackground, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ShopButton from './ShopButton';
import {salData} from '../DummyData';

export default function TrendingList() {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={salData}
        renderItem={({item}) => (
          <View style={styles.container}>
            <ImageBackground
              source={require('../assets/img/bgShope.jpeg')}
              style={styles.list}>
              <View style={styles.innerView}>
                <Text style={styles.text}>{item.collection}</Text>
                <Text style={styles.textItme}>{item.item}</Text>
                <Text style={styles.textOffer}>{item.discription}</Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
                <ShopButton>SHOP NOW</ShopButton>
              </View>
            </ImageBackground>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '50%',
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    marginHorizontal: 5,
    height: 250,
  },
  listView: {marginHorizontal: 10},
  list: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  text: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
  },
  textItme: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
  },
  textOffer: {
    color: 'red',
    fontSize: 14,
    fontWeight: '400',
  },
  innerView: {
    marginHorizontal: 10,
    marginBottom: 50,
  },
});
