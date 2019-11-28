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
} from 'react-native';

import { Button,Icon, SearchBar } from 'react-native-elements';
import axios                      from 'axios';
import ValidationComponent        from "react-native-form-validator";
import { TextField }              from 'react-native-material-textfield';
import CheckBox                   from 'react-native-check-box'
import AsyncStorage               from '@react-native-community/async-storage';
import { NavigationActions, StackActions }  from 'react-navigation';

import HeaderBar                  from '../../layouts/HeaderBar/HeaderBar.js';
import Loading                    from '../../layouts/Loading/Loading.js'

import styles                     from './styles.js';
import {colors,sizes}             from '../../config/styles.js';

const window = Dimensions.get('window');

export default class MyInterestedProperties extends ValidationComponent{
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
      searchText: '',
      activeBtn: 'buy',
      includeNearby: false,
      activePropType: 'flat',
      activeRoomIndex: 0,
      searchResults:[],
      uid:"",
      token:"",
      searchData:"",
      isLoading :true,
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

      ? Math.abs(Number(totalPrice)) / 1.0e+3 + "k"

      : Math.abs(Number(totalPrice));
    }

  _retrieveData = async () => {
    try {
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      // const searchData = await AsyncStorage.getItem('searchData');
      // AsyncStorage.setItem('newProp',false);
      
      if (uid !== null && token !== null) {
        // We have data!!
        this.setState({uid:uid})
        this.setState({token:token})
        // this.setState({searchData:searchData})

        axios
        .get('/api/interestedProperties/list/'+uid)
        .then(
          (res)=>{
            // console.log(res);
            const postsdata = res.data;
            console.log("postsdata",res);
            this.setState({
              searchResults : postsdata,
              isLoading     : false
              // propertyCity :city,
            });
           // console.log("PropertyDetails",postsdata); 

          }
        )
        .catch((error)=>{
            console.log("error = ",error);
            if(error.message === "Request failed with status code 401")
            {
                  AsyncStorage.setItem("originPage","interestedProp");
                 // swal("Your session is expired! Please login again.","", "error");
                  Alert.alert("Your session is expired!","Please login again.")
                  this.props.navigation.navigate("MobileScreen");
            }
        })
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
            .get('/api/interestedProperties/list/'+this.state.uid)
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
                  .get('/api/interestedProperties/list/'+this.state.uid)
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

  propertyProfile(propId){
    AsyncStorage.setItem('propertyId',propId)
    this.navigateScreen('PropertyDetailsPage')
  }


  render(){
    
    const { navigation } = this.props;
    let {activeBtn,activePropType,activeRoomIndex} = this.state;
  
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;

    // console.log("this.props.navigation = ",this.props.navigation);
     return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>
        {this.state.isLoading === false ?
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
            <View style={styles.formWrapper}>
              <Text style={styles.textCenter}>My Interested Properties</Text>
              {this.state.searchResults && this.state.searchResults.length>0 ? 
                this.state.searchResults.map((prop,i)=>(
                <TouchableOpacity key={i} onPress={()=>this.propertyProfile(prop._id)}>
                  <View style={[styles.propertyWrap,styles.marginBottom20]}>
                    {
                      prop.gallery.Images && prop.gallery.Images.length>0 ?
                        <ImageBackground 
                          source = {{uri:prop.gallery.Images[0].imgPath}}
                          style={styles.bgImage}
                          resizeMode="cover"
                          imageStyle={{borderRadius:4}}
                        >
                        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',padding:10}}>
                           <Button
                            titleStyle      = {styles.buttonText}
                            title           = {prop.transactionType === "Sell" ? "For Sale"  : 'For Rent'}
                            // title           = {propertyProfile.gallery.Images.length+" Photos"}
                            buttonStyle     = {styles.button4}
                            containerStyle  = {[styles.buttonContainer4]}
                          />
                          {this.state.token?
                            prop.isInterested ?
                            <Button
                              onPress         = {()=>this.interestBtn(prop._id,prop.isInterested)}
                              titleStyle      = {styles.buttonText2}
                              title           = "Interest Shown"
                              buttonStyle     = {styles.button3}
                              containerStyle  = {[styles.buttonContainer2,{marginRight:10}]}
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
                                  containerStyle  = {[styles.buttonContainer2,{marginRight:10}]}
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
                            containerStyle  = {[styles.buttonContainer2,{marginRight:10}]}
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
                        </View>  
                        </ImageBackground>
                        :
                        <ImageBackground 
                          source={require('../../images/1.png') }
                          style={styles.bgImage}
                          resizeMode="cover"
                          imageStyle={{borderRadius:4}}
                        >
                        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',padding:10}}>
                           <Button
                            titleStyle      = {styles.buttonText}
                            title           = {prop.transactionType === "Sell" ? "For Sale"  : 'For Rent'}
                            // title           = {propertyProfile.gallery.Images.length+" Photos"}
                            buttonStyle     = {styles.button4}
                            containerStyle  = {[styles.buttonContainer4]}
                          />
                          {this.state.token?
                            prop.isInterested ?
                            <Button
                              onPress         = {()=>this.interestBtn(prop._id,prop.isInterested)}
                              titleStyle      = {styles.buttonText2}
                              title           = "Interest Shown"
                              buttonStyle     = {styles.button3}
                              containerStyle  = {[styles.buttonContainer2,{marginRight:10}]}
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
                                  containerStyle  = {[styles.buttonContainer2,{marginRight:10}]}
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
                            containerStyle  = {[styles.buttonContainer2,{marginRight:10}]}
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
                        </View>  
                      </ImageBackground>
                     }
                    <View style={{width:'100%',padding:10,"backgroundColor":"#fff"}}>
                      <View style={{flexDirection:'row'}}>
                        <Icon
                            name="marker" 
                            type="foundation"
                            size={20}
                            color={colors.golden}
                            containerStyle={{marginRight:5}}
                          />
                        <Text style={styles.textSmallLight}>{prop.propertyLocation.society+", "+prop.propertyLocation.area+", "+prop.propertyLocation.city}</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.textSmallLight}>
                          Property Type :
                          <Text style={styles.textLarge}> {prop.propertyType+", "+prop.propertySubType} </Text>
                        </Text>
                      </View> 
                      <View style={{flexDirection:'row',marginBottom:15}}>
                        <View style={{width:'50%'}}>
                           {prop.transactionType === "Sell" ?
                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.textSmallLight}>Total Price : </Text>
                                <Icon
                                  name="rupee" 
                                  type="font-awesome"
                                  size={18}
                                  color={colors.black}
                                  containerStyle={{marginRight:5}}
                                />
                                <Text style={styles.textLarge}>{this.convertNumberToRupees(prop.financial.totalPrice)}</Text>
                              </View>
                            :
                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.textSmallLight}>Monthly Rent : </Text>
                                <Icon
                                  name="rupee" 
                                  type="font-awesome"
                                  size={18}
                                  color={colors.black}
                                  containerStyle={{marginRight:5}}
                                />
                                <Text style={styles.textLarge}>{this.convertNumberToRupees(prop.financial.monthlyRent)}</Text>
                              </View>
                          }
                          
                        </View>
                      </View>
                      <View style={styles.divider}></View>

                      <View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between'}}>
                        {prop.propertyType === "Residential" ?
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
                          <Text style={styles.textSmallLight}>Bedrooms</Text>
                        </View>
                        :
                        <View  style={{}}>
                            <View style={{flexDirection:'row'}}>
                              <Icon
                                name={"bed-empty"} 
                                type={'material-community'}
                                size={20}
                                color={colors.grey}
                              />
                              <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.washrooms}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Washrooms</Text>
                        </View>
                      }

                      {prop.propertyType === "Residential" ?
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
                        :
                        <View  style={{}}>
                          <View style={{flexDirection:'row'}}>
                            <Icon
                              name={"bath"} 
                              type={'font-awesome'}
                              size={20}
                              color={colors.grey}
                            />
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.Pantry}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Pantry</Text>
                        </View>
                      }  
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

                        <View  style={{}}>
                          <View style={{flexDirection:'row'}}>
                            <Icon
                              name={"compass"} 
                              type={'font-awesome'}
                              size={20}
                              color={colors.grey}
                            />
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.facing ? prop.propertyDetails.facing : "--"}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Facing</Text>
                        </View>
                      </View>

                      <View style={[styles.divider,{marginBottom:10}]}></View>

                       <View style={{flexDirection:'row'}}>
                        <View style={{width:'55%'}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                            <Text style={styles.textSmallLight}>
                              Super Area
                              <Text style={styles.textLarge}> {prop.propertyDetails.superArea ? prop.propertyDetails.superArea+" "+prop.propertyDetails.superAreaUnit : "-"} </Text>
                            </Text>
                          </View>

                          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                            <Text style={styles.textSmallLight}>
                              Possession by
                              <Text style={styles.textLarge}> {prop.financial.availableFrom ? prop.financial.availableFrom : "Not specified" } </Text>
                            </Text>
                          </View> 
                        </View>
                        <TouchableOpacity onPress={()=>this.propertyProfile(prop._id)} style={[styles.buttonContainer3,{marginTop:15}]} >
                              <Text style={styles.buttonText2}>Details</Text>
                              <Image
                               source={require('../../images/logo1.png')}
                               style={styles.buttonIcon}
                              />
                        </TouchableOpacity>
                      </View> 

                    </View>
                  </View>
                </TouchableOpacity>
              ))
              :
               <Text style={[styles.textLarge,{textAlign:'center'}]}> Your interested properties will be shown here. </Text>
              }
                

            </View>
          </ScrollView>
          :
         <Loading /> 
       }
      </React.Fragment>
    );
    
  }
}