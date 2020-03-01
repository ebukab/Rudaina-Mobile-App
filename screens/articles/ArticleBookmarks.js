//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import * as articleActions from "../../store/actions/articleActions";

const ArticleBookmarks = (props) => {
    const availableBookmarks = false;
    const dispatch = useDispatch();

    // console.log("Article bookmarks Id",props.navigation.getParam('userUid') )
    const result = dispatch(articleActions.getBookmarks(props.navigation.getParam('userUid')))
    // console.log("results of bookmarks dispatch", result )
    const bookmarks = useSelector(state => state.article.bookmarks)
    console.log("current bookmarks", bookmarks )

    // const user = useSelector(state => state.auth.user)
    // console.log("i am in article bookmarks",user.user.uid )
    // const result = dispatch(articleActions.getBookmarks(user.user.uid))
    // console.log("results of bookmarks dispatch", result )
    // const bookmarks = useSelector(state => state.article.bookmarks)
    // console.log("here are the bookmarks",bookmarks )
    // useEffect(() => {
    //     console.log("i am in usEffect add to bookmarks",user.user.uid )
    //     dispatch(articleActions.getBookmarks(user.user.uid))
    // }, [dispatch]);

    useEffect(() => {
        // const user = useSelector(state => state.auth.user)
        // dispatch(articleActions.getBookmarks(props.navigation.getParam('userUid')))
        console.log("i am in useeffect")
    }, [dispatch]);

    return (
        
        <ScrollView style={{flex: 1, backgroundColor: "white" }}>
            <View style={{flex: 1, }}>  
                <FlatList
                    data={useSelector(state => state.article.bookmarks)}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, width: "100%",  }}
                    renderItem={({item}) =>
                            <TouchableOpacity 
                                style={{width: "90%", height: 300, marginVertical: 20, alignSelf: "center"}} 
                                onPress = {()=>{props.navigation.navigate({routeName: 'ArticleDetail',params: {article: item}})}}
                            >
                                <View style={styles.articleItem}>
                                    <View style={styles.imageContainer}>
                                        <Image 
                                            style={{width: "100%", height: "100%"}}
                                            source={{uri: item.image}}
                                        />
                                    </View>
                                    <View style={styles.articleHeader}>
                                        <Text style={{color: "grey", fontFamily: "open-sans-bold"}}>{item.author}</Text>
                                        <MaterialIcons name={true ? "bookmark-border" : "bookmark" } size={35} color={Colors.primary} />
                                    </View>
                                    <View style={styles.articleFooter}>
                                        <Text style={{ fontFamily: "open-sans-bold", fontSize: 19}}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: "100%",
        width: "100%",
        backgroundColor: "white",
    },
    articleItem:{
        width: "100%",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        height: "100%",
    },
    imageContainer:{
        height: "60%",
        backgroundColor: "red",
        width: "100%",
        overflow: "hidden",
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
    },
    articleHeader:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 3,
        height: "15%",
    },
    articleFooter:{
        height: "25%",
        paddingHorizontal: 10,
        paddingVertical: 3,
    }
});

//make this component available to the app
export default ArticleBookmarks;
