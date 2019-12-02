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
  Animated,
} from 'react-native';

import moment                               from 'moment'
import { Button,Icon, SearchBar }           from 'react-native-elements';
import { NavigationActions, StackActions }  from 'react-navigation';
import AsyncStorage                         from '@react-native-community/async-storage';

import ValidationComponent                  from "react-native-form-validator";
import { TextField }                        from 'react-native-material-textfield';
import axios                                from 'axios';
import HeaderBar                            from '../../layouts/HeaderBar/HeaderBar.js';
import styles                               from './styles.js';
import {colors,sizes}                       from '../../config/styles.js';
import CheckBox                             from 'react-native-check-box'
import Video                                from 'react-native-video';
import MapView                              from 'react-native-maps';
import Carousel                             from 'react-native-snap-carousel';
import Loading                    from '../../layouts/Loading/Loading.js'

const window = Dimensions.get('window');
  var mapStyle = []

export default class PropertyDetailsPage extends ValidationComponent{


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
      region: {
        latitude: 18.5089,
        longitude: 73.9259,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
        propertyProfile: "",
        uid:"",
        token:"",
        property_id : "",
        isLoading :false,
    };
  }

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
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      const propertyId  = await AsyncStorage.getItem('propertyId');
      console.log("get propertyId========>>>>>>======= = ",propertyId);
      console.log("get token========>>>>>>======= = ",token);
      if (uid !== null && token !== null && propertyId!==null) {
        // We have data!!
        this.setState({uid:uid})
        this.setState({token:token})
        this.setState({property_id:propertyId})
        this.setState({isLoading:true})
          axios
          .get('/api/properties/'+propertyId)
          .then( (res) =>{
              console.log("get propertydea=============== = ",res.data);
              this.setState({
                propertyProfile : res.data,
                isLoading : false,
              },()=>{
                 AsyncStorage.removeItem('propertyId');

              });

            // console.log("get property transactionType = ",res.data.transactionType);
          })
          .catch((error)=>{
              console.log("error = ",error);
              if(error.message === "Request failed with status code 401")
              {
                  Alert.alert("Your session is expired! Please login again.","", "error");
                    this.navigateScreen('MobileScreen');
              }
           });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  _renderItem = (item,index)=>{
    let data = item.item;
    return(
      <View style={{width:'100%',backgroundColor:'#f00'}}>
        <Text style={{color:colors.white}}>{data.price}</Text>
      </View>
    );
  }

    convertNumberToRupees(totalPrice){
      return Math.abs(Number(totalPrice)) >= 1.0e+7

      ? Math.abs(Number(totalPrice)) / 1.0e+7 + " Cr"

      : Math.abs(Number(totalPrice)) >= 1.0e+5

      ? Math.abs(Number(totalPrice)) / 1.0e+5 + " Lac"

      : Math.abs(Number(totalPrice)) >= 1.0e+3

      ? Math.abs(Number(totalPrice)) / 1.0e+3 + "k"

      : Math.abs(Number(totalPrice));
    }


  interestBtn(property_id,isInterested){
      
    var formValues ={
      property_id : property_id,
      buyer_id    : this.state.uid,
    }
    if(isInterested == false){
     axios
      .post('/api/interestedProperties/',formValues)
      .then(res=>{
         //After Express Interest, again get all properties
              axios
                .post('/api/properties/one/property',formValues)
                .then((propertyData) =>{
                  console.log("propertyData",propertyData);
                  this.setState({
                    propertyProfile  : propertyData.data,
                  })
                  axios
                    .get('/api/users/get/one/'+this.state.uid)
                    .then((userData) =>{
                          var sendDataToUser = {
                          "templateName"  : "User - Express Interest",
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
                      var sendDataToAdmin = {
                          "templateName"        : "Admin - User Express Interest",
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
                      axios
                      .post('/api/masternotifications/post/sendNotification',sendDataToAdmin)
                      .then((result) =>{
                        axios
                        .post('/api/masternotifications/post/sendNotification',sendDataToUser)
                        .then((res) =>{
                        })
                       .catch((error)=>{
                            console.log("error = ",error);
                        });        
                    })
                            
                })
               .catch((error)=>{
                    console.log("error = ",error);
                });
                               
              })
             .catch((error)=>{
                    console.log("error = ",error);
              });
              
            })
           .catch((error)=>{
                 console.log("error = ",error);
             });
    
      }else{
        var deleteValues = {
          uid         : this.state.uid,
          property_id : property_id
        }
        axios
          .delete('/api/interestedProperties/'+this.state.uid+"/"+property_id)
          .then(
            (res)=>{                
                axios
                  .post('/api/properties/one/property',formValues)
                  .then(propertyData =>{
                  console.log("propertyData",propertyData);
                      this.setState({
                        propertyProfile  : propertyData.data,
                      })
                  })
                .catch((error)=>{
                      console.log("error = ",error);
                });
            }
          )
         .catch((error)=>{
              console.log("error = ",error);
        });
      }
    
  }

  editProp(){
    console.log("here edit property");
    var property_id = this.state.property_id;
    AsyncStorage.setItem("propertyId",property_id);

    console.log("here property_id in edit ",property_id);
    if(property_id!=null)
    {
     this.navigateScreen('BasicInfo');          
    }
  }

  render(){
    const { navigation } = this.props;
    
    let propertyProfile = this.state.propertyProfile;
    let {activeBtn,activePropType,activeRoomIndex} = this.state;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;

    let similarProps = [
      {source:require('../../images/p6.png'),price:'45 Lacs',property:'2 BHK'},
      {source:require('../../images/p7.png'),price:'42 Lacs',property:'2 BHK'},
      {source:require('../../images/p8.png'),price:'46 Lacs',property:'2 BHK'},
      {source:require('../../images/p6.png'),price:'50 Lacs',property:'2 BHK'},
    ];
    console.log("propertyProfile.propertyDetails.Pantry",propertyProfile);

    return (
      <React.Fragment>      
        <HeaderBar showBackBtn={true}  navigation={navigation}/>
        {this.state.isLoading === false && propertyProfile?
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={{width:'100%'}}>
            <View style={{width:'100%',backgroundColor:'#fff'}}>
              
              <ScrollView
                  horizontal={true}
                  onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
                  onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
                  onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
                  style={{minWidth: '100%' }} 
                  contentContainerStyle={{ minWidth: '100%',marginBottom:0 }}
                >
                {propertyProfile.gallery && propertyProfile.gallery.Images!=null &&  propertyProfile.gallery.Images.length>0 ?
                propertyProfile.gallery.Images.map((data,index)=>(
                  <View key={index} style={{width:(window.width),height:300}} >
                    <ImageBackground 
                        source={{uri:data.imgPath}}
                        style={styles.bgImage2}
                        resizeMode="cover"
                      >
                      <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                         <Button
                          titleStyle      = {styles.buttonText}
                          title           = {propertyProfile.transactionType === "Sell" ? "For Sale"  : 'For Rent'}
                          // title           = {propertyProfile.gallery.Images.length+" Photos"}
                          buttonStyle     = {styles.button4}
                          containerStyle  = {[styles.buttonContainer4]}
                        />
                        {this.state.uid === propertyProfile.owner_id ?
                          <Button
                            titleStyle      = {styles.buttonText}
                            title           = {"Edit Property"}
                            // title           = {propertyProfile.gallery.Images.length+" Photos"}
                            buttonStyle     = {styles.button4}
                            onPress         = {this.editProp.bind(this)}
                            containerStyle  = {[styles.buttonContainer4]}
                            style           = {{marginLeft:"10%"}}
                          />
                         :
                         null 
                        }
                      </View>
                      </ImageBackground>
                  </View>
                ))
                :
                 <ImageBackground 
                    source={require('../../images/1.png') }
                    style={styles.bgImage2}
                    resizeMode="cover"
                  >
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                      <Button
                        titleStyle      = {styles.buttonText}
                        title           = {propertyProfile.transactionType === "Sell" ? "For Sale"  : 'For Rent'}
                        // title           = {propertyProfile.gallery.Images.length+" Photos"}
                        buttonStyle     = {styles.button4}
                        containerStyle  = {[styles.buttonContainer4]}
                      />
                      <Button
                        titleStyle      = {styles.buttonText}
                        title           = {"Edit Property"}
                        // title           = {propertyProfile.gallery.Images.length+" Photos"}
                        buttonStyle     = {styles.button4}
                        onPress         = {this.editProp.bind(this)}
                        containerStyle  = {[styles.buttonContainer4]}
                      />
                    </View>

                  </ImageBackground>

                }
              </ScrollView>
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View style={{flexDirection:'row'}}>
              <Icon
                  name="marker" 
                  type="foundation"
                  size={20}
                  color={colors.golden}
                  containerStyle={{marginRight:5}}
                />
              <Text style={styles.textSmallLight}>{propertyProfile.propertyLocation.society+", "+propertyProfile.propertyLocation.subArea+", "+propertyProfile.propertyLocation.area+", "+propertyProfile.propertyLocation.city}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.textSmallLight}>
                Property Type :
                <Text style={styles.textLarge}> {propertyProfile.propertyType+", "+propertyProfile.propertySubType} </Text>
              </Text>
            </View> 
            <View style={[{width:'100%'},styles.marginBottom15]}>
             {propertyProfile.transactionType === "Sell" ?
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.textSmallLight}>Total Ask : </Text>
                    {propertyProfile.financial.totalPrice ?
                        <Icon
                        name="rupee" 
                        type="font-awesome"
                        size={14}
                        color={colors.grey}
                        containerStyle={{marginRight:2}}
                      />
                      :
                      null
                    }
                    <Text style={styles.textLarge}>{propertyProfile.financial.totalPrice ? this.convertNumberToRupees(propertyProfile.financial.totalPrice) : "--"}</Text>
                  </View>
                :
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.textSmallLight}>Monthly Rent : </Text>
                    {propertyProfile.financial.monthlyRent ?
                        <Icon
                        name="rupee" 
                        type="font-awesome"
                        size={14}
                        color={colors.grey}
                        containerStyle={{marginRight:2}}
                      />
                      :
                      null
                    }
                    <Text style={styles.textLarge}>{propertyProfile.financial.monthlyRent ? this.convertNumberToRupees(propertyProfile.financial.monthlyRent) : "--"}</Text>
                  </View>
              }
             
            </View>

            <View style={[{width:'100%'},styles.marginBottom15]}>
              <Text style={styles.textSmallLight}>{propertyProfile.propertyHolder}</Text>
              <Text style={styles.textSmallLight}>Posted on {moment(propertyProfile.propertyCreatedAt).format("DD/MM/YYYY")}</Text>
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Key Features</Text>

            <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Super Area</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.superArea ? propertyProfile.propertyDetails.superArea+" "+propertyProfile.propertyDetails.superAreaUnit : "--"}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Built-up Area</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.builtupArea} {propertyProfile.propertyDetails.builtupAreaUnit}</Text>
                </View>
              </View>
            

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Floor / Total Floors</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.floor ? propertyProfile.propertyDetails.floor : "--"}/{propertyProfile.propertyDetails.totalFloor ? propertyProfile.propertyDetails.totalFloor : "--"}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Furnished Status</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.furnishedStatus ? propertyProfile.propertyDetails.furnishedStatus : "Not specified"}</Text>
                </View>
              </View>

              {propertyProfile.propertyType === "Residential" ?
                <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>Bedrooms</Text>
                    <Text style={styles.textSmall}>{propertyProfile.propertyDetails.bedrooms ? propertyProfile.propertyDetails.bedrooms : "--"}</Text>
                  </View>
                </View>
                :
                <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>Washrooms</Text>
                    <Text style={styles.textSmall}>{propertyProfile.propertyDetails.washrooms ? propertyProfile.propertyDetails.washrooms : "--"}</Text>
                  </View>
                </View>
              }

              {propertyProfile.propertyType === "Residential" ?
                <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>Balconies</Text>
                    <Text style={styles.textSmall}>{propertyProfile.propertyDetails.balconies ? propertyProfile.propertyDetails.balconies : "--"}</Text>
                  </View>
                </View>
                :
                <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>Pantry</Text>
                    <Text style={styles.textSmall}>{propertyProfile.propertyDetails.pantry ? propertyProfile.propertyDetails.pantry : "--"}</Text>
                  </View>
                </View>
              } 

              {propertyProfile.propertyType === "Residential" ?
                <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>Bathrooms</Text>
                    <Text style={styles.textSmall}>{propertyProfile.propertyDetails.bathrooms ? propertyProfile.propertyDetails.bathrooms : "--"}</Text>
                  </View>
                </View>
                :
                 <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>Personal</Text>
                    <Text style={styles.textSmall}>{propertyProfile.propertyDetails.personal ? propertyProfile.propertyDetails.personal : "--"}</Text>
                  </View>
                </View>
              }
              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Age of Property</Text>
                  <Text style={styles.textSmall}>{
                    propertyProfile.propertyDetails.ageofProperty ?
                      propertyProfile.propertyDetails.ageofProperty === "New" ?
                      "0-1" 
                      : 
                      propertyProfile.propertyDetails.ageofProperty
                      :
                      ""
                    } 
                    {propertyProfile.propertyDetails.ageofProperty ? 
                      propertyProfile.propertyDetails.ageofProperty==="Under Construction" ? 
                      ""
                      :" Years" 
                    : "--" 
                  }</Text>
                </View>
              </View>
              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Facing</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.facing ? propertyProfile.propertyDetails.facing : "--"}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Available From</Text>
                  <Text style={styles.textSmall}>{propertyProfile.financial.availableFrom ? propertyProfile.financial.availableFrom : "Not specified" }</Text>
                </View>
              </View>
            </View>
            <View style={[{width:'100%',marginTop:10}]}>
              <Text style={[styles.textHeading,styles.marginBottom5]}>Financials</Text>
              {propertyProfile.transactionType === "Sell" ?
                  <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                    <Icon
                      name="crosshairs" 
                      type="font-awesome"
                      size={20}
                      color={colors.button}
                      containerStyle={{marginRight:6}}
                    />
                    <View>
                      <Text style={styles.textSmallLight}>Total Ask</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        {propertyProfile.financial.totalPrice ?
                            <Icon
                            name="rupee" 
                            type="font-awesome"
                            size={14}
                            color={colors.grey}
                            containerStyle={{marginRight:2}}
                          />
                          :
                          null
                        }
                       <Text style={styles.textSmall}>{propertyProfile.financial.totalPrice ? this.convertNumberToRupees(propertyProfile.financial.totalPrice) : "--"}</Text>
                      </View>  
                    </View>
                  </View>
                  :

                  <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                    <Icon
                      name="crosshairs" 
                      type="font-awesome"
                      size={20}
                      color={colors.button}
                      containerStyle={{marginRight:6}}
                    />
                    <View>
                      <Text style={styles.textSmallLight}>Monthly Rent</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        {propertyProfile.financial.monthlyRent ?
                            <Icon
                            name="rupee" 
                            type="font-awesome"
                            size={14}
                            color={colors.grey}
                            containerStyle={{marginRight:2}}
                          />
                          :
                          null
                        }
                       <Text style={styles.textSmall}>{propertyProfile.financial.monthlyRent ? this.convertNumberToRupees(propertyProfile.financial.monthlyRent) : "--"}</Text>
                      </View>  
                    </View>
                  </View>
                }  
                <View  style={[{width:'100%',flexDirection:'row',paddingVertical:10}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>{propertyProfile.transactionType==="Sell" ? "Charges Included in Total Ask" : "Charges Included in Monthly Rent"}</Text>
                    <Text style={styles.textSmall}>
                     {propertyProfile.financial.includeCharges && propertyProfile.financial.includeCharges.length > 0?
                       propertyProfile.financial.includeCharges.map((includeCharges,index)=>{
                          var comma = ", ";
                          var i = index;
                          if(index >= (propertyProfile.financial.includeCharges.length-1) ){
                            comma = "";
                          }
                          return(
                              <Text key={i++}>
                                  {""+includeCharges+comma}
                              </Text>                  
                            )
                          })
                       :
                       "--"
                     }
                    </Text>
                  </View>
                </View>

                {propertyProfile.transactionType === "Sell" ?
                  <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                    <Icon
                      name="crosshairs" 
                      type="font-awesome"
                      size={20}
                      color={colors.button}
                      containerStyle={{marginRight:6}}
                    />
                    <View>
                      <Text style={styles.textSmallLight}>Expected Rate</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        {propertyProfile.financial.expectedRate ?
                            <Icon
                            name="rupee" 
                            type="font-awesome"
                            size={14}
                            color={colors.grey}
                            containerStyle={{marginRight:2}}
                          />:
                          null
                        }
                       <Text style={styles.textSmall}>{propertyProfile.financial.expectedRate}{propertyProfile.financial.measurementUnit}</Text>
                      </View>  
                    </View>
                  </View>
                  :

                  <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                    <Icon
                      name="crosshairs" 
                      type="font-awesome"
                      size={20}
                      color={colors.button}
                      containerStyle={{marginRight:6}}
                    />
                    <View>
                      <Text style={styles.textSmallLight}>Deposit</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                       {propertyProfile.financial.depositAmount ?
                            <Icon
                            name="rupee" 
                            type="font-awesome"
                            size={14}
                            color={colors.grey}
                            containerStyle={{marginRight:2}}
                          />:
                          null
                        }
                       <Text style={styles.textSmall}>{propertyProfile.financial.depositAmount?this.convertNumberToRupees(propertyProfile.financial.depositAmount):"--"}</Text>
                      </View>  
                    </View>
                  </View>
                }  

                <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <View>
                    <Text style={styles.textSmallLight}>Maintenance Charges</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      {propertyProfile.financial.maintenanceCharges ?
                        <Icon
                        name="rupee" 
                        type="font-awesome"
                        size={14}
                        color={colors.grey}
                        containerStyle={{marginRight:2}}
                      />:
                      null
                    }
                     <Text style={styles.textSmall}>{propertyProfile.financial.maintenanceCharges ? this.convertNumberToRupees(propertyProfile.financial.maintenanceCharges) : "--"}/{propertyProfile.financial.maintenancePer ? propertyProfile.financial.maintenancePer : "--"}</Text>
                    </View>  
                  </View>
                </View>
              </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Property Description</Text>
            <Text style={[styles.textSmall,styles.marginBottom5]}>
              {propertyProfile.financial.description ? propertyProfile.financial.description : "--"}
            </Text>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Amenities</Text>

            <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
              {propertyProfile.propertyDetails && propertyProfile.propertyDetails.Amenities!==null ?
                propertyProfile.propertyDetails.Amenities.map((data,index)=>(

                <View key={index} style={[{width:'50%',flexDirection:'row',paddingVertical:10},(index%2==0?{}:{paddingLeft:'10%'})]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <Text style={[styles.textSmall,{textAlign:'center'}]}>{data}</Text>
                </View>  
              ))
                :
                "--"
              }
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>
            {propertyProfile.gallery && propertyProfile.gallery.video!=null && propertyProfile.gallery.video!=="" ?
              <View>
                <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Video</Text>
                <View style={[{width:'100%'},styles.marginBottom15]}>
                  <Video 
                    source={{uri:propertyProfile.gallery.video}}   // Can be a URL or a local file.
                    repeats
                    controls={true}
                    resizeMode={"stretch"}
                    style={{height:150,width:'100%'}}
                    paused={true} 
                  />
                </View>
                <View style={[styles.divider,styles.marginBottom15]}></View>
              </View>  
              :
              null
            }

            <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Location</Text>
            <View style={[{flexDirection:'row'},styles.marginBottom5]}>
              <Icon
                  name="marker" 
                  type="foundation"
                  size={20}
                  color={colors.golden}
                  containerStyle={{marginRight:5}}
                />
              <Text style={styles.textSmallLight}>{propertyProfile.propertyLocation.society+", "+propertyProfile.propertyLocation.subArea+", "+propertyProfile.propertyLocation.area+", "+propertyProfile.propertyLocation.city}</Text>
            </View>
            
            {<MapView
              // ref={map => this.map = map}
              // provider={PROVIDER_GOOGLE}
              region={this.state.region}
              style={[{width:'100%',height:200},styles.marginBottom15]}
              customMapStyle={mapStyle}
              // customMapStyle={mapStyle}
            >
            </MapView>}

            {/*<View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Similar Properties (4)</Text>
            
            <View style={{width:'100%',backgroundColor:'#fff'}}>
              
              <ScrollView
                  horizontal={true}
                  onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
                  onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
                  onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
                  style={{minWidth: '100%' }} 
                  contentContainerStyle={{ minWidth: '100%',marginBottom:0 }}
                >
                {
                similarProps.map((data,index)=>(
                  <View key={index} style={{width:(window.width/2), borderWidth:1,borderColor:'#ddd',padding:10,height:null,borderRadius:4,marginRight:10}} >
                    <Image
                      resizeMode={"contain"}
                      // source={require('../../images/p6.png')}
                      source={data.source}
                      style={{height:100,width:'100%'}}

                    />
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Icon
                        name="rupee" 
                        type="font-awesome"
                        size={16}
                        color={colors.black}
                        containerStyle={{marginRight:2}}
                      />
                      <Text style={styles.textHeadingSmall}>{data.price+", "+data.property}</Text>
                    </View>
                    <Text style={[{textAlign:'center'},styles.textSmallLight]}>{"Hadapsar"}</Text>
                  </View>
                ))
                }
                </ScrollView>
              </View>*/}
          </View>
        </ScrollView>
        :
        <Loading /> 
      }

      
      </React.Fragment>
    );
    
  }
}

