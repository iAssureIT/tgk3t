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
import DatePicker from "react-native-datepicker";

const window = Dimensions.get('window');

export default class PropertyDetails3 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      superArea : '',
      builtArea : '',
      expectedRate : '',
      totalAsk : '',
      totalAskIndex : 0,
      availableFromDate : '',
      dropdownData:[
      {
        value: 'Monthly'
      },
      {
        value: 'Yearly'
      }]
    };
  }

  onSelect=(index,value)=>{
    this.setState({
      totalAskIndex: index,
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
                My Apartment size and Financial Details
              </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper2}>
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
              <View style={styles.inputRightWrapper}>
                <Text style={styles.inputText}>Sq ft</Text>
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper2}>
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
              <View style={styles.inputRightWrapper}>
                <Text style={styles.inputText}>Sq ft</Text>
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper2}>
                <TextField
                  label                 = "Expected Rate"
                  onChangeText          = {expectedRate => {this.setState({expectedRate})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.expectedRate}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                />
              </View>
              <View style={styles.inputRightWrapper}>
                <Text style={styles.inputText}>Sq ft</Text>
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Total Ask"
                  onChangeText          = {totalAsk => {this.setState({totalAsk})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.totalAsk}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                  maxLength             = {10}
                />
              </View>
            </View>

            <Text style={[styles.heading2,styles.marginBottom15]}>My Total ask includes</Text>
            <View style={[styles.marginBottom25]}>
              <RadioGroup
                size={20}
                color={colors.grey}
                thickness={2}
                selectedIndex = {this.state.totalAskIndex}
                onSelect = {(index, value) => this.onSelect(index, value)}
              >
                <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'carPark'} >
                  <Text style={styles.inputText}>Car Park</Text>
                </RadioButton>
         
                <RadioButton style={{paddingHorizontal:0}} value={'oneTimeMaintenance'}>
                  <Text style={styles.inputText}>One Time Maintenance</Text>
                </RadioButton>
         
                <RadioButton style={{paddingHorizontal:0}} value={'stampDuty&Registration'}>
                  <Text style={styles.inputText}>Stamp Duty & Registration</Text>
                </RadioButton>

                <RadioButton style={{paddingHorizontal:0,paddingBottom:0}} value={'clubhouse'}>
                  <Text style={styles.inputText}>Clubhouse</Text>
                </RadioButton>
              </RadioGroup>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="rupee" type="font-awesome" size={17}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Maintenance Charge"
                  onChangeText          = {maintenanceCharge => {this.setState({maintenanceCharge})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.maintenanceCharge}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                  maxLength             = {10}
                />
              </View>
            </View>  

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="home" type="feather" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Per'
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
                  value               = {this.state.maintenanceChargePer}
                  onChangeText        = {maintenanceChargePer => {this.setState({maintenanceChargePer});}}
                />
              </View>
            </View> 

            <Text style={[styles.heading2,styles.marginBottom15]}>My Apartment is available from</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="calendar" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <DatePicker
                  style={{
                    flex:1,
                    width: "100%",
                    marginRight:5,
                  }}
                  date={this.state.availableFromDate}
                  mode="date"
                  placeholder="dd/mm/yyyy"
                  format="DD/MM/YYYY"
                 
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      alignItems:'flex-start',
                      fontFamily:'Montserrat-Regular',
                      paddingLeft:5
                    },
                    dateTouchBody:{
                      fontFamily:'Montserrat-Regular'
                    },
                    dateText:{
                      fontFamily:'Montserrat-Regular'
                    },
                    placeholderText:{
                      fontFamily:'Montserrat-Regular'
                    }
                  }}
                  onDateChange={availableFromDate => {this.setState({ availableFromDate});}}
                  showIcon = {false}
                  minDate = {new Date()}
                />
              </View>
            </View>

            <Text style={[styles.heading2,styles.marginBottom15]}>Description</Text>
            <View style={[styles.descriptionView,styles.marginBottom15]}>
              <Text style={styles.inputText}>
                My property is a semi furnished 3 BHK flat in a
                centrally located society, with excellent access
                to city center and all key points such as Airport,
                Railway Station and Bus Stop. It comes with
                24x7 water supply, uninterrupted electricity and
                excellent security.
              </Text>
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

