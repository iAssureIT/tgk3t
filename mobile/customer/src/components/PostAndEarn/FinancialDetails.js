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

import { Button,Icon, SearchBar } from 'react-native-elements';
import axios          from 'axios';
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

export default class FinancialDetails extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      superArea : '',
      builtArea : '',
      expectedRate : '',
      totalPrice : '',
      totalAskIndex : 0,
      availableFromDate : '',
      description:'2 BHK beautiful, tastefully decorated and well maintained flat with 2 attached bathrooms located in Sylvania, Magarpatta City, Pune. The society is gated, extremely safe and boasts a number of key amenities like Seasons Mall, Amanora Mall, Gold’s Gym, ABS Gym. Well connected to main city areas such as Koregaon Park, Kalyani Nagar by road.This society gets uninterrupted electricity, water and piped gas supply.',
      dropdownData:[
      {
        value: 'Monthly'
      },
      {
        value: 'Yearly'
      }],
       UnitData  : [{label:"Sq ft", value:"Sq ft"},
                  {label:"Sq Meter", value:"Sq Meter"},
                  {label:"Guntha", value:"Guntha"},
                  {label:"Acre", value:"Acre"},
                  {label:"Sq-Yrd", value:"Sq-Yrd"},
                  {label:"Bigha", value:"Bigha"},
                  {label:"Hectare", value:"Hectare"},
                  {label:"Marla", value:"Marla"},
                  {label:"Kanal", value:"Kanal"}],
      measurementUnit : 'Sq ft',
      uid   : "",
      token : '',
      propertyId  : "",
      transactionType : '',
      propertyType : '',
      totalAskItem : [{label: 'Car Park',checked: false},
                     {label: 'One Time Maintenance',checked: false},
                     {label: 'Stamp Duty & Registration',checked: false},
                     {label: 'Clubhouse',checked: false}],
      mobile : "",
    };
  }

  onSelect=(index,value)=>{
    this.setState({
      totalAskIndex: index,
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
      var transactionType = this.props.navigation.getParam('transactionType','No transactionType');
      // console.log("transactionType",transactionType);
        var mobile = this.props.navigation.getParam('mobile','No mobile'); 
    console.log("mobile in otpscreen",mobile);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

      this.setState({
        token : token,
        uid   : uid,
        propertyId : propertyId,
        propertyType : propertyType,
        transactionType : transactionType,
        mobile: mobile,
      });

}

submitFun(){

   // console.log("here btn pressed");

     var totalAskItemData = this.state.totalAskItem;
        var totalAskItemDataList =[];     
            totalAskItemData.map((item,index)=>{
              if(item.checked == true)
              {
                totalAskItemDataList.push(item.label);
              }
            })


     const formValues = {
      
        "expectedRate"        : this.state.expectedRate,
        "totalPrice"          : this.state.totalPrice,
        // "monthlyRent"         : this.state.monthlyRent,
        // "depositAmount"       : this.state.depositAmount,
        "includeCharges"      : totalAskItemDataList,
        "description"         : this.state.description,
        "availableFrom"       : this.state.availableFrom,
        "maintenanceCharges"  : this.state.maintenanceCharges,
        "maintenancePer"      : this.state.maintenancePer,
        "measurementUnit"     : this.state.measurementUnit,  
        "property_id"         : this.state.propertyId,
        "uid"                 : this.state.uid,
      };
      console.log("formValues",formValues);
        axios
        .patch('/api/properties/patch/financials',formValues)
        .then( (res) =>{
          console.log("Financials res = ",res);
          if(res.status === 200){
         this.props.navigation.navigate('Availability',{mobile:this.state.mobile,propertyId:this.state.propertyId,token:this.state.token,uid:this.state.uid});
         
          }
        })
       .catch((error)=>{
                          console.log("error = ",error);
                          if(error.message === "Request failed with status code 401")
                          {
                               Alert.alert("Your session is expired!"," Please login again.");
                             this.props.navigation.navigate('MobileScreen');          
                                     
                               
                               
                          }
                      })
}


 handleOnItem = (index)=>{

     console.log("index",index);
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
      console.log("here new data of totalAskItem",this.state.totalAskItem);
    });
    console.log("current data status",status);
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
                My Apartment size and Financial Details
              </Text>
            </View>

            <View style={styles.divider}></View>

            {this.state.transactionType === "Sell" ?

            <View>
             <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper68}>
                <TextField
                  label                 = "Expected Rate"
                  onChangeText          = {expectedRate => {this.setState({expectedRate})}}
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
                  value               = {this.state.measurementUnit}
                  onChangeText        = {measurementUnit => {this.setState({measurementUnit});}}
                />
              </View>
            </View>


            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Total Ask"
                  onChangeText          = {totalPrice => {this.setState({totalPrice})}}
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
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                />
              </View>
            </View>
            </View>

            :

            <View>
              <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Monthly Rent"
                  onChangeText          = {monthlyRent => {this.setState({monthlyRent})}}
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
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                  maxLength             = {10}
                />
              </View>
            </View>


              <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="building" type="font-awesome" size={16}  color="#aaa" style={{}}/>
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
                  keyboardType          = "numeric"
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
            <Text style={[styles.heading2,styles.marginBottom15]}>My Property includes</Text>
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
                                      <Text style={styles.inputText}>{data.label}</Text>
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

            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="rupee" type="font-awesome" size={17}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Maintenance Charge"
                  onChangeText          = {maintenanceCharges => {this.setState({maintenanceCharges})}}
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
                  keyboardType          = "default"
                  maxLength             = {10}
                />
              </View>
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

            <Text style={[styles.heading2,styles.marginBottom15]}>My Apartment is available from</Text>
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

            <Text style={[styles.heading2,styles.marginBottom15]}>Description</Text>
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
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "default"
                  multiline             ={true}
                />
            </View>

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

          </View>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

