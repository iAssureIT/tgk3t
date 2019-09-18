//Module -Search Property
//Developer Name - Rushikesh Salunkhe
/*-----------------------------------------------------------*/
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
  AsyncStorage
} from 'react-native';

import axios                              from 'axios';
import { Button,Icon, SearchBar, Slider } from 'react-native-elements';
import ValidationComponent                from "react-native-form-validator";
import { TextField }                      from 'react-native-material-textfield';

import HeaderBar                          from '../../layouts/HeaderBar/HeaderBar.js';
import styles                             from './styles.js';
import {colors,sizes}                     from '../../config/styles.js';
import CheckBox                           from 'react-native-check-box';
import { Dropdown }                       from 'react-native-material-dropdown';


const window = Dimensions.get('window');

export default class SearchProperty extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      location            : '',
      activeBtn             : 'Residential-Sell',
      includeNearby         : false,
      activePropType        : [],
      selectBudget          : 0,
      activeRoom            : [],
      activeFloor           : "",
      activeAge             : "",
      activeAvailabe        : "",
      activeFurnishedStatus : '',
      roomsList             : "",
      propertyList          : [],
      propertyList1         : [],
      propertyList2         : [],
      floorsList            : [],
      ageList               : [],
      availableList         : [],
      furnishList            : [],
    };
  }


  componentDidMount(){
   var searchResults = this.props.navigation.getParam('searchResults','No Result');

   console.log("searchResults123",searchResults);
   this.setState({
      location :searchResults.location,
      activeBtn:searchResults.property,
      roomsList : [ 
        {value: 1,  option: "1 BHK", checked:false},
        {value: 2,  option: "2 BHK", checked:false},
        {value: 3,  option: "3 BHK", checked:false},
        {value: 4,  option: "4 BHK", checked:false},
        {value: 5,  option: "5 BHK", checked:false},
        ],
      propertyList1 : [
        {name:'MultiStorey Apartment', checked:false, iconName:"building-o",      type:"font-awesome",       size:12},
        {name:'Residential House',     checked:false, iconName:"home",            type:"material-community", size:18},
        {name:'Studio Apartment',      checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Villa',                 checked:false, iconName:"home",            type:"material-community", size:16},
        {name:'Penthouse',             checked:false, iconName:"office-building", type:"font-awesome",       size:16}
      ],
      propertyList2 : [
        {name:'Office in IT Park/SEZ',    checked:false, iconName:"building-o",      type:"font-awesome",       size:12},
        {name:'Commercial Office Space',  checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Commercial Showroom',      checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Commercial Shop',          checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Industrial Building',      checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Warehouse/Godown',         checked:false, iconName:"office-building", type:"material-community", size:16}
      ],

      furnishList : [
        {value:'Fully furnished', checked:false, iconName:"building-o",      type:"font-awesome",       size:12},
        {value:'Semi furnished',  checked:false, iconName:"home",            type:"material-community", size:18},
        {value:'Unfurnished',     checked:false, iconName:"office-building", type:"material-community", size:16},
      ],
      floorsList : 
        [
          {value: "-1",   option: "Basement", checked:false},
          {value:  "0",   option: "Ground",   checked:false},
          {value: '1-5',  option: "1-5",      checked:false},
          {value: '5-10', option: "5-10",     checked:false},
          {value: '>10',  option: "> 10",     checked:false}
      ],
      ageList : [
        {value: "Under Construction", option: "Under Construction", checked:false},
        {value: "New",                option: "Newly Built",        checked:false},
        {value: "<4",                 option: "Less than 4 Years",  checked:false},
        {value: "4-8",                option: "4 - 8 Years",        checked:false},
        {value: "8-12",               option: "8 - 12 Years",       checked:false},
        {value: ">12",                option: "Above 12 Years",     checked:false},
      ],
      availableList : [
        {value:"Immediate",     checked:false},
        {value:"2 Weeks",       checked:false},
        {value:"2-4 Weeks",     checked:false},
        {value:"After a month", checked:false},
      ],
    },()=>{
      this.setState({propertyList:this.state.propertyList1})
    })
  }

  handleLocation = (value)=>{
    this.setState({location:value});
  }

  handleOption = (option)=>{
    this.setState({
      activeBtn:option
    },()=>{
      var propertyList = [];
      if(this.state.activeBtn === "Commercial-Sell" || this.state.activeBtn === "Commercial-Rent"){
        this.setState({propertyList:this.state.propertyList2,activePropType:[]})
      }else{
        this.setState({propertyList:this.state.propertyList1,activePropType:[]})
      }
    });
  }

  handleTransacrtionType = (value)=>{
    this.setState({
      activeBtn: value
    })
  }

  handleIncludeNearby = ()=>{
    this.setState({includeNearby: !this.state.includeNearby});
  }

  selectBudget = (value)=>{
    this.setState({selectBudget:value})
  }

  setActive = (name)=>{
    let propsType    = this.state.activePropType;
    let propertyList = this.state.propertyList;
    for (var i = propertyList.length - 1; i >= 0; i--) {
      if(propertyList[i].name === name){
        if(propertyList[i].checked === true){
          propertyList[i].checked = false;
          for (var i = propsType.length - 1; i >= 0; i--) {
            if(propsType[i] === name){
              propsType.splice(i,1)
            }
          }
        }else{
          propertyList[i].checked = true;
          propsType.push(name);
        }
      }
    }
    this.setState({activePropType:propsType})
    this.setState({propertyList:propertyList})
  }

  setActiveRoom = (value)=>{
    let roomsList =this.state.roomsList;
    let rooms     =this.state.activeRoom;
    for (var i = roomsList.length - 1; i >= 0; i--) {
      if(roomsList[i].value === value){
        if(roomsList[i].checked === true){
          roomsList[i].checked = false;
          for (var i = rooms.length - 1; i >= 0; i--) {
            if(rooms[i] === value){
              rooms.splice(i,1)
            }
          }
        }else{
          roomsList[i].checked = true;
          rooms.push(value);
        }
      }
    }
    this.setState({activeRoom:rooms})
    this.setState({roomsList:roomsList})
  }

  setActiveFloor = (value)=>{
    var floorsList =this.state.floorsList;
    for (var i =floorsList.length - 1; i >= 0; i--){
      if(floorsList[i].value === value){
        if(floorsList[i].checked === true){
          floorsList[i].checked = false;
            this.setState({activeFloor:""})
        }else{
          for (var j =floorsList.length - 1; j >= 0; j--){
            floorsList[j].checked = false;
            this.setState({activeFloor:""})
          }
          floorsList[i].checked = true;
          this.setState({activeFloor:value})
        }
      }
    }
    this.setState({floorsList:floorsList});
  }

  setActiveAge = (value)=>{
    var ageList =this.state.ageList;
    for (var i =ageList.length - 1; i >= 0; i--){
      if(ageList[i].value === value){
        if(ageList[i].checked === true){
          ageList[i].checked = false;
            this.setState({activeAge:""})
        }else{
          for (var j =ageList.length - 1; j >= 0; j--){
            ageList[j].checked = false;
            this.setState({activeAge:""})
          }
          ageList[i].checked = true;
          this.setState({activeAge:value})
        }
      }
    }
    this.setState({ageList:ageList});
  }

  setActiveAvailable = (value)=>{
    var availableList =this.state.availableList;
    for (var i =availableList.length - 1; i >= 0; i--){
      if(availableList[i].value === value){
        if(availableList[i].checked === true){
          availableList[i].checked = false;
            this.setState({activeAvailabe:""})
        }else{
          for (var j =availableList.length - 1; j >= 0; j--){
            availableList[j].checked = false;
            this.setState({activeAvailabe:""})
          }
          availableList[i].checked = true;
          this.setState({activeAvailabe:value})
        }
      }
    }
    this.setState({availableList:availableList});
  }

  setActiveFurnish = (value)=>{
    var furnishList =this.state.furnishList;
    for (var i =furnishList.length - 1; i >= 0; i--){
      if(furnishList[i].value === value){
        if(furnishList[i].checked === true){
          furnishList[i].checked = false;
            this.setState({activeFurnishedStatus:""})
        }else{
          for (var j =furnishList.length - 1; j >= 0; j--){
            furnishList[j].checked = false;
            this.setState({activeFurnishedStatus:""})
          }
          furnishList[i].checked = true;
          this.setState({activeFurnishedStatus:value})
        }
      }
    }
    this.setState({furnishList:furnishList});
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

  handleSearch = (event)=>{
    var property      = this.state.activeBtn.split("-");
    var propertyType  = property[0];
    var transactionType = property[1];
    const formValues = {
      transactionType : transactionType,
      propertyType    : propertyType,
      location        : this.state.location,
      budget          : this.state.selectBudget,
      propertySubType : this.state.activePropType,
      floor           : this.state.activeFloor,
      furnishedStatus : this.state.activeFurnishedStatus,
      flatType        : this.state.activeRoom,
      propertyAge     : this.state.activeAge,
      availability    : this.state.activeAvailabe,
    }
    console.log("formValues",formValues);
    axios
      .post("/api/search/properties/", formValues)
      .then((searchResults) => {
        console.log("searchResults",searchResults);
        this.props.navigation.navigate('PropertyList',{searchResults : searchResults.data })
      })
       .catch((error)=>{
            console.log("error = ",error);
            if(error.message === "Request failed with status code 401")
            {
                 swal("Your session is expired! Please login again.","", "error");
            }
      });
  }



  render(){

    const { navigation } = this.props;

    let {activeBtn,activePropType,activeRoom,activeFloor,activeAge,activeAvailabe,activeFurnishedStatus,selectBudget} = this.state;
  
    
    // var value =this.state.value;
    var budget=this.convertNumberToRupees(this.state.selectBudget)

    
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            
            <View style={styles.optionsWrapper}>
              <View style={styles.buttonContainer}>
                {activeBtn=='Residential-Sell'
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
                    onPress         = {()=>this.handleOption('Residential-Sell')}
                    titleStyle      = {styles.buttonText}
                    title           = "Buy"
                    buttonStyle     = {styles.button}
                    // containerStyle  = {[{width:'100%',backgroundColor:'#f0f'}]}
                  />
                }
              </View>

              <View style={styles.buttonContainer}>
              {activeBtn=='Residential-Rent'
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
                  onPress         = {()=>this.handleOption('Residential-Rent')}
                  titleStyle      = {styles.buttonText}
                  title           = "Rent"
                  buttonStyle     = {styles.button}
                />
              }
              </View>

              <View style={styles.buttonContainer}>
              {activeBtn=='Commercial-Sell' || activeBtn=='Commercial-Rent'
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
                  onPress         = {()=>this.handleOption('Commercial-Sell')}
                  titleStyle      = {styles.buttonText}
                  title           = "Commercial"
                  buttonStyle     = {styles.button}
                />
              }
              </View>
            </View>

            {activeBtn === "Commercial-Sell" || activeBtn === "Commercial-Rent" ?
              <View>
                <Text style={[styles.heading,styles.marginBottom5]}>Looking For</Text>
                <View style={[styles.optionsWrapper,styles.marginBottom25]}>
                  <View style={styles.buttonContainer1}>
                    {activeBtn === "Commercial-Sell" ?
                        <Button
                          titleStyle      = {styles.activeButtonText}
                          title           = "Buy"
                          buttonStyle     = {styles.activeButton}
                        />
                    :
                      <Button
                        onPress         = {()=>this.handleTransacrtionType('Commercial-Sell')}
                        titleStyle      = {styles.buttonText}
                        title           = "Buy"
                        buttonStyle     = {styles.button}
                        // containerStyle  = {[{width:'100%',backgroundColor:'#f0f'}]}
                      />
                    }
                  </View>

                  <View style={styles.buttonContainer1}>
                  {activeBtn === "Commercial-Rent"?
                      <Button
                        titleStyle      = {styles.activeButtonText}
                        title           = "Lease"
                        buttonStyle     = {styles.activeButton}
                      />
                  :
                    <Button
                      onPress         = {()=>this.handleTransacrtionType('Commercial-Rent')}
                      titleStyle      = {styles.buttonText}
                      title           = "Lease"
                      buttonStyle     = {styles.button}
                    />
                  }
                  </View>
                </View>
              </View>  
              :
              null
            }

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
                  onChangeText = {(text) => this.handleLocation(text)}
                  value={this.state.location}
                />
              </View>
{/*              <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('SearchProperty')}
                style={styles.searchBtnWrapper}
              >
                <View >
                  <Image 
                    source={require('../../images/key.png') }
                  />
                </View>
              </TouchableOpacity>*/}
            </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Property Type : {this.state.activeBtn!=='commertial'? "Residential" : "Commercial"}</Text>
              <View style={[styles.tabWrap,styles.marginBottom25]}>
               <ScrollView horizontal={true} showsHorizontalScrollIndicator = { false }>
                 {this.state.propertyList.length && this.state.propertyList.length >0 ?
                  this.state.propertyList.map((data,index)=>(
                 <TouchableOpacity 
                    key={index}
                    onPress = {()=>this.setActive(data.name)}
                    style={[(data.checked===true?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,(index==0?styles.borderRadiusLeft2:(index==4)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
                  >
                      <Icon
                        name={data.iconName} 
                        type={data.type}
                        size={data.size}
                        color="white"
                        style={[{paddingLeft:10}]}

                      />
                      <Text style={styles.tabText}> {data.name} </Text>
                  </TouchableOpacity>
                  ))
                  :
                  null
                }
                </ScrollView>
              </View>
            <Text style={[styles.heading,styles.marginBottom5]}>Bedroom</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            {this.state.roomsList && this.state.roomsList.length > 0 ?
              this.state.roomsList.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActiveRoom(data.value)}
                key={index} 
                style={[(data.checked==true?styles.activeTabView2:styles.tabView2),(index==0?styles.borderRadiusLeft2:(index==4)?styles.borderRadiusRight2:null),(index<5)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data.option}</Text>
              </TouchableOpacity>
            ))
            :
            null
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
                value={this.state.selectBudget}
                animationType={"spring"}
                minimumValue={this.state.activeBtn==="Residential-Rent" ? 5000 : 1000000 }
                maximumValue={this.state.activeBtn==="Residential-Rent" ?  1000000:  1000000000}
                step={1}
                minimumTrackTintColor={colors.golden}
                thumbStyle={{backgroundColor:'#fff',height:30,width:20,borderWidth:1,borderColor:'#ccc'}}
                trackStyle={{height:10,borderColor:'#ccc',borderWidth:1}}
                onValueChange={selectBudget => this.setState({ selectBudget })}
              />
            </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Furnish Status</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            {this.state.furnishList.map((data,index)=>(
              <TouchableOpacity 
                onPress = {()=>this.setActiveFurnish(data.value)}
                key={index}
                style={[(data.checked === true?styles.activeTabView:styles.tabView),(index==0?styles.borderRadiusLeft:(index==2)?styles.borderRadiusRight:null),(index<4)?styles.tabBorder:null]}
              >
                  <Icon
                    name="building-o" 
                    type="font-awesome"
                    size={12}
                    color="white"
                  />
                  <Text style={styles.tabText}>{data.value}</Text>
              </TouchableOpacity>
               ))
            }
            </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Floors</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            {this.state.floorsList.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActiveFloor(data.value)}
                key={index} 
                style={[(data.checked === true?styles.activeTabViewFloor:styles.tabViewFloor),(index==0?styles.borderRadiusLeft2:(index==4)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data.option}</Text>
              </TouchableOpacity>
            ))
            }
            
            </View>

            <Text style={[styles.heading,styles.marginBottom5]}>Age</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator = { false }>
            {this.state.ageList.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActiveAge(data.value)}
                key={index} 
                style={[(data.checked===true?styles.activeTabViewAge:styles.tabViewAge),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data.option}</Text>
              </TouchableOpacity>
            ))
            }
            </ScrollView>
            </View>

             <Text style={[styles.heading,styles.marginBottom5]}>Availability</Text>
              <View style={[styles.tabWrap,styles.marginBottom25]}>
              {this.state.availableList.map((data,index)=>(
                <TouchableOpacity 
                  onPress={()=>this.setActiveAvailable(data.value)}
                  key={index} 
                  style={[(data.checked=== true?styles.activeTabViewAvl:styles.tabViewAvl),(index==0?styles.borderRadiusLeft2:(index==3)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
                >
                  <Text style={styles.tabText}>{data.value}</Text>
                </TouchableOpacity>
              ))
              }
              
              </View>

            <Button
              onPress         = {this.handleSearch.bind(this)}
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

