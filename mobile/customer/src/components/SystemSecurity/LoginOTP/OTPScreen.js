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
import styles from '../../PostAndEarn/styles.js';
import {AsyncStorage} from 'react-native';
import { Button,Icon, SearchBar } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import HeaderBar from '../../../layouts/HeaderBar/HeaderBar.js';
import {colors,sizes} from '../../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';


export default class MobileScreen extends ValidationComponent {
	
	constructor(props) {
		super(props);
		 this.state={
		      mobile   : '',
          otpcode  : '',
          msg      : '',
          originalOTP : '',
		    };
	}

  componentDidMount(){
    AsyncStorage.multiGet(['message','user_id','originalotp'])
      .then((data)=>{
        console.log('user',data[0][1])
             message = data[0][1]
             user_id = data[1][1]
             originalotp = data[2][1]

             console.log("originalotp in otp screen",originalotp);
               this.setState({
                 msg         : message,
                 originalOTP : originalotp,
               });

    })

  }

  OTPfunction(){
      var userOTP = this.state.otpcode;
       AsyncStorage.multiGet(['message','user_id','originalotp'])
      .then((data)=>{
        console.log('data',data[2][1])
             message = data[0][1]
             user_id = data[1][1]
             originalotp = data[2][1]

            
              this.setState({
                 msg         : message,
                 originalOTP : originalotp,
              });

    })

     
       console.log("originalotp in otp screen after click",this.state.originalOTP);
       console.log("msg in otp screen after click",this.state.msg);

  if(userOTP!==""){
      // if(parseInt(userOTP) === parseInt(this.state.originalOTP)){
                this.props.navigation.navigate('SignUp');
        
        /*if(this.state.msg === "NEW-USER-CREATED"){
                this.props.navigation.navigate('SignUp');
                console.log("signup");
        }else{

          if(this.state.msg === "MOBILE-NUMBER-EXISTS")
          {
              this.props.navigation.navigate('PropertyDetails1');
              console.log("already");
          }
        }*/
      // }else{
      //   console.log("Sorry, Your OTP is not Matching! Please try again!!");
      //   // swal("","Sorry, Your OTP is not Matching! Please try again!!","error");
      // }
    }else{
      // swal("Please enter OTP", "", "warning");
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
              <Text style={[styles.heading2,styles.marginBottom5]}>Welcome</Text>
              <Text style={[styles.heading2,styles.marginBottom5]}>We have sent you an OTP for verification, please enter your OTP to continue</Text>

            </View>

            <View style={{marginTop:15,marginBottom:10}}>
            	<Text style={[styles.heading2,styles.marginBottom5]}>Kindly Enter Your Verification Code</Text>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                  <Icon name="mobile" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Verification Code"
                  onChangeText          = {otpcode => {this.setState({otpcode});}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {sizes.title}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.otpcode}
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
              
              onPress         = {this.OTPfunction.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('SignUp')}
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
