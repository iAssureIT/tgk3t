import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,TextInput,
  Alert
} from 'react-native';

import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import CheckBox from 'react-native-check-box'

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';

const window = Dimensions.get('window');

export default class PropertySuccess extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      
      
    };
  }

  
  render(){

    const { navigation } = this.props;
    

    return (
      <React.Fragment>
        <HeaderBar navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>

          <View style={[{width:'100%',justifyContent:'center',alignItems:'center'},styles.marginBottom15]}>
            <Image 
              style={{height:100,width:120}}
              resizeMode={"contain"}
              source={require('../../images/fireworks.png') }
            />
          </View>

          <View style={[styles.alignCenter,styles.marginBottom15]}>
            <Text style={{fontSize:28,fontFamily:'Roboto-Medium',fontStyle:'italic',color:colors.button}}>Congratulations</Text>
          </View>

          <View style={[styles.alignCenter,styles.marginBottom15]}>
            <Text style={styles.heading4}>Your Property is</Text>
            <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.golden}}>FAST SELLING HOT POTATO</Text>
            <Text style={[styles.heading4,{textAlign:'center'}]}>and qualifies for a 
              <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.golden}}> 40% </Text> 
              brokerage to be paid by us on successful deal through us
            </Text>
          </View>

          <View style={[styles.alignCenter,styles.marginBottom15]}>
            <Image 
              source={require('../../images/sellometer.png') }
            />
            <Text style={styles.heading}>Sell-O-Meter</Text>
          </View>

          <View style={[styles.alignCenter,{paddingHorizontal:15}]}>
            <Text style={[styles.heading4,{textAlign:'center'}]}>
              Your property 
                <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.button}}> Successfully </Text> 
              submitted & will be published soon!!
            </Text>
          </View>

          </View>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

