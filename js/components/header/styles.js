
'use strict';

import { StyleSheet, Dimensions } from "react-native";
import theme from "../../themes/base-theme";

module.exports = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: Dimensions.get('window').width
	},
});
