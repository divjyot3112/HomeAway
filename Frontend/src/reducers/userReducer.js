import { 
    LOGIN_USER, 
    SIGNUP_USER,
    LOGOUT_USER, 
    GET_USER,
    POST_PROFILE, 
    POST_PROPERTY, 
    GET_IMAGES,
    POST_IMAGES,
    SEARCH_PROPERTIES 
} from  '../actions/types';

const initialState = {
    user: '',
    properties: '',
    images: '',
    postpropFlag: ''
}

export default function(state = initialState, action) {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SIGNUP_USER:
            return {
                ...state,
                user: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: '',
            };
        case POST_PROFILE:
            return {
                ...state,
                user: action.payload
            };
        case GET_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        case POST_PROPERTY:
            return {
                ...state,
                user: action.payload.user,
                properties: action.payload.userProperties,
                postpropFlag: "true"
            };
        case POST_IMAGES:
            return {
                ...state
            };
        case SEARCH_PROPERTIES:
            return {
                ...state,
                properties: action.payload
            }
        default:
            return state;
    }
}