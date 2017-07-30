'use strict';
import React, {Component}from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  WebView,
  Platform
} from 'react-native';
import {Container, Header, Title, Content, Button, Icon, Card, CardItem, Thumbnail } from 'native-base';
import {connect} from 'react-redux';
import {popRoute, replaceOrPushRoute} from '../../actions/route';
import theme from '../../themes/base-theme';

var startInLoadingState = true;          // true will break it, false will allow it to work.

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'http://test.tenislab.com.pl/pl/resetting/request';

class ForgotPassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
          url: DEFAULT_URL,
          status: 'No Page Loaded',
          backButtonEnabled: false,
          forwardButtonEnabled: false,
          loading: true,
          scalesPageToFit: true,
        }
    }
    popRoute() {
        this.props.popRoute();
    }
    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    handleTextInputChange = (event)=> {
      this.inputText = event.nativeEvent.text;
    }

    render() {
      this.inputText = this.state.url;
      return (
          <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
              <Header style={{justifyContent: 'flex-start', height:(Platform.OS==='ios') ? 60 : 45}}>
                  <Button transparent onPress={() => this.navigateTo('home')} style={{marginLeft: -10}}>
                      <Icon name="ios-arrow-round-back-outline" style={{fontSize: 38, lineHeight: 42}}/>
                        Forgot Password
                  </Button>
              </Header>
              <View style={[styles.container]}>
                  <View style={[styles.addressBarRow]}>
                    <TextInput
                      ref={TEXT_INPUT_REF}
                      autoCapitalize="none"
                      value={this.state.url}
                      onSubmitEditing={this.onSubmitEditing}
                      onChange={this.handleTextInputChange}
                      clearButtonMode="while-editing"
                      style={styles.addressBarTextInput}
                    />
                    <TouchableOpacity onPress={this.pressGoButton}>
                      <View style={styles.goButton}>
                        <Text>
                           Go!
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri:this.state.url}}
                    javaScriptEnabledAndroid={true}
                    onNavigationStateChange={this.onNavigationStateChange}
                    startInLoadingState={startInLoadingState}
                    scalesPageToFit={this.state.scalesPageToFit}
                  />
                  <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.status}</Text>
                  </View>
              </View>
          </Container>
      );
    }


    reload() {
      this.refs[WEBVIEW_REF].reload();
    }

    onNavigationStateChange = (navState)=> {
      this.setState({
        backButtonEnabled: navState.canGoBack,
        forwardButtonEnabled: navState.canGoForward,
        url: navState.url,
        status: navState.title,
        loading: navState.loading,
        scalesPageToFit: true
      });
    }

    onSubmitEditing = (event)=> {
      this.pressGoButton();
    }

    pressGoButton() {
      var url = this.inputText.toLowerCase();
      if (url === this.state.url) {
        this.reload();
      } else {
        this.setState({
          url: url,
        });
      }
      // dismiss keyoard
      this.refs[TEXT_INPUT_REF].blur();
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
});

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(ForgotPassword);
