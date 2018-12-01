import { Dimensions, AsyncStorage } from 'react-native';

//Orientation
export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape"
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change",cb)
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change")
}

//Firebase
export const APIKEY = `AIzaSyAmtZj-ZZWKnYxSX89YJcJB6sQggvw4MMg`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

//AsyncStorage
export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expireDate = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@cetakinApp@token', values.token],
        ['@cetakinApp@refreshToken', values.refToken],
        ['@cetakinApp@expireToken', expireDate.toString()],
        ['@cetakinApp@uid', values.uid]
    ]).then(response => {
        cb();
    })
}

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@cetakinApp@token',
        '@cetakinApp@refreshToken', 
        '@cetakinApp@expireToken', 
        '@cetakinApp@uid'
    ]).then(value => {
        cb(value);
    })
}
