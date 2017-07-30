'use strict';

import { AppRegistry } from 'react-native'
import setup from './js/setup'
import OneSignal from 'react-native-onesignal'; 

OneSignal.configure({
    onIdsAvailable: function(device) {
        console.log('UserId = ', device.userId);
        console.log('PushToken = ', device.pushToken);
    },
  onNotificationOpened: function(message, data, isActive) {
      console.log('MESSAGE: ', message);
      console.log('DATA: ', data);
      console.log('ISACTIVE: ', isActive);
  }
});
AppRegistry.registerComponent('OpenTennis', setup);
