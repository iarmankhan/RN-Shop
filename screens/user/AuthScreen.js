import React, {useState, useCallback, useReducer, useEffect} from "react";
import {ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";

import * as authActions from '../../store/actions/auth'
import {useDispatch} from "react-redux";
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

const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(fromReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if(error){
            Alert.alert(
                'An Error Occcurred!',
                error,
                [{
                    text: 'Okay'
                }]
            )
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if(isSignUp){
            action = authActions.signUp(formState.inputValues.email, formState.inputValues.password)
        }else{
            action = authActions.logIn(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
            props.navigation.navigate('Shop')
        }catch (e) {
            setError(e.message);
            setIsLoading(false)
        }
    };

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier});
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="Email"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading
                                ? <ActivityIndicator size="small" color={Colors.primary} />
                                : <Button color={Colors.primary} title={isSignUp ? 'Sign Up' : 'Log In'} onPress={authHandler}/>}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button color={Colors.accent} title={`Switch to ${isSignUp ? 'Log In' : 'Sign Up'}`} onPress={() => {
                                setIsSignUp(prevState => !prevState);
                            }}/>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 40
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen