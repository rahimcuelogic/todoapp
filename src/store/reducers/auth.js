import * as actionTypes from '../actions/actionTypes';
// import { authStart } from '../actions/auth';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    userName: '',
    error: null,
    // responseMessage: [],
    loading: false
};

const authStart = (state = initialState, action ) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state = initialState, action ) => {
    return updateObject (state, {
        // token: action.idToken,
        userId: action.userId,
        userName: action.userName,
        error: null,
        loading: false   
    });
}

const authFail = (state = initialState, action ) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject (state, { token: null, userId: null });
}

const errorReset = (state, action) => {
    return updateObject (state, { error: null });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.ERROR_RESET: return errorReset(state, action);
        default: return state;
    }
}

export default reducer;