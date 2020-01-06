import React from 'react'
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={products} renderItem={itemData => (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onViewDetail={() => {
                    props.navigation.navigate({
                        routeName: 'ProductDetail',
                        params: {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        }
                    })
                }}
                onAddToCart={() => {}}
            />
            )} />
    );
};

ProductOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const styles = StyleSheet.create({

});

export default ProductOverviewScreen