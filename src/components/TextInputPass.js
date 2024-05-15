import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles} from '../GlobalStyles';

export default function TextInputPass({
  placeholder,
  onChangeText,
  onBlur,
  value,
}) {
  const [secure, setSecure] = useState(true);
  return (
    <View style={GlobalStyles.inputPassView}>
      <TextInput
        style={GlobalStyles.inputColor}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholderTextColor={'#cccccc'}
        secureTextEntry={secure}
      />
      <TouchableOpacity
        onPress={() => {
          setSecure(!secure);
        }}>
        <Image
          style={GlobalStyles.image}
          source={
            secure
              ? require('../assets/img/show.png')
              : require('../assets/img/hide.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
}
