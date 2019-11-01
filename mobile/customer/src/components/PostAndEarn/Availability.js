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
  Platform
} from 'react-native';  

import { Button,Icon, SearchBar }             from 'react-native-elements';
import axios                                  from 'axios';
import { NavigationActions, StackActions }    from 'react-navigation';
import AsyncStorage                           from '@react-native-community/async-storage';
import ValidationComponent                    from "react-native-form-validator";
import { TextField }                          from 'react-native-material-textfield';
import { RadioGroup, RadioButton }            from 'react-native-flexi-radio-button';
import CheckBox                               from 'react-native-check-box'
import HeaderBar                              from '../../layouts/HeaderBar/HeaderBar.js';
import styles                                 from './styles.js';
import { colors,sizes }                       from '../../config/styles.js';
import { Dropdown }                           from 'react-native-material-dropdown';
import DatePicker                             from "react-native-datepicker";
// import TimePicker                             from "react-native-24h-timepicker";
import Modal                                  from "react-native-modal";
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import SwitchToggle                           from 'react-native-switch-toggle';
import ImagePicker                            from 'react-native-image-picker';
import { RNS3 }                               from 'react-native-aws3';
import Video                                  from 'react-native-video';
import { KeyboardAwareScrollView }            from 'react-native-keyboard-aware-scroll-view';
import Loading                                from '../../layouts/Loading/Loading.js'
import Dialog                                 from "react-native-dialog";
import DateTimePicker                         from '@react-native-community/datetimepicker';
var Buffer = require('buffer/').Buffer
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

const window = Dimensions.get('window');

 type Rationale = {
  title: 'Cool Photo App Camera Permission',
  message: 'Cool Photo App needs access to your camera ',
  buttonPositive: 'OK',
  buttonNegative: 'Cancel',
  buttonNeutral: 'Ask Me Later',
};

var imgArrayWSaws = [];

export default class Availability extends ValidationComponent{

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
      someOnemobile : '',
      mobileNumberError : "",
      builtArea : '',
      expectedRate : '',
      totalAsk : '',
      activeIndex : 0,
      availableFromDate : '',
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
        }
      ],
      toggle            : false,
      contactPerson     : 'My Self',
      mobile            : "",
      propertyId        : '',
      uid               : '',
      token             : '',
      photo             : [],
      config            : '',
      "imageArray"      : [],
      "imageTitleArray" : [],
      "videoArray"      : [],
      "S3url"           : [],
      "imgArrayWSaws"   : [],
      "dialogVisible"   : false,
      "dialogVisible1"  : false,
      "imgPath"         : "",
      "index"           : -1 ,
      isLoading         :false,
      isLoadingVideo    :false,
      date: new Date(new Date().setHours(0,0,0,0)),
      date1: new Date(new Date().setHours(0,0,0,0)),
      mode: 'time',
      show: false,
      show1: false,
    };

      var property_id = this.props.navigation.getParam('property_id','No property_id');
      // console.log("property_id in constructor property details",property_id);
     
  }

  componentDidMount(){
    this._retrieveData();
  }

  componentWillReceiveProps(nextProps){
    this._retrieveData();
  }


  _retrieveData = async () => {
    try {
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      const mobile      = await AsyncStorage.getItem('mobile');
      const propertyId      = await AsyncStorage.getItem('propertyId');
      const propertyType      = await AsyncStorage.getItem('propertyType');
      const transactionType      = await AsyncStorage.getItem('transactionType');

      // console.log("availability propertyId",propertyId);
      // console.log("availability mobile",mobile);
      // if (uid !== null && token !== null) {
        // We have data!!
        this.setState({uid:uid})
        this.setState({token:token})
        this.setState({mobile:mobile})
        this.setState({propertyId:propertyId})
        this.setState({propertyType:propertyType})
        this.setState({transactionType:transactionType})

        if(token!="")
        {
           var property_id = propertyId;
           // console.log("property_id in constructor property details",property_id);

            if(property_id!=null)
            {
              // console.log("here edit 4th form");
                axios
                .get('/api/properties/'+property_id)
                .then( (response) =>{
                  this.setState({

                      originalValues          : response.data.avalibilityPlanVisit,
                      contactPersonMobile     : response.data.avalibilityPlanVisit.contactPersonMobile ? response.data.avalibilityPlanVisit.contactPersonMobile : mobile,
                      contactPerson           : response.data.avalibilityPlanVisit.contactPerson ?  response.data.avalibilityPlanVisit.contactPerson : "My Self" ,
                      available               : response.data.avalibilityPlanVisit.available,
                      updateOperation         : true,
                      prevAvailable           : response.data.avalibilityPlanVisit.available,
                      originalValuesGallery   : response.data.gallery,
                      imgArrayWSaws           : response.data.gallery.Images ? response.data.gallery.Images : [],
                      singleVideo             : response.data.gallery.video ? response.data.gallery.video : "" ,
                     
                      // type            : response.data.contactPerson==="Someone" ? true : false,
                      
                  },()=>{
                    // console.log("here available in comp did mount",this.state.contactPerson);
                    });

                })
                .catch((error)=>{
                              console.log("error = ",error);
                              if(error.message === "Request failed with status code 401")
                              {
                                  Alert.alert("Your session is expired! Please login again.","", "error");
                                  this.navigateScreen('Home');    
                              }
                          });

            }

        }
     axios
      .get('/api/projectSettings/get/one/S3')
      .then((response)=>{
        // console.log("s3_response.............",response);
        const config = {
                          bucket              : response.data.bucket,
                          keyPrefix           : 'propertiesImages',
                          region              : response.data.region,
                          accessKey           : response.data.key,
                          secretKey           : response.data.secret,
                          successActionStatus : 201
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
                       this.navigateScreen('Home');          
                  }
        });


  } catch (error) {
      // Error retrieving data
    }
  }

 
 

  setDate = (event, date) => {
    // console.log("inside show")

    date = date || this.state.date;
 
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  setDate1 = (event, date1) => {
    // console.log("inside show")

    date1 = date1 || this.state.date1;
 
    this.setState({
      show1: Platform.OS === 'ios' ? true : false,
      date1,
    });
  }
 
  show = mode => {
    this.setState({
      show: true,
      mode,
    },()=>{
      // console.log("show",this.state.show);
    });
  }
  show1 = mode => {
    this.setState({
      show1: true,
      mode,
    },()=>{
      // console.log("show",this.state.show1);
    });
  }
 
  timepicker = () => {
    this.show('time');
  }

  timepicker1 = () => {
    this.show1('time');
  }

  formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
}

  validInput = () => {
    const {
      someOnemobile,
      // mobile,
    } = this.state;
    let valid = true;

    this.validate({
      someOnemobile: { 
        required: true, 
        // mobileNo: true,
        // numbers: true, 
        // minlength: 9, 
        // maxlength: 10 
      },
      // mobile: { 
      //   required: true, 
      //   mobileNo: true,
      //   // numbers: true, 
      //   minlength: 9, 
      //   maxlength: 10 
      // },
    });

    if (this.isFieldInError("someOnemobile")) {
      this.setState({ mobileNumberError: this.getErrorsInField("someOnemobile") });
      valid = false;
    } else {
      this.setState({ mobileNumberError: "" });
      valid = true;
    }

    //  if (this.isFieldInError("mobile")) {
    //   this.setState({ mobileNumberError: this.getErrorsInField("mobile") });
    //   valid = false;
    // } else {
    //   this.setState({ mobileNumberError: "" });
    //   valid = true;
    // }

    return valid;
  };


   validInputField = (stateName, stateErr) => {
        const {
          someOnemobile,
          // mobile,
        } = this.state;
        let valid = true;

        this.validate({
        [stateName]: {
          required: true,
        },
        });

        if(this.isFieldInError(stateName)){
          let validinptError = this.getErrorsInField(stateName);
          this.setState({ validinptError });
          valid = false;
        }else{
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
      someOnemobile : y,
    });
  }


  handleOriginalMobileChange(value){
    if(value.startsWith && value.startsWith('+')){
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let y = x.input ? (!x[2]&&!x[3]) ? '+91 '+x[1] : (!x[3]?'+91 '+x[1]+'-'+x[2]:'+91 '+x[1]+'-'+x[2]+'-'+x[3]) : '';
    this.setState({
      mobile : y,
    });
  }
  setActive=(index)=>{
    this.setState({activeIndex:index});
  }

  submitFun(){
    if(this.validInput()){
       if(this.state.updateOperation === true){
        // console.log("update fun");
           var ov = this.state.originalValues;

          let {
              someOnemobile,
              mobile,
             
            } = this.state;
           

             var someOnemobileNo = someOnemobile.length>0 ? someOnemobile.split(' ')[1].split('-').join('') : null;
             var myMobileNo = mobile.length>0 ? mobile.split(' ')[1].split('-').join('') : null;

             // console.log("someOnemobileNo",someOnemobileNo);
             // console.log("myMobileNo",myMobileNo);
           
              var mobNo = "";
              if(this.state.contactPerson === "My Self"){
                mobNo = myMobileNo;
              }else{
                mobNo = someOnemobileNo;
              }
            
              const formValues = {
                "contactPersonMobile" : mobNo,
                "contactPerson"       : this.state.contactPerson,
                "available"           : this.state.available,
                "propertyImages"      : this.state.imgArrayWSaws,
                "status"              : "New",
                "video"               : this.state.singleVideo,
                "property_id"         : this.state.propertyId,
                "uid"                 : this.state.uid,
              };

              // console.log("Availability req 1 = ",formValues);
              if(this.state.available.length!==0){
                  
              axios
              .patch('/api/properties/patch/availabilityPlan',formValues)
              .then( (res) =>{
                // console.log("availabilityPlan----------------",res);
                if(res.status === 200){
                  this.navigateScreen('Congratulation');
                 }
              })
              .catch((error)=>{
                          console.log("error = ",error);
                          if(error.message === "Request failed with status code 401")
                            {
                                 Alert.alert("Your session is expired! Please login again.");
                                 this.navigateScreen('Home');          
                            }
                      });
              }else{
                    Alert.alert("Please add at least one slot.");
              }
          }else{
            // console.log("submit function");
            var ov = this.state.originalValues;

            let {
                someOnemobile,
                mobile,
              } = this.state;

             var someOnemobileNo = someOnemobile.length>0 ? someOnemobile.split(' ')[1].split('-').join('') : null;
             var myMobileNo = mobile.length>0 ? mobile.split(' ')[1].split('-').join('') : null;

             // console.log("someOnemobileNo",someOnemobileNo);
             // console.log("myMobileNo",myMobileNo);

            var mobNo = "";
            if(this.state.contactPerson === "My Self"){
              mobNo = myMobileNo;
            }else{
              mobNo = someOnemobileNo;
            }
          
            const formValues = {
           
              "contactPersonMobile" : mobNo,
              "contactPerson"       : this.state.contactPerson,
              "available"           : this.state.available,
              "propertyImages"      : this.state.imgArrayWSaws,
              "video"               : this.state.singleVideo,
              "status"              : "New",
              "property_id"         : this.state.propertyId,
              "uid"                 : this.state.uid,
            };

            // console.log("Availability req 1 = ",formValues);
            if(this.state.available.length!==0){
              axios
              .patch('/api/properties/patch/availabilityPlan',formValues)
              .then( (res) =>{
                // console.log("availabilityPlan----------------",res);
                if(res.status === 200){
                   this.navigateScreen('Congratulation',{propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});
                 }
              })
              .catch((error)=>{
                            console.log("error = ",error);
                            if(error.message === "Request failed with status code 401")
                              {
                                   Alert.alert("Your session is expired! Please login again.","", "error");
                                   this.navigateScreen('Home');          
                              }
                      });
            }else{
              Alert.alert("Please add at least one slot.");
          }

     }
  }
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



  handleAvailability(){
    // console.log("Avialbaility",this.state.availability);
    // console.log("From Time",this.formatAMPM(this.state.date));
    // console.log("To Time",this.formatAMPM(this.state.date1));
    const availability = this.state.available;
    const day  = this.state.availability;
    const time = this.formatAMPM(this.state.date) + ' - ' + this.formatAMPM(this.state.date1);
    // console.log("time",time);
    if(availability!=="" && day!=="" && time!==""){
      // console.log("day",day);
      // console.log("time",time);
      availability.push({
      "availability" : day,
      "time" : time,
      });
      // console.log("availability",availability);

      this.setState({
        "available" : availability,
        "openModal": true
      },()=>{
        this.setState({
          availability : "",
          date         : new Date(new Date().setHours(0,0,0,0)),
          date1        : new Date(new Date().setHours(0,0,0,0)),
        })

        // console.log("available=>",this.state.available);
      });
    }else{
        Alert.alert("Please select visting schedule!")
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


  handleChoosePhoto = () => {
     const options = {
      title: 'Image Picker', 
        storageOptions:{
          skipBackup:true,
          path:'images'
        }
    };

    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    .then(result => {
      console.log("result",result);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;

        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          break;

        case RESULTS.GRANTED:
          console.log('The permission is granted');
          ImagePicker.launchImageLibrary(options, response => {
            console.log("response",response);
          if (response.uri) {
            const file = {
              uri  : response.uri,
              name : response.fileName,
              type : response.type,
            }
              if (file) {
                var fileName = file.name; 
                var ext = fileName.split('.').pop(); 
                if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
                  if (file) {
                    this.setState({isLoading:true})
                    console.log("file------>",file);
                    console.log("config-------->",this.state.config);
                    RNS3
                    .put(file,this.state.config)
                    .then((Data)=>{
                      // console.log("Data = ",Data);
                        var obj1={
                          imgPath : Data.body.postResponse.location,
                        }
                        var imgArrayWSaws = this.state.imgArrayWSaws;
                        if(obj1!==null){
                          imgArrayWSaws.push(obj1);
                        }
                        this.setState({
                          imgArrayWSaws : imgArrayWSaws,
                          isLoading     : false
                        })
                    })
                    .catch((error)=>{
                            // console.log("error in catch = ",error);
                            if(error.message === "Request failed with status code 401")
                              {
                                   Alert.alert("Your session is expired! Please login again.","", "error");
                                   this.navigateScreen('Home');          
                              }
                    });
                  }else{          
                    Alert.alert("File not uploaded","Something went wrong","error");  
                  }
                }else{
                  Alert.alert("Please upload file","Only Upload  images format (jpg,png,jpeg)");   
                }
              }
            }
          });
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
        }
    })
    .catch(error => {
        console.log("error = ",error);
    });    
  }


  handleChooseVideo = () => {
    const options = {
      title: 'Video Picker', 
      mediaType: 'video', 
        storageOptions:{
          skipBackup:true,
          path:'images'
        }
  };
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    .then(result => {
      console.log("result",result);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;

        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          break;

        case RESULTS.GRANTED:
          console.log('The permission is granted');
          ImagePicker.launchImageLibrary(options, response => {
            console.log("response",response);
          if (response.uri) {
            // console.log("response",response);
            var url = response.path;
            var filename = url.substring(url.lastIndexOf('/')+1);
            const file = {
                uri  : response.uri,
                name : filename,
                type : 'image/jpeg',
              }
              console.log("file",file);
              if (file) {
                var fileName = file.name; 
                var ext = fileName.split('.').pop(); 
                console.log("ext",ext)
                if(ext=="mp4" || ext=="avi" || ext=="ogv"){ 
                  if (file) {
                    this.setState({isLoadingVideo:true})
                    console.log("file------>",file);
                    console.log("config-------->",this.state.config);
                    RNS3
                    .put(file,this.state.config)
                    .then((Data)=>{
                      console.log("Data = ",Data);
                        this.setState({
                          singleVideo        : Data.body.postResponse.location,
                          isLoadingVideo          : false
                        })
                    })
                    .catch((error)=>{
                            console.log("error in catch = ",error);
                            if(error.message === "Request failed with status code 401")
                              {
                                   Alert.alert("Your session is expired! Please login again.","", "error");
                                   this.navigateScreen('Home');          
                              }
                    });
                  }else{          
                    Alert.alert("File not uploaded","Something went wrong");  
                  }
                }else{
                  Alert.alert("Format is incorrect","Only Upload video format (mp4,avi,ogv)");   
                }
              }
            }
          });
          break;

        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
        }
    })
    .catch(error => {
        console.log("error = ",error);
    });
  }
  
  deleteSingleVideoDirect = () => { 
    this.setState({
      singleVideo:"",
      dialogVisible:false
    }) 
  }; 


  deleteSlot = async () =>{ 
    var index = this.state.index;;
    // console.log("this.state.available",this.state.available);
    // console.log("index",index);
    var array = this.state.available; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({
      available:array,
      dialogVisible2:false
    }) 
  }

  handleCancel = () => {
    this.setState({
     dialogVisible  : false ,
     dialogVisible1 : false ,
     dialogVisible2 : false ,
     openModal      : false
   });
  };

  deleteimageWS = async () => {
      var index       = this.state.index;
      var filePath    = this.state.imgPath;
      var data        = filePath.split("/");
      var imageName   = data[4];
      // console.log("imageName==",imageName);
      var array = this.state.imgArrayWSaws; // make a separate copy of the array
      array.splice(index, 1);
      this.setState({
        imgArrayWSaws  : array,
        dialogVisible1 : false
      });
  }


  render(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;
    const { navigation } = this.props;
    let {activeIndex} = this.state;
    const { show, date, date1, show1, mode } = this.state;
    // let weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    // console.log("this.state.photo",this.state.photo);
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

    console.log("this.state.isLoading",this.state.isLoading);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <KeyboardAwareScrollView>    
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
                          editable              = {false}
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
                <View style={{width:'30%'}}>
                  <Text style={[styles.heading2,styles.marginBottom15]}>From Time</Text>
                  <View style={[styles.inputWrapper3]}>
                    <View style={styles.inputImgWrapper2}>
                      <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper3}>
                      <TouchableOpacity
                          onPress={this.timepicker}
                          title="Show time picker!"
                        >
                        <Text style={styles.timeSelect}>{this.formatAMPM(this.state.date)}</Text>
                        </TouchableOpacity>
                         { show && <DateTimePicker value={date}
                            mode={mode}
                            is24Hour={false}
                            display="default"
                            onChange={this.setDate} />
                        }
                    </View>
                  </View>
                </View>
                
                
                <View style={{width:'6%',justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.heading3}></Text>
                </View>

                {/*Second View*/}
                <View style={{width:'30%'}}>
                  <Text style={[styles.heading2,styles.marginBottom15]}>To Time</Text>
                  <View style={[styles.inputWrapper3]}>
                    <View style={styles.inputImgWrapper2}>
                      <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper3}>
                      <TouchableOpacity
                          onPress={this.timepicker1}
                          title="Show time picker!"
                        >
                        <Text style={styles.timeSelect}>{this.formatAMPM(this.state.date1)}</Text>
                        </TouchableOpacity>
                         { show1 && <DateTimePicker value={date1}
                            mode={mode}
                            is24Hour={false}
                            display="default"
                            onChange={this.setDate1} />
                        }
                    </View>
                  </View>
                </View>
                <View style={{width:'6%',justifyContent:'center',alignItems:'center'}}>
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

              <View style={[styles.marginBottom25,{width:'100%'}]}>
                <Table borderStyle={{borderColor:'transparent'}} style={{ alignContent: "center"}}>
                  <Row
                    data={["Availability","Time","Action"]}
                    style={styles.tableHead}
                    textStyle={styles.tableHeadText}
                    flexArr={[2, 1, 1]}
                  />
                  {this.state.available && this.state.available.length>0 ?
                    this.state.available.map((data,index)=>(
                    <Row
                      key={index}
                      data={[data.availability,data.time,
                        <TouchableOpacity>
                          <Icon 
                            name="trash-can-outline"
                            type="material-community"
                            size={18} color="#dc3545" 
                            style={{fontWeight:'600'}}
                            // onPress={this.deleteSlot.bind(index)}
                            onPress = {()=>this.setState({dialogVisible2:true,index:index})}
                          />
                        </TouchableOpacity>
                      ]}
                      style={[styles.tableRow, index%2 && {backgroundColor: '#f1f1f1'}]}
                      textStyle={styles.tableText}
                      flexArr={[2, 2, 1]}
                    />
                  ))
                  :
                 <Row
                    data={[
                      <View style={{width:"100%",alignItems:'center'}}>
                        <Text>No slots are added yet.</Text>
                      </View>  
                      ]}
                  />  
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
                      <TouchableOpacity  onPress = {this.handleChoosePhoto}>
                        <View style={{flex:.1,padding:10,borderWidth:1,backgroundColor:'#999',borderRadius:3,borderColor:'#999'}}>
                              <Icon    
                                name    = "upload"
                                type    = "antdesign"
                                color   = "#fff"
                              />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
                    {
                      this.state.imgArrayWSaws && this.state.imgArrayWSaws.length>0 ?
                        this.state.imgArrayWSaws.map((photo,i)=>(
                          <View key={i} style={[{width:'45%',flexDirection:'row',marginBottom:30},(i%2==0?{marginLeft:'5%'}:{marginLeft:'5%'})]}>
                            <Image
                              source={{ uri: photo.imgPath }}
                              style={{width: 110, height: 100}}
                            />
                            <Icon    
                              name    = "times"
                              type    = 'font-awesome'
                              color   = "#f00"
                              onPress = {()=>this.setState({dialogVisible1:true,imgPath:photo.imgPath,index:i})}
                          />  
                          </View>
                        ))
                        :
                        null
                    }                            
                 </View>
                {this.state.isLoading?
                  <View style={[{marginLeft:'5%'}]}>
                    <Loading />
                  </View>  
                  :
                   null
                }  
              </View>

              <View style={{marginTop:0,marginBottom:20,borderColor:'#000',borderWidth:1,}}>
                  <View style={{flex:1, paddingHorizontal:20}}>
                   <Text style={[{fontSize:15,color:'#666',textAlign:'left',marginTop:10,marginBottom:10}]}>{'Upload Videos :'}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginTop:5,marginBottom:10}}>
                    <View style={{flex:.25,justifyContent:'center',paddingHorizontal:20,}}>
                      <TouchableOpacity  onPress = {this.handleChooseVideo}>
                        <View style={{flex:.1,padding:10,borderWidth:1,backgroundColor:'#999',borderRadius:3,borderColor:'#999'}}>
                              <Icon    
                                name    = "upload"
                                type    = "antdesign"
                                color   = "#fff"
                              />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
                    {
                      this.state.singleVideo?
                        <View style={[{width:'45%',flexDirection:'row',marginBottom:30}]}>
                          <Video 
                            source={{uri:this.state.singleVideo}}   // Can be a URL or a local file.
                            repeats
                            controls={true}
                            resizeMode={"stretch"}
                            style={{height:150,width:250,marginLeft:20}} 
                          />
                          <Icon    
                              name    = "times"
                              type    = 'font-awesome'
                              color   = "#f00"
                              onPress = {()=>this.setState({dialogVisible:true})}
                            />
                        </View>
                      :
                      null

                    }
                  </View> 
                  {this.state.isLoadingVideo?
                    <Loading />
                  :
                   null
                }     
              </View>

              <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
              {
                properDetails.map((data,i)=>{
                    <View style={[{width:'45%',flexDirection:'row',marginBottom:30},(i%2==0?{}:{marginLeft:'10%'})]}>
                      <ImageBackground  
                        source={data.imageSource}
                        style={{width:"100%",height:80}}
                      >
                         <Button
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

              </View>


              
            </View>
              <View  style={[styles.marginBottom15,styles.nextBtnhover1]}  onPress={this.submitFun.bind(this)}>
                  <TouchableOpacity onPress={this.submitFun.bind(this)} style={[{width:'100%'}]}>
                     <Text style={[styles.buttonContainerNextBTN,{color:"#fff"}]}>Save & Next
                     </Text>
                  </TouchableOpacity>
              </View>
              
           </KeyboardAwareScrollView>   
        </ScrollView>

        <Dialog.Container visible={this.state.openModal}>
          <Dialog.Title>Availability slot is sucessfully added.</Dialog.Title>
          <Dialog.Button label="Ok" onPress={this.handleCancel} />
        </Dialog.Container>


        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            Once deleted, you will not be able to recover this Video!
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.deleteSingleVideoDirect} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.dialogVisible1}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            Once deleted, you will not be able to recover this Image!
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.deleteimageWS}/>
        </Dialog.Container>

        <Dialog.Container visible={this.state.dialogVisible2}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            Once deleted, you will not be able to recover this slot!
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.deleteSlot}/>
        </Dialog.Container>
      </React.Fragment>
    );
    
  }
}

Availability.defaultProps = {
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



