import React from 'react'
import {FlatList, Platform, StyleSheet} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
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

ProductOverviewScreen.navigationOptions = navData => {
   return {
       headerTitle: 'All Products',
       headerRight: () => (
           <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item
                   title="Cart"
                   iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                   onPress={() => {
                       navData.navigation.navigate('Cart')
                   }}
               />
           </HeaderButtons>
       )
   }
};

const styles = StyleSheet.create({

});

export default ProductOverviewScreen