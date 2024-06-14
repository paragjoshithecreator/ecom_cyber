import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import Notification from '../components/Notification';
import ServiceList from '../components/ServiceList';
import ShopButton from '../components/ShopButton';
import FreeShopView from '../components/FreeShopView';
import TrendingList from '../components/TrendingList';
import {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const images = [
  'https://www.businessinsider.in/thumb.cms?msid=94359342&width=1200&height=900',
  'https://img.freepik.com/free-vector/diwali-festival-offer-big-sale-background-template-design_1035-14851.jpg',
  'https://www.bajajmall.in/content/dam/emistoremarketplace/index/10-10-22/swami/washing-machines-diwali-offers/slider/WMCLP_Row1_1_Slider_Mob_B2B_Washing_Machine_B2B.jpg',
  'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202112/macbook-deal-m1-x600.jpg?UXjF6vAQOUFplbzalhZRxdx_uL2ZbUY1?size=750:*',
  'https://img.freepik.com/premium-photo/beautiful-indian-family-holding-shopping-bags-with-gifts-mall_250865-41.jpg',
  'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba15-m3-spacegray-gallery1-202402?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=1707262825030',
  'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba15-m3-spacegray-gallery5-202402?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=1707262826699',
];

export default function Home() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item}} style={styles.imageFest} />
    </View>
  );
  const [search, setSearch] = useState('');

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.innerView}>
        <SearchBar
          placeholder="Search"
          onPress={() => {
            setSearch('');
          }}
          onChangeText={txt => {
            setSearch(txt);
          }}
          value={search}
        />
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.image}
            source={require('../assets/img/filter.png')}
          />
        </TouchableOpacity>
      </View> */}

      <View style={styles.listView}>
        <Notification />
      </View>

      <ScrollView>
        <View style={styles.spaceView}></View>
        <ServiceList />
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onScrollToIndexFailed={info => {
            flatListRef.current.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }}
        />
        <FreeShopView />
        <TrendingList />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '800',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,
  },
  image: {
    height: 24,
    width: 24,
  },
  bg: {
    width: '100%',
  },
  listView: {
    paddingBottom: 10,
  },
  spaceView: {
    // backgroundColor: 'gray',
    height: 3,
  },
  saleText: {
    marginLeft: 10,
    color: '#ffffff',
    fontWeight: '500',
  },
  margin: {
    marginTop: 30,
  },
  imageContainer: {
    width,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  imageFest: {
    paddingHorizontal: 10,
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
  },
});
