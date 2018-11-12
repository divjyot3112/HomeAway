import axios from 'axios';
import { 
    LOGIN_USER, 
    SIGNUP_USER, 
    GET_USER,
    LOGOUT_USER,
    POST_PROPERTY, 
    POST_PROFILE, 
    GET_IMAGES,
    POST_IMAGES,
    SEARCH_PROPERTIES 
} from './types';

export const loginUser = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .post('/api/users/login', data)
        .then(res => {
            if(res.status === 200){
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('flag', res.data.flag);
                console.log(res.status);
                dispatch({
                    type: LOGIN_USER,
                    payload: res.data
                })
            }
        })
};

export const signupUser = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .post('/api/users/signup', data)
        .then(res => {
            if(res.status === 200){
                console.log(res.status);
                dispatch({
                    type: SIGNUP_USER,
                    payload: res.data
                })
            }
        })
};

export const getUser = () => dispatch => {
    axios.defaults.withCredentials = true;
    var email = localStorage.getItem('email');
    var data = {
        email : email
    }
    axios
        .post('/api/users/getUser', data)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            })
        })
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('email');
    localStorage.removeItem('flag');
    dispatch({
        type: LOGOUT_USER
    })
}

export const postProfile = (data) => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .post('/api/users/postProfile', data)
        .then(res => {
            if(res.status === 200) {
                dispatch({
                    type: POST_PROFILE,
                    payload: res.data
                })
            }
        })
};

export const searchProperties = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .post('/api/users/searchProperties', data)
        .then(res => {
            if(res.status === 200) {
                dispatch({
                    type: SEARCH_PROPERTIES,
                    payload: res.data
                })
            }
        })
}

export const postProperty = data => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .post('/api/users/postProperty', data) 
        .then(res => {
            localStorage.setItem('propertyFlag', 'true')
            if(res.status === 200){
                console.log(res.status);
                dispatch({
                    type: POST_PROPERTY,
                    payload: res.data
                })
            }
        })
};

export const getImages = () => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .get('/api/users/getImages')
            .then(res => {
                localStorage.removeItem('propertyFlag')
                dispatch({
                    type: GET_IMAGES,
                    payload: res.data
                })
            })
}

export const postImages = images => dispatch => {
    axios.defaults.withCredentials = true;
    axios
        .post('/api/users/postImages', images)
        .then(res => {  
            localStorage.removeItem('propertyFlag') 
            dispatch({
                type: POST_IMAGES,
                payload: 'true'
            })
        })
};

