
'use strict';

import { StyleSheet, Dimensions } from "react-native";
import theme from "../../themes/base-theme";

var deviceWidth = Dimensions.get('window').width;

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
    counterText: {
      	color: '#5b5b5b',
      	fontWeight: '500',
      	lineHeight: 19
    },
    filterBtn1: {
		backgroundColor: '#fff',
		marginLeft: 10,
		marginRight: 5,
		marginTop: 10,
		marginBottom:10,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 1.5
	},
	filterBtn2: {
		backgroundColor: '#fff',
		marginRight: 10,
		marginLeft: 5,
		marginTop: 10,
		marginBottom:10,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 1.5
	},
    pickerContainer: {
        backgroundColor: '#fff',
        width: 120,
        borderRadius: 5,
        height: 45,
        elevation:2,
    },
	productFilterIcon: {
		resizeMode: 'contain',
		height: 20,
		width: 20,
		margin: 10,
		backgroundColor: '#fff'
	},
	productWomenIcon: {
		resizeMode: 'contain',
		height: 20,
		width: 20,
		padding: 10,
		margin: 10
	},
	dropdown: {
		resizeMode: 'contain',
		height: 10,
		width: 10,
		marginRight: 10
	},
	dropdownAndroidBlock: {
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		right: 10,
		top: 10
	},
	dropdownAndroid: {
		resizeMode: 'contain',
		height: 10,
		width: 10,
	},
	category: {
		fontSize: 15,
		color: theme.brandPrimary,
		paddingRight: 10
	},
	cards: {
		position: 'relative',
		backgroundColor: '#fff',
		width: deviceWidth-20,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		marginBottom: 5,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 1},
		shadowOpacity: 0.1,
		shadowRadius: 0.7
	},
	productItem: {
        alignSelf: 'stretch',
        // resizeMode: 'contain',
		width: null,
		height: (deviceWidth-30)*662/975
	},
	productName: {
		color: '#535353',
		fontWeight: '600',
		fontSize: 13,
		margin: 5
	},
	originalPrice: {
		color: '#B3B3B3',
		fontSize: 12,
		fontWeight: '400',
		marginLeft: 1,
		marginRight: 1,
		textDecorationLine: 'line-through',
		textDecorationColor: '#B3B3B3'
	},
	discountPrice: {
		color: '#535353',
		fontSize: 12,
		fontWeight: '600',
		marginLeft: 1,
		marginRight: 1,
	},
	discountPercent: {
		color: '#ED9DA6',
		fontSize: 12,
		fontWeight: '600',
	},
	star: {
		position: 'absolute',
		right: 15,
		top: 15,
	},
	filter: {
		height: 50,
		width: 50,
	},
    buttonContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom: 10
    },
    topButtons: {
        backgroundColor:'#fff',
        alignSelf: 'center'
    },
    descContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 140
    },
    fadedText: {
        color: '#999999'
    },
	cardsGrid: {
		position: 'relative',
		backgroundColor: '#fff',
		width: (deviceWidth/2)-10,
		marginTop: 5,
		marginBottom: 5,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 1},
		shadowOpacity: 0.1,
		shadowRadius: 0.7
	},
	productItemGrid: {
		width: (deviceWidth/2)-20,
		height: ((deviceWidth/2)-20)*353/218,
		marginTop: 5,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5
	},
	productNameGrid: {
		color: '#535353',
		fontWeight: '600',
		fontSize: 13,
		margin: 5,
		alignSelf: 'flex-start'
	},
	originalPriceGrid: {
		color: '#B3B3B3',
		fontSize: 12,
		fontWeight: '400',
		marginLeft: 1,
		marginRight: 1,
		textDecorationLine: 'line-through',
		textDecorationColor: '#B3B3B3',
		alignSelf: 'flex-start'
	},
	detailsBtn: {
		width: deviceWidth/2,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	detailsBtnTxt: {
		fontSize: 12,
		fontWeight: '600'
	},
	detailsDropdown: {
		resizeMode: 'contain',
		height: 10,
		width: 10,
	},
	backBtn: {
		backgroundColor:'transparent',
		height:15,
		width:15,
		margin:5,
		shadowColor: '#000',
		shadowOffset: {width: 1, height: 1},
		shadowOpacity: 0.1,
		shadowRadius: 0.7,
	}
});
