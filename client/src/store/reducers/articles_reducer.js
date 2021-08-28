import {
    GET_ARTICLE,
    GET_ARTICLES,
    CLEAR_CURRENT_ARTICLE,
    ADD_ARTICLE
} from '../types';

export default function articleReducer(state={},action){
    switch(action.type){
        case ADD_ARTICLE:
            return {...state, lastAdded: action.payload, success:true }
        case GET_ARTICLES:
            return {...state, articles: action.payload}
        case GET_ARTICLE:
            return {...state, current: action.payload}
        case CLEAR_CURRENT_ARTICLE:
            return {...state, current: ''}
        default:
            return state
    }
}