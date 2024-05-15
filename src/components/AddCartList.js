import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import SearchBar from './SearchBar';
import Loader from './Loader';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default function AddCartList({listRef, id}) {
  useEffect(() => {
    products();
  }, [id, product]);

  const [productsData, setProductData] = useState([]);
  const [product, setProduct] = useState('');
  const navigation = useNavigation();
  const [isModelVisible, setIsModelVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);

  const [ind, setind] = useState(0);
  const products = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://e-com-cyber.onrender.com/product/getallproduct',
      );

      const result = response.data.productData;

      const selectedProduct = id.toLowerCase();

      const final = result.filter(item => item.category === selectedProduct);
      setProductData(final);
      setUserData(final);
      setData(final);
      setLoading(false);

      // Handle success
    } catch (error) {
      console.error('Product:', error);
      // Handle error
    }
  };

  const onSearch = text => {
    if (product == '') {
      setData(userData);
    } else {
      let tempList = userData.filter(item => {
        return item.name.toLowerCase().includes(text.toLowerCase());
      });

      setData(tempList);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? <Loader size="large" animating={loading} /> : null}
      <View>
        {loading ? null : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <SearchBar
                onPress={() => {
                  setProduct('');
                  setData(productsData);
                }}
                image={require('../assets/img/delete.png')}
                placeholder="search"
                onChangeText={txt => {
                  setProduct(txt);
                  onSearch(txt);
                }}
                value={product}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsModelVisible(true);
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../assets/img/filter.png')}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              ref={listRef}
              initialScrollIndex={ind}
              data={data}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ProductDetail', {
                        itemId: item._id,
                      });
                    }}
                    style={styles.listContainer}>
                    <View style={styles.listView}>
                      <View style={styles.imageView}>
                        <Image
                          style={styles.imageTow}
                          source={{uri: item.image}}
                        />
                      </View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={styles.heading}>{item.name}</Text>
                      <View style={styles.ratingView}>
                        <Text style={styles.rateList}>{item.ratings}</Text>
                        <Text style={styles.rateList}>{item.ratingNumber}</Text>
                      </View>
                      <View style={styles.rateView}>
                        <Text style={styles.heading}>{item.price}</Text>
                        <Text style={styles.lessText}>{item.less}</Text>
                        <Text style={styles.offText}>{item.off}</Text>
                      </View>
                      <Text style={styles.available}>
                        ⬅️ 14 Days return available
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/*  <View style={styles.innerView}>
                <AddToCartButton />
                <SaveRemove
                  color="gray"
                  brcolor="gray"
                  image={require('../assets/img/save.png')}>
                  Save for later
                </SaveRemove>
                <SaveRemove
                  color="red"
                  brcolor="red"
                  image={require('../assets/img/delete.png')}>
                  Remove
                </SaveRemove>
              </View> */}
                </View>
              )}
              keyExtractor={item => item._id}
            />
          </View>
        )}
      </View>
      <View>
        <Modal
          style={{
            justifyContent: 'center',
          }}
          transparent
          visible={isModelVisible}
          onRequestClose={() => setIsModelVisible(false)}
          animationType="slide">
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 200,
              height: 200,
              backgroundColor: '#378',
              alignSelf: 'center',
              marginTop: 200,
              borderRadius: 10,
              elevation: 4,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  let tempList = data.sort((a, b) =>
                    a.name > b.name ? 1 : -1,
                  );
                  setData(tempList);
                  listRef.current?.scrollToIndex({index: 0, animated: true});
                  setIsModelVisible(false);
                }}
                style={{marginVertical: 10}}>
                <Text style={{color: '#fff'}}>Search By Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setData(data.sort((a, b) => a.price - b.price));
                  listRef.current?.scrollToIndex({index: 0, animated: true});
                  setIsModelVisible(false);
                }}
                style={{marginVertical: 10}}>
                <Text style={{color: '#fff'}}>Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setData(data.sort((a, b) => b.price - a.price));
                  listRef.current?.scrollToIndex({index: 0, animated: true});
                  setIsModelVisible(false);
                }}
                style={{marginVertical: 10}}>
                <Text style={{color: '#fff'}}>High to Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setData(data.sort((a, b) => b.ratings - a.ratings));
                  listRef.current?.scrollToIndex({index: 0, animated: true});
                  setIsModelVisible(false);
                }}
                style={{marginVertical: 10}}>
                <Text style={{color: '#fff'}}>Sort BY Rating</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  listView: {
    padding: 10,
    borderRadius: 8,
    // backgroundColor: '#ccc',
    flexDirection: 'row',
  },

  image: {
    tintColor: 'red',
  },
  imageTow: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginLeft: 10,
  },
  ratingView: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  rateView: {
    flexDirection: 'row',
  },
  rateList: {
    color: 'grey',
    fontSize: 14,
  },
  lessText: {
    color: 'grey',
    marginHorizontal: 10,
    textDecorationLine: 'line-through',
  },
  offText: {
    color: 'red',
  },
  available: {
    color: 'green',
    fontSize: 12,
    marginLeft: 10,
  },
  innerView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
