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
  AsyncStorage,
  Alert,
} from 'react-native';

import { Button,Icon, SearchBar } from 'react-native-elements';
import axios                      from 'axios';
import ValidationComponent        from "react-native-form-validator";
import { TextField }              from 'react-native-material-textfield';
import CheckBox                   from 'react-native-check-box'

import HeaderBar                  from '../../layouts/HeaderBar/HeaderBar.js';
import Loading                    from '../../layouts/Loading/Loading.js'

import styles                     from './styles.js';
import {colors,sizes}             from '../../config/styles.js';

const window = Dimensions.get('window');

export default class PropertyList extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      searchText: '',
      activeBtn: 'buy',
      includeNearby: false,
      activePropType: 'flat',
      activeRoomIndex: 0,
      searchResults:[],
      uid:"",
      token:"",
      searchData:"",
      isLoading :true,
    };
  }

  componentDidMount(){
    var uid = this.props.navigation.getParam('uid','No uid');
    var token = this.props.navigation.getParam('token','No token');
    this.setState({
      "uid":uid,
      "token":token,
    },()=>{
       axios
      .get('/api/properties/mypropertylist/'+this.state.uid)
      .then(
        (searchResults)=>{
          console.log(searchResults);
          const postsdata = searchResults.data;
          console.log("postsdata",postsdata);
          this.setState({
            searchResults : postsdata,
            isLoading     : false
            // propertyCity :city,
          });
         // console.log("PropertyDetails",postsdata); 

        }
      )
      .catch((error)=>{
            console.log("error = ",error.message);
            if(error.message === "Request failed with status code 401")
            {
                Alert.alert("Your session is expired!","Please login again.")
                this.props.navigation.navigate("MobileScreen");
            }
        })
    })
     
    this._retrieveData();
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

  convertNumberToRupees(totalPrice){
      return Math.abs(Number(totalPrice)) >= 1.0e+7

      ? Math.abs(Number(totalPrice)) / 1.0e+7 + " Cr"

      : Math.abs(Number(totalPrice)) >= 1.0e+5

      ? Math.abs(Number(totalPrice)) / 1.0e+5 + " Lac"

      : Math.abs(Number(totalPrice)) >= 1.0e+3

      ? Math.abs(Number(totalPrice)) / 1.0e+3 + " K"

      : Math.abs(Number(totalPrice));
    }

  _retrieveData = async () => {
    try {
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      const searchData = await AsyncStorage.getItem('searchData');
      if (uid !== null && token !== null) {
        // We have data!!
        this.setState({uid:uid})
        this.setState({token:token})
        this.setState({searchData:searchData})
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render(){
    
    const { navigation } = this.props;
    let {activeBtn,activePropType,activeRoomIndex} = this.state;
  
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ this.state.token;

    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>
        {this.state.isLoading === false ?
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
            <View style={styles.formWrapper}>
              <Text style={styles.textCenter}>My Posted Properties</Text>
              {this.state.searchResults && this.state.searchResults.length>0 ? 
                this.state.searchResults.map((prop,i)=>(
                <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('PropertyDetailsPage',{propertyDetails:prop})}>
                  <View style={[styles.propertyWrap,styles.marginBottom20]}>
                    {
                      prop.gallery.Images && prop.gallery.Images.length>0 ?
                        <ImageBackground 
                          source = {{uri:prop.gallery.Images[0].imgPath}}
                          style={styles.bgImage}
                          resizeMode="cover"
                          imageStyle={{borderRadius:4}}
                        >
                        </ImageBackground>
                        :
                        <ImageBackground 
                          source={require('../../images/1.png') }
                          style={styles.bgImage}
                          resizeMode="cover"
                          imageStyle={{borderRadius:4}}
                        >
                      </ImageBackground>
                     }
                    <View style={{width:'100%',padding:10}}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.textSmallLight}>{prop.propertyLocation && prop.propertyLocation.society ? prop.propertyLocation.society : "-"}</Text>
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
                            <Text style={styles.textLarge}>{this.convertNumberToRupees(prop.financial.totalPrice)}</Text>
                          </View>

                          <View style={{flexDirection:'row'}}>
                            <Icon
                              name="marker" 
                              type="foundation"
                              size={20}
                              color={colors.golden}
                              containerStyle={{marginRight:5}}
                            />
                            <Text style={styles.textSmall}>{prop.propertyLocation && prop.propertyLocation.area && prop.propertyLocation.city? prop.propertyLocation.area+", "+prop.propertyLocation.city:"-"}</Text>
                          </View>
                          
                        </View>

                        <View style={{width:'50%',alignItems:'flex-end',justifyContent:'center'}}>
                          <Button
                            onPress={()=>this.props.navigation.navigate('propertyDetailsPage',{propertyDetails:prop})}
                            titleStyle      = {styles.buttonText2}
                            title           = "Details"
                            buttonStyle     = {styles.button3}
                            containerStyle  = {[styles.buttonContainer3,{marginTop:10,marginRight:10}]}
                            iconRight
                          />
                        </View>
                      </View>
                      <View style={styles.divider}></View>

                      <View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between'}}>
                        {prop.propertyType === "Residential" ?
                          <View  style={{}}>
                            <View style={{flexDirection:'row'}}>
                              <Icon
                                name={"bed-empty"} 
                                type={'material-community'}
                                size={20}
                                color={colors.grey}
                              />
                              <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.bedrooms}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Bedrooms</Text>
                        </View>
                        :
                        <View  style={{}}>
                            <View style={{flexDirection:'row'}}>
                              <Icon
                                name={"bed-empty"} 
                                type={'material-community'}
                                size={20}
                                color={colors.grey}
                              />
                              <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.washrooms}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Washrooms</Text>
                        </View>
                      }

                      <View style={{width:'50%',alignItems:'flex-end',justifyContent:'center'}}>
                        <Button
                          onPress={()=>this.props.navigation.navigate('PropertyDetailsPage',{propertyDetails:prop})}
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

                      {prop.propertyType === "Residential" ?
                        <View  style={{}}>
                          <View style={{flexDirection:'row'}}>
                            <Icon
                              name={"bath"} 
                              type={'font-awesome'}
                              size={20}
                              color={colors.grey}
                            />
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.balconies}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Baths</Text>
                        </View>
                        :
                        <View  style={{}}>
                          <View style={{flexDirection:'row'}}>
                            <Icon
                              name={"bath"} 
                              type={'font-awesome'}
                              size={20}
                              color={colors.grey}
                            />
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.Pantry}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Pantry</Text>
                        </View>
                      }  
                        <View  style={{}}>
                          <View style={{flexDirection:'row'}}>
                            <Icon
                              name={"stairs"} 
                              type={'material-community'}
                              size={20}
                              color={colors.grey}
                            />
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.floor}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Floor</Text>
                        </View>

                        <View  style={{}}>
                          <View style={{flexDirection:'row'}}>
                            <Icon
                              name={"compass"} 
                              type={'font-awesome'}
                              size={20}
                              color={colors.grey}
                            />
                            <Text style={[styles.textLarge,{marginLeft:5}]}>{prop.propertyDetails.facing}</Text>
                          </View>
                          <Text style={styles.textSmallLight}>Facing</Text>
                        </View>
                      </View>

                      <View style={[styles.divider,{marginBottom:10}]}></View>

                      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                        <Text style={styles.textSmallLight}>
                          Super Area
                          <Text style={styles.textLarge}> {prop.propertyDetails.superArea} </Text>
                          <Text style={styles.textLarge}> {prop.propertyDetails.superAreaUnit} </Text>
                        </Text>
                      </View>

                      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                        <Text style={styles.textSmallLight}>
                          Possession by
                          <Text style={styles.textLarge}> {prop.financial.availableFrom} </Text>
                        </Text>
                      </View> 

                    </View>
                  </View>
                </TouchableOpacity>
              ))
              :
               <Text style={[styles.textLarge,{textAlign:'center'}]}> Posted properties will be shown here. </Text>
              }
                

            </View>
          </ScrollView>
          :
         <Loading /> 
       }
      </React.Fragment>
    );
    
  }
}