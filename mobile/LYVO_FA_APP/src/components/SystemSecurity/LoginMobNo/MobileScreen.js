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
} from 'react-native';

import axios                      from 'axios';
import AsyncStorage               from '@react-native-community/async-storage';
import styles                     from '../styles.js';
import { Button,Icon, SearchBar } from 'react-native-elements';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
 
import HeaderBar                  from '../../../layouts/HeaderBar/HeaderBar.js';
import {colors,sizes}             from '../../../config/styles.js';
import { Dropdown }               from 'react-native-material-dropdown';
import Modal                      from "react-native-modal";
import { NavigationActions, StackActions } from 'react-navigation';
import { KeyboardAwareScrollView }          from 'react-native-keyboard-aware-scroll-view';
import ValidationComponent        from "react-native-form-validator";

export default class MobileScreen extends ValidationComponent {

 navigateScreen=(route)=>{
    const navigateAction = NavigationActions.navigate({
    routeName: route,
    params: {},
    action: NavigationActions.navigate({ routeName: route }),
  });
  this.props.navigation.dispatch(navigateAction);
}

	constructor(props) {
		super(props);
		 this.state={
		      mobileNumber : '',
		      codeData : [{ value: '+91'},
                     { value: '+82'},
                     { value: '+65'},
                     { value: '+49'},
                     { value: '+33'},
                     { value: '+45'}],
		      unitCode : '+91',
          openModal: false,
          mobileNumberError : [],
          uid:"",
		    };
	}

  validInput = () => {
    const {
      mobileNumber,
    } = this.state;
    let valid = true;

    this.validate({
      mobileNumber: { 
        required: true, 
        mobileNo: true,
        // numbers: true, 
        minlength: 9, 
        maxlength: 10 
      },
    });

    if (this.isFieldInError("mobileNumber")) {
      this.setState({ mobileNumberError: this.getErrorsInField("mobileNumber") });
      valid = false;
    } else {
      this.setState({ mobileNumberError: "" });
      valid = true;
    }

    return  !this.isFieldInError("mobileNumber") ;
  };


  validInputField = (stateName, stateErr) => {
    const {mobileNumber,} = this.state;
    let valid = true;

    this.validate({
    [stateName]: {
    required: true,
    },
    });

    if (this.isFieldInError(stateName)) {
    let validinptError = this.getErrorsInField(stateName);
    this.setState({ validinptError });
    valid = false;
    } else {
    this.setState({ [stateErr]: "" });
    }

      return valid;
  };


  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ AsyncStorage.getItem("token");
  }

	checkUser(){
      this.props.navigation.navigate('OTPScreen')
    
    if(this.validInput()){
      this.navigateScreen('OTPScreen');
      let {mobileNumber,} = this.state;
      var mobileNo = mobileNumber.split(' ')[1].split('-').join('')
      var formValues = {
        mobileNumber : mobileNo,
        countryCode  : this.state.unitCode
      };
      // console.log("LoginMobNum==",formValues);

      if(this.state.mobileNumber!=""){
                // this.props.navigation.navigate('PropertyDetails1');

      // console.log("here mobileNumber no",this.state.mobileNumber);        
        axios
          .post('/api/usersotp/verify_mobile',formValues)
          .then((response)=>{
              // console.log("here response in mobilescreen",response.data.otp);
              axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
              if(response.data.message === 'MOBILE-NUMBER-EXISTS')
              {
                AsyncStorage.setItem("uid",response.data.user_id );
                AsyncStorage.setItem("token",response.data.token);
                AsyncStorage.setItem("originalotp",response.data.otp.toString());
                AsyncStorage.setItem("message",response.data.message);
                AsyncStorage.setItem("mobile",this.state.mobileNumber);
                AsyncStorage.setItem("fullName",response.data.fullName);
                this.navigateScreen('OTPScreen');
          
              }else{

                AsyncStorage.setItem("uid",response.data.user_id );
                AsyncStorage.setItem("token",response.data.token);
                AsyncStorage.setItem("originalotp",response.data.otp);
                AsyncStorage.setItem("message",response.data.message);
                AsyncStorage.setItem("mobile",this.state.mobileNumber);
                AsyncStorage.setItem("fullName",response.data.fullName);

                 this.navigateScreen('OTPScreen');
              }

            })
          .catch(function(error){
            // console.log("here can't access the url");
            console.log(error);
          })
        
        }else{
              this.setState({
                  "openModal": true
              });
          // swal("Please enter Mobile Number", "", "warning");

        }
	}

}


 displayValidationError = (errorField) =>{
    let error = null;
    if(this.state[errorField]){
      error = <View style={styles.errorWrapper}>
                <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
              </View> ;
    }
    return error;
  }

  handleMobileChange(value){
    console.log("handleMobileChange value=>",value)
    if(value.startsWith && value.startsWith('+')){
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let y = x.input ? (!x[2]&&!x[3]) ? '+91 '+x[1] : (!x[3]?'+91 '+x[1]+'-'+x[2]:'+91 '+x[1]+'-'+x[2]+'-'+x[3]) : '';

    this.setState({
      mobileNumber : y,
    },()=>{
      console.log("handleMobileChange value=>y",this.state.mobileNumber)
    });
  }

	render() {
		const { navigation } = this.props;
    let {activeBtn} = this.state;
      console.log("handleMobileChange value=>render",this.state.mobileNumber)

		return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
        <ImageBackground source={require('../../../images/Background.png')} style={{width: '100%', height: '100%'}}>
           <KeyboardAwareScrollView>   
            <View style={{marginTop:100,alignItems:"center"}}>
              <Image 
                source={require('../../../images/logo.png') }
                style={{ width: 150 }}
                resizeMode="contain"
              />
            </View> 
            <View style={{alignItems:"center"}}>
              <View style={styles.circle}>
                <View style={{marginTop:20}}>    
                    <Icon 
                      name="building-o" 
                      type="font-awesome" 
                      size={50}  
                      color="#376bff" 
                      style={{}}
                    />
                </View>    
              </View> 
            </View>              
            <View style={[styles.sysSecWrapper]}>
              <View style={[{alignItems:"center",marginBottom: 35,marginTop:30}]}>
                <Text style={{alignItems:"center",color:"#000",fontSize:30}}>Sign In</Text>
              </View>
              <View style={[styles.formInputView,styles.marginBottom5]}>
                <View style={[styles.inputWrapper]}>
                  <View style={styles.inputImgWrapper}>
                    <Icon name="mobile" type="entypo" size={18}  color="#aaa" style={{}}/>
                  </View>

                  <View style={styles.inputTextWrapper}>
                    <TextInput
                      placeholder           = "Mobile"
                      onChangeText          = {(mobileNumber) => {this.setState({ mobileNumber },()=>{this.validInputField('mobileNumber', 'mobileNumberError');}),this.handleMobileChange(mobileNumber)}}
                      lineWidth             = {0}
                      activeLineWidth       = {0}
                      tintColor             = {colors.button}
                      inputContainerPadding = {0}
                      labelHeight           = {18}
                      labelFontSize         = {sizes.label}
                      titleFontSize         = {sizes.title}
                      baseColor             = {'#666'}
                      textColor             = {'#333'}
                      value                 = {this.state.mobileNumber}
                      containerStyle        = {styles.textContainer}
                      inputContainerStyle   = {styles.textInputContainer}
                      titleTextStyle        = {styles.textTitle}
                      placeholderStyle      ={{ fontFamily: "AnotherFont", borderColor: 'red' }}
                      style                 = {styles.textStyle}
                      labelTextStyle        = {styles.textLabel}
                      keyboardType          = "phone-pad"
                    />
                    </View>
                </View>
                    {this.displayValidationError('mobileNumberError')}
                  </View>

              { <Modal isVisible={this.state.openModal} 
               onBackdropPress={() => this.setState({ openModal: false })}
               coverScreen={true}
               hideModalContentWhileAnimating={true}
               style={{paddingHorizontal:'5%',zIndex:999}}
               animationOutTiming={500}>
                  <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                    <View style={{justifyContent:'center',backgroundColor:"#34be34",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
                      <Icon size={30} name='window-close' type='fontAwesome5' color='#fff' style={{}}/>
                    </View>
                    <Text style={{fontSize:15,textAlign:'center',marginTop:20}}>
                      Please enter Mobile Number
                    </Text>

                    <View style={{width:'100%',borderBottomRightRadius:500,marginTop:15}}>
                      <Button
                        onPress         = {()=>this.setState({openModal:false})}
                        titleStyle      = {styles.buttonText}
                        title           = "OK"
                        buttonStyle     = {styles.buttonSignUp}
                        containerStyle  = {styles.buttonContainer}
                      />
                    </View>
                  </View>
                </Modal>}

             
              <Button
                
                onPress         = {this.checkUser.bind(this)}
                // onPress         = {()=>this.props.navigation.navigate('OTPScreen')}
                titleStyle      = {styles.buttonText}
                title           = "Sign In"
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
          </KeyboardAwareScrollView> 
        </ImageBackground>
           
        </ScrollView>
	  </React.Fragment>
		);
	}
}
MobileScreen.defaultProps = {
  messages: {
    en: {
      mobileNo: 'Enter a valid mobile number.',
      minlength: 'Length should be greater than {1}',

    }
  },

  rules: {
    mobileNo: /^(\+91\s)?[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/,
    minlength(length, value) {
      if (length === void(0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if(value.length > length) {
        return true;
      }
      return false;
    },
  },
}