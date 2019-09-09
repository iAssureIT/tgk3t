import React, { Component } from 'react';
import ValidationComponent from "react-native-form-validator";
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
import axios          from 'axios';
import {AsyncStorage} from 'react-native';
import styles from '../../PostAndEarn/styles.js';
import { Button,Icon, SearchBar } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import HeaderBar from '../../../layouts/HeaderBar/HeaderBar.js';
import {colors,sizes} from '../../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';


export default class MobileScreen extends ValidationComponent {
	
	constructor(props) {
		super(props);
		 this.state={
		      mobile : '',
		      codeData : [{ value: '+91'},
                     { value: '+82'},
                     { value: '+65'},
                     { value: '+49'},
                     { value: '+33'},
                     { value: '+45'}],
		      unitCode : '+91',
		    };
	}

	checkUser(){
		console.log("unitCode",this.state.unitCode);
		console.log("mobile",this.state.mobile);
   	    this.props.navigation.navigate('OTPScreen');
   	    
        var formValues = {
        mobileNumber : this.state.mobile,
        countryCode  : this.state.unitCode
      };
      console.log("LoginMobNum==",formValues);

      if(this.state.mobile!=""){

        
        axios
          .post('http://qatgk3tapi.iassureit.com/api/usersotp/verify_mobile',formValues)
          .then((response)=>{
            console.log("response = ",response.data);
              if(response.data.message === 'MOBILE-NUMBER-EXISTS')
              {
                // AsyncStorage.setItem('message', response.data.message);
                // AsyncStorage.setItem('user_id', response.data.user_id);
                console.log("here otp from response",response.data.otp);
                // AsyncStorage.setItem('originalotp', response.data.otp);
            
              AsyncStorage.multiSet([
                ['message',response.data.message],
                ['user_id',response.data.user_id],
                ['originalotp',response.data.otp],
              ])              

                this.props.navigation.navigate('OTPScreen');
          
              }else{
                this.props.navigation.navigate('OTPScreen');
                console.log("new mob no");
              }

            })
          .catch(function(error){
            console.log("here can't access the url");
            console.log(error);
          })
        
        }else{
          // swal("Please enter Mobile Number", "", "warning");
                console.log("enter value");
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
	}

	render() {
		const { navigation } = this.props;
    	let {activeBtn} = this.state;

		return (
      <React.Fragment>
            
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
               Owners earn upto 50% brokerage by selling/renting with us. So let’s get started.
              </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.alignCenter}>
              <Image 
                source={require('../../../images/1.png') }
              />
            </View>

            <View style={{marginTop:15,marginBottom:10}}>
            	<Text style={[styles.heading2,styles.marginBottom5]}>Please enter your Mobile No</Text>
            </View>

             <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="mobile" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={[styles.inputRightWrapperNoBorder,styles.borderRight,{height:35}]}>
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
                  data                = {this.state.codeData}
                  value               = {this.state.unitCode}
                  onChangeText        = {unitCode => {this.setState({unitCode});}}
                />
              </View>
              <View style={styles.inputTextWrapperM}>
                <TextField
                  label                 = "Mobile no"
                  onChangeText          = {mobile => {this.setState({mobile})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.mobile}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                />
              </View>
              
            </View>

           
            <Button
              
              onPress         = {this.checkUser.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('OTPScreen')}
              titleStyle      = {styles.buttonText}
              title           = "Next"
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

            
            <Text style={styles.text}>
              We charge tenants/buyers brokerage & share upto 50% with the property owners.
            </Text>



          </View>
        </ScrollView>
	  </React.Fragment>
		);
	}
}