
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Toast, {DURATION} from 'react-native-easy-toast'

import {canada_province_list} from "../../app-data/canada_province_list"
import {countries} from "../../app-data/list_of_countries"

import { app } from '../../firebase';
import firebase from "firebase";

const colorArray = ["red", "blue", "green", "purple", "orange"]

// create a component
class SignUpScreen extends Component {
    state = {
        email : "",
        password: "",
        userName : "",
        country : "Country",
        province : "Province",
        modalVisible: false,
        editField : ""
    }

    setModalVisible = (visible,value, editField) => {
        if(editField === "province"){
            this.setState({province : value, modalVisible: visible, editField:editField});
        }else if(value !== "Canada"){
            this.setState({country : value, modalVisible: visible, editField:editField, province : "Province",});
        }else{
            this.setState({country : value, modalVisible: visible, editField:editField});
        }
    }

    signUpCheck = () => {
        if(this.state.email != "" && this.state.password != "" && this.state.userName != "" && this.state.country != "Country"){
            if(this.state.country === "Canada"){
                if(this.state.province != "Province"){
                    return this.signUp();
                }
            }else{
                this.signUp();
            }
        }
    }

    signUp = () => {
        const color = colorArray[~~(Math.random() * colorArray.length)]
        app.auth().createUserWithEmailAndPassword(this.state.email , this.state.password).then((u)=>{
            // console.log(u);
            const details = {
                email : this.state.email,
                username : this.state.userName,
                country : this.state.country,
                province : this.state.province,
                uid : u.user.uid,
                color: color
            }

            firebase.database().ref(`users/${u.user.uid}`).set(details).then((u)=>{
                this.refs.loginAuth.show("SignUp & Data add Success", 2000);
                // this.refs.loginAuth.show("Data add Success", 2000);
                this.props.dispatch(details)
                this.props.goToApp("App")
            }).catch((err)=>{
                this.refs.loginAuth.show("Error : could not add data", 2000);
            })
        }).catch((err)=>{
            this.refs.loginAuth.show("Could not signup", 2000);
        })
    };

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

                        <View style={styles.inputBox}>
                            <View style={styles.iconBox}>
                                <Ionicons name="ios-contact" size={25} color={Colors.primary}/>
                            </View>
                            <TextInput style = {styles.input}
                                autoCorrect={false}
                                underlineColorAndroid = "transparent"
                                placeholder = "Username"
                                placeholderTextColor = "grey"
                                autoCapitalize = "none"
                                onChangeText={(text) => this.setState({userName: text })}
                                value={this.state.userName.text}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <View style={styles.iconBox}>
                                <Ionicons  name="md-globe" size={25} color={Colors.primary}/>
                            </View>
                            <TouchableWithoutFeedback
                                style={{width: '100%', height: '100%',display: 'flex',flexDirection : "row" , alignItems: 'center',justifyContent : "center", paddingHorizontal:10,}}
                                onPress={() => {
                                    this.setModalVisible(true,this.state.country, "country");
                                }}
                            >
                                <Text style={{fontSize: 16,marginLeft: 10, color: "grey"}}>{this.state.country === "Country" ? 
                                    <Text style={{color: "grey"}}>{this.state.country}</Text> : 
                                    <Text style={{color: "black"}}>{this.state.country}</Text>
                                }</Text>
                            </TouchableWithoutFeedback>
                        </View>

                        {this.state.country === "Canada" &&
                            <View style={styles.inputBox}>
                                <View style={styles.iconBox}>
                                    <Ionicons  name="md-compass" size={23} color={Colors.primary}/>
                                </View>
                                <TouchableWithoutFeedback
                                    style={{width: '100%', height: '100%',display: 'flex',flexDirection : "row" , alignItems: 'center',justifyContent : "center", paddingHorizontal:10,}}
                                    onPress={() => {
                                        this.setModalVisible(true,this.state.province, "province");
                                    }}
                                >
                                    <Text style={{fontSize: 16,marginLeft: 10}}>{this.state.province}</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        }
    
                        <TouchableOpacity
                            style={styles.authButton}
                            onPress={this.signUp}
                        >
                            <LinearGradient
                                colors={['#fe668e', Colors.primary]}
                                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} 
                                style={styles.gradientBox}
                            >
                                <Text style={styles.authText}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
    
                        <TouchableWithoutFeedback
                            onPress={()=>this.props.toggleScreen("Login")}
                        >
                            <View style={{display: 'flex',flexDirection : "row",alignItems: 'center', width: "80%"}}>
                                <Text style={{color : Colors.primary, fontWeight: 'bold', fontSize : 16, textAlign: "left"}}>Sign In</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{flex: 1,display:"flex",flexDirection : "column",justifyContent:"flex-end",backgroundColor : "rgba(0,0,0,.7)"}}>
                            <TouchableOpacity
                                style={{flex : 1}}
                                onPress={() => {
                                    this.setState({modalVisible : false})
                            }}>
                            </TouchableOpacity>
                            <View style={{height:"50%", backgroundColor : "white"}}>
                                <ScrollView style={{flex: 1,}}>
                                    {this.state.editField === "country" &&
                                        <FlatList
                                            data={countries}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({item}) =>
                                                <TouchableOpacity
                                                    style={{borderBottomWidth : .5, borderBottomColor : "grey", padding : 10 }}
                                                    onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible,item.name, this.state.editField);
                                                    }}>
                                                    <Text style={{fontSize: 16, textAlign : "center", fontWeight: "bold" }}>{item.name} - {item.code}</Text>
                                                </TouchableOpacity>
                                            }
                                            keyExtractor={item => item.code}
                                        />
                                    }
                                    {this.state.editField === "province" &&
                                        <FlatList
                                            data={canada_province_list}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({item}) =>
                                                <TouchableOpacity
                                                    style={{borderBottomWidth : .5, borderBottomColor : "grey", padding : 10 }}
                                                    onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible,item.name, this.state.editField);
                                                    }}>
                                                    <Text style={{fontSize: 16, textAlign : "center", fontWeight: "bold" }}>{item.name} - {item.abbreviation}</Text>
                                                </TouchableOpacity>
                                            }
                                            keyExtractor={item => item.abbreviation}
                                        />
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
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
        marginBottom : 40,
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
        marginBottom : 10,
        marginTop: 15,
        borderRadius: 100,

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
    }
});

//make this component available to the app
export default SignUpScreen;


{/*
signup = (email, password, username, country, province, ) => {
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgTYcSQ_iqylVCuaCtzkgulg_UgWxjAY4",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                }
            ).then((response) => {;
                return response.json();
            }).then((myJson) => {
                // console.log(Object.values(myJson))
                console.log(Object.values(myJson)[Object.values(myJson).length - 1])
                const id =Object.values(myJson)[Object.values(myJson).length - 1]
                // console.log(myJson);
                fetch(
                    `https://rudainanativemobileapp.firebaseio.com/users.json/{id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email, username, country, province,
                        })
                    }
                ).then((response) => {
                    return response.json();
                }).then((myJson) => {
                    // console.log(myJson);
                }).catch((error) => {
                    console.error('Error:', error);
                });
            }).catch((error) => {
                console.error('Error:', error);
            });
    }
*/}
