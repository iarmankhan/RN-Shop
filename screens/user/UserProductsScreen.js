import React from "react";
import {Button, FlatList, Platform} from "react-native";

import ProductItem from "../../components/shop/ProductItem";
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {}}
                >
                <Button color={Colors.primary} title="Edit" onPress={() => {}}/>
                <Button color={Colors.primary} title="Delete" onPress={() => {}}/>
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
    }
};

export default UserProductScreen