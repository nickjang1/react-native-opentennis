
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View } from 'react-native';
import { replaceOrPushRoute , replaceRoute} from '../../actions/route';
var DeviceInfo = require('react-native-device-info');

class SplashPage extends Component {

    componentWillMount () {
        var _this = this;
        
        setTimeout (() => {
            _this.navigateTo('home');
        }, 2000);
    }
    navigateTo(route) {
        this.props.replaceRoute(route);
    }
    render () {
        return (
            <Image source={require('../../../images/launchscreen.png')} style={{flex: 1, height: null, width: null}} />
        );
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(SplashPage);
