import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Header, Icon  } from 'react-native-elements';
import ValidationComponent from "react-native-form-validator";
import { NavigationActions } from 'react-navigation'

import styles from "./styles.js";

import AsyncStorage               from '@react-native-community/async-storage';

export default class NotificationHeader extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      'uid':"",
      'token':"",
    }
  }


  retrieveToken = async()=>{
    var token = await AsyncStorage.getItem('token')
    var uid = await AsyncStorage.getItem('uid')
    // console.log('token',token)
    // console.log('uid',uid)
    this.setState({token:token})
  }

   toggleDrawer = () => {
      this.props.navigation.toggleDrawer(); 
  }


  render() {
    
    return (
      <Header
        placement="center"
        
        leftComponent={
          this.props.showBackBtn
          ?
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Icon size={28} name='chevrons-left' type='feather' color='#fff' />
            </TouchableOpacity>
          :
            null
        }

        centerComponent={
          <View>
            <Image 
              source={require('../../images/logo.png') }
              style={{ width: 70 }}
              resizeMode="contain"
            />
          </View>
        }
      
        rightComponent={
          
            <TouchableOpacity onPress={this.toggleDrawer}>
              <Icon size={28} name='menu' type='material-community' color='#fff' />
            </TouchableOpacity>

        }
        containerStyle={styles.container}
      />
    );
  }
}


