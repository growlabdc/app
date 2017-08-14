import React, { Component } from 'react'
import PushNotification from 'react-native-push-notification'
import {
  AppRegistry,
  PushNotificationIOS,
  StatusBar,
  Text,
  View
} from 'react-native'

import Control from './src/control'
import System from './src/system'


export default class growlab extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('register', (token) => {
      console.log('TOKEN', token)
    })

    PushNotificationIOS.addEventListener('notification', (notification) => {
      console.log('Notification', notification)
    })

    PushNotification.configure({
      onRegister: function(token) {
	console.log('TOKEN:', token )
      },
      onNotification: function(notification) {
	console.log('NOTIFICATION:', notification )
      },
      permissions: {
	alert: true,
	badge: true,
	sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
	<View style={{flex: 1, backgroundColor:'#39663C', justifyContent: 'center', alignItems: 'center'}}>
	  <StatusBar translucent backgroundColor='#1CCE28' barStyle='light-content'/>
	</View>
	<System />
	<Control/>
	<View style={{flex: 1, backgroundColor:'#39663C', justifyContent: 'center', alignItems: 'center'}}>
	</View>
      </View>
    )
  }
}

AppRegistry.registerComponent('growlab', () => growlab)
