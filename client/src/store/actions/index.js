import {
    GET_ARTICLES,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS
} from '../types';

/////////////articles///////////////////////

export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
})

///////////////notifications///////////////

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotifications = () => {
    return(dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATIONS,
            payload: {}
        })
    }
}