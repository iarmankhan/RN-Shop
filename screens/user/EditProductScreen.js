import React from "react";
import {View, Text, StyleSheet} from "react-native";

const EditProductScreen = props => {
    return  (
        <View>
            <Text>Edit Product Screen! {props.navigation.getParam('productId')}</Text>
        </View>
    )
};

const styles = StyleSheet.create({});

export default EditProductScreen