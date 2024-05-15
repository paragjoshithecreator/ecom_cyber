import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {GlobalStyles, globalColor} from '../GlobalStyles';

export default function Splash({navigation}) {
  /* useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignUp');
    }, 2000);
  }, []); */
  return (
    /*   <ImageBackground
      style={styles.root}
      source={require('../img/bgShope.jpeg')}
      resizeMode="cover"> */
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('SignUp');
        }}>
        <Text style={GlobalStyles.heading}>Go</Text>
      </TouchableOpacity>
    </View>
    // </ImageBackground>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: globalColor.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
