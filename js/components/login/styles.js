
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, Platform } = React;
import loginTheme from './login-theme';
var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    shadow: {
        flex: 1,
        width: 330,
        height: 330,
        backgroundColor: 'transparent'
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginTop: -120,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 20
    },
    forgot: {
        alignSelf: 'flex-end',
        marginBottom: (Platform.OS === 'ios' ) ? 10 : 0,
        marginTop: (Platform.OS === 'ios' ) ? -10 : 0
    },
    login: {
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: loginTheme.darkenButton,
        paddingHorizontal: 40
    },
    logoButton: {
        paddingHorizontal: 50,
        borderRadius:4,
        height: 40,
        padding: 4
    },
    transparentButton: {
        padding: 0,
        alignItems: 'flex-start'
    }
});
