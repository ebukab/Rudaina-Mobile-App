export const UPDATE_ARTICLES = "UPDATE_ARTICLES";
export const ADD_TO_BOOKMARK = "ADD_TO_BOOKMARK";
export const GET_BOOKMARKS = "GET_BOOKMARKS";

export const updateArticles = () => {
    return { type: UPDATE_ARTICLES};
};

export const addToBookmark = (uid, article) => {
    return { type: ADD_TO_BOOKMARK, userUid: uid, article: article};
};

export const getBookmarks = (uid) => {
    return { type: GET_BOOKMARKS, userUid: uid,};
};


