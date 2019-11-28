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
  // BackAndroid
} from 'react-native';

import { Button,Icon, SearchBar } from 'react-native-elements';
import axios                      from 'axios';

import ValidationComponent        from "react-native-form-validator";
import { TextField }              from 'react-native-material-textfield';
import { NavigationActions, StackActions }  from 'react-navigation';

import HeaderBar                  from '../../layouts/HeaderBar/HeaderBar.js';
import styles                     from './styles.js';
import {colors,sizes}             from '../../config/styles.js';
import CheckBox                   from 'react-native-check-box'
import AsyncStorage               from '@react-native-community/async-storage';
import Loading                    from '../../layouts/Loading/Loading.js'
import Dialog                     from "react-native-dialog";
const window = Dimensions.get('window');

export default class MyPostedProperties extends ValidationComponent{
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
      // activePropType: 'flat',
      // activeRoomIndex: 0,
      postedProps:[],
      uid:"",
      token:"",
      // searchData:"",
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

  // setActive = (name)=>{
  //   this.setState({activePropType:name});
  // }

  // setActiveRoom = (index)=>{
  //   this.setState({activeRoomIndex:index});
  // }

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
        .get('/api/properties/mypropertylist/'+uid)
        .then(
          (postedProps)=>{
            // console.log(postedProps);
            const postsdata = postedProps.data;
            // console.log("postsdata",postsdata);
            this.setState({
              postedProps : postsdata,
              isLoading     : false
              // propertyCity :city,
            });
           // console.log("PropertyDetails",postsdata); 

          }
        )
        .catch((error)=>{
              console.log("error = ",error.message);
              if(error.message === "Request failed with status code 401")
              {
                  AsyncStorage.setItem("originPage","myPostedProp");
                  Alert.alert("Your session is expired!","Please login again.")
                  this.navigateScreen("MobileScreen");
              }
          })
      }
    } catch (error) {
      // Error retrieving data
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
              <Text style={styles.textCenter}>My Posted Properties</Text>
              {this.state.postedProps && this.state.postedProps.length>0 ? 
                this.state.postedProps.map((prop,i)=>(
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
                            title           = {prop.transactionType === "Sell" ? "For Sale"  : "For Rent"}
                            // title           = {propertyProfile.gallery.Images.length+" Photos"}
                            buttonStyle     = {styles.button4}
                            containerStyle  = {[styles.buttonContainer4]}
                          />
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
                                {prop.financial.totalPrice ?
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
                                <Text style={styles.textLarge}>{prop.financial.totalPrice ? this.convertNumberToRupees(prop.financial.totalPrice): "--"}</Text>
                              </View>
                            :
                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.textSmallLight}>Monthly Rent : </Text>
                                {prop.financial.monthlyRent ?
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
                                <Text style={styles.textLarge}>{prop.financial.monthlyRent ? this.convertNumberToRupees(prop.financial.monthlyRent): "--"}</Text>
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
                              <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.bedrooms ? prop.propertyDetails.bedrooms : "--"}</Text>
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
                              <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.washrooms ? prop.propertyDetails.washrooms : "--"}</Text>
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
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.balconies ? prop.propertyDetails.balconies : "--"}</Text>
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
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.Pantry ? prop.propertyDetails.Pantry : "--"}</Text>
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
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.floor ? prop.propertyDetails.floor : "--"}</Text>
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
                              <Text style={styles.textLarge}> {prop.propertyDetails.superArea ? prop.propertyDetails.superArea+" "+prop.propertyDetails.superAreaUnit : "--"} </Text>
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
               <Text style={[styles.textLarge,{textAlign:'center'}]}> Posted properties will be shown here. </Text>
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