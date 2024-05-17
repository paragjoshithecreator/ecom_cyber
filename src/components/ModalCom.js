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

export default function ModalCom({
  visible,
  onRequestClose,
  animationType,
  title,
  onPress,
  metaData,
  image,
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
            <Text style={GlobalStyles.subHeading}>{title}</Text>
            <TouchableOpacity onPress={onPress} style={styles.removeView}>
              <Image style={styles.image} source={image} />
              <Text style={styles.removeText}>{metaData}</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
  },
  innerContainer: {
    height: 100,
    width: '100%',
    backgroundColor: globalColor.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 20,
  },
  removeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    tintColor: 'red',
    marginRight: 5,
  },
  removeText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: 'red',
  },
});
