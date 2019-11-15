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
import axios                                from 'axios';
import {AsyncStorage}                       from 'react-native';
import { Button,Icon, SearchBar }           from 'react-native-elements';

import ValidationComponent                  from "react-native-form-validator";
import { TextField }                        from 'react-native-material-textfield';

import HeaderBar                            from '../../../layouts/HeaderBar/HeaderBar.js';
import styles                               from '../../PostAndEarn/styles.js';
import {colors,sizes}                       from '../../../config/styles.js';
import { Dropdown }                         from 'react-native-material-dropdown';
import Modal                                from "react-native-modal";
import { NavigationActions, StackActions }  from 'react-navigation';

const window = Dimensions.get('window');

export default class SignUp extends ValidationComponent{

 navigateScreen=(route)=>{
    const navigateAction = NavigationActions.navigate({
    routeName: route,
    params: {},
    action: NavigationActions.navigate({ routeName: route }),
  });
  this.props.navigation.dispatch(navigateAction);
}

  constructor(props){
    super(props);
    this.state={
      name : '',
      email : '',
      location : '',
      mobileNumber : '',
      codeData : [{ value: '+91'},
                     { value: '+82'},
                     { value: '+65'},
                     { value: '+49'},
                     { value: '+33'},
                     { value: '+45'}],
      unitCode : '+91',
      mobileNo : '',
      openModal: false,
      uid : '',
      token : '',
      originPage  : "",
      mobileNumberError : [],
      nameError         : "",
      emailError        : "",
      locationError         : ""
    };
  }

   validInput = () => {
    const {
      mobileNumber,
      name,
      email,
      location
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
      name         : { 
        required: true, 
        letters: true,
      },
      email        : { 
        required: true, 
        // emailId   : true,
      },
      location     : { 
        required: true, 
        letters: true,
      },
    });

    if (this.isFieldInError("mobileNumber")) {
      this.setState({ mobileNumberError: this.getErrorsInField("mobileNumber") });
      valid = false;
    } else {
      this.setState({ mobileNumberError: "" });
      valid = true;
    }

    if (this.isFieldInError("name")) {
      this.setState({ nameError: this.getErrorsInField("name") });
      valid = false;
    } else {
      this.setState({ nameError: "" });
      valid = true;
    }

    if (this.isFieldInError("email")) {
      this.setState({ emailError: this.getErrorsInField("email") });
      valid = false;
    } else {
      this.setState({ emailError: "" });
      valid = true;
    }

    if (this.isFieldInError("location")) {
      this.setState({ locationError: this.getErrorsInField("location") });
      valid = false;
    } else {
      this.setState({ locationError: "" });
      valid = true;
    }

    return valid;
  };


  validInputField = (stateName, stateErr) => {
    const {mobileNumber,email,name,location} = this.state;
    let valid = true;
    this.validate({
      [stateName]: {
        required: true,
      }
    });
    if(this.isFieldInError(stateName)) {
      let validinptError = this.getErrorsInField(stateName);
      this.setState({ validinptError });
      valid = false;
    } else {
      this.setState({ [stateErr]: "" });
    }
    return valid;
  };

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
    if(value.startsWith && value.startsWith('+')){
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let y = x.input ? (!x[2]&&!x[3]) ? '+91 '+x[1] : (!x[3]?'+91 '+x[1]+'-'+x[2]:'+91 '+x[1]+'-'+x[2]+'-'+x[3]) : '';
    this.setState({
      mobileNumber : y,
    });
  }

  

  handleShowPassword = ()=>{
    this.setState({showPassword:!this.state.showPassword});
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
      
      const mob = await AsyncStorage.getItem('mobile'); 
      // console.log("mobile in signup---------------------",mob);
       const uid = await AsyncStorage.getItem('uid');
      // console.log("uid in otpscreen--------------------",uid);
       const token = await AsyncStorage.getItem('token');
      // console.log("token signup-------------------------------",token); 

      const originPage = await AsyncStorage.getItem('originPage');
      // console.log("originPage signup-------------------------------",originPage);
      // if (uid !== null && token !== null) {
       this.setState({
                 mobileNumber   : mob,
                 uid            : uid,
                 token          : token,
                 originPage     : originPage,
               });
      // }
    } catch (error) {
    }
  }

  signupUser(){
     var id = this.state.uid;
     // console.log("here id in signup",id);
      const formValues = {
      "userID"      : id,
      "fullName"    : this.state.name,
      "emailId"     : this.state.email,
      "city"        : this.state.location,
      "mobileNumber": this.state.mobileNumber,
      "countryCode" : this.state.unitCode,
      "status"      : 'Active',
      "roles"       : 'Client',
    };
    AsyncStorage.setItem("fullName",this.state.name);

    // console.log("mobileSignupForm==",formValues);

      if(this.validInput()){
        axios
        .patch('/api/usersotp/signup',formValues)
        .then( (res) =>{
          console.log("res in signup",res)
          // this.props.navigation.navigate('',{mobile:this.state.mobile,token:this.state.token,uid:this.state.uid});
          if(this.state.originPage=== "post"){
              this.navigateScreen('BasicInfo');
          }else if(this.state.originPage=== "searchProp"){
              this.navigateScreen('SearchProperty');
          }else if (this.state.originPage === "myPostedProp"){
              this.navigateScreen('MyPostedProperties');
          }else if (this.state.originPage === "interestedProp"){
              this.navigateScreen('MyInterestedProperties');
          }else{
            this.navigateScreen('Home');
          }
          if(res.data.message === "USER-UPDATED"){
                  var sendDataToUser = {
                      "templateName"  : "User - New Registration",
                      "toUserId"    : formValues.userID,
                      "variables"   : {
                        "userName"    : this.state.name,
                        "userMobile"  : this.state.mobileNumber,
                      }
                  }
                  // console.log("sendData",sendDataToUser);
                  var sendDataToAdmin = {
                      "templateName"  : "Admin - New Registration",
                      "toUserId"    : "admin",
                      "variables"   : {
                        "userName"    : this.state.name,
                        "userMobile"  : this.state.mobileNumber,
                        "userEmail"   : this.state.email,
                      "userCity"    : this.state.city,
                      }
                  }
                  // console.log("sendData",sendDataToAdmin);
                  axios
                  .post('http://qatgk3tapi.iassureit.com/api/masternotifications/post/sendNotification',sendDataToAdmin)
                  .then((result) =>{
                    // console.log("SendEmailNotificationToAdmin",result);
                    axios
                    .post('http://qatgk3tapi.iassureit.com/api/masternotifications/post/sendNotification',sendDataToUser)
                    .then((res) =>{
                      // console.log("SendEmailNotificationToUser",res);           
                    })
                    .catch((error)=>{
                                      console.log("error = ",error);
                                      // if(error.message === "Request failed with status code 401")
                                      // {
                                      //      swal("Your session is expired! Please login again.","", "error");
                                      //      this.props.history.push("/");
                                      // }
                          });         
                  })
                  .catch((error)=>{
                        console.log("error = ",error);
                        // if(error.message === "Request failed with status code 401")
                        // {
                        //      swal("Your session is expired! Please login again.","", "error");
                        //      this.props.history.push("/");
                        // }
                    });
                  // console.log("BasicInfo res = ",res);
                  if(this.props.originPage === "header")
                  {
                    this.props.history.push("/");
                    window.location.reload();
                  }else{
                    this.props.redirectToBasicInfo(res.data.user_id);
                  }
                }

        })
        .catch((error)=>{
                        console.log("error = ",error);
                        // if(error.message === "Request failed with status code 401")
                        // {
                        //      Alert.alert("Your session is expired! Please login again.");
                        //      this.props.history.push("/");
                        // }
                    });
      }          

  }


  
  render(){
    
    const { navigation } = this.props;
    let {activeBtn} = this.state;
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
                Owners earn upto 50% brokerage by selling / renting with us so let’s Get & Started.
              </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.alignCenter}>
              <Image 
                source={require('../../../images/houes.png') }
              />
            </View>

            <View style={styles.marginTop25}>
              <Text style={{fontSize:13,fontWeight:'bold'}}>
                Let us know you to sell or rent your property faster.
              </Text>
            </View>

            <View style={[styles.formInputView]}>
              <View style={[styles.marginTop25]}>
                <View style={[styles.inputWrapper]}>
                  <View style={styles.inputImgWrapper}>
                    <Icon name="mobile" type="entypo" size={18}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 = "Mobile"
                        onChangeText          = {(mobileNumber) => {this.setState({ mobileNumber },()=>{this.validInputField('mobileNumber', 'mobileNumberError');}),this.handleMobileChange(mobileNumber)}}
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
                        keyboardType          = "number-pad"
                        editable              = {false}
                      />
                    </View>
                  </View>
                  {this.displayValidationError('mobileNumberError')}
                </View>
               { <View style={{marginTop:10}}>
                  <Text style={{fontSize:13,fontWeight:'bold'}}>To complete Sign Up, Please enter following Data:</Text>
                </View>}
                <View style={[styles.marginTop5]}>
                  <View style={[styles.inputWrapper]}>
                    <View style={styles.inputImgWrapper}>
                      <Icon name="user-o" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 = "Name"
                        onChangeText          = {name => {this.setState({name},() => { this.validInputField('name', 'nameError'); })}}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {10}
                        baseColor             = {'#666'}
                        textColor             = {'#666'}
                        value                 = {this.state.name}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = "default"
                      />
                    </View>
                  </View>
                  {this.displayValidationError('nameError')}
                </View>
                <View style={[styles.marginTop25]}>
                  <View style={[styles.inputWrapper]}>
                    <View style={styles.inputImgWrapper}>
                      <Icon name="email-outline" type="material-community" size={18}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 = "Email"
                        onChangeText          = {email => {this.setState({email},() => { this.validInputField('email', 'emailError'); });}}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {sizes.title}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.email}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = "email-address"
                        autoCapitalize        = 'none'
                      />
                    </View>
                  </View>
                  {this.displayValidationError('emailError')}
                </View>
                <View style={[styles.marginTop25]}>
                  <View style={[styles.inputWrapper]}>
                    <View style={styles.inputImgWrapper}>
                        <Icon name="map-marker" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 = "City"
                        onChangeText          = {location => {this.setState({location},() => { this.validInputField('location', 'locationError'); });}}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {sizes.title}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.location}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = "default"
                      />
                    </View>
                  </View>
                  {this.displayValidationError('locationError')}  
                </View>
            </View>
            <Modal isVisible={this.state.openModal} 
             onBackdropPress={() => this.setState({ openModal: false })}
             coverScreen={true}
             hideModalContentWhileAnimating={true}
             style={{paddingHorizontal:'5%',zIndex:999}}
             animationOutTiming={500}>
                <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                  <View style={{justifyContent:'center',backgroundColor:"#34be34",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
                    <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}}/>
                  </View>
                  <Text style={{fontSize:15,textAlign:'center',marginTop:20}}>
                   Please enter mandatory fields
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
          {/*above fix code */}

          <Button
              onPress         = {this.signupUser.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('PropertyDetails1')}
              titleStyle      = {styles.buttonText}
              title           = "Post & Earn"
              buttonStyle     = {styles.button}
              containerStyle  = {[styles.buttonContainer,styles.marginTop25]}
              iconRight
              icon = {<Icon
              name="chevrons-right" 
              type="feather"
              size={22}
              color="white"
              />}
            />

            <Text style={[styles.text,styles.marginTop5]}>
              We charge tenants/buyers brokerage & share upto 50% with the property owners.
            </Text>

          </View>
        </ScrollView>
      
      </React.Fragment>
    );    
  }
}

SignUp.defaultProps = {
  messages: {
    en: {
      numbers: 'This field must be a number.',
      required: 'This field is required.',
      letters: 'It should only contain letters.',
      lettersOrEmpty: 'It should only contain letters.',
      minlength: 'Length should be greater than {1}',
      equalLength : 'Length should be equal to {1}'
    }
  },

  rules: {
    numbers        : /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    required       : /\S+/,
    letters        : /^[a-zA-Z ]+$/,
    lettersOrEmpty : /^[a-zA-Z ]+$|^$/,
    emailId          : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    minlength(length, value) {
      if (length === void (0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if (value.length > length) {
        return true;
      }
      return false;
    },
    equalLength(length, value) {
      if (length === void (0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if (value.length === length) {
        return true;
      }
      return false;
    },
  },
}

