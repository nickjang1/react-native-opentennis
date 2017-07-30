
'use strict';

import React, {Component} from 'react';
import { Image, View, TouchableOpacity, Picker, StyleSheet, Platform } from 'react-native';
import {connect} from 'react-redux';

import {openDrawer, closeDrawer} from '../../actions/drawer';
import {popRoute, replaceOrPushRoute} from '../../actions/route';

import {Container, Header, Footer, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail, InputGroup, Input } from 'native-base';
import HeaderContent from "./../homeHeader";
import theme from '../../themes/base-theme';

import { TabViewAnimated, TabViewPage, TabBar } from 'react-native-tab-view';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#212121',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    padding: 0,
  },
});

class About extends Component {
    static propTypes = {
      style: View.propTypes.style,
    };

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    state = {
      index: 0,
      routes: [
        { key: '1', title: 'First' },
        { key: '2', title: 'Second' },
        { key: '3', title: 'Third' },
      ],
    };

    _handleChangeTab = (index) => {
      this.setState({
        index,
      });
    };

    _renderIcon = ({ route }) => {
      switch (route.key) {
      case '1':
        return <Image source={require('../../../images/tab-icon-1.png')} />;
      case '2':
        return <Image source={require('../../../images/tab-icon-2.png')} />;
      case '3':
        return <Image source={require('../../../images/tab-icon-3.png')} />;
      default:
        return null;
      }
    };

    _renderFooter = (props) => {
      return (
        <TabBar
          {...props}
          pressColor='rgba(0, 0, 0, .2)'
          renderIcon={this._renderIcon}
          tabStyle={styles.tab}
          style={styles.tabbar}
        />
      );
    };

    _renderScene = ({ route }) => {
      switch (route.key) {
      case '1':
        return <Page1/>
      case '2':
        return <Page2/>
      case '3':
        return <Page3/>
      default:
        return null;
      }
    };
    _renderPage = (props) => {
       return <TabViewPage {...props} renderScene={this._renderScene} />;
     };

    render() {
        let bodyView;
        if(this.state.index === 0) {
          bodyView = (
            <Page1/>
          )
        } else if(this.state.index === 1) {
          bodyView = (
            <Page2/>
          )
        } else if(this.state.index === 2) {
          bodyView = (
            <Page3/>
          )
        }

        return (
          <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
              <Header style={{ flexDirection: 'column', height:(Platform.OS==='ios') ? 60 : 45, paddingTop: (Platform.OS==='ios') ? 15 : 3, justifyContent: 'space-between'}}>
                  <HeaderContent />
              </Header>
              <View style={{flex:1}}>
                  <TabViewAnimated
                      style={{flex:1}}
                      navigationState={this.state}
                      renderScene={this._renderPage}
                      renderFooter={this._renderFooter}
                      onRequestChangeTab={this._handleChangeTab}
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

export default connect(null, bindAction)(About);
