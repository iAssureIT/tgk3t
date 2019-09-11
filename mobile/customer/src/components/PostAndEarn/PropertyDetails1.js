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
import Hr from "react-native-hr-component";
import { Dropdown }   from 'react-native-material-dropdown';
import axios          from 'axios';
import {AsyncStorage} from 'react-native';
import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
// import { Dropdown } from 'react-native-material-dropdown';
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
      // floorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      // totalFloorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      // floor: 'Basement',
      // totalFloor:'Total Floors',
      propertyType : '',
      propertySubType : '',
       pincode : '',
      stateData : [
                    {
                      value: 'Maharashtra',
                    },
                    {
                      value: 'Punjab',
                    },
                    {
                      value: 'Delhi',
                    },
                    {
                      value: 'Kerala',
                    }],
      cityData : [
                    {
                      value: 'Pune City',
                    },
                    {
                      value: 'Pashan',
                    },
                    {
                      value: 'Khanapur',
                    }],
      areaData : [
                    {
                      value: 'Hadapsar',
                    },
                    {
                      value: 'Kharadi',
                    }],
      subAreaData : [
                    {
                      value: 'Amanora Township',
                    },
                    {
                      value: 'Bhosale Nagar',
                    },
                    {
                      value: 'Gadital'
                    }],
      society : '',
      house   : '',
      landmark : '',
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

    // var all = this.state.fullPropertyType;

    const formValues = {
        "propertyHolder"  : this.state.propertyHolder,
        "transactionType" : this.state.toggleText,
        "propertyType"    : this.state.propertyType,
        "propertySubType" : this.state.propertySubType,
        // "floor"           : this.state.floor,
        // "totalFloor"      : this.state.totalfloor,
        "listing"         : false,
        "status"          : "WIP",

        "pincode"         : this.state.pincode,
        "state"           : this.state.stateName,
        "city"            : this.state.cityName,
        "area"            : this.state.areaName,
        "subarea"         : this.state.subAreaName,
        "society"         : this.state.society,
        "house"           : this.state.house,
        "landmark"        : this.state.landmark,
        // "uid"         : localStorage.getItem("uid"),
        // "property_id"   : this.props.property_id

      };


      console.log("formValues",formValues);
      this.props.navigation.navigate('PropertyDetails3');

  }

  selectProp(value){
    // console.log("here selected value",value);

    var propertyTypeVal = value.split("-");
    var propertyType = propertyTypeVal[0];
    var propertySubType = propertyTypeVal[1];

    
    // console.log("propertyType",propertyType);
    // console.log("propertySubType",propertySubType);

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
            
       {/*     <Text style={[styles.heading2,styles.marginBottom5]}>My Property is on</Text>
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
            </View>*/}

            <Text style={[styles.heading2,styles.marginBottom5]}>Pincode</Text>
            <View style={[styles.inputWrapper]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Enter Pincode"
                  onChangeText          = {pincode => {this.setState({pincode})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.pincode}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

             <Hr lineColor="#666" width={1} text="OR" textStyles={styles.customStylesHere} />

          {/*horizontal line*/}


              <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                  <View style={[styles.inputWrapper2]}>
                    <View style={styles.inputTextWrapperFull}>
                       <Dropdown
                      label               = 'State'
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
                      labelTextStyle      = {styles.ddLabelText}
                      style               = {styles.ddStyle}
                      data                = {this.state.stateData}
                      value               = {this.state.stateName}
                      onChangeText        = {stateName => {this.setState({stateName});}}
                    />
                    </View>
                  </View>
                  <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                   {/* <Text style={styles.heading3}>of</Text>*/}
                  </View>
                  <View style={[styles.inputWrapper2]}>
                    <View style={styles.inputTextWrapperFull}>
                       <Dropdown
                      label               = 'City'
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
                      labelTextStyle      = {styles.ddLabelText}
                      style               = {styles.ddStyle}
                      data                = {this.state.cityData}
                      value               = {this.state.cityName}
                      onChangeText        = {cityName => {this.setState({cityName});}}
                    />
                    </View>
                  </View>
            </View>

             <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom20]}>
                  <View style={[styles.inputWrapper2]}>
                    <View style={styles.inputTextWrapperFull}>
                       <Dropdown
                      label               = 'Area/Suburb'
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
                      labelTextStyle      = {styles.ddLabelText}
                      style               = {styles.ddStyle}
                      data                = {this.state.areaData}
                      value               = {this.state.areaName}
                      onChangeText        = {areaName => {this.setState({areaName});}}
                    />
                    </View>
                  </View>
                  <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                   {/* <Text style={styles.heading3}>of</Text>*/}
                  </View>
                  <View style={[styles.inputWrapper2]}>
                    <View style={styles.inputTextWrapperFull}>
                       <Dropdown
                      label               = 'Sub-Area'
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
                      labelTextStyle      = {styles.ddLabelText}
                      style               = {styles.ddStyle}
                      data                = {this.state.subAreaData}
                      value               = {this.state.subAreaName}
                      onChangeText        = {subAreaName => {this.setState({subAreaName});}}
                    />
                    </View>
                  </View>
            </View>

             {/*remaining items*/}

            <Text style={[styles.heading2,styles.marginBottom5]}>Society</Text>
            <View style={[styles.inputWrapper,styles.marginBottom15]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Enter Society"
                  onChangeText          = {society => {this.setState({society})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.society}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

             <Text style={[styles.heading2,styles.marginBottom5]}>House/Building Number</Text>
            <View style={[styles.inputWrapper,styles.marginBottom15]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Enter House Address"
                  onChangeText          = {house => {this.setState({house})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.house}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>


             <Text style={[styles.heading2,styles.marginBottom5]}>Landmark</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Enter landmark"
                  onChangeText          = {landmark => {this.setState({landmark})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.landmark}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

          {/*here end*/}


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