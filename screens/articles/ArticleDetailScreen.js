//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/CustomHeaderButton';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as articleActions from "../../store/actions/articleActions"

let user = null;
let dispatch = null;
// create a component
const ArticleDetailScreen = (props) => {
    const article = props.navigation.getParam('article');
    const articleText = article.articleText;
    var articleTexts = articleText.split('BREAK')
    user = useSelector(state => state.auth.user)
    dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <ScrollView style={{width: "100%", height: "100%", paddingVertical: 15}}>
                <View style={{flex: 1, alignItems: "center", marginBottom: 40}}>
                    <View style={styles.image}>
                        <Image 
                            style={{width: "100%", height: "100%", borderRadius: 5,}}
                            source={{uri: article.image}}
                        />
                    </View>
                    <View style={{width: "95%", marginBottom: 5, }}>
                        <Text style={{fontFamily: "open-sans-bold", fontSize: 18, marginVertical: 5 }}>
                            {article.title}
                        </Text>
                        <Text style={{fontFamily: "open-sans", fontSize: 16, color: Colors.primary, marginBottom: 15}}>
                            By, {article.author}
                        </Text>
                        {articleTexts.map((text)=><Text style={{fontFamily: "open-sans", fontSize: 16, marginVertical: 5}}>{text}</Text>)}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

ArticleDetailScreen.navigationOptions = navData =>{ 
    const article = navData.navigation.getParam('article');
    const addToBookmarks = () => {
        // console.log("adding to bookmarks", article)
        dispatch(articleActions.addToBookmark(user.user.uid, article))
    }

    return{
        headerTitle: "",
        // headerRight: ()=> (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item 
        //             title = "Cart"
        //             iconName = {true ? "bookmark" : "bookmark-border"}
        //             onPress = {addToBookmarks}
        //         />
        //     </HeaderButtons>
        // )
    }
}

const addToBookmarks = () => {
    console.log("adding to bookmarks")
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    image: {
        width: "95%",
        height: 200,
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        marginBottom: 10
    }
});

//make this component available to the app
export default ArticleDetailScreen;
