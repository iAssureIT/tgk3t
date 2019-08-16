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

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import SwitchToggle from 'react-native-switch-toggle';

const window = Dimensions.get('window');

export default class PropertyDetails1 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      activeTab : 'owner',
      propertyType : '',
      propertyLocation : '',
      toggle : false,
      toggleText:'Sell'
    };
  }

  setActive = (name)=>{
    this.setState({activeTab:name});
  }

  onToggle=()=>{
    let {toggle} = this.state;
    if(toggle){
      this.setState({toggleText:'Sell'})
    }else{
      this.setState({toggleText:'Rent'})
    }
    this.setState({toggle:!this.state.toggle});
  }

  render(){
    
    const { navigation } = this.props;
    let {activeTab} = this.state;
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
                Let’s provide details of your property for sell
              </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={[styles.alignCenter,styles.marginBottom15]}>
              <Image 
                source={require('../../images/property.png') }
              />
            </View>

            <Text style={styles.heading2}>I am</Text>
            <View style={[styles.tabWrap,styles.marginBottom15]}>
              <TouchableOpacity 
                onPress = {()=>this.setActive('owner')}
                style={[(activeTab=="owner"?styles.activeTabView:styles.tabView),styles.tabBorder,styles.borderRadiusLeft]}
              >
                  <Icon
                    name="man" 
                    type="entypo"
                    size={16}
                    color="white"
                  />
                  <Text style={styles.tabText}>Owner</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress = {()=>this.setActive('careTaker')}
                style={[(activeTab=="careTaker"?styles.activeTabView:styles.tabView),styles.tabBorder]}
              >
                <Icon
                  name="home-account" 
                  type="material-community"
                  size={18}
                  color="white"
                />
                <Text style={styles.tabText}>Care Taker</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress = {()=>this.setActive('builder')}
                style={[(activeTab=="builder"?styles.activeTabView:styles.tabView),styles.borderRadiusRight]}
              >
                <Icon
                  name="home-city" 
                  type="material-community"
                  size={16}
                  color="white"
                />
                <Text style={styles.tabText}>Builder</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heading2}>I would like to</Text>
            <View style={[{width:'100%'}]}>
              <SwitchToggle
                switchOn={this.state.toggle}
                onPress={()=>this.onToggle()}
                circleColorOn={colors.button}
                circleColorOff={colors.primary}
                buttonText={this.state.toggleText}
                containerStyle={{
                  width: 130,
                  height: 38,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  padding: 0,
                  borderWidth:1,
                  borderColor:'#ccc',
                  padding:2,
                }}
                circleStyle={{
                  width: 80,
                  height: 34,
                  borderRadius: 20,
                  justifyContent:'center',
                  alignItems:'center',
                }}
                buttonTextStyle={{
                  color:'#fff',
                  fontFamily:'Roboto-Regular',
                  fontSize: 13
                }}
              />
            </View>

            <Text style={[styles.heading2,styles.marginBottom5]}>Property Details</Text>
            <Text style={[styles.heading3,styles.marginBottom5]}>My property type is</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Multistorey Apartment"
                  onChangeText          = {propertyType => {this.setState({propertyType})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.propertyType}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="map-marker-outline" type="material-community" size={20}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "My Property is located in"
                  onChangeText          = {propertyLocation => {this.setState({propertyLocation})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.propertyLocation}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

            <Button
              onPress         = {()=>this.props.navigation.navigate('PropertyDetails2')}
              titleStyle      = {styles.buttonText}
              title           = "Save & Next"
              buttonStyle     = {styles.button}
              containerStyle  = {[styles.buttonContainer,styles.marginBottom15]}
              iconRight
              icon = {<Icon
                name="chevrons-right" 
                type="feather"
                size={22}
                color="white"
              />}
            />

          </View>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

