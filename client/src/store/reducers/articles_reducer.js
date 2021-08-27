import {
    GET_ARTICLE,
    GET_ARTICLES,
    CLEAR_CURRENT_ARTICLE
} from '../types';

export default function articleReducer(state={},action){
    switch(action.type){
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