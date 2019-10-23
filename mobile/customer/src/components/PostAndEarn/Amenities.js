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
import { NavigationActions, StackActions } from 'react-navigation';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import AsyncStorage               from '@react-native-community/async-storage';
import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from "react-native-datepicker";

const window = Dimensions.get('window');

  


export default class Amenities extends ValidationComponent{
//  navigateScreen=(route)=>{
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
    this.state={
      originalValues:"",
      prevAmenities: "",
      allAmenities : [],
      uid:"",
      token:"",
      mobile:"",
      propertyId:"",
      propertyType:"",
      transactionType:"",
      updateOperation: false,
        };

  }

   componentDidMount(){
    this._retrieveData();
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

        axios
          .get('/api/masteramenities/list')
          .then(
            (res)=>{
              // console.log('res postdata------------------', res);
              const postsdata = res.data;
              // console.log('postsdata',postsdata);
              this.setState({
                allAmenities : postsdata,
              },()=>{

                  axios
                  .get('/api/properties/'+propertyId)
                  .then( (response) =>{
                    // console.log("get property in property in amenitiees= ",response);

                    this.setState({
                        originalValues  : response.data.propertyDetails,
                        prevAmenities   : response.data.propertyDetails.Amenities,
                        updateOperation : response.data.propertyDetails.Amenities.length >0 ? true : false,
                      });

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
                  })
                .catch((error)=>{
                                          console.log("error = ",error);
                                          if(error.message === "Request failed with status code 401")
                                          {
                                               // swal("Your session is expired! Please login again.","", "error");
                                               // this.props.history.push("/");
                                          }
                      });

            });

            })
          .catch((error)=>{

            console.log("error = ",error);
            // if(error.message === "Request failed with status code 401")
            //                   {
            //                       Alert.alert("Your session is expired!"," Please loginagain.");
AsyncStorage.removeItem('token');
            //                      this.props.navigation.navigate('MobileScreen');          
                                   
                                   
            //                   }
             }); 
        }
      }catch (error) {
      // Error retrieving data
    }
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
    },()=>{
      // console.log("here new data of amenities",this.state.allAmenities);
    });

    // console.log("current data status",status);

  }



submitFun(){

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
            // console.log("this.state.allAmenities",this.state.allAmenities);
            // console.log("allAmenitiesDataList true",allAmenitiesDataList);
            // console.log("here result amenity",ov.Amenities);
      
              var eq ="";
              if(allAmenitiesDataList.length != ov.Amenities.length )
              {
                eq = false;
                 // console.log("equal not",eq);
              }else{
                
                for (var i = 0; i < allAmenitiesDataList.length; i++)
                { 
                        if (allAmenitiesDataList[i] != ov.Amenities[i]){
                    eq = false;
                        }else{
                    eq = true;  
                        }
                   }
                    // console.log("equal yes but same",eq); 
              }

              // console.log("outside eq",eq);


               const formValues = {
                "Amenities"         : allAmenitiesDataList,
                "property_id"       : this.state.propertyId,
                "uid"               : this.state.uid,
               }


            if( eq === true )
            {
              // console.log("same data");
              this.navigateScreen('FinancialDetails');
            }else{

              console.log("allAmenities in result",this.state.allAmenities);
              var allAmenitiesData = this.state.allAmenities;
                var allAmenitiesDataList =[];     
                    allAmenitiesData.map((item,index)=>{
                      if(item.checked == true)
                      {
                        allAmenitiesDataList.push(item.amenity);
                      }
                    })

                    // console.log("allAmenitiesDataList true",allAmenitiesDataList);

                      if(allAmenitiesDataList!=""){

                        axios
                        .patch('/api/properties/patch/amenities',formValues)
                        .then( (res) =>{
                          console.log(res);
                          if(res.status === 200 ){
                            console.log("amenity Res = ",res);
                            this.navigateScreen('FinancialDetails');
                          }
                        })
                        .catch((error)=>{
                                              console.log("error = ",error);

                                              // if(error.response.data === "Amenities Not Updated")
                                              // {
                                              //    this.navigateScreen('FinancialDetails');
                                              // }

                                              if(error.message === "Request failed with status code 401")
                                              {
                                                   // swal("Your session is expired! Please login again.","", "error");
                                                   // this.props.history.push("/");
                                              }
                           });

                      }else{
                                   Alert.alert("Please select atleast one amenity","");
                      }
            }

          }else{

            // console.log("allAmenities in result",this.state.allAmenities);
            var allAmenitiesData = this.state.allAmenities;
              var allAmenitiesDataList =[];     
              allAmenitiesData.map((item,index)=>{
                if(item.checked == true)
                {
                  allAmenitiesDataList.push(item.amenity);
                }
              })

              // console.log("allAmenitiesDataList true",allAmenitiesDataList);

              const formValues = {
                "Amenities"         : allAmenitiesDataList,
                "property_id"       : this.state.propertyId,
                "uid"               : this.state.uid,
               }


              

            if(allAmenitiesDataList!=""){

              axios
              .patch('/api/properties/patch/amenities',formValues)
              .then( (res) =>{
                // console.log(res);
                if(res.status === 200){
                  // console.log("amenity Res = ",res);
                  this.navigateScreen('FinancialDetails');
                }
              })
              .catch((error)=>{
                                    console.log("error = ",error);
                                    if(error.message === "Request failed with status code 401")
                                    {
                                         // swal("Your session is expired! Please login again.","", "error");
                                         // this.props.history.push("/");
                                    }
                 });

            }else{
                         Alert.alert("Please select atleast one amenity","");
            }


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
          <View style={styles.formWrapper}>
           
            <View>
              <Text style={styles.heading}>
                My Apartment has following Amenities
              </Text>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.amenitiesWrapper,styles.marginBottom25} >
              <Text style={[styles.heading3,styles.marginBottom5]}> All Amenities </Text>           
              {this.state.allAmenities && this.state.allAmenities.length >0 ?
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


           {/* <Button
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
            />*/}

            <View  style={[styles.marginBottom15,styles.nextBtnhover]}  onPress={this.submitFun.bind(this)}>
                <TouchableOpacity onPress={this.submitFun.bind(this)} style={[{width:'100%'}]}>
                   <Text style={[styles.buttonContainerNextBTN,{color:"#fff"}]}>Save & Next
                   </Text>
                </TouchableOpacity>
            </View>


          </View>
         </ScrollView>

         </React.Fragment>
    );
    
  }
}