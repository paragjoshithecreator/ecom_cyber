import axios from 'axios';
import CatListSection from './CatListSection';
import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loader from './Loader';

export default function ItemCategory() {
  useEffect(() => {
    products();
  }, []);

  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const products = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://e-com-cyber.onrender.com/category/getallcategory',
      );
      const Category = response.data.categoryData;
      setProduct(Category);
      // console.log(response.data.categoryData);
      setIsLoading(false);
    } catch (error) {
      console.error('Product:', error);
    }
  };

  return (
    <View style={styles.continer}>
      <Loader animating={isLoading} size={'large'} color={'red'} />
      {isLoading ? null : (
        <View>
          <View style={styles.gap}></View>
          <View style={styles.listsectionOne}>
            <CatListSection
              categoryData={product}
              horizontal={false}
              numColumns={3}
              title="Television"
            />
          </View>

          <View style={styles.innerView}>
            <View style={styles.innerView}>
              <CatListSection
                categoryData={product}
                horizontal={true}
                numColumns={1}
                title="Camera"
              />
            </View>
            <View style={styles.innerView}>
              <View style={styles.listsectionLast}></View>

              <CatListSection
                categoryData={product}
                horizontal={true}
                numColumns={1}
                title="Computer Accessories"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  continer: {
    height: '100%',
    width: '100%',
  },
  gap: {
    backgroundColor: 'silver',
    width: '100%',
    height: 1,
  },
  listsectionOne: {
    height: '50%',
  },
  innerView: {height: '50%'},
  listsectionLast: {
    backgroundColor: 'silver',
    width: '100%',
    height: 4,
  },
});
