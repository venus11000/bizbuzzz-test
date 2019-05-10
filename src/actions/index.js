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
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';


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
                            if (error.code === 'auth/invalid-verification-code') {
                                dispatch(loginError({ error, inputError: "Invalid OTP!!" }));
                            } else {
                                dispatch(loginError({ error, inputError: error.message }));
                            }
                        });
                    });
            } else {
                firebase.auth().signInWithPhoneNumber(data.countryCode + data.mobileNumber, window.recaptchaVerifier)
                    .then(function (confirmationResult) {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        dispatch(loginSucces({ required: 'otp', data: { ...data, confirmationResult } }));
                    }).catch(function (error) {
                        if (error.code === "auth/invalid-phone-number") {
                            dispatch(loginError({ error, inputError: "Invalid Phone number" }));
                        } else {
                            dispatch(loginError({ error, inputError: error.message }));
                        }
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
        firebase.database().ref().child('categories').on('value', snapshot => {
            let categories = snapshot.val();
            dispatch(getCategoriesSucces(categories));
        }, (error) => {
            dispatch(getCategoriesError({ error }));
        });

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
        firebase.database().ref().child('items').on('value', snapshot => {
            dispatch(getItemsSuccess(snapshot.val()));
        }, (error) => {
            dispatch(getItemsError({ error }));
        });
    }
}

export function searchItems(data) {
    return (dispatch) => {
        firebase.database().ref().child('items').on('value', snapshot => {
            let matchedItems = snapshot.val().filter((item, index) => item.name.toLowerCase().includes(data.search.toLowerCase()));
            dispatch(getItemsSuccess(matchedItems));
        }, (error) => {
            dispatch(getItemsError({ error }));
        });
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

export function updateUserSuccess(data) {
    return {
        type: UPDATE_USER_SUCCESS,
        data
    }
}

export function updateUserError(error) {
    return {
        type: UPDATE_USER_ERROR,
        data: error
    }
}
export function updateUser(user) {
    return (dispatch) => {
        console.log(user);
        dispatch(updateUserSuccess({ message: 'Updated succesfully!!' }));
        // dispatch(updateUserError({message: 'unable to Update'}));
    }
}
export function logout() {
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