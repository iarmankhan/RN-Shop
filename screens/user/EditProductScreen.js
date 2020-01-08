import React, { useEffect, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const fromReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let formIsValid = true;
        for(const key in updateValidities){
            formIsValid = formIsValid && updateValidities[key]
        }
        return {
            formIsValid: formIsValid,
            inputValues: updatedValues,
            inputValidities: updateValidities
        };
    }
    return state
};

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(fromReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: !!editedProduct,
            imageUrl: !!editedProduct,
            description: !!editedProduct,
            price: !!editedProduct,
        },
        formIsValid: !!editedProduct
    });

    const submitHandler = useCallback(() => {
        if(!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form', [{text: 'Okay'}]);
            return
        }
        if (editedProduct) {
            dispatch(
                productsActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                )
            );
        } else {
            dispatch(
                productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier});
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id="title"
                    label="Title"
                    keyBoardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    errorText="Please enter a valid title"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                <Input
                    id="imageUrl"
                    label="Image URL"
                    keyBoardType="default"
                    returnKeyType="next"
                    errorText="Please enter a valid image url"
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    onInputChange={inputChangeHandler}
                    required
                />
                {editedProduct ? null : (
                    <Input
                        id="price"
                        label="Price"
                        keyBoardType="decimal-pad"
                        returnKeyType="next"
                        errorText="Please enter a valid price"
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />
                )}
                <Input
                    id="description"
                    label="Description"
                    keyBoardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    errorText="Please enter a valid description"
                    initialValue={editedProduct ? editedProduct.description : ''}
                    onInputChange={inputChangeHandler}
                    initiallyValid={!!editedProduct}
                    required
                    minLength={5}
                />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () => (
            <HeaderButtons title="submit" HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
});

export default EditProductScreen;
