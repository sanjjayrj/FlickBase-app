import {
    ADD_ARTICLE,
    GET_ARTICLES,
    GET_ARTICLE,
    GET_ADMIN_ARTICLES,
    UPDATE_ARTICLE_STATUS,
    CLEAR_CURRENT_ARTICLE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    REMOVE_ARTICLE,
    AUTH_USER,
    SIGN_OUT,
    CHANGE_USER_EMAIL,
    SITE_LAYOUT
} from '../types';

/////////// articles //////////////

export const addArticle = (article) => ({
    type:ADD_ARTICLE,
    payload: article
})

export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
});

export const getArticle = (article) => ({
    type: GET_ARTICLE,
    payload: article
});

export const getPaginateArticle = (articles) => ({
    type: GET_ADMIN_ARTICLES,
    payload: articles
})

export const updateArticleStatus = (articleS) => ({
    type: UPDATE_ARTICLE_STATUS,
    payload: articleS
})

export const clearCurrentArticle = () => ({
    type: CLEAR_CURRENT_ARTICLE
})

/////// notification /////////////

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
});

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
});

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}

export const removeArticle = () => ({
    type: REMOVE_ARTICLE
})

/////// users //////

export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
});

export const signOut = () => ({
    type: SIGN_OUT
});

export const changeUserEmail = (email) => ({
    type: CHANGE_USER_EMAIL,
    payload: email
})

/////////////site////////////////

export const appLayout = (layout) => ({
    type: SITE_LAYOUT,
    payload: layout
})