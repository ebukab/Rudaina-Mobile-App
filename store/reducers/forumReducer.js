// import {POST_REPLY, FETCH_QUESTIONS} from "../actions/forumActions";
// import { app } from '../../firebase';
// import firebase from "firebase";

// const initialState = {
//     questions : null
// };

// // firebase.database().ref('questions').on('value' , (data)=>{
// //     if(data.toJSON() != null){ 
// //         // console.log("ARTICLEs here  ");
// //         // console.log(Object.values(data.toJSON()).length);
// //         initialState.questions = Object.values(data.toJSON())
// //     }
// //     // console.log("questions updated", initialState.questions);
// // })
// // .then(()=>{
// //     console.log("questions updated", initialState.questions);
// // }).catch((error)=>{
// //     console.log(error)
// // })


// export default (state = initialState, action) => {
//     switch (action.type) {
//         case POST_REPLY:
//             console.log("modified messages" , {
//                 ...state,
//                 questions: state.questions.concat(action.reply)
//             });
//             return {
//                 ...state,
//                 questions: state.questions.concat(action.reply)
//             };

//         case FETCH_QUESTIONS:
//             return {
//                 ...state,
//                 questions: state.questions.concat(action.reply)
//             };
//     }
//     return state;
// };
