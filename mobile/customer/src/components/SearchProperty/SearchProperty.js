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

import { Button,Icon, SearchBar, Slider } from 'react-native-elements';
import ValidationComponent from "react-native-form-validator";
import { TextField } from 'react-native-material-textfield';

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import CheckBox from 'react-native-check-box'

const window = Dimensions.get('window');

export default class SearchProperty extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      searchText            : '',
      activeBtn             : 'buy',
      includeNearby         : false,
      activePropType        : 'flat',
      activeRoomIndex       : 0,
      activeFurnishedStatus : 'Fully Furnished',
      value:0,
    };
  }

  searchUpdated = (searchText)=>{
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

  setActiveFurnish = (status)=>{
    this.setState({activeFurnishedStatus:status});
  }

  render(){
    
    const { navigation } = this.props;
    let {activeBtn,activePropType,activeRoomIndex,activeFurnishedStatus} = this.state;
    let rooms = ["1 RK","1 BHK","2 BHK","3 BHK","4 BHK","4+BHK"];

    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            
            <View style={styles.optionsWrapper}>
              <View style={styles.buttonContainer}>
                {activeBtn=='buy'
                ?
                  <React.Fragment>
                    <Button
                      titleStyle      = {styles.activeButtonText}
                      title           = "Buy"
                      buttonStyle     = {styles.activeButton}
                    />
                    <View style={styles.triangle}></View>
                  </React.Fragment>
                :
                  <Button
                    onPress         = {()=>this.handleOption('buy')}
                    titleStyle      = {styles.buttonText}
                    title           = "Buy"
                    buttonStyle     = {styles.button}
                    // containerStyle  = {[{width:'100%',backgroundColor:'#f0f'}]}
                  />
                }
              </View>

              <View style={styles.buttonContainer}>
              {activeBtn=='rent'
              ?
                <React.Fragment>
                  <Button
                    titleStyle      = {styles.activeButtonText}
                    title           = "Rent"
                    buttonStyle     = {styles.activeButton}

                  />
                  <View style={styles.triangle}></View>
                </React.Fragment>
              :
                <Button
                  onPress         = {()=>this.handleOption('rent')}
                  titleStyle      = {styles.buttonText}
                  title           = "Rent"
                  buttonStyle     = {styles.button}
                />
              }
              </View>

              <View style={styles.buttonContainer}>
              {activeBtn=='commertial'
              ?
                <React.Fragment>
                  <Button
                    titleStyle      = {styles.activeButtonText}
                    title           = "Commercial"
                    buttonStyle     = {styles.activeButton}

                  />
                  <View style={styles.triangle}></View>
                </React.Fragment>
              :
                <Button
                  onPress         = {()=>this.handleOption('commertial')}
                  titleStyle      = {styles.buttonText}
                  title           = "Commercial"
                  buttonStyle     = {styles.button}
                />
              }
              </View>
            </View>

            <View style={[styles.searchInputWrapper,styles.marginBottom25]}>
              <View style={styles.inputTextWrapper}>
                <SearchBar
                  searchIcon={
                    <View>
                      <Icon name="map-marker-radius" type="material-community" size={24}  color={colors.black} style={{}}/>
                    </View>
                  }
                  containerStyle={styles.searchContainer}
                  inputContainerStyle={styles.searchInputContainer}
                  inputStyle={styles.searchInput}
                  placeholder='Enter city'
                  onChangeText = {(text) => this.searchUpdated(text)}
                  value={this.state.searchText}
                />
              </View>
              <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('SearchProperty')}
                style={styles.searchBtnWrapper}
              >
                <View >
                  <Image 
                    source={require('../../images/key.png') }
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.outerView}>
              <CheckBox
                style={{marginBottom:10}}
                onClick={() => this.handleIncludeNearby()}
                isChecked={this.state.includeNearby}
                rightTextStyle={{marginLeft:0}}
                checkBoxColor= {colors.grey}
                rightTextView = {
                  <View style={{flex:1,paddingLeft:10}}>
                    <Text style={styles.inputText}>Include nearby properties</Text>
                  </View>
                }
              />
            </View>
            <Text style={[styles.heading,styles.marginBottom5]}>Property Type</Text>
              <View style={[styles.tabWrap,styles.marginBottom25]}>
                <ScrollView horizontal={true} contentContainerStyle={[styles.horizontalScroll]} >
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('flat')}
                    style={[(activePropType=="flat"?styles.activeTabView:styles.tabView),styles.tabBorder,styles.borderRadiusLeft]}
                  >
                      <Icon
                        name="building-o" 
                        type="font-awesome"
                        size={12}
                        color="white"
                      />
                      <Text style={styles.tabText}>Flat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('house')}
                    style={[(activePropType=="house"?styles.activeTabView:styles.tabView),styles.tabBorder]}
                  >
                    <Icon
                      name="home" 
                      type="material-community"
                      size={18}
                      color="white"
                    />
                    <Text style={styles.tabText}>House/Villa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('multistoreyApt')}
                    style={[(activePropType=="multistoreyApt"?styles.activeTabView:styles.tabView),styles.borderRadiusRight]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                    />
                    <Text style={styles.tabText}>Multistorey Apt.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('multistoreyApt')}
                    style={[(activePropType=="multistoreyApt"?styles.activeTabView:styles.tabView),styles.borderRadiusRight]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                    />
                    <Text style={styles.tabText}>Multistorey Apt.</Text>
                  </TouchableOpacity>

                </ScrollView>
              </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Bedroom</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            {rooms.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActiveRoom(index)}
                key={index} 
                style={[(index==activeRoomIndex?styles.activeTabView2:styles.tabView2),(index==0?styles.borderRadiusLeft2:(index==5)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data}</Text>
              </TouchableOpacity>
            ))
            }
            </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Price Range</Text>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon
                  name="rupee" 
                  type="font-awesome"
                  size={16}
                  color={colors.grey}
                  containerStyle={{marginRight:5}}
                />
                <Text style={styles.inputText}>0 Lacs</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon
                  name="rupee" 
                  type="font-awesome"
                  size={16}
                  color={colors.grey}
                  containerStyle={{marginRight:5}}
                />
                <Text style={styles.inputText}>10+ Cr</Text>
              </View>
            </View>
            <View style={[{width:'100%'}]}>
              <Slider
                value={this.state.value}
                animationType={"spring"}
                minimumValue={100}
                maximumValue={1000}
                minimumTrackTintColor={colors.golden}
                thumbStyle={{backgroundColor:'#fff',height:30,width:20,borderWidth:1,borderColor:'#ccc'}}
                trackStyle={{height:10,borderColor:'#ccc',borderWidth:1}}
                onValueChange={value => this.setState({ value })}
              />
            </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Furnish Status</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
              <TouchableOpacity 
                onPress = {()=>this.setActiveFurnish('Fully Furnished')}
                style={[(activeFurnishedStatus=='Fully Furnished'?styles.activeTabView:styles.tabView),styles.tabBorder,styles.borderRadiusLeft]}
              >
                  <Icon
                    name="building-o" 
                    type="font-awesome"
                    size={12}
                    color="white"
                  />
                  <Text style={styles.tabText}>Fully Furnished</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress = {()=>this.setActiveFurnish('Semi Furnished')}
                style={[(activeFurnishedStatus=='Semi Furnished'?styles.activeTabView:styles.tabView),styles.tabBorder]}
              >
                <Icon
                  name="home" 
                  type="material-community"
                  size={18}
                  color="white"
                />
                <Text style={styles.tabText}>Semi Furnished</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress = {()=>this.setActiveFurnish("Unfunished")}
                style={[(activeFurnishedStatus=="Unfunished"?styles.activeTabView:styles.tabView),styles.borderRadiusRight]}
              >
                <Icon
                  name="office-building" 
                  type="material-community"
                  size={16}
                  color="white"
                />
                <Text style={styles.tabText}>Unfunished</Text>
              </TouchableOpacity>
            </View>

            <Button
              onPress         = {()=>this.props.navigation.navigate('PropertyList')}
              titleStyle      = {styles.buttonSubmitText}
              title           = "Search"
              buttonStyle     = {styles.buttonSubmit}
              containerStyle  = {[styles.buttonSubmitContainer,styles.marginBottom15]}
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

