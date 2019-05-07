import { SHOW_LOGIN_SCREEN, GET_ITEMS_SUCCESS, SHOW_DASHBOARD, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, GET_CATEGORIES_SUCCESS } from '../actions';

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

        case GET_CATEGORIES_SUCCESS: return {
            ...state,
            categories: action.data
        }

        case GET_ITEMS_SUCCESS: return {
            ...state,
            items: action.data
        }
        case SHOW_DASHBOARD: return {
            ...state,
            screen: 'dashboard'
        }
    }
    return state;
}

export default rootReducer;