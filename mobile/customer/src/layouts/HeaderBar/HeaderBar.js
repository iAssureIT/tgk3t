import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Header, Icon  }                     from 'react-native-elements';
import ValidationComponent                   from "react-native-form-validator";
import { NavigationActions, StackActions, }  from 'react-navigation'
import { DrawerActions }                     from 'react-navigation-drawer';
import styles                                from "./styles.js";

import AsyncStorage from '@react-native-community/async-storage';

export default class NotificationHeader extends React.Component {

navigateScreen=(route)=>{
    const navigateAction = NavigationActions.navigate({
    routeName: route,
    params: {},
    action: NavigationActions.navigate({ routeName: route }),
  });
  this.props.navigation.dispatch(navigateAction);
}

// navigateScreen=(route)=>{
//     const navigateAction = StackActions.push({
//     routeName: route,
//     params: {},
//     action: NavigationActions.navigate({ routeName: route }),
//   });
//   this.props.navigation.dispatch(navigateAction);
// }
  constructor(props) {
    super(props);
    this.state={
      'uid':"",
      'token':"",
    }
  }

  componentDidMount(){
    this.retrieveToken();
  }


  retrieveToken = async()=>{
    var token = await AsyncStorage.getItem('token')
    var uid = await AsyncStorage.getItem('uid')
    if(token!==""){
      this.setState({token:token})
    }
  }

   toggleDrawer = () => {
      this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  homescreen(){
      this.navigateScreen('Home');
  }

  login(){
    AsyncStorage.setItem("originPage","home");
    // console.log("token in home screen",this.state.token);
    this.navigateScreen("MobileScreen");
 // this.navigateScreen("Availability");
  }
 

  render() {
    const { goBack } = this.props.navigation;
    console.log("this.state.token=>Header",this.state.token);
    return (
      <Header
        placement="center"
        
        leftComponent={
          this.props.showBackBtn
          ?
            <TouchableOpacity onPress={()=> goBack()}>
              <Icon size={28} name='chevrons-left' type='feather' color='#fff' />
            </TouchableOpacity>
          :
            null
        }

        centerComponent={
          <TouchableOpacity onPress={this.homescreen.bind(this)}>
            <Image 
              source={require('../../images/logo.png') }
              style={{ width: 70 }}
              resizeMode="contain"
              onPress={this.homescreen.bind(this)}
            />
          </TouchableOpacity>
        }
      
        rightComponent={
          // this.state.token ?
            <TouchableOpacity onPress={this.toggleDrawer}>
              <Icon size={28} name='menu' type='material-community' color='#fff' />
            </TouchableOpacity>
            // :
            //  <TouchableOpacity onPress={this.login.bind(this)}>
            //   <Icon size={28} name='login' type='material-community' color='#fff' />
            // </TouchableOpacity>
        }
        containerStyle={styles.container}
      />
    );
  }
}


