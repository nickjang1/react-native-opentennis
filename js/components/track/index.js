
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View, AsyncStorage} from 'react-native';



import {Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail} from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';

import { pushNewRoute, replaceRoute } from '../../actions/route';

var TOKEN = 'TOKEN';
var REFRESH_TOKEN = 'REFRESH_TOKEN';

class Track extends Component {

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
        this.fetchData();
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
    
    navigateTo(route) {
        this.props.replaceRoute(route);
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
                <Header style={{justifyContent: 'flex-start'}}>
                    <Button transparent onPress={() => this.navigateTo('home')} style={{marginLeft: -10}}>
                        <Icon name="ios-arrow-round-back-outline" style={{fontSize: 38, lineHeight: 42}} />
                        Complete your profile
                    </Button>
                </Header>

                <Content padder>
                    <Card style={{marginBottom: 10}} foregroundColor="#000">
                        <CardItem style={{padding: 27}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                                  {userPhoto}
                                  <Text style={{color:'black', fontSize:22, marginTop:20}}>Hi, {this.state.profileInfo.name} </Text>
                                  <Text style={{color:'black', marginTop:25}}>To start using OpenTennis you need to tell us about your tennis skills.Do it on our website by clicking below.</Text>
                                </View>
                                
                            </View>
                            <View style={{flex:1, flexDirection: 'row',justifyContent: 'center', alignItems:'center', marginTop:20}}>
                                    <Button onPress={() => this.navigateTo('complete')}>Complete my profile</Button>
                                </View>
                        </CardItem>
                    </Card>
                    
                </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Track);
