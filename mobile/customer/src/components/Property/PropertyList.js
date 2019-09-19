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
  AsyncStorage,
  Alert,
} from 'react-native';

import { Button,Icon, SearchBar } from 'react-native-elements';
import axios                              from 'axios';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import CheckBox from 'react-native-check-box'

const window = Dimensions.get('window');

export default class PropertyList extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      searchText: '',
      activeBtn: 'buy',
      includeNearby: false,
      activePropType: 'flat',
      activeRoomIndex: 0,
      searchResults:[],
      uid:"",
      token:"",
      searchData:""
    };
  }

  componentDidMount(){
    var searchResults = this.props.navigation.getParam('searchResults','No Result')
    // console.log("searchResults=>",searchResults);
    this.setState({searchResults:searchResults})
    this._retrieveData();
  }

  searchUpdated=(searchText)=>{
    this.setState({searchText});
  }

  handleOption = (option)=>{
    this.setState({activeBtn:option});
  }

  handleIncludeNearby = ()=>{
    this.setState({includeNearby: !this.state.includeNearby});
  }

  setActive = (name)=>{
    this.setState({activePropType:name});
  }

  setActiveRoom = (index)=>{
    this.setState({activeRoomIndex:index});
  }

  convertNumberToRupees(totalPrice){
      return Math.abs(Number(totalPrice)) >= 1.0e+7

      ? Math.abs(Number(totalPrice)) / 1.0e+7 + " Cr"

      : Math.abs(Number(totalPrice)) >= 1.0e+5

      ? Math.abs(Number(totalPrice)) / 1.0e+5 + " Lac"

      : Math.abs(Number(totalPrice)) >= 1.0e+3

      ? Math.abs(Number(totalPrice)) / 1.0e+3 + " K"

      : Math.abs(Number(totalPrice));
    }

  _retrieveData = async () => {
    try {
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      const searchData = await AsyncStorage.getItem('searchData');
      if (uid !== null && token !== null) {
        // We have data!!
        this.setState({uid:uid})
        this.setState({token:token})
        this.setState({searchData:searchData})
      }
    } catch (error) {
      // Error retrieving data
    }
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
            .post('/api/search/properties/',this.state.searchData)
            .then(resultData =>{
              axios
                .get('/api/properties/'+property_id)
                .then((propertyData) =>{
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
              this.setState({
                searchResults  : resultData.data,
              },()=>{
              })
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
                  .post('/api/search/properties/',this.state.searchData)
                  .then(resultData =>{
                      this.setState({
                        searchResults  : resultData.data,
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


  render(){
    
    const { navigation } = this.props;
    let {activeBtn,activePropType,activeRoomIndex} = this.state;
  
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;

    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            
            <View style={[styles.btnWrapper,styles.marginBottom20]}>
              <Button
                onPress         = {()=>this.props.navigation.navigate('SearchProperty')}
                titleStyle      = {styles.buttonText}
                title           = "Sort"
                buttonStyle     = {styles.button}
                containerStyle  = {[styles.buttonContainer,styles.marginBottom15]}
                iconLeft
                icon = {<Icon
                  name="sort" 
                  type="material-community"
                  size={22}
                  color={colors.black}
                />}
              />
              <Button
                onPress         = {()=>this.props.navigation.navigate('SearchProperty')}
                titleStyle      = {styles.buttonText}
                title           = "Budget"
                buttonStyle     = {styles.button}
                containerStyle  = {[styles.buttonContainer,styles.marginBottom15]}
                iconLeft
                icon = {<Icon
                  name="flow-cascade" 
                  type="entypo"
                  size={22}
                  color={colors.bla}
                />}
              />
            </View>
            {this.state.searchResults && this.state.searchResults.length>0 ? 
              this.state.searchResults.map((prop,i)=>(
              <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('propertyDetails',{propertyDetails:prop})}>
                <View style={[styles.propertyWrap,styles.marginBottom20]}>
                  <ImageBackground 
                    // source={require('../../images/p1.png')}
                    // source={prop.gallery ? prop.gallery.Images[0].imgPath : null}
                    source = {{uri:prop.gallery.Images[0].imgPath}}
                    style={styles.bgImage}
                    resizeMode="cover"
                    imageStyle={{borderRadius:4}}
                  >
                  {this.state.token?
                    prop.isInterested ?
                      <Button
                        onPress         = {()=>this.interestBtn(prop._id,prop.isInterested)}
                        titleStyle      = {styles.buttonText2}
                        title           = "Interest Shown"
                        buttonStyle     = {styles.button3}
                        containerStyle  = {[styles.buttonContainer2,{marginTop:10,marginRight:10}]}
                        iconLeft
                        icon = {<Icon
                          name="thumbs-up" 
                          type="font-awesome"
                          size={20}
                          color={colors.white}
                          containerStyle={{marginRight:5}}
                        />}
                        />
                        :
                        <Button
                            onPress         = {()=>this.interestBtn(prop._id,prop.isInterested)}
                            titleStyle      = {styles.buttonText2}
                            title           = "Express Interest"
                            buttonStyle     = {styles.button2}
                            containerStyle  = {[styles.buttonContainer2,{marginTop:10,marginRight:10}]}
                            iconLeft
                            icon = {<Icon
                              name="thumbs-o-up" 
                              type="font-awesome"
                              size={20}
                              color={colors.white}
                              containerStyle={{marginRight:5}}
                        />}
                        />
                        :
                      <Button
                          onPress         = {()=>this.interestBtn(prop._id,prop.isInterested)}
                          titleStyle      = {styles.buttonText2}
                          title           = "Express Interest"
                          buttonStyle     = {styles.button2}
                          containerStyle  = {[styles.buttonContainer2,{marginTop:10,marginRight:10}]}
                          iconLeft
                          icon = {<Icon
                            name="thumbs-o-up" 
                            type="font-awesome"
                            size={20}
                            color={colors.white}
                            containerStyle={{marginRight:5}}
                          />}
                        />
                      }
                  </ImageBackground>
                  <View style={{width:'100%',padding:10}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.textSmallLight}>{prop.propertyLocation.society}</Text>
                      <Text style={{marginLeft:15}}>{'\u2022' + " "}</Text>
                      <Text style={styles.textSmallLight}>New Proerty</Text>
                    </View>

                    <View style={{flexDirection:'row',marginBottom:15}}>
                      <View style={{width:'50%'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Icon
                            name="rupee" 
                            type="font-awesome"
                            size={18}
                            color={colors.black}
                            containerStyle={{marginRight:5}}
                          />
                          <Text style={styles.textLarge}>{this.convertNumberToRupees(prop.financial.totalPrice)}</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                          <Icon
                            name="marker" 
                            type="foundation"
                            size={20}
                            color={colors.golden}
                            containerStyle={{marginRight:5}}
                          />
                          <Text style={styles.textSmall}>{prop.propertyLocation.area+", "+prop.propertyLocation.city}</Text>
                        </View>
                        
                      </View>

                      <View style={{width:'50%',alignItems:'flex-end',justifyContent:'center'}}>
                        <Button
                          onPress={()=>this.props.navigation.navigate('PropertyDetails',{propertyDetails:prop})}
                          titleStyle      = {styles.buttonText2}
                          title           = "Details"
                          buttonStyle     = {styles.button3}
                          containerStyle  = {[styles.buttonContainer3,{marginTop:10,marginRight:10}]}
                          iconRight
                          icon = {
                            <Image 
                              source={require('../../images/key.png') }
                            />
                          }
                        />
                      </View>
                    </View>
                    <View style={styles.divider}></View>

                    <View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between'}}>
                      <View  style={{}}>
                        <View style={{flexDirection:'row'}}>
                          <Icon
                            name={"bed-empty"} 
                            type={'material-community'}
                            size={20}
                            color={colors.grey}
                          />
                          <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.bedrooms}</Text>
                        </View>
                        <Text style={styles.textSmallLight}>Beds</Text>
                      </View>
                      <View  style={{}}>
                        <View style={{flexDirection:'row'}}>
                          <Icon
                            name={"bath"} 
                            type={'font-awesome'}
                            size={20}
                            color={colors.grey}
                          />
                          <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.balconies}</Text>
                        </View>
                        <Text style={styles.textSmallLight}>Baths</Text>
                      </View>
                      <View  style={{}}>
                        <View style={{flexDirection:'row'}}>
                          <Icon
                            name={"stairs"} 
                            type={'material-community'}
                            size={20}
                            color={colors.grey}
                          />
                          <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.floor}</Text>
                        </View>
                        <Text style={styles.textSmallLight}>Floor</Text>
                      </View>
                    </View>

                    <View style={[styles.divider,{marginBottom:10}]}></View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                      <Text style={styles.textSmallLight}>
                        Super Area
                        <Text style={styles.textLarge}> {prop.propertyDetails.superArea} </Text>
                        Sqft
                      </Text>

                      <Text style={styles.textSmallLight}>
                        Possession by
                        <Text style={styles.textLarge}> {prop.financial.availableFrom} </Text>
                      </Text>
                    </View>

                  </View>
                </View>
              </TouchableOpacity>
            ))
            :
             <Text style={styles.textLarge}> No Data Found </Text>
            }
              

          </View>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

