import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  TabBarIOS,
  TouchableHighlight,
  PushNotificationIOS,
  Text,
  ScrollView,
  StatusBar,
  View
} from 'react-native';

export default class growlab extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'tabControl'};
  }

  setTab(tabId) {
    this.setState({selectedTab: tabId});
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('register', (token) => {
      console.log('TOKEN', token)
    })
    PushNotificationIOS.addEventListener('notification', (notification) => console.log('Notification', notification))

    PushNotification.configure({
      onRegister: function(token) {
	console.log( 'TOKEN:', token );
      },
      onNotification: function(notification) {
	console.log( 'NOTIFICATION:', notification );
      },
      permissions: {
	alert: true,
	badge: true,
	sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });    
  }

  render() {
    return (
      <TabBarIOS>
	<TabBarIOS.Item
          systemIcon="favorites"
	  selected={this.state.selectedTab === 'tabControl'}
	  onPress={() => this.setTab('tabControl')}>
	  <TabControl/>
	</TabBarIOS.Item>

	<TabBarIOS.Item
          systemIcon="downloads"
	  selected={this.state.selectedTab === 'tabLog'}
	  onPress={() => this.setTab('tabLog')}>
	  <TabLog/>
	</TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

class TabControl extends React.Component {
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
	
	this.setState({
	  isLoading: false	
	}, function() {
	  // do something with new state
	});
      })
      .catch((error) => {
	console.error(error);
      });
  }

  toggle(event, type) {
    console.log(event)
    console.log('button clicked')
    this.setState((prevState, props) => {
      let obj = {}
      obj[type] = !prevState[type]
      console.log(obj)
      return obj
    })
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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
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
	<TouchableHighlight
	    style={[styles.button, this.state.grow_system_pumps && styles.button_active]}	    
	    onPress={(e) => this.toggle(e, 'grow_system_pumps')}>
	  <View>
            <Text style={[styles.button_text, this.state.grow_system_pumps && styles.button_text_active]}>System Pumps</Text>
	  </View>
        </TouchableHighlight>
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
	<TouchableHighlight
	    style={[styles.button, this.state.fill_valve && styles.button_active]}	    
	    onPress={(e) => this.toggle(e, 'fill_valve')}>
	  <View>
            <Text style={[styles.button_text, this.state.fill_valve && styles.button_text_active]}>Fill Valve</Text>
	  </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

class TabLog extends React.Component {

  render() {
    return (
      <View style={styles.tabContent}>
	<Text style={styles.tabText}>More</Text>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#080808'
  },
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin: 50,
    fontSize: 40
  },
  contentContainer: {
    backgroundColor: '#080808'
  },
  button: {
    width: '90%',
    height: 100,
    borderWidth: 2,
    borderColor: '#1CCE28',
    marginTop: '2.5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2.5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button_active: {
    backgroundColor: '#1CCE28'
  },  
  button_text: {
    textAlign: 'center',
    color: '#1CCE28'
  },
  button_text_active: {
    color: '#FFFFFF'
  }
});

AppRegistry.registerComponent('growlab', () => growlab);
