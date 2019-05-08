import { AxiosAPI } from "../api/AxiosAPI";
import { userData, categories, items } from '../feed/data';

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
        let user = userData[0]
        if (data.mobileNumber === user.mobileNumber) {
            if (data.otp)
                if (data.otp === user.otp) {
                    dispatch(loginSucces({ token: "Token", data }));
                    dispatch(getUserdetails());
                } else {
                    dispatch(loginError({ inputError: 'Invalid OTP!!!' }));
                }
            else
                dispatch(loginSucces({ required: 'otp', data }));
        } else {
            dispatch(loginError({ inputError: "Invalid Mobile number" }));
        }
    }
    // return (dispatch) => {
    //     AxiosAPI.post('/login', data)
    //         .then(response => {
    //             dispatch(loginSucces(response.data));
    //         })
    //         .catch(error => {
    //             dispatch(loginError(error.response));
    //         });
    // };
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
        if(categories)
        dispatch(getCategoriesSucces(categories));
        else
        dispatch(getCategoriesError({error: "Unable to get Categories"}))

    }
    // return (dispatch) => {
    //     AxiosAPI.post('/categories', data)
    //         .then(response => {
    //             dispatch(getCategiesSucces(response.data));
    //         })
    //         .catch(error => {
    //             dispatch(getCategoriesError(error.response));
    //         });
    // };
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
        if(items) {
            dispatch(getItemsSuccess(items));
        } else {
            dispatch(getItemsError({ error: 'Unable to get Items!!!'}));
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
        let user = userData[0];
        if(user) {
            dispatch(getUserdetailsSuccess(user));
        } else {
            dispatch(getUserdetailsError({ error: 'Unable to get User'}));
        }
    }
}

export function logout() {
    console.log("Logout");
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

// export function login(data) {
//     return {
//         type: LOGIN,
//         data
//     }
// }