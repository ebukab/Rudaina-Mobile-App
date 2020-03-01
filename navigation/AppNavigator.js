import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ArticleScreen from '../screens/articles/ArticleScreen';
import ArticleDetailScreen from '../screens/articles/ArticleDetailScreen';
import ArticleBookmarks from '../screens/articles/ArticleBookmarks';
import TrackerScreen from '../screens/tracker/TrackerScreen';
import TrackerItemScreen from '../screens/tracker/TrackerItemScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesome, Foundation, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ForumScreen from '../screens/forum/ForumScreen';
import ForumDetailScreen from '../screens/forum/ForumDetailScreen';
import AddForumQuestion from '../screens/forum/AddForumQuestionScreen';
import AuthScreen from '../screens/auth/authScreen';
import AccountScreen from '../screens/account/AccountScreen';

const ArticleNavigator = createStackNavigator({
    Articles: ArticleScreen,
    ArticleDetail: ArticleDetailScreen,
    Bookmarks: ArticleBookmarks
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (
            <FontAwesome
                name="newspaper-o"
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "white"
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: "open-sans-bold"
        },
        headerBackTitleStyle: {
            fontFamily: "open-sans"
        },
    }
})

const AccountNavigator = createStackNavigator({
    Account: AccountScreen,
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (
            <MaterialCommunityIcons
                name="account"
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "white"
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: "open-sans-bold"
        },
        headerBackTitleStyle: {
            fontFamily: "open-sans"
        },
    }
})

const ForumNavigator = createStackNavigator({
    Forums: ForumScreen,
    ForumDetail: ForumDetailScreen,
    AddForumQuestion : AddForumQuestion
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (
            <MaterialIcons
                name="forum"
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "white"
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: "open-sans-bold"
        },
        headerBackTitleStyle: {
            fontFamily: "open-sans"
        },
    }
})

const TrackerNavigator = createStackNavigator({
    Tracker: TrackerScreen,
    TrackerItem: TrackerItemScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (
            <Foundation
                name="graph-pie"
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "white"
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: "open-sans-bold"
        },
        headerBackTitleStyle: {
            fontFamily: "open-sans"
        },
    }
})

const AuthNavigator = createStackNavigator({
    AuthScreen: AuthScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "white"
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: "open-sans-bold"
        },
        headerBackTitleStyle: {
            fontFamily: "open-sans"
        },
    }
})

const AppNavigator = createDrawerNavigator({
    Tracker: TrackerNavigator,
    Articles: ArticleNavigator,
    Forum: ForumNavigator,
    Account : AccountNavigator
},{
    contentOptions:{
        activeTintColor: Colors.primary
    }
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    App: AppNavigator
})

export default createAppContainer(MainNavigator);