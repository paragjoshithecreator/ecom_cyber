import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {apiData} from '../DummyData';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function Chat() {
  const [PeopleDetails, setPeopleDetails] = useState(apiData);
  const [ProductList, setProductList] = useState([]);
  return (
    <View style={styles.bgColor}>
      <Text style={styles.title}>Messages</Text>

      <FlatList
        horizontal={true}
        data={PeopleDetails}
        renderItem={({item}) => (
          <View style={styles.chatListi}>
            <View style={styles.innerContainer}>
              <Text
                onPress={() => {
                  setProductList(item.Matches);
                }}
                style={{alignSelf: 'flex-start', color: '#000'}}>
                {item.pair}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={ProductList}
        renderItem={({item}) => (
          <View style={styles.chatList}>
            <Image style={styles.image} source={{uri: item.Picture}} />
            <View style={{backgroundColor: 'red'}}>
              <Text style={{alignSelf: 'flex-start', color: '#000'}}>
                {item.pair}
              </Text>
              <Text>{item.PairMatch}</Text>
            </View>
            <View style={styles.innerContainer}>
              <Text
                style={{alignSelf: 'center', marginRight: 10, color: '#000'}}>
                {item.LastTime}
              </Text>
            </View>

            {
              item.New ? (
                <View
                  style={{
                    backgroundColor: 'green',
                    height: 25,
                    width: 50,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: '#fff', alignSelf: 'center'}}>
                    {item.New}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: '#fff',
                    height: 25,
                    width: 50,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: '#fff', alignSelf: 'center'}}>
                    {item.New}
                  </Text>
                </View>
              ) /*  (
                <View
                  style={{
                    backgroundColor: 'red',
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                  }}>
                  <Text style={{alignSelf: 'center', color: '#fff'}}>
                    {item.Unread}
                  </Text>
                </View>
              ) */
            }
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});
