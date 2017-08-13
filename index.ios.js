import React, { Component } from 'react'
import PushNotification from 'react-native-push-notification'
import {
  AppRegistry,
  PushNotificationIOS,
  View
} from 'react-native'

import Control from './src/control'


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
      <View style={{flex:1}}>
	<Control/>
      </View>
    )
  }
}

AppRegistry.registerComponent('growlab', () => growlab)
