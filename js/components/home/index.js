
'use strict';

import React, {Component}from 'react';
import {connect} from 'react-redux';
import { Image, Platform , ScrollView, ListView , RefreshControl, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {openDrawer} from '../../actions/drawer';
import {popRoute} from '../../actions/route';
import { replaceOrPushRoute } from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem,Card, CardItem, Thumbnail, View, Tabs } from 'native-base';
import HeaderContent from "./../homeHeader";

import theme from '../../themes/base-theme';
import styles from './styles';



var _this;
var watchID;
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            isLoading: true,
            canLoad: true,
            page : 1,
            players : [],
            lng: 0,
            lat: 0,
        }
    }
    
   
    componentWillMount() {
        var _currentThis = this;
        watchID = navigator.geolocation.watchPosition((position) => {
            
            this.setState({
                lng: position.coords.longitude,
                lat: position.coords.latitude
            });
            _currentThis.fetchData();
        },
        (error) => {
            this.setState({
                lng: 0,
                lat: 0
            });
            _currentThis.fetchData();
        });
          
    }
    
    componentDidMount() {
        _this = this;
             
    }
    
        
    fetchData() {
        navigator.geolocation.clearWatch(watchID);
        if (this.state.lng === 0 ) {
            fetch('http://test.tenislab.com.pl/api/player.json?country=pl'+'&page='+this.state.page, {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                method: "GET"
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.length === 0 ) {
                    this.setState({
                        canLoad: false,
                        isRefreshing: false,
                        isLoading: false,
                    });
                }else {
                    this.handleResponse(responseData)
                }
                
            })
            .done();
        } else {
            fetch('http://test.tenislab.com.pl/api/player.json?country=pl'+'&page='+this.state.page+'&lng='+ this.state.lng +'&lat='+this.state.lat, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "GET"
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.length === 0 ) {
                    this.setState({
                        canLoad: false,
                        isRefreshing: false,
                        isLoading: false,
                    });
                }else {
                    this.handleResponse(responseData)
                }
                
            })
            .done();
        }        
    }

    handleResponse(responseData) {
        var playersOld = _this.state.players;
        var playersNew = responseData;
        var players = playersOld.concat(playersNew);
        var pageNo = _this.state.page + 1;
        _this.setState({
            players: players,
            isRefreshing: false,
            isLoading: false,
            page: pageNo,
        });
    }

    popRoute() {
        this.props.popRoute();
    }
 
    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }
    
    _onRefresh() {
        if(_this.state.canLoad === false) {
            _this.setState({
                isRefreshing: false,
            });
        } else {
            _this.setState({
                isRefreshing: true,
            });
            _this.fetchData();
        }
        
        
    }

    _gotoDetails(rowData, rowID){
        this.props.navigator.push({
            id: 'detail',
            passProps: {
                detailInfo : rowData
            }
        });
    }
    render() {
        var _this = this;
        const rows = this.state.players.map((rowData, ii) => {
            let userPhoto;
            if (rowData.avatar === '') {
                if (rowData.gender === 'f') {
                    userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
                }else {
                    userPhoto = <Thumbnail source={require('../../../images/pic-female-default.png')} size={80} square />
                }
            } else {
                userPhoto = <Thumbnail source={{uri:rowData.avatar}} size={80} square />
            }
            return (
                <TouchableOpacity 
                    key = {ii} 
                    onPress={() => {
                            _this._gotoDetails(rowData, ii)             
                    }}>
                    <Card foregroundColor="#000" style={styles.card} transparent>
                        <CardItem style={{padding: 10}} >
                            {userPhoto}
                            <View style={{ marginTop: 10}}>
                                <View style={styles.descContainer}>
                                    <Text style={styles.counterText}>{rowData.name}</Text>
                                    <Text style={{color: theme.brandPrimary, marginLeft:20, fontSize:12}}>{rowData.city}</Text>
                                </View>
                                <Text style={[styles.fadedText]}>{rowData.about}</Text>
                            </View>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            );
        });
        let CanLoad;
        if (this.state.canLoad === true) {
            CanLoad = <View>
                            <View style={{height: 5}}><Text></Text></View>
                            <TouchableOpacity style={{flex:1, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={this._onRefresh.bind(this)}>
                                <Text style={{color: '#888'}}>  Load More</Text>
                            </TouchableOpacity>
                        </View>
        } else {
            CanLoad = <View ><View><Text></Text></View>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: '#888'}}>  No More Players </Text>
                            </View>
                        </View>
        }
        return (
            <Container theme={theme} style={{backgroundColor: theme.defaultBackgroundColor}}>
                <Header style={{ flexDirection: 'column', height:(Platform.OS==='ios') ? 60 : 45,paddingTop: (Platform.OS==='ios') ? 15 : 3, justifyContent: 'space-between'}}>
                    <HeaderContent />
                </Header>
                
                <View style={{flex:1}}>
                    <Spinner visible={this.state.isLoading} />
                    <ScrollView
                        style={styles.scrollview}
                        refreshControl={
                            <RefreshControl
                                refreshing={_this.state.isRefreshing}
                                onRefresh={_this._onRefresh}
                                tintColor="#ff0000"
                                title="Loading..."
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                            />
                        }>
                        {rows}
                        {CanLoad}
                    </ScrollView>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(Home);
