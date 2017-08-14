import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Config from 'react-native-config'

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      light: true,
      drain_valve: false,
      fill_valve: false,
      exhaust: false,
      ac: false,
      grow_system_pumps: false,
      drain_pump: false
    }
  }

  componentDidMount() {
    return fetch('https://growlab.space/api/relay_status')
      .then((response) => response.json())
      .then((responseJson) => {
	console.log(responseJson)
	responseJson.isLoading = false
	this.setState(responseJson)
      })
      .catch((error) => {
	console.error(error);
      });
  }

  toggle(event, type) {
    console.log(event)
    Alert.alert(
      'Are you sure?',
      '',
      [
	{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
	{text: 'Confirm', onPress: () => {
	  var url = `https://growlab.space/api/relays/${type}?` + [
	    'token=' + Config.TOKEN,
	    'on=' + !this.state[type]
	  ].join('&')

	  return fetch(url)
	    .then((response) => response.json())
	    .then((responseJson) => {
	      console.log(responseJson)
	      this.setState((prevState, props) => {
		let obj = {}
		obj[type] = !prevState[type]
		return obj
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
	<View style={{flex: 1, paddingTop: 20}}>
	  <ActivityIndicator />
	</View>
      );
    }

    return (
      <View style={styles.controlBody}>
	<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
	  <TouchableHighlight
	      style={[styles.button, this.state.light && styles.button_active]}
	      onPress={(e) => this.toggle(e, 'light')}>
	    <View>
	      <Text style={[styles.button_text, this.state.light && styles.button_text_active]}>Light</Text>
	    </View>
	  </TouchableHighlight>
	  <TouchableHighlight
	      style={[styles.button, this.state.exhaust && styles.button_active]}
	      onPress={(e) => this.toggle(e, 'exhaust')}>
	    <View>
	      <Text style={[styles.button_text, this.state.exhaust && styles.button_text_active]}>Exhaust</Text>
	    </View>
	  </TouchableHighlight>
	  <TouchableHighlight
	      style={[styles.button, this.state.ac && styles.button_active]}
	      onPress={(e) => this.toggle(e, 'ac')}>
	    <View>
	      <Text style={[styles.button_text, this.state.ac && styles.button_text_active]}>AC</Text>
	    </View>
	  </TouchableHighlight>
	</View>
	<View style={{flex: 1, flexDirection: 'row'}}>
	  <TouchableHighlight
	      style={[styles.button, this.state.grow_system_pumps && styles.button_active]}
	      onPress={(e) => this.toggle(e, 'grow_system_pumps')}>
	    <View>
	      <Text style={[styles.button_text, this.state.grow_system_pumps && styles.button_text_active]}>System Pumps</Text>
	    </View>
	  </TouchableHighlight>
	</View>
	<View style={{flex: 1, flexDirection: 'row'}}>
	  <TouchableHighlight
	      style={[styles.button, this.state.drain_valve && styles.button_active]}
	      onPress={(e) => this.toggle(e, 'drain_valve')}>
	    <View>
	      <Text style={[styles.button_text, this.state.drain_valve && styles.button_text_active]}>Drain Valve</Text>
	    </View>
	  </TouchableHighlight>
	  <TouchableHighlight
	      style={[styles.button, this.state.drain_pump && styles.button_active]}
	      onPress={(e) => this.toggle(e, 'drain_pump')}>
	    <View>
	      <Text style={[styles.button_text, this.state.drain_pump && styles.button_text_active]}>Drain Pump</Text>
	    </View>
	  </TouchableHighlight>
	</View>
	<View style={{flex: 1, flexDirection: 'row'}}>
	  <TouchableHighlight
	      style={[styles.button, this.state.fill_valve && styles.button_active]}
	      onPress={(e) => this.toggle(e, 'fill_valve')}>
	    <View>
	      <Text style={[styles.button_text, this.state.fill_valve && styles.button_text_active]}>Fill Valve</Text>
	    </View>
	  </TouchableHighlight>
	</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  controlBody: {
    backgroundColor: '#fff',
    padding: '1%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 6
  },
  button: {
    flex: 1,
    margin: '1%',
    height: '92%',
    borderWidth: 1,
    borderColor: '#39663C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button_active: {
    backgroundColor: '#39663C'
  },  
  button_text: {
    textAlign: 'center',
    color: '#39663C'
  },
  button_text_active: {
    color: '#FFFFFF'
  }
});
