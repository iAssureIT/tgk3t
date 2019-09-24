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
import axios          from 'axios';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import CheckBox from 'react-native-check-box'

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from "react-native-datepicker";
import TimePicker from "react-native-24h-timepicker";
import Modal from "react-native-modal";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";
import SwitchToggle from 'react-native-switch-toggle';

const window = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  
};

export default class PropertyDetails6 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      someOnemobile : '',
      mobileNumberError : [],
      builtArea : '',
      expectedRate : '',
      totalAsk : '',
      activeIndex : 0,
      availableFromDate : '',
      time1: "00:00",
      time2: "00:00",
      availability:"",
      available:[],
      openModal: false,
      dropdownData:[
      {
        value: 'Everyday(Mon-Sun)'
      },
      {
        value: 'Weekdays(Mon-Fri)'
      },
      {
        value: 'Weekdays(Sat-Sun)'
      },
      {
        value: 'Monday'
      },
      {
        value: 'Tuesday'
      },
      {
        value: 'Wednesday'
      },
      {
        value: 'Thursday'
      },
      {
        value: 'Friday'
      },
      {
        value: 'Saturday'
      },
      {
        value: 'Sunday'
      }],
      toggle : false,
      contactPerson:'My Self',
      mobile:"",
      propertyId : '',
      uid : '',
      token : '',
    };
  }

  validInput = () => {
    const {
      someOnemobile,
      mobile,
    } = this.state;
    let valid = true;

    this.validate({
      someOnemobile: { 
        required: true, 
        mobileNo: true,
        // numbers: true, 
        minlength: 9, 
        maxlength: 10 
      },
      mobile: { 
        required: true, 
        mobileNo: true,
        // numbers: true, 
        minlength: 9, 
        maxlength: 10 
      },
    });

    if (this.isFieldInError("someOnemobile")) {
      this.setState({ mobileNumberError: this.getErrorsInField("someOnemobile") });
      valid = false;
    } else {
      this.setState({ mobileNumberError: "" });
      valid = true;
    }

     if (this.isFieldInError("mobile")) {
      this.setState({ mobileNumberError: this.getErrorsInField("mobile") });
      valid = false;
    } else {
      this.setState({ mobileNumberError: "" });
      valid = true;
    }

    return  (!this.isFieldInError("someOnemobile") && !this.isFieldInError("mobile"))  ;
  };


 validInputField = (stateName, stateErr) => {
      const {
      someOnemobile,
      mobile,
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
      someOnemobile : y,
    });
  }


handleOriginalMobileChange(value){
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
      mobile : y,
    });
  }
  setActive=(index)=>{
    this.setState({activeIndex:index});
  }

  componentDidMount(){
      var token = this.props.navigation.getParam('token','No token');
      console.log("token",token);
      var uid = this.props.navigation.getParam('uid','No uid');
      console.log("uid",uid);
      var propertyId = this.props.navigation.getParam('propertyId','No propertyId');
      console.log("propertyId",propertyId);
      var mobile = this.props.navigation.getParam('mobile','No mobile'); 
    console.log("mobile in otpscreen",mobile);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

      this.setState({
        token : token,
        uid   : uid,
        propertyId : propertyId,
        mobile: mobile,
      });

       axios
      .get('/api/projectSettings/get/one/S3')
      .then((response)=>{
        // console.log("s3_response.............",response);
        const config = {
                          bucketName      : response.data.bucket,
                          dirName         : 'propertiesImages',
                          region          : response.data.region,
                          accessKeyId     : response.data.kS3ey,
                          secretAccessKey : response.data.secret,
              // ACL        : 'public-read',

                       }
        this.setState({
          config : config
        })
      })
     .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                          {
                               Alert.alert("Your session is expired! Please login again.","", "error");
                               this.props.navigation.navigate('Home');          
                               
                               
                          }
        });


 }

  submitFun(){

    // if(this.validInput()){
    let {
       
        someOnemobile,
        mobile,
       
      } = this.state;

       var someOnemobileNo = someOnemobile.value.length>0 ? someOnemobile.split(' ')[1].split('-').join('') : null;
       var myMobileNo = mobile.value.length>0 ? mobile.split(' ')[1].split('-').join('') : null;

      console.log("someOnemobile",someOnemobileNo);
      console.log("myMobileNo",myMobileNo);

        var mobNo = "";
        if(this.state.contactPerson === "Myself"){
          mobNo = myMobileNo;
        }else{
          mobNo = someOnemobileNo;
        }
      

      const formValues = {
     
        "contactPersonMobile" : mobNo,
        "contactPerson"       : this.state.contactPerson,
        "available"           : this.state.available,
        // "propertyImages"      : this.state.imgArrayWSaws,
        // "video"               : this.state.singleVideo,
        "status"              : "New",
        "property_id"         : this.state.propertyId,
        "uid"                 : this.state.uid,
      };
      console.log("formValues",formValues);
      this.props.navigation.navigate('PropertySuccess',{propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});


            // axios
            // .patch('/api/properties/patch/availabilityPlan',formValues)
            // .then( (res) =>{
            //   console.log("availabilityPlan----------------",res);
            //   if(res.status === 200){
            //   this.props.navigation.navigate('PropertySuccess',{propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});
            //   }
            // })
            // .catch((error)=>{
            //                 console.log("error = ",error);
            //                 if(error.message === "Request failed with status code 401")
            //                 {
            //                      swal("Your session is expired! Please login again.","", "error");
            //                      this.props.history.push("/");
            //                 }
            //         });
    // }
  }


  onToggle=()=>{
    let {toggle} = this.state;
    if(toggle){
      this.setState({contactPerson:'My Self'})
    }else{
      this.setState({contactPerson:'Someone else'})
    }
    this.setState({toggle:!this.state.toggle});
  }

  onCancel1() {
    this.TimePicker1.close();
  }
 
  onConfirm1(hour, minute) {
    this.setState({ time1: `${hour}:${minute}` });
    this.TimePicker1.close();
  } 
  onCancel2() {
    this.TimePicker2.close();
  }
 
  onConfirm2(hour, minute) {
    this.setState({ time2: `${hour}:${minute}` });
    this.TimePicker2.close();
  }

  handleAvailability(event){
    console.log("Avialbaility",this.state.availability);
    console.log("From Time",this.state.time1);
    console.log("To Time",this.state.time2);
    const availability = this.state.available;
    const day  = this.state.availability;
    const time = this.state.time1 + ' - ' + this.state.time2;

    if(day!=="" && time!==""){
      console.log("day",day);
      console.log("time",time);
      availability.push({
      "availability" : day,
      "time" : time,
      });
      this.setState({
        "available" : availability,
        "openModal": true
      },()=>{

        console.log("available=>",this.state.available);
      });
    }else{

    };  
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



  async addCameraLocationImgs (){
    // console.log('DocumentPicker =>',DocumentPicker);
    var s3Data = this.props.s3Data;
    // console.log('s3Data: ',s3Data);
    // Pick multiple files
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      // console.log('results=>', results);
      for ( var i = 0; i < results.length ; i++ ) {
          var res = results[i];
          // console.log('res = >',res);
          // var fileName = userId+'_'+Date.now()+'_'+res.fileName;
          var fileName = new Date().getTime()+'-'+res.name;
          var fileExt = fileName.split('.').pop();

          var file = {
            uri   : res.uri,
            name  : fileName,
            type  : res.type,
          }
        
          // console.log("file obj => ",file);
        
          const options = {
            keyPrefix           : "AttendanceCheckIn/",
            bucket              : s3Data.bucket,
            region              : s3Data.region,
            accessKey           : s3Data.key,
            secretKey           : s3Data.secret,
          }


           RNS3.put(file, options).then((response) => {

             if (response.status !== 201)
              throw new Error("Failed to upload image to S3");

             var link = response.body.postResponse.location;
             var linkArrCount = link.split('AttendanceCheckIn%2F')[1].split('.').length;


             var imgLink = {
                "_id"       : "",
                "userId"    : Meteor.userId(),
                "imgLink"   : link,
                "imgExt"    : link.split('AttendanceCheckIn%2F')[1].split('.')[linkArrCount-1],
                "imgName"   : response.body.postResponse.key.split('AttendanceCheckIn/')[1],
                "createdAt" : new Date() ,                                       
              };
              // console.log('imgLink: ',imgLink);
              // console.log('link: ',link);
             // console.log("---------  response.body  ------------------");
          
              this.setState({'images' : [ ...this.state.images , imgLink ] },
                             ()=>{
                              // console.log(this.state.cameraImgs);
                             });

          }).catch((error) => console.log("Handled Exceptions image ",error));
      }//i loop end
    } // try end
    catch ( err ) {
      // console.log('err => ',err);
      if ( DocumentPicker.isCancel(err) ) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        // console.log('err1 => ',err);
        throw err;
      }
    }
 
  }

  async requestCameraPermission() {
    var s3Data = this.props.s3Data;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title          : 'Cool Photo App Camera Permission',
          message        : 'Cool Photo App needs access to your camera ' +
                           'so you can take awesome pictures.',
          buttonNeutral  : 'Ask Me Later',
          buttonNegative : 'Cancel',
          buttonPositive : 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
              title          : 'Photo Picker',
              mediaType      : 'photo',
              storageOptions : {
                                skipBackup : true,
                                path       : 'images'
                               }
        };

        //Launch Camera
        // ImagePicker.launchCamera(options, (response) => {

        //   var image = response.data;

        //   var fileName    = 'img-'+new Date().getTime()+'.jpeg';
        //   const imageData = image;
        //   const imagePath = RNFS.DocumentDirectoryPath+'/'+fileName;

        //   RNFS.writeFile(imagePath, imageData, 'base64')
        //       .then(() => {

        //                     var fileExt = fileName.split('.').pop();
        //                     var file = {
        //                       uri   : 'file://'+imagePath,
        //                       name  : fileName,
        //                       type  : response.type,
        //                     };
        //                    // this.setState({ image : file.uri });
        //                     // console.log("file obj => ",file);
                          
        //                     const options = {
        //                       keyPrefix           : "AttendanceCheckIn/",
        //                       bucket              : s3Data.bucket,
        //                       region              : s3Data.region,
        //                       accessKey           : s3Data.key,
        //                       secretKey           : s3Data.secret,
        //                     };

        //                      RNS3.put(file, options).then((response) => {

        //                        if (response.status !== 201)
        //                         throw new Error("Failed to upload image to S3");

        //                        var link = response.body.postResponse.location;
        //                        var linkArrCount = link.split('AttendanceCheckIn%2F')[1].split('.').length;


        //                        var imgLink = {
        //                           "_id"       : "",
        //                           "userId"    : Meteor.userId(),
        //                           "imgLink"   : link,
        //                           "imgExt"    : link.split('AttendanceCheckIn%2F')[1].split('.')[linkArrCount-1],
        //                           "imgName"   : response.body.postResponse.key.split('AttendanceCheckIn/')[1],
        //                           "createdAt" : new Date() ,                                       
        //                         };
        //                         // console.log('imgLink: ',imgLink);
        //                        // console.log("---------  response.body  ------------------");
                            
        //                         this.setState({'images' : [ ...this.state.images , imgLink ] },
        //                                        ()=>{
        //                                         // console.log(this.state.cameraImgs);
        //                                        });

        //                     }).catch((error) => console.log("Handled Exceptions image ",error));
        //                   })
        //                   .catch((err) => {
        //                     console.log('err => ',err.message);
        //                   });

        // });

      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }


removeImg = (imgIndex)=>{
    Alert.alert('Successfully deleted Image.');
    // console.log('imgIndex: ',imgIndex);
    var imgs = this.state.images;
    // console.log('All=>',imgs);
    // delete imgs[imgIndex];
    imgs.splice(imgIndex, 1);
    // console.log('All=>',imgs);
    this.setState({images: imgs});
  }


  uploadCameraLocationImgs = () =>{
    this.requestCameraPermission();
  }

  render(){

    const { navigation } = this.props;
    let {activeIndex} = this.state;
    // let weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

     let properDetails = [
      {
        imageSource : require('../../images/p1.png'),
      },
      {
        imageSource : require('../../images/p2.png'),
      },
      {
        imageSource : require('../../images/p3.png'),
      },
      {
        imageSource : require('../../images/p4.png'),
      },
      {
        imageSource : require('../../images/p5.png'),
      },
    ];

    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
                Please tell us your availability to plan visit
              </Text>
            </View>

            <View style={styles.divider}></View>

            <Text style={[styles.heading2,styles.marginBottom5]}>Who will show?</Text>
            <View style={styles.marginBottom15}>
              <SwitchToggle
                switchOn={this.state.toggle}
                onPress={()=>this.onToggle()}
                circleColorOn={colors.button}
                circleColorOff={colors.primary}
                buttonText={this.state.contactPerson}
                containerStyle={{
                  width: 140,
                  height: 38,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  padding: 0,
                  borderWidth:1,
                  borderColor:'#ccc',
                  padding:2
                }}
                circleStyle={{
                  width: 100,
                  height: 34,
                  borderRadius: 20,
                  justifyContent:'center',
                  alignItems:'center',
                }}
                buttonTextStyle={{
                  color:'#fff',
                  fontFamily:'Roboto-Regular',
                  fontSize: 13
                }}
              />
            </View>

            {this.state.contactPerson==="My Self" ?

           /* <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="mobile" type="entypo" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Phone Number"
                  onChangeText          = {mobile => {this.setState({mobile})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {sizes.title}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.mobile}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                />
              </View>
            </View>*/


             <View style={[styles.formInputView,styles.marginBottom25]}>
                  <View style={[styles.inputWrapper]}>
                  <View style={styles.inputImgWrapper}>
                      <Icon name="mobile" type="entypo" size={18}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 = "Phone Number"
                        onChangeText          = {(mobile) => {this.setState({ mobile },()=>{this.validInputField('mobile', 'mobileNumberError');}),this.handleOriginalMobileChange(mobile)}}
                                                 // {mobileNumber => this.handleMobileChange(mobileNumber)}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {sizes.title}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.mobile}
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

          :
            
           <View style={[styles.formInputView,styles.marginBottom25]}>
                  <View style={[styles.inputWrapper]}>
                  <View style={styles.inputImgWrapper}>
                      <Icon name="mobile" type="entypo" size={18}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 = "Phone Number"
                        onChangeText          = {(someOnemobile) => {this.setState({ someOnemobile },()=>{this.validInputField('someOnemobile', 'mobileNumberError');}),this.handleMobileChange(someOnemobile)}}
                                                 // {mobileNumber => this.handleMobileChange(mobileNumber)}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {sizes.title}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.someOnemobile}
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

              }

            <Text style={[styles.heading2,styles.marginBottom15]}>Visiting Schedule (Add as many as you like)</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="calendar" type="font-awesome" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Availability'
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
                  value               = {this.state.availability}
                  onChangeText        = {availability => {this.setState({availability});}}
                />
              </View>
            </View>

            <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                {/*First View*/}
              <View style={{width:'28%'}}>
                <Text style={[styles.heading2,styles.marginBottom15]}>From Time</Text>
                <View style={[styles.inputWrapper3]}>
                  <View style={styles.inputImgWrapper2}>
                    <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                  </View>
                  <View style={styles.inputTextWrapper2}>
                    <TouchableOpacity
                        onPress={() => this.TimePicker1.open()}
                      >
                      <Text style={styles.timeSelect}>{this.state.time1}</Text>
                      </TouchableOpacity>

                      <TimePicker
                        ref={ref => {
                          this.TimePicker1 = ref;
                        }}
                        onCancel={() => this.onCancel1()}
                        onConfirm={(hour, minute) => this.onConfirm1(hour, minute)}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                      />
                  </View>
                </View>
              </View>
              
              
              <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.heading3}></Text>
              </View>

               {/*Second View*/}
              <View style={{width:'28%'}}>
                <Text style={[styles.heading2,styles.marginBottom15]}>To Time</Text>
                <View style={[styles.inputWrapper3]}>
                  <View style={styles.inputImgWrapper2}>
                    <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                  </View>
                  <View style={styles.inputTextWrapper2}>
                    <TouchableOpacity
                        onPress={() => this.TimePicker2.open()}
                      >
                      <Text style={styles.timeSelect}>{this.state.time2}</Text>
                      </TouchableOpacity>

                      <TimePicker
                        ref={ref => {
                          this.TimePicker2 = ref;
                        }}
                        onCancel={() => this.onCancel2()}
                        onConfirm={(hour, minute) => this.onConfirm2(hour, minute)}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                      />
                  </View>
                </View>
              </View>
              <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.heading3}></Text>
              </View>
              <View style={[{width:'28%'},styles.marginBottom15]}>
                <Text style={[styles.heading2,styles.marginBottom15]}></Text>
                <Button 
                  onPress         = {()=>this.handleAvailability()}
                  titleStyle      = {styles.buttonSmallText}
                  title           = "Add Slot"
                  buttonStyle     = {styles.buttonSmall}
                  containerStyle  = {[styles.buttonContainer,styles.marginBottom15]}
                  on
                  iconRight
                  icon = {
                    <Icon
                      name="plus" 
                      type="material-community"
                      size={20}
                      color={colors.black}
                    />
                  }
                />
            </View> 
          </View>

           {/* <View style={[styles.marginBottom25,styles.weekWrap]}>
            {weekDays.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActive(index)}
                key={index} 
                style={[(index==activeIndex?styles.activeWeekView:styles.weekView),(index==0?styles.borderRadiusLeft2:(index==6)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data}</Text>
              </TouchableOpacity>
            ))
            }
            </View>*/}

            <View style={[styles.marginBottom25,{width:'100%'}]}>
              <Table borderStyle={{borderColor:'transparent'}} style={{ alignContent: "center"}}>
                <Row
                  data={["Availability","Time","Action"]}
                  style={styles.tableHead}
                  textStyle={styles.tableHeadText}
                  flexArr={[2, 1, 1]}
                />
                {
                  this.state.available.map((data,index)=>(
                  <Row
                    key={index}
                    data={[data.availability,data.time,
                      <TouchableOpacity>
                        <Icon name="trash-can-outline" type="material-community" size={18} color="#dc3545" style={{fontWeight:'600'}}/>
                      </TouchableOpacity>
                    ]}
                    style={[styles.tableRow, index%2 && {backgroundColor: '#f1f1f1'}]}
                    textStyle={styles.tableText}
                    flexArr={[2, 1, 1]}
                  />
                ))
                }
              </Table>
            </View>


            {/*form 7 fields*/}

             <View style={{marginTop:0,marginBottom:20,borderColor:'#000',borderWidth:1,}}>
                            <View style={{flex:1, paddingHorizontal:20}}>
                             <Text style={[{fontSize:15,color:'#666',textAlign:'left',marginTop:10,marginBottom:10}]}>{'Upload Images :'}</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:5,marginBottom:10}}>
                              <View style={{flex:.25,justifyContent:'center',paddingHorizontal:20,}}>
                                <View style={{flex:.1,padding:10,borderWidth:1,backgroundColor:'#999',borderRadius:3,borderColor:'#999'}}>
                                <TouchableOpacity  onPress = {this.addCameraLocationImgs}>
                                  <Icon name    = "upload"
                                        type    = "font-awesome"
                                        color   = "#fff"
                                        // onPress = {this.addCameraLocationImgs}
                                        />
                                </TouchableOpacity>
                                </View>
                              </View>
                              <View style={{flex:.25,justifyContent:'center',paddingHorizontal:20,}}>
                                <View style={{flex:.1,padding:10,borderWidth:1,backgroundColor:'#999',borderRadius:3,borderColor:'#999'}}>
                                <TouchableOpacity  onPress = {this.uploadCameraLocationImgs}>
                                  <Icon name    = "camera"
                                        type    = "antdesign"
                                        color   = "#fff"
                                        // onPress = {this.uploadCameraLocationImgs}
                                        />
                                </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>


                            <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
                            {
                              properDetails.map((data,i)=>{
                                // return(
                                  <View style={[{width:'45%',flexDirection:'row',marginBottom:30},(i%2==0?{}:{marginLeft:'10%'})]}>
                                    <ImageBackground  
                                    // source={require('../../images/p1.png')}
                                      source={data.imageSource}
                                      style={{width:"100%",height:80}}
                                      // resizeMode="contain"
                                      // imageStyle={{borderRadius:4}}
                                    >

                                     <Button
                                      // onPress         = {()=>this.props.navigation.navigate('PropertySuccess')}
                                      // titleStyle      = {styles.buttonText2}
                                      // title           = "Interested"
                                      // buttonStyle     = {styles.button2}
                                      containerStyle  = {[{marginRight:10,width:'20%',position:'absolute'}]}
                                      iconRight
                                      icon = {<Icon
                                        name="times" 
                                        type="font-awesome"
                                        size={15}
                                        color={colors.white}
                                      />}
                                    />

                                      </ImageBackground>

                                  </View>
                                // );
                              }) 
                            }
                          {/*{properDetails.map((prop,i)=>( 
                                   <Image 
                                    // source={require('../../images/p1.png')}
                                    source={prop.imageSource}
                                    
                                    resizeMode="contain"
                                    imageStyle={{borderRadius:4}}
                                  >
                                    <Button
                                      // onPress         = {()=>this.props.navigation.navigate('PropertySuccess')}
                                      // titleStyle      = {styles.buttonText2}
                                      // title           = "Interested"
                                      // buttonStyle     = {styles.button2}
                                      containerStyle  = {[{marginTop:10,marginRight:10}]}
                                      iconRight
                                      icon = {<Icon
                                        name="times" 
                                        type="font-awesome"
                                        size={15}
                                        color={colors.white}
                                      />}
                                    />

                                   </Image>   
                          ))
                        }*/}

                          </View>

            <Button
              onPress         = {this.submitFun.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('PropertyDetails7')}
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
            Availability slot is sucessfully added.
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
      </React.Fragment>
    );
    
  }
}

PropertyDetails6.defaultProps = {
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



