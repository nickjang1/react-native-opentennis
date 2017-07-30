
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View, TouchableOpacity, Platform, AsyncStorage} from 'react-native';
import {popRoute, replaceRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './style';

var TOKEN = 'TOKEN';
var REFRESH_TOKEN = 'REFRESH_TOKEN';

import {globalSideBar} from '../sideBar/index.js';


class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        }
    }
    componentWillMount() {
        var _this = this;
        AsyncStorage.getItem(TOKEN)
        .then( (value) =>
            { 
                if(value !== null) {
                    _this.setState({
                        isLogin: true
                    })
                } else {
                    _this.setState({
                        isLogin: false
                    })
                }
            }
        );
    }

    navigateTo(route) {
        this.props.replaceRoute(route);
    }

    gotoMessages(){
        console.log('details = ' + JSON.stringify(this.props.detailInfo));
        if( globalSideBar.sidebar.state.profileInfo.profile_complete === true )  {
            this.props.navigator.push({
                id: 'sendMsg',
                passProps: {
                    userinfo : this.props.detailInfo
                }
            });
        } else {
            this.navigateTo('track');
        }
        
    }

    render() {
        let userPhoto;
        if (this.props.detailInfo.avatar === '') {
            if (this.props.detailInfo.gender === 'f') {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
            }else {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
            }
        } else {
            userPhoto = <Thumbnail source={{uri:this.props.detailInfo.avatar}} size={80} square />
        }
        let GotoButton;
        if (this.state.isLogin === true) {
            GotoButton = <Button primary block style={{ marginTop:5, height:40, flexDirection: 'row', justifyContent:'center', alignItems:'center'}} onPress={() => this.gotoMessages('sendMsg')}>
                            Send a message
                        </Button>
        } else {
            GotoButton = <Button primary block style={{ marginTop:5, height:40, flexDirection: 'row', justifyContent:'center', alignItems:'center'}} onPress={() => this.navigateTo('login')}>
                            Send a message
                        </Button>
        }
        return (
            <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
                <Header style={{justifyContent: 'flex-start', height:(Platform.OS==='ios') ? 60 : 45}}>
                    <Button transparent onPress={() => this.navigateTo('home')} style={{marginLeft: -10}}>
                        <Icon name="ios-arrow-round-back-outline" style={{fontSize: 38, lineHeight: 42}}/>
                          Player Details
                    </Button>
                </Header>

                <View  style={{ padding:5, flex: 1, flexDirection: 'column', justifyContent: 'space-between',}}>
                  <Card foregroundColor="#000" style={styles.card, {flex:1}} transparent>
                    <CardItem style={{flex:1}}>
                        <View style={{flexDirection: 'row'}}>
                            {userPhoto}
                            <Text style={styles.header, {margin:8, color:'black'}}>{this.props.detailInfo.name}{"\n"}city:{this.props.detailInfo.city}{"\n"}playing style:{"\n"}double handed, right arm{"\n"}level:{this.props.detailInfo.level}</Text>
                        </View>
                        <View style={{flex: 5, flexDirection: 'column',marginLeft:12, marginTop:20}}>
                            <Text style={styles.header, {marginTop:8, color:'black', fontSize:18}}>About</Text>
                            <Text style={styles.header, {marginTop:8, color:'black'}}>{this.props.detailInfo.about}</Text>
                        </View>
                    </CardItem>
                  </Card>
                  {GotoButton}
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Detail);
