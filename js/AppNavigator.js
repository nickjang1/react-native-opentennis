'use strict';

import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash/core';
import { Drawer } from 'native-base';
import { closeDrawer } from './actions/drawer';
import { popRoute } from './actions/route';
import Navigator from 'Navigator';

import Login from './components/login/';
import ForgotPassword from './components/forgotPassword/';
import SplashPage from './components/splashscreen/';
import Home from './components/home/';
import Messages from './components/messages/';
import Detail from './components/detail/';
import SendMsg from './components/sendMsg/';
import EditProfile from './components/editProfile/';
import CompleteProfile from './components/completeProfile/'
import Track from './components/track/';
import Profile from './components/profile/';
import About from './components/about/';
import SideBar from './components/sideBar/';
import SignUp from './components/signup/';
import { statusBarColor } from "./themes/base-theme";
var DeviceInfo = require('react-native-device-info');


Navigator.prototype.replaceWithAnimation = function (route) {
    const activeLength = this.state.presentedIndex + 1;
    const activeStack = this.state.routeStack.slice(0, activeLength);
    const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
    const nextStack = activeStack.concat([route]);
    const destIndex = nextStack.length - 1;
    const nextSceneConfig = this.props.configureScene(route, nextStack);
    const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

    const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
    this._emitWillFocus(nextStack[destIndex]);
    this.setState({
        routeStack: nextStack,
        sceneConfigStack: nextAnimationConfigStack,
    }, () => {
        this._enableScene(destIndex);
        this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
            this.immediatelyResetRouteStack(replacedStack);
        });
    });
};

export var globalNav = {};
export var exit = false;

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        var currentState = state;

        if(currentState){
            while (currentState.children){
                currentState = currentState.children[currentState.index]
            }
        }
        return defaultReducer(state, action);
    }
};

const drawerStyle  = { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3};

class AppNavigator extends Component {

    constructor(props){

        super(props);

    }

    componentDidMount() {
        globalNav.navigator = this._navigator;
        globalNav.sidebar = this._sidebar;

        this.props.store.subscribe(() => {
            if(this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer();

            if(this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close();
        });

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes();
            if (exit === true) {
                BackAndroid.exitApp();
            } else {
                exit = true;
                this.popRoute();
                ToastAndroid.show('Please click double for exit!', ToastAndroid.SHORT)
                setTimeout (() => {
                    exit = false;
                }, 500);
                
                return true;
            }
        });
        this.putDeviceId();
    }
    putDeviceId() {
        fetch('http://test.tenislab.com.pl/api/device.json', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                device_id: DeviceInfo.getUniqueID()
            }),
           
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log('device token succeed!');
        })
        .done();
    }
    popRoute() {
        this.props.popRoute();
    }

    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if(this.props.store.getState().drawer.drawerState == 'opened') {
            this._drawer.close();
            this.props.closeDrawer();
        }
    }

    render() {
        var sidebar = <SideBar ref={(ref) => this._sidebar = ref} navigator={this._navigator} />;
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type='overlay'
                content={sidebar}
                tapToClose={true}
                acceptPan={false}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
                >
                <StatusBar
                    backgroundColor={statusBarColor}
                    barStyle='light-content'
                />
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.FadeAndroid;
                    }}
                    initialRoute={{id: (Platform.OS === 'android') ? 'splashscreen' : 'home', statusBarHidden: true}}
                    renderScene={this.renderScene}
                  />
            </Drawer>
        );


    }

    renderScene(route, navigator) {
        switch (route.id) {
          case 'splashscreen':
              return <SplashPage navigator={navigator} />;
          case 'login':
              return <Login navigator={navigator} />;
          case 'forgot':
              return <ForgotPassword navigator={navigator} />;
          case 'signup':
              return <SignUp navigator={navigator} />;
          case 'home':
              return <Home navigator={navigator} />;
          case 'detail':
              return <Detail navigator={navigator} {...route.passProps}/>;
          case 'editProfile':
              return <EditProfile navigator={navigator} />;
          case 'complete':
              return <CompleteProfile navigator={navigator} />;
          case 'messages':
              return <Messages navigator={navigator} />;
          case 'sendMsg':
              return <SendMsg navigator={navigator} {...route.passProps}/>;
          case 'track':
              return <Track navigator={navigator} />;
          case 'profile':
              return <Profile navigator={navigator} />;
          case 'about':
              return <About navigator={navigator} />;
          default :
              return <SplashPage navigator={navigator} />;
        }
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

const mapStateToProps = (state) => {
    return {
        drawerState: state.drawer.drawerState
    }
}

export default connect(mapStateToProps, bindAction) (AppNavigator);
