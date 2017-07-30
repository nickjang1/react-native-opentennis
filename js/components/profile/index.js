
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, ScrollView, Platform, AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { FBLogin, FBLoginManager} from 'react-native-facebook-login';


import {openDrawer} from '../../actions/drawer';
import {popRoute} from '../../actions/route';

import {Container, View, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail} from 'native-base';
import { Grid, Col, Row } from "react-native-easy-grid";
import { pushNewRoute, replaceRoute } from '../../actions/route';
import HeaderContent from "./../homeHeader";
import theme from '../../themes/base-theme';
import styles from './styles';


var TOKEN = 'TOKEN';
var REFRESH_TOKEN = 'REFRESH_TOKEN';

import {globalSideBar} from '../sideBar/index.js';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            refresh_token: '',
            isLoading: false,
            profileInfo: {
                name: '',
                avatar: '',
                city: '',
                gender: '',
                level: '',
                about: ''

            },
        };
    }

    componentWillMount() {
        this.fetchData()
    }
    fetchData() {
        AsyncStorage.getItem(TOKEN)
        .then( (value) =>
            { 
                this.fetchProfileData(value);
            }
        );
    }
    fetchProfileData(token) {
        this.setState({
            isLoading: true
        });
        fetch('http://test.tenislab.com.pl/api/profile.json', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer {' + token + '}',
            },
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.code === 401) {
                var _this = this;
                AsyncStorage.getItem(REFRESH_TOKEN)
                .then( (value) =>
                    { 
                        _this._refreshToken(value);
                    }
                );
            }else {
               this.handleResponse(responseData); 
            }
        })
        .done();
    }
    _refreshToken(refreshToken) {
        fetch('http://test.tenislab.com.pl/api/token/refresh', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.code===401) {
                alert('Please type your correct email and password!');
            }else {
                AsyncStorage.setItem(TOKEN, responseData.token);
                this.fetchData();
            }
        })
        .done();
    }
    handleResponse(responseData) {
        this.setState({
            isLoading: false,
            profileInfo: {
                name: responseData.name,
                city: responseData.city,
                about: responseData.about,
                level: responseData.level,
                avatar: responseData.avatar,
                gender: responseData.gender
            }
        })
    }

    popRoute() {
        this.props.popRoute();
    }
    navigateTo(route) {
        this.props.replaceRoute(route);
    }
    logout() {
        globalSideBar.sidebar.setLogout();
        FBLoginManager.logout(function(error, data){
        });
        AsyncStorage.removeItem(TOKEN);
        AsyncStorage.removeItem(REFRESH_TOKEN);
        this.navigateTo('login');
    }
    render() {
        let userPhoto;
        if (this.state.profileInfo.avatar === '') {
            if (this.state.profileInfo.gender === 'f') {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
            }else {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
            }
        } else {
            userPhoto = <Thumbnail source={{uri:this.state.profileInfo.avatar}} size={80} square />
        }
        return (
          <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
              <Header style={{ flexDirection: 'column', height:(Platform.OS==='ios') ? 60 : 45,paddingTop: (Platform.OS==='ios') ? 15 : 3, justifyContent: 'space-between'}}>
                    <Button transparent onPress={this.props.openDrawer}><Icon name="ios-menu" />Profile</Button>
                </Header>
              <View  style={{ padding:5,flex: 1, flexDirection: 'column', justifyContent: 'space-between',}}>
                <Spinner visible={this.state.isLoading} />
                <Card foregroundColor="#000" style={{borderWidth: 0, marginBottom: 5}} transparent>
                  <CardItem style={{flex:1}}>
                    <View style={{flexDirection: 'row'}}>
                        {userPhoto}
                        <Text style={styles.header, {margin:8, color:'black'}}>{this.state.profileInfo.name}{"\n"}city:{this.state.profileInfo.city}{"\n"}playing style:{"\n"}double handed, right hand{"\n"}level:{this.state.profileInfo.level}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column',marginLeft:12}}>
                        <Text style={styles.header, {marginTop:8, color:'black', fontSize:18}}>About</Text>
                        <Text style={styles.header, {marginTop:8, color:'black'}}>{this.state.profileInfo.about}</Text>
                    </View>
                  </CardItem>
                </Card>
                <Button primary block style={{ marginBottom:5,height:40, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}  onPress={() => this.navigateTo('editProfile')}> Edit </Button>
                <Button primary block style={{ height:40, flexDirection: 'row', justifyContent:'center', alignItems:'center'}} onPress={() =>this.logout()}> Logout </Button>
              </View>
          </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute: (route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindAction)(Profile);
