
'use strict';

import React, { Component } from 'react';
import { Image, Platform, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { Container, Header,Content, Text, InputGroup, Input, Button, Icon, View } from 'native-base';
import { pushNewRoute, replaceRoute } from '../../actions/route';
import {popRoute} from '../../actions/route';
import login from './login-theme';
import styles from './styles';
import theme from '../../themes/base-theme';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
var DeviceInfo = require('react-native-device-info');
var TOKEN = 'TOKEN';
var REFRESH_TOKEN = 'REFRESH_TOKEN';

import {globalSideBar} from '../sideBar/index.js';


var LoginBehavior = {
  'ios': FBLoginManager.LoginBehaviors.Browser,
  'android': FBLoginManager.LoginBehaviors.Native
}



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            scroll: false,
            isLoading: false,
        };
    }
    
    loginWithFacebook() {
      var _this = this;
      FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
        if (!error) {
          _this.setState({
            isLoading: true,
          })
          fetch('http://test.tenislab.com.pl/api/auth/facebook.json', {
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               method: "POST",
               body: JSON.stringify({
                    facebook_token: data.credentials.token,
                    country: 'pl'
                })
          })
          .then((response) => response.json())
          .then((responseData) => {
                if(responseData.code===500) {
                        alert('Please type your correct email and password!');
                        _this.setState({
                            isLoading: false
                        })
                }else {
                    AsyncStorage.setItem(TOKEN, responseData.token);
                    AsyncStorage.setItem(REFRESH_TOKEN, responseData.refresh_token);
                    globalSideBar.sidebar.fetchProfileData(responseData.token);
                    _this.setState({
                        isLoading: false,
                    });
                    _this.putDeviceId(responseData.token);
                    if (globalSideBar.sidebar.state.profileInfo.profile_complete === true) {
                        _this.replaceRoute('home');
                    } else {
                        _this.replaceRoute('track');
                    }
                }
          })
          .done();
        } else {
          console.log('FACEBOOK LOGIN ERROR: ', data);
        }
      });
    }

    login() {
        this.setState({
            isLoading: true,
        })
        fetch('http://test.tenislab.com.pl/api/login_check', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _username: this.state.email,
                _password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            
            if(responseData.code===401) {
                alert('Please type your correct email and password!');
                this.setState({
                    isLoading: false
                })
            }else {
                AsyncStorage.setItem(TOKEN, responseData.token);
                AsyncStorage.setItem(REFRESH_TOKEN, responseData.refresh_token);
                globalSideBar.sidebar.fetchProfileData(responseData.token);
                this.setState({
                    isLoading: false,
                });
                this.putDeviceId(responseData.token);
                if (globalSideBar.sidebar.state.profileInfo.profile_complete === true) {
                    this.replaceRoute('home');
                } else {
                    this.replaceRoute('track');
                }
                
            }
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
            })
        })
        .done();
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }

    putDeviceId(token) {
        fetch('http://test.tenislab.com.pl/api/device.json', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer {' + token + '}',
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
    
    render() {
        return (
            <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
                <Header style={{justifyContent: 'flex-start', height:(Platform.OS==='ios') ? 60 : 45}}>
                    <Button transparent onPress={() => this.replaceRoute('home')} style={{marginLeft: -10}}>
                        <Icon name="ios-arrow-round-back-outline" style={{fontSize: 38, lineHeight: 42}}/>
                        Login
                    </Button>
                </Header>
                <Content style={{backgroundColor: login.backgroundColor}} theme={login} >
                    <Spinner visible={this.state.isLoading} />
                    <Image source={require('../../../images/logo.png')} style={styles.shadow} />
                    <View style={styles.inputContainer} >
                        <InputGroup style={{marginBottom: 20}}>
                            <Icon name="ios-person" />
                            <Input 
                                placeholder="Email" 
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                                controlled={true}/>
                        </InputGroup>
                        <InputGroup style={{marginBottom: 10}}>
                            <Icon name="ios-unlock-outline" />
                            <Input
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password: text })}
                                value={this.state.password}
                                controlled={true}
                            />
                        </InputGroup>
                        <Button onPress={() => this.replaceRoute('forgot')} transparent style={styles.forgot} textStyle={{fontSize:14, textDecorationLine: 'underline'}}>
                                Forgot Login details?
                        </Button>
                        <Button style={styles.login} onPress={() => this.login()}>
                            Login
                        </Button>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20}}>
                        <Button style={[styles.logoButton, {backgroundColor: '#3541A9'}]} onPress={this.loginWithFacebook.bind(this)}>
                            <Icon name="logo-facebook" />
                        </Button>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text>Do not have an account? </Text>
                        <Button transparent style={styles.transparentButton} 
                            textStyle={{lineHeight: (Platform.OS==='ios') ? 15 : 24, textDecorationLine: 'underline'}}
                            onPress={() => this.replaceRoute('signup')}>
                            Sign up here
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(Login);
