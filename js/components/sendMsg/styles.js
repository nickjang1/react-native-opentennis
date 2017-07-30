
'use strict';

import { StyleSheet } from "react-native";
import theme from "../../themes/base-theme";
module.exports = StyleSheet.create({
    container: {
        width: null,
        height: null,
        flex: 1
    },
    card: {
        borderWidth: 0,
        marginBottom: 15
    },
    cardTop: {
        flexDirection: 'row',
        position: 'relative'
    },
    descText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500'
    },
    cardHeader: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 8
    },
    refreshIcon: {
        color: '#000',
        fontSize: 24,
        alignSelf: 'center'
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderID: {
        color: '#000',
        fontWeight: '500',
        fontSize: 14
    },
    placedON: {
        color: '#000',
        fontSize: 12,
        lineHeight: 15
    },
    fadeDesc: {
        fontSize: 11,
        lineHeight: 15,
        color: '#b0b0b0'
    },
    statusContainer: {
        alignSelf:'stretch',
        borderTopWidth:2,
        margin: 25,
        marginBottom:0
    },
    statusBar: {
        borderWidth: 1,
        borderColor: theme.brandPrimary,
        bottom: 4,
        left:2,
        alignItems: 'stretch',
        flex: 1
    },
    statusIcon: {
        color: theme.brandPrimary,
        top: -14,
        backgroundColor: '#fff',
        fontSize: 24
    },
    statusText: {
        color:theme.brandPrimary,
        fontSize: 13
    },
    statusTextContainer: {
        marginHorizontal: 10,
        marginTop: -15
    },
    footerContainer: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    footerText: {
      fontSize: 14,
      color: '#aaa',
    },
});
