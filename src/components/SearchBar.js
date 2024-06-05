import React from 'react';
import {globalColor} from '../GlobalStyles';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function SearchBar({placeholder, onChangeText, value, onPress}) {
  let image = require('../assets/img/clear.png');

  return (
    <View style={styles.root}>
      <View style={styles.innerView}>
        <Image
          source={require('../assets/img/search.png')}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={'#cccccc'}
          value={value}
        />
      </View>
      <TouchableOpacity onPress={onPress} style={styles.imageSqare}>
        <Image style={styles.imageSqare} source={image} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  input: {
    paddingLeft: 10,
    color: '#000000',
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginLeft: 10,
    color: globalColor.black,
  },
  innerView: {
    flexDirection: 'row',
  },
  imageSqare: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginRight: 10,
  },
});
