
'use strict';

import { StyleSheet, Platform } from "react-native";

module.exports = StyleSheet.create({
    container: {
        width: null,
        height: null,
        flex: 1
    },
    card: {
      borderWidth: 0,
      marginBottom: 10
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
    rateText: {
        color:'#000',
        alignSelf: 'flex-end'
    },
    closeIcon: {
        color: '#000',
        fontSize: 24,
        right: -5,
        top: -15,
        position: 'absolute'
    },
    bottomDesc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    counterIcon: {
        color: '#000',
        fontSize: 16,
        lineHeight: 15
    },
    counterText: {
        color: '#000',
        fontSize: 14,
        lineHeight: 15,
        marginTop: (Platform.OS==="android") ? -3 : 0,
        marginHorizontal: 4
    }
});
