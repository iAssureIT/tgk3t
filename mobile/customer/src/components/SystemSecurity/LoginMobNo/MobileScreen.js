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
import Modal from "react-native-modal";
// import ValidationComponent from "react-native-form-validator";

export default class MobileScreen extends ValidationComponent {
	
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
      const {
      mobileNumber,
      } = this.state;
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

    if(this.validInput()){
    let {
       
        mobileNumber,
       
      } = this.state;
       var mobileNo = mobileNumber.split(' ')[1].split('-').join('')
 
 

		// console.log("unitCode",this.state.unitCode);
		// console.log("mobile",mobileNo);

      var formValues = {
        mobileNumber : mobileNo,
        countryCode  : this.state.unitCode
      };
      console.log("LoginMobNum==",formValues);

      if(this.state.mobileNumber!=""){
                // this.props.navigation.navigate('PropertyDetails1');

        
        axios
          .post('/api/usersotp/verify_mobile',formValues)
          .then((response)=>{
              console.log("here response",response);
              axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
              this.setState({
                uid:response.data.user_id,
                token:response.data.token,
              });
              this._storeData();
                // AsyncStorage.setItem("uid",response.data.user_id);
                // AsyncStorage.setItem("token",response.data.token);

              if(response.data.message === 'MOBILE-NUMBER-EXISTS')
              {
               this.props.navigation.navigate('OTPScreen',{token:response.data.token,uid:response.data.user_id ,originalotp:response.data.otp,message:response.data.message,mobile:this.state.mobileNumber});
          
              }else{
                this.props.navigation.navigate('OTPScreen',{token:response.data.token,uid:response.data.user_id ,originalotp:response.data.otp,message:response.data.message,mobile:this.state.mobileNumber});
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

_storeData = async () => {
  try {
    await AsyncStorage.setItem("uid:this.state.uid");
    await AsyncStorage.setItem("token:this.state.token");

  } catch (error) {
    // Error saving data
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
    // console.log("value = ",value);
    if(value.startsWith && value.startsWith('+')){
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    // let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    // console.log("x value = ",x);
    // let y = !x[2] ? x[1] : x[1]+'-'+x[2];
    let y = x.input ? (!x[2]&&!x[3]) ? '+91 '+x[1] : (!x[3]?'+91 '+x[1]+'-'+x[2]:'+91 '+x[1]+'-'+x[2]+'-'+x[3]) : '';
    // let y = '+1 '+x[1]+'-'+x[2]+'-'+x[3];
    // console.log("y value = ",y)
    this.setState({
      mobileNumber : y,
    });
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

            <View style={[styles.formInputView,styles.marginBottom25]}>
                  <View style={[styles.inputWrapper]}>
                  <View style={styles.inputImgWrapper}>
                      <Icon name="mobile" type="entypo" size={18}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 = "Mobile"
                        onChangeText          = {(mobileNumber) => {this.setState({ mobileNumber },()=>{this.validInputField('mobileNumber', 'mobileNumberError');}),this.handleMobileChange(mobileNumber)}}
                                                 // {mobileNumber => this.handleMobileChange(mobileNumber)}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {sizes.title}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.mobileNumber}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = "numeric"
                      />
                    </View>
                  </View>
                  {this.displayValidationError('mobileNumberError')}
                </View>

             <Modal isVisible={this.state.openModal} 
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
              </Modal>

           
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