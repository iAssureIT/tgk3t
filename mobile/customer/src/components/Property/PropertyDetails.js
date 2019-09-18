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
  Animated
} from 'react-native';

import moment from 'moment'
import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import CheckBox from 'react-native-check-box'
import Video from 'react-native-video';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';

const window = Dimensions.get('window');

export default class PropertyDetails extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
  }

  _renderItem = (item,index)=>{
    let data = item.item;
    return(
      <View style={{width:'100%',backgroundColor:'#f00'}}>
        <Text style={{color:colors.white}}>{data.price}</Text>
      </View>
    );
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

  render(){
    const { navigation } = this.props;
    let propertyProfile = navigation.state.params.propertyDetails;
    console.log("propertyProfile",propertyProfile);
    let {activeBtn,activePropType,activeRoomIndex} = this.state;

    let similarProps = [
      {source:require('../../images/p6.png'),price:'45 Lacs',property:'2 BHK'},
      {source:require('../../images/p7.png'),price:'42 Lacs',property:'2 BHK'},
      {source:require('../../images/p8.png'),price:'46 Lacs',property:'2 BHK'},
      {source:require('../../images/p6.png'),price:'50 Lacs',property:'2 BHK'},
    ];
    console.log("propertyProfile.gallery.video",propertyProfile.gallery.video);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >

          <View style={{width:'100%'}}>
            <View style={{width:'100%',backgroundColor:'#fff'}}>
              
              <ScrollView
                  horizontal={true}
                  onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
                  onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
                  onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
                  style={{minWidth: '100%' }} 
                  contentContainerStyle={{ minWidth: '100%',marginBottom:0 }}
                >
                {
                propertyProfile.gallery.Images.map((data,index)=>(
                  <View key={index} style={{width:(window.width),height:300}} >
                    <ImageBackground 
                        source={{uri:data.imgPath}}
                        style={styles.bgImage2}
                        resizeMode="cover"
                      >
                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                          <Button
                            titleStyle      = {styles.buttonText}
                            title           = {propertyProfile.gallery.Images.length+" Photos"}
                            buttonStyle     = {styles.button4}
                            containerStyle  = {[styles.buttonContainer4]}
                          />

                          <Button
                            titleStyle      = {styles.buttonText2}
                            title           = "Interested"
                            buttonStyle     = {styles.button2}
                            containerStyle  = {[styles.buttonContainer2]}
                            iconLeft
                            icon = {<Icon
                              name="thumbs-o-up" 
                              type="font-awesome"
                              size={20}
                              color={colors.white}
                              containerStyle={{marginRight:5}}
                            />}
                          />
                        </View>
                      </ImageBackground>
                  </View>
                ))
                }
              </ScrollView>
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.textSmallLight}>{propertyProfile.propertyLocation.society}</Text>
              <Text style={{marginLeft:15}}>{'\u2022' + " "}</Text>
              <Text style={styles.textSmallLight}>New Proerty</Text>
            </View>

            <View style={[{width:'100%'},styles.marginBottom15]}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon
                  name="rupee" 
                  type="font-awesome"
                  size={18}
                  color={colors.black}
                  containerStyle={{marginRight:5}}
                />
                <Text style={styles.textLarge}>{this.convertNumberToRupees(propertyProfile.financial.totalPrice)}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
                <Icon
                  name="marker" 
                  type="foundation"
                  size={20}
                  color={colors.golden}
                  containerStyle={{marginRight:5}}
                />
                <Text style={styles.textSmall}>{propertyProfile.propertyLocation.area+", "+propertyProfile.propertyLocation.city}</Text>
              </View>
            </View>

            <View style={[{width:'100%'},styles.marginBottom15]}>
              <Text style={styles.textSmallLight}>{propertyProfile.propertyHolder}</Text>
              <Text style={styles.textSmallLight}>Posted on {moment(propertyProfile.propertyCreatedAt).format("DD/MM/YYYY")}</Text>
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Overview</Text>

            <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Super Area</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.superArea} Sqft</Text>
                  {/*data.price
                  ?
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Icon
                        name="rupee" 
                        type="font-awesome"
                        size={14}
                        color={colors.grey}
                        containerStyle={{marginRight:2}}
                      />
                      <Text style={styles.textSmall}>{data.price}</Text>
                    </View>
                  :
                    null*/
                  }
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Builtup Area</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.builtupArea} Sqft</Text>
                  {/*data.price
                  ?
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Icon
                        name="rupee" 
                        type="font-awesome"
                        size={14}
                        color={colors.grey}
                        containerStyle={{marginRight:2}}
                      />
                      <Text style={styles.textSmall}>{data.price}</Text>
                    </View>
                  :
                    null*/
                  }
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Floor / Total Floor</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.floor}/{propertyProfile.propertyDetails.totalFloor}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Furnish Status</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.furnishedStatus}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Bedrooms</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.bedrooms}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Balconies</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.balconies}</Text>
                </View>
              </View> 

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Bathrooms</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.bathrooms}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Age of Property</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.ageofProperty}</Text>
                </View>
              </View>
              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>Facing</Text>
                  <Text style={styles.textSmall}>{propertyProfile.propertyDetails.facing}</Text>
                </View>
              </View>

              <View  style={[{width:'50%',flexDirection:'row',paddingVertical:10,paddingLeft:'10%'}]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>availableFrom</Text>
                  <Text style={styles.textSmall}>{propertyProfile.financial.availableFrom}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Description</Text>
            <Text style={[styles.textSmall,styles.marginBottom5]}>
              {propertyProfile.financial.description}
            </Text>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Amenities</Text>

            <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
              {propertyProfile.propertyDetails.Amenities.map((data,index)=>(

                <View key={index} style={[{width:'50%',flexDirection:'row',paddingVertical:10},(index%2==0?{}:{paddingLeft:'10%'})]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <Text style={[styles.textSmall,{textAlign:'center'}]}>{data}</Text>
                </View>  
              ))
              }
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Video</Text>
            <View style={[{width:'100%'},styles.marginBottom15]}>
              <Video 
                source={{uri:"https://tgk3t.s3.amazonaws.com/propertiesImages/Luxury HolidayVillas.mp4",}}   // Can be a URL or a local file.
                repeats
                controls={true}
                resizeMode={"stretch"}
                style={{height:150,width:'100%'}} 
              />
            </View>

             <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Location</Text>
            {/*<MapView
              ref={map => this.map = map}
              provider={PROVIDER_GOOGLE}
              initialRegion={this.state.region}
              style={[{width:'100%',height:200},styles.marginBottom15]}
              // customMapStyle={mapStyle}
            >
              <MapView.Marker 
                coordinate={{
                  latitude: 45.524698,
                  longitude: -122.6655507,
                }}
              >
              </MapView.Marker>
            </MapView>*/}

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Similar Properties (4)</Text>
            
            <View style={{width:'100%',backgroundColor:'#fff'}}>
              
              <ScrollView
                  horizontal={true}
                  onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
                  onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
                  onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
                  style={{minWidth: '100%' }} 
                  contentContainerStyle={{ minWidth: '100%',marginBottom:0 }}
                >
                {
                similarProps.map((data,index)=>(
                  <View key={index} style={{width:(window.width/2), borderWidth:1,borderColor:'#ddd',padding:10,height:null,borderRadius:4,marginRight:10}} >
                    <Image
                      resizeMode={"contain"}
                      // source={require('../../images/p6.png')}
                      source={data.source}
                      style={{height:100,width:'100%'}}

                    />
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Icon
                        name="rupee" 
                        type="font-awesome"
                        size={16}
                        color={colors.black}
                        containerStyle={{marginRight:2}}
                      />
                      <Text style={styles.textHeadingSmall}>{data.price+", "+data.property}</Text>
                    </View>
                    <Text style={[{textAlign:'center'},styles.textSmallLight]}>{"Hadapsar"}</Text>
                  </View>
                ))
                }
                </ScrollView>

            </View>

          </View>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

