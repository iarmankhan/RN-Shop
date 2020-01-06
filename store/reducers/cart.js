import {ADD_TO_CART} from "../actions/cart";
import {REMOVE_FROM_CART} from "../actions/cart";
import CartItem from "../../models/cart-item";
import {act} from "react-dom/test-utils";

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            let updatedOrNewItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );


            } else {
                updatedOrNewItem = new CartItem(1, productPrice, productTitle, productPrice);
            }
            return {
                // ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewItem
                },
                totalAmount: state.totalAmount + productPrice
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQuantity = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQuantity > 1) {
                updatedCartItems = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.pid]: updatedCartItems};
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }
            return {
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
    }
    return state;
};