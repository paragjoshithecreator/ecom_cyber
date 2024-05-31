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
import AddButton from './AddButton';

export default function ModalCom({
  visible,
  onRequestClose,
  animationType,
  title,
  onPress,
  metaData,
  image,
  onPressYes,
  onPressNo,
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
            <View style={styles.removeView}>
              <Image style={styles.image} source={image} />
              <Text style={styles.removeText}>{metaData}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <AddButton onPress={onPressYes} title={'Yes'} />
              <AddButton onPress={onPressNo} title={'No'} />
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
    alignItems: 'center',
  },
  innerContainer: {
    height: 200,
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
  yesNo: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#000',
    marginRight: 10,
    marginBottom: 20,
  },
});
