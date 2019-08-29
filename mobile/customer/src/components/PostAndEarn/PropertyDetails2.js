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

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';

const window = Dimensions.get('window');

export default class PropertyDetails2 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      activeTab : 'owner',
      society : '',
      address : '',
      floor : '',
      totalFloor : '',
      furnishedValue:'',
      furnishedIndex : 0,
      dropdownData : [
      {
        value: '1',
      },
      {
        value: '2',
      },
      {
        value: '3',
      },
      {
        value: '4',
      }],
      yearsData : [
      {
        value: '0 - 5',
      },
      {
        value: '6 - 10',
      },
      {
        value: '11 - 15',
      },
      {
        value: '16 - 20',
      }],
      propertyFacingData : [
      {
        value: 'East',
      },
      {
        value: 'West',
      },
      {
        value: 'North',
      },
      {
        value: 'South',
      }],
    };
  }

  setActive = (name)=>{
    this.setState({activeTab:name});
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

    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
                Please provide details of your property to SELL
              </Text>
            </View>

            <View style={styles.divider}></View>

            <Text style={[styles.heading2,styles.marginBottom15]}>My Apartment</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Society"
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

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="map-marker-outline" type="material-community" size={20}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Address"
                  onChangeText          = {address => {this.setState({address})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.address}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

            <Text style={[styles.heading2,styles.marginBottom15]}>My Apartment is on</Text>
            <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
              <View style={[styles.inputWrapper2]}>
                <View style={styles.inputImgWrapper2}>
                  <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper2}>
                  <TextField
                    label                 = "Floor"
                    onChangeText          = {floor => {this.setState({floor})}}
                    lineWidth             = {1}
                    tintColor             = {colors.button}
                    inputContainerPadding = {0}
                    labelHeight           = {15}
                    labelFontSize         = {sizes.label}
                    titleFontSize         = {10}
                    baseColor             = {'#666'}
                    textColor             = {'#666'}
                    value                 = {this.state.floor}
                    containerStyle        = {styles.textContainer}
                    inputContainerStyle   = {styles.textInputContainer}
                    titleTextStyle        = {styles.textTitle}
                    style                 = {styles.textStyle}
                    labelTextStyle        = {styles.textLabel}
                    keyboardType          = "numeric"
                  />
                </View>
              </View>
              <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.heading3}>of</Text>
              </View>
              <View style={[styles.inputWrapper2]}>
                <View style={styles.inputImgWrapper2}>
                  <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper2}>
                  <TextField
                    label                 = "Total Floor"
                    onChangeText          = {totalFloor => {this.setState({totalFloor})}}
                    lineWidth             = {1}
                    tintColor             = {colors.button}
                    inputContainerPadding = {0}
                    labelHeight           = {15}
                    labelFontSize         = {sizes.label}
                    titleFontSize         = {10}
                    baseColor             = {'#666'}
                    textColor             = {'#666'}
                    value                 = {this.state.totalFloor}
                    containerStyle        = {styles.textContainer}
                    inputContainerStyle   = {styles.textInputContainer}
                    titleTextStyle        = {styles.textTitle}
                    style                 = {styles.textStyle}
                    labelTextStyle        = {styles.textLabel}
                    keyboardType          = "numeric"
                  />
                </View>
              </View>
            </View>

            <Text style={[styles.heading2,styles.marginBottom15]}>My Apartment has</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="office-building" type="material-community" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Bedroom'
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
                  data                = {this.state.dropdownData}
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
                  data                = {this.state.dropdownData}
                  value               = {this.state.balconies}
                  onChangeText        = {balconies => {this.setState({balconies});}}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="bath" type="font-awesome" size={17}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Bathroom'
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
                  data                = {this.state.dropdownData}
                  value               = {this.state.bathroom}
                  onChangeText        = {bathroom => {this.setState({bathroom});}}
                />
              </View>
            </View>

            <Text style={[styles.heading2,styles.marginBottom15]}>It is</Text>
            <View style={[styles.marginBottom25]}>
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

