import React from "react";
import {Button, FlatList, Platform} from "react-native";

import ProductItem from "../../components/shop/ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import {deleteProduct} from "../../store/actions/products";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProduct = (id) => {
        props.navigation.navigate('EditProduct', {productId: id})
    };
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
                <Button color={Colors.primary} title="Delete" onPress={() => {dispatch(deleteProduct(itemData.item.id))}}/>
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

export default UserProductScreen