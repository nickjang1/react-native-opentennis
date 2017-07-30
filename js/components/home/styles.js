
'use strict';

import { StyleSheet, Dimensions } from "react-native";
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    box: {
		flex: 1,
		marginBottom: 55,
		backgroundColor: 'transparent'
	},
	mail: {
		borderBottomColor: 'white',
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0.3,
		position: 'relative',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start'

	},
  fadedText: {
      color: '#999999'
  },
  card: {
      borderWidth: 0,
      marginBottom: 10
  },
  counterText: {
      color: '#5b5b5b',
      fontWeight: '500',
      lineHeight: 19
  },
  descContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 140
  },
	list: {
		flex: 1,
	},
	senderName: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 18
	},
	body: {
		marginTop: 3,
		color: '#fff',
		lineHeight: 20
	},
	details: {
		marginLeft: 15
	},
	subtitle : {
		color: '#fff',
		fontSize: 16,
		height: 0
	},
	Block1: {
		alignItems:'center',
		justifyContent:'center',
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 2},
		shadowOpacity: 0.3,
		shadowRadius: 1.5,
	},
	imgBlock1: {
		width: deviceWidth,
		height: deviceWidth/1.8
	},
	Block2: {
		alignItems:'center',
		justifyContent:'center',
		margin:5,
        marginBottom: 0,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 2},
		shadowOpacity: 0.3,
		shadowRadius: 1.5,
		position:'relative',
		width: deviceWidth-10,
		height: deviceWidth/4,
	},
	imgBlock2: {
		position:'absolute',
		width: deviceWidth-10,
		height: deviceWidth/4,
		top:0
	},
	Block3: {
		alignItems:'center',
		justifyContent:'center',
		margin:5,
        marginRight: 0,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 2},
		shadowOpacity: 0.3,
		shadowRadius: 1.5,
		position:'relative',
		width: (deviceWidth/2)-5,
		height: (deviceWidth/2)-10,
	},
	imgBlock3: {
		position:'absolute',
		width: (deviceWidth/2)-5,
		height: (deviceWidth/2)-10,
		top:0
	},
	Block4: {
		alignItems:'center',
		justifyContent:'center',
		margin:5,
        marginRight: 0,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 2},
		shadowOpacity: 0.3,
		shadowRadius: 1.5,
		position:'relative',
		width: (deviceWidth/2)-10,
		height: (deviceWidth/2)-10,
	},
	imgBlock4: {
		position:'absolute',
		width: (deviceWidth/2)-10,
		height: (deviceWidth/2)-10,
		top:0
	},
	scrollview: {
		flex: 1,
	},
});
