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
import Hr from "react-native-hr-component";
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
                Let's provide details of your property location
              </Text>
            </View>

            <View style={styles.divider}></View>

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
              onPress         = {()=>this.props.navigation.navigate('PropertyDetails3')}
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

