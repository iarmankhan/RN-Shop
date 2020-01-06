import React from "react";
import {FlatList, Platform, Text} from "react-native";
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";


const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    return <FlatList data={orders} renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>} />
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Orders",
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

export default OrdersScreen