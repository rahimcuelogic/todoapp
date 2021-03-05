import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const resetErrors = () => {
    console.log('reset error');
    return dispatch => {
        return {
            type: actionTypes.ERROR_RESET,

        }
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const auth = (userdata, type) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            ...userdata,
            returnSecureToken: true
        };

        const ApiKey = process.env.REACT_APP_FIREBASE_API;
        const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        const endPoint = (type === 'signup') ? baseUrl + 'signUp?key=' + ApiKey : baseUrl + 'signInWithPassword?key=' + ApiKey;
        axios.post(endPoint, authData)
            .then( response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                const responseErrors = err.response.data.error.errors[0].message;
                dispatch(authFail(responseErrors));
                // setTimeout( () => {
                //     dispatch(resetErrors());
                // }, 3000);
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }else{
                dispatch(logout());
            }
        }
    }
};
