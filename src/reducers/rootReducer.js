import { SHOW_LOGIN_SCREEN, GET_ITEMS_SUCCESS, SHOW_DASHBOARD, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, GET_CATEGORIES_SUCCESS, GET_USERDETAILS_SUCCESS, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, GET_CATEGORY_FILTER, SHOW_ITEM_POPUP, HIDE_POPUP } from '../actions';

const initialState = {
    screen: 'getMobileNumberScreen',
    categoryFilter: 'all'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_SUCCESS:
            if (action.data.token) {
                localStorage.setItem('token', action.data.token);
            }
            return {
                ...state,
                inputError: '',
                screen: action.data.required === 'otp' ? 'verifyNumber' : action.data.token ? 'dashboard' : 'getMobileNumberScreen',
                loginData: action.data.data
            }

        case LOGIN_ERROR: return {
            ...state,
            error: action.data.error,
            inputError: action.data.inputError
        }

        case LOGOUT: localStorage.removeItem('token');
            return {
                ...state,
                screen: 'getMobileNumberScreen',
                userDetails: null
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
        case GET_USERDETAILS_SUCCESS: return {
            ...state,
            userDetails: action.data
        }
        case UPDATE_USER_SUCCESS: return {
            ...state,
            popup: {
                message: action.data,
                type: 'success'
            }
        }
        case UPDATE_USER_ERROR: return {
            ...state,
            popup: {
                message: action.data,
                type: 'unsuccessful'
            }
        }
        case GET_CATEGORY_FILTER: return {
            ...state,
            categoryFilter: action.data
        }
        case SHOW_ITEM_POPUP: return {
            ...state,
            showPopup: 'item-description',
            selectedItem: action.data
        }
        case HIDE_POPUP: return {
            ...state,
            showPopup: '',
            selectedItem: null
        }
    }
    return state;
}

export default rootReducer;