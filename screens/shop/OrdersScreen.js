import React, {useCallback, useEffect, useState} from "react";
import {FlatList, Platform, ActivityIndicator, View, StyleSheet, Text, Button} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersAction from '../../store/actions/orders';
import Colors from "../../constants/Colors";


const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const loadOrders = useCallback(async() => {
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(ordersAction.fetchOrders());
        } catch (e) {
            setError(e.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    if(error){
        return (
            <View style={styles.centered}>
                <Text>Some errors occurred!</Text>
                <Button title="Try Again!" onPress={loadOrders} color={Colors.primary} />
            </View>
        )
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return <FlatList data={orders} renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} />} />
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

const styles = StyleSheet.create({
   centered: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   }
});

export default OrdersScreen