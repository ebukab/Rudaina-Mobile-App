//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogInScreen from './loginScreen';
import SignUpScreen from './signUpScreen';
import * as authActions from "../../store/actions/authActions"
import { useDispatch } from 'react-redux';
import { app } from '../../firebase';
import firebase from "firebase";
import ForgotPassword from './forgotPassword';

// create a component
const AuthScreen = (props) => {
    const [screen, changeScreen] = useState("Login");
    const dispatch = useDispatch();

    const toggleScreen = (screen) => {
        console.log("i will switch to", screen)
        changeScreen(screen);
    }

    const dispatchUserUpdate = (details) => {
        firebase.database().ref(`users/${details.user.uid}`).on('value' , (data)=>{
            if(data.toJSON()){
                console.log("here is all the user details")
                console.log({...details, ...Object.values(data.toJSON()) })
                dispatch(authActions.user({...details, ...Object.values(data.toJSON()) }))
            }
        })
    }

    const goToApp = () => {
        props.navigation.navigate("App")
    }

    return (
        <View style={styles.container}>
            {screen === "Login" && <LogInScreen dispatch={dispatchUserUpdate} toggleScreen={toggleScreen} goToApp={goToApp}/>}
            {screen === "SignUp" && <SignUpScreen dispatch={dispatchUserUpdate} toggleScreen={toggleScreen} goToApp={goToApp}/>}
            {screen === "ForgotPassword" && <ForgotPassword dispatch={dispatchUserUpdate} toggleScreen={toggleScreen} goToApp={goToApp}/>}
        </View>
    );
};

AuthScreen.navigationOptions = navData => {
    return{
        headerTitle: "Rudaina Foundation",
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default AuthScreen;
