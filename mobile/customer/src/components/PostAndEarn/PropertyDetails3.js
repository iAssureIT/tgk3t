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

import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from "react-native-datepicker";

const window = Dimensions.get('window');

export default class PropertyDetails3 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      
      bedroomData : [{ value: 1},
                     { value: 2},
                     { value: 3},
                     { value: 4},
                     { value: 5},
                     { value: 6}],

       balconieData : [{ value: 1},
                     { value: 2},
                     { value: 3},
                     { value: 4},
                     { value: 5},
                     { value: 6}],

       bathroomData : [{ value: 1},
                     { value: 2},
                     { value: 3},
                     { value: 4},
                     { value: 5},
                     { value: 6}],
      furnishedValue :'',
      furnishedIndex : 0,
      yearsData : [ {label:"Under Construction", value: 'Under Construction',},
                    {label:"new", value: 'New(Less than a year)',},
                    {label:"1-2 Years", value: '1-2',},
                    {label:"2-5 Years", value: '2-5',},
                    {label:"5-8 Years", value: '5-8',},
                    {label:">8 Years", value: '>8',}],

      propertyFacingData : [{label:"East", value: 'East',},
                            {label:"West", value: 'West',},
                            {label:"North", value: 'North',},
                            {label:"South", value: 'South',},
                            {label:"Northeast", value: 'Northeast',},
                            {label:"Northwest", value: 'Northwest',},
                            {label:"Southeast", value: 'Southeast',},  
                            {label:"Southwest", value: 'Southwest',}],

      superArea : '',
      builtArea : '',
      UnitData  : [{label:"Sq ft", value:"Sq ft"},
                  {label:"Sq Meter", value:"Sq Meter"},
                  {label:"Guntha", value:"Guntha"},
                  {label:"Acre", value:"Acre"},
                  {label:"Sq-Yrd", value:"Sq-Yrd"},
                  {label:"Bigha", value:"Bigha"},
                  {label:"Hectare", value:"Hectare"},
                  {label:"Marla", value:"Marla"},
                  {label:"Kanal", value:"Kanal"}],
      unit : 'Sq ft',
     /* expectedRate : '',
      totalAsk : '',
      totalAskIndex : 0,
      availableFromDate : '',
      dropdownData:[
      {
        value: 'Monthly'
      },
      {
        value: 'Yearly'
      }]*/
    };
  }


  onSelect=(index,value)=>{
    this.setState({
      furnishedIndex: index,
      furnishedValue: value
    });
  }

  render(){
    
    const { navigation } = this.props;
    let {activeTab} = this.state;

    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
               Let's provide details of your property
              </Text>
            </View>

            <View style={styles.divider}></View>

            <Text style={[styles.heading2,styles.marginBottom15]}>My Property has</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="office-building" type="material-community" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Bedrooms'
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
                  data                = {this.state.bedroomData}
                  value               = {this.state.bedroom}
                  onChangeText        = {bedroom => {this.setState({bedroom});}}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="office-building" type="material-community" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Balconies'
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
                  data                = {this.state.balconieData}
                  value               = {this.state.balconies}
                  onChangeText        = {balconies => {this.setState({balconies});}}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom15]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="bath" type="font-awesome" size={17}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Bathrooms'
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
                  data                = {this.state.bathroomData}
                  value               = {this.state.bathroom}
                  onChangeText        = {bathroom => {this.setState({bathroom});}}
                />
              </View>
            </View>

          {/*2nd*/}

            <Text style={[styles.heading2,styles.marginBottom15]}>It is</Text>
            <View style={[styles.marginBottom15]}>
              <RadioGroup
                size={20}
                color={colors.grey}
                thickness={2}
                selectedIndex = {this.state.furnishedIndex}
                onSelect = {(index, value) => this.onSelect(index, value)}
              >
                <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'fullFurnished'} >
                  <Text style={styles.inputText}>Full furnished</Text>
                </RadioButton>
         
                <RadioButton style={{paddingHorizontal:0}} value={'semiFurnished'}>
                  <Text style={styles.inputText}>Semi furnished</Text>
                </RadioButton>
         
                <RadioButton style={{paddingHorizontal:0,paddingBottom:0}} value={'unfurnished'}>
                  <Text style={styles.inputText}>Unfurnished</Text>
                </RadioButton>
              </RadioGroup>
            </View>

             <Text style={[styles.heading2,styles.marginBottom15]}>It is</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="home" type="feather" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Years old'
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
                  data                = {this.state.yearsData}
                  value               = {this.state.yearsOld}
                  onChangeText        = {yearsOld => {this.setState({yearsOld});}}
                />
              </View>
            </View>

             <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="crosshairs" type="font-awesome" size={20}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Property Facing'
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
                  data                = {this.state.propertyFacingData}
                  value               = {this.state.propertyFacing}
                  onChangeText        = {propertyFacing => {this.setState({propertyFacing});}}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapperM}>
                <TextField
                  label                 = "Super Area"
                  onChangeText          = {superArea => {this.setState({superArea})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.superArea}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                />
              </View>
              <View style={[styles.inputRightWrapper1,{height:35}]}>
                <Dropdown
                  containerStyle      = {styles.dropHeight,{paddingLeft:5}}
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
                  data                = {this.state.UnitData}
                  value               = {this.state.unit}
                  onChangeText        = {unit => {this.setState({unit});}}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapperM}>
                <TextField
                  label                 = "Built Area"
                  onChangeText          = {builtArea => {this.setState({builtArea})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.builtArea}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                />
              </View>
              <View style={[styles.inputRightWrapper1,{height:35}]}>
                <Dropdown
                  containerStyle      = {styles.dropHeight,{paddingLeft:5}}
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
                  data                = {this.state.UnitData}
                  value               = {this.state.unit}
                  onChangeText        = {unit => {this.setState({unit});}}
                />
              </View>
            </View>

            <View>
                  
              </View>

            {/*end*/}


            <Button
              onPress         = {()=>this.props.navigation.navigate('PropertyDetails4')}
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

