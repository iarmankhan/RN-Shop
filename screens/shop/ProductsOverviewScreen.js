import React from 'react'
import {FlatList, StyleSheet} from "react-native";
import {useSelector, useDispatch} from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart'

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();
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
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
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