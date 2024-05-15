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
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import Notification from '../components/Notification';
import ServiceList from '../components/ServiceList';
import ShopButton from '../components/ShopButton';
import FreeShopView from '../components/FreeShopView';
import TrendingList from '../components/TrendingList';
import {useState} from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerView}>
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
      </View>
      <ScrollView>
        <View style={styles.listView}>
          <Notification />
        </View>
        <View style={styles.spaceView}></View>
        <ServiceList />
        <ImageBackground
          style={styles.bg}
          source={require('../assets/img/bgShope.jpeg')}>
          <Text style={[styles.saleText, styles.margin]}>
            Trending Collection
          </Text>
          <Text style={[styles.saleText, styles.heading]}>Furniture Sale</Text>
          <Text style={styles.saleText}>UP TO 25% OFF</Text>
          <View style={{marginLeft: 10, marginVertical: 30}}>
            <ShopButton>SHOP NOW</ShopButton>
          </View>
        </ImageBackground>
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
    backgroundColor: 'gray',
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
});
