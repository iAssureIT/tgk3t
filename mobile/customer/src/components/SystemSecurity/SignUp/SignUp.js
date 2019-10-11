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
import axios          from 'axios';
import {AsyncStorage} from 'react-native';
import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';

import HeaderBar from '../../../layouts/HeaderBar/HeaderBar.js';
import styles from '../../PostAndEarn/styles.js';
import {colors,sizes} from '../../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import { NavigationActions, StackActions } from 'react-navigation';

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
      mobileNumberError : [],
      

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

  displayValidationError = (errorField) =>{
    let error = null;
    if(this.state[errorField]){
      error = <View style={styles.errorWrapper}>
                <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
              </View> ;
    }
    return error;
  }

  handleShowPassword = ()=>{
    this.setState({showPassword:!this.state.showPassword});
  }
  
   componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ AsyncStorage.getItem("token");
      this._retrieveData();
    }

    _retrieveData = async () => {
    try {
      
      const mob = await AsyncStorage.getItem('mobile'); 
      console.log("mobile in signup---------------------",mob);
       const uid = await AsyncStorage.getItem('uid');
      // console.log("uid in otpscreen--------------------",uid);
       const token = await AsyncStorage.getItem('token');
      console.log("token signup-------------------------------",token);
      // if (uid !== null && token !== null) {
       this.setState({
                 mobileNumber         : mob,
                 uid            : uid,
                 token          : token,
               });
      // }
    } catch (error) {
    }
  }

  // componentDidMount(){
  //     // console.log("here token in otp form ", AsyncStorage.getItem("token"));
  //   //   var token = this.props.navigation.getParam('token','No token');
  //   //   console.log("token",token);

  //   //   axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

  //   //  var uid = this.props.navigation.getParam('uid','No uid');
  //   // console.log("uid in signupscreen",uid);

  //   // var mobile = this.props.navigation.getParam('mobile','No mobile');
  //   // console.log("mobile in sign up screen",mobile);
  //   // this.setState({
  //   //     mobile : mobile,
  //   //     uid    : uid,
  //   //     token   : token,
  //   // });
  // }
  signupUser(){

               var id = this.state.uid;
               console.log("here id in signup",id);
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

              console.log("mobileSignupForm==",formValues);

              // if(this.state.name!=="" && this.state.email!=="" && this.state.city!==""  ){ 

                axios
                .patch('/api/usersotp/signup',formValues)
                .then( (res) =>{
                  console.log("res in signup",res)
                  // this.props.navigation.navigate('',{mobile:this.state.mobile,token:this.state.token,uid:this.state.uid});
                  this.navigateScreen('BasicInfo');
                  if(res.data.message === "USER-UPDATED"){
                          var sendDataToUser = {
                              "templateName"  : "User - New Registration",
                              "toUserId"    : formValues.userID,
                              "variables"   : {
                                "userName"    : this.state.name,
                                "userMobile"  : this.state.mobileNumber,
                              }
                          }
                          console.log("sendData",sendDataToUser);
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
                          console.log("sendData",sendDataToAdmin);
                          axios
                          .post('http://qatgk3tapi.iassureit.com/api/masternotifications/post/sendNotification',sendDataToAdmin)
                          .then((result) =>{
                            console.log("SendEmailNotificationToAdmin",result);
                            axios
                            .post('http://qatgk3tapi.iassureit.com/api/masternotifications/post/sendNotification',sendDataToUser)
                            .then((res) =>{
                              console.log("SendEmailNotificationToUser",res);           
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
                          console.log("BasicInfo res = ",res);
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
                                //      swal("Your session is expired! Please login again.","", "error");
                                //      this.props.history.push("/");
                                // }
                            });


              // }else{
              //       swal("Please enter mandatory fields", "", "warning");
                    
              //     }           


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
                Owners earn upto 50% brokerage by selling / renting with us so let’s getstarted.
              </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.alignCenter}>
              <Image 
                source={require('../../../images/houes.png') }
              />
            </View>

            <View style={{marginTop:15,marginBottom:10}}>
              <Text style={styles.text}>
                Let us know you to sell or rent your property faster.
              </Text>
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
                        keyboardType          = "number-pad"
                      />
                    </View>
                  </View>
                  {this.displayValidationError('mobileNumberError')}
                </View>



            {/*<View style={[styles.inputWrapper,styles.marginBottom25]}>
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
                  keyboardType          = "number-pad"
                  maxLength             = {10}
                />
              </View>
              
            </View>*/}

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="user-o" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Name"
                  onChangeText          = {name => {this.setState({name})}}
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

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="email-outline" type="material-community" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Email"
                  onChangeText          = {email => {this.setState({email});}}
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

             <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                  <Icon name="map-marker" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Location"
                  onChangeText          = {location => {this.setState({location});}}
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

            

           

            

            {/*<View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="lock-outline" type="material-community" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputText2Wrapper}>
                <TextField
                  label                 = "Password"
                  onChangeText          = {(password) => {this.setState({password})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {sizes.title}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.password}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                  secureTextEntry       = {this.state.showPassword?false:true}
                />
              </View>
              <View style={[styles.eyeWrapper,{}]}>
                <TouchableOpacity onPress={this.handleShowPassword}>
                  <Icon name={this.state.showPassword?"eye-with-line":"eye"} type="entypo" size={20}  color="#aaa" style={{}}/>
                </TouchableOpacity>
              </View>
            </View>
*/}
            <Button
              onPress         = {this.signupUser.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('PropertyDetails1')}
              titleStyle      = {styles.buttonText}
              title           = "Post & Earn"
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

