export const SIGN_UP = 'SIGN_UP';

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

        if(!response.ok){
            console.log(response);
            throw new Error("Something went wrong");
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: SIGN_UP,

        })
    };
};