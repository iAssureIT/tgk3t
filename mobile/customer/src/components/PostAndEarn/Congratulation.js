import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  SafeAreaView,
  TextInput,
  Platform
} from 'react-native';

import { Button,Icon, SearchBar }           from 'react-native-elements';
import axios                                from 'axios';
import AsyncStorage                         from '@react-native-community/async-storage';

import ValidationComponent                  from "react-native-form-validator";
import { TextField }                        from 'react-native-material-textfield';
import {RadioGroup, RadioButton}            from 'react-native-flexi-radio-button';
import CheckBox                             from 'react-native-check-box'
import { NavigationActions, StackActions }  from 'react-navigation';

import HeaderBar                            from '../../layouts/HeaderBar/HeaderBar.js';
import styles                               from './styles.js';
import {colors,sizes}                       from '../../config/styles.js';

import RNSpeedometer                        from 'react-native-speedometer'
const window = Dimensions.get('window');

export default class Congratulation extends ValidationComponent{

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
      token : "",
      uid : "",
      propertyId : "",
      allData : "",
      value: 0,
      per :0 
    };
  }

  onChange = (value) => this.setState({ value: parseInt(value) });


  componentDidMount(){
     this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._retrieveData()
    })
  }

  componentWillUnmount () {
    this.focusListener.remove()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this._retrieveData()
  }


  _retrieveData = async () => {
    try {
      const uid             = await AsyncStorage.getItem('uid');
      const token           = await AsyncStorage.getItem('token');
      const mobile          = await AsyncStorage.getItem('mobile');
      const propertyId      = await AsyncStorage.getItem('propertyId');
      const propertyType    = await AsyncStorage.getItem('propertyType');
      const transactionType = await AsyncStorage.getItem('transactionType');
      const prop_index      = await AsyncStorage.getItem('index');

      // console.log("Congratulation propertyId",propertyId);
        this.setState({uid:uid})
        this.setState({token:token})
        this.setState({mobile:mobile})
        this.setState({propertyId:propertyId})
        this.setState({propertyType:propertyType})
        this.setState({transactionType:transactionType})

        if(token!="")
        {
          axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
          var formvalues = {
             "index"      : parseInt(prop_index)
          }

          // console.log("index",formvalues)
          axios
            .post('/api/properties/post/findindexper',formvalues)
            .then( (res) =>{
              // console.log("resposnse here===================>",res);
              var cash_per = res.data.data.earnings;
              console.log("here earnings",cash_per);
              axios
              .get('/api/properties/'+this.props.property_id)
              .then((propertyData) =>{
                // console.log("propertiesData",propertyData.data);
                axios
                  .get('/api/users/get/one/'+localStorage.getItem("uid"))
                  .then((userData) =>{
                        var sendDataToUser = {
                        "templateName"  : "User - New Property Posted",
                        "toUserId"      : userData.data._id,
                        "variables"           : {
                            "userName"          : userData.data.profile.fullName,
                            "propertyType"      : propertyData.data.propertyType,
                            "transactionType"   : propertyData.data.transactionType,
                            "propertyID"        : propertyData.data.propertyCode,
                            "address"           : propertyData.data.propertyLocation.address,
                            "society"           : propertyData.data.propertyLocation.society,
                            "subArea"           : propertyData.data.propertyLocation.subArea,
                            "area"              : propertyData.data.propertyLocation.area,
                            "city"              : propertyData.data.propertyLocation.city,
                            "state"             : propertyData.data.propertyLocation.state,
                        }
                    }
                    // console.log("sendData",sendDataToUser);
                    var sendDataToAdmin = {
                        "templateName"        : "Admin - New Property Posted",
                        "toUserId"            : "admin",
                        "variables"           : {
                            "userName"          : userData.data.profile.fullName,
                            "userMobile"        : userData.data.profile.mobileNumber,
                            "userEmail"         : userData.data.profile.emailId,
                            "userCity"          : userData.data.profile.city,
                            "propertyType"      : propertyData.data.propertyType,
                            "transactionType"   : propertyData.data.transactionType,
                            "propertyID"        : propertyData.data.propertyCode,
                            "address"           : propertyData.data.propertyLocation.address,
                            "society"           : propertyData.data.propertyLocation.society,
                            "subArea"           : propertyData.data.propertyLocation.subArea,
                            "area"              : propertyData.data.propertyLocation.area,
                            "city"              : propertyData.data.propertyLocation.city,
                            "state"             : propertyData.data.propertyLocation.state,
                        }
                    }
                    // console.log("sendData",sendDataToAdmin);
                    axios
                    .post('/api/masternotifications/post/sendNotification',sendDataToAdmin)
                    .then((result) =>{
                      // console.log("SendEmailNotificationToAdmin",result);
                      axios
                      .post('/api/masternotifications/post/sendNotification',sendDataToUser)
                      .then((res) =>{
                        // console.log("SendEmailNotificationToUser",res);           
                      })
                      .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                            Alert.alert("Your session is expired!"," Please login again.");
                            AsyncStorage.removeItem('fullName');
                            AsyncStorage.removeItem('token');
                            this.navigateScreen('MobileScreen'); 
                        }
                    });          
                  })
                })
               .catch((error)=>{
                    console.log("error = ",error);
                    if(error.message === "Request failed with status code 401")
                    {
                        Alert.alert("Your session is expired!"," Please login again.");
                        AsyncStorage.removeItem('fullName');
                        AsyncStorage.removeItem('token');
                        this.navigateScreen('MobileScreen'); 
                    }
                });  
                             
              })
             .catch((error)=>{
                  console.log("error = ",error);
                  if(error.message === "Request failed with status code 401")
                  {
                    Alert.alert("Your session is expired!"," Please login again.");
                    AsyncStorage.removeItem('fullName');
                    AsyncStorage.removeItem('token');
                    this.navigateScreen('MobileScreen'); 
                  }
              });

              this.setState({
                percentage : cash_per
              },()=>{
                var data =  this.state.percentage;
                var per = data * 2;
                console.log("data",data);
                console.log("per",per);
                this.setState({
                  value:data,
                  per  : per
                })
              });
              
            })
            .catch((error)=>{
                console.log("error = ",error);
                  if(error.message === "Request failed with status code 401")
                  {
                      Alert.alert("Your session is expired!"," Please login again.");
                      AsyncStorage.removeItem('fullName');
                      AsyncStorage.removeItem('token');
                      this.navigateScreen('MobileScreen'); 
                  }
              });
          }
      } catch (error) {}
    }

    submitFun(){
      this.navigateScreen('PropertyDetailsPage');
    }

  
    render(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;
      const { navigation } = this.props;
      let prop = {
          imageSource : require('../../images/p1.png'),
      }
      return (
        <React.Fragment>
          <HeaderBar navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <View style={styles.formWrapper}>

                <View style={[{width:'100%',justifyContent:'center',alignItems:'center'},styles.marginBottom15]}>
                  <Image 
                    style={{height:100,width:120}}
                    resizeMode={"contain"}
                    source={require('../../images/fireworks.png') }
                  />
                </View>

                <View style={[styles.alignCenter,styles.marginBottom15]}>
                  <Text style={{fontSize:28,fontFamily:'Roboto-Medium',fontStyle:'italic',color:colors.button}}>Congratulations</Text>
                </View>

                <View style={[styles.alignCenter,styles.marginBottom15]}>
                  <Text style={styles.heading4}>Your Property is</Text>
                  <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.golden}}>FAST SELLING HOT POTATO</Text>
                  <Text style={[styles.heading4,{textAlign:'center'}]}>and qualifies for a 
                    <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.golden}}> {this.state.value}% </Text> 
                    brokerage to be paid by us on successful deal through us
                  </Text>
                </View>
                <SafeAreaView style={styles.congratsContainer}>
                 {/* <TextInput placeholder="Speedometer Value" style={styles.textInput} onChangeText={this.onChange} />*/}
                 <Text style={{ transform: [{ rotate: "-90deg" }], width: 40 ,position:"absolute", marginTop:"28%",marginLeft:25,zIndex:1}}>
                    0
                  </Text>
                 <Text style={{ transform: [{ rotate: "-55deg" }], width: 40 ,position:"absolute", marginTop:"14%",marginLeft:40,zIndex:1}}>
                    10
                  </Text>
                  <Text style={{ transform: [{ rotate: "-20deg" }], width: 40 , position:"absolute", marginTop:"1%",marginLeft:100,zIndex:1}}>
                    20
                  </Text>
                  <Text style={{ transform: [{ rotate: "20deg" }], width: 40 , position:"absolute", marginTop:"4%",marginLeft:185,zIndex:1}}>
                    30
                  </Text>
                  <Text style={{ transform: [{ rotate: "58deg" }], width: 40 ,position:"absolute", marginTop:"22%",marginLeft:245,zIndex:1}}>
                    40
                  </Text>
                  <Text style={{ transform: [{ rotate: "90deg" }], width: 40 ,position:"absolute",marginTop:"48%",marginLeft:265,zIndex:1}}>
                    50
                  </Text>
                  <RNSpeedometer 
                    value={this.state.value} 
                    size={250}
                    defaultValue= {0}
                    maxValue ={50}
                    easeDuration= {2000}
                    wrapperStyle= {{marginTop:20}}
                    labels={[
                      {
                        name: 'Good',
                        labelColor: '#00ff59',
                        activeBarColor: '#5DC953',
                      },
                      {
                        name: 'Very Good',
                        labelColor: '#00ff77',
                        activeBarColor: '#68DD39',
                      },
                      {
                        name: 'Hot',
                        labelColor: '#fff600',
                        activeBarColor: '#fff600',
                      },
                      {
                        name: 'Very Hot',
                        labelColor: '#ffaa00',
                        activeBarColor: '#ffaa00',
                      },
                      {
                        name: 'Hottest',
                        labelColor: '#ff0000',
                        activeBarColor: '#ff0000',
                      },
                    ]}

                    />
                </SafeAreaView>
                <View style={[styles.alignCenter,{paddingHorizontal:15,marginTop:70}, styles.marginTopSOM,styles.marginBottom15]}>
                  <Text style={[styles.heading4,{textAlign:'center'}]}>
                    Your property 
                      <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.button}}> Successfully </Text> 
                    submitted & will be published soon!!
                  </Text>
                </View>
                
                <View  style={[styles.marginBottom15,styles.nextBtnhover]}  onPress={this.submitFun.bind(this)}>
                    <TouchableOpacity onPress={this.submitFun.bind(this)} style={[{width:'100%'}]}>
                       <Text style={[styles.buttonContainerNextBTN,{color:"#fff"}]}>Property Details
                       </Text>
                    </TouchableOpacity>
                </View>

              </View>
            </ScrollView>
          </React.Fragment>
        );
        
      }
    }
