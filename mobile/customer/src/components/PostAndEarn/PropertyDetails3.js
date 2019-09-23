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
import axios          from 'axios';
import { Button,Icon, SearchBar } from 'react-native-elements';
import CheckBox from 'react-native-check-box'

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from "react-native-datepicker";

const window = Dimensions.get('window');

export default class PropertyDetails3 extends ValidationComponent{
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
      
      furnishedIndex : 0,
      workStationIndex : 0,
      personalIndex  : 0,
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
      furnishedstatus : "fullFurnished",
      superArea : '',
      builtupArea : '',
      UnitData  : [{label:"Sq ft", value:"Sq ft"},
                  {label:"Sq Meter", value:"Sq Meter"},
                  {label:"Guntha", value:"Guntha"},
                  {label:"Acre", value:"Acre"},
                  {label:"Sq-Yrd", value:"Sq-Yrd"},
                  {label:"Bigha", value:"Bigha"},
                  {label:"Hectare", value:"Hectare"},
                  {label:"Marla", value:"Marla"},
                  {label:"Kanal", value:"Kanal"}],
      superAreaUnit : 'Sq ft',
      builtupAreaUnit : 'Sq ft',
      floorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      totalFloorData :[{label:'1', value : '1'},{label:'2', value:'2'}],
      floor: 'Basement',
      totalFloor:'Total Floors',


      defaultIcon:'flag',
      iconType: 'material-community',
      allAmenities:[],
      isChecked: true,
      btnLoading : false,

      furnishItem : [{label: 'Directors Cabin',checked: false},
                     {label: 'Meeting Room',checked: false},
                     {label: 'Reception',checked: false}],
      propertyType : "",
      transactionType : "",
      mobile : '',
      propertyId : "",
      uid : "",
      token : "",
     /* expectedRate : '',
      totalAsk : '',
      totalAskIndex : 0,
      availableFromDate : '',
      dropdownData:[
      {
        value: 'Monthly'
      },
      {
        value: 'Yearly'
      }]*/
    };
  }


  onSelectFurnishStatus=(index,value)=>{
    console.log("here value",value);
    this.setState({
      furnishedIndex: index,
      furnishedstatus : value,
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
   componentDidMount(){
      var token = this.props.navigation.getParam('token','No token');
      // console.log("token",token);
      var uid = this.props.navigation.getParam('uid','No uid');
      // console.log("uid",uid);
      var propertyId = this.props.navigation.getParam('propertyId','No propertyId');
      // console.log("propertyId",propertyId);
      var propertyType = this.props.navigation.getParam('propertyType','No propertyType');
      // console.log("propertyType",propertyType);
        var mobile = this.props.navigation.getParam('mobile','No mobile'); 
    // console.log("mobile in otpscreen",mobile);
      var transactionType = this.props.navigation.getParam('transactionType','No transactionType');


      axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

      this.setState({
        token : token,
        uid   : uid,
        propertyId : propertyId,
        propertyType : propertyType,
        transactionType : transactionType,
        mobile:mobile,
      });

    axios
      .get('/api/masteramenities/list')
      .then(
        (res)=>{
          console.log('res postdata', res);
          const postsdata = res.data;
          // console.log('postsdata',postsdata);
          this.setState({
            allAmenities : postsdata,
          },()=>{
            // console.log("data from admin side",this.state.allAmenities);
            var allAmenitiesDataList = this.state.allAmenities.map((item,index)=>{

              var newObj = Object.assign({},item);
                if(item.amenity){
                  newObj.checked = false
                }else{
                  newObj.checked = true
                }
                // console.log("newObj",newObj);
                return newObj;

            });

            this.setState({
              allAmenities:allAmenitiesDataList,
            });
          });
        }
      )
      .catch((error)=>{

        console.log("error = ",error);
        alert("Something went wrong! Please check Get URL.");
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
    },()=>{
      console.log("here new data of amenities",this.state.allAmenities);
    });

    console.log("current data status",status);

  }

  handleOnFurnish = (index)=>{

     console.log("index",index);
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
      console.log("here new data of furnishItem",this.state.furnishItem);
    });
    console.log("current data status",status);
  }

  submitFun(){
    // this.setState({
    //   btnLoading : true,
    // })

     var allAmenitiesData = this.state.allAmenities;
        var allAmenitiesDataList =[];     
            allAmenitiesData.map((item,index)=>{
              if(item.checked == true)
              {
               allAmenitiesDataList.push(item.label);
              }
            })

    console.log("here btn pressed");
     const formValues = {
      
          // "unit1"             : this.state.unit1,
          // "unit2"             : this.state.unit2,
          "bedrooms"          : this.state.bedrooms,
          "balconies"         : this.state.balconies,
          "washrooms"         : this.state.washrooms,
          "furnishedStatus"   : this.state.furnishedstatus,
          // all radio
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
          "totalFloor"        : this.state.totalfloor,
          "superAreaUnit"     : this.state.superAreaUnit,
          "builtupAreaUnit"   : this.state.builtupAreaUnit,
          "furnishPantry"       : this.state.furnishpantry, 
            // checkbox
          //     "furnishedOptions"    : furnishedOptionsDataList,

      };
      console.log("formValues",formValues);
      // this.props.navigation.navigate('PropertyDetails5',{transactionType:this.state.transactionType,propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});
      
             axios
            .patch('/api/properties/patch/propertyDetails',formValues)
            .then( (res) =>{
              console.log(res);
              if(res.status === 200){
                console.log("PropertyDetails Res = ",res);
               this.props.navigation.navigate('PropertyDetails5',{mobile:this.state.mobile,propertyType:this.state.propertyType,transactionType:this.state.transactionType,propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});

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

  render(){
   
    const { navigation } = this.props;
    let {activeTab} = this.state;

    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
               Let's provide details of your property
              </Text>
            </View>

            <View style={styles.divider}></View>

              <Text style={[styles.heading2,styles.marginBottom15]}>My Property is on</Text>
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
             

            <Text style={[styles.heading2,styles.marginBottom15]}>It is</Text>
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

             {(this.state.furnishedstatus==="fullFurnished" && this.state.propertyType === "Commercial") || (this.state.furnishedstatus==="semiFurnished" && this.state.propertyType ==="Commercial" ) ?
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

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={[styles.inputTextWrapper68,{}]}>
                <TextField
                  label                 = "Super Area"
                  onChangeText          = {superArea => {this.setState({superArea})}}
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
                  label                 = "Built Area"
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

            {/*end*/}

             <View>
              <Text style={styles.heading}>
                My Apartment has following Amenities
              </Text>
            </View>

            <View style={styles.divider}></View>

            <Text style={[styles.heading3,styles.marginBottom5]}>All Amenities </Text>

            <View style={[styles.marginBottom15,{}]}>
              {this.state.allAmenities && this.state.allAmenities.length >0 ?
                this.state.allAmenities.map((data,index)=>(
                <React.Fragment key={index}>
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
                        <Text style={styles.inputText}>{data.amenity}</Text>
                      </View>
                    }
                  />
               
                </React.Fragment> 
              ))
                :
                null
              }
            </View>

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

             {/*this.state.btnLoading
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
                    onPress         = {this.submitFun.bind(this)}
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
                */}
          </View>
        </ScrollView>
     
      </React.Fragment>
    );
   
  }
}