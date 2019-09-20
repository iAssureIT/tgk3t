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
  Picker
} from 'react-native';
import Hr from "react-native-hr-component";
import { Dropdown }   from 'react-native-material-dropdown';
import axios          from 'axios';
import {AsyncStorage} from 'react-native';
import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
// import { Dropdown } from 'react-native-material-dropdown';
import SwitchToggle from 'react-native-switch-toggle';

const window = Dimensions.get('window');

export default class PropertyDetails1 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      // activeTab        : 'owner',
      propertyHolder   : "owner",
      fullPropertyType : 'Select Property Type',
      propertyLocation : '',
      toggle           : false,
      transactionType  :'Sell',
      property_id      : "",
      updateOperation  : false,
      propertyCode     : "",
      propertyTypeList : [{label: 'ALL RESIDENTIAL',       value: '',                                   disabled : true}, 
                         {label: 'Studio Apartment',       value: 'Residential-Studio Apartment',       disabled : false},
                         {label: 'Residential House',      value: 'Residential-Residential House',      disabled : false},
                         {label: 'MultiStorey Apartment',  value: 'Residential-MultiStorey Apartment',  disabled : false},
                         {label: 'Villa',                  value: 'Residential-Villa',                  disabled : false},
                         {label: 'Penthouse',              value: 'Residential-Penthouse',              disabled : false},
                         {label: 'ALL COMMERCIAL ',        value: '',                                   disabled : true},
                         {label: 'Commercial Office Space',value: 'Commercial-Commercial Office Space', disabled : false},
                         {label: 'Office in IT Park/SEZ',  value: 'Commercial-Office in IT Park/SEZ',   disabled : false},
                         {label: 'Commercial Shop',        value: 'Commercial-Commercial Shop',         disabled : false},
                         {label: 'Commercial Showroom',    value: 'Commercial-Commercial Showroom',     disabled : false},
                         {label: 'Warehouse/Godown',       value: 'Commercial-Warehouse/Godown',        disabled : false},
                         {label: 'Industrial Building',    value: 'Commercial-Industrial Building',     disabled : false}],
      // floorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      // totalFloorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      // floor: 'Basement',
      // totalFloor:'Total Floors',
      propertyType    : '',
      propertySubType : '',
      pincode        : '',
      stateData       : [
                    {
                      value: 'Maharashtra',
                    },
                    {
                      value: 'Punjab',
                    },
                    {
                      value: 'Delhi',
                    },
                    {
                      value: 'Kerala',
                    }],
      cityData        : [
                    {
                      value: 'Pune City',
                    },
                    {
                      value: 'Pashan',
                    },
                    {
                      value: 'Khanapur',
                    }],
      areaData        : [
                    {
                      value: 'Hadapsar',
                    },
                    {
                      value: 'Kharadi',
                    }],
      subAreaData     : [
                    {
                      value: 'Amanora Township',
                    },
                    {
                      value: 'Bhosale Nagar',
                    },
                    {
                      value: 'Gadital'
                    }],
      societyName         : '',
      house           : '',
      landmark        : '',
      listofStates    : '',
      listofStates    : "",
      listofBlocks    : "",
      listofCities    : "",
      onlyState       : "",
      onlyCity        : "",
      onlyArea        : "",
      onlySubArea     : "",
      districtName    : "",
      listofAreas     : "",
      village         : "",
      index           : "",
      subAreaList     : "",
      societyList     : "",
      blockName       : "",
      cityName        : "",
      stateCode       : "State",
      token           : "",
      uid             : "",
    };

  }

    componentDidMount(){
      // console.log("here token in form 1", AsyncStorage.getItem("token"));
      var token = this.props.navigation.getParam('token','No token');
      // console.log("token",token);
      var uid = this.props.navigation.getParam('uid','No uid');
      // console.log("uid",uid);

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

      this.setState({
        token : token,
        uid   : uid,
      });

       axios({
        method: 'get',
        url: 'http://locationapi.iassureit.com/api/states/get/list/IN',
        }).then((response)=> {
         this.setState({
              listofStates : response.data
            },()=>{


                   var allStateData = this.state.listofStates;
                    // cityname = allCityData.map(a=>a.cityName);
                    var stateList=[];
                    for (var i = 0; i < allStateData.length; i++) {
                        var state = {
                          value:allStateData[i].stateCode,
                          name :allStateData[i].stateName,
                        }
                       stateList.push(state);
                    }
                    this.setState({
                      onlyState : stateList,
                    },()=>{
                    })


            })
        }).catch((error)=>{
                          console.log("error = ",error);
                          if(error.message === "Request failed with status code 401")
                          {
                               swal("Your session is expired! Please login again.","", "error");
                               this.props.history.push("/");
                               
                          }
          });
    }

  setActive = (name)=>{
    // console.log("console name propertyHolder",name);
    this.setState({propertyHolder: name });
  }

  onToggle=()=>{
    let {toggle} = this.state;
    if(toggle){
      this.setState({transactionType:'Sell'})
    }else{
      this.setState({transactionType:'Rent'})
    }
    this.setState({toggle:!this.state.toggle});
  }

  submitFun(){
   var uid = this.state.uid;
    const formValues = {
        // "activeTab"       : this.state.activeTab,
        "propertyHolder"  : this.state.propertyHolder,
        "transactionType" : this.state.transactionType,
        "propertyType"    : this.state.propertyType,
        "propertySubType" : this.state.propertySubType,
        "listing"         : false,
        "status"          : "WIP",

        "countryCode"     : "IN",
        "pincode"         : this.state.pincode,
        "stateCode"       : this.state.stateCode,
        "cityName"        : this.state.cityName,
        "areaName"        : this.state.areaName,
        "subAreaName"     : this.state.subAreaName,
        "societyName"     : this.state.societyName,
        "address"         : this.state.house,
        "landmark"        : this.state.landmark,
        "index"           : this.state.index,
        "uid"             : uid,
      };
      console.log("formValues",formValues);
      // console.log("submit data");
      
              // this.props.navigation.navigate('PropertyDetails3',{transactionType:this.state.transactionType,propertyType: this.state.propertyType,token:this.state.token,uid:this.state.uid});          

          axios
          .post('http://qatgk3tapi.iassureit.com/api/properties',formValues)
          .then( (res) =>{
            console.log("here 1st form result",res.data);
            if(res.status === 200){
              // console.log("here prop id",res.data.property_id);
              // localStorage.setItem('propertyId',res.data.property_id)
              // console.log("BasicInfo res = ",res);
              // console.log("propertyCode",res.data.propertyCode);
              // this.props.prop_id = res.data.property_id;
              // this.props.navigation.navigate('PropertyDetails3',{transactionType:this.state.transactionType,propertyType: this.state.propertyType,token:this.state.token,uid:this.state.uid,propertyId:res.data.property_id});          
              this.props.navigation.navigate('PropertyDetails5',{transactionType:this.state.transactionType,propertyType: this.state.propertyType,token:this.state.token,uid:this.state.uid,propertyId:res.data.property_id});          
              
            }else{
              // alert(" Please Fill all fields")
            }
          })
          .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                    });


  }

  handlePincode(pincode){
    
    var pincode = this.state.pincode;
     this.setState({
      pincode : pincode,
    });

   var url = 'http://locationapi.iassureit.com/api/areas/get/list/'+pincode;

    axios({
      method: 'get',
      url: url,
    }).then((response)=> {
      if(response.data){
          this.setState({
            stateCode     : response.data[0].stateCode,
            districtName  : response.data[0].districtName,
            blockName     : response.data[0].blockName,
            cityName      : response.data[0].cityName,
            areaName      : response.data[0].areaName,
          },()=>{
            //========== Get City List  =====================
            url = 'http://locationapi.iassureit.com/api/cities/get/citiesByState/IN/'+this.state.stateCode;
            axios({
                method: 'get',
                url: url,
            }).then((response)=> {
                // console.log("list of city",response.data);
                this.setState({
                  listofCities : response.data,
                },()=>{
                   // var allCityData = this.state.listofCities;
                   //  // cityname = allCityData.map(a=>a.cityName);
                   //  var cityList=[];
                   //  for (var i = 0; i < allCityData.length; i++) {
                   //      var city = {
                   //        value:allCityData[i].cityName,
                   //      }
                   //     cityList.push(city);
                   //  }
                   //  this.setState({
                   //    onlyCity : cityList,
                   //  },()=>{
                   //  // console.log("only city name",this.state.onlyCity);

                   //  })
                })

               
            }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                    });


            //========== Get Area List  =====================
          url = 'http://locationapi.iassureit.com/api/areas/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/' ;
            axios({
              method: 'get',
              url: url,
            }).then((response)=> {
                // console.log("here area data",response.data);
                this.setState({
                  listofAreas : response.data
                },()=>{
                   // var allAreaData = this.state.listofAreas;
                   //  // cityname = allCityData.map(a=>a.cityName);
                   //  var areaList=[];
                   //  for (var i = 0; i < allAreaData.length; i++) {
                   //      var area = {
                   //        value:allAreaData[i].areaName,
                   //      }
                   //     areaList.push(area);
                   //  }
                   //  this.setState({
                   //    onlyArea : areaList,
                   //  },()=>{
                   //  // console.log("onlyArea name",this.state.onlyArea);

                   //  })
                })
            }).catch((error)=>{
                                console.log("error = ",error);
                                if(error.message === "Request failed with status code 401")
                                {
                                     swal("Your session is expired! Please login again.","", "error");
                                     this.props.history.push("/");
                                }
                 });

            //========== Get SubArea List  =====================
          url = 'http://locationapi.iassureit.com/api/subareas/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/'+this.state.areaName+'/' ;
          axios({
            method: 'get',
            url: url,
          }).then((response)=> {
              // console.log("here sub area data",response.data)
              this.setState({
                subAreaList : response.data
              },()=>{
                   // var allSubAreaData= this.state.subAreaList;

                   //  // cityname = allCityData.map(a=>a.cityName);
                   //  var subareaList=[];
                   //  for (var i = 0; i < allSubAreaData.length; i++) {
                   //      var subarea = {
                   //        value:allSubAreaData[i].subareaName,
                   //      }
                   //     subareaList.push(subarea);
                   //  }
                   //  this.setState({
                   //    onlySubArea : subareaList,
                   //  },()=>{
                   //  // console.log("onlySubArea name",this.state.onlySubArea);

                   //  })
                })
          }).catch((error)=>{
                                console.log("error = ",error);
                                if(error.message === "Request failed with status code 401")
                                {
                                     swal("Your session is expired! Please login again.","", "error");
                                     this.props.history.push("/");
                                }
                });

          });
      }
    }).catch((error)=>{
                                console.log("error = ",error);
                                if(error.message === "Request failed with status code 401")
                                {
                                     swal("Your session is expired! Please login again.","", "error");
                                     this.props.history.push("/");
                                }
      });
  }

  selectProp(value){
    // console.log("here selected value",value);

    var propertyTypeVal = value.split("-");
    var propertyType = propertyTypeVal[0];
    var propertySubType = propertyTypeVal[1];

    this.setState({
      fullPropertyType: value,
      propertyType : propertyType,
      propertySubType : propertySubType,
    },()=>{
      // console.log("propertyType",this.state.propertyType);
      // console.log("propertySubType",this.state.propertySubType);
    });
  }

  selectState(stateCode){
    var selectedState = stateCode;
    this.setState({
        stateCode : selectedState,
      });

      axios({
          method: 'get',
          url: 'http://locationapi.iassureit.com/api/cities/get/citiesByState/IN/'+selectedState,
      }).then((response)=> {
          // console.log("response of state",response);
          this.setState({
            listofCities : response.data,
          },()=>{
                   // var allCityData = this.state.listofCities;
                   //  // cityname = allCityData.map(a=>a.cityName);
                   //  var cityList=[];
                   //  for (var i = 0; i < allCityData.length; i++) {
                   //      var city = {
                   //        value:allCityData[i].cityName,
                   //      }
                   //     cityList.push(city);
                   //  }
                   //  this.setState({
                   //    onlyCity : cityList,
                   //  },()=>{
                   //  // console.log("only city name",this.state.onlyCity);

                   //  })
                })
      }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
            });

  }

  selectCity(cityName){
     
      var dist_block_city = cityName;
      // console.log("here dist_block_city ",dist_block_city );
      var districtName = dist_block_city.split('-')[0];
      var blockName    = dist_block_city.split('-')[1];
      var cityName   = dist_block_city.split('-')[2];

    var url = 'http://locationapi.iassureit.com/api/areas/get/list/IN/'+this.state.stateCode+'/'+districtName+'/'+blockName+'/'+cityName+'/' ;

      this.setState({
        districtName  : districtName,
        blockName   : blockName,
        cityName    : cityName,
      });

      axios({
        method: 'get',
        url: url,
      }).then((response)=> {
          // console.log("here area",response.data);
          this.setState({
            listofAreas : response.data
          },()=>{
                   // var allAreaData = this.state.listofAreas;
                   //  // cityname = allCityData.map(a=>a.cityName);
                   //  var areaList=[];
                   //  for (var i = 0; i < allAreaData.length; i++) {
                   //      var area = {
                   //        value:allAreaData[i].areaName,
                   //      }
                   //     areaList.push(area);
                   //  }
                   //  this.setState({
                   //    onlyArea : areaList,
                   //  },()=>{
                   //  // console.log("onlyArea name",this.state.onlyArea);

                   //  })
                })
      }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
             });

  }

  selectArea(areaName){
    // event.preventDefault();
    var areaName = areaName;


    if(this.state.listofAreas.length > 0){
      var index = this.state.listofAreas.findIndex( x => x.areaName === areaName);
    }
    this.setState({
      areaName : areaName,
      pincode : this.state.listofAreas[index].pincode,
    });

  var url = 'http://locationapi.iassureit.com/api/subareas/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/'+areaName+'/' ;

    axios({
      method: 'get',
      url: url,
    }).then((response)=> {
        this.setState({
          subAreaList : response.data
        },()=>{
                   // var allSubAreaData= this.state.subAreaList;

                   //  // cityname = allCityData.map(a=>a.cityName);
                   //  var subareaList=[];
                   //  for (var i = 0; i < allSubAreaData.length; i++) {
                   //      var subarea = {
                   //        value:allSubAreaData[i].subareaName,
                   //      }
                   //     subareaList.push(subarea);
                   //  }
                   //  this.setState({
                   //    onlySubArea : subareaList,
                   //  },()=>{
                   //  // console.log("onlySubArea name",this.state.onlySubArea);

                   //  })
                })
    }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
            });

  }


  handleSubarea(subAreaName){
    var valSubAreaName = this.state.subAreaName;
    if(valSubAreaName == ""){
      return;
    }
    
    this.setState({subareaName : valSubAreaName});
    var index = -1;

    if(this.state.subAreaList.length > 0){
      index = this.state.subAreaList.findIndex( x => x.subareaName === valSubAreaName);
    }
    var url = "";
    // console.log("index = ",index);

    if(index < 0){
      const formValues ={
          countryCode   : "IN",
          stateCode     : this.state.stateCode,
          districtName  : this.state.districtName,
          blockName     : this.state.blockName,
          cityName      : this.state.cityName,
          areaName      : this.state.areaName,
          subareaName   : valSubAreaName,
      };

      url = 'http://locationapi.iassureit.com/api/subareas/post';

        axios
          .post(url, formValues)
          .then((response)=> {
            // console.log("subareas submitted = ",response);
          }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                    });

    }else{
      url = 'http://locationapi.iassureit.com/api/societies/get/list/IN/'+this.state.stateCode+'/'+this.state.districtName+'/'+this.state.blockName+'/'+this.state.cityName+'/'+this.state.areaName+'/'+valSubAreaName+'/' ;
        // console.log("societies URL = ", url);
        axios({
          method: 'get',
          url: url,
        }).then((response)=> {
          // console.log("societies = ", response.data);
            this.setState({
              societyList : response.data,
            })
        }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                });   
    }


  }

  handleSociety(){
    var valSocietyName = this.state.societyName;
    if(valSocietyName == ""){
      return;
    }

    this.setState({societyName : valSocietyName});
    var index = -1;   

    if(this.state.societyList.length > 0){
      index = this.state.societyList.findIndex( x => x.societyName === valSocietyName);
    }

    var url = "";

    // console.log("index = ",index);
    if(index < 0){
      const formValues ={
        countryCode   : "IN",
        stateCode     : this.state.stateCode,
          districtName  : this.state.districtName,
          blockName     : this.state.blockName,
          cityName    : this.state.cityName,
          areaName    : this.state.areaName,
          subareaName   : this.state.subareaName,
          societyName   : this.state.societyName,
      };

      url = 'http://locationapi.iassureit.com/api/societies/post';

        axios
          .post(url, formValues)
          .then((response)=> {
            // console.log("societies submitted = ",response);
          }).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/");
                        }
                    });
    }
  }

  render(){
   
    const { navigation } = this.props;
    let {propertyHolder} = this.state;
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
                Let’s provide details of your property for sell
              </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={[styles.alignCenter,styles.marginBottom15]}>
              <Image
                source={require('../../images/property.png') }
              />
            </View>

            <Text style={styles.heading2}>I am</Text>
            <View style={[styles.tabWrap,styles.marginBottom15]}>
              <TouchableOpacity
                onPress = {()=>this.setActive('owner')}
                style={[(propertyHolder=="owner"?styles.activeTabView:styles.tabView),styles.tabBorder,styles.borderRadiusLeft]}
              >
                  <Icon
                    name="man"
                    type="entypo"
                    size={16}
                    color="white"
                  />
                  <Text style={styles.tabText}>Owner</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress = {()=>this.setActive('careTaker')}
                style={[(propertyHolder=="careTaker"?styles.activeTabView:styles.tabView),styles.tabBorder]}
              >
                <Icon
                  name="home-account"
                  type="material-community"
                  size={18}
                  color="white"
                />
                <Text style={styles.tabText}>Care Taker</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress = {()=>this.setActive('builder')}
                style={[(propertyHolder=="builder"?styles.activeTabView:styles.tabView),styles.borderRadiusRight]}
              >
                <Icon
                  name="home-city"
                  type="material-community"
                  size={16}
                  color="white"
                />
                <Text style={styles.tabText}>Builder</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heading2}>I would like to</Text>
            <View style={[styles.marginBottom15,{width:'100%'}]}>
              <SwitchToggle
                switchOn={this.state.toggle}
                onPress={()=>this.onToggle()}
                circleColorOn={colors.button}
                circleColorOff={colors.primary}
                buttonText={this.state.transactionType}
                containerStyle={{
                  width: 130,
                  height: 38,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  padding: 0,
                  borderWidth:1,
                  borderColor:'#ccc',
                  padding:2,
                }}
                circleStyle={{
                  width: 80,
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

            
            <Text style={[styles.heading2,styles.marginBottom5]}>Property Type</Text>

                 <View style={[styles.inputWrapper,styles.marginBottom15]}>
                    <View style={styles.inputTextWrapperFull}>
                      <Dropdown
                        // label               = 'Property Type'
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
                        labelTextStyle      = {styles.ddLabelTextFull}
                        style               = {styles.ddStyle}
                        data                = {this.state.propertyTypeList}
                        value               = {this.state.fullPropertyType}
                        onChangeText={ (fullPropertyType) => this.selectProp(fullPropertyType) } 
                       />

                      
                    </View>
                </View>
            
       
            <Text style={[styles.heading2,styles.marginBottom5]}>Pincode</Text>
            <View style={[styles.inputWrapper]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>

               <TextInput
                  placeholder           = "Enter Pincode"
                  // onBlur={() => console.log("here on blur pincode")}
                  onChangeText          = {pincode => {this.setState({pincode})}}
                  onBlur                = {()=> this.handlePincode()}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.pincode}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular"}]}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
              />
                
              </View>
            </View>

             <Hr lineColor="#666" width={1} text="OR" textStyles={styles.customStylesHere} />

          {/*horizontal line*/}


              <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                <View style={[{width:'46%'}]}>
                  <Text style={[styles.heading2,styles.marginBottom5]}>State</Text>
                  <View style={[{borderColor: colors.black,
                                 borderWidth:1,flexDirection:'row',borderRadius: 3,width:'100%'}]}>
                    <View style={styles.inputTextWrapperFull}>
                        <Picker
                          selectedValue       ={this.state.stateCode}
                          style               ={[styles.ddStyle,{height:40}]}
                          placeholder         = "State"
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
                          onValueChange={(stateCode) =>
                            this.selectState(stateCode)
                          }
                          >

                          {this.state.listofStates ?
                            this.state.listofStates.map((data, index)=>{
                              return(
                                       <Picker.Item key={index} value={data.stateCode} label={data.stateName} />
                                     );
                                   })
                            :
                            null
                          }
                          
                        </Picker>

                      
                    </View>
                  </View>
                </View>

                  <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                   {/* <Text style={styles.heading3}>of</Text>*/}
                  </View>

                  <View style={[{width:'46%'}]}>
                  <Text style={[styles.heading2,styles.marginBottom5]}>City</Text>
                  <View style={[{borderColor: colors.black,
                                 borderWidth:1,flexDirection:'row',borderRadius: 3,width:'100%'}]}>
                    <View style={styles.inputTextWrapperFull}>
               
                       <Picker
                          selectedValue       ={this.state.cityName}
                          style               ={[styles.ddStyle,{height:40}]}
                          placeholder         = "City"
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
                          onValueChange={(cityName) =>
                            this.selectCity(cityName)
                          }
                          >

                          {this.state.listofCities.length > 0  ?
                            this.state.listofCities.map((data, index)=>{
                              return(
                                       <Picker.Item key={index} value={data.districtName+'-'+data.blockName+'-'+data.cityName} label={data.cityName} />
                                     );
                                   })

                            :
                            <Picker.Item label="Select State first" />
                          }
                          
                        </Picker>

                    </View>
                  </View>
                </View>
            </View>

             <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom20]}>

             <View style={[{width:'46%'}]}>
                  <Text style={[styles.heading2,styles.marginBottom5]}>Area/Suburb</Text>

                  <View style={[{borderColor: colors.black,
                                 borderWidth:1,flexDirection:'row',borderRadius: 3,width:'100%'}]}>
                    <View style={styles.inputTextWrapperFull}>
                       

                      <Picker
                          selectedValue       ={this.state.areaName}
                          style               ={[styles.ddStyle,{height:40}]}
                          placeholder         = "Area/Suburb"
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
                          onValueChange={(areaName) =>
                            this.selectArea(areaName)
                          }
                          >

                          {this.state.listofAreas  && this.state.listofAreas.length > 0  ?
                            this.state.listofAreas.map((data, index)=>{
                              return(
                                       <Picker.Item key={index} value={data.areaName} label={data.areaName} />
                                     );
                                   })
                            :
                            <Picker.Item label="Select State first" />
                            
                          }
                          
                        </Picker>

                    </View>
                  </View>
                </View>

                  <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                   {/* <Text style={styles.heading3}>of</Text>*/}
                  </View>

                <View style={[{width:'46%'}]}>
                  <Text style={[styles.heading2,styles.marginBottom5]}>Sub-Area</Text>
                  <View style={[{borderColor: colors.black,
                                 borderWidth:1,flexDirection:'row',borderRadius: 3,width:'100%'}]}>
                    <View style={styles.inputTextWrapperFull}>
                    {/*console.log("onlySubArea in render",this.state.onlySubArea)*/}
                      
                       <Picker
                          selectedValue       ={this.state.subAreaName}
                          style               ={[styles.ddStyle,{height:40}]}
                          placeholder         = "Sub-Area"
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
                          onBlur              = {()=>this.handleSubarea()}
                          onValueChange={(subAreaName) =>
                            this.setState({subAreaName})
                          }
                          >

                          {this.state.subAreaList.length>0 ?
                            this.state.subAreaList.map((data, index)=>{
                              return(
                                       <Picker.Item key={index} value={data.subareaName} label={data.subareaName} />
                                     );
                                   })
                            :
                            <Picker.Item label="Select State first" />
                            
                          }
                          
                        </Picker>
                    </View>
                  </View>
                </View>
            </View>

             {/*remaining items*/}

            <Text style={[styles.heading2,styles.marginBottom5]}>Society</Text>
            <View style={[styles.inputWrapper,styles.marginBottom15]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  placeholder           = "Enter Society"
                  onBlur                = {()=>this.handleSociety()}
                  onChangeText          = {societyName => {this.setState({societyName})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.societyName}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular"}]}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

             <Text style={[styles.heading2,styles.marginBottom5]}>House/Building Number</Text>
            <View style={[styles.inputWrapper,styles.marginBottom15]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  placeholder           = "Enter House Address"
                  onChangeText          = {house => {this.setState({house})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.house}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular"}]}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>


             <Text style={[styles.heading2,styles.marginBottom5]}>Landmark</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  placeholder           = "Enter landmark"
                  onChangeText          = {landmark => {this.setState({landmark})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {10}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.landmark}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular"}]}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                />
              </View>
            </View>

          {/*here end*/}

                      {/*  {this.state.btnLoading
                ?
                  <Button
                    titleStyle      = {styles.buttonText}
                    title           = "Processing"
                    loading
                    buttonStyle     = {styles.button}
                    containerStyle  = {styles.buttonContainer}
                  />
                :
                  <Button
                    onPress         ={this.login.bind(this)}
                    titleStyle      = {styles.buttonText}
                    title           = "Sign In"
                    buttonStyle     = {styles.button}
                    containerStyle  = {styles.buttonContainer}
                  />
                }*/}



          {/* <TouchableOpacity >*/}
                
            <Button
            
              onPress         = {this.submitFun.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('PropertyDetails2')}
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
            {/* </TouchableOpacity>*/}

          </View>
        </ScrollView>
     
      </React.Fragment>
    );
   
  }
}