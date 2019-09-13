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
import CheckBox from 'react-native-check-box';
import { Dropdown } from 'react-native-material-dropdown';


const window = Dimensions.get('window');

export default class SearchProperty extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      searchText            : '',
      activeBtn             : 'buy',
      includeNearby         : false,
      activePropType        : 'MultiStorey Apartment',
      selectBudget          : 'Select Budget',
      budgetList1 : [
        {value: 1000000, option: "Upto 10 Lac", checked:false},
        {value: 2000000, option: "Upto 20 Lac", checked:false},
        {value: 3000000, option: "Upto 30 Lac", checked:false},
        {value: 4000000, option: "Upto 40 Lac", checked:false},
        {value: 5000000, option: "Upto 50 Lac", checked:false},
        {value: 6000000, option: "Upto 60 Lac", checked:false},
        {value: 7000000, option: "Upto 70 Lac", checked:false},
        {value: 8000000, option: "Upto 80 Lac",checked:false},
        {value: 9000000, option: "Upto 90 Lac",checked:false},
        {value: 10000000, option: "Upto 1 Cr",checked:false},
        {value: 20000000, option: "Upto 2 Cr",checked:false},
        {value: 30000000, option: "Upto 3 Cr",checked:false},
        {value: 50000000, option: "Upto 5 Cr",checked:false},
        {value: 100000000, option: "Upto 10 Cr",checked:false},
      ],

      budgetList2 : [
        {value: 5000,  option: "Upto 5,000",checked:false},
        {value: 10000, option: "Upto 10,000",checked:false},
        {value: 15000, option: "Upto 15,000",checked:false},
        {value: 20000, option: "Upto 20,000",checked:false},
        {value: 25000, option: "Upto 25,000",checked:false},
        {value: 30000, option: "Upto 30,000",checked:false},
        {value: 40000, option: "Upto 40,000",checked:false},
        {value: 50000, option: "Upto 50,000",checked:false},
        {value: 60000, option: "Upto 60,000",checked:false},
        {value: 70000, option: "Upto 70,000",checked:false},
        {value: 80000, option: "Upto 80,000",checked:false},
        {value: 90000, option: "Upto 90,000",checked:false},
        {value: 100000, option: "Upto 1 Lac",checked:false},
      ],
      activeRoomIndex       : 0,
      activeFloorIndex      : 0,
      activeAgeIndex        : 0,
      activeAvailabeIndex   : 0,
      activeFurnishedStatus : 'Fully Furnished',
      value:"",
    };
  }

  searchUpdated = (searchText)=>{
    this.setState({searchText});
  }

  handleOption = (option)=>{
    this.setState({
      activeBtn:option
    },()=>{
      if(this.state.activeBtn === "commertial")
      {
        this.setState({activePropType:"Office in IT Park/SEZ"});
      }else{
        this.setState({activePropType:'MultiStorey Apartment'});
      }
    });
  }

  handleIncludeNearby = ()=>{
    this.setState({includeNearby: !this.state.includeNearby});
  }

  selectBudget = (name)=>{
    this.setState({selectBudget:name})
  }

  setActive = (name)=>{
    this.setState({activePropType:name});
  }

  setActiveRoom = (index)=>{
    this.setState({activeRoomIndex:index});
  }

  setActiveFloor = (index)=>{
    this.setState({activeFloorIndex:index});
  }


  setActiveAge = (index)=>{
    this.setState({activeAgeIndex:index});
  }

  setActiveAvailable = (index)=>{
    this.setState({activeAvailabeIndex:index});
  }
  setActiveFurnish = (status)=>{
    this.setState({activeFurnishedStatus:status});
  }

  convertNumberToRupees(totalPrice) 
  {
    console.log("totalPrice",totalPrice);
    return Math.floor(Number(totalPrice) >= 1.0e+7)

    ? Math.floor(Number(totalPrice) / 1.0e+7) + " Cr"

    : Math.floor(Number(totalPrice) >= 1.0e+5)

    ? Math.floor(Number(totalPrice) / 1.0e+5) + " Lac"

    : Math.floor(Number(totalPrice) >= 1.0e+3)

    ? Math.floor(Number(totalPrice) / 1.0e+3) + " K"

    : Math.floor(Number(totalPrice));
  }

  render(){
    
    const { navigation } = this.props;
    let {activeBtn,activePropType,activeRoomIndex,activeFloorIndex,activeAgeIndex,activeAvailabeIndex,activeFurnishedStatus,selectBudget} = this.state;
    let rooms = ["1 RK","1 BHK","2 BHK","3 BHK","4 BHK","4+BHK"];
    let floors = ["Basement","Ground","1-5","5-10","> 10"];
    let ages = ["Under Construction"," New ","1-2 Years","2-5 Years","5-10 Years","> 8 Years"];
    let available = ["Immediate","2 Weeks","2-4 Weeks","After a month"];
    // var value =this.state.value;
    var budget=this.convertNumberToRupees(this.state.value)

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

           {/* <View style={styles.outerView}>
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
            </View>*/}
            <Text style={[styles.heading,styles.marginBottom5]}>Property Type : {this.state.activeBtn!=='commertial'? "Residential" : "Commercial"}</Text>
            {this.state.activeBtn!=='commertial'?
              <View style={[styles.tabWrap,styles.marginBottom25]}>
               <ScrollView horizontal={true} showsHorizontalScrollIndicator = { false }>
                 <TouchableOpacity 
                    onPress = {()=>this.setActive('MultiStorey Apartment')}
                    style={[(activePropType=="MultiStorey Apartment"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder,styles.borderRadiusLeft2]}
                  >
                      <Icon
                        name="building-o" 
                        type="font-awesome"
                        size={12}
                        color="white"
                        style={[{paddingLeft:10}]}

                      />
                      <Text style={styles.tabText}> MultiStorey Apartment </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Residential House')}
                    style={[(activePropType=="Residential House"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder]}
                  >
                    <Icon
                      name="home" 
                      type="material-community"
                      size={18}
                      color="white"
                      style={[{paddingLeft:10}]}

                    />
                    <Text style={styles.tabText}> Residential House </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Studio Apartment')}
                    style={[(activePropType=="Studio Apartment"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                      style={[{paddingLeft:10}]}
                    />
                    <Text style={styles.tabText}> Studio Apartment </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Villa')}
                    style={[(activePropType=="Villa"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder]}
                  >
                    <Icon
                      name="home" 
                      type="material-community"
                      size={16}
                      color="white"
                      style={[{paddingLeft:10}]}

                    />
                    <Text style={styles.tabText}> Villa </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Penthouse')}
                    style={[(activePropType=="Penthouse"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder,styles.borderRadiusRight2]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                      style={[{paddingLeft:10}]}

                    />
                    <Text style={styles.tabText}> Penthouse </Text>
                  </TouchableOpacity>

                </ScrollView>
              </View>
              :
              <View style={[styles.tabWrap,styles.marginBottom25]}>
               <ScrollView horizontal={true} showsHorizontalScrollIndicator = { false }>
                 <TouchableOpacity 
                    onPress = {()=>this.setActive('Office in IT Park/SEZ')}
                    style={[(activePropType=="Office in IT Park/SEZ"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder,styles.borderRadiusLeft2]}
                  >
                      <Icon
                        name="building-o" 
                        type="font-awesome"
                        size={12}
                        color="white"
                        style={[{paddingLeft:10}]}

                      />
                      <Text style={styles.tabText}> Office in IT Park/SEZ </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Commercial Office Space')}
                    style={[(activePropType=="Commercial Office Space"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder]}
                  >
                    <Icon
                      name="home" 
                      type="material-community"
                      size={18}
                      color="white"
                      style={[{paddingLeft:10}]}

                    />
                    <Text style={styles.tabText}> Commercial Office Space </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Commercial Showroom')}
                    style={[(activePropType=="Commercial Showroom"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                      style={[{paddingLeft:10}]}
                    />
                    <Text style={styles.tabText}> Commercial Showroom </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Commercial Shop')}
                    style={[(activePropType=="Commercial Shop"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                      style={[{paddingLeft:10}]}

                    />
                    <Text style={styles.tabText}> Commercial Shop </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Industrial Building')}
                    style={[(activePropType=="Industrial Building"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                      style={[{paddingLeft:10}]}

                    />
                    <Text style={styles.tabText}> Industrial Building </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress = {()=>this.setActive('Warehouse/Godown')}
                    style={[(activePropType=="Warehouse/Godown"?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,styles.tabBorder,styles.borderRadiusRight2]}
                  >
                    <Icon
                      name="office-building" 
                      type="material-community"
                      size={16}
                      color="white"
                      style={[{paddingLeft:10}]}
                    />
                    <Text style={styles.tabText}> Warehouse/Godown </Text>
                  </TouchableOpacity>

                </ScrollView>
              </View>
            }
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
 {/*             <View style={[styles.inputWrapper,styles.marginBottom15]}>
                  <View style={styles.inputTextWrapperFull}>
                    <Dropdown
                      // label               = 'Property Type'
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
                      labelTextStyle      = {styles.ddLabelTextFull}
                      style               = {styles.ddStyle}
                      data                = {this.state.budgetList1}
                      value               = {this.state.selectBudget}
                      // onChangeText        = {this.selectProp.bind(this)}
                      onChangeText={ (selectBudget) => this.selectBudget(selectBudget) } 
                      // onChangeText        = {fullPropertyType => {this.setState({fullPropertyType});}}
                    />
                  </View>
              </View>*/}

            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon
                  name="rupee" 
                  type="font-awesome"
                  size={16}
                  color={colors.grey}
                  containerStyle={{marginRight:5}}
                />
                <Text style={styles.inputText}>{budget}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon
                  name="rupee" 
                  type="font-awesome"
                  size={16}
                  color={colors.grey}
                  containerStyle={{marginRight:5}}
                />
                <Text style={styles.inputText}>{this.state.activeBtn==="rent" ? "10 Lac"  : "100 Cr"}</Text>
              </View>
            </View>
            <View style={[{width:'100%'}]}>
              <Slider
                value={this.state.value}
                animationType={"spring"}
                minimumValue={this.state.activeBtn==="rent" ? 5000 : 1000000 }
                maximumValue={this.state.activeBtn==="rent" ?  1000000:  1000000000}
                step={1}
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

            <Text style={[styles.heading,styles.marginBottom5]}>Floors</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            {floors.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActiveFloor(index)}
                key={index} 
                style={[(index==activeFloorIndex?styles.activeTabViewFloor:styles.tabViewFloor),(index==0?styles.borderRadiusLeft2:(index==4)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data}</Text>
              </TouchableOpacity>
            ))
            }
            
            </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Age</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator = { false }>
            {ages.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActiveAge(index)}
                key={index} 
                style={[(index==activeAgeIndex?styles.activeTabViewAge:styles.tabViewAge),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data}</Text>
              </TouchableOpacity>
            ))
            }
            </ScrollView>
            </View>

             <Text style={[styles.heading,styles.marginBottom5]}>Availability</Text>
              <View style={[styles.tabWrap,styles.marginBottom25]}>
              {available.map((data,index)=>(
                <TouchableOpacity 
                  onPress={()=>this.setActiveAvailable(index)}
                  key={index} 
                  style={[(index==activeAvailabeIndex?styles.activeTabViewAvl:styles.tabViewAvl),(index==0?styles.borderRadiusLeft2:(index==3)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
                >
                  <Text style={styles.tabText}>{data}</Text>
                </TouchableOpacity>
              ))
              }
              
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

