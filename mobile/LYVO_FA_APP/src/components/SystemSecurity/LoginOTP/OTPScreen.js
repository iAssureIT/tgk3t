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

export default class OTPScreen extends ValidationComponent {

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
          mobile   : '',
          otpcode  : '',
          msg      : '',
          originalOTP : '',
          openModal: false,
          openModal1: false,
          token     : "",
          mob:"",
          uid : '',
          originPage:'',
          mobInputs: ["m1", "m2", "m3", "m4"],
          otpMobInput: ["", "", "", ""],
           otpEmailInput: ["", "", "", "", "", ""],
          emailInputs: ["e1", "e2", "e3", "e4", "e5", "e6"],
        };
  }


  

  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ AsyncStorage.getItem("token");
    this._retrieveData();
  }

  componentWillReceiveProps(nextProps){
    this._retrieveData();
  }


  _retrieveData = async () => {
    try {
      const otp = await AsyncStorage.getItem('originalotp');
      // console.log("otp in otpscreen-----------------------------",otp);
      const msg = await AsyncStorage.getItem('message'); 
      // console.log("message in otpscreen--------------",msg);
      const mob = await AsyncStorage.getItem('mobile'); 
      // console.log("mobile in otpscreen---------------------",mob);
      const uid = await AsyncStorage.getItem('uid');
      // console.log("uid in otpscreen--------------------",uid);
      const token = await AsyncStorage.getItem('token');
      // console.log("token-------------------------------",token);
      const originPage = await AsyncStorage.getItem('originPage');
      // console.log("originPage-------------------------------",originPage);
      // if (uid !== null && token !== null) {
       this.setState({
                 msg         : msg,
                 originalOTP : otp,
                 mob         : mob,
                 uid         : uid,
                 token       : token,
                 originPage  : originPage,
               });
      // }
    } catch (error) {
    }
  }

  OTPfunction(){
     var userOTP = this.state.otpcode;
     // console.log("originalotp in otp screen after click",this.state.originalOTP);
     // console.log("msg in otp screen after click",this.state.msg);

      if(userOTP!==""){
        if(parseInt(userOTP) === parseInt(this.state.originalOTP)){
          if(this.state.msg === "NEW-USER-CREATED"){
            this.navigateScreen('SignUp');
            // console.log("signup");
          }else{
            if(this.state.msg === "MOBILE-NUMBER-EXISTS" && this.state.originPage === "post")
            {
              this.navigateScreen('BasicInfo');
              // console.log("already");
            }else if (this.state.originPage === "searchProp"){
              this.navigateScreen('SearchProperty');
            }else if (this.state.originPage === "myPostedProp"){
              this.navigateScreen('MyPostedProperties');
            }else if (this.state.originPage === "interestedProp"){
              this.navigateScreen('MyInterestedProperties');
            }else{
              this.navigateScreen('Home');
            }
          }
        }else{
          this.setState({
              openModal: true,
          });
        }
      }else{
         this.setState({
              openModal1: true,
          });
      }

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


  focusNext(index, value, otpType, length) {

    if (otpType == "mobile") {
      var { mobInputs, otpMobInput } = this.state;
      otpMobInput[index] = value;
      this.setState({ otpMobInput });
    } else if (otpType == "email") {
      var { emailInputs, otpEmailInput } = this.state;
      otpEmailInput[index] = value;
      this.setState({ otpEmailInput });
    }

    if (index < length - 1 && value) {
      let next = (otpType == "mobile") ? mobInputs[index + 1] : emailInputs[index + 1];
      // console.log("next = ",next);
      this.refs[next].focus();
    }
    if (this.state.otpEmailInput.length == 6) {
      this.setState({
        otpEmail: this.state.otpEmailInput.map(data => {
          return data
        }).join("")
      })
    }
    if (this.state.otpMobInput.length == 4) {
      var otp = this.state.otpMobInput.map(data => {
        return data
      }).join("")
      this.setState({ otpMob: otp })
    }
  }

  focusPrevious(key, index, otpType) {
    // console.log("key = ",key);

    if (key === 'Backspace' && index !== 0) {
      if (otpType == "mobile") {
        let { mobInputs } = this.state;
        var prev = mobInputs[index - 1];
      } else {
        let { emailInputs } = this.state;
        var prev = emailInputs[index - 1];
      }

      this.refs[prev].focus();
      // this[otpType][index - 1].focus();
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
                <Text style={{alignItems:"center",color:"#000",fontSize:30}}>OTP Verification</Text>
                <Text style={{alignItems:"center",color:"#666",fontSize:15,marginTop:20}}>Please enter OTP send to you on Mobile</Text>
              </View>
            <View style={styles.formWrapper}>
              <View style={[styles.formInputView]}>
                <View style={styles.otpInputWrap}>
                  {
                    this.state.mobInputs.map((data, index) => {
                      return (
                        <View key={index} style={styles.otpInput}>
                          <TextInput
                            label=""
                            onChangeText={(v) => this.focusNext(index, v, "mobile", 4)}
                            onKeyPress={e => this.focusPrevious(e.nativeEvent.key, index, "mobile")}
                            lineWidth={1}
                            tintColor={colors.button}
                            inputContainerPadding={0}
                            labelHeight={15}
                            labelFontSize={sizes.label}
                            titleFontSize={15}
                            baseColor={'#666'}
                            textColor={'#333'}
                            // value                 = {this.state.email}
                            containerStyle={styles.textContainer}
                            inputContainerStyle={styles.textInputContainer}
                            titleTextStyle={styles.textTitle}
                            style={styles.textStyle}
                            labelTextStyle={styles.textLabel}
                            keyboardType="numeric"
                            maxLength={1}
                            ref={data}
                            selectTextOnFocus
                            selectionColor={colors.primary}
                          />
                        </View>
                      );
                    })
                  }
                </View>
              </View>
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
                title           = "Verify OTP"
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
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", width:"100%"}}>
                <Text style={{fontSize:15,color:"#376bff"}}>
                  Resend OTP
                </Text>
                <Icon size={30} name='chevrons-right' type='feather' color="#376bff"/>
              </View>
            </View>
          </KeyboardAwareScrollView> 
        </ImageBackground>
           
        </ScrollView>
    </React.Fragment>
    );
  }
}
OTPScreen.defaultProps = {
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