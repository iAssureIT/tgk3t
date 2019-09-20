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
import Modal from "react-native-modal";


export default class MobileScreen extends ValidationComponent {
	
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
		    };
	}

  componentDidMount(){

    var otp = this.props.navigation.getParam('originalotp','No OTP');
    console.log("otp in otpscreen",otp);
    var msg = this.props.navigation.getParam('message','No message'); 
    console.log("message in otpscreen",msg);
    var mob = this.props.navigation.getParam('mobile','No mobile'); 
    console.log("mobile in otpscreen",mob);
     var uid = this.props.navigation.getParam('uid','No uid');
    console.log("uid in otpscreen",uid);
     var token = this.props.navigation.getParam('token','No token');
    console.log("token",token);

    this.setState({
                 msg         : msg,
                 originalOTP : otp,
                 mob         : mob,
                 uid         : uid,
                 token       : token,
               });
    // AsyncStorage.multiGet(['message','user_id','originalotp'])
    //   .then((data)=>{
    //     console.log('user',data[0][1])
    //          message = data[0][1]
    //          user_id = data[1][1]
    //          originalotp = data[2][1]

    //          console.log("originalotp in otp screen",originalotp);
    //            

    // })

  }

  OTPfunction(){
      var userOTP = this.state.otpcode;
 
       console.log("originalotp in otp screen after click",this.state.originalOTP);
       console.log("msg in otp screen after click",this.state.msg);

  if(userOTP!==""){
      if(parseInt(userOTP) === parseInt(this.state.originalOTP)){
               
        
        if(this.state.msg === "NEW-USER-CREATED"){
                this.props.navigation.navigate('SignUp',{token:this.state.token,mobile:this.state.mob,uid: this.state.uid});
                console.log("signup");
        }else{

          if(this.state.msg === "MOBILE-NUMBER-EXISTS")
          {
              this.props.navigation.navigate('PropertyDetails1',{mobile:this.state.mob,token:this.state.token,uid:this.state.uid});
              console.log("already");
          }
        }
      }else{
        this.setState({
            openModal: true,
        });
        // swal("","Sorry, Your OTP is not Matching! Please try again!!","error");
      }
    }else{
       this.setState({
            openModal1: true,
        });
      // swal("Please enter OTP", "", "warning");

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

              <Modal isVisible={this.state.openModal1} 
             onBackdropPress={() => this.setState({ openModal1: false })}
             coverScreen={true}
             hideModalContentWhileAnimating={true}
             style={{paddingHorizontal:'5%',zIndex:999}}
             animationOutTiming={500}>
                <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
                  <View style={{justifyContent:'center',backgroundColor:"#34be34",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
                    <Icon size={30} name='window-close' type='fontAwesome5' color='#fff' style={{}}/>
                  </View>
                  <Text style={{fontSize:15,textAlign:'center',marginTop:20}}>
                   Please enter OTP
                  </Text>

                  <View style={{width:'100%',borderBottomRightRadius:500,marginTop:15}}>
                    <Button
                      onPress         = {()=>this.setState({openModal1:false})}
                      titleStyle      = {styles.buttonText}
                      title           = "OK"
                      buttonStyle     = {styles.buttonSignUp}
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
                  <View style={{justifyContent:'center',backgroundColor:"#34be34",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
                    <Icon size={30} name='window-close' type='fontAwesome5' color='#fff' style={{}}/>
                  </View>
                  <Text style={{fontSize:15,textAlign:'center',marginTop:20}}>
                   Sorry, Your OTP is not Matching,Please try again!
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
