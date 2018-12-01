import {
    REGISTER_USER,
    SIGN_USER,
    AUTO_SIGN_IN 
} from '../Types';

import axios from 'axios';
import { SIGNUP, SIGNIN, REFRESH } from '../../utils/Misc';

//SignUp Action
export function signUp(data) {
    const request = axios({
        method:"POST",
        url:SIGNUP,
        data:{
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response => {
        // console.log(response.data);
        return response.data
    }).catch(e => {
        return false
    })

    return {
        type: REGISTER_USER,
        payload: request
    }
}

//SignIn Action
export function signIn(data) {
    const request = axios({
        method:"POST",
        url:SIGNIN,
        data:{
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response => {
        // console.log(response.data);
        return response.data
    }).catch(e => {
        return false
    })

    return {
        type: SIGN_USER,
        payload: request
    }
}

//AutoSignIn
export function autoSignIn(refToken){

    const request = axios({
        method: "POST",
        url:REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + refToken,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then(response => {
        console.log(response.data)
        return response.data
    }).catch(e => {
        return false
    })

    return {
        type: AUTO_SIGN_IN,
        payload: request
    }
}
