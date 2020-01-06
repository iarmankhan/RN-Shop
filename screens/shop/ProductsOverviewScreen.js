import React from 'react'
import {Button, FlatList, Platform, StyleSheet, View} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButton, HeaderButtons, Item} from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from '../../store/actions/cart'
import Colors from "../../constants/Colors";

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        })
    };

    const dispatch = useDispatch();
    return (
        <FlatList data={products} renderItem={itemData => (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button color={Colors.primary} title="View Details" onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}/>
                <Button color={Colors.primary} title="Add to cart" onPress={() => dispatch(cartActions.addToCart(itemData.item))}/>
            </ProductItem>
            )} />
    );
};

ProductOverviewScreen.navigationOptions = navData => {
   return {
       headerTitle: 'All Products',
       headerLeft: () => (
           <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title="drawer">
               <Item
                   title="Menu"
                   iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                   onPress={() => {
                       navData.navigation.toggleDrawer();
                   }}
               />
           </HeaderButtons>
       ),
       headerRight: () => (
           <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title="cart">
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