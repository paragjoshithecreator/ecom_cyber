import {View, StyleSheet} from 'react-native';
import React from 'react';
import CategoryItems from '../components/CategoryItems';
import ItemCategory from '../components/ItemCategory';

export default function AllCategories() {
  return (
    <View style={styles.innerContainer}>
      <View style={styles.categoriresView}>
        <CategoryItems />
      </View>
      <View style={styles.catinnerView}>
        <ItemCategory />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    flex: 4,
  },
  categoriresView: {
    flex: 1,
  },
  catinnerView: {
    flex: 3,
  },
});
