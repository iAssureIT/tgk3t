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
  PermissionsAndroid
} from 'react-native';

import { Button,Icon, SearchBar } from 'react-native-elements';

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
// import ImagePicker from 'react-native-image-picker';
// import RNFS from 'react-native-fs';
import axios          from 'axios';
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
export default class PropertyDetails7 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
     
    };
  }

  setActive=(index)=>{
    this.setState({activeIndex:index});
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

  componentDidMount(){

      // activeIndexios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

    axios
      .get('/api/projectSettings/get/one/S3')
      .then((response)=>{
        console.log("s3_response.............",response);
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
                <Text style={[styles.heading,{marginBottom:10}]}>
                  Please Upload Images and a Video of your Property
                </Text>
              </View>

                       <View style={styles.divider}></View>

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
                                return(
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
                                )
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
              onPress         = {()=>this.props.navigation.navigate('PropertySuccess')}
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
      </React.Fragment>
    );
    
  }
}


