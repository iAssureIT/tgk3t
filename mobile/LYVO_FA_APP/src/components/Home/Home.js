
import React, { Component } from 'react';
import {
  ScrollView,
  FlatList,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,TextInput,
  TouchableWithoutFeedback,
  // AsyncStorage,
  Alert
} from 'react-native';

// import { NavigationActions } from 'react-navigation'
import axios                      from 'axios';
import { Button,Icon, SearchBar } from 'react-native-elements';
import ValidationComponent        from "react-native-form-validator";
import HeaderBar                  from '../../layouts/HeaderBar/HeaderBar.js';
import styles                     from './styles.js';
import {colors}                   from '../../config/styles.js';
import AsyncStorage               from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import { KeyboardAwareScrollView }          from 'react-native-keyboard-aware-scroll-view';

const window = Dimensions.get('window');

export default class Home extends Component{

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
    // this.retrieveToken()
    this.state={
      searchText      : '',
      activeBtn       : 'Residential-Sell',
      location        :'',
      locSearchResults:'',
      uid             :"",
      token           :"",
    };
  }


  handleOption = (option)=>{
    this.setState({activeBtn:option});
  }

  componentWillReceiveProps(nextProps){
        this.retrieveToken();
  }

  componentDidMount(){
    // console.log("navigateScreen",this.navigateScreen);
        // var uid = this.props.navigation.getParam('uid','No uid');
        // var token = this.props.navigation.getParam('token','No token');
      this.retrieveToken();
      // console.log("token home componentDidMount",AsyncStorage.getItem('token'));
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ AsyncStorage.getItem('token');
  }

  retrieveToken = async()=>{
    var token = await AsyncStorage.getItem('token')
    var uid = await AsyncStorage.getItem('uid')
    this.setState({token:token})
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

  handleSearch = (event)=>{
    var property      = this.state.activeBtn.split("-");
    var propertyType  = property[0];
    var transactionType = property[1];
    const formValues = {
      property  : this.state.activeBtn,   
      location  : this.state.location,
    }
   this.props.navigation.navigate('SearchProperty',{searchResults : formValues})
  }



  login(){
    AsyncStorage.setItem("originPage","post");
    // console.log("token in home screen",this.state.token);
    AsyncStorage.removeItem('propertyId');


    if(this.state.token == null || this.state.token == ""|| this.state.token=="No token"){
       this.navigateScreen("MobileScreen");
    }else{
       this.navigateScreen("BasicInfo");
    }
       // this.navigateScreen("Availability");
  }
 
  render(){
    const { navigation } = this.props;
    let {activeBtn} = this.state;
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <KeyboardAwareScrollView>   
           <View style={{ flex: 1,borderWidth:0,paddingTop:0,backgroundColor:'#fff'}}>
              <View style={{flex:1,paddingVertical:0}}>
                <ScrollView createContainerStyle={{borderWidth:0,margin:0}}> 
                  <View style={styles.headerBox}>
                      <View style={{alignItems:"center"}}>
                        <Text style={styles.header}>Dashboard</Text>
                      </View>  
                      <View style={{flexDirection:"row",marginTop:10}}>
                        <Text style={[styles.title,{color:"#fff",paddingHorizontal:16,fontSize:14}]}>Office: Hadapsar Pune</Text>
                        <Text style={[styles.title,{color:"#fff",paddingHorizontal:16,fontSize:14}]}>Field Agent : Amit Khandekar</Text>
                      </View>  
                  </View>                        
                  <View style={{flexDirection:'row',width:"94%"}}>
                      <TouchableOpacity style={styles.boxV} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"New Action"})}>
                        <View style={{alignItems:'center'}}>
                            <Image 
                              source={require('../../images/icons/49.png') }
                              style={{ width: 70,height:50 }}
                              resizeMode="contain"
                            />
                            <Text style={styles.title}>New Query</Text>
                            <Text style={styles.titleNo}>5</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.boxV} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"Meetings"})}>
                          <View style={{alignItems:'center'}}>
                              <Image 
                                source={require('../../images/icons/50.png') }
                                style={{ width: 70,height:50 }}
                                resizeMode="contain"
                              />
                              <Text style={styles.title}>Meetings</Text>
                              <Text style={styles.titleNo}>9</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{flexDirection:'row',width:"94%"}}>
                      <TouchableOpacity style={styles.boxV} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"Property Shown"})}>
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={require('../../images/icons/51.png') }
                                style={{ width: 70,height:50 }}
                                resizeMode="contain"
                              />
                            <Text style={styles.title}>Property Shown</Text>
                            <Text style={styles.titleNo}>3</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.boxV} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"Shortlisted"})}>
                          <View style={{alignItems:'center'}}>
                              <Image 
                                source={require('../../images/icons/52.png') }
                                style={{ width: 70,height:50 }}
                                resizeMode="contain"
                              />
                              <Text style={styles.title}>Shortlist</Text>
                              <Text style={styles.titleNo}>2</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{flexDirection:'row',width:"94%"}}>
                      <TouchableOpacity style={styles.boxV} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"Token Received"})}>
                          <View style={{alignItems:'center'}}>
                              <Image 
                                source={require('../../images/icons/53.png') }
                                style={{ width: 70,height:50 }}
                                resizeMode="contain"
                              />
                              <Text style={styles.title}>Token Recieved</Text>
                              <Text style={styles.titleNo}>1</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.boxV} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"Contract"})}>
                          <View style={{alignItems:'center'}}>
                              <Image 
                                source={require('../../images/icons/54.png') }
                                style={{ width: 70,height:50 }}
                                resizeMode="contain"
                              />
                              <Text style={styles.title}>Contract</Text>
                              <Text style={styles.titleNo}>4</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{flexDirection:'row',width:"94%"}}>
                      <TouchableOpacity style={[styles.boxV,{marginBottom:20}]} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"Sales Office Message"})}>
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={require('../../images/icons/55.png') }
                                style={{ width: 70,height:50 }}
                                resizeMode="contain"
                              />
                            <Text style={styles.title}>Sales Office Message</Text>
                            <Text style={styles.titleNo}>3</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.boxV,{marginBottom:20}]} onPress={()=>this.props.navigation.navigate('PropertyList',{'status':"Report"})}>
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={require('../../images/icons/56.png') }
                                style={{ width: 70,height:50 }}
                                resizeMode="contain"
                              />
                            <Text style={styles.title}>Report</Text>
                            <Text style={styles.titleNo}>8</Text>
                        </View>
                      </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
             </View>
          </KeyboardAwareScrollView>   
        </ScrollView>
      </React.Fragment>
    );
    
  }
}

