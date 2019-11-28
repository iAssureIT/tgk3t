//Module -Search Property
//Developer Name - Rushikesh Salunkhe
/*-----------------------------------------------------------*/
import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  FlatList,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,TextInput,
  Alert,
  Platform,
  // AsyncStorage,
 TouchableWithoutFeedback

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
import AsyncStorage                       from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import Loading                    from '../../layouts/Loading/Loading.js'

const window = Dimensions.get('window');

export default class SearchProperty extends ValidationComponent{

navigateScreen=(route)=>{
    const navigateAction = StackActions.push({
    routeName: route,
    params: {},
    action: NavigationActions.navigate({ routeName: route }),
  });
  this.props.navigation.dispatch(navigateAction);
}
  constructor(props){
    super(props);
    this.state={
      location            : '',
      activeBtn             : 'Residential-Sell',
      includeNearby         : false,
      activePropType        : [],
      selectBudget          : "",
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
      furnishList           : [],
      uid                   : "",
      token                 : "",
      // btnLoading            : false,
      locSearchResults      : "",
      budgetList            : [],
      budgetList1           : [],
      budgetList2           : [],
      isLoading :true,
    };
  }


  componentDidMount(){


      this.setState({
      // searchText :searchResults !== "No Result" ? searchResults.location : "",
      // activeBtn:searchResults !== "No Result" ? searchResults.property : 'Residential-Sell',
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
        {name:'Penthouse',             checked:false, iconName:"office-building", type:"material-community",       size:16}
      ],
      propertyList2 : [
        {name:'Office in IT Park/SEZ',    checked:false, iconName:"building-o",      type:"font-awesome",       size:12},
        {name:'Commercial Office Space',  checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Commercial Showroom',      checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Commercial Shop',          checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Industrial Building',      checked:false, iconName:"office-building", type:"material-community", size:16},
        {name:'Warehouse/Godown',         checked:false, iconName:"office-building", type:"material-community", size:16}
      ],
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
        {value:"0",   option:"Immediate",  checked:false},
        {value:"14",  option:"2 Weeks",  checked:false},
        {value:"30",  option:"2-4 Weeks",  checked:false},
        {value:"31",  option:"After a month", checked:false},
      ],
    },()=>{
       this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this._retrieveData()
      })
    })
   // var searchResults = this.props.navigation.getParam('searchResults','No Result');
   // console.log("searchResults",searchResults)
   
  }


  componentWillUnmount () {
    this.focusListener.remove()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this._retrieveData()
  }
  
   _retrieveData = async () => {
    try {
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      const tempSearchData      = await AsyncStorage.getItem('searchData');
      // AsyncStorage.setItem('newProp',false);
      if (uid !== null && token !== null || tempSearchData!== null) {
          // We have data!!
          this.setState({uid:uid})
          this.setState({token:token})
          var searchData = JSON.parse(tempSearchData);
          console.log("searchData1=>",searchData);
          var activeBtn=searchData.propertyType+"-"+searchData.transactionType;
          this.setState({
            isLoading  :false,
            searchText :searchData.location ? searchData.location : "",
            location   :searchData.location ? searchData.location : "",
            activeBtn  :activeBtn ? activeBtn : 'Residential-Sell',
          })

        if(searchData.propertyType === "Residential"){
          this.setState({propertyList:this.state.propertyList1})
        }else{
          this.setState({propertyList:this.state.propertyList2})
        }

        if(searchData.transactionType === "Sell"){
          this.setState({budgetList:this.state.budgetList1})
        }else{
          this.setState({budgetList:this.state.budgetList2})
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  }


  handleOption = (option)=>{
    this.setState({
      activeBtn:option
    },()=>{
      var propertyList = [];
      if(this.state.activeBtn === "Commercial-Sell" || this.state.activeBtn === "Commercial-Rent"){
        this.setState({
          propertyList:this.state.propertyList2,
          activePropType:[],
        })
      }else{
        this.setState({
          propertyList:this.state.propertyList1,
          activePropType:[],
        })
      }
      if(this.state.activeBtn === "Residential-Sell" || this.state.activeBtn === "Commercial-Sell"){
        this.setState({
          budgetList : this.state.budgetList1,
          selectBudget: "",
        })
      }else{
        this.setState({
          budgetList : this.state.budgetList2,
          selectBudget: "",
        })
      }
    });
  }

  handleTransacrtionType = (value)=>{
    this.setState({
      activeBtn: value
    },()=>{
      var budget = [];
      console.log("activeBtn",this.state.activeBtn)
      if(this.state.activeBtn === "Residential-Sell" || this.state.activeBtn === "Commercial-Sell"){
        this.setState({
          budgetList : this.state.budgetList1,
          selectBudget: "",
        });
      }else{
        this.setState({
          budgetList : this.state.budgetList2,
          selectBudget:"",
        });
      }
    })

  }

  handleIncludeNearby = ()=>{
    this.setState({includeNearby: !this.state.includeNearby});
  }

  selectBudget = (value)=>{
    var budgetList =this.state.budgetList;
    for (var i =budgetList.length - 1; i >= 0; i--){
      if(budgetList[i].value === value){
        if(budgetList[i].checked === true){
          budgetList[i].checked = false;
            this.setState({selectBudget:""})
        }else{
          for (var j =budgetList.length - 1; j >= 0; j--){
            budgetList[j].checked = false;
            this.setState({selectBudget:""})
          }
          budgetList[i].checked = true;
        }
      }
    }
    this.setState({
      budgetList:budgetList,
      selectBudget:value
    });
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
    return Math.floor(Number(totalPrice) >= 1.0e+7)

    ? Math.floor(Number(totalPrice) / 1.0e+7) + " Cr"

    : Math.floor(Number(totalPrice) >= 1.0e+5)

    ? Math.floor(Number(totalPrice) / 1.0e+5) + " Lac"

    : Math.floor(Number(totalPrice) >= 1.0e+3)

    ? Math.floor(Number(totalPrice) / 1.0e+3) + " K"

    : Math.floor(Number(totalPrice));
  }

  handleSearch = (value)=>{
    // this.setState({btnLoading:true})
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
      uid             : this.state.uid,
    }
    var searchData = JSON.stringify(formValues);
    AsyncStorage.setItem("searchData",searchData);
    this.navigateScreen('PropertyList')

    // axios
    //   .post("/api/search/properties/", formValues)
    //   .then((searchResults) => {
    //     this.setState({btnLoading:false})
    //   })
    //    .catch((error)=>{
    //         console.log("error = ",error);
    //             this.setState({btnLoading:false})
    //         if(error.message === "Request failed with status code 401")
    //         {
    //              swal("Your session is expired! Please login again.","", "error");
    //         }
    //   });
  }

   _selectedItem(item){
    this.setState({locSearchResults:""})
    // console.log("item",item);
    this.setState({'searchText':item,location : item,})
  }

  

    _renderList = ({ item }) => {
    // console.log("item",item)
    return (
     <TouchableWithoutFeedback onPress={()=>this._selectedItem(item)}>
       <View>
            <Text style={styles.item}>{item}</Text>
        </View>
     </TouchableWithoutFeedback>
    );
}

 handleLocation(value){
    var location =value;
    console.log("location",location);
    this.setState({
      searchText:value,
      location : location,
    },()=>{
      if(this.state.location.length>=3)
      {
      axios({
            method: 'get',
            url: 'http://locationapi.iassureit.com/api/subareas/get/searchresults/' + this.state.location,
          })        
        .then((searchResults) => {
          if(searchResults.data.length>0){
            var cities = searchResults.data.map(a=>a.cityName);
            cities = [...new Set(cities)];

            var areas = searchResults.data.map(a=>a.areaName);
            areas = [...new Set(areas)];

            var subareaName = searchResults.data.map(a=>a.subareaName);
            subareaName = [...new Set(subareaName)];

            for(let i=0; i<cities.length; i++) {
              for(let j=0; j<areas.length; j++) {
                areas[j] = areas[j] + ', ' + cities[i];
              }
            }

            for(let i=0; i<cities.length; i++) {
              for(let j=0; j<subareaName.length; j++) {
                subareaName[j] = subareaName[j] + ', ' + cities[i];
              }
            }

            var citiesAreas = cities.concat(areas);
            var citiesAreassubAreas = citiesAreas.concat(subareaName);
            console.log("citiesAreassubAreas",citiesAreassubAreas);

            this.setState({
              locSearchResults : citiesAreassubAreas,
            });         

          }
        })
            .catch((error) =>{
              console.log("error = ", error);
            }); 
      }
    })
  }

 resetSearchData(){
    var ageList =this.state.ageList;
    for (var i =ageList.length - 1; i >= 0; i--){
      ageList[i].checked = false;
      this.setState({activeAge:""})
    }
    this.setState({ageList:ageList});

    var propertyList =this.state.propertyList;
    for (var i =propertyList.length - 1; i >= 0; i--){
      propertyList[i].checked = false;
      this.setState({activePropType:[]})
    }
    this.setState({propertyList:propertyList});

    var roomsList =this.state.roomsList;
    for (var i =roomsList.length - 1; i >= 0; i--){
      roomsList[i].checked = false;
      this.setState({activeRoom:[]})
    }
    this.setState({roomsList:roomsList});

    var floorsList =this.state.floorsList;
    for (var i =floorsList.length - 1; i >= 0; i--){
      floorsList[i].checked = false;
      this.setState({activeFloor:""})
    }
    this.setState({floorsList:floorsList});

     var availableList =this.state.availableList;
    for (var i =availableList.length - 1; i >= 0; i--){
      availableList[i].checked = false;
      this.setState({activeAvailabe:""})
    }
    this.setState({availableList:availableList});

    var furnishList =this.state.furnishList;
    for (var i =furnishList.length - 1; i >= 0; i--){
      furnishList[i].checked = false;
      this.setState({activeFurnishedStatus:""})
    }
    this.setState({furnishList:furnishList});

     var budgetList =this.state.budgetList;
    for (var i =budgetList.length - 1; i >= 0; i--){
      budgetList[i].checked = false;
      this.setState({selectBudget:""})
    }
    this.setState({budgetList:budgetList});
    this.setState({
      activeBtn:"Residential-Sell",
      searchText: "",
      budgetList:this.state.budgetList1,
    });
  }


  render(){

    const { navigation } = this.props;

    let {activeBtn,activePropType,activeRoom,activeFloor,activeAge,activeAvailabe,activeFurnishedStatus,selectBudget} = this.state;
  
    
    // var value =this.state.value;
    // var budget=this.convertNumberToRupees(this.state.selectBudget)

    
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>
        {this.state.isLoading === false ?
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
            
            <View style={styles.formWrapper}>
             {/* <Button
                onPress         = {()=>this.resetSearchData()}
                titleStyle      = {styles.buttonSubmitText}
                title           = "Reset"
                buttonStyle     = {[styles.buttonSubmit,{backgroundColor:"#e25e77"}]}
                containerStyle  = {[styles.buttonSubmitContainer,styles.marginBottom15,{marginTop:15,marginLeft:2}]}
                iconRight
                icon = {<Icon
                  name="sync" 
                  type="rotate-ccw"
                  size={22}
                  color="white"
                />}
            />*/}
              <View style={styles.resetBtn} >
                 <Icon 
                  name="sync" 
                  type="rotate-ccw" 
                  size={22}  
                  color={colors.danger} 
                  style={{}}
                  onPress= {()=>this.resetSearchData()}
                />
                <Text style={{color:"#e25e77",paddingHorizontal:5,fontSize:15}} onPress= {()=>this.resetSearchData()}>Reset Filters</Text>
              </View>  
              <View style={styles.optionsWrapper}>
                <View style={styles.buttonContainer}>
                  {
                    activeBtn=='Residential-Sell'
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
                {
                  activeBtn=='Residential-Rent'
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
                {
                  activeBtn=='Commercial-Sell' || activeBtn=='Commercial-Rent'
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

              {
                activeBtn === "Commercial-Sell" || activeBtn === "Commercial-Rent" ?
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
                  containerStyle={[styles.searchContainer]}
                  inputContainerStyle={styles.searchInputContainer}
                  inputStyle={styles.searchInput}
                  placeholder='Enter Society, Location or Address'
                  onChangeText = {(searchText) => this.handleLocation(searchText)}
                  value={this.state.searchText}
                  />
               {/*   <View style={styles.flatList}>
                      <FlatList
                        data={this.state.locSearchResults}
                        renderItem={this._renderList}
                        // renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                      />
                  </View>*/}
              </View>
              {
                Platform.OS === 'android' ?
                  <View style={[styles.flatList,{marginTop:50,marginLeft:'10%'}]}>
                    <FlatList
                      data={this.state.locSearchResults}
                      renderItem={this._renderList}
                    />
                  </View>
                  :
                  null
                }
              </View>
              {
                Platform.OS === 'ios' ?
                <View style={[styles.flatList,{marginTop:50,marginLeft:'10%'}]}>
                  <FlatList
                    data={this.state.locSearchResults}
                    renderItem={this._renderList}
                  />
                </View>
                :
                null
              }
            <Text style={[styles.heading,styles.marginBottom5]}>Property Type : {this.state.activeBtn === "Residential-Rent" ||  this.state.activeBtn === "Residential-Sell" ? "Residential" : "Commercial"}</Text>
            <View style={[styles.tabWrap,styles.marginBottom25]}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator = { false }>
               {this.state.propertyList.length && this.state.propertyList.length >0 ?
                this.state.propertyList.map((data,index)=>(
               <TouchableOpacity 
                  key={index}
                  onPress = {()=>this.setActive(data.name)}
                  style={this.state.activeBtn === "Residential-Rent" || this.state.activeBtn === "Residential-Sell" ?
                    [(data.checked===true?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,(index==0?styles.borderRadiusLeft2:(index==4)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]
                    :
                    [(data.checked===true?styles.activeTabViewAuto:styles.tabViewAuto),styles.paddLeft5,(index==0?styles.borderRadiusLeft2:(index==5)?styles.borderRadiusRight2:null),(index<7)?styles.tabBorder:null]
                  }
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
            {this.state.activeBtn === "Residential-Rent" || this.state.activeBtn === "Residential-Sell" ?
                <View>  
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
                </View>
              :null  
            }
            <Text style={[styles.heading,styles.marginBottom5]}>Price Range</Text>
           {/* <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
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
                <Text style={styles.inputText}>{this.state.activeBtn==="Residential-Rent" || this.state.activeBtn==="Commercial-Rent"  ? "10 Lac"  : "100 Cr"}</Text>
              </View>
            </View>
            <View style={[{width:'100%'}]}>
              <Slider
                value={this.state.selectBudget}
                animationType={"spring"}
                minimumValue={this.state.activeBtn==="Residential-Rent" || this.state.activeBtn==="Commercial-Rent" ? 0 : 0 }
                maximumValue={this.state.activeBtn==="Residential-Rent" || this.state.activeBtn==="Commercial-Rent" ? 1000000:  1000000000}
                step={1}
                minimumTrackTintColor={colors.golden}
                thumbStyle={{backgroundColor:'#fff',height:30,width:20,borderWidth:1,borderColor:'#ccc'}}
                trackStyle={{height:10,borderColor:'#ccc',borderWidth:1}}
                onValueChange={selectBudget => this.setState({ selectBudget })}
              />
            </View>*/}
            <View style={[styles.tabWrap,styles.marginBottom25]}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator = { false }>
            {this.state.budgetList.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.selectBudget(data.value)}
                key={index} 
                style={[(data.checked===true?styles.activeTabViewAge:styles.tabViewAge),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data.option}</Text>
              </TouchableOpacity>
            ))
            }
            </ScrollView>
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
                  <Text style={styles.tabText}>{data.option}</Text>
                </TouchableOpacity>
              ))
              }
              
              </View>
              <Button
                onPress         = {this.handleSearch.bind(this)}
                titleStyle      = {styles.buttonSubmitText}
                title           = "Search"
                buttonStyle     = {styles.buttonSubmit}
                containerStyle  = {[styles.buttonSubmitContainer,styles.marginBottom45]}
                iconRight
                icon = {<Icon
                  name="chevrons-right" 
                  type="feather"
                  size={24}
                  color="white"
                />}
              />              
            
          </View>
        </ScrollView>
        :
         <Loading /> 
       }
      </React.Fragment>
    );
    
  }
}

