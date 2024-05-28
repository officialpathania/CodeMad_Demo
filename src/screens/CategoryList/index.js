// src/components/CategoryList.js
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {fetchCategories} from '../../redux/store/categorySlice';

const CategoryList = ({onSelectCategory}) => {
  const dispatch = useDispatch();
  const {categories, status, error} = useSelector(state => state.categories);
  const { products } = useSelector(state => state.products);
console.log("products110",products)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      {categories.map(
        category => (
          console.log('category', category),
          (
            <TouchableOpacity
            key={category}
            onPress={() => onSelectCategory(category)}
            style={{ flexDirection:'row',paddingVertical: 5,borderWidth:0.5,margin: 8,borderRadius: 5}}>
            
              <View style={{justifyContent:'space-between' , flex: 0.5 ,margin: 10,justifyContent:'center'}}>
                <Image
                  style={{height: 60, width: 60 ,borderRadius: 30}}
                  source={require('../../assets/img1.jpg')}
                />
         
                </View>
                <View style={{flex:1 ,padding:5}}> 
                <Text style={styles.text}>{category}</Text>
                <Text>Recent studies have shown that people pay attention to reviews more now. </Text>
                 </View>
              
            </TouchableOpacity>
          )
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
  },
  subviewStyle: {
    backgroundColor: '#ccc',
  },
});

export default CategoryList;
