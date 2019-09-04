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
  Alert,
  Picker
} from 'react-native';
 import { Dropdown } from 'react-native-material-dropdown';
import axios          from 'axios';
import {AsyncStorage} from 'react-native';
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
      fullPropertyType : 'Select Property Type',
      propertyLocation : '',
      toggle : false,
      toggleText:'Sell',
      propertyTypeList : [{label: 'ALL RESIDENTIAL',       value: '',                                   disabled : true}, 
                         {label: 'Studio Apartment',       value: 'Residential-Studio Apartment',       disabled : false},
                         {label: 'Residential House',      value: 'Residential-Residential House',      disabled : false},
                         {label: 'MultiStorey Apartment',  value: 'Residential-MultiStorey Apartment',  disabled : false},
                         {label: 'Villa',                  value: 'Residential-Villa',                  disabled : false},
                         {label: 'Penthouse',              value: 'Residential-Penthouse',              disabled : false},
                         {label: 'ALL COMMERCIAL ',        value: '',                                   disabled : true},
                         {label: 'Commercial Office Space',value: 'Commercial-Commercial Office Space', disabled : false},
                         {label: 'Office in IT Park/SEZ',  value: 'Commercial-Office in IT Park/SEZ',   disabled : false},
                         {label: 'Commercial Shop',        value: 'Commercial-Commercial Shop',         disabled : false},
                         {label: 'Commercial Showroom',    value: 'Commercial-Commercial Showroom',     disabled : false},
                         {label: 'Warehouse/Godown',       value: 'Commercial-Warehouse/Godown',        disabled : false},
                         {label: 'Industrial Building',    value: 'Commercial-Industrial Building',     disabled : false}],
      floorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      totalFloorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      floor: 'Basement',
      totalFloor:'Total Floors',
      propertyType : '',
      propertySubType : '',

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

  submitFun(){

    this.props.navigation.navigate('PropertyDetails1');
    // var all = this.state.fullPropertyType;

    const formValues = {
        "propertyHolder"  : this.state.propertyHolder,
        "transactionType" : this.state.toggleText,
        "propertyType"    : this.state.propertyType,
        "propertySubType" : this.state.propertySubType,
        "floor"           : this.state.floor,
        "totalFloor"      : this.state.totalfloor,
        "listing"         : false,
        "status"          : "WIP",
        // "uid"         : localStorage.getItem("uid"),
        // "property_id"   : this.props.property_id

      };

  }

  selectProp(value){
    console.log("here selected value",value);

    var propertyTypeVal = value.split("-");
    var propertyType = propertyTypeVal[0];
    var propertySubType = propertyTypeVal[1];

    
    console.log("propertyType",propertyType);
    console.log("propertySubType",propertySubType);

    this.setState({
      fullPropertyType: value,
      propertyType : propertyType,
      propertySubType : propertySubType,
    });
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
            <View style={[styles.marginBottom15,{width:'100%'}]}>
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

            
            <Text style={[styles.heading2,styles.marginBottom5]}>Property Type</Text>

                 <View style={[styles.inputWrapper,styles.marginBottom15]}>
                    <View style={styles.inputTextWrapperFull}>
                      <Dropdown
                        // label               = 'Property Type'
                        containerStyle      = {styles.ddContainer}
                        dropdownOffset      = {{top:0, left: 0}}
                        itemTextStyle       = {styles.ddItemText}
                        inputContainerStyle = {styles.ddInputContainer}
                        labelHeight         = {10}
                        tintColor           = {colors.button}
                        labelFontSize       = {sizes.label}
                        fontSize            = {15}
                        baseColor           = {'#666'}
                        textColor           = {'#333'}
                        labelTextStyle      = {styles.ddLabelTextFull}
                        style               = {styles.ddStyle}
                        data                = {this.state.propertyTypeList}
                        value               = {this.state.fullPropertyType}
                        // onChangeText        = {this.selectProp.bind(this)}
                        onChangeText={ (fullPropertyType) => this.selectProp(fullPropertyType) } 
                        // onChangeText        = {fullPropertyType => {this.setState({fullPropertyType});}}
                      />
                    </View>
                </View>
            
            <Text style={[styles.heading2,styles.marginBottom5]}>My Property is on</Text>
             <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
              <View style={[styles.inputWrapper2,{height:40}]}>
                <View style={styles.inputImgWrapper2}>
                  <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper2}>
                 <Dropdown
                  
                  containerStyle      = {styles.ddContainer,styles.dropHeight,{paddingLeft:5}}
                  dropdownOffset      = {{top:0, left: 0}}
                  itemTextStyle       = {styles.ddItemText}
                  inputContainerStyle = {styles.ddInputContainer}
                  labelHeight         = {10}
                  tintColor           = {colors.button}
                  labelFontSize       = {sizes.label}
                  fontSize            = {15}
                  baseColor           = {'#666'}
                  textColor           = {'#333'}
                  labelTextStyle      = {styles.ddLabelTextFull}
                  style               = {styles.ddStyle}
                  data                = {this.state.floorData}
                  value               = {this.state.floor}
                  onChangeText        = {floor => {this.setState({floor});}}
                />
                </View>
              </View>
              <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
              {/*  <Text style={styles.heading3}>of</Text>*/}
              </View>
                <View style={[styles.inputWrapper2,{height:40}]}>
              
                <View style={styles.inputImgWrapper2}>
                  <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                </View>
                <View style={[styles.inputTextWrapper2]}>
                  <Dropdown
                  
                  containerStyle      = {styles.ddContainer,styles.dropHeight,{paddingLeft:5}}
                  dropdownOffset      = {{top:0, left: 0}}
                  itemTextStyle       = {styles.ddItemText}
                  inputContainerStyle = {styles.ddInputContainer}
                  labelHeight         = {10}
                  tintColor           = {colors.button}
                  labelFontSize       = {sizes.label}
                  fontSize            = {15}
                  baseColor           = {'#666'}
                  textColor           = {'#333'}
                  labelTextStyle      = {styles.ddLabelTextFull}
                  style               = {styles.ddStyle}
                  data                = {this.state.totalFloorData}
                  value               = {this.state.totalFloor}
                  onChangeText        = {totalFloor => {this.setState({totalFloor});}}
                  />
                </View>
              </View>
            </View>

            <Button
            
              onPress         = {this.submitFun.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('PropertyDetails2')}
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