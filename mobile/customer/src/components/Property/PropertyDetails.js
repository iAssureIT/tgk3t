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


  render(){
      
    const { navigation } = this.props;
    let imageSource = navigation.state.params.image;
    console.log("imageSource",imageSource);
    let {activeBtn,activePropType,activeRoomIndex} = this.state;

    let overviewData = [
      {
        name: 'Carpet Area',
        content: '773 Sqtf',
        price: '8182/Sqtf'
      },
      {
        name: 'Carpet Area',
        content: '773 Sqtf',
        price: '8182/Sqtf'
      },
      {
        name: 'Society/Project',
        content: 'Park Avenue Apartment',
      },
      {
        name: 'Location',
        content: 'Hadpsar',
      },
      {
        name: 'Beds',
        content: '2',
      },
      {
        name: 'Bath',
        content: '2',
      },
      {
        name: 'Balcony',
        content: '1',
      },
      {
        name: 'Possession',
        content: 'Under Contruction',
      },
      {
        name: 'Sale',
        content: 'New Property',
      },
      {
        name: 'Floor',
        content: '3rd',
      },
      {
        name: 'Facing',
        content: 'East',
      }];

    let Amenities = [
      {name:'Intercom', iconName:'', iconType:''},
      {name:'Lift', iconName:'', iconType:''},
      {name:'Air Conditioner', iconName:'', iconType:''},
      {name:'Swimming Pool', iconName:'', iconType:''},
      {name:'Internal Gym', iconName:'', iconType:''},
      {name:'Park', iconName:'', iconType:''},
    ];

    let similarProps = [
      {source:require('../../images/p6.png'),price:'45 Lacs',property:'2 BHK'},
      {source:require('../../images/p7.png'),price:'42 Lacs',property:'2 BHK'},
      {source:require('../../images/p8.png'),price:'46 Lacs',property:'2 BHK'},
      {source:require('../../images/p6.png'),price:'50 Lacs',property:'2 BHK'},
    ];

    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >

          <View style={{width:'100%'}}>
            <ImageBackground 
              // source={require('../../images/p1.png')}
              source={imageSource}
              style={styles.bgImage2}
              resizeMode="cover"
              imageStyle={{borderRadius:4}}
            >
              <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                <Button
                  // onPress         = {()=>this.props.navigation.navigate('PropertySuccess')}
                  titleStyle      = {styles.buttonText}
                  title           = "4 Photos"
                  buttonStyle     = {styles.button4}
                  containerStyle  = {[styles.buttonContainer4]}
                />

                <Button
                  // onPress         = {()=>this.props.navigation.navigate('PropertySuccess')}
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

          <View style={styles.formWrapper}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.textSmallLight}>Park Avenue Apartment</Text>
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

            <View style={[{width:'100%'},styles.marginBottom15]}>
              <Text style={styles.textSmallLight}>Builder</Text>
              <Text style={styles.textSmall}>Kohnoor Group</Text>
              <Text style={styles.textSmallLight}>Posted on Jun 24, 2019</Text>
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Overview</Text>

            <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
            {overviewData.map((data,index)=>(
              <View key={index} style={[{width:'50%',flexDirection:'row',paddingVertical:10},(index%2==0?{}:{paddingLeft:'10%'})]}>
                <Icon
                  name="crosshairs" 
                  type="font-awesome"
                  size={20}
                  color={colors.button}
                  containerStyle={{marginRight:6}}
                />
                <View>
                  <Text style={styles.textSmallLight}>{data.name}</Text>
                  <Text style={styles.textSmall}>{data.content}</Text>
                  {data.price
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
                    null
                  }
                </View>
              </View>
            ))
            }
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Description</Text>
            <Text style={[styles.textSmall,styles.marginBottom5]}>
              My property is a semi furnished 3 BHK flat in a centrally located society, with excellent access
            </Text>

            <View style={[{width:'32%'},styles.marginBottom15]}>
              <Button
                titleStyle      = {styles.buttonText}
                title           = "Show more"
                buttonStyle     = {styles.button4}
                containerStyle  = {[styles.buttonContainer5,styles.marginBottom15]}
              />
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeading,styles.marginBottom5]}>Amenities</Text>

            <View style={[{width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
              {Amenities.map((data,index)=>(

                <View key={index} style={[{width:'50%',flexDirection:'row',paddingVertical:10},(index%2==0?{}:{paddingLeft:'10%'})]}>
                  <Icon
                    name="crosshairs" 
                    type="font-awesome"
                    size={20}
                    color={colors.button}
                    containerStyle={{marginRight:6}}
                  />
                  <Text style={[styles.textSmall,{textAlign:'center'}]}>{data.name}</Text>
                </View>  
              ))
              }
            </View>

            <View style={[{width:'32%'},styles.marginBottom15]}>
              <Button
                titleStyle      = {styles.buttonText}
                title           = "Show more"
                buttonStyle     = {styles.button4}
                containerStyle  = {[styles.buttonContainer5,styles.marginBottom15]}
              />
            </View>

            <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Video</Text>
            <View style={[{width:'100%'},styles.marginBottom15]}>
              <Video source={require('../../images/videoplayback.mp4')}   // Can be a URL or a local file.
                repeats
                controls={true}
                resizeMode={"stretch"}
                // ref={(ref) => {
                //  this.player = ref
                // }}                                      // Store reference
                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                // onError={this.videoError}               // Callback when video cannot be loaded
                style={{height:150,width:'100%'}} 
              />
            </View>

             <View style={[styles.divider,styles.marginBottom15]}></View>

            <Text style={[styles.textHeadingSmall,styles.marginBottom5]}>Location</Text>
           {/* <MapView
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

