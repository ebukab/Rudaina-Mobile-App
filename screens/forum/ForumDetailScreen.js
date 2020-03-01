//import liraries
import React, { useState, } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TextInput, FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as forumActions from '../../store/actions/forumActions'
import moment from 'moment';
const shortid = require('shortid');
import Toast, {DURATION} from 'react-native-easy-toast'
import firebase from "firebase";

// create a component
const ForumDetailScreen = (props) => {
    const [message, setMessage] = useState("")
    let anyReplies = []
    if(props.navigation.getParam("item").replies){
        anyReplies = Object.values(props.navigation.getParam("item").replies)
        // console.log("here are the replies",Object.values(props.navigation.getParam("item").replies));
    }
    const [replies, setReplies] = useState(anyReplies)

    const dispatch = useDispatch();
    const question = props.navigation.getParam("item")
    const user = useSelector(state => state.auth.user)
    // console.log("here IS the QUESTION",question);

    const postMessage = () => {
        // console.log(moment().format("MMM Do YYYY"))
        // console.log("message",message.text)
        let questionId = shortid.generate();
        let date = moment().format("MMM Do YYYY");
        let replyId = shortid.generate();
        const reply = {
            reply : message.text,
            person : user[5],
            date : date,
            id : replyId,
            replyPersonId: user.user.uid,
            color: user[0]
        }
        // console.log("type of replies",typeof replies)  
        // console.log("Here is the result of concat",Object.values({...Object.values(replies), reply}))  
        console.log(questionId)
        if(message != ""){
			return firebase.database().ref(`questions/${question.id}/replies/${replyId}`).set(reply).then(()=>{
                setMessage("")
                //console.log("Here is the result of concat",{...replies, ...reply})  
                setReplies(Object.values({...Object.values(replies), reply}))
            }).catch((error)=>{
				console.log(error);
            })
		}
    }
    
    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1,}}>
                <View style={styles.question}>
                    <View style={styles.forumItem}>
                        <View style={styles.forumFooter}>
                            <View style={styles.textBox}>
                                <Text style={{fontFamily: "open-sans-bold", color: "black"}}>{question.person}.  <Text style={{color: "grey", fontFamily: "open-sans"}}>{question.date}</Text></Text>
                            </View>
                        </View>
                        <Text style={{fontFamily: "open-sans", fontSize: 15, marginVertical: 10}}>
                            {question.question}
                        </Text>
                        {/*<View style={{alignItems: 'flex-end'}}>
                            <View style={{flexDirection: "row", alignItems: "center", }}>
                                <MaterialIcons  name="forum" size={26} color= {Colors.primary}/>
                                <Text style={{color: "grey", marginLeft: 5}}>339 Replies</Text>
                            </View>
                        </View>*/}
                    </View>
                </View>
                <View style={{paddingHorizontal: 15, borderBottomColor: "#ccc", borderBottomWidth: .5,paddingBottom: 15}}>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => setMessage({text})}
                            value={message}
                            placeholder="Enter Reply ..."
                        />
                        <TouchableHighlight style={styles.sendIconContainer} onPress={postMessage}>
                            <View>
                                <Ionicons name="ios-send" size={25} color="white"/>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.replies}>
                    <FlatList
                        data={replies}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1, width: "100%",  }}
                        renderItem={({item}) =>
                            <View style={{marginBottom: 15,}}>
                                <Text style={{marginBottom: 3,fontFamily: "open-sans-bold", color: item.color ? item.color : "red"}}>{item.person[0].toUpperCase() + item.person.slice(1)}</Text>
                                <View style={{...styles.reply, ...{borderLeftColor: item.color ? item.color : "red"}}}>
                                    <Text style={{fontFamily: "open-sans"}}>{item.reply}</Text>
                                </View>
                            </View>
                        }
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

ForumDetailScreen.navigationOptions = navData =>{ return{
    headerTitle: "Forum",
}}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    forumItem:{
        // shadowColor: "black",
        // shadowOpacity: .26,
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 8,
        // elevation: 5,
        backgroundColor: "white",
        padding: 15,
    },
    forumFooter: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    details: {
        width: "65%",
    },
    buttonContainer: {
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        padding: 3,
        width: "90%",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.primary
    },
    replies:{
        padding: 15,
    },
    reply:{
        backgroundColor: "#f2f2f2", 
        padding: 7, 
        borderRadius: 5,
        borderLeftColor: "red",
        borderLeftWidth: 4,
    },
    inputBox: {
        display : "flex",
        flexDirection : "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width : '100%',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius : 30,
        overflow : 'hidden',
        padding : 3,
    },inputText : {
        height: 40,
        width : '85%',
        paddingLeft: 5,
        paddingRight: 5,
    },sendIconContainer:{
        height: 36,
        width: 36,
        backgroundColor: Colors.primary,
        display : "flex",
        flexDirection : "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,

    }
});

//make this component available to the app
export default ForumDetailScreen;
