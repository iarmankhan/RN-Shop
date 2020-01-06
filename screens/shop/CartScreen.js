import React from "react";
import {View, StyleSheet, Text, FlatList, Button} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import Colors from "../../constants/Colors";
import cart from "../../store/reducers/cart";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders'
import OrdersScreen from "./OrdersScreen";

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
                <Button
                    color={Colors.accent}
                    title="Order Now"
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
                    }}
                    disabled={cartItems.length === 0}/>
            </View>
            <FlatList data={cartItems} renderItem={itemData => <CartItem
                title={itemData.item.productTitle}
                quantity={itemData.item.quantity}
                amount={itemData.item.sum}
                deletable
                onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemData.item.productId))
                }}
            />} keyExtractor={item => item.productId} />
        </View>
    )
};

CartScreen.navigationOptions = {
    headerTitle: "Your Cart"
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen