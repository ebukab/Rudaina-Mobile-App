//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const DefaultText = (props) => {
    return <Text style={styles.text}>{props.children}</Text>
};

// define your styles
const styles = StyleSheet.create({
    text: {
        fontFamily: "open-sans"
    },
});

//make this component available to the app
export default DefaultText;
