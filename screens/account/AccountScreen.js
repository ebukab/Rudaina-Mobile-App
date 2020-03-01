//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { app } from '../../firebase';
import firebase from "firebase";

// create a component
const AccountScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.signOutButton}
                onPress={()=> app.auth().signOut().then(()=>{props.navigation.navigate("AuthScreen")})}
            >
                <Text style={{color: "white", textAlign: "center", fontFamily: "open-sans-bold", fontSize: 17}}>Sign Out</Text>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

AccountScreen.navigationOptions = navData =>{ return{
    headerLeft: ()=> (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title = "Cart"
                iconName = "menu"
                onPress = {()=>{navData.navigation.toggleDrawer()}}
            />
        </HeaderButtons>
    )
}}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    signOutButton:{
        backgroundColor: Colors.primary,
        width: "90%",
        borderRadius: 10,
        alignSelf: "center",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,

        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 8,
        elevation: 5,
    }
});

//make this component available to the app
export default AccountScreen;
