import 'react-native-gesture-handler';
import React, {Component} from 'react'
import {AppRegistry} from 'react-native';
import App from './src//App.js';
// import {name as appName} from './app.json';

export default class RnrfDemo extends Component{
	render(){
		return (<App/>);
	}
}
AppRegistry.registerComponent('LYVO', () => RnrfDemo);