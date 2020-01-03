import React from 'react'
import {FlatList, StyleSheet, Text} from "react-native";
import {useSelector} from "react-redux";

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={products} renderItem={itemData => <Text>{itemData.item.title}</Text>} />
    );
};

ProductOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const styles = StyleSheet.create({

});

export default ProductOverviewScreen