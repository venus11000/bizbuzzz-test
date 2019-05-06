import { SHOW_LOGIN_SCREEN, SHOW_VERIFY_PHONE_SCREEN, SHOW_DASHBOARD, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions';

const initialState = {
    screen: 'getMobileNumberScreen'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_SUCCESS: return {
            ...state,
            screen: action.data.required === 'otp' ? 'verifyNumber' : action.data.token ? 'dashboard' : 'getMobileNumberScreen',
            loginData: action.data.data
        }
        case LOGIN_ERROR: return {
            ...state,
            inputError: action.data.inputError
        }
        // case SHOW_VERIFY_PHONE_SCREEN: return {
        //     ...state,
        //     loginData: { ...action.data },
        //     screen: 'verifyNumber'
        // }

        // case SHOW_LOGIN_SCREEN: return {
        //     ...state,
        //     screen: 'getMobileNumberScreen'
        // }

        // case SHOW_DASHBOARD: return {
        //     ...state,
        //     screen: 'dashboard'
        // }
        // case LOGIN: return {
        //     ...state,
        //     loginData: { ...action.data },
        // }
    }
    return state;
}

export default rootReducer;