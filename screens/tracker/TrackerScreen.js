//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SceneView, ScrollView } from 'react-navigation';
import Colors from '../../constants/Colors';
import { MaterialIcons, Ionicons, Foundation } from '@expo/vector-icons';
import HeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const TrackerItems = [
    {icon: ""}
]

// create a component
const TrackerScreen = (props) => {
    return (
        <View style={styles.screen}>
            <ScrollView style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconOuterContainer}>
                            <View style={styles.iconInnerContainer}>
                                <Foundation  name="graph-pie" size={230} color="white"/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={{fontFamily: "open-sans-bold", fontSize: 23, color: Colors.primary, marginBottom: 10}}>Assessment</Text>
                        <View style={styles.shadowEffect}>
                            <View style={styles.infoOuterContainer}>
                                <View style={styles.infoInnerContainer}>
                                    <Text style={{fontSize: 17,}}>
                                        Welcome! Keep track of your progress in these areas ...                                
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.itemsContainer}>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    props.navigation.navigate({
                                        routeName : "TrackerItem",
                                        params : {
                                            title : "Weight"
                                        }
                                    })
                                }}
                            >
                                    <Ionicons  name="ios-man" size={55} color="#20A440"/>
                                    <Text style={{fontFamily: "open-sans-bold", fontSize: 16,color:"#20A440"}}>Weight</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    props.navigation.navigate({
                                        routeName : "TrackerItem",
                                        params : {
                                            title : "Exercise"
                                        }
                                    })
                                }}
                            >
                                    <Ionicons  name="ios-fitness" size={55} color="#FFAA22"/>
                                    <Text style={{fontFamily: "open-sans-bold", fontSize: 16,color:"#FFAA22"}}>Exercise</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    props.navigation.navigate({
                                        routeName : "TrackerItem",
                                        params : {
                                            title : "Sleep"
                                        }
                                    })
                                }}
                            >
                                    <Ionicons  name="ios-bed" size={55} color="#625EDB"/>
                                    <Text style={{fontFamily: "open-sans-bold", fontSize: 16,color:"#625EDB"}}>Sleep</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    props.navigation.navigate({
                                        routeName : "TrackerItem",
                                        params : {
                                            title : "Circumference"
                                        }
                                    })
                                }}
                            >
                                    <Ionicons  name="ios-body" size={55} color="#C71538"/>
                                    <Text style={{fontFamily: "open-sans-bold", fontSize: 16,color:"#C71538"}}>Circumference</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

TrackerScreen.navigationOptions = navData =>{ return{
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
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        width: "100%",
        height: "100%",
    },
    contentContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    itemsContainer:{
        width: "85%",
    },
    itemContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
    },
    item: {
        width: "45%",
        height: 150,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainer: {
        width: "100%",
        height: 250,
        alignItems: "flex-end"
    },
    iconOuterContainer: {
        backgroundColor: Colors.primary,
        width: 250,
        height: 250,
        borderRadius: 125
    },
    iconInnerContainer: {
        backgroundColor: "#fe99b3",
        width: 230,
        height: 230,
        borderRadius: 115,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer:{
        width: "85%",
        marginVertical: 15,
    },
    infoOuterContainer: {
        width: "100%", 
        backgroundColor: Colors.primary, 
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden"
    },
    infoInnerContainer: {
        width: "100%", 
        backgroundColor: "white", 
        borderRadius: 20,
        padding: 15,
        overflow: "hidden"
    },
    shadowEffect:{
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 20,
        backgroundColor: "white",
    },
    chart: {
        width: 200,
        height: 200,
    },
});

//make this component available to the app
export default TrackerScreen;
