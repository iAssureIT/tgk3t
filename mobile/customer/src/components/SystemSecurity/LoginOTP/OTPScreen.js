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

import styles                             from '../../PostAndEarn/styles.js';
import {AsyncStorage}                     from 'react-native';
import { Button,Icon, SearchBar }         from 'react-native-elements';
import { TextField }                      from 'react-native-material-textfield';
import HeaderBar                          from '../../../layouts/HeaderBar/HeaderBar.js';
import {colors,sizes}                     from '../../../config/styles.js';
import { Dropdown }                       from 'react-native-material-dropdown';
import Modal                              from "react-native-modal";
import { NavigationActions, StackActions }from 'react-navigation';
import axios                              from 'axios';
import { KeyboardAwareScrollView }          from 'react-native-keyboard-aware-scroll-view';



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
      const fullName = await AsyncStorage.getItem('fullName');
      // if (uid !== null && token !== null) {
       this.setState({
                 msg         : msg,
                 originalOTP : otp,
                 mob         : mob,
                 uid         : uid,
                 token       : token,
                 originPage  : originPage,
                 fullName    : fullName,
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
              this.navigateScreen('PropertyList');
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


	render() {
		 const { navigation } = this.props;
     let {activeBtn} = this.state;

		return (
      <React.Fragment>
            
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <KeyboardAwareScrollView>   
            
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
                <Text style={[styles.heading2,styles.marginBottom5]}>Welcome {this.state.fullName}</Text>
                <Text style={[styles.heading2,styles.marginBottom5,{color:"#49AA3F"}]}>We have sent you an OTP on your mobile for verification, please enter your OTP to continue</Text>

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
                    keyboardType          = "number-pad"
                  />
                </View>
              
              </View>

                <Modal isVisible={this.state.openModal1} 
               onBackdropPress={() => this.setState({ openModal1: false })}
               coverScreen={true}
               hideModalContentWhileAnimating={true}
               style={{paddingHorizontal:'5%',zIndex:999}}
               animationOutTiming={500}>
                  <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                    {/*<View style={{justifyContent:'center',backgroundColor:"#34be34",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
                      <Icon size={30} name='window-close' type='fontAwesome' color='#fff' style={{}}/>
                    </View>*/}
                    <Text style={{fontSize:15,textAlign:'center',marginTop:20}}>
                     Please enter OTP
                    </Text>

                    <View style={{width:'100%',borderBottomRightRadius:500,marginTop:15}}>
                      <Button
                        onPress         = {()=>this.setState({openModal1:false})}
                        titleStyle      = {styles.buttonText}
                        title           = "OK"
                        buttonStyle     = {[styles.buttonSignUp,{backgroundColor:"#E25E77",width:60,color:"#fff"}]}
                        containerStyle  = {styles.buttonContainer}
                      />
                    </View>
                  </View>
                </Modal>

                 <Modal isVisible={this.state.openModal} 
               onBackdropPress={() => this.setState({ openModal: false })}
               coverScreen={true}
               hideModalContentWhileAnimating={true}
               style={{paddingHorizontal:'5%',zIndex:999}}
               animationOutTiming={500}>
                  <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                    {/*<View style={{justifyContent:'center',backgroundColor:"#fff",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
                      <Icon size={30} name='close' type='material-community' color='#f00' style={{}}/>
                    </View>*/}
                    <Text style={{fontSize:15,textAlign:'center',marginTop:20}}>
                     Sorry, you have entered an invalid OTP. Please try again.
                    </Text>

                    <View style={{width:'100%',borderBottomRightRadius:500,marginTop:15}}>
                      <Button
                        onPress         = {()=>this.setState({openModal:false})}
                        titleStyle      = {styles.buttonText}
                        title           = "OK"
                        buttonStyle     = {[styles.buttonSignUp,{backgroundColor:"#E25E77",width:60,color:"#fff"}]}
                        containerStyle  = {styles.buttonContainer}
                      />
                    </View>
                  </View>
                </Modal>
             
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
          </KeyboardAwareScrollView>   
        </ScrollView>
	  </React.Fragment>
		);
	}
}


