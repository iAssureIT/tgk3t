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
  StyleSheet,
  Platform
  // Picker
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
import Dialog                               from "react-native-dialog";
// import {Picker}                             from '@react-native-community/picker';
import RNPickerSelect                       from 'react-native-picker-select';


const window = Dimensions.get('window');
 
export default class PropertyDetails extends ValidationComponent{

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
    var obj  ={name : "Basement",value : "Basement"}
    var obj1 ={name : "Ground"  ,value : "Ground"}
    floorList.push(obj)
    floorList.push(obj1)
    for (var i=1;i<=60;i++){
        var obj2 ={
          name : i,
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
     
      furnishedIndex      : -1,
      workStationIndex    : -1,
      personalIndex       : -1,
      pantryIndex         : -1,
      furnishpantryIndex  : -1,
      yearsData : [ {label:"Under Construction", value: 'Under Construction',},
                    {label:"Newly Built", value: 'New',},
                    {label:"Less than 4 Years", value: '<4',},
                    {label:"4-8 Years", value: '4-8',},
                    {label:"8-12 Years", value: '8-12',},
                    {label:"Above 12 Years", value: '12',}],

      propertyFacingData : [{name:"East", value: 'East',},
                            {name:"West", value: 'West',},
                            {name:"North", value: 'North',},
                            {name:"South", value: 'South',},
                            {name:"Northeast", value: 'Northeast',},
                            {name:"Northwest", value: 'Northwest',},
                            {name:"Southeast", value: 'Southeast',},
                            {name:"Southwest", value: 'Southwest',},
                            {name:"Don't Know", value: "Don't Know",}],
      furnishedStatus : "",
      superArea       : '',
      builtupArea     : '',
      UnitData  : [{name:"Sq ft", value:"Sq ft"},
                  {name:"Sq Meter", value:"Sq Meter"},
                  {name:"Guntha", value:"Guntha"},
                  {name:"Acre", value:"Acre"},
                  {name:"Sq-Yrd", value:"Sq-Yrd"},
                  {name:"Bigha", value:"Bigha"},
                  {name:"Hectare", value:"Hectare"},
                  {name:"Marla", value:"Marla"},
                  {name:"Kanal", value:"Kanal"}],
      superAreaUnit     : 'Sq ft',
      builtupAreaUnit   : 'Sq ft',
      floorData         :floorList,
      totalFloorData    :totalFloorList,
      floor             : '',
      totalFloor        :'',

      furnishedStatus   :"",
      defaultIcon       :'flag',
      iconType          : 'material-community',
      isChecked         : true,
      btnLoading        : false,
      propertyType      : "",
      transactionType   : "",
      mobile            : '',
      propertyId        : "",
      uid               : "",
      token             : "",
      originalValues    : "",
      bedrooms          : "",
      balconies         : "",
      bathrooms         : "",
      personal          : "",
      washrooms         : "",
      furnishpantry     : "",
      workStation       : "",
      builtupAreaError  : "",
      superAreaError    : "",
      // originalValues:"",
      prevAmenities     : "",
      allAmenities      : [],
      floorError        : "",
      totalFloorError   : "",
      prevCharges       : [],
      selectAmenity     : false,
      checkArea         : false,
      checkFloor        : false,
      furnishedOptions    : [
          {name:"Directors Cabin",checked: false},
          {name:"Meeting Room",checked: false},
          {name:"Reception",checked: false},
        ],
      // uid:"",
      // token:"",
      // mobile:"",
      // propertyId:"",
      // propertyType:"",
      // transactionType:"",
      updateOperation: false,

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


  goBack() {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect({ selected: true });
  }

  validInput = () => {
    const {
      builtupArea,
      floor,
      totalFloor,
      superArea,
      bedrooms,
      balconies,
      bathrooms,
      washrooms,
      // furnishedStatus,
    } = this.state;
    let valid = true;

    if(this.state.propertyType === "Residential"){
        this.validate({
          builtupArea: {
            required: true,
            numbers: true,
          },
          superArea: {
            numbers: true,
          },
          floor: {
            required: true,
          },
          totalFloor: {
            required: true,
          },
          bedrooms: {
            required: true,
          },
          bathrooms: {
            required: true,
          },
          balconies: {
            required: true,
          }, 
          furnishedStatus: {
            required: true,
          },
        });
    }else{
      this.validate({
          builtupArea: {
            required: true,
            numbers: true,
          },
          superArea: {
            numbers: true,
          },
          floor: {
            required: true,
          },
          totalFloor: {
            required: true,
          },
          washrooms: {
            required: true,
          },
          furnishedStatus: {
            required: true,
          },
        });
    }
    

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
    if (this.isFieldInError("floor")) {
      this.setState({floorError: this.getErrorsInField("floor") });
      valid = false;
    } else {
      this.setState({ floorError: "" });
    }
    if (this.isFieldInError("totalFloor")) {
      this.setState({totalFloorError: this.getErrorsInField("totalFloor") });
      valid = false;
    } else {
      this.setState({ totalFloorError: "" });
    }
    if (this.isFieldInError("bedrooms")) {
      this.setState({bedroomsError: this.getErrorsInField("bedrooms") });
      valid = false;
    } else {
      this.setState({bedroomsError: "" });
    }
    if (this.isFieldInError("bathrooms")) {
      this.setState({bathroomsError: this.getErrorsInField("bathrooms") });
      valid = false;
    } else {
      this.setState({bathroomsError: "" });
    }
    if (this.isFieldInError("balconies")) {
      this.setState({balconiesError: this.getErrorsInField("balconies") });
      valid = false;
    } else {
      this.setState({balconiesError: "" });
    }
    if (this.isFieldInError("washrooms")) {
      this.setState({washroomsError: this.getErrorsInField("washrooms") });
      valid = false;
    } else {
      this.setState({washroomsError: "" });
    }
    if (this.isFieldInError("furnishedStatus")) {
      this.setState({furnishedStatusError: this.getErrorsInField("furnishedStatus") });
      valid = false;
    } else {
      this.setState({furnishedStatusError: "" });
    }
    return valid;
  };
 
  validInputField = (stateName, stateErr) => {
    const {
      builtupArea,
      floor,
      totalFloor,
      superArea,
      bedrooms,
      balconies,
      bathrooms,
      washrooms,
      furnishedStatus,
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

      // console.log("token basicinfo",token);
      // console.log("propertyId basicinfo",propertyId);
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
           // console.log("property_id in constructor property details",property_id);

          axios
          .get('/api/masteramenities/list')
          .then(
            (res)=>{
              // console.log('res postdata', res);
              const postsdata = res.data;
              // console.log('postsdata',postsdata);
              this.setState({
                allAmenities : postsdata,
              },()=>{
                     if(property_id!==null)
                              {
                                // console.log("here edit 2nd form");

                                   axios
                                    .get('/api/properties/'+property_id)
                                    .then( (response) =>{
                                      console.log("get property in property in details = ",response);
                                      // console.log("response.data.propertyDetails.furnishedStatus in property = ",response.data.propertyDetails.furnishedStatus);

                                      this.setState({
                                          originalValues  : response.data.propertyDetails,
                                          bedrooms        : response.data.propertyDetails.bedrooms,
                                          balconies       : response.data.propertyDetails.balconies,
                                          washrooms       : response.data.propertyDetails.washrooms,
                                          furnishedStatus : response.data.propertyDetails.furnishedStatus?response.data.propertyDetails.furnishedStatus:"Fully furnished",
                                          personal        : response.data.propertyDetails.personal,
                                          pantry          : response.data.propertyDetails.pantry,
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
                                          superAreaUnit   : response.data.propertyDetails.superAreaUnit ? response.data.propertyDetails.superAreaUnit : "Sq ft",
                                          builtupAreaUnit : response.data.propertyDetails.builtupAreaUnit ? response.data.propertyDetails.builtupAreaUnit : "Sq ft",
                                          prevCharges     : response.data.propertyDetails.furnishedOptions,
                                          workStation     : response.data.propertyDetails.workStation,
                                          furnishpantry   : response.data.propertyDetails.furnishPantry,

                                          /*----------------------------------------*/
                                          // originalValues  : response.data.propertyDetails,
                                          prevAmenities   : response.data.propertyDetails.Amenities,
                                          // updateOperation : response.data.propertyDetails.Amenities.length >0 ? true : false,
                             
                                        },()=>{
                                            // console.log("here ov furnishpantry",this.state.furnishpantry);
                                            console.log("floor====================>>>>>>>>>>>>>>>>>>>>>>>",this.state.floor);
                                            

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
                                                // console.log("here allAmenities in didmount after match result",this.state.allAmenities);
                                                });


                                            var furnishedOptionsData = this.state.furnishedOptions;
                                            var furnishedOptionsDataList = furnishedOptionsData.map((item,index)=>{
                                            var propPresent = this.state.prevCharges.find((obj)=>{
                                            return item.name === obj;
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
                                              furnishedOptions : furnishedOptionsDataList,
                                            },()=>{
                                              console.log("here furnishedOptions in didmount after match result",this.state.furnishedOptions);
                                              });



                                          if(this.state.furnishedStatus === "Semi furnished")
                                          {
                                            this.setState({furnishedIndex:1});
                                          }
                                          if(this.state.furnishedStatus === "Fully furnished")
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
                                      // console.log("selected index-----------------------------------------------------------------------------------------------------------------------",this.state.furnishpantryIndex);
                                    })
                                    .catch((error)=>{
                                          console.log("error = ",error);
                                          if(error.message === "Request failed with status code 401")
                                          {
                                              Alert.alert("Your session is expired!"," Please login again.");
                                              AsyncStorage.removeItem('fullName');
                                              AsyncStorage.removeItem('fullName');
                                              AsyncStorage.removeItem('token');
                                              this.navigateScreen('MobileScreen');  
                                          }
                                      });
                            }
                            /*if prop id close*/
                  });
              })
              .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                            Alert.alert("Your session is expired!"," Please login again.");
                            AsyncStorage.removeItem('fullName');
                            AsyncStorage.removeItem('fullName');
                            AsyncStorage.removeItem('token');
                            this.navigateScreen('MobileScreen');  
                        }
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
    },()=>{
      this.validInputField('furnishedStatus', 'furnishedStatusError');
    });
  }

  onWorkStation=(indexW,valueW)=>{
    this.setState({
    workStationIndex   : indexW,
    workStation : valueW,
    },()=>{
      // console.log("here data",this.state.workStation);
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
      // console.log("here index", indexF);
      // console.log("here valueF", valueF);
      this.setState({
      furnishpantryIndex : indexF,
      furnishpantry : valueF,
      },()=>{
        // console.log("here pantry data",this.state.furnishpantry);
    });
  }

  handleOnFurnish = (index)=>{
    // console.log("index",index);
    var alldata = this.state.furnishedOptions;
    var status = alldata[index].checked;
    if(status===true){
      alldata[index].checked = false;
    }else{
      alldata[index].checked = true;
    }
    this.setState({
      furnishedOptions: alldata,
    },()=>{  
      console.log("here new data of furnishedOptions",this.state.furnishedOptions);
    });
 }

 handleOnClickInternal = (index)=>{
    // console.log("index",index);
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

  handleCancel = () => {
    this.setState({
     selectAmenity:false,
     checkArea:false,
     checkFloor:false,
   });
  };

submitFun(){
  var ov = this.state.originalValues;

  // console.log("this.state.furnishpantryIndex",this.state.furnishpantryIndex)
  console.log("here state value============",this.state.furnishpantry);
  // console.log("here ov furnishPantry value",ov.furnishPantry);
  if (this.validInput()) {
    if(this.state.builtupArea.value!=="" &&
      this.state.floor!=="" &&  this.state.totalfloor!=="" ){
      if(this.state.updateOperation === true){
        // console.log("update fun");
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
            console.log("allAmenitiesDataList.length",allAmenitiesDataList.length);
            console.log("ov.Amenities.length",ov);

              if(allAmenitiesDataList.length !== ov.Amenities.length )
              {
                eqAmenity = false;
                 console.log("equal eqAmenity not",eqAmenity);
              }else{
                
                for (var i = 0; i < allAmenitiesDataList.length; i++)
                { 
                 console.log("all amenities",eqAmenity);

                      if (allAmenitiesDataList[i] !== ov.Amenities[i]){
                    eqAmenity = false;
                        }else{
                    eqAmenity = true;  
                        }
                   }
                    // console.log("equal yes eqAmenity but same",eqAmenity); 
              }

            // console.log("outside eqAmenity",eqAmenity);

            /*-----------------------------*/

            var furnishedOptionsData = this.state.furnishedOptions;
            var furnishedOptionsDataList =[];    
                  furnishedOptionsData.map((item,index)=>{
                    if(item.checked === true)
                    {
                      furnishedOptionsDataList.push(item.name);
                    }
                  })
                  var eq ="";
                  if(furnishedOptionsDataList.length !== this.state.furnishedOptions.length )
                  {
                    eq = true;
                     console.log("equal not",eq);
                  }else{
                   
                    for (var i = 0; i < furnishedOptionsDataList.length; i++)
                    {
                        if (furnishedOptionsDataList[i] !== ov.furnishedOptions[i]){
                        eq = false;
                            }else{
                        eq = true; 
                            }
                    }
                    console.log("equal yes but same",eq);
                  }
                  console.log("outside eq",eqAmenity);
              if(this.state.bedrooms === ov.bedrooms && this.state.balconies === ov.balconies && this.state.washrooms === ov.washrooms &&
                  this.state.furnishedStatus === ov.furnishedStatus && this.state.personal === ov.personal && this.state.pantry === ov.pantry &&
                   this.state.bathrooms === ov.bathrooms && this.state.ageofproperty === ov.ageofProperty && this.state.facing === ov.facing
                   && parseInt(this.state.superArea) === ov.superArea && this.state.builtupArea === ov.builtupArea &&
                    eqAmenity === true && eq === true && this.state.floor === ov.floor && this.state.totalFloor === ov.totalFloor && this.state.superAreaUnit === ov.superAreaUnit && this.state.builtupAreaUnit === ov.builtupAreaUnit && this.state.workStation === ov.workStation 
                   && this.state.furnishpantry === ov.furnishPantry )
                {
                    console.log("same data======================");
                   // this.navigateScreen('Amenities');
                    this.navigateScreen('FinancialDetails');

                   
                }else{
                    console.log("diff data=======================");
                    // console.log("allAmenities in result",this.state.allAmenities);
                    var allAmenitiesData = this.state.allAmenities;
                      var allAmenitiesDataList =[];     
                          allAmenitiesData.map((item,index)=>{
                            if(item.checked == true)
                            {
                              allAmenitiesDataList.push(item.amenity);
                            }
                          })


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
                            "superArea"         : this.state.superArea,
                            "builtupArea"       : this.state.builtupArea,
                            "property_id"       : this.state.propertyId,
                            "uid"               : this.state.uid,

                            "Amenities"         : allAmenitiesDataList,
                            "floor"             : this.state.floor,
                            "totalFloor"        : this.state.totalFloor,
                            "superAreaUnit"     : this.state.superAreaUnit,
                            "builtupAreaUnit"   : this.state.builtupAreaUnit,
                            "furnishPantry"       : this.state.furnishpantry,
                            "furnishedOptions"    : furnishedOptionsDataList,
                        }

                  if( this.state.furnishedIndex!=="" &&  this.state.builtupArea.value!=="" &&
                      this.state.floor!=="" &&  this.state.totalFloor!=="" ){
                    if(allAmenitiesDataList && allAmenitiesDataList.length >0){
                    console.log("formValues==================+++>>>>>>>>>>>>>.",formValues);
                            axios
                            .patch('/api/properties/patch/propertyDetails',formValues)
                            .then( (res) =>{
                              // console.log(res);
                              if(res.status === 200){
                                // console.log("PropertyDetails Res = ",res);

                                // this.navigateScreen('Amenities');
                                this.navigateScreen('FinancialDetails');

                              }
                            })
                            .catch((error)=>{
                                      console.log("error = ",error);
                                      if(error.message === "Request failed with status code 401")
                                      {
                                           //Alert.alert("Your session is expired!"," Please loginagain.");
                                          AsyncStorage.removeItem('fullName');
                                          AsyncStorage.removeItem('token');
                                          // this.props.navigation.navigate('MobileScreen'); 
                                      }
                               });

                          }else{
                                 this.setState({selectAmenity:true})
                          }
                       
                      }
                }

          }else{
            // console.log("submit func");
            var ov = this.state.originalValues;
              var allAmenitiesData = this.state.allAmenities;
                var allAmenitiesDataList =[];     
                allAmenitiesData.map((item,index)=>{
                  if(item.checked == true)
                  {
                    allAmenitiesDataList.push(item.amenity);
                  }
                })

              var furnishedOptionsData = this.state.furnishedOptions;
                  var furnishedOptionsDataList =[];    
                    furnishedOptionsData.map((item,index)=>{
                      if(item.checked == true)
                      {
                        furnishedOptionsDataList.push(item.name);
                      }
                    })
                      var eq = true;
                      if(furnishedOptionsDataList.length !== this.state.furnishedOptions.length )
                      {
                        eq = false;
                         // console.log("equal not",eq);
                      }else{
                        for (var i = 0; i < furnishedOptionsDataList.length; i++)
                        {
                                if (furnishedOptionsDataList[i] != this.state.furnishedOptions[i]){
                            eq = false;
                                }else{
                            eq = true; 
                                }
                           }
                            // console.log("equal yes but same",eq);
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
                        "superArea"         : this.state.superArea,
                        "builtupArea"       : this.state.builtupArea,
                        "property_id"       : this.state.propertyId,
                        "uid"               : this.state.uid,

                        "Amenities"         : allAmenitiesDataList,
                        "floor"             : this.state.floor,
                        "totalFloor"        : this.state.totalFloor,
                        "superAreaUnit"     : this.state.superAreaUnit,
                        "builtupAreaUnit"   : this.state.builtupAreaUnit,
                        "furnishPantry"       : this.state.furnishpantry,
                        "furnishedOptions"    : furnishedOptionsDataList,
                      };
                      console.log("formValues====>",formValues);

                        if( this.state.furnishedStatus!=="" && this.state.furnishedStatus!==undefined &&  this.state.builtupArea.value!=="" &&
                          this.state.floor!=="" &&  this.state.totalFloor!=="" ){
                          if(allAmenitiesDataList && allAmenitiesDataList.length >0){
                           axios
                          .patch('/api/properties/patch/propertyDetails',formValues)
                          .then( (res) =>{
                            // console.log(res);
                            if(res.status === 200){
                              // console.log("PropertyDetails Res = ",res);
                                this.navigateScreen('FinancialDetails');
                              
                             // this.navigateScreen('Amenities',{mobile:this.state.mobile,propertyType:this.state.propertyType,transactionType:this.state.transactionType,propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});

                            }
                          })
                          .catch((error)=>{
                                      console.log("error = ",error);
                                      if(error.message === "Request failed with status code 401")
                                      {
                                 //        Alert.alert("Your session is expired!"," Please login again.");
                                          AsyncStorage.removeItem('fullName');
                                          AsyncStorage.removeItem('fullName');
                                          AsyncStorage.removeItem('token');
                                 // this.props.navigation.navigate('MobileScreen');         
                                     }
                               });
                            }else{
                                 this.setState({selectAmenity:true})
                              }

                       }

                }
              } 
          }
  }

  totalFloor(){
      const floorValue      = parseInt(this.state.floor);
      const totalfloorValue = parseInt(this.state.totalFloor);
      if(floorValue > totalfloorValue){
        this.setState({
          floor : "",
          checkFloor : true,
        })
      }
  }

  builtArea(){
    var builtAreaValue=parseInt(this.state.builtupArea);
    var superAreaValue=parseInt(this.state.superArea);
    // console.log("builtArea",builtAreaValue);
    // console.log("superArea",superAreaValue);
    if(builtAreaValue >= superAreaValue){
      this.setState({
        builtupArea : "",
        checkArea   : true
      })
    }
  }

  render(){
   
    const placeholderAgeOfProp = {
      label: 'Years old',
      value: null,
      color: '#9EA0A4',
    };

    console.log("this.state.superArea",this.state.superArea);

    const { navigation } = this.props;
    let {activeTab} = this.state;
    return (
       <React.Fragment>
           <HeaderBar showBackBtn={false} navigation={navigation}/>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
              <KeyboardAwareScrollView>   
                <View style={styles.formWrapper}>
                  <View>
                    <Text style={styles.heading}>
                     Please provide details of your property
                    </Text>
                  </View>

                  <View style={styles.divider}></View>

                  <Text style={[styles.heading2,styles.marginBottom15]}>My Property is on</Text>
                  <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                    <View style={{width:'46%'}}>
                      <View style={[styles.inputWrapper2,{height:40,width:'100%'}]}>
                        <View style={styles.inputImgWrapper2}>
                          <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                        </View>
                        <View style={styles.inputTextWrapper2}>
                         <Dropdown
                          label               ='Floors'
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
                          onChangeText        = {floor => {this.setState({floor},() => { this.validInputField('floor', 'floorError'); })}}
                          onBlur              = {this.totalFloor()}
                        />
                        </View>
                      </View>
                      {this.displayValidationError('floorError')}
                    </View>
                    <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                      <Text>OF</Text>
                    </View>
                      <View style={{width:'46%'}}>
                        <View style={[styles.inputWrapper2,{height:40,width:'100%'}]}>
                          <View style={styles.inputImgWrapper2}>
                            <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                          </View>
                          <View style={[styles.inputTextWrapper2]}>
                            <Dropdown
                            label               = "Total Floors"
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
                            onChangeText        = {totalFloor => {this.setState({totalFloor},() => { this.validInputField('totalFloor', 'totalFloorError'); })}}
                            onBlur              = {()=>this.totalFloor()}
                            />
                          </View>
                      </View>
                      {this.displayValidationError('totalFloorError')}
                    </View>
                  </View> 
                  {this.state.propertyType !== "Commercial" ?

                  <View>
                      <Text style={[styles.heading2,styles.marginBottom15]}>My Property has</Text>
                      <View style={[styles.marginBottom25]}>  
                        <View style={[styles.inputWrapper]}>
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
                              labelHeight         = {5}
                              tintColor           = {colors.button}
                              labelFontSize       = {sizes.label}
                              fontSize            = {15}
                              baseColor           = {'#666'}
                              textColor           = {'#333'}
                              labelTextStyle      = {styles.ddLabelText}
                              style               = {styles.ddStyle}
                              data                = {this.state.bedroomData}
                              value               = {this.state.bedrooms}
                              onChangeText        = {bedrooms => {this.setState({bedrooms},() => { this.validInputField('bedrooms', 'bedroomsError'); })}}
                            />
                          </View>
                        </View>
                        {this.displayValidationError('bedroomsError')}
                      </View>

                      <View style={[styles.marginBottom25]}>  
                        <View style={[styles.inputWrapper]}>
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
                              labelHeight         = {5}
                              tintColor           = {colors.button}
                              labelFontSize       = {sizes.label}
                              fontSize            = {15}
                              baseColor           = {'#666'}
                              textColor           = {'#333'}
                              labelTextStyle      = {styles.ddLabelText}
                              style               = {styles.ddStyle}
                              data                = {this.state.balconieData}
                              value               = {this.state.balconies}
                              onChangeText        = {balconies => {this.setState({balconies},() => { this.validInputField('balconies', 'balconiesError'); })}}
                            />
                          </View>
                        </View>
                        {this.displayValidationError('balconiesError')}
                      </View>

                      <View style={[styles.marginBottom25]}>  
                        <View style={[styles.inputWrapper]}>
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
                              labelHeight         = {5}
                              tintColor           = {colors.button}
                              labelFontSize       = {sizes.label}
                              fontSize            = {15}
                              baseColor           = {'#666'}
                              textColor           = {'#333'}
                              labelTextStyle      = {styles.ddLabelText}
                              style               = {styles.ddStyle}
                              data                = {this.state.bathroomData}
                              value               = {this.state.bathrooms}
                              onChangeText        = {bathrooms => {this.setState({bathrooms},() => { this.validInputField('bathrooms', 'bathroomsError'); })}}
                            />
                          </View>
                        </View>
                        {this.displayValidationError('bathroomsError')}
                      </View>  
                  </View>

                  :
                    <View>
                      {/*washrooms*/}
                      <Text style={[styles.heading2,styles.marginBottom15]}>My Property has</Text>
                      <View style={[styles.marginBottom25]}>  
                        <View style={[styles.inputWrapper]}>
                          <View style={styles.inputImgWrapper}>
                            <Icon name="bath" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                          </View>
                          <View style={styles.inputTextWrapper}>
                            <Dropdown
                              label               = 'Washrooms'
                              containerStyle      = {styles.ddContainer}
                              dropdownOffset      = {{top:0, left: 0}}
                              labelTextStyle       = {styles.ddItemText}
                              inputContainerStyle = {styles.ddInputContainer}
                              labelHeight         = {5}
                              tintColor           = {colors.button}
                              labelFontSize       = {sizes.label}
                              fontSize            = {15}
                              baseColor           = {'#666'}
                              textColor           = {'#333'}
                              labelTextStyle      = {styles.ddLabelText}
                              style               = {styles.ddStyle}
                              data                = {this.state.washroomData}
                              value               = {this.state.washrooms}
                               onChangeText        = {washrooms => {this.setState({washrooms},() => { this.validInputField('washrooms', 'washroomsError'); })}}
                              />
                            </View>
                          </View>
                          {this.displayValidationError('washroomsError')}
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
                  <Text style={[styles.heading2,styles.marginBottom5]}>It is </Text>
                  <View style={[styles.marginBottom15,{width:'100%'}]}>
                 
                    <RadioGroup
                      size={20}
                      color={colors.grey}
                      style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}
                      thickness={2}
                      selectedIndex = {this.state.furnishedIndex}
                      onSelect = {(index, value) => this.onSelectFurnishStatus(index, value)}
                    >
                      <RadioButton style={{paddingHorizontal:0,paddingTop:0,marginTop:10}} value={'Fully furnished'} >
                        <Text style={[styles.inputTextSmall,]}>Fully furnished</Text>
                      </RadioButton>

                      <RadioButton style={Platform.OS==='ios' ? {paddingHorizontal:0,marginLeft:5}:{paddingHorizontal:0,marginLeft:10}} value={'Semi furnished'}>
                        <Text style={styles.inputTextSmall}>Semi furnished</Text>
                      </RadioButton>

                      <RadioButton style={Platform.OS==='ios' ? {paddingHorizontal:0,marginLeft:5} : {paddingHorizontal:0,marginLeft:0}} value={'Unfurnished'}>
                        <Text style={styles.inputTextSmall}>Unfurnished</Text>
                      </RadioButton>
                    </RadioGroup>
                    {this. displayValidationError('furnishedStatusError')}
                  </View>
                   {(this.state.furnishedStatus==="Fully furnished" && this.state.propertyType === "Commercial") || (this.state.furnishedStatus==="Semi furnished" && this.state.propertyType ==="Commercial" ) ?
                       <View style={[styles.marginBottom15,{}]}>
                          {this.state.furnishedOptions && this.state.furnishedOptions.length >0 ?
                            this.state.furnishedOptions.map((data,index)=>(

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
                                    <Text style={styles.inputText}>{data.name}</Text>
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

                       {(this.state.furnishedStatus==="Fully furnished" && this.state.propertyType === "Commercial") || (this.state.furnishedStatus==="Semi furnished" && this.state.propertyType ==="Commercial" ) ?
                         

                        <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom15]}>
                            <View style={[{width:'46%'}]}>
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
                        </View>


                        /*end here*/



                            :
                            null
                          }

                             {/*here ends*/}

                            <Text style={[styles.heading2,styles.marginBottom15]}>It is (optional)</Text>
                            <View style={[styles.inputWrapper,styles.marginBottom25]}>
                              <View style={styles.inputImgWrapper}>
                                <Icon name="home" type="feather" size={18}  color="#aaa" style={{}}/>
                              </View>
                              <View style={styles.inputTextWrapper}>
                                {/*<Dropdown
                                  label               = 'Years old'
                                  containerStyle      = {styles.ddContainer}
                                  dropdownOffset      = {{top:0, left: 0}}
                                  itemTextStyle       = {styles.ddItemText}
                                  inputContainerStyle = {styles.ddInputContainer}
                                  labelHeight         = {5}
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
                                />*/}
                                {<RNPickerSelect
                                onValueChange={value => {this.setState({ageofproperty:value});}}
                                value                       = {this.state.ageofproperty}
                                style                       = {pickerSelectStyles}
                                placeholder                 = {placeholderAgeOfProp}
                                items                       = {this.state.yearsData.length>0 ? this.state.yearsData : null }
                                useNativeAndroidPickerStyle = {false}
                                />}
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
                                  labelHeight         = {5}
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
                              <Text style={[styles.heading2,styles.marginBottom5]}>Super Area {this.state.superArea}(optional)</Text>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}>
                                  <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                                </View>
                                <View style={styles.inputTextWrapper68}>
                                  <TextInput
                                    placeholder           = "Enter Super Area"
                                    onChangeText          = {superArea => {this.setState({superArea},() => { this.validInputField('superArea', 'superAreaError'); })}}
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
                                    style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular",paddingHorizontal: 5}]}
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
                                    labelHeight         = {5}
                                    tintColor           = {colors.button}
                                    labelFontSize       = {sizes.label}
                                    fontSize            = {15}
                                    baseColor           = {'#666'}
                                    textColor           = {'#333'}
                                    labelTextStyle      = {styles.ddnlabelTextFull}
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
                             <Text style={[styles.heading2,styles.marginBottom5]}>Built-up Area</Text>
                              <View style={[styles.inputWrapper]}>
                                <View style={styles.inputImgWrapper}>
                                  <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                                </View>
                                <View style={styles.inputTextWrapper68}>
                                  <TextInput
                                    placeholder           = "Enter Built-up Area"
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
                                    style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular",paddingHorizontal: 5}]}
                                    labelTextStyle        = {styles.textlabel}
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
                                    labelHeight         = {5}
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




                              <View style={styles.amenitiesWrapper} >
                                  <Text style={[styles.heading3,styles.marginBottom5,{fontWeight:"bold"}]}> All Amenities</Text>           
                                  {/*console.log("here amenity",this.state.allAmenities)*/}
                                   { this.state.allAmenities && this.state.allAmenities.length >0 
                                    ?
                                    this.state.allAmenities.map((data,index)=>(
                                    <View key={index} >
                                     
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
                                           
                                             <Image 
                                              source={require('../../images/ac.png') }
                                              style={{width: 25, height:25, marginRight:7}}
                                            />
                                            <Text style={styles.inputText}>{data.amenity}</Text>
                                          </View>

                                        }
                                        />

                                        :


                                        data.amenity==="Swimming Pool" ?
                                         <CheckBox
                                            key={index}
                                            style={{marginBottom:10}}
                                            onClick={() => this.handleOnClickInternal(index)}
                                            isChecked={data.checked}
                                            rightTextStyle={{marginLeft:0}}
                                            checkBoxColor= {colors.grey}
                                            rightTextView = {
                                              <View style={{flexDirection:'row',flex:1}}>
                                                
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
                                               
                                                 <Image 
                                                  source={require('../../images/intercom.png') }
                                                  style={{width: 25, height:25, marginRight:7}}
                                                />
                                                <Text style={styles.inputText}>{data.amenity}</Text>
                                              </View>

                                            }
                                            />

                                          :

                                          <CheckBox
                                            key={index}
                                            style={{marginBottom:10}}
                                            onClick={() => this.handleOnClickInternal(index)}
                                            isChecked={data.checked}
                                            rightTextStyle={{marginLeft:0}}
                                            checkBoxColor= {colors.grey}
                                            rightTextView = {
                                              <View style={{flexDirection:'row',flex:1}}>
                                              
                                                 <Image 
                                                  source={require('../../images/flag.png') }
                                                  style={{width: 25, height:25, marginRight:7}}
                                                />
                                                <Text style={styles.inputText}>{data.amenity}</Text>
                                              </View>

                                            }
                                            />  

                                    }

                                   </View> 

                                  ))
                                    :
                                    null
                                  }          
                                </View>

                            {/*end*/}
                      </View>
                     <View style={[{flexDirection:"row"},styles.marginBottom45]}>
                        <Button
                            onPress={()=> this.props.navigation.dispatch(NavigationActions.back())}
                            titleStyle      = {styles.buttonText}
                            title           = "Back"
                            buttonStyle     = {[styles.button,{ backgroundColor:"#d9534f"}]}
                            containerStyle  = {[styles.nextBtnhover2,styles.marginBottom15]}
                            iconLeft
                            icon = {<Icon
                            name="chevrons-left" 
                            type="feather"
                            size={22}
                            color="white"
                            />}
                        />

                        <Button
                            onPress         = {this.submitFun.bind(this)}
                            titleStyle      = {styles.buttonText}
                            title           = "Save & Next"
                            buttonStyle     = {styles.button}
                            containerStyle  = {[styles.nextBtnhover3,styles.marginBottom15]}
                            iconRight
                            icon = {<Icon
                            name="chevrons-right" 
                            type="feather"
                            size={22}
                            color="white"
                            />}
                        />
                    </View> 
                  </KeyboardAwareScrollView>
                </ScrollView>
                 <Dialog.Container visible={this.state.selectAmenity}>
                  <Dialog.Title>Please select atleast one amenity</Dialog.Title>
                  <Dialog.Button label="Ok" onPress={this.handleCancel} />
                </Dialog.Container>
                <Dialog.Container visible={this.state.checkFloor}>
                  <Dialog.Title>Floor should not be greater than Total Floors</Dialog.Title>
                  <Dialog.Button label="Ok" onPress={this.handleCancel} />
                </Dialog.Container>
                <Dialog.Container visible={this.state.checkArea}>
                  <Dialog.Title>Built Up Area should not be greater than Super Area</Dialog.Title>
                  <Dialog.Button label="Ok" onPress={this.handleCancel} />
                </Dialog.Container>
          </React.Fragment>
        );
       
      }
    }
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    fontFamily:"Roboto-Regular",
    height:40,
    flex: 1,  
    alignItems: 'center',  
    justifyContent: 'center',  
    color: '#333',
    paddingHorizontal:5
  },
  inputAndroid: {
    fontSize: 15,
    fontFamily:"Roboto-Regular",
    height:40,
    flex: 1,  
    alignItems: 'center',  
    justifyContent: 'center',  
    color: '#333',
  },
});

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
    numbers        : /^[0-9\s]*$/,
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


