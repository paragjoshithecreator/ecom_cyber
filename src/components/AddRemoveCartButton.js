/**
 * Unused comp.
 */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {globalColor} from '../GlobalStyles';

export default function AddRemoveCatButton({}) {
  const [add, setAdd] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (add > 0) {
            setAdd(add - 1);
          }
        }}
        style={styles.innerView}>
        <Text style={styles.sub}>-</Text>
      </TouchableOpacity>
      <View style={{alignSelf: 'center'}}>
        <Text style={{color: '#000'}}>{add}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setAdd(add + 1);
        }}
        style={styles.innerView}>
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //width: 99,
    // height: 30,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  innerView: {
    backgroundColor: '#9AA4AF',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  sub: {
    fontSize: 20,
    color: globalColor.black,
    paddingHorizontal: 10,
  },
  add: {
    fontSize: 20,
    color: globalColor.black,
    paddingHorizontal: 10,
  },
});
