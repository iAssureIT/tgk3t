import React, { Component } from "react";
import {View,Text} from "react-native";

import  HomeStack  from "./config/routes.js";

import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

const HomeStackContainer = createAppContainer(HomeStack);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // const { status, loggingIn } = this.props;
      setTimeout(() => {
      SplashScreen.hide();
    }, 800)
  }

  render() {

    return <HomeStackContainer />;

  }
}
