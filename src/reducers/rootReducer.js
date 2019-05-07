import { SHOW_LOGIN_SCREEN, SHOW_VERIFY_PHONE_SCREEN, SHOW_DASHBOARD, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actions';

const initialState = {
    screen: 'getMobileNumberScreen'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_SUCCESS:
            if (action.data.token) {
                localStorage.setItem('token', action.data.token);
            }
            return {
                ...state,
                screen: action.data.required === 'otp' ? 'verifyNumber' : action.data.token ? 'dashboard' : 'getMobileNumberScreen',
                loginData: action.data.data
            }
        case LOGIN_ERROR: return {
            ...state,
            inputError: action.data.inputError
        }
        case LOGOUT: localStorage.removeItem('token');
            return {
                ...state,
                screen: 'getMobileNumberScreen'
            }

        case SHOW_DASHBOARD: return {
            ...state,
            screen: 'dashboard'
        }
    }
    return state;
}

export default rootReducer;