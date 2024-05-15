import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AddToCartButton from '../screens/AddToCartButton';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function FavWishList() {
  const route = useRoute();
  const [userFav, setUserFav] = useState([]);

  const userFavHandler = async () => {
    const favItemDetails = await AsyncStorage.getItem('favItemDetails');
    const itemData = JSON.parse(favItemDetails);

    if (itemData) {
      setUserFav(itemData);
      
      console.log('IN IF', itemData);
    }
  };

  useEffect(() => {
    userFavHandler();
  }, []);

  const addToFav = async item => {
    // Update state
    setUserFav(prevState => [...prevState, item]);
    // Save to AsyncStorage
    await AsyncStorage.setItem(
      'favItemDetails',
      JSON.stringify([...userFav, item]),
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <FlatList
          numColumns={2}
          data={userFav}
          renderItem={({item}) => (
            <View style={styles.spaceSection}>
              <View style={styles.listView}>
                <TouchableOpacity
                  onPress={() => {} /* removeFromFav(item.itemId) */}>
                  <Image
                    style={styles.image}
                    source={require('../assets/img/delete.png')}
                  />
                </TouchableOpacity>
                <View style={styles.imageView}>
                  <Image style={styles.imageTow} source={{uri: item.image}} />
                </View>
              </View>
              <Text style={styles.heading}>{item.itemName}</Text>
              <View style={styles.ratingView}>
                <Text style={styles.rateList}>{item.itemPrice}</Text>
                <Text style={styles.rateList}>{item.itemPrice}</Text>
              </View>
              <View style={styles.rateView}>
                <Text style={styles.heading}>{item.rate}</Text>
                <Text style={styles.lessText}>{item.less}</Text>
                <Text style={styles.offText}>{item.off}</Text>
              </View>
              <View style={styles.innerView}>
                <AddToCartButton onPress={addToFav} price={item.price} />
              </View>
            </View>
          )}
          keyExtractor={item => item.itemId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heading: {
    color: '#000',
  },
  innerContainer: {
    paddingBottom: '2%',
  },
  listView: {
    borderRadius: 10,
    width: 185,
    height: 200,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: '2%',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceSection: {marginVertical: 8},
  image: {
    alignSelf: 'flex-end',
    tintColor: 'red',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTow: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});
