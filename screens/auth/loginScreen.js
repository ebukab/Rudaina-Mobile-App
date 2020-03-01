//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Toast, {DURATION} from 'react-native-easy-toast'

import { app } from '../../firebase';
import firebase from "firebase";

// create a component
class LogInScreen extends Component {
    state = {
        email : "",
        password: "",
    }

    signIn = () => {
        app.auth().signInWithEmailAndPassword(this.state.email , this.state.password).then((u)=>{
            this.props.dispatch(u)
            this.refs.loginAuth.show("Sign In Success", 2000);
            this.props.goToApp("App")
        }).catch((err)=>{
            this.refs.loginAuth.show("Login error", 2000);
        })
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}
                style={styles.screen}
            >
                <Toast position='top' ref="loginAuth" style={{backgroundColor:Colors.primary}} textStyle={{color:'white', fontWeight: 'bold',}}/>
                <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1,width: "100%", height: "100%",}}>
                    <View style={styles.container}>
                        <View style={styles.imageBox}>
                            <Image style={styles.image} source={require('../../assets/logo.png')} />
                        </View>
    
                        <View style={styles.inputBox}>
                            <View style={styles.iconBox}>
                                <Ionicons  name="ios-at" size={25} color={Colors.primary}/>
                            </View>
                            <TextInput style = {styles.input}
                                autoCorrect={false}
                                underlineColorAndroid = "transparent"
                                placeholder = "Email"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(text) => this.setState({email: text })}
                                value={this.state.email.text}
                            />
                        </View>
    
                        <View style={styles.inputBox}>
                            <View style={styles.iconBox}>
                                <Ionicons  name="ios-lock" size={25} color={Colors.primary}/>
                            </View>
                            <TextInput style = {styles.input}
                                autoCorrect={false}
                                secureTextEntry={true}
                                underlineColorAndroid = "transparent"
                                placeholder = "Password"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(text) => this.setState({password: text })}
                                value={this.state.password.text}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.authButton}
                            onPress={this.signIn}
                        >
                            <LinearGradient
                                colors={['#fe668e', Colors.primary]}
                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} 
                                style={styles.gradientBox}
                            >
                                <Text style={styles.authText}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.arrangeButtons}>
                            <TouchableWithoutFeedback
                                onPress={()=>this.props.toggleScreen("ForgotPassword")}
                                style={{backgroundColor: "red", width: "100%"}}
                            >
                                <View style={{display: 'flex',flexDirection : "row",alignItems: 'center', }}>
                                    <Text style={{fontSize : 16,fontWeight: 'bold', color : "#fe4c7b",}}>Forgot Password? </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                                onPress={()=>this.props.toggleScreen("SignUp")}
                            >
                                <View style={{display: 'flex',flexDirection : "row",alignItems: 'center'}}>
                                    <Text style={{color : Colors.primary, fontWeight: 'bold', fontSize : 16}}>Sign Up</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        width: "100%", 
        height: "100%",
    },
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBox:{
        borderLeftWidth : 5,
        borderLeftColor : Colors.primary,
        borderRightWidth : 5,
        borderRightColor : Colors.primary,
        borderRadius : 75,
        width : 150,
        height : 150,
        marginBottom : 35,
        overflow : 'hidden',
        padding : 15,
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
    },image:{
        width : "100%",
        height : "100%",
        borderRadius : 50,
    },
    inputBox:{
        width : "80%",
        height : 40,
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        marginBottom : 15,
        
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: "white",
    },input:{
        width : "80%",
        height : "100%",
        padding : 5,
        fontSize : 17,
    },iconBox:{
        width : "20%",
        height : "100%",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
    },
    authButton:{
        backgroundColor : Colors.primary,
        height : 40,
        width : "80%",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        borderRadius: 100,
        marginTop: 15,

        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 20,
    },authText:{
        color : "white",
        fontWeight: 'bold',
        fontSize: 18
    },
    gradientBox:{
        backgroundColor : Colors.primary,
        height : "100%",
        width : "100%",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        borderRadius: 20,
    },
    arrangeButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        marginTop: 10
    }
});

//make this component available to the app
export default LogInScreen;
