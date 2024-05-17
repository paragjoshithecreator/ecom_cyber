import {GlobalStyles, globalColor} from '../GlobalStyles';
import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function ModalFilter({
  visible,
  onRequestClose,
  animationType,
  title,
  onPressN,
  onPressB,
  onPressT,
  onPressR,
  image,
  name,
  btotop,
  ttob,
  rating,
}) {
  return (
    <View>
      <Modal
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
        animationType={animationType}>
        <View style={styles.root}>
          <View style={styles.innerContainer}>
            <Text style={GlobalStyles.heading}>{title}</Text>
            <View style={styles.removeView}>
              <TouchableOpacity style={styles.space} onPress={onPressN}>
                <Text style={styles.removeText}>{name}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.space} onPress={onPressB}>
                <Text style={styles.removeText}>{btotop}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.space} onPress={onPressT}>
                <Text style={styles.removeText}>{ttob}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.space} onPress={onPressR}>
                <Text style={styles.removeText}>{rating}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    width: '100%',
    backgroundColor: globalColor.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 20,
  },
  removeView: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    width: 24,
    height: 24,
    tintColor: 'red',
    marginRight: 5,
  },
  space: {
    marginVertical: 5,
  },
  removeText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    color: 'green',
  },
});
