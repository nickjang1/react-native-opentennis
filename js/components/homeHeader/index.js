
'use strict';

import React, {Component} from 'react';
import { TouchableOpacity, Image, Platform } from "react-native";
import {connect} from 'react-redux';

import {openDrawer, closeDrawer} from '../../actions/drawer';
import {replaceOrPushRoute} from '../../actions/route';

import { Icon, View, Text, Button, InputGroup, Input } from "native-base";

import theme from "../../themes/base-theme";
import styles from './styles';

class Header extends Component {

	navigateTo(route) {
      this.props.closeDrawer();
      this.props.replaceOrPushRoute(route);
  }

	render() {
		return (
			<View style={styles.header} >
				<View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Button transparent onPress={this.props.openDrawer}><Icon name="ios-menu" />Nearby Players</Button>
					</View>
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
