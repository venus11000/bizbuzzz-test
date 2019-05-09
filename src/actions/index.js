import firebase from 'firebase';
import { categories, items } from '../feed/data';

export const SHOW_VERIFY_PHONE_SCREEN = 'SHOW_VERIFY_PHONE_SCREEN';
export const SHOW_LOGIN_SCREEN = 'SHOW_LOGIN_SCREEN';
export const SHOW_DASHBOARD = 'SHOW_DASHBOARD';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';
export const GET_USERDETAILS_SUCCESS = 'GET_USERDETAILS_SUCCESS';
export const GET_USERDETAILS_ERROR = 'GET_USERDETAILS_ERROR';


export function loginSucces(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

export function loginError(data) {
    return {
        type: LOGIN_ERROR,
        data
    }
}

export function login(data) {
    return (dispatch) => {
        if (data.mobileNumber) {
            if (data.confirmationResult && data.otp) {
                let confirmationResult = data.confirmationResult;
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        confirmationResult.confirm(data.otp).then(function (result) {
                            // User signed in successfully.
                            var user = result.user;
                            dispatch(loginSucces({ token: "Token", user }));
                            dispatch(getUserdetails());
                        }).catch(function (error) {
                            // User couldn't sign in (bad verification code?)
                            dispatch(loginError({ error, inputError: "" }));
                        });
                    });
            } else {
                firebase.auth().signInWithPhoneNumber(data.countryCode + data.mobileNumber, window.recaptchaVerifier)
                    .then(function (confirmationResult) {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        dispatch(loginSucces({ required: 'otp', data: { ...data, confirmationResult } }));
                    }).catch(function (error) {
                        dispatch(loginError({ error, inputError: "" }));
                    });
            }
        }
    }
}

export function getCategoriesSucces(data) {
    return {
        type: GET_CATEGORIES_SUCCESS,
        data
    }
}

export function getCategoriesError(data) {
    return {
        type: GET_CATEGORIES_ERROR,
        data
    }
}
export function getCategories() {
    return (dispatch) => {
        if (categories)
            dispatch(getCategoriesSucces(categories));
        else
            dispatch(getCategoriesError({ error: "Unable to get Categories" }))

    }
}

export function getItemsSuccess(data) {
    return {
        type: GET_ITEMS_SUCCESS,
        data
    }
}

export function getItemsError(data) {
    return {
        type: GET_ITEMS_ERROR,
        data
    }
}

export function getItems() {
    return (dispatch) => {
        if (items) {
            dispatch(getItemsSuccess(items));
        } else {
            dispatch(getItemsError({ error: 'Unable to get Items!!!' }));
        }
    }
}

export function getUserdetailsSuccess(data) {
    return {
        type: GET_USERDETAILS_SUCCESS,
        data
    }
}

export function getUserdetailsError(data) {
    return {
        type: GET_USERDETAILS_ERROR,
        data
    }
}
export function getUserdetails() {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                dispatch(getUserdetailsSuccess(user));
            } else {
                dispatch(getUserdetailsError({ error: 'Unable to get User' }));
            }
        });
    }
}

export function logout() {
    console.log("Logout");
    // firebase.auth.signOut();
    return {
        type: LOGOUT
    }
}


export function showOTPScreen(data) {
    return {
        type: SHOW_VERIFY_PHONE_SCREEN,
        data
    }
}

export function showLoginScreen() {
    return {
        type: SHOW_LOGIN_SCREEN,
        // data: true
    }
}

export function showDashboard() {
    return {
        type: SHOW_DASHBOARD
    }
}