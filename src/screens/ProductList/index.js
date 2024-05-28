// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { fetchProductsByCategory } from '../../redux/store/productSlice';

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const { products, page, status, error } = useSelector(state => state.products);
  const [currentCategory, setCurrentCategory] = useState(category);

  useEffect(() => {
    if (currentCategory !== category) {
      setCurrentCategory(category);
      dispatch(fetchProductsByCategory({ categoryName: category, page: 1 }));
    }
  }, [dispatch, category, currentCategory]);

  const loadMoreProducts = () => {
    dispatch(fetchProductsByCategory({ categoryName: category, page: page + 1 }));
  };

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>{item.title}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={loadMoreProducts} style={styles.button}>
        <Text style={styles.buttonText}>Load More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
   
  },
  productText: {
    fontSize: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#ccc',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default ProductList;
