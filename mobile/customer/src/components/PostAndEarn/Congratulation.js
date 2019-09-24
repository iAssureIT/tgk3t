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

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import CheckBox from 'react-native-check-box'

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';

const window = Dimensions.get('window');

export default class Congratulation extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      token : "",
      uid : "",
      propertyId : "",
      allData : "",
      
    };
  }

   componentDidMount(){
      var token = this.props.navigation.getParam('token','No token');
      console.log("token",token);
      var uid = this.props.navigation.getParam('uid','No uid');
      console.log("uid",uid);
      var propertyId = this.props.navigation.getParam('propertyId','No propertyId');
      console.log("propertyId",propertyId);
      
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

      this.setState({
        token : token,
        uid   : uid,
        propertyId : propertyId,
      
      });

    }


    submitFun(){

      var id = this.state.propertyId;
      console.log("id",id);

      if(id.length>0)
      {

        axios
          .get('/api/properties/'+id)
          .then( (res) =>{
              console.log("get property = ",res.data);
              this.setState({
                allData : res.data,
              },()=>{
                 this.props.navigation.navigate('PropertyDetailsPage',{propertyDetails:this.state.allData})

              });

            // console.log("get property transactionType = ",res.data.transactionType);
          })
          .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                            
                        }
           });

      }

      
    }

  
  render(){

    const { navigation } = this.props;

    let prop = {
        imageSource : require('../../images/p1.png'),
      }

    return (
      <React.Fragment>
        <HeaderBar navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>

          <View style={[{width:'100%',justifyContent:'center',alignItems:'center'},styles.marginBottom15]}>
            <Image 
              style={{height:100,width:120}}
              resizeMode={"contain"}
              source={require('../../images/fireworks.png') }
            />
          </View>

          <View style={[styles.alignCenter,styles.marginBottom15]}>
            <Text style={{fontSize:28,fontFamily:'Roboto-Medium',fontStyle:'italic',color:colors.button}}>Congratulations</Text>
          </View>

          <View style={[styles.alignCenter,styles.marginBottom15]}>
            <Text style={styles.heading4}>Your Property is</Text>
            <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.golden}}>FAST SELLING HOT POTATO</Text>
            <Text style={[styles.heading4,{textAlign:'center'}]}>and qualifies for a 
              <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.golden}}> 40% </Text> 
              brokerage to be paid by us on successful deal through us
            </Text>
          </View>

          <View style={[styles.alignCenter,styles.marginBottom15]}>
            <Image 
              source={require('../../images/meter.png') }
            />
             <Image 
              source={require('../../images/needle1.png')}
              style={[styles.needle,{transform: [{ rotate: '90deg'}],transformOrigin: "90% 55%",transition : "transform 3s",transitionDelay: "1s"}]}
            />
            <Text style={styles.heading}>Sell-O-Meter</Text>
          </View>

          <View style={[styles.alignCenter,{paddingHorizontal:15}]}>
            <Text style={[styles.heading4,{textAlign:'center'}]}>
              Your property 
                <Text style={{fontSize:16,fontWeight:'bold',fontStyle:'italic',color:colors.button}}> Successfully </Text> 
              submitted & will be published soon!!
            </Text>
          </View>

            <Button
              onPress         = {this.submitFun.bind(this)}
              // onPress         = {()=>this.props.navigation.navigate('PropertyDetails',{propertyId:this.state.propertyId,propertyDetails:this.state.propertyDetails})}
              titleStyle      = {styles.buttonText}
              title           = "Property Details"
              buttonStyle     = {styles.button}
              containerStyle  = {[styles.buttonContainer,styles.marginBottom15,{marginTop:20}]}
              iconRight
            
            />
          </View>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

