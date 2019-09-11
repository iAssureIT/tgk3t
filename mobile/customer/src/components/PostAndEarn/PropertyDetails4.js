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
import axios          from 'axios';

import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import CheckBox from 'react-native-check-box'

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from "react-native-datepicker";

const window = Dimensions.get('window');

export default class PropertyDetails4 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      /*superArea : '',
      builtArea : '',
      expectedRate : '',
      totalAsk : '',
      totalAskIndex : 0,
      availableFromDate : '',
      dropdownData:[
      {
        value: 'Monthly'
      },
      {
        value: 'Yearly'
      }],*/
      // if(this.state.mobile!=""){

        
      //   axios
      //     .post('http://qatgk3tapi.iassureit.com/api/usersotp/verify_mobile',formValues)
      //     .then((response)=>{
      //       console.log("response = ",response.data);
      //         axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
      //       // localStorage.setItem('token',response.data.token)
            
      //         if(response.data.message === 'MOBILE-NUMBER-EXISTS')
      //         {
      //          console.log("here otp from response",response.data.otp);
      //           this.props.navigation.navigate('SignUp');

      //          // this.props.navigation.navigate('OTPScreen',{originalotp:response.data.otp,message:response.data.message});
          
      //         }else{
      //           this.props.navigation.navigate('OTPScreen',{originalotp:response.data.otp,message:response.data.message,mobile:this.state.mobile});
          
      //           console.log("new mob no");
      //         }

      //       })
      //     .catch(function(error){
      //       console.log("here can't access the url");
      //       console.log(error);
      //     })
        
      //   }else{
      //         this.setState({
      //             "openModal": true
      //         });
      //     // swal("Please enter Mobile Number", "", "warning");

      //   }
      defaultIcon:'flag',
      iconType: 'material-community',
      allAmenities:[],
      isChecked: true,
      
    };
  }

  onSelect=(index,value)=>{
    this.setState({
      totalAskIndex: index,
    });
  }

  componentDidMount(){
    axios
      .get('http://qatgk3tapi.iassureit.com/api/masteramenities/list')
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
    // var data = index.target.getAttribute('isChecked');
    console.log("current data status",status);
    // let {internalAmenities} = this.state;
    // let checked = !internalAmenities[index].checked;
    // internalAmenities[index].checked = checked;
    // this.setState({internalAmenities});
  }

 

  handleOnClickInternalOption = (index,optionIndex)=>{
    let {internalAmenities} = this.state;
    let options = internalAmenities[index].options;
    let checked = !options[optionIndex].checked;
    options[optionIndex].checked = checked;
    internalAmenities[index].options = options;
    this.setState({internalAmenities});
  }

  handleOnClickExternal = (index)=>{
    let {externalAmenities} = this.state;
    let checked = !externalAmenities[index].checked;
    externalAmenities[index].checked = checked;
    this.setState({externalAmenities});
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
                My Apartment has following Amenities
              </Text>
            </View>

            <View style={styles.divider}></View>

            <Text style={[styles.heading3,styles.marginBottom5]}>All Amenities </Text>
            
            <View style={[styles.marginBottom15]}>
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
              onPress         = {()=>this.props.navigation.navigate('PropertyDetails5')}
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

