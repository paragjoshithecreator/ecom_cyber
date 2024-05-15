import {View} from 'react-native';
import React, {useEffect} from 'react';
import FavWishList from '../components/FavWishList';

export default function WishList() {

  return (
    <View style={{flex: 1}}>
      <FavWishList />
    </View>
  );
}
