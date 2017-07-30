
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View, ActionSheetIOS, Picker, Platform, TouchableOpacity, ListView , AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment/min/moment-with-locales.min';

import {openDrawer, closeDrawer } from '../../actions/drawer';
import {popRoute, pushNewRoute} from '../../actions/route';

import {Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail } from 'native-base';
import HeaderContent from "./../homeHeader";
import theme from '../../themes/base-theme';
import styles from './style';

var Item = Picker.Item;
var TOKEN = 'TOKEN';
var REFRESH_TOKEN = 'REFRESH_TOKEN';

import {globalSideBar} from '../sideBar/index.js';

class Messages extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            threads: [],
            isLoading: true,
            dataSource: ds
        }
    }
    numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    millisecondsToStr (milliseconds) {
        
        if(milliseconds < 0) {
            return 'less than a second';
        }
        var temp = Math.floor(milliseconds / 1000);
        var years = Math.floor(temp / 31536000);
        if (years) {
            return years + ' year ago' + this.numberEnding(years);
        }
        
        var days = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            return days + ' day ago' + this.numberEnding(days);
        }
        var hours = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return hours + ' hour ago' + this.numberEnding(hours);
        }
        var minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return minutes + ' minute ago' + this.numberEnding(minutes);
        }
        var seconds = temp % 60;
        if (seconds) {
            return seconds + ' second ago' + this.numberEnding(seconds);
        }
        return 'less than a second'; 
    }
    componentWillMount() {
        this.fetchData()
    }
    fetchData() {
        var _this = this;
        AsyncStorage.getItem(TOKEN)
        .then( (value) =>
            { 
                _this.fetchThreadsData(value);
            }
        );
    }
    fetchThreadsData(token) {
        fetch('http://test.tenislab.com.pl/api/message/threads.json', {
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
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            threads: responseData,
            isLoading: false,
            dataSource: ds.cloneWithRows(responseData),
        });
    }
   
    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.pushNewRoute(route);
    }
    gotoMessages(thread){
        if( globalSideBar.sidebar.state.profileInfo.profile_complete === true )  {
            this.props.navigator.push({
                id: 'sendMsg',
                passProps: {
                    userinfo : thread
                }
            });
        } else {
            this.navigateTo('track');
        }
        
    }
    _renderRow(rowData, rowID) {
        let userPhoto;
        if (rowData.user.avatar === '') {
            if (rowData.user.gender === 'f') {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
            }else {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
            }
        } else {
            userPhoto = <Thumbnail source={{uri:rowData.user.avatar}} size={80} square />
        }
        
        return (
            <TouchableOpacity onPress={() => this.gotoMessages(rowData.user)}>
                  <Card foregroundColor="#000" style={styles.card} transparent>
                      <CardItem style={{padding: 10, marginRight: 0}} >
                          {userPhoto}
                          <View style={{ marginTop: 10}}>
                              <View style={styles.descContainer}>
                                  <Text style={styles.counterText}>{rowData.user.name}</Text>
                                  <Text style={{color: theme.brandPrimary, marginLeft:20}}>{this.millisecondsToStr(moment() - moment(rowData.created))}</Text>
                              </View>
                              <Text style={[styles.fadedText]}>{rowData.last_message}</Text>
                          </View>
                      </CardItem>
                  </Card>
              </TouchableOpacity>
        );
    }

    render() {
        return (
            <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
                <Header style={{ flexDirection: 'column', height:(Platform.OS==='ios') ? 60 : 45,paddingTop: (Platform.OS==='ios') ? 15 : 3, justifyContent: 'space-between'}}>
                    <Button transparent onPress={this.props.openDrawer}><Icon name="ios-menu" />Messages</Button>
                </Header>
                <View style={styles.container}>
                    <Spinner visible={this.state.isLoading} />
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindAction)(Messages);
