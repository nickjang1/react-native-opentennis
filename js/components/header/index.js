
'use strict';

import React, {Component} from 'react';
import { TouchableOpacity, Image } from "react-native";
import {connect} from 'react-redux';

import {openDrawer, closeDrawer} from '../../actions/drawer';
import {replaceOrPushRoute} from '../../actions/route';

import { Icon, View, Text, Button } from "native-base";

import styles from './styles';

class Header extends Component {

	navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

	render() {
		return (
			<View style={styles.header} >
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Button transparent onPress={this.props.openDrawer}><Icon name="ios-menu" /></Button>
					<Image source={require('../../../images/strapsale-logo.png')} style={{height: 30, width: 95,resizeMode: 'contain'}}></Image>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Button transparent style={{paddingHorizontal: 10}}><Icon name="ios-heart" /></Button>
					<Button transparent style={{paddingHorizontal: 10}} onPress={() => this.navigateTo('cart')}><Icon name="ios-cart-outline" /></Button>
					<Button transparent style={{paddingLeft: 10}}><Icon name="md-more" /></Button>
				</View>
			</View>
		);
	}
}

function bindAction(dispatch) {
    return {
		openDrawer: ()=>dispatch(openDrawer()),
		closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(Header);
