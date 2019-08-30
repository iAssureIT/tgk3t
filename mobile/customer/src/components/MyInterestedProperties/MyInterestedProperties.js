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

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import CheckBox from 'react-native-check-box'

const window = Dimensions.get('window');

export default class MyInterestedProperties extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      searchText: '',
      activeBtn: 'buy',
      includeNearby: false,
      activePropType: 'flat',
      activeRoomIndex: 0,
    };
  }

  searchUpdated=(searchText)=>{
    this.setState({searchText});
  }

  handleOption = (option)=>{
    this.setState({activeBtn:option});
  }

  handleIncludeNearby = ()=>{
    this.setState({includeNearby: !this.state.includeNearby});
  }

  setActive = (name)=>{
    this.setState({activePropType:name});
  }

  setActiveRoom = (index)=>{
    this.setState({activeRoomIndex:index});
  }

  render(){
    
    const { navigation } = this.props;
    let {activeBtn,activePropType,activeRoomIndex} = this.state;
    let propData = [
      {
        name:'Beds',
        quantity: 2,
        iconName:'bed-empty', 
        iconType: 'material-community',
      },
      {
        name:'Baths',
        quantity: 2,
        iconName:'bath', 
        iconType: 'font-awesome',
      },
      {
        name:'Floor',
        quantity: 3,
        iconName:'stairs', 
        iconType: 'material-community',
      },
    ];

    let properDetails = [
      {
        imageSource : require('../../images/p1.png'),
      },
      {
        imageSource : require('../../images/p2.png'),
      },
      {
        imageSource : require('../../images/p3.png'),
      },
      {
        imageSource : require('../../images/p4.png'),
      },
      {
        imageSource : require('../../images/p5.png'),
      },
    ];

    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={[styles.heading,styles.marginBottom15]}>
                My Interested Properties
              </Text>
            </View>

            {properDetails.map((prop,i)=>(
              <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('PropertyDetails',{image:prop.imageSource})}>
                <View style={[styles.propertyWrap,styles.marginBottom20]}>
                  <ImageBackground 
                    // source={require('../../images/p1.png')}
                    source={prop.imageSource}
                    style={styles.bgImage}
                    resizeMode="cover"
                    imageStyle={{borderRadius:4}}
                  >
                    <Button
                      // onPress         = {()=>this.props.navigation.navigate('PropertySuccess')}
                      titleStyle      = {styles.buttonText2}
                      title           = "Interested"
                      buttonStyle     = {styles.button2}
                      containerStyle  = {[styles.buttonContainer2,{marginTop:10,marginRight:10}]}
                      iconLeft
                      icon = {<Icon
                        name="thumbs-o-up" 
                        type="font-awesome"
                        size={20}
                        color={colors.white}
                        containerStyle={{marginRight:5}}
                      />}
                    />
                  </ImageBackground>
                  <View style={{width:'100%',padding:10}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.textSmallLight}>Park Avenue Apartment</Text>
                      <Text style={{marginLeft:15}}>{'\u2022' + " "}</Text>
                      <Text style={styles.textSmallLight}>New Proerty</Text>
                    </View>

                    <View style={{flexDirection:'row',marginBottom:15}}>
                      <View style={{width:'50%'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Icon
                            name="rupee" 
                            type="font-awesome"
                            size={18}
                            color={colors.black}
                            containerStyle={{marginRight:5}}
                          />
                          <Text style={styles.textLarge}>63.2 Lac</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                          <Icon
                            name="marker" 
                            type="foundation"
                            size={20}
                            color={colors.golden}
                            containerStyle={{marginRight:5}}
                          />
                          <Text style={styles.textSmall}>Hadapsar Pune</Text>
                        </View>
                        
                      </View>

                      <View style={{width:'50%',alignItems:'flex-end',justifyContent:'center'}}>
                        <Button
                          titleStyle      = {styles.buttonText2}
                          title           = "Details"
                          buttonStyle     = {styles.button3}
                          containerStyle  = {[styles.buttonContainer3,{marginTop:10,marginRight:10}]}
                          iconRight
                          icon = {
                            <Image 
                              source={require('../../images/key.png') }
                            />
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.divider}></View>

                    <View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between'}}>
                    {propData.map((data,index)=>(
                      <View key={index} style={{}}>
                        <View style={{flexDirection:'row'}}>
                          <Icon
                            name={data.iconName} 
                            type={data.iconType}
                            size={20}
                            color={colors.grey}
                          />
                          <Text style={[styles.textLarge,{marginLeft:5}]}>{data.quantity}</Text>
                        </View>
                        <Text style={styles.textSmallLight}>{data.name}</Text>
                      </View>
                    ))
                    }
                    </View>

                    <View style={[styles.divider,{marginBottom:10}]}></View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                      <Text style={styles.textSmallLight}>
                        Carpet Area
                        <Text style={styles.textLarge}> 773 </Text>
                        Sqft
                      </Text>

                      <Text style={styles.textSmallLight}>
                        Possession by
                        <Text style={styles.textLarge}> Jul '19 </Text>
                      </Text>
                    </View>

                  </View>
                </View>
              </TouchableOpacity>
            ))
            }
              

          </View>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

