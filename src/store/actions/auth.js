import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebase from 'firebase';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, userName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        userName: userName,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

const logoutUser = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const logout = () => {
    return dispatch => {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('userId');
            dispatch(logoutUser());
        }, function (error) {
            console.log(' Error logging out ');
        });
    }
};

export const resetErrors = () => {
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

export const authLogin = userdata => {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
            .then((userCredential) => {
                console.log(userCredential);
                localStorage.setItem('userId', userCredential.user.uid);
                dispatch(authSuccess(userCredential.user.uid));
            })
            .catch((error) => {
                dispatch(authFail(error.message));
            });
    }
}

export const authSignup = userdata => {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
            .then((userCredential) => {
                const db = firebase.firestore();
                const userDetails = {
                    userId: userCredential.user.uid,
                    firstName: userdata.firstName,
                    lastName: userdata.lastName,
                };
                const userRef = db.collection("users").add(userDetails);
                dispatch(authSuccess(userCredential.user.uid, userdata.firstName));
                localStorage.setItem('userId', userCredential.user.uid);
                localStorage.setItem('userName', userdata.firstName);
            })
            .catch((error) => {
                dispatch(authFail(error.message));
            });
    }
}

export const auth = (userdata, type) => {
    
        return dispatch => {
            dispatch(authStart());
            if(type === 'signup'){
                dispatch(authSignup(userdata));
            }else{
                dispatch(authLogin(userdata));
            }
            /*
            firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
            .then((userCredential) => {
                console.log(userCredential);
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                // localStorage.setItem('token', response.data.idToken);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.localId);
                
                // dispatch(authSuccess(response.data.idToken, response.data.localId));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((err) => {
                console.log(err);
                const responseErrors = err.response.data.error.errors[0].message;
                dispatch(authFail(responseErrors));
            });
            */
        };
}

export const oldAuth = (userdata, type) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            ...userdata,
            returnSecureToken: true
        };
        console.log('old auth');

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
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const userId = localStorage.getItem('userId');
        if(!userId){
            dispatch(logout());
        }else{
            firebase.auth().onAuthStateChanged(function(user) {
                const userName = localStorage.getItem('userName');
                if (user) {
                    dispatch(authSuccess(user.uid, userName));
                } else {
                    dispatch(logout());
                }
            });
        }
    }
};
