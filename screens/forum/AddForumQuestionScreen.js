//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../../constants/Colors';
const shortid = require('shortid');
import moment from 'moment';
import firebase from "firebase";
import Toast, {DURATION} from 'react-native-easy-toast'
import { useDispatch, useSelector } from 'react-redux';

// create a component
const AddForumQuestion = (props) => {
    const [title, setTitle] = useState("")
    const [question, setQuestion] = useState("")
    const user = useSelector(state => state.auth.user)

    const optionButtonClicked = (option) => {
        if(option === "cancel"){
            props.navigation.navigate("Forums")
        }else if(option === "post"){
            handlePost();
        }
    }

    const handlePost = () => {
		let questionId = shortid.generate();
        var date = moment().format("MMM Do YYYY");
        // console.log(user[5])
		if(title != "" && question != ""){
            const poster = {
                title : title.text,
                question : question.text,
				person : user[5],
				date : date,
                id : questionId,
            }
            return firebase.database().ref(`questions/${questionId}`).set(poster)
                    .then(()=>{
                        // this.refs.loginAuth.show("Question posted", 2000);
                        props.navigation.navigate("Forums")
                    }).catch((error)=>{
                        // this.refs.loginAuth.show("Cannot post question", 2000);
                        console.log(error);
                    })
		}
	}

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 17, alignSelf: "flex-start", marginLeft: "5%", marginBottom: 5,}}>Title : </Text>
            <View style = {styles.inputBoxTitle}>
                <TextInput style = {styles.input}
                    autoCorrect={false}
                    secureTextEntry={false}
                    underlineColorAndroid = "transparent"
                    placeholderTextColor = "grey"
                    autoCapitalize = "none"
                    onChangeText = {(text) => setTitle({text})}
                    value={title}
                    multiline={true}
                />
            </View>
            <Text style={{ fontSize: 17, alignSelf: "flex-start", marginLeft: "5%", marginBottom: 5,}}>Description : </Text>
            <View style={styles.inputBoxQuestion}>
                <TextInput style = {styles.question}
                    autoCorrect={false}
                    secureTextEntry={false} 
                    multiline={true}
                    underlineColorAndroid = "transparent"
                    placeholderTextColor = "grey"
                    autoCapitalize = "none"
                    onChangeText = {(text) => setQuestion({text})}
                    value={question}
                />
            </View>
            <View style={styles.buttonOptions}>
                {/* <TouchableOpacity
                    onPress={(cancel) => {optionButtonClicked("cancel")}}
                    style={styles.cancelOptionButton}
                >
                    <Text style={{fontFamily: "open-sans-bold", fontSize: 20, color: Colors.primary}}>Cancel</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={(cancel) => {optionButtonClicked("post")}}
                    style={styles.postQuestionButton}
                >
                    <Text style={{fontSize: 20, color: Colors.primary}}>Post Question</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

AddForumQuestion.navigationOptions = navData => {
    return{
        headerTitle: "Post Question",
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    buttonOptions:{
        width: "80%",
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cancelOptionButton: {
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        height: 50,
        borderRadius: 25,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: "white"
    },
    postQuestionButton: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        padding: 10,
        alignSelf: "flex-end"
    },
    questionBox: {
        borderRadius: 5, 
        width: "90%",
        marginVertical: 10,
        padding : 10,
        height: 300,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        width: "90%",
        marginBottom: 15,
    },
    inputBoxQuestion:{
		width : "90%",
		paddingHorizontal : 10,
		marginBottom : 15,
		height : 280,
		backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
    },question:{
        width : "100%",
        height : "100%",
		fontSize : 17,
    },
    inputBoxTitle: {
        width: "90%",
        height: 60,
        marginBottom: 20,
        justifyContent: "center",
        paddingHorizontal: 10,

        backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
    }
});

//make this component available to the app
export default AddForumQuestion;
