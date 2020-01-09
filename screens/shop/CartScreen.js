import React, {useEffect, useState} from "react";
import {View, StyleSheet, Text, FlatList, Button, ActivityIndicator, Alert} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders'
import Card from "../../components/UI/Card";

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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

    useEffect(() => {
        if(error) {
            Alert.alert(
                'An error occurred!',
                error,
                [{
                    text: 'Okay'
                }]
            )
        }
    }, [error]);

    const orderHandler = async (cartItems, cartTotalAmount) => {
        try{
            setIsLoading(true);
            setError(null);
            await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
        } catch (e) {
            setError(e.message);
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text></Text>
                {isLoading
                    ? <View style={styles.centered}><ActivityIndicator size="small" color={Colors.primary} /></View>
                    : <Button
                        color={Colors.accent}
                        title="Order Now"
                        onPress={() => {
                            orderHandler(cartItems, cartTotalAmount)
                        }}
                        disabled={cartItems.length === 0}
                    />}
            </Card>
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
    centered:{
      alignItems: 'center',
      justifyContent: 'center'
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
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