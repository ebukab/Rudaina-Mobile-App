//import liraries
import React, { useState, useEffect, Component  } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as articleActions from "../../store/actions/articleActions";
import { useDispatch, useSelector } from 'react-redux';

import { app } from '../../firebase';
import firebase from "firebase";

let user = null;
// create a component
const updateUSer = (props) => {
    // const [articles, setArticles] = useState([])
    // const dispatch = useDispatch();
    // const articles = useSelector(state => state.article.articles)
    user = useSelector(state => state.auth.user)

    // useEffect(() => {
    //     dispatch(articleActions.updateArticles())
    // }, [dispatch]);

    // console.log("here are the articles : ", Object.entries(useSelector(state => state.article.articles))[0][1]);
    // console.log("here are the articles : ", useSelector(state => state.article.articles));

    
};


// create a component
class ArticleScreen extends Component {
    state = {
        articles : [],
        isRefreshing : false
    }

    fetchArticles = () => {
        this.setState({isRefreshing : true})
        firebase.database().ref('articles').once('value' , (data)=>{
            if(data.toJSON() != null){
                console.log("articles available", Object.values(data.toJSON()).length)
                this.setState({articles : Object.values(data.toJSON()), isRefreshing : false})
            }
        })
    }

    componentDidMount() {
        this.fetchArticles()
    }
    

    render() {
        // console.log("here are the articles", this.state.articles)
        let articles = this.state.articles
        return (
            <View style={{flex: 1, backgroundColor: "white" }}>
                <View style={{flex: 1, }}> 
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.fetchArticles} />} style={{flex: 1, backgroundColor: "white" }}>
                        {this.state.articles.map((item)=>
                            <TouchableOpacity 
                                style={{width: "90%", height: 300, marginVertical: 20, alignSelf: "center"}} 
                                onPress = {()=>{this.props.navigation.navigate({routeName: 'ArticleDetail',params: {article: item}})}}
                                id={item.id}
                            >
                                <View style={styles.articleItem}>
                                    <View style={styles.imageContainer}>
                                        <Image 
                                            style={{width: "100%", height: "100%"}}
                                            source={{uri: item.image}}
                                        />
                                    </View>
                                    <View style={styles.articleFooter}>
                                        <Text style={{ fontFamily: "open-sans-bold", fontSize: 19}}>
                                            {item.title.substring(0,62)}...
                                        </Text>
                                    </View>
                                    <View style={styles.articleHeader}>
                                        <Text style={{color: Colors.primary, fontFamily: "open-sans-bold"}}>{item.author.toUpperCase()}</Text>
                                        <Text style={{color: "grey", fontFamily: "open-sans-bold"}}>{item.date}</Text>
                                        {/*<MaterialIcons name={true ? "bookmark-border" : "bookmark" } size={35} color={Colors.primary} />*/}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

// const cat = <FlatList
//     onRefresh={this.fetchArticles}
//     refreshing={this.state.isRefreshing}
//     data={articles}
//     showsVerticalScrollIndicator={false}
//     style={{flex: 1, width: "100%",  }}
//     renderItem={({item}) =>
//         <ScrollView style={{flex: 1, backgroundColor: "white" }}>
//             <TouchableOpacity 
//                 style={{width: "90%", height: 300, marginVertical: 20, alignSelf: "center"}} 
//                 onPress = {()=>{this.props.navigation.navigate({routeName: 'ArticleDetail',params: {article: item}})}}
//             >
//                 <View style={styles.articleItem}>
//                     <View style={styles.imageContainer}>
//                         <Image 
//                             style={{width: "100%", height: "100%"}}
//                             source={{uri: item.image}}
//                         />
//                     </View>
//                     <View style={styles.articleFooter}>
//                         <Text style={{ fontFamily: "open-sans-bold", fontSize: 19}}>
//                             {item.title}
//                         </Text>
//                     </View>
//                     <View style={styles.articleHeader}>
//                         <Text style={{color: Colors.primary, fontFamily: "open-sans-bold"}}>{item.author}</Text>
//                         <Text style={{color: "grey", fontFamily: "open-sans-bold"}}>{item.date}</Text>
//                         {/*<MaterialIcons name={true ? "bookmark-border" : "bookmark" } size={35} color={Colors.primary} />*/}
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         </ScrollView>
//     }
//     keyExtractor={(item) => item.id}
// />

ArticleScreen.navigationOptions = navData =>{ return{
    // headerRight: ()=> (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //         <Item 
    //             title = "Bookmarks"
    //             iconName = "collections-bookmark"
    //             // onPress = {()=>{navData.navigation.navigate("Bookmarks")}}
    //             onPress = {()=>{navData.navigation.navigate({routeName: 'Bookmarks',params: {userUid: user.user.uid}})}}
    //             // navigation.navigate({routeName: 'Bookmarks',params: {userUid: user.user.uid}})
    //         />
    //     </HeaderButtons>
    // ),
    headerLeft: ()=> (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title = "Cart"
                iconName = "menu"
                onPress = {()=>{navData.navigation.toggleDrawer()}}
            />
        </HeaderButtons>
    ),
}}

// define your styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: "100%",
        width: "100%",
    },
    articleItem:{
        width: "100%",
        shadowColor: "black",
        shadowOpacity: .26,
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: "white",
        height: "100%",
    },
    imageContainer:{
        height: "60%",
        backgroundColor: "transparent",
        width: "100%",
        overflow: "hidden",
        borderTopRightRadius : 5,
        borderTopLeftRadius : 5,
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
        justifyContent: "center",
    }
});

//make this component available to the app
export default ArticleScreen;
