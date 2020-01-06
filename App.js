import React, {useState} from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from "react-redux";
import * as Fonts from 'expo-font'
import {AppLoading} from "expo";

import productsReducer from "./store/reducers/products";
import ShopNavigator from './navigation/ShopNavigator'
import {set} from "react-native-reanimated";

const rootReducer = combineReducers({
    products: productsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
    return Fonts.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => {
            setFontLoaded(true)
        }}/>
    }
    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>
    );
}
