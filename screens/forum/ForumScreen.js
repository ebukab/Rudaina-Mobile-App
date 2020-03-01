//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import HeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firebase from "firebase";

// create a component
const ForumScreen = (props) => {
    const [questions, setQuestions] = useState(null)
    const dispatch = useDispatch();
    // let forumQuestions = useSelector(state => state.forum.questions)
    // const user = useSelector(state => state.auth.user)
    console.log("here are the forum Questions", questions);
    // let forumQuestions = {}
    // firebase.database().ref('questions').on('value' , (data)=>{
    //     if(data.toJSON() != null){ 
    //         // console.log("ARTICLEs here  ");
    //         // console.log(Object.values(data.toJSON()).length);
    //         setQuestions(Object.values(data.toJSON()))
    //     }
    // })


    useEffect(() => {
        firebase.database().ref('questions').on('value' , (data)=>{
            if(data.toJSON() != null){ 
                // console.log("ARTICLEs here  ");
                // console.log(Object.values(data.toJSON()).length);
                setQuestions(Object.values(data.toJSON()))
            }
            // console.log("questions updated", initialState.questions);
        })
    }, [dispatch]);
    
    return (
        <ScrollView style={{flex: 1,}}>
            <View style={styles.container}>
                <FlatList
                    data={questions}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, width: "100%",  }}
                    renderItem={({item}) =>
                        <View style={{borderBottomColor : "#ccc", borderBottomWidth: 1,}}>
                            <TouchableOpacity style={styles.forumItem} onPress = {()=>{props.navigation.navigate('ForumDetail', {item: item})}}>
                                <View style={styles.textBox}>
                                    <Text style={{fontFamily: "open-sans-bold", color: "grey"}}>{item.person}.  {/*<Text style={{color: "grey", fontFamily: "open-sans"}}>{item.date}</Text>*/}</Text>
                                </View>
                                <Text style={{fontFamily: "open-sans-bold", fontSize: 16, marginVertical: 10, }}>
                                    {item.title.substring(0,150)}...
                                </Text>
                                <View style={styles.forumFooter}>
                                    <Text style={{color: "grey", fontFamily: "open-sans"}}>{item.date}</Text>
                                    <View style={styles.details}>
                                        <View style={{flexDirection: "row", alignItems: "center", }}>
                                            <MaterialIcons  name="forum" size={26} color={Colors.primary}/>
                                            <Text style={{color: "grey", marginLeft: 5}}>{item.replies != null ? `${Object.values(item.replies).length} Replies` : "0 Replies"}</Text>
                                        </View>
                                    </View>
                                    {/*<View style={styles.buttonContainer}>
                                        <View style={styles.button}>
                                            <Button style={{fontFamily: "open-sans-bold"}} color={Colors.primary} title="View" onPress = {()=>{
                                                props.navigation.navigate('ForumDetail', {item: item})
                                                }}
                                            />
                                        </View>
                                    </View>*/}
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
        </ScrollView>
    );
};

//props.navigation.navigate({routeName: 'ForumDetail',params: {question: item}})

ForumScreen.navigationOptions = navData =>{ return{
    headerTitle: "Question",
    headerLeft: ()=> (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title = "Forum"
                iconName = "menu"
                onPress = {()=>{navData.navigation.toggleDrawer()}}
            />
        </HeaderButtons>
    ),
    headerRight: ()=> (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title = "Ask"
                iconName = "add"
                onPress = {()=>{navData.navigation.navigate("AddForumQuestion")}}
            />
        </HeaderButtons>
    )
}}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        height: "100%",
    },
    forumItem:{
        width: "90%",
        marginVertical: 15,
        alignSelf: "center",

        // shadowColor: "black",
        // shadowOpacity: .26,
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 8,
        // elevation: 5,
        // borderRadius: 10,
        // backgroundColor: "white",
        // padding: 15,
        // alignSelf: "center",
    },
    forumFooter: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    details: {
        alignSelf: "flex-end"
    },
    buttonContainer: {
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    button: {
        width: "90%",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.primary,
        overflow: "hidden"
    }
});

//make this component available to the app
export default ForumScreen;
