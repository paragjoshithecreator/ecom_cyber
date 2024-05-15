import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function PaymentSteps() {
  return (
    <View style={styles.continer}>
      <View style={styles.paymentView}>
        <Text style={styles.paymentText}>
          {' '}
          <Text style={styles.colorText}>❶</Text> Cart
        </Text>
        <View style={styles.lineView}></View>
        <Text style={styles.paymentText}>
          <Text style={styles.colorTextUnselect}>❷</Text> Address
        </Text>
        <View style={styles.lineView}></View>
        <Text style={styles.paymentText}>
          <Text style={styles.colorTextUnselect}>❸</Text> Payment
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  continer: {
    paddingVertical: 8,
    backgroundColor: '#000',
  },
  paymentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineView: {
    width: 70,
    height: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  paymentText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
  },
  colorText: {
    color: 'yellow',
    fontSize: 20,
    alignSelf: 'center',
  },
  colorTextUnselect: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
  },
});
