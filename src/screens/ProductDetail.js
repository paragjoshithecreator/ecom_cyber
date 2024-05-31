import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SliderIntro from 'react-native-slider-intro';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AirbnbRating, Rating} from 'react-native-ratings';
import Loader from '../components/Loader';
import PrimaryButton from '../components/PrimaryButton';
import {GlobalStyles, globalColor} from '../GlobalStyles';
import {strings} from '../language/index';
import {onShare, showToast} from '../appActivity/methods';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';

export default function ProductDetail() {
  const widthWindow = useWindowDimensions().width;

  const slides = [
    {
      index: 1,
      title: 'phone1',
      image: require('../assets/img/iphone.jpg'),
    },
    {
      index: 2,
      title: 'phone2',
      image: require('../assets/img/bglogin.png'),
    },
    {
      index: 3,
      title: 'phone3',
      image: require('../assets/img/bgShope.jpeg'),
    },
    {
      index: 4,
      title: 'phone3',
      image: require('../assets/img/iphone15.jpg'),
    },
    {
      index: 5,
      title: 'phone3',
      image: require('../assets/img/iphone6.jpg'),
    },
    {
      index: 6,
      title: 'phone3',
      image: require('../assets/img/bgShope.jpeg'),
    },
  ];

  const {productDetails, productQty} = strings;
  const navigation = useNavigation();
  const route = useRoute();
  const [productData, setProduct] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [itemId, setId] = useState('');
  const [itemName, setName] = useState('');
  const [itemPrice, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [itemdescription, setDescription] = useState('');

  const producItemId = route.params ? route.params.itemId : '';

  const ProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://e-com-cyber.onrender.com/product/getproduct/${producItemId}`,
      );

      if (response && response.data.productData) {
        setProduct(response.data.productData);
        setId(response.data.productData._id);
        setName(response.data.productData.name);
        setDescription(response.data.productData.description);
        setPrice(response.data.productData.price);
        setImage(response.data.productData.image);
      }
      setLoading(false);

      // Handle success
    } catch (error) {
      console.error('Product:', error);
      // Handle error
    }
  };

  useEffect(() => {
    ProductDetails();
  }, [producItemId]);

  const ratingHandler = async ratingss => {
    const rating = ratingss;
    const ratings = {rating};

    const userEarlierToken = await AsyncStorage.getItem('userToken');

    try {
      const response = await axios.post(
        `https://e-com-cyber.onrender.com/product/ratingproduct/${producItemId}`,
        ratings,
        {
          headers: {
            authorization: `Bearer ${userEarlierToken}`, // Include token in the header
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.error(
        'Error retrieving data from AsyncStorage:',
        error.reponse.data,
      );
    }
  };

  const ratings = r => {
    showToast(r);
    console.log(r);
    ratingHandler(r);
  };

  async function wishItems() {
    const userFavAllData = [
      {
        itemId: itemId,
        itemName: itemName,
        itemPrice: itemPrice,
        itemdescription: itemdescription,
        image: image,
      },
    ];

    try {
      await AsyncStorage.setItem(
        'favItemDetails',
        JSON.stringify(userFavAllData),
        navigation.navigate('WishList', {
          io: {itemId, itemName, itemPrice, itemdescription, image},
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  const addtoCartHnadler = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `https://e-com-cyber.onrender.com/user/addtocart/${producItemId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${userToken}`, // Include token in the header
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const {feedback} = strings;
  return (
    <View style={styles.root}>
      <FlatList
        data={productData ? [productData] : []}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            {Loading ? (
              <Loader animating={Loading} size="large" />
            ) : (
              <View>
                <View style={styles.imageView}>
                  <TouchableOpacity
                    style={styles.backView}
                    onPress={() => {
                      navigation.navigate('Explore');
                    }}>
                    <Image
                      style={{width: 24, height: 24, tintColor: 'red'}}
                      source={require('../assets/img/back.png')}
                    />
                  </TouchableOpacity>
                  <Image style={styles.image} source={{uri: item.image}} />
                </View>

                <View style={styles.listView}>
                  <Rating
                    onFinishRating={ratings}
                    style={{
                      paddingVertical: 10,
                      marginRight: 10,
                      alignSelf: 'flex-end',
                    }}
                    imageSize={18}
                  />
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => {
                      // setModal(true);
                      ratings();
                    }}></TouchableOpacity>
                  <View style={styles.feedbackView}>
                    <TouchableOpacity style={styles.feedbackinnerView}>
                      <Text style={{color: globalColor.blue}}>{feedback}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[
                      GlobalStyles.subHeading,
                      {
                        color: 'green',
                        alignSelf: 'flex-end',
                        marginRight: 10,
                        marginBottom: 10,
                      },
                    ]}>
                    {item.quantity}
                    {productQty}
                  </Text>
                  <View style={styles.titleView}>
                    <Text
                      style={[
                        styles.heading,
                        {fontSize: widthWindow > 500 ? 20 : 18},
                      ]}>
                      {item.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={onShare}>
                        <Image
                          style={{marginRight: 10}}
                          source={require('../assets/img/share.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={wishItems}>
                        <Image
                          style={{
                            marginRight: 10,
                            width: 24,
                            height: 24,
                          }}
                          source={require('../assets/img/love.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.subHeading,
                      {fontSize: widthWindow > 500 ? 16 : 14},
                    ]}>
                    {productDetails}
                  </Text>
                  <Text
                    style={[
                      styles.description,
                      {fontSize: widthWindow > 500 ? 14 : 12},
                    ]}>
                    {item.description}
                  </Text>

                  <View style={styles.innerView}></View>
                </View>
              </View>
            )}
          </View>
        )}
        keyExtractor={item => item._id}
      />

      <PrimaryButton onPress={addtoCartHnadler}>ADD TO CART</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  backView: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
    height: 300,
  },
  image: {
    elevation: 2,
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  listView: {
    backgroundColor: globalColor.white,
    borderRadius: 8,
    elevation: 2,
    paddingVertical: 10,
    marginVertical: 10,
  },
  titleView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: globalColor.white,
  },
  heading: {
    paddingLeft: 10,
    color: 'black',
    fontWeight: '600',
  },
  subHeading: {
    color: '#000',
    paddingLeft: 10,
    fontWeight: '500',
  },
  description: {
    color: globalColor.gray,
    textAlign: 'flex-start',
    paddingLeft: 10,
  },
  feedbackView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  feedbackinnerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
