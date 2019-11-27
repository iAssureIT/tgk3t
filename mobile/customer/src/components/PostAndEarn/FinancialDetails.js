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
  Alert
} from 'react-native';

import { Button,Icon, SearchBar }          from 'react-native-elements';
import axios                               from 'axios';
import CheckBox                            from 'react-native-check-box'
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage                        from '@react-native-community/async-storage';

import ValidationComponent                 from "react-native-form-validator";
import { TextField }                       from 'react-native-material-textfield';
import {RadioGroup, RadioButton}           from 'react-native-flexi-radio-button';

import HeaderBar                           from '../../layouts/HeaderBar/HeaderBar.js';
import styles                              from './styles.js';
import {colors,sizes}                      from '../../config/styles.js';
import { Dropdown }                        from 'react-native-material-dropdown';
import DatePicker                          from "react-native-datepicker";
import { KeyboardAwareScrollView }         from 'react-native-keyboard-aware-scroll-view';
import NumberFormat                        from 'react-number-format';
const window = Dimensions.get('window');



export default class FinancialDetails extends ValidationComponent{

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
      superArea     : '',
      builtArea     : '',
      expectedRate  : '',
      totalPrice    : '',
      totalAskIndex : 0,
      availableFromDate : '',
      description   :"",
      dropdownData:[
      {
        value: 'Month'
      },
      {
        value: 'Year'
      }],
       UnitData  : [
                    {label:"/Sq ft", value:"/Sq ft"},
                    {label:"/Sq Meter", value:"/Sq Meter"},
                    {label:"/Guntha", value:"/Guntha"},
                    {label:"/Acre", value:"/Acre"},
                    {label:"/Sq-Yrd", value:"/Sq-Yrd"},
                    {label:"/Bigha", value:"/Bigha"},
                    {label:"/Hectare", value:"/Hectare"},
                    {label:"/Marla", value:"/Marla"},
                    {label:"/Kanal", value:"/Kanal"}
                  ],
      measurementUnit           : '/Sq ft',
      uid                       : "",
      token                     : '',
      propertyId                : "",
      transactionType           : '',
      propertyType              : '',
      totalAskItem              : [
                                      {label: 'Car Park',checked: false},
                                      {label: 'One Time Maintenance',checked: false},
                                      {label: 'Stamp Duty & Registration',checked: false},
                                      {label: 'Club House',checked: false}
                                  ],
      mobile                    : "",
      expectedRateError         : "",
      totalPriceError           : "",
      monthlyRentError          : "",
      maintenanceChargesError   : "",
      monthlyRent               :"",
      maintenanceCharges        : "0",
      updateOperation           : false,

    };

  }

  onSelect=(index,value)=>{
    this.setState({
      totalAskIndex: index,
    });
  }

  componentDidMount(){
    this._retrieveData();
  }

 componentWillReceiveProps(nextProps){
    this._retrieveData();
  }

  validInput = () => {
    const {
      totalPrice,
      maintenanceCharges,
      expectedRate,
      monthlyRent,
    } = this.state;
    let valid = true;


    if(this.state.transactionType==="Sell"){
      this.validate({
        totalPrice: {
          required: true,
          numbers: true,
        },
        expectedRate: {
          required: true,
          numbers: true,
        },
        maintenanceCharges: {
          required: true,
          numbers: true,
        },
      });
    }else{
      this.validate({
        monthlyRent: {
          required: true,
          numbers: true,
        },
        maintenanceCharges: {
          required: true,
          numbers: true,
        },
      });
    }
      

    if (this.isFieldInError("totalPrice") && this.state.transactionType === "Sell") {
      this.setState({ totalPriceError: this.getErrorsInField("totalPrice") });
      valid = false;
    } else {
      this.setState({ totalPriceError: "" });
    }
    if (this.isFieldInError("monthlyRent") && this.state.transactionType === "Rent") {
      this.setState({ monthlyRentError: this.getErrorsInField("monthlyRent") });
      valid = false;
    } else {
      this.setState({ monthlyRentError: "" });
    }
    if (this.isFieldInError("expectedRate") && this.state.transactionType === "Sell") {
      this.setState({ expectedRateError: this.getErrorsInField("expectedRate") });
      valid = false;
    } else {
      this.setState({ expectedRateError: "" });
    }
    if (this.isFieldInError("maintenanceCharges")) {
      this.setState({ maintenanceChargesError: this.getErrorsInField("maintenanceCharges") });
      valid = false;
    } else {
      this.setState({ maintenanceChargesError: "" });
    }
    return valid;
  };
  
  validInputField = (stateName, stateErr) => {
    const {
      totalPrice,
      maintenanceCharges,
      expectedRate,
      monthlyRent,
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
              if(property_id!==null)
              {
                // console.log("here edit 3rd form");
                  axios
                  .get('/api/properties/'+property_id)
                  .then( (response) =>{
                    console.log("get property in financial = ",response);

                    this.setState({
                       originalValues     : response.data.financial,
                       expectedRate       : response.data.financial.expectedRate ? response.data.financial.expectedRate.toString() : "",
                       totalPrice         : response.data.financial.totalPrice ? response.data.financial.totalPrice.toString() : "",
                       monthlyRent        : response.data.financial.monthlyRent ? response.data.financial.monthlyRent.toString() : "",
                       depositAmount      : response.data.financial.depositAmount ? response.data.financial.depositAmount.toString() : "",
                       prevCharges        : response.data.financial.includeCharges,
                       updateOperation    : true,
                       // startDate          : availableFrom,
                       description        : response.data.financial.description ? response.data.financial.description :"",
                       maintenanceCharges : response.data.financial.maintenanceCharges ? response.data.financial.maintenanceCharges.toString() : "0" ,
                       maintenancePer     : response.data.financial.maintenancePer ? response.data.financial.maintenancePer : "Month",
                       measurementUnit    : response.data.financial.measurementUnit ? response.data.financial.measurementUnit : this.state.measurementUnit,
                       availableFrom      : response.data.financial.availableFrom? response.data.financial.availableFrom.split('/').join('-'): "",

                      },()=>{
                        // console.log("prev charge",this.state.prevCharges);
                        var address = response.data.propertyLocation.society+", "+response.data.propertyLocation.subArea+", "+response.data.propertyLocation.area+", "+response.data.propertyLocation.city;
                         console.log("response.data.propertyDetails.Amenities=============>",response.data.financial.description);
                        if(response.data.propertyDetails.Amenities && response.data.propertyDetails.Amenities.length > 0){
                         var amenities =  response.data.propertyDetails.Amenities.map((amenities,index)=>{
                              var space = " ";
                              var i = index;
                              if(index > (response.data.propertyDetails.Amenities.length-1) ){
                                space = "";
                              }
                              return ""+space+amenities;
                            })
                        }
                        if(this.state.description === ""){
                          this.setState({
                            description : response.data.propertyDetails.bedrooms + ' BHK beautiful, tastefully decorated and well maintained flat with '+response.data.propertyDetails.bathrooms+' attached bathrooms located in '+address+'. The society is gated, extremely safe and boasts a number of key amenities like '+amenities+'. Well connected to main city areas such as Koregaon Park, Kalyani Nagar by road.This society gets uninterrupted electricity, water and piped gas supply.'
                          })
                        }
                          
                        var includeCharges = this.state.totalAskItem;
                          // console.log("here includeCharges", includeCharges);
                          var includeChargesList = includeCharges.map((item,index)=>{
                            var propPresent = this.state.prevCharges.find((obj)=>{
                              return item.label === obj
                            })
                            // console.log("here propPresent ", propPresent);
                            var newObj = Object.assign({},item);
                            if(propPresent){
                              newObj.checked = true
                            }else{
                              newObj.checked = false
                            }
                            return newObj;

                         })

                          this.setState({
                            totalAskItem : includeChargesList,
                          },()=>{
                            // console.log("here totalAskItem in didmount after match result",this.state.totalAskItem);

                          });

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

  } catch (error) {
      // Error retrieving data
    }
  }
submitFun(){
  if(this.validInput()) {
    console.log("Inside validinput",this.validInput())
   // console.log("here btn pressed");
    if( this.state.totalPrice!="" || this.state.monthlyRent!="" )
    {
    
      // console.log("Inside validinput")
      if(this.state.updateOperation!=true){
         // var includeChargesData = this.state.includeCharges;
         //  var includeChargesDataList =[];     
         //      includeChargesData.map((item,index)=>{
         //        if(item.checked == true)
         //        {
         //          includeChargesDataList.push(item.name);
         //        }
         //      })

        var totalAskItemData = this.state.totalAskItem;
        var totalAskItemDataList =[];     
        totalAskItemData.map((item,index)=>{
          if(item.checked == true)
          {
            totalAskItemDataList.push(item.label);
          }
        })


        const formValues = {
          "expectedRate"        : parseInt(this.state.expectedRate),
          "totalPrice"          : parseInt(this.state.totalPrice),
          "monthlyRent"         : parseInt(this.state.monthlyRent),
          "depositAmount"       : parseInt(this.state.depositAmount),
          "includeCharges"      : totalAskItemDataList,
          "description"         : this.state.description,
          "availableFrom"       : this.state.availableFrom.split('/').join('-'),
          "maintenanceCharges"  : parseInt(this.state.maintenanceCharges),
          "maintenancePer"      : this.state.maintenancePer,
          "measurementUnit"     : this.state.measurementUnit,  
          "property_id"         : this.state.propertyId,
          "uid"                 : this.state.uid,
        };

         console.log("Financials formValues",formValues);
           axios
          .patch('/api/properties/patch/financials',formValues)
          .then( (res) =>{
            // console.log("Financials res = ",res);
            if(res.status === 200){
           this.navigateScreen('Availability',{mobile:this.state.mobile,propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});
            }
          })
         .catch((error)=>{
              console.log("error = ",error);
              if(error.message === "Request failed with status code 401")
              {
                   //Alert.alert("Your session is expired!"," Please login again.");
                    AsyncStorage.removeItem('fullName');
                    AsyncStorage.removeItem('token');
                   // this.navigateScreen('MobileScreen');          
                       
              }
          })

        }else{

          // console.log("update fun");
          var ov = this.state.originalValues;


        // var includeChargesData = this.state.includeCharges;
        // var includeChargesDataList =[];     
        //     includeChargesData.map((item,index)=>{
        //       if(item.checked == true)
        //       {
        //         includeChargesDataList.push(item.name);
        //       }
        //     })

          var totalAskItemData = this.state.totalAskItem;
          var totalAskItemDataList =[];     
              totalAskItemData.map((item,index)=>{
                if(item.checked == true)
                {
                  totalAskItemDataList.push(item.label);
                }
              })


          var eq =true;
          if(totalAskItemDataList.length != ov.includeCharges.length ){
            eq = false;
             // console.log("equal not",eq);
          }else{
            for (var i = 0; i < totalAskItemDataList.length; i++)
            { 
                    if (totalAskItemDataList[i] != ov.includeCharges[i]){
                eq = false;
                    }else{
                eq = true;  
                    }
               }
                // console.log("equal yes but same",eq); 
          }

          // console.log("outside eq",eq);
               // this.state.monthlyRent === ov.monthlyRent && this.state.depositAmount === ov.depositAmount && 
         
         
          var expectedRateValue = this.state.expectedRate.length>0 ? parseInt(this.state.expectedRate) : null;
          var totalPriceValue = this.state.totalPrice.length>0 ? parseInt(this.state.totalPrice) : null;
          var monthlyRentValue = this.state.monthlyRent.length>0 ? parseInt(this.state.monthlyRent) : null;
          var depositAmountValue = this.state.depositAmount.length>0 ? parseInt(this.state.depositAmount) : null;
          var maintenanceChargesValue = this.state.maintenanceCharges.length>0 ? parseInt(this.state.maintenanceCharges) : null;
          var availableFrom = this.state.availableFrom.length>0 ? this.state.availableFrom.split('/').join('-') : null;

          console.log("ov==============>",ov);
           if(eq === true && expectedRateValue === ov.expectedRate && totalPriceValue === ov.totalPrice &&
           availableFrom === ov.availableFrom && monthlyRentValue === ov.monthlyRent && depositAmountValue === ov.depositAmount&& this.state.description === ov.description &&
             maintenanceChargesValue === ov.maintenanceCharges &&  this.state.maintenancePer === ov.maintenancePer &&
             this.state.measurementUnit === ov.measurementUnit)
            {
            console.log("same data1");
              this.navigateScreen('Availability');
            }else{
              console.log("diff data");
              // console.log("this.state.expectedRate",this.state.expectedRate);
              var expectedRate        = "";
              var totalPrice          = "";
              var monthlyRent         = "";
              var depositAmount       = "";
              var maintenanceCharges  = "";

              if(this.state.totalPrice && this.state.totalPrice!="" && this.state.totalPrice!==null)
              {
                if(this.state.totalPrice!==ov.totalPrice &&this.state.totalPrice.indexOf(',') !== -1){
                 totalPrice = this.state.totalPrice.replace(/,/g, '');
                }else{
                 totalPrice = this.state.totalPrice;
                }
              }else{
                 totalPrice = this.state.totalPrice;
              }
              // --------------
              if(this.state.expectedRate && this.state.expectedRate!="" && this.state.expectedRate!==null ){
                if(this.state.expectedRate!== ov.expectedRate && this.state.expectedRate.indexOf(',')!== -1){
                 expectedRate = this.state.expectedRate.replace(/,/g, '');
                }else{
                 expectedRate = this.state.expectedRate;
                }
              }else{
                 expectedRate = this.state.expectedRate;
              }

              // ---------------------
              if(this.state.monthlyRent && this.state.monthlyRent!=="" && this.state.monthlyRent!==null){
                if( this.state.monthlyRent!== ov.monthlyRent &&this.state.monthlyRent.indexOf(',') !== -1){
                   monthlyRent = this.state.monthlyRent.replace(/,/g, '');
                }else{
                  monthlyRent = this.state.monthlyRent;
                }
              }else{
                  monthlyRent = this.state.monthlyRent;
              }

              // -----------------------
              if(this.state.depositAmount && this.state.depositAmount!= "" && this.state.depositAmount!== null){
                if(this.state.depositAmount!== ov.depositAmount &&this.state.depositAmount.indexOf(',') !== -1){
                  depositAmount = this.state.depositAmount.replace(/,/g, '');
                }else{
                  depositAmount = this.state.depositAmount;
                }
              }else{
                depositAmount = this.state.depositAmount;
              }


            // ----------------------
              if(this.state.maintenanceCharges && this.state.maintenanceCharges!="" && this.state.maintenanceCharges!== null)
              {
                if(this.state.maintenanceCharges!== ov.maintenanceCharges &&this.state.maintenanceCharges.indexOf(',') !== -1){
                  maintenanceCharges = this.state.maintenanceCharges.replace(/,/g, '');
                }else{
                  maintenanceCharges = this.state.maintenanceCharges;
                }
              }else{
                maintenanceCharges = this.state.maintenanceCharges;
              }


              const updateFormValues = {
                "expectedRate"        : parseInt(expectedRate),
                "totalPrice"          : parseInt(totalPrice),
                "monthlyRent"         : parseInt(monthlyRent),
                "depositAmount"       : parseInt(depositAmount),
                "availableFrom"       : availableFrom,
                "description"         : this.state.description,
                "includeCharges"      : totalAskItemDataList,
                "maintenanceCharges"  : parseInt(maintenanceCharges),
                "maintenancePer"      : this.state.maintenancePer,
                "measurementUnit"     : this.state.measurementUnit,
                "property_id"         : this.state.propertyId,
                "uid"                 : this.state.uid,  
              };


              console.log("Financials req updateFormValues= ",updateFormValues);
                // console.log("update function");
              axios
              .patch('/api/properties/patch/financials',updateFormValues)
              .then( (res) =>{
                // console.log("Financials res = ",res);
                if(res.status === 200){
                this.navigateScreen('Availability');
                }
              })
              .catch((error)=>{
                  console.log("error = ",error);
                  if(error.message === "Request failed with status code 401")
                  {
                     // Alert.alert("Your session is expired!"," Please login again.");
                      AsyncStorage.removeItem('fullName');
                        AsyncStorage.removeItem('token');
                     // this.navigateScreen('MobileScreen');          
                           
                  }
              })
          // else close
            }
          }
        }
      }
    }


 handleOnItem = (index)=>{
    // console.log("index",index);
    var alldata = this.state.totalAskItem;
    var status = alldata[index].checked;
    if(status===true){
      alldata[index].checked = false;
    }else{
      alldata[index].checked = true;
    }
    this.setState({
      totalAskItem: alldata,
    },()=>{
      // console.log("here new data of totalAskItem",this.state.totalAskItem);
    });
    // console.log("current data status",status);
  }


  render(){
    
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;
    
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
                  Please provide financial details of your property.
                </Text>
              </View>

              <View style={styles.divider}></View>

              {this.state.transactionType === "Sell" ?
                <View>
                  <View style={[styles.marginBottom25]}>
                   <Text style={[styles.heading2,styles.marginBottom5]}>Expected Rate</Text>
                   <View style={[styles.inputWrapper]}>
                    <View style={styles.inputImgWrapper}>
                      <Icon name="rupee" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper68}>
                      <TextInput
                        placeholder           = "Enter Expected Rate"
                        onChangeText          = {expectedRate => {this.setState({expectedRate},() => { this.validInputField('expectedRate', 'expectedRateError');})}}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {15}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.expectedRate}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular",paddingHorizontal: 5}]}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = 'number-pad'
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
                        value               = {this.state.measurementUnit}
                        onChangeText        = {measurementUnit => {this.setState({measurementUnit});}}
                      />
                    </View>
                  </View>
                  {this.displayValidationError('expectedRateError')}
                </View>

                <View style={[styles.marginBottom25]}>
                  <Text style={[styles.heading2,styles.marginBottom5]}>Total Ask</Text>
                  <View style={[styles.inputWrapper]}>
                    <View style={styles.inputImgWrapper}>
                      <Icon name="rupee" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                     { <TextInput
                        placeholder           = "Enter Total Ask"
                        onChangeText          = {totalPrice => {this.setState({totalPrice},() => { this.validInputField('totalPrice', 'totalPriceError');})}}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {15}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.totalPrice}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular",paddingHorizontal: 5}]}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = "numeric"
                        maxLength             = {10}
                      />}
                    </View>
                  </View>
                  {this.displayValidationError('totalPriceError')}
                </View>
              </View>
              :
              <View>
                <View style={[styles.marginBottom25]}>
                  <Text style={[styles.heading2,styles.marginBottom5]}>Monthly Rent</Text>
                  <View style={[styles.inputWrapper]}>
                    <View style={styles.inputImgWrapper}>
                      <Icon name="rupee" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                    </View>
                    <View style={styles.inputTextWrapper}>
                      <TextInput
                        placeholder           = "Enter Monthly Rent"
                        onChangeText          = {monthlyRent => {this.setState({monthlyRent},() => { this.validInputField('monthlyRent', 'monthlyRentError');})}}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        labelFontSize         = {sizes.label}
                        titleFontSize         = {15}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        value                 = {this.state.monthlyRent}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {[{height: 40,fontSize:16,fontFamily:"Roboto-Regular",paddingHorizontal: 5}]}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = 'number-pad'
                        maxLength             = {10}
                      />
                    </View>
                  </View>
                  {this.displayValidationError('monthlyRentError')}
                </View>

                <View style={[styles.inputWrapper,styles.marginBottom25]}>
                <View style={styles.inputImgWrapper}>
                  <Icon name="rupee" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper}>
                  <TextField
                    label                 = "Deposit Amount"
                    onChangeText          = {depositAmount => {this.setState({depositAmount})}}
                    lineWidth             = {1}
                    tintColor             = {colors.button}
                    inputContainerPadding = {0}
                    labelHeight           = {15}
                    labelFontSize         = {sizes.label}
                    titleFontSize         = {15}
                    baseColor             = {'#666'}
                    textColor             = {'#333'}
                    value                 = {this.state.depositAmount}
                    containerStyle        = {styles.textContainer}
                    inputContainerStyle   = {styles.textInputContainer}
                    titleTextStyle        = {styles.textTitle}
                    style                 = {styles.textStyle}
                    labelTextStyle        = {styles.textLabel}
                    keyboardType          = 'number-pad'
                    maxLength             = {10}
                  />
                </View>
              </View>

            </View>

          }


            {this.state.propertyType==="Commercial" && this.state.transactionType==="Rent" ?
              
              null
              :
              <View>
                <Text style={[styles.heading2,styles.marginBottom15]}>{this.state.transactionType==="Sell" ?"Total Ask Includes (optional)":"Monthly Rent Includes (optional)"}</Text>
                <View style={[styles.marginBottom25]}>
                 {this.state.totalAskItem && this.state.totalAskItem.length >0 ?
                    this.state.totalAskItem.map((data,index)=>(
                      <React.Fragment key={index}>
                        <CheckBox
                          key={index}
                          style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}
                          style={{marginBottom:10}}
                          onClick={() => this.handleOnItem(index)}
                          isChecked={data.checked}
                          rightTextStyle={{marginLeft:0}}
                          checkBoxColor= {colors.grey}
                          rightTextView = {
                            <View style={{flexDirection:'row',flex:1}}>
                              <Text style={[styles.inputText,{marginLeft:2}]}>{data.label}</Text>
                            </View>
                          }
                        />
                     
                      </React.Fragment> 
                  ))
                    :
                    null
                  }
                </View>
              </View>
              }

              <View style={[styles.marginBottom25]}>
                <View style={[styles.inputWrapper]}>
                  <View style={styles.inputImgWrapper}>
                    <Icon name="rupee" type="font-awesome" size={17}  color="#aaa" style={{}}/>
                  </View>
                  <View style={styles.inputTextWrapper}>
                    <TextField
                      label                 = "Maintenance Charge"
                      onChangeText          = {maintenanceCharges => {this.setState({maintenanceCharges},() => { this.validInputField('maintenanceCharges', 'maintenanceChargesError');})}}
                      lineWidth             = {1}
                      tintColor             = {colors.button}
                      inputContainerPadding = {0}
                      labelHeight           = {15}
                      labelFontSize         = {sizes.label}
                      titleFontSize         = {15}
                      baseColor             = {'#666'}
                      textColor             = {'#333'}
                      value                 = {this.state.maintenanceCharges}
                      containerStyle        = {styles.textContainer}
                      inputContainerStyle   = {styles.textInputContainer}
                      titleTextStyle        = {styles.textTitle}
                      style                 = {styles.textStyle}
                      labelTextStyle        = {styles.textLabel}
                      keyboardType          = "number-pad"
                      maxLength             = {10}
                    />
                  </View>
                </View>  
                {this.displayValidationError('maintenanceChargesError')}
              </View>

              <View style={[styles.inputWrapper,styles.marginBottom25]}>
                <View style={styles.inputImgWrapper}>
                  <Icon name="home" type="feather" size={18}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper}>
                  <Dropdown
                    label               = 'Per'
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
                    data                = {this.state.dropdownData}
                    value               = {this.state.maintenancePer}
                    onChangeText        = {maintenancePer => {this.setState({maintenancePer});}}
                  />
                </View>
              </View> 

              <Text style={[styles.heading2,styles.marginBottom15]}>My Apartment is available from (optional)</Text>
              <View style={[styles.inputWrapper,styles.marginBottom25]}>
                <View style={styles.inputImgWrapper}>
                  <Icon name="calendar" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper}>
                  <DatePicker
                    style={{
                      flex:1,
                      width: "100%",
                      marginRight:5,
                    }}
                    date={this.state.availableFrom}
                    mode="date"
                    placeholder="dd/mm/yyyy"
                    format="DD/MM/YYYY"
                   
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        alignItems:'flex-start',
                        // fontFamily:'Montserrat-Regular',
                        paddingLeft:5
                      },
                      dateTouchBody:{
                        // fontFamily:'Montserrat-Regular'
                      },
                      dateText:{
                        // fontFamily:'Montserrat-Regular'
                      },
                      placeholderText:{
                        // fontFamily:'Montserrat-Regular'
                      }
                    }}
                    onDateChange={availableFrom => {this.setState({ availableFrom});}}
                    showIcon = {false}
                    minDate = {new Date()}
                  />
                </View>
              </View>

              <Text style={[styles.heading2,styles.marginBottom15]}>Description (optional)</Text>
              <View style={[styles.descriptionView,styles.marginBottom15]}>
                {/*<Text style={styles.inputText}>
                  My property is a semi furnished 3 BHK flat in a
                  centrally located society, with excellent access
                  to city center and all key points such as Airport,
                  Railway Station and Bus Stop. It comes with
                  24x7 water supply, uninterrupted electricity and
                  excellent security.
                </Text>*/}
                 <TextInput
                    label                 = "Description"
                    onChangeText          = {description => {this.setState({description})}}
                    lineWidth             = {1}
                    tintColor             = {colors.button}
                    inputContainerPadding = {0}
                    labelHeight           = {15}
                    labelFontSize         = {sizes.label}
                    titleFontSize         = {15}
                    baseColor             = {'#666'}
                    textColor             = {'#333'}
                    value                 = {this.state.description}
                    containerStyle        = {styles.textContainer}
                    inputContainerStyle   = {styles.textInputContainer}
                    titleTextStyle        = {styles.textTitle}
                    style                 = {[styles.textStyle,{height:200}]}
                    labelTextStyle        = {styles.textLabel}
                    keyboardType          = "default"
                    multiline             ={true}
                  />
              </View>

             {/* <Button
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
              />*/}

             



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
      
      </React.Fragment>
    );
    
  }
}

FinancialDetails.defaultProps = {
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