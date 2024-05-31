import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import ModalCom from './ModalCom';
import {strings} from '../language';
import React, {useEffect, useState} from 'react';
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
  const [remove, setRemove] = useState(false);

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

  const {productPrice, modalHeading, modalMetaData} = strings;
  const modalImage = require('../assets/img/delete.png');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <FlatList
          numColumns={2}
          data={userFav}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.spaceSection} onPress={() => {}}>
              <View style={styles.listView}>
                <TouchableOpacity
                  onPress={
                    () => {
                      setRemove(true);
                    } /* removeFromFav(item.itemId) */
                  }>
                  <Image
                    style={styles.image}
                    source={require('../assets/img/delete.png')}
                  />
                </TouchableOpacity>
                <View style={styles.imageView}>
                  <Image style={styles.imageTow} source={{uri: item.image}} />
                </View>
                <Text style={styles.heading}>{item.itemName}</Text>
                <Text style={styles.rateList} numberOfLines={1}>
                  {item.itemdescription}
                </Text>
                <Text style={[styles.rateList, {color: 'green'}]}>
                  {productPrice} {item.itemPrice}
                </Text>
                <Text style={{color: '#000'}}>{item._id}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.itemId}
        />
      </View>
      <ModalCom
        onPressYes={() => {
          setRemove(false);
        }}
        onPressNo={() => {
          setRemove(false);
        }}
        title={modalHeading}
        metaData={modalMetaData}
        image={modalImage}
        visible={remove}
        animationType="slide"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heading: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
  },
  innerContainer: {
    paddingBottom: '2%',
  },
  listView: {
    borderRadius: 10,
    width: 185,
    // height: 200,
    backgroundColor: '#fff',
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
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  rateList: {
    fontSize: 12,
    color: '#000',
    marginVertical: 5,
    marginLeft: 10,
  },
});
