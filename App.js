// src/App.js
import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SearchBar from './src/commonComponents/SearchBar';
import CategoryList from './src/screens/CategoryList';
import ProductList from './src/screens/ProductList';
import { searchProducts } from './src/redux/store/searchSlice';
import { fetchProductsByCategory } from './src/redux/store/productSlice';
import { store } from './src/redux/store';

const CustomStatusBar = ({ backgroundColor, barStyle = 'light-content' }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar animated={true} backgroundColor={backgroundColor} barStyle={barStyle} />
    </View>
  );
};

const MainApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("men's clothing");
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.search.searchResults);
  console.log("searchResults11",searchResults)

  const handleCategorySelect = category => {
    setSelectedCategory(category);
  };
  // useEffect(() => {
  //   // Fetch products when component mounts
  //   dispatch(searchProducts({ query: query, page: 1 }));
  // }, [dispatch]);
  useEffect(() => {

    if (selectedCategory) {
      dispatch(fetchProductsByCategory({ categoryName: selectedCategory, page: 1 }));
    }
  }, [selectedCategory, dispatch]);

  const handleSearch = query => {
    console.log("query11",query)
    dispatch(searchProducts({ query, page: 1 }));
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStatusBar backgroundColor={'#016658'} />
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <CategoryList onSelectCategory={handleCategorySelect} />
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              console.log("item1",item),
              <View style={styles.productItem}>
                <Text style={styles.productText}>{item.title}</Text>
              </View>
            )}
          />
        ) : (
          selectedCategory && 
          <ProductList 
          category={selectedCategory} 
          />
        )}
      </View>
    </SafeAreaProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productItem: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  productText: {
    fontSize: 16,
  },
});

export default App;
