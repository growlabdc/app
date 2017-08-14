import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Config from 'react-native-config'

export default class System extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      system_state: ''
    }
  }

  componentDidMount() {
    return fetch('https://growlab.space/api/info')
      .then((response) => response.json())
      .then((responseJson) => {
	console.log(responseJson)
	this.setState({
	  system_state: responseJson.state,
	  isLoading: false
	})
      })
      .catch((error) => {
	console.error(error);
      })
  }

  onClick() {
    console.log(event)
    Alert.alert(
      'Are you sure?',
      '',
      [
	{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
	{text: 'Confirm', onPress: () => {
	  var url = 'https://growlab.space/api/system/?' + [
	    'token=' + Config.TOKEN,
	    'state=DRAINING'
	  ].join('&')

	  return fetch(url)
	    .then((response) => response.json())
	    .then((responseJson) => {
	      console.log(responseJson)
	      this.setState({
		system_state: responseJson.state
	      })
	    })
	    .catch((error) => {
	      console.error(error);
	    });
	}},
      ],
      { cancelable: true }
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
	<View style={styles.systemContainer}>
	  <ActivityIndicator />
	</View>
      );
    }

    return (
      <View style={styles.systemContainer}>
	<TouchableHighlight
	    style={styles.button}
	    onPress={(e) => this.onClick(e)}>
	  <View>
	    <Text style={{color: '#ffffff'}}>Drain System</Text>
	  </View>
	</TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  systemContainer: {
    flex: 3,
    padding: '1%',    
    backgroundColor: '#39663C',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  }  
})
