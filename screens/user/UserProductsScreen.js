import React from "react";
import {FlatList, Platform} from "react-native";

import ProductItem from "../../components/shop/ProductItem";
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrdersScreen from "../shop/OrdersScreen";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => {
                }}
                onAddToCart={() => {
                }}
            />}
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
    }
};

export default UserProductScreen