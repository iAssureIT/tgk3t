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
import axios                                from 'axios';
import { Button,Icon, SearchBar }           from 'react-native-elements';
import CheckBox                             from 'react-native-check-box'
import { NavigationActions, StackActions }  from 'react-navigation';
import ValidationComponent                  from "react-native-form-validator";
import { TextField }                        from 'react-native-material-textfield';
import {RadioGroup, RadioButton}            from 'react-native-flexi-radio-button';
import AsyncStorage                         from '@react-native-community/async-storage';
import HeaderBar                            from '../../layouts/HeaderBar/HeaderBar.js';
import styles                               from './styles.js';
import {colors,sizes}                       from '../../config/styles.js';
import { Dropdown }                         from 'react-native-material-dropdown';
import DatePicker                           from "react-native-datepicker";
import { KeyboardAwareScrollView }          from 'react-native-keyboard-aware-scroll-view';

const window = Dimensions.get('window');
  
export default class PropertyDetails extends ValidationComponent{
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
     bedroomData : [{ value: 1},
                     { value: 2},
                     { value: 3},
                     { value: 4},
                     { value: 5},
                     ],

       balconieData : [{ value: 1},
                       { value: 2},
                       { value: 3},
                       { value: 4},
                      ],

       bathroomData : [{ value: 1},
                       { value: 2},
                       { value: 3},
                       { value: 4},
                      ],

        washroomData : [{ value: 1},
                        { value: 2},
                        { value: 3},
                        { value: 4}],
      
      furnishedIndex      : 0,
      workStationIndex    : 0,
      personalIndex       : 0,
      pantryIndex         : 0,
      furnishpantryIndex  : 0,
      yearsData : [ {label:"Under Construction", value: 'Under Construction',},
                    {label:"new", value: 'New(Less than a year)',},
                    {label:"1-2 Years", value: '1-2',},
                    {label:"2-5 Years", value: '2-5',},
                    {label:"5-8 Years", value: '5-8',},
                    {label:">8 Years", value: '>8',}],

      propertyFacingData : [{label:"East", value: 'East',},
                            {label:"West", value: 'West',},
                            {label:"North", value: 'North',},
                            {label:"South", value: 'South',},
                            {label:"Northeast", value: 'Northeast',},
                            {label:"Northwest", value: 'Northwest',},
                            {label:"Southeast", value: 'Southeast',}, 
                            {label:"Southwest", value: 'Southwest',}],
      furnishedStatus : "fullFurnished",
      superArea       : '',
      builtupArea     : '',
      UnitData  : [{label:"Sq ft", value:"Sq ft"},
                  {label:"Sq Meter", value:"Sq Meter"},
                  {label:"Guntha", value:"Guntha"},
                  {label:"Acre", value:"Acre"},
                  {label:"Sq-Yrd", value:"Sq-Yrd"},
                  {label:"Bigha", value:"Bigha"},
                  {label:"Hectare", value:"Hectare"},
                  {label:"Marla", value:"Marla"},
                  {label:"Kanal", value:"Kanal"}],
      superAreaUnit     : 'Sq ft',
      builtupAreaUnit   : 'Sq ft',
      floorData         :[{label:'1', value : '1'},{label:'2', value:'2'}],
      totalFloorData    :[{label:'1', value : '1'},{label:'2', value:'2'}],
      floor             : 'Basement',
      totalFloor        :'Total Floors',


      defaultIcon       :'flag',
      iconType          : 'material-community',
      allAmenities      :[],
      isChecked         : true,
      btnLoading        : false,

      furnishItem       : [ {label: 'Directors Cabin',checked: false},
                            {label: 'Meeting Room',checked: false},
                            {label: 'Reception',checked: false}],
      propertyType      : "",
      transactionType   : "",
      mobile            : '',
      propertyId        : "",
      uid               : "",
      token             : "",
      originalValues    : "",
      personal          : "",
      washrooms         : "",
      pantry            : "",
      workStation       : "",
      builtupAreaError  : "",
      superAreaError    : "",
    };

  }

   componentDidMount(){
    this._retrieveData();
  }

    validInput = () => {
    const {
      builtupArea,
    } = this.state;
    let valid = true;

    this.validate({
      builtupArea: {
        required: true,
        numbers: true,
      },
       superArea: {
        numbers: true,
      },
    });

    if (this.isFieldInError("builtupArea")) {
      this.setState({ builtupAreaError: this.getErrorsInField("builtupArea") });
      valid = false;
    } else {
      this.setState({ builtupAreaError: "" });
    }
    if (this.isFieldInError("superArea")) {
      this.setState({ superAreaError: this.getErrorsInField("superArea") });
      valid = false;
    } else {
      this.setState({ superAreaError: "" });
    }
    return valid;
  };
  
  validInputField = (stateName, stateErr) => {
    const {
      pincode
    } = this.state;
    let valid = true;

    this.validate({
      [stateName]: {
        required: true,
      }
    });

    if (this.isFieldInError(stateName)) {
      let validinptError = this.getErrorsInField(stateName);
      this.setState({ validinptError });
      valid = false;
    } else {
      this.setState({ [stateErr]: "" });
    }

    return valid;
  };


  displayValidationError = (errorField) => {
    let error = null;
    if (this.state[errorField]) {
      error = <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
      </View>;
    }
    return error;
  }


  _retrieveData = async () => {
    try {
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      const mobile      = await AsyncStorage.getItem('mobile');
      const propertyId      = await AsyncStorage.getItem('propertyId');
      const propertyType      = await AsyncStorage.getItem('propertyType');
      const transactionType      = await AsyncStorage.getItem('transactionType');

      console.log("token basicinfo",token);
      console.log("propertyId basicinfo",propertyId);
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

        axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

           var property_id = propertyId;
          console.log("property_id in constructor property details",property_id);

           if(property_id!=null)
                {
                  console.log("here edit 2nd form");

                           axios
                            .get('/api/properties/'+property_id)
                            .then( (response) =>{
                              console.log("get property in property = ",response);
                              console.log("response.data.propertyDetails.furnishedStatus in property = ",response.data.propertyDetails.furnishedStatus);

                              this.setState({
                                  originalValues  : response.data.propertyDetails,
                                  bedrooms        : response.data.propertyDetails.bedrooms,
                                  balconies       : response.data.propertyDetails.balconies,
                                  washrooms       : response.data.propertyDetails.washrooms ? response.data.propertyDetails.washrooms : "",
                                  furnishedStatus : response.data.propertyDetails.furnishedStatus,
                                  personal        : response.data.propertyDetails.personal ? response.data.propertyDetails.personal : "",
                                  pantry          : response.data.propertyDetails.pantry ? response.data.propertyDetails.pantry : "",
                                  bathrooms       : response.data.propertyDetails.bathrooms,
                                  ageofproperty   : response.data.propertyDetails.ageofProperty,
                                  facing          : response.data.propertyDetails.facing,
                                  superArea       : response.data.propertyDetails.superArea.toString(),
                                  builtupArea     : response.data.propertyDetails.builtupArea,
                                  updateOperation : true,
                                  // amenity
                                  floor           : response.data.propertyDetails.floor,
                                  totalFloor      : response.data.propertyDetails.totalFloor,
                                  // prevAmenities   : response.data.propertyDetails.Amenities,
                                  superAreaUnit   : response.data.propertyDetails.superAreaUnit,
                                  builtupAreaUnit : response.data.propertyDetails.builtupAreaUnit,
                                  prevCharges     : response.data.propertyDetails.furnishedOptions.length > 0 ? response.data.propertyDetails.furnishedOptions : "",
                                  workStation     : response.data.propertyDetails.workStation ? response.data.propertyDetails.workStation : "",
                                  furnishPantry   : response.data.propertyDetails.furnishPantry,

                                },()=>{

                                  // console.log("supeeeeeeerarea",this.state.superArea);
                                  // console.log("furnishedStatus",this.state.furnishedStatus);
                                  if(this.state.furnishedStatus == "semiFurnished")
                                  {
                                    this.setState({furnishedIndex:1});
                                  }
                                  if(this.state.furnishedStatus == "fullFurnished")
                                  {
                                    this.setState({furnishedIndex:0});
                                  }
                                  if(this.state.furnishedStatus == "unfurnished")
                                  {
                                    this.setState({furnishedIndex:2});
                                  }

                                });
                            })
                            .catch((error)=>{
                                  console.log("error = ",error);
                                  if(error.message === "Request failed with status code 401")
                                  {
                                       // swal("Your session is expired! Please login again.","", "error");
                                       // this.props.history.push("/");
                                  }
                              });
              }

        }


      // }
    } catch (error) {
      // Error retrieving data
    }
  }

  onSelectFurnishStatus=(index,value)=>{
    // console.log("here value",value);
    // console.log("here index",index);

    this.setState({
      furnishedIndex: index,
      furnishedStatus : value,
      // workStation   : index,
      // personal      : index,
      // pantry        : index,
      // furnishedValue: value,
      //   totalAskIndex: index,
      //   furnishpantry: index,
    });
  }

  onWorkStation=(index,value)=>{
    this.setState({
    workStationIndex   : index,
    workStation : value,
    });
  }

  onPersonal=(index,value)=>{
    this.setState({
    personalIndex : index,
    personal : value,
    });
  }

  onPantry=(index,value)=>{
    this.setState({
    pantryIndex : index,
    pantry : value,
    });
  }

  onFurnishpantry=(index,value)=>{
    this.setState({
    furnishpantryIndex : index,
    furnishpantry : value,
    });
  }


  

  handleOnFurnish = (index)=>{

     // console.log("index",index);
    var alldata = this.state.furnishItem;
    var status = alldata[index].checked;
    if(status===true){
      alldata[index].checked = false;
    }else{
      alldata[index].checked = true;
    }
    this.setState({
      furnishItem: alldata,
    },()=>{
      // console.log("here new data of furnishItem",this.state.furnishItem);
    });
    // console.log("current data status",status);
  }

 submitFun(){
  console.log("this.state.furnishedstatus",this.state.furnishedstatus)
  if(this.state.builtupArea.value!=="" && 
    this.state.floor!=="" &&  this.state.totalfloor!=="" ){
      if (this.validInput()) {
        if(this.state.updateOperation === true){
          var furnishedOptionsData = this.state.furnishItem;
          var furnishedOptionsDataList =[];     
            furnishedOptionsData.map((item,index)=>{
              if(item.checked == true)
              {
                furnishedOptionsDataList.push(item.label);
              }
            })


            console.log("update fun");
            var ov = this.state.originalValues;


            var eq ="";
            if(furnishedOptionsDataList.length != this.state.furnishItem.length )
            {
              eq = true;
               console.log("equal not",eq);
            }else{
              
              for (var i = 0; i < furnishedOptionsDataList.length; i++)
              { 
                  if (furnishedOptionsDataList[i] != ov.furnishedOptions[i]){
                  eq = false;
                      }else{
                  eq = true;  
                      }
              }
              console.log("equal yes but same",eq); 
            }
            console.log("outside eq",eq);
            console.log("here state value",parseInt(this.state.superArea));
            console.log("here ov value",ov.superArea);
            if(this.state.bedrooms === ov.bedrooms && this.state.balconies === ov.balconies && this.state.washrooms === ov.washrooms &&
                this.state.furnishedStatus === ov.furnishedStatus && this.state.personal === ov.personal && this.state.pantry === ov.pantry &&
                 this.state.bathrooms === ov.bathrooms && this.state.ageofproperty === ov.ageofProperty && this.state.facing === ov.facing 
                 && parseInt(this.state.superArea) === ov.superArea && this.state.builtupArea === ov.builtupArea &&
                 eq === true && this.state.floor === ov.floor && this.state.totalFloor === ov.totalFloor && this.state.superAreaUnit === ov.superAreaUnit && this.state.builtupAreaUnit === ov.builtupAreaUnit && this.state.workStation === ov.workStation && this.state.furnishPantry === ov.furnishPantry )
              {
                  console.log("same data");
                 this.navigateScreen('Amenities');
                  
              }else{
                  console.log("diff data");
                  
                  const formValues = {
                  
                  "bedrooms"          : this.state.bedrooms,
                  "balconies"         : this.state.balconies,
                  "washrooms"         : this.state.washrooms,
                  "furnishedStatus"   : this.state.furnishedStatus,
                  "personal"          : this.state.personal,
                  "pantry"            : this.state.pantry,
                  "workStation"       : this.state.workStation,

                  "bathrooms"         : this.state.bathrooms,
                  "ageofProperty"     : this.state.ageofproperty,
                  "facing"            : this.state.facing,
                  "superArea"         : parseInt(this.state.superArea),
                  "builtupArea"       : this.state.builtupArea,
                  "property_id"       : this.state.propertyId,
                  "uid"               : this.state.uid,

                  // "Amenities"         : [],
                  "floor"             : this.state.floor,
                  "totalFloor"        : this.state.totalFloor,
                  "superAreaUnit"     : this.state.superAreaUnit,
                  "builtupAreaUnit"   : this.state.builtupAreaUnit,
                  "furnishPantry"     : this.state.furnishpantry, 
                  "furnishedOptions"  : furnishedOptionsDataList.length>0 ? furnishedOptionsDataList : "" ,
                };

                if( this.state.furnishedIndex!=="" &&  this.state.builtupArea.value!=="" && 
                    this.state.floor!=="" &&  this.state.totalFloor!=="" ){


                        axios
                        .patch('/api/properties/patch/propertyDetails',formValues)
                        .then( (res) =>{
                          console.log(res);
                          if(res.status === 200){
                            console.log("PropertyDetails Res = ",res);
                            this.navigateScreen('Amenities');
                          }
                        })
                        .catch((error)=>{
                                              console.log("error = ",error);
                                              if(error.message === "Request failed with status code 401")
                                              {
                                                   // Alert.alert("Your session is expired!"," Please login again.");
                                                  // this.props.navigation.navigate('MobileScreen');  
                                              }
                           });

                      
                    }else{
                         Alert.alert("Please enter mandatory fields","warning");
                    }


              }

                console.log("update fun");
                var ov = this.state.originalValues;
                  var furnishedOptionsData = this.state.furnishItem;
                      var furnishedOptionsDataList =[];     
                        furnishedOptionsData.map((item,index)=>{
                          if(item.checked == true)
                          {
                            furnishedOptionsDataList.push(item.label);
                          }
                        })


                var eq ="";
                if(furnishedOptionsDataList.length != this.state.furnishItem.length )
                {
                  eq = true;
                   console.log("equal not",eq);
                }else{
                  
                  for (var i = 0; i < furnishedOptionsDataList.length; i++)
                  { 
                      if (furnishedOptionsDataList[i] != ov.furnishedOptions[i]){
                      eq = false;
                          }else{
                      eq = true;  
                          }
                  }
                  console.log("equal yes but same",eq); 
                }
                console.log("outside eq",eq);
                console.log("here state value",parseInt(this.state.superArea));
                console.log("here ov value",ov.superArea);
                if(this.state.bedrooms === ov.bedrooms && this.state.balconies === ov.balconies && this.state.washrooms === ov.washrooms &&
                    this.state.furnishedStatus === ov.furnishedStatus && this.state.personal === ov.personal && this.state.pantry === ov.pantry &&
                     this.state.bathrooms === ov.bathrooms && this.state.ageofproperty === ov.ageofProperty && this.state.facing === ov.facing 
                     && parseInt(this.state.superArea) === ov.superArea && this.state.builtupArea === ov.builtupArea &&
                     eq === true && this.state.floor === ov.floor && this.state.totalFloor === ov.totalFloor && this.state.superAreaUnit === ov.superAreaUnit && this.state.builtupAreaUnit === ov.builtupAreaUnit && this.state.workStation === ov.workStation && this.state.furnishPantry === ov.furnishPantry )
                  {
                      console.log("same data");
                     this.navigateScreen('Amenities');
                      
                  }else{
                      console.log("diff data");
                      
                      const formValues = {
                      
                      "bedrooms"          : this.state.bedrooms,
                      "balconies"         : this.state.balconies,
                      "washrooms"         : this.state.washrooms,
                      "furnishedStatus"   : this.state.furnishedStatus,
                      "personal"          : this.state.personal,
                      "pantry"            : this.state.pantry,
                      "workStation"       : this.state.workStation,

                      "bathrooms"         : this.state.bathrooms,
                      "ageofProperty"     : this.state.ageofproperty,
                      "facing"            : this.state.facing,
                      "superArea"         : parseInt(this.state.superArea),
                      "builtupArea"       : this.state.builtupArea,
                      "property_id"       : this.state.propertyId,
                      "uid"               : this.state.uid,

                      // "Amenities"         : [],
                      "floor"             : this.state.floor,
                      "totalFloor"        : this.state.totalFloor,
                      "superAreaUnit"     : this.state.superAreaUnit,
                      "builtupAreaUnit"   : this.state.builtupAreaUnit,
                      "furnishPantry"     : this.state.furnishpantry, 
                      "furnishedOptions"  : furnishedOptionsDataList.length>0 ? furnishedOptionsDataList : "" ,
                    };

                    console.log("formValues",formValues);

                    if( this.state.furnishedIndex!=="" &&  this.state.builtupArea.value!=="" && 
                        this.state.floor!=="" &&  this.state.totalFloor!=="" ){


                            axios
                            .patch('/api/properties/patch/propertyDetails',formValues)
                            .then( (res) =>{
                              console.log(res);
                              if(res.status === 200){
                                console.log("PropertyDetails Res = ",res);
                                this.navigateScreen('Amenities');
                              }
                            })
                            .catch((error)=>{
                                                  console.log("error = ",error);
                                                  if(error.message === "Request failed with status code 401")
                                                  {
                                                       // Alert.alert("Your session is expired!"," Please login again.");
                                                      // this.props.navigation.navigate('MobileScreen');  
                                                  }
                               });

                          
                        }else{
                             Alert.alert("Please enter mandatory fields","warning");
                        }


                  }

        }else{
          console.log("submit func");

          var ov = this.state.originalValues;
            var furnishedOptionsData = this.state.furnishItem;
                var furnishedOptionsDataList =[];     
                  furnishedOptionsData.map((item,index)=>{
                    if(item.checked == true)
                    {
                      furnishedOptionsDataList.push(item.name);
                    }
                  })

                    var eq =true;
                    if(furnishedOptionsDataList.length !== this.state.furnishItem.length )
                    {
                      eq = false;
                       console.log("equal not",eq);
                    }else{
                      for (var i = 0; i < furnishedOptionsDataList.length; i++)
                      { 
                              if (furnishedOptionsDataList[i] != this.state.furnishItem[i]){
                          eq = false;
                              }else{
                          eq = true;  
                              }
                         }
                          console.log("equal yes but same",eq); 
                    }


                    const formValues = {
                      
                      "bedrooms"          : this.state.bedrooms,
                      "balconies"         : this.state.balconies,
                      "washrooms"         : this.state.washrooms,
                      "furnishedStatus"   : this.state.furnishedStatus,
                      "personal"          : this.state.personal,
                      "pantry"            : this.state.pantry,
                      "workStation"       : this.state.workStation,

                      "bathrooms"         : this.state.bathrooms,
                      "ageofProperty"     : this.state.ageofproperty,
                      "facing"            : this.state.facing,
                      "superArea"         : parseInt(this.state.superArea),
                      "builtupArea"       : this.state.builtupArea,
                      "property_id"       : this.state.propertyId,
                      "uid"               : this.state.uid,

                      // "Amenities"         : [],
                      "floor"             : this.state.floor,
                      "totalFloor"        : this.state.totalFloor,
                      "superAreaUnit"     : this.state.superAreaUnit,
                      "builtupAreaUnit"   : this.state.builtupAreaUnit,
                      "furnishPantry"       : this.state.furnishpantry, 
                      "furnishedOptions"    : furnishedOptionsDataList.length>0 ? furnishedOptionsDataList : "" ,
                    };
                    console.log("formValues",formValues);

                      if( this.state.furnishedStatus!="" && this.state.furnishedStatus!==undefined &&  this.state.builtupArea.value!="" &&
                        this.state.floor!=="" &&  this.state.totalFloor!=="" ){

                         axios
                        .patch('/api/properties/patch/propertyDetails',formValues)
                        .then( (res) =>{
                          console.log(res);
                          if(res.status === 200){
                            console.log("PropertyDetails Res = ",res);
                           this.navigateScreen('Amenities',{mobile:this.state.mobile,propertyType:this.state.propertyType,transactionType:this.state.transactionType,propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});

                          }
                        })
                        .catch((error)=>{
                                              console.log("error = ",error);
                                              if(error.message === "Request failed with status code 401")
                                              {
                                         //          Alert.alert("Your session is expired!"," Please login again.");
                                         // this.props.navigation.navigate('MobileScreen');          
                                             }
                             });

                     }else{
                            Alert.alert("Please enter mandatory fields","warning");
                     }

              }
            }  
        }else{
          Alert.alert("Please enter mandatory fields","warning");
        }

         // var allAmenitiesData = this.state.allAmenities;
         //    var allAmenitiesDataList =[];     
         //        allAmenitiesData.map((item,index)=>{
         //          if(item.checked == true)
         //          {
         //           allAmenitiesDataList.push(item.label);
         //          }
         //        })
  }

  totalFloor(){
      const floor      = parseInt(this.state.floor);
      const totalfloor = parseInt(this.state.totalfloor);
      if(floor > totalfloor){
        Alert.alert("Floor should not be greater than Total Floors");
      }
      this.setState({totalfloor : totalfloor});
  }

  builtArea(){
    const builtArea=parseInt(this.stateErr.builtupArea);
    const superArea=parseInt(this.refs.superArea);
    console.log("builtArea",builtArea);
    console.log("superArea",superArea);

    if(builtArea >= superArea){
      swal("Built Up Area should not be greater than Super Area");
      this.setState({builtupArea:""})
    }
  }

  render(){
    
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;
    
    const { navigation } = this.props;
    let {activeTab} = this.state;

    return (
    	   <React.Fragment>
           <HeaderBar showBackBtn={true} navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <KeyboardAwareScrollView>    
                <View style={styles.formWrapper}>
                  <View>
                    <Text style={styles.heading}>
                     Let's provide details of your property
                    </Text>
                  </View>

                  <View style={styles.divider}></View>

                    <Text style={[styles.heading2,styles.marginBottom15]}>My Property is on<Text style={[{color:"#f00"}]}>*</Text></Text>
                   <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                    <View style={[styles.inputWrapper2,{height:40}]}>
                      <View style={styles.inputImgWrapper2}>
                        <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                      </View>
                      <View style={styles.inputTextWrapper2}>
                       <Dropdown
                       
                        containerStyle      = {styles.ddContainer,styles.dropHeight,{paddingLeft:5}}
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
                        data                = {this.state.floorData}
                        value               = {this.state.floor}
                        onChangeText        = {floor => {this.setState({floor});}}
                      />
                      </View>
                    </View>
                    <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                    </View>
                      <View style={[styles.inputWrapper2,{height:40}]}>
                   
                      <View style={styles.inputImgWrapper2}>
                        <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                      </View>
                      <View style={[styles.inputTextWrapper2]}>
                        <Dropdown
                       
                        containerStyle      = {styles.ddContainer,styles.dropHeight,{paddingLeft:5}}
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
                        data                = {this.state.totalFloorData}
                        value               = {this.state.totalFloor}
                        onChangeText        = {totalFloor => {this.setState({totalFloor});}}
                        />
                      </View>
                    </View>
                  </View>

                  {this.state.propertyType !== "Commercial" ?

                  <View>

                          <Text style={[styles.heading2,styles.marginBottom15]}>My Property has</Text>
                          <View style={[styles.inputWrapper,styles.marginBottom25]}>
                            <View style={styles.inputImgWrapper}>
                              <Icon name="office-building" type="material-community" size={18}  color="#aaa" style={{}}/>
                            </View>
                            <View style={styles.inputTextWrapper}>
                              <Dropdown
                                label               = 'Bedrooms'
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
                                data                = {this.state.bedroomData}
                                value               = {this.state.bedrooms}
                                onChangeText        = {bedrooms => {this.setState({bedrooms});}}
                              />
                            </View>
                          </View>

                          <View style={[styles.inputWrapper,styles.marginBottom25]}>
                            <View style={styles.inputImgWrapper}>
                              <Icon name="office-building" type="material-community" size={18}  color="#aaa" style={{}}/>
                            </View>
                            <View style={styles.inputTextWrapper}>
                              <Dropdown
                                label               = 'Balconies'
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
                                data                = {this.state.balconieData}
                                value               = {this.state.balconies}
                                onChangeText        = {balconies => {this.setState({balconies});}}
                              />
                            </View>
                          </View>

                          <View style={[styles.inputWrapper,styles.marginBottom25]}>
                            <View style={styles.inputImgWrapper}>
                              <Icon name="bath" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                            </View>
                            <View style={styles.inputTextWrapper}>
                              <Dropdown
                                label               = 'Bathrooms'
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
                                data                = {this.state.bathroomData}
                                value               = {this.state.bathrooms}
                                onChangeText        = {bathrooms => {this.setState({bathrooms});}}
                              />
                            </View>
                          </View>

                    </View>

                  :
                    <View>
                      {/*washrooms*/}
                      <Text style={[styles.heading2,styles.marginBottom15]}>My Property has</Text>
                      <View style={[styles.inputWrapper,styles.marginBottom25]}>
                        <View style={styles.inputImgWrapper}>
                          <Icon name="bath" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                        </View>
                        <View style={styles.inputTextWrapper}>
                          <Dropdown
                            label               = 'Washrooms'
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
                            data                = {this.state.washroomData}
                            value               = {this.state.washrooms}
                            onChangeText        = {washrooms => {this.setState({washrooms});}}
                          />
                        </View>
                      </View>
                        {/*2nd*/}
                         <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom15]}>
                          <View style={[{width:'46%'}]}>

                                  <Text style={[styles.heading2,styles.marginBottom15]}>Pantry</Text>
                                  <View style={[styles.marginBottom15]}>
                                    <RadioGroup
                                      size={20}
                                      color={colors.grey}
                                      thickness={2}
                                      selectedIndex = {this.state.pantryIndex}
                                      onSelect = {(index, value) => this.onPantry(index, value)}
                                    >
                                      <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'yes'} >
                                        <Text style={styles.inputText}>Yes</Text>
                                      </RadioButton>
                              
                                      <RadioButton style={{paddingHorizontal:0}} value={'no'}>
                                        <Text style={styles.inputText}>No</Text>
                                      </RadioButton>
                              
                                    </RadioGroup>
                                  </View>

                          </View>

                          <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                             {/* <Text style={styles.heading3}>of</Text>*/}
                          </View>

                           <View style={[{width:'46%'}]}>

                                 <Text style={[styles.heading2,styles.marginBottom15]}>Personal Washroom</Text>
                                  <View style={[styles.marginBottom15]}>
                                    <RadioGroup
                                      size={20}
                                      color={colors.grey}
                                      thickness={2}
                                      selectedIndex = {this.state.personalIndex}
                                      onSelect = {(index, value) => this.onPersonal(index, value)}
                                    >
                                      <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'yes'} >
                                        <Text style={styles.inputText}>Yes</Text>
                                      </RadioButton>
                              
                                      <RadioButton style={{paddingHorizontal:0}} value={'no'}>
                                        <Text style={styles.inputText}>No</Text>
                                      </RadioButton>
                              
                                    </RadioGroup>
                                  </View>

                          </View>
                        </View>

                      </View>

                    }
                   

                  <Text style={[styles.heading2,styles.marginBottom15]}>It is<Text style={[{color:"#f00"}]}>*</Text></Text>
                  <View style={[styles.marginBottom15,{width:'100%'}]}>
                  
                    <RadioGroup
                      size={20}
                      color={colors.grey}
                      style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}
                      thickness={2}
                      selectedIndex = {this.state.furnishedIndex}
                      onSelect = {(index, value) => this.onSelectFurnishStatus(index, value)}
                    >
                      <RadioButton style={{paddingHorizontal:0,paddingTop:0,marginTop:10}} value={'fullFurnished'} >
                        <Text style={[styles.inputTextSmall,]}>Full furnished</Text>
                      </RadioButton>

                      <RadioButton style={{paddingHorizontal:0,marginLeft:5}} value={'semiFurnished'}>
                        <Text style={styles.inputTextSmall}>Semi furnished</Text>
                      </RadioButton>

                      <RadioButton style={{paddingHorizontal:0,paddingBottom:0,marginLeft:5}} value={'unfurnished'}>
                        <Text style={styles.inputTextSmall,{marginTop: -5}}>Unfurnished</Text>
                      </RadioButton>
                    </RadioGroup>
                  </View>

                   {(this.state.furnishedStatus==="fullFurnished" && this.state.propertyType === "Commercial") || (this.state.furnishedStatus==="semiFurnished" && this.state.propertyType ==="Commercial" ) ?
                       <View style={[styles.marginBottom15,{}]}>
                                  {this.state.furnishItem && this.state.furnishItem.length >0 ?
                                    this.state.furnishItem.map((data,index)=>(

                                    <React.Fragment key={index}>
                                      <CheckBox
                                        key={index}
                                        style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}
                                        style={{marginBottom:10}}
                                        onClick={() => this.handleOnFurnish(index)}
                                        isChecked={data.checked}
                                        rightTextStyle={{marginLeft:0}}
                                        checkBoxColor= {colors.grey}
                                        rightTextView = {
                                          <View style={{flexDirection:'row',flex:1}}>
                                            <Text style={styles.inputText}>{data.label}</Text>
                                          </View>
                                        }
                                      />
                                   
                                    </React.Fragment> 
                                  ))

                                    :
                                    null
                                  }
                               
                                <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                                  <View style={[{width:'46%'}]}>
                                    <Text style={[styles.heading2,styles.marginBottom15]}>Work Station</Text>
                                      <View style={[styles.marginBottom15]}>
                                        <RadioGroup
                                          size={20}
                                          color={colors.grey}
                                          thickness={2}
                                          selectedIndex = {this.state.workStationIndex}
                                          onSelect = {(index, value) => this.onWorkStation(index, value)}
                                        >
                                          <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={0} >
                                            <Text style={styles.inputText}>0</Text>
                                          </RadioButton>
                                  
                                          <RadioButton style={{paddingHorizontal:0}} value={1}>
                                            <Text style={styles.inputText}>1</Text>
                                          </RadioButton>

                                           <RadioButton style={{paddingHorizontal:0}} value={2}>
                                            <Text style={styles.inputText}>2</Text>
                                          </RadioButton>
                                        </RadioGroup>
                                      </View>
                                  </View>

                                  <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                                     {/* <Text style={styles.heading3}>of</Text>*/}
                                  </View>

                                   <View style={[{width:'46%'}]}>


                                         <Text style={[styles.heading2,styles.marginBottom15]}>Pantry</Text>
                                          <View style={[styles.marginBottom15]}>
                                            <RadioGroup
                                              size={20}
                                              color={colors.grey}
                                              thickness={2}
                                              selectedIndex = {this.state.furnishpantryIndex}
                                              onSelect = {(index, value) => this.onFurnishpantry(index, value)}
                                            >
                                              <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'dry'} >
                                                <Text style={styles.inputText}>Dry</Text>
                                              </RadioButton>
                                      
                                              <RadioButton style={{paddingHorizontal:0}} value={'wet'}>
                                                <Text style={styles.inputText}>Wet</Text>
                                              </RadioButton>

                                                <RadioButton style={{paddingHorizontal:0}} value={'not available'}>
                                                <Text style={styles.inputText}>Not available</Text>
                                              </RadioButton>
                                      
                                            </RadioGroup>
                                          </View>


                                   </View>
                                </View>

                       </View>
                        :
                        null}
                {/*here ends*/}

                   <Text style={[styles.heading2,styles.marginBottom15]}>It is</Text>
                  <View style={[styles.inputWrapper,styles.marginBottom25]}>
                    <View style={styles.inputImgWrapper}>
                      <Icon name="home" type="feather" size={18}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <Dropdown
                        label               = 'Years old'
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
                        data                = {this.state.yearsData}
                        value               = {this.state.ageofproperty}
                        onChangeText        = {ageofproperty => {this.setState({ageofproperty});}}
                      />
                    </View>
                  </View>

                   <View style={[styles.inputWrapper,styles.marginBottom25]}>
                    <View style={styles.inputImgWrapper}>
                      <Icon name="crosshairs" type="font-awesome" size={20}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <Dropdown
                        label               = 'Property Facing'
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
                        data                = {this.state.propertyFacingData}
                        value               = {this.state.facing}
                        onChangeText        = {facing => {this.setState({facing});}}
                      />
                    </View>
                  </View>

                   <View style={[styles.marginBottom25]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputImgWrapper}>
                        <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                      </View>
                      <View style={[styles.inputTextWrapper68,{}]}>
                        <TextField
                          label                 = "Super Area"
                          lineWidth             = {1}
                          tintColor             = {colors.button}
                          inputContainerPadding = {0}
                          labelHeight           = {15}
                          labelFontSize         = {sizes.label}
                          titleFontSize         = {15}
                          baseColor             = {'#666'}
                          textColor             = {'#333'}
                          value                 = {this.state.superArea}
                          containerStyle        = {styles.textContainer}
                          inputContainerStyle   = {styles.textInputContainer}
                          titleTextStyle        = {styles.textTitle}
                          style                 = {styles.textStyle}
                          labelTextStyle        = {styles.textLabel}
                          keyboardType          = "numeric"
                          maxLength             = {10}
                          onChangeText          = {superArea => {this.setState({superArea},() => { this.validInputField('superArea', 'superAreaError'); })}}

                        />
                      </View>
                      <View style={[styles.inputRightWrapper1,{height:35}]}>
                        <Dropdown
                          containerStyle      = {styles.dropHeight,{paddingLeft:5}}
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
                          data                = {this.state.UnitData}
                          value               = {this.state.superAreaUnit}
                          onChangeText        = {superAreaUnit => {this.setState({superAreaUnit});}}
                        />
                      </View>
                    </View>
                    {this.displayValidationError('superAreaError')}
                  </View>

                  <View style={[styles.marginBottom25]}>
                    <View style={[styles.inputWrapper]}>
                      <View style={styles.inputImgWrapper}>
                        <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                      </View>
                      <View style={styles.inputTextWrapper68}>
                        <TextField
                          label                 = "Built Area*"
                          onChangeText          = {builtupArea => {this.setState({builtupArea},() => { this.validInputField('builtupArea', 'builtupAreaError'); })}}
                          onBlur                = {() => this.builtArea}
                          lineWidth             = {1}
                          tintColor             = {colors.button}
                          inputContainerPadding = {0}
                          labelHeight           = {15}
                          labelFontSize         = {sizes.label}
                          titleFontSize         = {15}
                          baseColor             = {'#666'}
                          textColor             = {'#333'}
                          value                 = {this.state.builtupArea}
                          containerStyle        = {styles.textContainer}
                          inputContainerStyle   = {styles.textInputContainer}
                          titleTextStyle        = {styles.textTitle}
                          style                 = {styles.textStyle}
                          labelTextStyle        = {styles.textLabel}
                          keyboardType          = "numeric"
                          maxLength             = {10}
                        />
                      </View>
                      <View style={[styles.inputRightWrapper1,{height:35}]}>
                        <Dropdown
                          containerStyle      = {styles.dropHeight,{paddingLeft:5}}
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
                          data                = {this.state.UnitData}
                          value               = {this.state.builtupAreaUnit}
                          onChangeText        = {builtupAreaUnit => {this.setState({builtupAreaUnit});}}
                        />
                      </View>
                    </View>

                    {this.displayValidationError('builtupAreaError')}
                  </View> 


                  {/*2nd*/}

                       <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom15]}>
                        <View style={[{width:'46%'}]}>

                                <Text style={[styles.heading2,styles.marginBottom15]}>Pantry</Text>
                                <View style={[styles.marginBottom15]}>
                                  <RadioGroup
                                    size={20}
                                    color={colors.grey}
                                    thickness={2}
                                    selectedIndex = {this.state.pantryIndex}
                                    onSelect = {(index, value) => this.onPantry(index, value)}
                                  >
                                    <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'yes'} >
                                      <Text style={styles.inputText}>Yes</Text>
                                    </RadioButton>
                            
                                    <RadioButton style={{paddingHorizontal:0}} value={'no'}>
                                      <Text style={styles.inputText}>No</Text>
                                    </RadioButton>
                            
                                  </RadioGroup>
                                </View>

                        </View>

                        <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                           {/* <Text style={styles.heading3}>of</Text>*/}
                        </View>

                         <View style={[{width:'46%'}]}>

                               <Text style={[styles.heading2,styles.marginBottom15]}>Personal Washroom</Text>
                                <View style={[styles.marginBottom15]}>
                                  <RadioGroup
                                    size={20}
                                    color={colors.grey}
                                    thickness={2}
                                    selectedIndex = {this.state.personalIndex}
                                    onSelect = {(index, value) => this.onPersonal(index, value)}
                                  >
                                    <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'yes'} >
                                      <Text style={styles.inputText}>Yes</Text>
                                    </RadioButton>
                            
                                    <RadioButton style={{paddingHorizontal:0}} value={'no'}>
                                      <Text style={styles.inputText}>No</Text>
                                    </RadioButton>
                            
                                  </RadioGroup>
                                </View>

                        </View>
                      </View>

                    </View>

                  }
             

            <Text style={[styles.heading2,styles.marginBottom15]}>It is<Text style={[{color:"#f00"}]}>*</Text></Text>
            <View style={[styles.marginBottom15,{width:'100%'}]}>
            
              <RadioGroup
                size={20}
                color={colors.grey}
                style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}
                thickness={2}
                selectedIndex = {this.state.furnishedIndex}
                onSelect = {(index, value) => this.onSelectFurnishStatus(index, value)}
              >
                <RadioButton style={{paddingHorizontal:0,paddingTop:0,marginTop:10}} value={'fullFurnished'} >
                  <Text style={[styles.inputTextSmall,]}>Full furnished</Text>
                </RadioButton>

                <RadioButton style={{paddingHorizontal:0,marginLeft:5}} value={'semiFurnished'}>
                  <Text style={styles.inputTextSmall}>Semi furnished</Text>
                </RadioButton>

                <RadioButton style={{paddingHorizontal:0,paddingBottom:0,marginLeft:5}} value={'unfurnished'}>
                  <Text style={styles.inputTextSmall,{marginTop: -5}}>Unfurnished</Text>
                </RadioButton>
              </RadioGroup>
            </View>


          {/*==============================================================================================================*/}
             {((this.state.furnishedStatus==="fullFurnished" && this.state.propertyType === "Commercial") || (this.state.furnishedStatus==="semiFurnished" && this.state.propertyType ==="Commercial" )) ?
                 <View style={[styles.marginBottom15,{}]}>

                            {
                              this.state.furnishItem && this.state.furnishItem.length > 0 ?
                              this.state.furnishItem.map((data,index)=>(

                                <React.Fragment key={index}>
                                  <CheckBox
                                    key={index}
                                    style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}
                                    style={{marginBottom:10}}
                                    onClick={() => this.handleOnFurnish(index)}
                                    isChecked={data.checked}
                                    rightTextStyle={{marginLeft:0}}
                                    checkBoxColor= {colors.grey}
                                    rightTextView = {
                                      <View style={{flexDirection:'row',flex:1}}>
                                        <Text style={styles.inputText}>{data.label}</Text>
                                      </View>
                                    }
                                  />
                               
                                </React.Fragment> 
                              ))

                                :
                                null
                              }
                         
                                        <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                                          <View style={[{width:'46%'}]}>

                                                <Text style={[styles.heading2,styles.marginBottom15]}>Work Station</Text>
                                                  <View style={[styles.marginBottom15]}>
                                                    <RadioGroup
                                                      size={20}
                                                      color={colors.grey}
                                                      thickness={2}
                                                      selectedIndex = {this.state.workStationIndex}
                                                      onSelect = {(index, value) => this.onWorkStation(index, value)}
                                                    >
                                                      <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={0} >
                                                        <Text style={styles.inputText}>0</Text>
                                                      </RadioButton>
                                              
                                                      <RadioButton style={{paddingHorizontal:0}} value={1}>
                                                        <Text style={styles.inputText}>1</Text>
                                                      </RadioButton>

                                                       <RadioButton style={{paddingHorizontal:0}} value={2}>
                                                        <Text style={styles.inputText}>2</Text>
                                                      </RadioButton>
                                                    </RadioGroup>
                                                  </View>


                                          </View>

                                          <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                                            
                                          </View>

                                           <View style={[{width:'46%'}]}>


                                                 <Text style={[styles.heading2,styles.marginBottom15]}>Pantry</Text>
                                                  <View style={[styles.marginBottom15]}>
                                                    <RadioGroup
                                                      size={20}
                                                      color={colors.grey}
                                                      thickness={2}
                                                      selectedIndex = {this.state.furnishpantryIndex}
                                                      onSelect = {(index, value) => this.onFurnishpantry(index, value)}
                                                    >
                                                      <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'dry'} >
                                                        <Text style={styles.inputText}>Dry</Text>
                                                      </RadioButton>
                                              
                                                      <RadioButton style={{paddingHorizontal:0}} value={'wet'}>
                                                        <Text style={styles.inputText}>Wet</Text>
                                                      </RadioButton>

                                                        <RadioButton style={{paddingHorizontal:0}} value={'not available'}>
                                                        <Text style={styles.inputText}>Not available</Text>
                                                      </RadioButton>
                                              
                                                    </RadioGroup>
                                                  </View>


                                           </View>
                                        </View>

                 </View>
                  :
                  null}

                         


                       

          {/*here ends*/}

             <Text style={[styles.heading2,styles.marginBottom15]}>It is</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="home" type="feather" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Years old'
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
                  data                = {this.state.yearsData}
                  value               = {this.state.ageofproperty}
                  onChangeText        = {ageofproperty => {this.setState({ageofproperty});}}
                />
              </View>
            </View>

             <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="crosshairs" type="font-awesome" size={20}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Property Facing'
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
                  data                = {this.state.propertyFacingData}
                  value               = {this.state.facing}
                  onChangeText        = {facing => {this.setState({facing});}}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={[styles.inputTextWrapper68,{}]}>
              
                <TextField
                  label                 = "Super Area"
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.superArea}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                  onChangeText          = {superArea => {this.setState({superArea})}}

                />
              </View>
              <View style={[styles.inputRightWrapper1,{height:35}]}>
                <Dropdown
                  containerStyle      = {styles.dropHeight,{paddingLeft:5}}
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
                  data                = {this.state.UnitData}
                  value               = {this.state.superAreaUnit}
                  onChangeText        = {superAreaUnit => {this.setState({superAreaUnit});}}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper68}>
                <TextField
                  label                 = "Built Area*"
                  onChangeText          = {builtupArea => {this.setState({builtupArea})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {15}
                  baseColor             = {'#666'}
                  textColor             = {'#333'}
                  value                 = {this.state.builtupArea}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                />
              </View>
              <View style={[styles.inputRightWrapper1,{height:35}]}>
                <Dropdown
                  containerStyle      = {styles.dropHeight,{paddingLeft:5}}
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
                  data                = {this.state.UnitData}
                  value               = {this.state.builtupAreaUnit}
                  onChangeText        = {builtupAreaUnit => {this.setState({builtupAreaUnit});}}
                />
              </View>
            </View>

            <View>
                 
              </View>

>>>>>>> Stashed changes
            {/*end*/}
                
            {/*
            <View>
              <Text style={styles.heading}>
               -----------------------------------------------
              </Text>
            </View>*/}

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

            {/*<TouchableOpacity
               style={styles.button}
               onPress={this.onPress}
            >
              <Text> Touch Here </Text>
            </TouchableOpacity>*/}
            </View>
          </KeyboardAwareScrollView> 
        </ScrollView>
  	 </React.Fragment>
    );
    
  }
}

PropertyDetails.defaultProps = {
  messages: {
    en: {
      numbers: 'This field must be a number.',
      required: 'This field is required.',
      letters: 'It should only contain letters.',
      lettersOrEmpty: 'It should only contain letters.',
      minlength: 'Length should be greater than {1}',
      equalLength : 'Length should be equal to {1}'
    }
  },

  rules: {
    numbers        : /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    required       : /\S+/,
    letters        : /^[a-zA-Z ]+$/,
    lettersOrEmpty : /^[a-zA-Z ]+$|^$/,
    minlength(length, value) {
      if (length === void (0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if (value.length > length) {
        return true;
      }
      return false;
    },
  },
}

