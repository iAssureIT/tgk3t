import React, { Component } from "react";
import Meteor, { Accounts, withTracker } from "react-native-meteor";
import { StyleSheet,
         Text,
         View,
         TextInput,
         BackHandler,
         DeviceEventEmitter,
         TouchableOpacity,
         Platform,
         KeyboardAvoidingView,
         ScrollView,
         DrawerLayoutAndroid,
         ImageBackground,
         Image,
         Alert,
         PermissionsAndroid} from "react-native";
import { Header, Button, Icon,Avatar} from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { robotoWeights } from 'react-native-typography';

import { TextField } from 'react-native-material-textfield';
import DocumentPicker from 'react-native-document-picker';
import { RNS3 } from 'react-native-aws3';
import { Dropdown } from 'react-native-material-dropdown';

import Drawer from 'react-native-drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Moment from 'react-moment';
import NotificationCommon from '../NotificationLayout/NotificationCommon.js';
import SideMenu from 'react-native-side-menu';
import PropTypes from "prop-types";

import HeaderDy from "../HeaderDy/HeaderDy.js";
import styles from "./styles.js";
import Menu from '../Menu/Menu.js';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings';
import RNFS from 'react-native-fs';
var moment = require('moment');
import ValidationComponent from "react-native-form-validator";

class DailyAttendance extends ValidationComponent {

  constructor(props){
    super(props);
    let name = "";
    if(this.props.userName){name = "Welcome " + this.props.userName;}

    this.state = {
                  name            : name,
                  isOpen          : false,
                  selectedItem    : 'About',
                  lat             : 18.518514,
                  lng             : 73.9342,
                  inputFocusColor : '#00b8FF',
                  avatarSource    : '',
                  curTime         : moment().format('DD/MM/YYYY hh:mm:ss A'),
                  kms             : '0',
                  images          : [],
                  entry           : 'In',
                  showCheckInBtn  : true,
                };

    this.openControlPanel       = this.openControlPanel.bind(this);
    this.closeControlPanel      = this.closeControlPanel.bind(this);
    this.toggle                 = this.toggle.bind(this);
    this.submitCheckins         = this.submitCheckins.bind(this);
    this.addCameraLocationImgs  = this.addCameraLocationImgs.bind(this);
    this.removeImg              = this.removeImg.bind(this);
    this.updateMenuState        = this.updateMenuState.bind(this);
    this.validInput             = this.validInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps hh: ',nextProps);
    if( nextProps && nextProps.todaysAttendanceData && nextProps.todaysAttendanceData.length > 0){
        this.setState({
                      entry  : nextProps.todaysAttendanceData.length == 0 ? 'In' : 'Out',
                    },()=>{
                      // console.log('states=>',this.state);
                    });    
    }

    if( nextProps && nextProps.todaysAttendanceData && nextProps.todaysAttendanceData.length==1){
        this.setState({
                      showCheckInBtn  : false,
                    },()=>{
                      // console.log('states=>',this.state);
                    });    
    }
  }

  getCurrentLocation = ()=>{
    this.watchID = navigator.geolocation.getCurrentPosition(
      (position) => {

      this.setState({
                      lat : position.coords.latitude,
                      lng : position.coords.longitude
                    });
    }, (error)=>console.log('getCurrentLocation Error =>',error),
       // {enableHighAccuracy: false, timeout: 5000}
       );  
  }
  toggle() {
    //
    let isOpen = !this.state.isOpen;
      this.setState({
        isOpen
      });
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : moment().format('DD/MM/YYYY hh:mm:ss A'),
      })
    },1000);

      this.watchID = navigator.geolocation.getCurrentPosition(
        (position) => {

        this.setState({
                        lat : position.coords.latitude,
                        lng : position.coords.longitude
                      });
        // this.onRegionChange(region, region.latitude, region.longitude);
      }, (error)=>{
                    console.log('Current Location Error =>',error);

                    LocationServicesDialogBox.checkLocationServicesIsEnabled({
                        message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                        ok: "YES",
                        cancel: "NO",
                        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
                        showDialog: true, // false => Opens the Location access page directly
                        openLocationServices: true, // false => Directly catch method is called if location services are turned off
                        preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
                        preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
                        providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
                    }).then((success)=> {
                        // console.log('success=>',success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}

                        this.getCurrentLocation();


                    }).catch((error) => {
                        console.log(error.message); // error.message => "disabled"
                    });   


         },
         // { enableHighAccuracy: false, timeout: 5000}
         );

  }

  closeControlPanel = () => {
    this._drawer.close()
  }

  openControlPanel = () => {
    this._drawer.open()
  }

  toggle() {
    let isOpen = !this.state.isOpen;
    this.setState({ isOpen });
  }


  validInput = () => {
    let valid = true;
    this.validate({
      kms : {
        required     : true,
        kmsValidate  : {
                        entry      : this.state.entry,
                        kmsReading : this.props.todaysAttendanceData &&
                                     this.props.todaysAttendanceData.length==1 ?
                                     this.props.todaysAttendanceData[0].kmsReading : 0,
                      },
        // minMaxlength : true,
      },
    });

    if(this.isFieldInError("kms")) {
      let kmsError = this.getErrorsInField("kms");
      this.setState({ kmsError });
      valid = false;
    }else{
      this.setState({ kmsError: "" });
    }

    return valid;
  };

  submitCheckins = ()=>{
      console.log(' validInput =>',this.validInput());
      if(this.validInput()){
        var year  = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day   = new Date().getDate() ;
        var todaysDate = parseInt(year+''+ month +''+ day);
        var formValues = {
          "entry"       : this.state.entry,
          "location"    : {lat:this.state.lat, lng:this.state.lng},
          "kmsReading"  : this.state.kms,
          "userId"      : Meteor.userId(),
          "photos"      : this.state.images,
          "todaysDate"  : todaysDate,
          "time"        : new Date(),
        };

        // console.log(' formValues => ',formValues);

        Meteor.call('checkinEntryLogNative', formValues, (error,result) =>{
          if(error){
            Alert.alert(
              error.reason,
            );
          }else{
            Alert.alert(
              '','Check-'+this.state.entry+' done!',
            );
            this.setState({
                        "kms"    : '0',
                        "images" : [],
            });
            // this.props.navigation.navigate('ListOfCameraLocation');
          }
        });  
      } 
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
        ImagePicker.launchCamera(options, (response) => {

          var image = response.data;

          var fileName    = 'img-'+new Date().getTime()+'.jpeg';
          const imageData = image;
          const imagePath = RNFS.DocumentDirectoryPath+'/'+fileName;

          RNFS.writeFile(imagePath, imageData, 'base64')
              .then(() => {

                            var fileExt = fileName.split('.').pop();
                            var file = {
                              uri   : 'file://'+imagePath,
                              name  : fileName,
                              type  : response.type,
                            };
                           // this.setState({ image : file.uri });
                            // console.log("file obj => ",file);
                          
                            const options = {
                              keyPrefix           : "AttendanceCheckIn/",
                              bucket              : s3Data.bucket,
                              region              : s3Data.region,
                              accessKey           : s3Data.key,
                              secretKey           : s3Data.secret,
                            };

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
                               // console.log("---------  response.body  ------------------");
                            
                                this.setState({'images' : [ ...this.state.images , imgLink ] },
                                               ()=>{
                                                // console.log(this.state.cameraImgs);
                                               });

                            }).catch((error) => console.log("Handled Exceptions image ",error));
                          })
                          .catch((err) => {
                            console.log('err => ',err.message);
                          });

        });

      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  uploadCameraLocationImgs = () =>{
    this.requestCameraPermission();
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

    const { navigate,goBack } = this.props.navigation;
    const menu = <Menu navigate={navigate} />;
    // console.log('Images =>',this.state.images);
    return(
       <Drawer
          ref={(ref) => this._drawer = ref}
          content={
            <NotificationCommon
              navigate          = {navigate}
              updateCount       = {()=>this.updateCount.bind(this)} 
              closeControlPanel = {()=>this.closeControlPanel.bind(this)}
            />
          }
          side="right"
          >
        <SideMenu disableGestures={true} openMenuOffset={300} menu={menu} isOpen={this.state.isOpen}  onChange={isOpen => this.updateMenuState(isOpen)} >
        
              <ImageBackground source={require('../../images/background_.png')} resizeMode='stretch'  style={styles.container}>
               <View style={{flexDirection:'row',marginTop:10}}>
                <TouchableOpacity  onPress={this.toggle} >
                  <View style={{flex:.5,marginTop:10,paddingHorizontal:20}}>
                      <Icon size={25} name='bars' type='font-awesome' color='#fff' />
                  </View>
                </TouchableOpacity>
                <View style={{flex:.5,alignItems:'flex-start'}}>
                  <Icon name="bell-outline" type="material-community" size={35}  color="#fff" style={styles.bellIcon}/>
                  <Text style={styles.notificationText}>{0}</Text>
                </View>
              </View>
           
              <HeaderDy  goBack={goBack} />

              <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:20,color:'#FF8800',textAlign:'center',marginBottom:20}]}>iSupport System</Text>
              </View>
              <View style={{flexDirection:'row',marginBottom:20}}>
                  <View style={{alignItems:'center',paddingHorizontal:20}}>
                    <Text style={[((Platform.OS === 'ios') ?
                      sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:15,color:'#666',textAlign:'center',marginTop:10}]}>
                        {'Daily Attendance'}
                    </Text>
                  </View>
              </View>
            <View style={{flex:1,marginBottom:20}}>
            <ScrollView createContainerStyle={{borderWidth:0,}}>
              <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                <View style = {[styles.formInputView,{flexDirection:'row'}]}>
                  <View style={{flex:1, paddingHorizontal:20}}>
                  <View style={[styles.formInputView,styles.marginBottom30]}>
                    <View style={[styles.labelInOut]}>
                      <View style={{flex:0.4}}>
                        <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:15,color:'#666',textAlign:'left'}]}>Time</Text>
                      </View>
                      <View style={{flex:0.6}}>
                        <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:15,color:'#333'}]}>{(this.state.curTime).toString()}</Text>
                      </View>
                    </View>
                  </View>
                 </View>
                </View>

                {
                  !this.props.loading1 ?
                    this.props.todaysAttendanceData && this.props.todaysAttendanceData.length==1 ?
                      <View style = {[styles.formInputView,{flexDirection:'row'}]}>
                        <View style={{flex:1, paddingHorizontal:20}}>
                        <View style={[styles.formInputView,styles.marginBottom30]}>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:0.4}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:15,color:'#666',textAlign:'left'}]}>Check In Time</Text>
                            </View>
                            <View style={{flex:0.6}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:15,color:'#333',textAlign:'left'}]}>{moment(this.props.todaysAttendanceData[0].time).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                            </View>
                          </View>
                        </View>
                       </View>
                      </View>
                      :
                      null
                    :
                    null
                }

                {
                  !this.props.loading1 ?
                    this.props.todaysAttendanceData && this.props.todaysAttendanceData.length==2 ?
                      <View style = {[styles.formInputView, {paddingHorizontal:10}]}>
                        <View style={{flex:1, paddingHorizontal:20, borderWidth:1, borderColor:'#aaa',borderRadius:10}}>
                        <View style={[styles.formInputView,styles.marginBottom30]}>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:1}}>
                              <Text style={{'fontWeight':'bold',marginTop:15,fontSize:15}}>Check {this.props.todaysAttendanceData[0].entry} Details</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{}}>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:0.4}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#666',textAlign:'left',marginBottom:10}]}>Date and Time</Text>
                            </View>
                            <View style={{flex:0.6}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#333',textAlign:'left',marginBottom:10}]}>{moment(this.props.todaysAttendanceData[0].time).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                            </View>
                          </View>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:0.4}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#666',textAlign:'left',marginBottom:10}]}>Location(Lat/Lng)</Text>
                            </View>
                            <View style={{flex:0.6}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#333',textAlign:'left',marginBottom:10}]}>{this.props.todaysAttendanceData[0].location.lat}/{this.props.todaysAttendanceData[0].location.lng}</Text>
                            </View>
                          </View>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:0.4}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#666',textAlign:'left',marginBottom:10}]}>KMS Reading</Text>
                            </View>
                            <View style={{flex:0.6}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#333',textAlign:'left',marginBottom:10}]}>{this.props.todaysAttendanceData[0].kmsReading} kms</Text>
                            </View>
                          </View>
                        </View>

                        <View style={{flexDirection:'row',flex:1,marginTop:1,borderRadius:5}}>
                          <ScrollView
                            horizontal={true}
                          >
                          {
                            this.props.todaysAttendanceData[0] &&
                            this.props.todaysAttendanceData[0].photos.length > 0 &&
                            this.props.todaysAttendanceData[0].photos.map((item, index)=>{
                              return( 
                                      <View key={index}>
                                        <View style={{marginTop:10,marginBottom:15,}}>
                                          <Avatar
                                            width={90}
                                            height={90}
                                            rounded
                                            avatarStyle={{borderRadius:5,borderWidth:0}}
                                            source={{
                                              uri:item.imgLink
                                            }}
                                            activeOpacity={0.7}
                                          />
                                        </View>
                                      </View>
                                );
                            })
                          }
                          </ScrollView>
                        </View>
                       </View>


                        <View style={{flex:1, paddingHorizontal:20, borderWidth:1,borderRadius:10, borderColor:'#aaa', marginTop:10}}>
                        <View style={[styles.formInputView,styles.marginBottom30]}>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:1}}>
                              <Text style={{'fontWeight':'bold',fontSize:15,marginTop:15,marginBottom:5}}>Check {this.props.todaysAttendanceData[1].entry} Details</Text>
                            </View>
                          </View>
                        </View>
                        <View style={[styles.formInputView,styles.marginBottom30]}>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:0.4}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#666',textAlign:'left',marginBottom:10}]}>Date and Time</Text>
                            </View>
                            <View style={{flex:0.6}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#333',textAlign:'left',marginBottom:10}]}>{moment(this.props.todaysAttendanceData[1].time).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                            </View>
                          </View>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:0.4}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#666',textAlign:'left',marginBottom:10}]}>Location(Lat/Lng)</Text>
                            </View>
                            <View style={{flex:0.6}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#333',textAlign:'left',marginBottom:10}]}>{this.props.todaysAttendanceData[1].location.lat}/{this.props.todaysAttendanceData[1].location.lng}</Text>
                            </View>
                          </View>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:0.4}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#666',textAlign:'left',}]}>KMS Reading</Text>
                            </View>
                            <View style={{flex:0.6}}>
                              <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:14,color:'#333',textAlign:'left',}]}>{this.props.todaysAttendanceData[1].kmsReading} kms</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',flex:1,marginTop:5,borderRadius:5}}>
                          <ScrollView
                            horizontal={true}
                          >
                          {/*console.log('this.props.todaysAttendanceData[1]',this.props.todaysAttendanceData[1])*/}
                          {
                            this.props.todaysAttendanceData[1] &&
                            this.props.todaysAttendanceData[1].photos.length > 0 &&
                            this.props.todaysAttendanceData[1].photos.map((item, index)=>{
                              return( 
                                      <View key={index}>
                                        <View style={{marginTop:10,marginBottom:15,}}>
                                          <Avatar
                                            width={90}
                                            rounded
                                            height={90}
                                            avatarStyle={{borderRadius:5,borderWidth:0}}
                                            source={{
                                              uri:item.imgLink
                                            }}
                                            activeOpacity={0.7}
                                          />
                                        </View>
                                      </View>
                                );
                            })
                          }
                          </ScrollView>
                        </View>
                       </View>

                        <View style={{flex:1, paddingHorizontal:20, borderWidth:1, borderColor:'#aaa',borderRadius:5, marginTop:10}}>
                        <View style={[styles.formInputView,styles.marginBottom30]}>
                          <View style={[styles.labelInOut]}>
                            <View style={{flex:1}}>
                              <Text style={{'fontWeight':'bold',fontSize:15,marginTop:15,marginBottom:5}}>Travelled { this.props.todaysAttendanceData[1].kmsReading - this.props.todaysAttendanceData[0].kmsReading } kms in { (moment.duration(moment(this.props.todaysAttendanceData[1].time).diff(moment(this.props.todaysAttendanceData[0].time))).asHours()).toFixed(2)} hrs </Text>
                            </View>
                          </View>
                        </View>
                       </View>

                      </View>
                    :
                      this.state.showCheckInBtn ?
                        <View style={{
                                      alignItems   : 'center',
                                      marginTop    : 50,
                                      marginBottom : 15
                                    }}>
                          <Button
                          onPress         = { ()=> this.setState({'showCheckInBtn' : false}, ()=>{}) }
                          buttonStyle     = {styles.signUpOvalShapeView}
                          title           = {"Check In"} />
                        </View>

                        :


                        <View style={{flex:1,marginTop:0,}}>

                          <View style = {[styles.formInputView,{flexDirection:'row',marginBottom:25}]}>
                            <View style={{flex:1, paddingHorizontal:20}}>
                            <View style={[styles.formInputView,styles.marginBottom30]}>
                              <View style={[styles.labelInOut]}>
                                <View style={{flex:0.4}}>
                                  <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:15,color:'#666',textAlign:'left'}]}>Location(Lat/Lng)</Text>
                                </View>
                                <View style={{flex:0.6}}>
                                  <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.regular),{fontSize:15,color:'#333',textAlign:'left'}]}>{this.state.lat+' / '+this.state.lng}</Text>
                                </View>
                              </View>
                            </View>
                           </View>
                          </View>

                        
                            <View style={{paddingHorizontal:20}}>
                            <View style={[styles.formInputView,styles.marginBottom30]}>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}>
                                  <Icon name="map-marker" type="font-awesome" size={20}  color="#aaa" style={{}}/>                    
                                </View>
                                <View style={styles.inputTextWrapper}>                    
                                  <TextField
                                      label                 = "Kilometers Reading"
                                      value                 = {this.state.kms}
                                      onChangeText          = {(kms) => {
                                                                          console.log('kms =>',kms);
                                                                          this.setState({kms});
                                                                        }
                                                              }
                                      // onBlur                = {(val)=>{
                                      //                                 console.log('val =>',val);
                                      //                               }
                                      //                         }
                                      lineWidth             = {1}
                                      tintColor             = {"#FF8800"}
                                      inputContainerPadding = {0}
                                      labelHeight           = {15}
                                      labelFontSize         = {15}
                                      titleFontSize         = {15}
                                      baseColor             = {'#666'}
                                      textColor             = {'#333'}
                                      autoCapitalize        ="none"
                                      isRequired            = {true}
                                      containerStyle        = {styles.textContainer}
                                      inputContainerStyle   = {styles.textInputContainer}
                                      titleTextStyle        = {styles.textTitle}
                                      style                 = {styles.textStyle}
                                      labelTextStyle        = {styles.textLabel}
                                      keyboardType          = "numeric"
                                      // error                 = {['Please add number.']}
                                      // maxLength             = {3}
                                    />
                                </View>
                              </View>
                            </View>
                           </View>
                       

                          {
                            this.state.kmsError ?
                                <View style = {[styles.formInputView,{flexDirection:'row'}]}>
                                  <View style={{flex:1, paddingHorizontal:20}}>
                                  <View style={[styles.formInputView,styles.marginBottom30]}>
                                    <View style={[styles.labelInOut]}>
                                      <View style={{flex:1}}>
                                        <Text style={{color:'#f00'}}>{this.state.kmsError}</Text>
                                      </View>
                                    </View>
                                  </View>
                                 </View>
                                </View>
                                :
                                null
                          }

                          {
                            !this.props.loading1 ?
                              this.props.todaysAttendanceData && this.props.todaysAttendanceData.length==1 ?
                                <View style = {[styles.formInputView,{flexDirection:'row'}]}>
                                  <View style={{flex:1, paddingHorizontal:20}}>
                                  <View style={[styles.formInputView,styles.marginBottom30]}>
                                    <View style={[styles.labelInOut]}>
                                      <View style={{flex:1}}>
                                        <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.bold),{fontSize:14,color:'#333333',textAlign:'left',marginTop:10}]}>Note : Please enter checkout kilometers entry greater than {this.props.todaysAttendanceData[0].kmsReading} or equal to zero.</Text>
                                      </View>
                                    </View>
                                  </View>
                                 </View>
                                </View>
                                :
                                null
                              :
                              null
                          }

                          <View style={{marginTop:0}}>
                            <View style={{flex:1, paddingHorizontal:20}}>
                             <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.bold),{fontSize:15,color:'#666',textAlign:'left',marginBottom:10}]}>{'Upload Images'}</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:15}}>
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

                          <View style={{flexDirection:'row',marginTop:5,borderRadius:5}}>
                          <ScrollView horizontal={true}>
                            {
                              this.state.images &&
                              this.state.images.length > 0 &&
                              this.state.images.map((item, index)=>{
                                return( 
                                        <View key={index}>
                                          <View style={{paddingHorizontal:20, marginTop:35, marginBottom:35}}>
                                            <Avatar
                                              width         = { 90 }
                                              height        = { 90 }
                                              avatarStyle   = {{ borderRadius:5, borderWidth:0}}
                                              source        = {{ uri:item.imgLink }}
                                              activeOpacity = { 0.7 }
                                            />
                                          </View>
                                            <View style={{  borderWidth     : 1,
                                                            marginTop       : 15,
                                                            backgroundColor : '#e74335',
                                                            borderColor     : "#e74335",
                                                            borderRadius    : 50,
                                                            margin          : 'auto',
                                                            position        : "absolute",
                                                            top             : 10,
                                                            left            : 95,
                                                            width           : 25,
                                                            height          : 25,
                                                            color           : "#fff",
                                                            zIndex          : 2}}>
                                              <TouchableOpacity onPress={this.removeImg.bind(this, index)} >
                                                <Icon name="close" type="material-community" size={20}  color="#fff"/>
                                              </TouchableOpacity>
                                            </View>
                                        </View>
                                  );
                              })
                            }
                            </ScrollView>
                          </View>
                         
                          {
                            !this.props.loading1 ?
                              this.props.todaysAttendanceData && this.props.todaysAttendanceData.length==1 ?
                                <View style = {{flexDirection:'row', marginTop:10,'justifyContent':'center'}}>
                                  <View style = {{backgroundColor:'#fffdd0', flex:0.9, 'justifyContent':'center', paddingVertical:10}}>
                                      <Text style={[((Platform.OS === 'ios') ? sanFranciscoWeights.bold :robotoWeights.bold),{fontSize:13,color:'#333333',textAlign:'center'}]}>Check-in done {moment(this.props.todaysAttendanceData[0].time).fromNow()}</Text>
                                  </View>
                                </View>
                                :
                                null
                              :
                              null
                          }

                          <View style={{
                            alignItems   : 'center',
                            marginTop    : 20,
                            marginBottom : 15
                          }}>
                            <Button onPress = { this.submitCheckins }
                            buttonStyle     = {styles.signUpOvalShapeView}
                            title           = {this.props.todaysAttendanceData&&this.props.todaysAttendanceData.length==0?"Check In":"Check Out"} />
                          </View>
                        </View>


                  :

                  null
                }
              </KeyboardAvoidingView>
              </ScrollView>
            </View>
            </ImageBackground>
        </SideMenu>
      </Drawer>
    );
  }
}



export default withTracker(props => {

  const postHandle      = Meteor.subscribe('projectSettingsPublish');
  const loading         = postHandle.ready();
  const s3Data          = Meteor.collection('projectSettings').findOne({"_id":"1"}) || {};

  var year  = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  var day   = new Date().getDate() ;

  var todaysDate = parseInt(year+''+ month +''+ day);

  var query = {
                "userId" : Meteor.userId(),
                "todaysDate" : todaysDate,
              };

  const postHandle1     = Meteor.subscribe('dailyAttendanceToday', todaysDate);
  const loading1        = !postHandle1.ready();

  var todaysAttendanceData = Meteor.collection('dailyAttendance').find(query, {sort: {time: 1}}) || [];


  var result = {
    s3Data,
    loading1,
    todaysAttendanceData
  };

  return result;

})(DailyAttendance);


DailyAttendance.defaultProps = {

  messages: {
    en: {
      required     : 'This field is required.',
      kmsValidate  : ' Please enter proper kilometers reading.',
    }
  },

  rules: {
    required       : /\S+/,
    kmsValidate(data, value) {
      // console.log('data =>',data);
      // console.log('value =>',value);
      // console.log('value =>',(parseInt(value)));
      // console.log('-----------------');
      // console.log('entry =>',this.state.entry);
      if ( (data.entry == 'In' && (parseInt(value) >= 0)) || (data.entry == 'Out' && ( (data.kmsReading<parseInt(value)) || (data.kmsReading==0&&data.kmsReading==parseInt(value)) ) )) {
        return true;
      }
      return false;
    },
  }//EOF rules
}