import React from 'react'
import {View, StyleSheet, Text, Image, Button} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = props => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail} />
                <Button color={Colors.primary} title="Add to cart" onPress={props.onAddToCart} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontWeight: "bold"
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});

export default ProductItem