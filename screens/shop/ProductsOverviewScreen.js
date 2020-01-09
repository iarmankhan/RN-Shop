import React, {useCallback, useEffect, useState} from 'react'
import {Button, FlatList, Platform, StyleSheet, ActivityIndicator, View, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import Colors from "../../constants/Colors";

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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

    const loadProducts = useCallback(async () =>{
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(productActions.fetchProducts());
        }catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);

    if(error){
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button title="Try Again!" onPress={loadProducts} color={Colors.primary} />
            </View>
        )
    }

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    if(!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        )
    }

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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductOverviewScreen