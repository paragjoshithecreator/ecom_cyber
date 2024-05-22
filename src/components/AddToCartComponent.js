import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalColor} from '../GlobalStyles';

export default function AddToCartComponent() {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: globalColor.orange,
          marginRight: 10,
        }}>
        <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 4}}>
          <Text style={{color: globalColor.orange, fontSize: 18}}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 4}}>
          <Text style={{color: globalColor.black, fontSize: 16}}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 4}}>
          <Text style={{color: globalColor.orange, fontSize: 18}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
