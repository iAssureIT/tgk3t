/**
 * @format
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';

export default class RnrfDemo extends Component{
	render(){
		return (<App/>);
	}
}
AppRegistry.registerComponent('LYVO_FA_APP', () => RnrfDemo);