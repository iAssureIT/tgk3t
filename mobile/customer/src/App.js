import React, { Component } from "react";
import {View,Text} from "react-native";
import axios        from 'axios';
import  HomeStack  from "./config/routes.js";

import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

const HomeStackContainer = createAppContainer(HomeStack);


// axios.defaults.baseURL = 'http://localhost:5018/';
// axios.defaults.baseURL = 'http://qalyvoapi.nurseryworld.in/';

// axios.defaults.baseURL = 'http://qatgk3tapi.iassureit.com/';

// axios.defaults.baseURL = 'http://uatapi.lyvo.in/';
axios.defaults.baseURL = 'http://qatgk3tapi.iassureit.com/';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // const { status, loggingIn } = this.props;
      setTimeout(() => {
      SplashScreen.hide();
    }, 3000)
  }

  render() {

    return <HomeStackContainer />;

  }
}
