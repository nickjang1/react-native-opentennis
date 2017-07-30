
'use strict';

import React, { Component } from 'react';
import { Image, AsyncStorage } from "react-native";
import { connect } from 'react-redux';

import { View, Text, Icon, List, ListItem, Content } from 'native-base';
import { closeDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';

import theme from "../../themes/base-theme";
import styles from "./style";

var TOKEN = 'TOKEN';
var REFRESH_TOKEN = 'REFRESH_TOKEN';

export var globalSideBar = {};

class SideBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: {
                name: '',
                photo: '',
                gender: '',
                profile_complete: false
            },
        };
    }
    componentDidMount() {
        globalSideBar.sidebar = this;
    }
    componentWillMount() {
         this.fetchData();
    }
    fetchData() {
        var _this = this;
        AsyncStorage.getItem(TOKEN)
            .then( (value) =>{
                if(value !== null) {
                    _this.fetchProfileData(value);
                } 
            }
        );
    }
    fetchProfileData(token) {
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
            profileInfo: {
                name: responseData.name,
                photo: responseData.avatar,
                gender: responseData.gender,
                profile_complete: responseData.is_profile_complete
            }
        })
    }
    
    setLogout() {
       this.setState({
           profileInfo: {
               name: '',
               photo: '',
               gender: ''
           }
       }); 
    }

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceRoute(route);
    }
    gotoProfile() {
        var _this = this;
        AsyncStorage.getItem(TOKEN)
        .then( (value) =>
            { 
                if(value !== null) {
                    
                    if(_this.state.profileInfo.profile_complete === false) {
                        // _this.navigateTo('profile');
                        _this.navigateTo('track');
                    }else {
                        _this.navigateTo('profile');
                        // _this.navigateTo('track');
                    }
                    
                }else {
                    _this.navigateTo('login');
                }
            }
        );
    }
    gotoMessages() {
        var _this = this;
        AsyncStorage.getItem(TOKEN)
        .then( (value) =>
            { 
                if(value !== null) {
                    _this.navigateTo('messages');
                }else {
                    _this.navigateTo('login');
                }
            }
        ).catch(() => {
            _this.navigateTo('login');
        });
    }
    render(){
        let profileImage;
        if(this.state.profileInfo.photo === '') {
            if(this.state.profileInfo.gender === '') {
                profileImage = <View></View>
            }else if(this.state.profileInfo.gender === 'm') {
                profileImage = <Image style={styles.thumbnail} source={require('../../../images/pic-male-default.png')}/>
            }else if(this.state.profileInfo.gender === 'f') {
                profileImage = <Image style={styles.thumbnail} source={require('../../../images/pic-female-default.png')}/>
            }
        }else {
            profileImage = <Image style={styles.thumbnail} source={{uri:this.state.profileInfo.photo}}/>
        }
        return (
          <Content theme={theme} style={{backgroundColor: '#fff'}} >
                <Image style={styles.image} source={require('../../../images/cover-default.png')} >
                    {profileImage}
                    <Text style={[styles.name, {top: 120}]}>{this.state.profileInfo.name}</Text>
                </Image>

                <List foregroundColor={"#000"} style={styles.list}>
                    <ListItem button onPress={() => this.navigateTo('home')} iconLeft style={styles.links} >
                        <View style={styles.sidebarList}>
                            <View style={[ styles.sidebarIconView, {backgroundColor: '#29783b'}] }>
                                <Icon name="ios-construct" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.linkText}>Nearby Players</Text>
                        </View>
                    </ListItem>
                    <ListItem button onPress={() => this.gotoMessages()} iconLeft style={styles.links} >
                        <View style={styles.sidebarList}>
                            <View style={[ styles.sidebarIconView, {backgroundColor: '#ab6aed'}] }>
                                <Icon name="ios-shirt" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.linkText}>Messages</Text>
                        </View>
                    </ListItem>
                    <ListItem button onPress={() => this.gotoProfile()} iconLeft style={styles.links} >
                        <View style={styles.sidebarList}>
                            <View style={[ styles.sidebarIconView, {backgroundColor: '#4dcae0'}] }>
                                <Icon name="ios-car" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.linkText}>Profile</Text>
                        </View>
                    </ListItem>
                    <ListItem button onPress={() => this.navigateTo('about')} iconLeft style={styles.links} >
                        <View style={styles.sidebarList}>
                            <View style={[ styles.sidebarIconView, {backgroundColor: '#f5bf35', paddingLeft: 9}] }>
                                <Icon name="ios-copy" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.linkText}>T&C</Text>
                        </View>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);
