import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {Platform} from "react-native";

import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

const ProductNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    mode: 'card',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(ProductNavigator)
