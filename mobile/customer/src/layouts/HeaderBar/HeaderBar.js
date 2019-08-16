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

import styles from "./styles.js";

export default class NotificationHeader extends ValidationComponent {
  constructor(props) {
    super(props);
    
  }

  toggleDrawer = () =>{
    this.props.navigation.openDrawer();
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
            />
          </View>
        }
      
        rightComponent={
          
            <TouchableOpacity onPress={()=>this.toggleDrawer()}>
              <Icon size={28} name='menu' type='material-community' color='#fff' />
            </TouchableOpacity>

        }
        containerStyle={styles.container}
      />
    );
  }
}
