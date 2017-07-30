
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View, Dimensions, Text, Platform, AsyncStorage, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {openDrawer, closeDrawer} from '../../actions/drawer';
import {popRoute, replaceOrPushRoute} from '../../actions/route';

import {Container, Header, Title, Content, Button, Icon, Card, CardItem, Thumbnail } from 'native-base';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import theme from '../../themes/base-theme';
import styles from './styles';

var devWidth = Dimensions.get('window').width;
var devHeight = Dimensions.get('window').height;

var TOKEN = 'TOKEN';
var REFRESH_TOKEN = 'REFRESH_TOKEN';

class SendMsg extends Component {

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    _gotoDetails(){
        this.props.navigator.push({
            id: 'detail',
            passProps: {
                detailInfo : this.props.userinfo
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
          messages: [],
          loadEarlier: true,
          typingText: null,
          isLoadingEarlier: false,
          isLoading: true,
        };
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }
    componentWillMount() {
        this.fetchData();
    }
    fetchData() {
        var _this = this;
        AsyncStorage.getItem(TOKEN)
        .then( (value) =>
            { 
                _this.loadMessageData(value);
            }
        );
    }
    loadMessageData(token) {
        fetch('http://test.tenislab.com.pl/api/message/' + this.props.userinfo.id + '/thread.json', {
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
      this._isMounted = true;
      var messages = [];
      for(var i = 0; i < responseData.length; i ++) {
          
          if( this.props.userinfo.id === responseData[i].to.id) {
            var message = {
                '_id': Math.round(Math.random() * 1000000),
                'text': responseData[i].message,
                'createdAt': responseData[i].created,
                'user': {
                    '_id': 1,
                    'name': responseData[i].to.name,
                    'avatar': responseData[i].to.avatar,
                },
            };
          }else {
            var message = {
                '_id': Math.round(Math.random() * 1000000),
                'text': responseData[i].message,
                'createdAt': responseData[i].created,
                'user': {
                    '_id': 2,
                    'name': responseData[i].from.name,
                    'avatar': responseData[i].from.avatar,
                },
            };
          }
          messages.unshift(message);
      }
      this.setState(() => {
        return {
          messages: messages,
          isLoading: false,
        };
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    onLoadEarlier() {
      this.setState((previousState) => {
        return {
          isLoadingEarlier: true,
        };
      });

      setTimeout(() => {
        if (this._isMounted === true) {
          this.setState((previousState) => {
            return {
              messages: GiftedChat.prepend(previousState.messages, require('./old_messages.js')),
              loadEarlier: false,
              isLoadingEarlier: false,
            };
          });
        }
      }, 1000); 
    }
    

    SendingMessage(token, message) {
        
        fetch('http://test.tenislab.com.pl/api/message.json', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer {' + token + '}',
            },
            body: JSON.stringify({
                to: this.props.userinfo.id,
                message: message[0].text,
            }),
           
        })
        .then((response) => response.json())
        .then((responseData) => {
        })
        .done();
    }
    onSend(messages = []) {
        var _this = this;
        AsyncStorage.getItem(TOKEN)
        .then( (value) =>
            { 
                if(value !== null) {
                    _this.SendingMessage(value, messages);
                }else {
                    _this.navigateTo('login');
                }
            }
        ).catch(() => {
            _this.navigateTo('login');
        });
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
      
    }

    answerDemo(messages) {
      if (messages.length > 0) {
        if ((messages[0].image || messages[0].location) || !this._isAlright) {
          this.setState((previousState) => {
            return {
              typingText: 'React Native is typing'
            };
          });
        }
      }

      setTimeout(() => {
        if (this._isMounted === true) {
          if (messages.length > 0) {
            if (messages[0].image) {
              this.onReceive('Nice picture!');
            } else if (messages[0].location) {
              this.onReceive('My favorite place');
            } else {
              if (!this._isAlright) {
                this._isAlright = true;
                this.onReceive('Alright');
              }
            }
          }
        }

        this.setState((previousState) => {
          return {
            typingText: null,
          };
        });
      }, 1000);
    }

    onReceive(text) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, {
            _id: Math.round(Math.random() * 1000000),
            text: text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          }),
        };
      });
    }

    renderCustomActions(props) {
      if (Platform.OS === 'ios') {
        return (
          <CustomActions
            {...props}
          />
        );
      }
      const options = {
        'Action 1': (props) => {
          alert('option 1');
        },
        'Action 2': (props) => {
          alert('option 2');
        },
        'Cancel': () => {},
      };
      return (
        <Actions
          {...props}
          options={options}
        />
      );
    }

    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#f0f0f0',
            }
          }}
        />
      );
    }

    renderCustomView(props) {
      return (
        <CustomView
          {...props}
        />
      );
    }

    renderFooter(props) {
      if (this.state.typingText) {
        return (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {this.state.typingText}
            </Text>
          </View>
        );
      }
      return null;
    }

    render() {
        let userPhoto;
        if (this.props.userinfo.avatar === '') {
            if (this.props.userinfo.gender === 'f') {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={35} square />
            }else {
                userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={35} square />
            }
        } else {
            userPhoto = <Thumbnail source={{uri:this.props.userinfo.avatar}} size={35} square />
        }
        
        return (
            <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
                <Header style={{justifyContent: 'flex-start', height:(Platform.OS==='ios') ? 60 : 40}}>
                        <View style={{flex:1, flexDirection:'row', width:devWidth*0.9, alignItems:'center', paddingHorizontal:5, justifyContent:'space-between'}}>
                          <TouchableOpacity onPress={() => this._gotoDetails()} >
                              <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                {userPhoto}
                                <Text style={{color:'#FFF', marginLeft:5, fontWeight:'bold'}}>{this.props.userinfo.name}</Text>
                              </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.popRoute()}>
                            <Icon name="ios-arrow-round-back-outline" style={{fontSize: 38, lineHeight: 42}}/>
                          </TouchableOpacity>
                        </View>
                </Header>
                <View style={{flex:1}}>
                    <Spinner visible={this.state.isLoading} />
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={this.onSend}
                        // loadEarlier={this.state.loadEarlier}
                        // onLoadEarlier={this.onLoadEarlier}
                        // isLoadingEarlier={this.state.isLoadingEarlier}
                        user={{
                          _id: 1, 
                        }}
                        // renderActions={this.renderCustomActions}
                        renderBubble={this.renderBubble}
                        renderCustomView={this.renderCustomView}
                        renderFooter={this.renderFooter}
                    />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
		    closeDrawer: ()=>dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SendMsg);
