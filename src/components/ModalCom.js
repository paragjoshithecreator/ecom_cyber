import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {globalColor} from '../GlobalStyles';
import PrimaryButton from './PrimaryButton';

export default function ModalCom({
  visible,
  onRequestClose,
  animationType,
  title,
  onPress,
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
            <Text>{title}</Text>
            <PrimaryButton onPress={onPress}>SUBMIT</PrimaryButton>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: 200,
    width: 300,
    backgroundColor: globalColor.gray,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 20,
  },
});
