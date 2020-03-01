//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import HeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


// create a component
const TrackerItemScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.graph}>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June","January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                                }
                            ]
                        }}
                        width={.95*Dimensions.get("window").width} // from react-native
                        height={.438*Dimensions.get('window').height}
                        yAxisLabel={"$"}
                        yAxisSuffix={"k"}
                        chartConfig={{
                            backgroundColor: "white",
                            backgroundGradientFrom: "white",
                            backgroundGradientTo: "white",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "1",
                                strokeWidth: "6",
                                stroke: Colors.primary
                            }
                        }}
                        bezier
                        style={{
                            borderRadius: 10,
                        }}
                    />
                </View>
                <View style={styles.items}>
                    <ScrollView style={{width: "100%", height: "100%"}}>
                        <View style={styles.item}>
                            <View style={styles.mainValueContainer}>
                                <Text style={styles.mainValue}>62 kg</Text>
                            </View>
                            <View style={styles.dateContainer}>
                                <Text style={styles.date}>June 30, 2019</Text>
                            </View>
                            <TouchableOpacity onPress={()=> {}} style={styles.iconContainer}>
                                <Ionicons  name="ios-options" size={23} color= {Colors.primary}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setModalVisible(true)}} style={styles.iconContainer}>
                                <Ionicons  name="ios-trash" size={23} color= {Colors.primary}/>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
            }}>
                <View style={styles.deleteContainer}>
                    <View style={styles.deleteBox}>
                        <Text style={{fontSize: 21, fontFamily: "open-sans-bold"}}>Confirmation</Text>
                        <Text style={{fontSize: 18, textAlign: "center", marginVertical: 15,}}>Are you sure you want to delete this entry?</Text>
                        <View style={styles.deleteOptions}>
                            <TouchableOpacity
                                onPress={() => {setModalVisible(false)}}
                                style={styles.deleteOptionCancel}
                            >
                                <Text style={{fontFamily: "open-sans-bold", fontSize: 20, color: Colors.primary}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {setModalVisible(false)}}
                                style={styles.deleteOptionDelete}
                            >
                                <Text style={{fontFamily: "open-sans-bold", fontSize: 20, color: "white"}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

TrackerItemScreen.navigationOptions = navData => {
    return{
        headerTitle: navData.navigation.getParam("title"),
        headerRight: ()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title = "Cart"
                    iconName = "add"
                    onPress = {()=>{navData.navigation.navigate("Tracker")}}
                />
            </HeaderButtons>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        height: "100%",
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background,
        paddingVertical: 10,
    },
    graph:{
        width: .95*Dimensions.get("window").width,
        height: "50%",
        backgroundColor: "red",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
    },
    items:{
        width: "95%",
        height: "45%",
        backgroundColor: "blue",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
    },
    item:{
        backgroundColor: "red",
        width: "100%",
        height: 50,
        backgroundColor: Colors.background,
        marginBottom: 10,
        display : "flex",
        flexDirection : "row",
        alignItems: 'center',
        justifyContent : "space-between"
    },
    iconContainer:{
        width : '15%',
        height: '100%',
        display : "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        padding : "auto",
        borderWidth: 1,
        borderColor: "#fe7fa1"
    },
    mainValueContainer:{
        width : '20%',
        display : "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },mainValue:{
        fontSize: 20,
        color: Colors.mainColor,
        fontFamily: "open-sans-bold"
    },dateContainer:{
        width : '40%',
        display : "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },date:{
        fontSize: 17,
        color: "grey"
    },
    deleteContainer:{
        flex: 1,
        backgroundColor: "rgba(217,217,217,.7)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBox: {
        width: "80%",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 15,
        textAlign: "center"
    },
    deleteOptions:{
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    deleteOptionCancel: {
        height: 50,
        borderRadius: 25,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        overflow: "hidden"
    },
    deleteOptionDelete:{
        height: 50,
        borderRadius: 25,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        overflow: "hidden"
    }
});

//make this component available to the app
export default TrackerItemScreen;
