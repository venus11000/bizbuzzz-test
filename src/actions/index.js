import { AxiosAPI } from "../api/AxiosAPI";
import { userData } from '../feed/data';

export const SHOW_VERIFY_PHONE_SCREEN = 'SHOW_VERIFY_PHONE_SCREEN';
export const SHOW_LOGIN_SCREEN = 'SHOW_LOGIN_SCREEN';
export const SHOW_DASHBOARD = 'SHOW_DASHBOARD';
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';


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
    console.log(data, userData);
    return (dispatch) => {
        let user = userData[0]
        if (data.mobileNumber === user.mobileNumber) {
            if (data.otp)
                if (data.otp === user.otp) {
                    dispatch(loginSucces({ token: "Token", data }));
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