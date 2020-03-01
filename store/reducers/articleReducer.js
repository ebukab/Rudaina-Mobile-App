import { app } from '../../firebase';
import firebase from "firebase";

import { UPDATE_ARTICLES, ADD_TO_BOOKMARK, GET_BOOKMARKS } from '../actions/articleActions';

let initialState = {
    articles: null,
    bookmarks: []
};

firebase.database().ref('articles').on('value' , (data)=>{
    if(data.toJSON() != null){ 
        // console.log("ARTICLEs here  ");
        // console.log(Object.values(data.toJSON()).length);
        initialState.articles = Object.values(data.toJSON())
    }
})

const addToBookmarks = (uid, article) => {
    // console.log("here is the uid", uid);
    firebase.database().ref(`users/${uid}/bookmarks/${article.id}`).set({
        text : article.articleText,
        author : article.author,
        date : article.date,
        id : article.id,
        image : article.image,
        title : article.title,
        views : article.views,
    }).then(()=>{
        // console.log("article added to bookmark")
        firebase.database().ref(`users/${uid}/bookmarks`).on('value' , (data)=>{
            if(data.toJSON() != null){ 
                // console.log("ARTICLEs here  ");
                // console.log(Object.values(data.toJSON()).length);
                initialState.bookmarks = Object.values(data.toJSON())
            }
        })
    }).catch((error)=>{
        console.log(error)
    })
}


const getBookmarks = (uid) => {
    firebase.database().ref(`users/${uid}/bookmarks`).on('value' , (data)=>{
        if(data.toJSON() != null){ 
            // console.log("ARTICLEs here  ");
            // console.log(Object.values(data.toJSON()).length);
            const bookmarks = Object.values(data.toJSON())
            // initialState.bookmarks = bookmarks
            // console.log("here are the bookmarks data values", bookmarks);
            initialState.bookmarks = bookmarks
        }
    })
    // .then(()=>{
    //         console.log("here are the bookmark")
    // }).catch((error)=>{
    //         console.log(error)
    // })
}

export default (state = initialState, action) => {
    switch (action.type) {
		case UPDATE_ARTICLES:
            return initialState
        case ADD_TO_BOOKMARK:
            addToBookmarks(action.userUid, action.article)
            return initialState
        case GET_BOOKMARKS:
            console.log("fetching bookmarks");
            console.log("before func call", initialState.bookmarks);
            getBookmarks(action.userUid)
            console.log("after func call", initialState.bookmarks);
            // console.log("result of bookm func call",getBookmarks(action.userUid) ) 
            return initialState
    }
    return state;
};

// export default (state = initialState, action) => {
//     switch (action.type) {
// 		case UPDATE_ARTICLES:
//             firebase.database().ref('articles').on('value' , (data)=>{
//                 if(data.toJSON() != null){ 
//                     console.log("ARTICLEs here  ");
//                     console.log(Object.values(data.toJSON()).length);
//                     initialState.articles = Object.values(data.toJSON())
//                     return Object.values(data.toJSON())
//                 }
//             })
//     }
//     return state;
// };
