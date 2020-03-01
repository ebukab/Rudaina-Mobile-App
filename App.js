import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import * as Font from "expo-font";
import { AppLoading } from 'expo';
import { Provider, useDispatch } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import forumReducer from './store/reducers/forumReducer';
import * as authActions from "./store/actions/authActions"

import { app } from './firebase';
import firebase from "firebase";
import authReducer from './store/reducers/authReducer';
import articleReducer from './store/reducers/articleReducer';

const rootReducer = combineReducers({
	forum: forumReducer,
	auth: authReducer,
	article: articleReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	})
}

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);
	const [user, setUser] = useState(null)

	componentWillMount = () => {
        this.authListener();
	}

	authListener = () => {
        app.auth().onAuthStateChanged((user)=>{
            if(user){
				firebase.database().ref(`users/${user.uid}`).on('value' , (data)=>{
                    if(data.toJSON()){
						setUser((data.toJSON()))
                    }
                })
            }else{
                setUser(null)
            }
        })
    }

	if(!fontLoaded){
		return(
			<AppLoading
				startAsync={fetchFonts}
				onFinish={()=>{
					setFontLoaded(true)
				}}
			/>
		)
	}

	return (
		<Provider store={store}>
			<AppNavigator/>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
