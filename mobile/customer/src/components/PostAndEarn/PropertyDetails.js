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
    // navigateScreen=(route)=>{
    // const navigateAction = StackActions.reset({
    //              index: 0,
    //             actions: [
    //             NavigationActions.navigate({ routeName: route}),
    //             ],
    //         });
    //         this.props.navigation.dispatch(navigateAction);
    // }

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

    var floorList      =[];
    var totalFloorList =[];
    var obj  ={label : "Basement",value : "Basement"}
    var obj1 ={label : "Ground"  ,value : "Ground"}
    floorList.push(obj)
    floorList.push(obj1)
    for (var i=1;i<=60;i++){
        var obj2 ={
          label : i,
          value : i,
        }
        floorList.push(obj2);
        totalFloorList.push(obj2);
    }
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
      furnishedStatus : "Fully Furnished",
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
      floorData         :floorList,
      totalFloorData    :totalFloorList,
      floor             : 'Basement',
      totalFloor        :'Total Floors',


      defaultIcon       :'flag',
      iconType          : 'material-community',
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
      furnishpantry     : "Dry",
      workStation       : "2",
      builtupAreaError  : "",
      superAreaError    : "",
      // originalValues:"",
      prevAmenities     : "",
      allAmenities      : [],
      // uid:"",
      // token:"",
      // mobile:"",
      // propertyId:"",
      // propertyType:"",
      // transactionType:"",
      // updateOperation: false,

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

          axios
          .get('/api/masteramenities/list')
          .then(
            (res)=>{
              // console.log('res postdata', res);
              const postsdata = res.data;
              console.log('postsdata',postsdata);
              this.setState({
                allAmenities : postsdata,
              },()=>{
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
                                                furnishpantry   : response.data.propertyDetails.furnishPantry,

                                                /*----------------------------------------*/
                                                // originalValues  : response.data.propertyDetails,
                                                prevAmenities   : response.data.propertyDetails.Amenities,
                                                // updateOperation : response.data.propertyDetails.Amenities.length >0 ? true : false,
                                   
                                              },()=>{
                                                  console.log("here ov furnishpantry",this.state.furnishpantry);
                                                

                                                    var allAmenitiesData = this.state.allAmenities;
                                                    var allAmenitiesDataList = allAmenitiesData.map((item,index)=>{
                                                    var propPresent = this.state.prevAmenities.find((obj)=>{
                                                    return item.amenity === obj;
                                                    })
                                                    var newObj = Object.assign({},item);
                                                    if(propPresent){
                                                      newObj.checked = true
                                                    }else{
                                                      newObj.checked = false
                                                    }
                                                    return newObj;
                                                  })
                                                  this.setState({
                                                      allAmenities : allAmenitiesDataList,
                                                    },()=>{
                                                      console.log("here allAmenities in didmount after match result",this.state.allAmenities);
                                                      });


                                                  var furnishItemData = this.state.furnishItem;
                                                  var furnishItemDataList = furnishItemData.map((item,index)=>{
                                                  var propPresent = this.state.prevCharges.find((obj)=>{
                                                  return item.label === obj;
                                                  })
                                                  var newObj = Object.assign({},item);
                                                  if(propPresent){
                                                    newObj.checked = true
                                                  }else{
                                                    newObj.checked = false
                                                  }
                                                  return newObj;
                                                })

                                                this.setState({
                                                    furnishItem : furnishItemDataList,
                                                  },()=>{
                                                    console.log("here furnishItem in didmount after match result",this.state.furnishItem);
                                                    });



                                                if(this.state.furnishedStatus === "Semi Furnished")
                                                {
                                                  this.setState({furnishedIndex:1});
                                                }
                                                if(this.state.furnishedStatus === "Fully Furnished")
                                                {
                                                  this.setState({furnishedIndex:0});
                                                }
                                                if(this.state.furnishedStatus === "Unfurnished")
                                                {
                                                  this.setState({furnishedIndex:2});
                                                }


                                                 if(this.state.furnishpantry === "Dry")
                                                {
                                                  this.setState({furnishpantryIndex:0});
                                                }
                                                if(this.state.furnishpantry === "Wet")
                                                {
                                                  this.setState({furnishpantryIndex:1});
                                                }
                                                if(this.state.furnishpantry === "Not available")
                                                {
                                                  this.setState({furnishpantryIndex:2});
                                                }

                                                /*pantry data*/

                                                if(this.state.pantry === "no" || this.state.pantry === "No")
                                                {
                                                  this.setState({pantryIndex:1});
                                                }else{
                                                  this.setState({pantryIndex:0});
                                                }

                                                /*personal washroom*/
                                                if(this.state.personal === "no" || this.state.personal === "No" )
                                                {
                                                   this.setState({personalIndex:1});
                                                }else{
                                                   this.setState({personalIndex:0});
                                                }

                                                


                                                /*work station*/
                                                if(this.state.workStation === 0 || this.state.workStation === "0"){
                                                   this.setState({workStationIndex:0});
                                                }
                                                if(this.state.workStation === 1 || this.state.workStation === "1"){
                                                   this.setState({workStationIndex:1});
                                                }
                                                if(this.state.workStation === 2 || this.state.workStation === "2"){
                                                   this.setState({workStationIndex:2});
                                                }


                                              });
                                          },()=>{
                                            console.log("selected index-----------------------------------------------------------------------------------------------------------------------",this.state.furnishpantryIndex);
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
                            /*if prop id close*/

                  });
              })
              .catch((error)=>{
                        console.log("error = ",error);
                        // if(error.message === "Request failed with status code 401")
                        // {
                        //      swal("Your session is expired! Please login again.","", "error");
                        //      this.props.history.push("/");
                        // }
                    });

             /*if token close*/
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

  onWorkStation=(indexW,valueW)=>{
    this.setState({
    workStationIndex   : indexW,
    workStation : valueW,
    },()=>{
      console.log("here data",this.state.workStation);
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
    },()=>{
    });
  }

  onFurnishpantry=(indexF,valueF)=>{
      console.log("here index", indexF);
      console.log("here valueF", valueF);
      this.setState({
      furnishpantryIndex : indexF,
      furnishpantry : valueF,
      },()=>{
        console.log("here pantry data",this.state.furnishpantry);
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
    },()=>{   // console.log("here new data of furnishItem",this.state.furnishItem);
    });
 }

 handleOnClickInternal = (index)=>{
    console.log("index",index);
    var alldata = this.state.allAmenities;
    var status = alldata[index].checked;
    if(status===true){
      alldata[index].checked = false;
    }else{
      alldata[index].checked = true;
    }
    this.setState({
      allAmenities: alldata,
    },()=>{      // console.log("here new data of amenities",this.state.allAmenities);
    });
  }


submitFun(){
  var ov = this.state.originalValues;

  console.log("this.state.furnishpantryIndex",this.state.furnishpantryIndex)
  console.log("here state value",this.state.furnishpantry);
  console.log("here ov furnishPantry value",ov.furnishPantry);
  if(this.state.builtupArea.value!=="" &&
        this.state.floor!=="" &&  this.state.totalfloor!=="" ){
      if (this.validInput()) {
        if(this.state.updateOperation === true){
          console.log("update fun");
          var ov = this.state.originalValues;

           var allAmenitiesData = this.state.allAmenities;
           var allAmenitiesDataList =[];     
              allAmenitiesData.map((item,index)=>{
                if(item.checked == true)
                {
                  allAmenitiesDataList.push(item.amenity);
                }
              })
              var eqAmenity ="";
                if(allAmenitiesDataList.length != ov.Amenities.length )
                {
                  eqAmenity = false;
                   console.log("equal eqAmenity not",eqAmenity);
                }else{
                  
                  for (var i = 0; i < allAmenitiesDataList.length; i++)
                  { 
                          if (allAmenitiesDataList[i] != ov.Amenities[i]){
                      eqAmenity = false;
                          }else{
                      eqAmenity = true;  
                          }
                     }
                      console.log("equal yes eqAmenity but same",eqAmenity); 
                }

              console.log("outside eqAmenity",eqAmenity);

              /*-----------------------------*/

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
                
                if(this.state.bedrooms === ov.bedrooms && this.state.balconies === ov.balconies && this.state.washrooms === ov.washrooms &&
                    this.state.furnishedStatus === ov.furnishedStatus && this.state.personal === ov.personal && this.state.pantry === ov.pantry &&
                     this.state.bathrooms === ov.bathrooms && this.state.ageofproperty === ov.ageofProperty && this.state.facing === ov.facing
                     && parseInt(this.state.superArea) === ov.superArea && this.state.builtupArea === ov.builtupArea &&
                      eqAmenity === true && eq === true && this.state.floor === ov.floor && this.state.totalFloor === ov.totalFloor && this.state.superAreaUnit === ov.superAreaUnit && this.state.builtupAreaUnit === ov.builtupAreaUnit && this.state.workStation === ov.workStation 
                     && this.state.furnishpantry === ov.furnishPantry )
                  {
                      console.log("same data");
                     this.navigateScreen('Amenities');
                     
                  }else{
                      console.log("diff data");
                      console.log("allAmenities in result",this.state.allAmenities);
                      var allAmenitiesData = this.state.allAmenities;
                        var allAmenitiesDataList =[];     
                            allAmenitiesData.map((item,index)=>{
                              if(item.checked == true)
                              {
                                allAmenitiesDataList.push(item.amenity);
                              }
                            })

                      var formValues ={}

                      if(furnishedOptionsDataList.length>0)

                      {
                           var formValues = {
                           
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

                            "Amenities"         : allAmenitiesDataList,
                            "floor"             : this.state.floor,
                            "totalFloor"        : this.state.totalFloor,
                            "superAreaUnit"     : this.state.superAreaUnit,
                            "builtupAreaUnit"   : this.state.builtupAreaUnit,
                            "furnishPantry"     : this.state.furnishpantry,
                            "furnishedOptions"  : furnishedOptionsDataList ,
                          };
                      }else{

                               var formValues = {                    
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

                            "Amenities"         : allAmenitiesDataList,
                            "floor"             : this.state.floor,
                            "totalFloor"        : this.state.totalFloor,
                            "superAreaUnit"     : this.state.superAreaUnit,
                            "builtupAreaUnit"   : this.state.builtupAreaUnit,
                            "furnishPantry"     : this.state.furnishpantry,
                            // "furnishedOptions"  : furnishedOptionsDataList.length>0 ? furnishedOptionsDataList : null ,
                          };
                      }
                    console.log("formValues",formValues);

                    if( this.state.furnishedIndex!=="" &&  this.state.builtupArea.value!=="" &&
                        this.state.floor!=="" &&  this.state.totalFloor!=="" ){

                      if(allAmenitiesDataList!=""){

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
                                                       Alert.alert("Please select atleast one amenity","");
                                                }
                         
                        }else{
                             Alert.alert("Please enter mandatory fields","warning");
                        }
                  }

        }else{
          console.log("submit func");
          var ov = this.state.originalValues;
            var allAmenitiesData = this.state.allAmenities;
              var allAmenitiesDataList =[];     
              allAmenitiesData.map((item,index)=>{
                if(item.checked == true)
                {
                  allAmenitiesDataList.push(item.amenity);
                }
              })

            var furnishedOptionsData = this.state.furnishItem;
                var furnishedOptionsDataList =[];    
                  furnishedOptionsData.map((item,index)=>{
                    if(item.checked == true)
                    {
                      furnishedOptionsDataList.push(item.label);
                    }
                  })
                    var eq = true;
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

                      "Amenities"         : allAmenitiesDataList,
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

         
  }

  totalFloor(){
      const floorValue      = parseInt(this.state.floor);
      const totalfloorValue = parseInt(this.state.totalfloor);
      if(floorValue > totalfloorValue){
        Alert.alert("Floor should not be greater than Total Floors");
      }
      this.setState({totalfloor : totalfloorValue});
  }

  builtArea(){
    var builtAreaValue=parseInt(this.state.builtupArea);
    var superAreaValue=parseInt(this.state.superArea);
    console.log("builtArea",builtAreaValue);
    console.log("superArea",superAreaValue);

    if(builtAreaValue >= superAreaValue){
      Alert.alert("Built Up Area should not be greater than Super Area");
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
                        onBlur              = {()=>this.totalFloor()}
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
                        onBlur              = {()=>this.totalFloor()}
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
                                    <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'Yes'} >
                                      <Text style={styles.inputText}>Yes</Text>
                                    </RadioButton>
                           
                                    <RadioButton style={{paddingHorizontal:0}} value={'No'}>
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
                                    <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'Yes'} >
                                      <Text style={styles.inputText}>Yes</Text>
                                    </RadioButton>
                           
                                    <RadioButton style={{paddingHorizontal:0}} value={'No'}>
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
                      <RadioButton style={{paddingHorizontal:0,paddingTop:0,marginTop:10}} value={'Fully Furnished'} >
                        <Text style={[styles.inputTextSmall,]}>Fully furnished</Text>
                      </RadioButton>

                      <RadioButton style={{paddingHorizontal:0,marginLeft:5}} value={'Semi Furnished'}>
                        <Text style={styles.inputTextSmall}>Semi furnished</Text>
                      </RadioButton>

                      <RadioButton style={{paddingHorizontal:0,marginLeft:5}} value={'Unfurnished'}>
                        <Text style={styles.inputTextSmall}>Unfurnished</Text>
                      </RadioButton>
                    </RadioGroup>
                  </View>

                   {(this.state.furnishedStatus==="Fully Furnished" && this.state.propertyType === "Commercial") || (this.state.furnishedStatus==="Semi Furnished" && this.state.propertyType ==="Commercial" ) ?
                       <View style={[styles.marginBottom15,{}]}>
                          {this.state.furnishItem && this.state.furnishItem.length >0 ?
                            this.state.furnishItem.map((data,index)=>(

                            <View key={index}>
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
                          
                            </View>
                          ))

                            :
                            null
                          }

                        </View>

                        :
                        null

                      }

                       {(this.state.furnishedStatus==="Fully Furnished" && this.state.propertyType === "Commercial") || (this.state.furnishedStatus==="Semi Furnished" && this.state.propertyType ==="Commercial" ) ?
                          <View>
                            <Text style={[styles.heading2,styles.marginBottom15]}>Work Station</Text>
                              <View style={[styles.marginBottom15]}>
                                <RadioGroup
                                  size={20}
                                  color={colors.grey}
                                  thickness={2}
                                  selectedIndex = {this.state.workStationIndex}
                                  onSelect = {(indexW, valueW) => this.onWorkStation(indexW, valueW)}
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

                            :
                            null
                          }
                          {/*2nd*/}

                           {(this.state.furnishedStatus==="Fully Furnished" && this.state.propertyType === "Commercial") || (this.state.furnishedStatus==="Semi Furnished" && this.state.propertyType ==="Commercial" ) ?
                      

                              <View>
                                <Text style={[styles.heading2,styles.marginBottom15]}>Pantry</Text>
                                  <View style={[styles.marginBottom15]}>
                                    <RadioGroup
                                      size={20}
                                      color={colors.grey}
                                      thickness={2}
                                      selectedIndex = {this.state.furnishpantryIndex}
                                      onSelect = {(indexF, valueF) => this.onFurnishpantry(indexF, valueF)}
                                    >
                                      <RadioButton style={{paddingHorizontal:0,paddingTop:0}} value={'Dry'} >
                                        <Text style={styles.inputText}>Dry</Text>
                                      </RadioButton>
                             
                                      <RadioButton style={{paddingHorizontal:0}} value={'Wet'}>
                                        <Text style={styles.inputText}>Wet</Text>
                                      </RadioButton>

                                        <RadioButton style={{paddingHorizontal:0}} value={'Not available'}>
                                        <Text style={styles.inputText}>Not available</Text>
                                      </RadioButton>
                             
                                    </RadioGroup>
                                  </View>
                                </View>
                                :
                                null
                              }

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
                                    onBlur                = {() => this.builtArea()}
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
                                    onBlur                = {() => this.builtArea()}
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




                              <View style={styles.amenitiesWrapper,styles.marginBottom25} >
                                  <Text style={[styles.heading3,styles.marginBottom5]}> All Amenities </Text>           
                                  {console.log("here amenity",this.state.allAmenities)}
                                   { this.state.allAmenities && this.state.allAmenities.length >0 
                                    ?
                                    this.state.allAmenities.map((data,index)=>(
                                    <React.Fragment key={index}>
                                     
                                    {data.amenity==="AC" ?

                                      <CheckBox
                                        key={index}
                                        style={{marginBottom:10}}
                                        onClick={() => this.handleOnClickInternal(index)}
                                        isChecked={data.checked}
                                        rightTextStyle={{marginLeft:0}}
                                        checkBoxColor= {colors.grey}
                                        rightTextView = {
                                          <View style={{flexDirection:'row',flex:1}}>
                                            <Icon
                                              name={this.state.defaultIcon}
                                              type={this.state.iconType}
                                              size={18}
                                              color= {colors.button}
                                              containerStyle = {{marginHorizontal:10}}
                                            />
                                             <Image 
                                              source={require('../../images/ac.png') }
                                              style={{width: 25, height:25, marginRight:7}}
                                            />
                                            <Text style={styles.inputText}>{data.amenity}</Text>
                                          </View>

                                        }
                                        />

                                        :


                                       /* data.amenity==="Swimming Pool" ?
                                         <CheckBox
                                            key={index}
                                            style={{marginBottom:10}}
                                            onClick={() => this.handleOnClickInternal(index)}
                                            isChecked={data.checked}
                                            rightTextStyle={{marginLeft:0}}
                                            checkBoxColor= {colors.grey}
                                            rightTextView = {
                                              <View style={{flexDirection:'row',flex:1}}>
                                                <Icon
                                                  name={this.state.defaultIcon}
                                                  type={this.state.iconType}
                                                  size={18}
                                                  color= {colors.button}
                                                  containerStyle = {{marginHorizontal:10}}
                                                />
                                                 <Image 
                                                  source={require('../../images/pool.png') }
                                                  style={{width: 25, height:25, marginRight:7}}
                                                />
                                                <Text style={styles.inputText}>{data.amenity}</Text>
                                              </View>

                                            }
                                            />


                                          :


                                          data.amenity==="Gas Pipeline" ?
                                           <CheckBox
                                              key={index}
                                              style={{marginBottom:10}}
                                              onClick={() => this.handleOnClickInternal(index)}
                                              isChecked={data.checked}
                                              rightTextStyle={{marginLeft:0}}
                                              checkBoxColor= {colors.grey}
                                              rightTextView = {
                                                <View style={{flexDirection:'row',flex:1}}>
                                                  <Icon
                                                    name={this.state.defaultIcon}
                                                    type={this.state.iconType}
                                                    size={18}
                                                    color= {colors.button}
                                                    containerStyle = {{marginHorizontal:10}}
                                                  />
                                                   <Image 
                                                    source={require('../../images/gasPipe.png') }
                                                    style={{width: 25, height:25, marginRight:7}}
                                                  />
                                                  <Text style={styles.inputText}>{data.amenity}</Text>
                                                </View>

                                              }
                                              />

                                          :


                                           data.amenity==="24*7 Water" ?
                                           <CheckBox
                                              key={index}
                                              style={{marginBottom:10}}
                                              onClick={() => this.handleOnClickInternal(index)}
                                              isChecked={data.checked}
                                              rightTextStyle={{marginLeft:0}}
                                              checkBoxColor= {colors.grey}
                                              rightTextView = {
                                                <View style={{flexDirection:'row',flex:1}}>
                                                  <Icon
                                                    name={this.state.defaultIcon}
                                                    type={this.state.iconType}
                                                    size={18}
                                                    color= {colors.button}
                                                    containerStyle = {{marginHorizontal:10}}
                                                  />
                                                   <Image 
                                                    source={require('../../images/water.png') }
                                                    style={{width: 25, height:25, marginRight:7}}
                                                  />
                                                  <Text style={styles.inputText}>{data.amenity}</Text>
                                                </View>

                                              }
                                              />

                                          :


                                           data.amenity==="Lift" ?
                                           <CheckBox
                                              key={index}
                                              style={{marginBottom:10}}
                                              onClick={() => this.handleOnClickInternal(index)}
                                              isChecked={data.checked}
                                              rightTextStyle={{marginLeft:0}}
                                              checkBoxColor= {colors.grey}
                                              rightTextView = {
                                                <View style={{flexDirection:'row',flex:1}}>
                                                  <Icon
                                                    name={this.state.defaultIcon}
                                                    type={this.state.iconType}
                                                    size={18}
                                                    color= {colors.button}
                                                    containerStyle = {{marginHorizontal:10}}
                                                  />
                                                   <Image 
                                                    source={require('../../images/lift.png') }
                                                    style={{width: 25, height:25, marginRight:7}}
                                                  />
                                                  <Text style={styles.inputText}>{data.amenity}</Text>
                                                </View>

                                              }
                                              />

                                          :

                                           data.amenity==="Power Backup" ?
                                            <CheckBox
                                                key={index}
                                                style={{marginBottom:10}}
                                                onClick={() => this.handleOnClickInternal(index)}
                                                isChecked={data.checked}
                                                rightTextStyle={{marginLeft:0}}
                                                checkBoxColor= {colors.grey}
                                                rightTextView = {
                                                  <View style={{flexDirection:'row',flex:1}}>
                                                    <Icon
                                                      name={this.state.defaultIcon}
                                                      type={this.state.iconType}
                                                      size={18}
                                                      color= {colors.button}
                                                      containerStyle = {{marginHorizontal:10}}
                                                    />
                                                     <Image 
                                                      source={require('../../images/powerBk.png') }
                                                      style={{width: 25, height:25, marginRight:7}}
                                                    />
                                                    <Text style={styles.inputText}>{data.amenity}</Text>
                                                  </View>

                                                }
                                                />

                                          :

                                           data.amenity==="Shopping Center" ?
                                             <CheckBox
                                                    key={index}
                                                    style={{marginBottom:10}}
                                                    onClick={() => this.handleOnClickInternal(index)}
                                                    isChecked={data.checked}
                                                    rightTextStyle={{marginLeft:0}}
                                                    checkBoxColor= {colors.grey}
                                                    rightTextView = {
                                                      <View style={{flexDirection:'row',flex:1}}>
                                                        <Icon
                                                          name={this.state.defaultIcon}
                                                          type={this.state.iconType}
                                                          size={18}
                                                          color= {colors.button}
                                                          containerStyle = {{marginHorizontal:10}}
                                                        />
                                                         <Image 
                                                          source={require('../../images/shopping.png') }
                                                          style={{width: 25, height:25, marginRight:7}}
                                                        />
                                                        <Text style={styles.inputText}>{data.amenity}</Text>
                                                      </View>

                                                    }
                                                    />


                                          :

                                          data.amenity==="Children's Play Area" ?
                                          <CheckBox
                                                key={index}
                                                style={{marginBottom:10}}
                                                onClick={() => this.handleOnClickInternal(index)}
                                                isChecked={data.checked}
                                                rightTextStyle={{marginLeft:0}}
                                                checkBoxColor= {colors.grey}
                                                rightTextView = {
                                                  <View style={{flexDirection:'row',flex:1}}>
                                                    <Icon
                                                      name={this.state.defaultIcon}
                                                      type={this.state.iconType}
                                                      size={18}
                                                      color= {colors.button}
                                                      containerStyle = {{marginHorizontal:10}}
                                                    />
                                                     <Image 
                                                      source={require('../../images/playArea.png') }
                                                      style={{width: 25, height:25, marginRight:7}}
                                                    />
                                                    <Text style={styles.inputText}>{data.amenity}</Text>
                                                  </View>

                                                }
                                                />

                                          :


                                          data.amenity==="Internal Gym" ?
                                          <CheckBox
                                            key={index}
                                            style={{marginBottom:10}}
                                            onClick={() => this.handleOnClickInternal(index)}
                                            isChecked={data.checked}
                                            rightTextStyle={{marginLeft:0}}
                                            checkBoxColor= {colors.grey}
                                            rightTextView = {
                                              <View style={{flexDirection:'row',flex:1}}>
                                                <Icon
                                                  name={this.state.defaultIcon}
                                                  type={this.state.iconType}
                                                  size={18}
                                                  color= {colors.button}
                                                  containerStyle = {{marginHorizontal:10}}
                                                />
                                                 <Image 
                                                  source={require('../../images/gym.png') }
                                                  style={{width: 25, height:25, marginRight:7}}
                                                />
                                                <Text style={styles.inputText}>{data.amenity}</Text>
                                              </View>

                                            }
                                            />

                                         :

                                         data.amenity==="Park" ?
                                          <CheckBox
                                              key={index}
                                              style={{marginBottom:10}}
                                              onClick={() => this.handleOnClickInternal(index)}
                                              isChecked={data.checked}
                                              rightTextStyle={{marginLeft:0}}
                                              checkBoxColor= {colors.grey}
                                              rightTextView = {
                                                <View style={{flexDirection:'row',flex:1}}>
                                                  <Icon
                                                    name={this.state.defaultIcon}
                                                    type={this.state.iconType}
                                                    size={18}
                                                    color= {colors.button}
                                                    containerStyle = {{marginHorizontal:10}}
                                                  />
                                                   <Image 
                                                    source={require('../../images/park.png') }
                                                    style={{width: 25, height:25, marginRight:7}}
                                                  />
                                                  <Text style={styles.inputText}>{data.amenity}</Text>
                                                </View>

                                              }
                                              />

                                          :


                                          data.amenity==="Internet Services" ?
                                           <CheckBox
                                            key={index}
                                            style={{marginBottom:10}}
                                            onClick={() => this.handleOnClickInternal(index)}
                                            isChecked={data.checked}
                                            rightTextStyle={{marginLeft:0}}
                                            checkBoxColor= {colors.grey}
                                            rightTextView = {
                                              <View style={{flexDirection:'row',flex:1}}>
                                                <Icon
                                                  name={this.state.defaultIcon}
                                                  type={this.state.iconType}
                                                  size={18}
                                                  color= {colors.button}
                                                  containerStyle = {{marginHorizontal:10}}
                                                />
                                                 <Image 
                                                  source={require('../../images/internet.png') }
                                                  style={{width: 25, height:25, marginRight:7}}
                                                />
                                                <Text style={styles.inputText}>{data.amenity}</Text>
                                              </View>

                                            }
                                            />

                                           :


                                           data.amenity==="Intercom" ?
                                            <CheckBox
                                            key={index}
                                            style={{marginBottom:10}}
                                            onClick={() => this.handleOnClickInternal(index)}
                                            isChecked={data.checked}
                                            rightTextStyle={{marginLeft:0}}
                                            checkBoxColor= {colors.grey}
                                            rightTextView = {
                                              <View style={{flexDirection:'row',flex:1}}>
                                                <Icon
                                                  name={this.state.defaultIcon}
                                                  type={this.state.iconType}
                                                  size={18}
                                                  color= {colors.button}
                                                  containerStyle = {{marginHorizontal:10}}
                                                />
                                                 <Image 
                                                  source={require('../../images/intercom.png') }
                                                  style={{width: 25, height:25, marginRight:7}}
                                                />
                                                <Text style={styles.inputText}>{data.amenity}</Text>
                                              </View>

                                            }
                                            />

                                          :*/

                                          <CheckBox
                                            key={index}
                                            style={{marginBottom:10}}
                                            onClick={() => this.handleOnClickInternal(index)}
                                            isChecked={data.checked}
                                            rightTextStyle={{marginLeft:0}}
                                            checkBoxColor= {colors.grey}
                                            rightTextView = {
                                              <View style={{flexDirection:'row',flex:1}}>
                                                <Icon
                                                  name={this.state.defaultIcon}
                                                  type={this.state.iconType}
                                                  size={18}
                                                  color= {colors.button}
                                                  containerStyle = {{marginHorizontal:10}}
                                                />
                                                 <Image 
                                                  source={require('../../images/flag.png') }
                                                  style={{width: 25, height:25, marginRight:7}}
                                                />
                                                <Text style={styles.inputText}>{data.amenity}</Text>
                                              </View>

                                            }
                                            />  

                                    }

                                   </React.Fragment> 

                                  ))
                                    :
                                    null
                                  }          
                                </View>

                            {/*end*/}
                      </View>
                    <View  style={[styles.marginBottom15,styles.nextBtnhover1]}  onPress={this.submitFun.bind(this)}>
                      <TouchableOpacity onPress={this.submitFun.bind(this)} style={[{width:'100%'}]}>
                         <Text style={[styles.buttonContainerNextBTN,{color:"#fff"}]}>Save & Next
                         </Text>
                      </TouchableOpacity>
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


