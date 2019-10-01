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

import { Button,Icon, SearchBar }           from 'react-native-elements';
import axios                                from 'axios';
import { NavigationActions, StackActions }  from 'react-navigation';
import AsyncStorage                         from '@react-native-community/async-storage';
import ValidationComponent                  from "react-native-form-validator";
import { TextField }                        from 'react-native-material-textfield';
import { RadioGroup, RadioButton }          from 'react-native-flexi-radio-button';
import CheckBox                             from 'react-native-check-box'
import HeaderBar                            from '../../layouts/HeaderBar/HeaderBar.js';
import styles                               from './styles.js';
import { colors,sizes }                     from '../../config/styles.js';
import { Dropdown }                         from 'react-native-material-dropdown';
import DatePicker                           from "react-native-datepicker";
import TimePicker                           from "react-native-24h-timepicker";
import Modal                                from "react-native-modal";
import {request, PERMISSIONS, RESULTS}      from 'react-native-permissions';
import SwitchToggle                         from 'react-native-switch-toggle';
import ImagePicker                          from 'react-native-image-picker';
import S3FileUpload                         from 'react-s3';
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

export default class Availability extends ValidationComponent{

  navigateScreen=(route)=>{
  const navigateAction = StackActions.reset({
             index: 0,
            actions: [
            NavigationActions.navigate({ routeName: route}),
            ],
        });
        this.props.navigation.dispatch(navigateAction);
}

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
    };

      var property_id = this.props.navigation.getParam('property_id','No property_id');
      console.log("property_id in constructor property details",property_id);
     
  }

  componentDidMount(){
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

      console.log("availability propertyId",propertyId);
      console.log("availability mobile",mobile);
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
           console.log("property_id in constructor property details",property_id);

            if(property_id!=null)
            {
              console.log("here edit 4th form");
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
                      imgArrayWSaws           : response.data.gallery.Images,
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
            bucketName      : response.data.bucket,
            dirName         : 'propertiesImages',
            region          : response.data.region,
            accessKeyId     : response.data.key,
            secretAccessKey : response.data.secret,
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
     axios
      .get('/api/projectSettings/get/one/S3')
      .then((response)=>{
        console.log("s3_response.............",response);
        const config = {
                          bucketName      : response.data.bucket,
                          dirName         : 'propertiesImages',
                          region          : response.data.region,
                          accessKeyId     : response.data.key,
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
                       this.navigateScreen('Home');          
                  }
        });


  } catch (error) {
      // Error retrieving data
    }
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
    // if(this.validInput()){
       if(this.state.updateOperation === true){
        // console.log("update fun");
           var ov = this.state.originalValues;

          let {
              someOnemobile,
              mobile,
             
            } = this.state;
           

             var someOnemobileNo = someOnemobile.length>0 ? someOnemobile.split(' ')[1].split('-').join('') : null;
             var myMobileNo = mobile.length>0 ? mobile.split(' ')[1].split('-').join('') : null;

             console.log("someOnemobileNo",someOnemobileNo);
             console.log("myMobileNo",myMobileNo);
           
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
                "property_id"         : this.state.propertyId,
                "uid"                 : this.state.uid,
              };

              console.log("Availability req 1 = ",formValues);
                    if(this.state.available.length!==0){
                        
                    axios
                    .patch('/api/properties/patch/availabilityPlan',formValues)
                    .then( (res) =>{
                      console.log("availabilityPlan----------------",res);
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
                                 Alert.alert("Please enter mandatory fields","warning");
                  }

     }else{

           console.log("submit function");
           var ov = this.state.originalValues;

          let {
             
              someOnemobile,
              mobile,
             
            } = this.state;
           

             var someOnemobileNo = someOnemobile.length>0 ? someOnemobile.split(' ')[1].split('-').join('') : null;
             var myMobileNo = mobile.length>0 ? mobile.split(' ')[1].split('-').join('') : null;

             console.log("someOnemobileNo",someOnemobileNo);
             console.log("myMobileNo",myMobileNo);

           
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
                // "video"               : this.state.singleVideo,
                "status"              : "New",
                "property_id"         : this.state.propertyId,
                "uid"                 : this.state.uid,
              };

              console.log("Availability req 1 = ",formValues);
                    if(this.state.available.length!==0){
                        
                    axios
                    .patch('/api/properties/patch/availabilityPlan',formValues)
                    .then( (res) =>{
                      console.log("availabilityPlan----------------",res);
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
                      Alert.alert("Please enter mandatory fields","warning");
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


  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    request(PERMISSIONS.IOS.PHOTO_LIBRARY)
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
          if (response.uri) {
            var file = response;
              if (file) {
                var fileName = file.fileName; 
                var ext = fileName.split('.').pop(); 
                if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
                  if (file) {
                    console.log("file------>",file);
                    console.log("config-------->",this.state.config);
                    S3FileUpload
                    .uploadFile(file,this.state.config)
                    .then((Data)=>{
                      console.log("Data = ",Data);
                        var obj1={
                          imgPath : Data.location,
                        }
                        var imgArrayWSaws = this.state.imgArrayWSaws;
                        imgArrayWSaws.push(obj1);
                        this.setState({
                          imgArrayWSaws : imgArrayWSaws
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
                    Alert.alert("File not uploaded","Something went wrong","error");  
                  }
                }else{
                  Alert.alert("Please upload file","Only Upload  images format (jpg,png,jpeg)","warning");   
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

  render(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;
    const { navigation } = this.props;
    let {activeIndex} = this.state;
    // let weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    console.log("this.state.photo",this.state.photo);

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
                    {this.state.imgArrayWSaws && this.state.imgArrayWSaws.length>0 ?
                        this.state.imgArrayWSaws.map((photo,i)=>(
                          <View style={[{width:'45%',flexDirection:'row',marginBottom:30},(i%2==0?{marginLeft:'5%'}:{marginLeft:'5%'})]}>
                            <Image
                              source={{ uri: photo.imgPath }}
                              style={{width: 120, height: 100/*, marginRight:10*/ }}
                            />  
                          </View>
                        ))
                        :
                        null
                      }
                  </View>    
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



