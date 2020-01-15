import {AsyncStorage} from "react-native";

// export const SIGN_UP = 'SIGN_UP';
// export const LOG_IN = 'LOG_IN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userId, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            userId: userId,
            token: token
        })
    };
};

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5vGg1IIRJUtM3T0TRWUXi0Fk7DcM3HLM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResponseData = await response.json();
            const errorId = errorResponseData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Email already exist!';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const logIn = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5vGg1IIRJUtM3T0TRWUXi0Fk7DcM3HLM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResponseData = await response.json();
            const errorId = errorResponseData.error.message;
            let message = 'Something went wrong!';
            switch (errorId) {
                case 'EMAIL_NOT_FOUND':
                    message = 'Email doesn\'t exist!';
                    break;
                case 'INVALID_PASSWORD':
                    message = 'Incorrect Password!';
                    break;
                case 'USER_DISABLED':
                    message = 'Account is disabled by admin!';
                    break;
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toString()
    }));
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

export const logOut = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logOut());
        }, expirationTime);
    };
};