import React, {useEffect, useState} from "react";
import {Alert, Button, FlatList, Platform, ActivityIndicator, StyleSheet, View} from "react-native";

import ProductItem from "../../components/shop/ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import {deleteProduct} from "../../store/actions/products";

const UserProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProduct = (id) => {
        props.navigation.navigate('EditProduct', {productId: id})
    };

    useEffect(() => {
        if(error){
            Alert.alert(
                'An error occurred!',
                error,
                [{
                    text: 'Okay'
                }]
            )
        }
    }, [error]);

    const confirmDelete = async (id) => {
        try{
            setError(null);
            setIsLoading(true);
            await dispatch(deleteProduct(id));
        } catch (e) {
            setError(e.message)
        }
        setIsLoading(false);
    };

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [{
                text: 'No',
                style: 'default'
            },
                {
                    text: 'Yes',
                    styles: 'destructive',
                    onPress: () => {confirmDelete(id)}
                }]
        )
    };

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {editProduct(itemData.item.id)}}
                >
                <Button color={Colors.primary} title="Edit" onPress={() => {editProduct(itemData.item.id)}}/>
                <Button color={Colors.primary} title="Delete" onPress={deleteHandler.bind(this, itemData.item.id)}/>
                </ProductItem>
            )}
        />
    );
};

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
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
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title="addProduct">
              <Item
                  title="Add"
                  iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                  onPress={() => {
                      navData.navigation.navigate('EditProduct');
                  }}
              />
          </HeaderButtons>
        ),
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UserProductScreen