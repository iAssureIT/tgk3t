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
  Alert,
  Platform
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
import Autocomplete               from 'react-native-autocomplete-input';
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

  componentDidMount(){
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.retrieveToken()
      })
  }

  componentWillUnmount () {
      this.focusListener.remove()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.retrieveToken()
  }

  retrieveToken = async()=>{
    var token = await AsyncStorage.getItem('token')
    var uid = await AsyncStorage.getItem('uid')
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

    this.setState({
      token:token,
      uid  :uid
    })
  }


  handleLocation(value){

  /*
    https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array

    Array.prototype.contains = function(v) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
      }
      return false;
    };

    Array.prototype.unique = function() {
      var arr = [];
      for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
          arr.push(this[i]);
        }
      }
      return arr;
    }

    var duplicates = [1, 3, 4, 2, 1, 2, 3, 8];
    var uniques = duplicates.unique(); // result = [1,3,4,2,8]

    console.log(uniques);

  */


    Array.prototype.contains = function(v) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
      }
      return false;
    };

    Array.prototype.unique = function() {
      var arr = [];
      for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
          arr.push(this[i]);
        }
      }
      return arr;
    }



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
            url: 'http://locationapi.iassureit.com/api/societies/get/searchresults/' + this.state.location,
            // url: 'http://locationapi.iassureit.com/api/subareas/get/searchresults/' + this.state.location,
          })        
        .then((searchResults) => {
          console.log("searchResults",searchResults);
          if(searchResults.data.length>0){
            var cities = searchResults.data.map(a=>a.cityName);
            cities = [...new Set(cities)];

            var areas = searchResults.data.map(a=>a.areaName);
            areas = [...new Set(areas)];

            var subareaName = searchResults.data.map(a=>a.subareaName);
            subareaName = [...new Set(subareaName)];

            var societyName = searchResults.data.map(a=>a.societyName);
            societyName = [...new Set(societyName)];
            console.log("1  societyName  = ",societyName);

            for(let i=0; i<cities.length; i++) {
              for(let j=0; j<areas.length; j++) {
                areas[j] = areas[j] + ', ' + cities[i];
              }
            }         
            console.log("areas = ",areas);

            for(let i=0; i<searchResults.data.length; i++) {
              subareaName[i] = searchResults.data[i].subareaName + ', ' + 
                       searchResults.data[i].areaName + ', ' + 
                       searchResults.data[i].cityName;
            } 
            var uniqueSubareaName = subareaName.unique();

            console.log("uniqueSubareaName = ",uniqueSubareaName);


            for(let i=0; i<searchResults.data.length; i++) {
              societyName[i] = searchResults.data[i].societyName + ', ' + 
                       searchResults.data[i].subareaName + ', ' + 
                       searchResults.data[i].areaName + ', ' + 
                       searchResults.data[i].cityName;
            }
            var uniqueSocietyName = societyName.unique();
            console.log("uniqueSocietyName = ",uniqueSocietyName);



            var citiesAreas = cities.concat(areas);
            var citiesAreasSubAreas = cities.concat(uniqueSubareaName);
            var citiesAreasSubAreasSocieties = citiesAreasSubAreas.concat(uniqueSocietyName);
            console.log("citiesAreasSubAreasSocieties",citiesAreasSubAreasSocieties)

            this.setState({
              locSearchResults : citiesAreasSubAreasSocieties,
            });         

          }
        })
        .catch((error)=>{
              console.log("error = ",error);
              if(error.message === "Request failed with status code 401")
              {
                  swal("Your session is expired! Please login again.","", "error");
                  localStorage.removeItem("uid");
                  localStorage.removeItem("token");
                  this.props.history.push("/");
              }
        });
      }else{
        this.setState({
            locSearchResults : [],
          });  
      }
    })
  }

  _selectedItem(item){
    // console.log("item",item);
    this.setState({'searchText':item,location : item,locSearchResults:""})
    this.setState({locSearchResults:""})
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
    this.setState({locSearchResults:[]})
    const formValues = {
      transactionType : transactionType,
      propertyType    : propertyType,
      location        : this.state.location,
      budget          : "",
      propertySubType : "",
      floor           : "",
      furnishedStatus : "",
      flatType        : "",
      propertyAge     : "",
      availability    : "",
      uid             : this.state.uid,
    }
    console.log("formValues=>",formValues);
    var searchData = JSON.stringify(formValues);
    AsyncStorage.setItem("searchData",searchData);
    this.navigateScreen('PropertyList')
  }

  // hideDropDown(event){
  //   event.preventDefault();
  // }

  login(){
    AsyncStorage.setItem("originPage","post");
    // console.log("token in home screen",this.state.token);
    AsyncStorage.removeItem('propertyId');

    this.setState({location:"",searchText:"",locSearchResults:[]})
    if(this.state.token == null || this.state.token == ""|| this.state.token=="No token"){
       this.navigateScreen("MobileScreen");
    }else{
       this.navigateScreen("BasicInfo");
    }

       // this.navigateScreen("Congratulation");
  }

  clearInputData(){
    this.setState({location:"",searchText:"",locSearchResults:[]})
  }
 
  render(){
    const { navigation } = this.props;
    let {activeBtn} = this.state;
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='always' keyboardShouldPersistTaps="handled" >
          <ImageBackground
            source={require('../../images/lvyobg.png')}
            style={styles.bgImage}
            resizeMode="cover"
          >

            <View style={styles.headingView}>
              <Text style={styles.headingText}>
                Every dream has a key
              </Text>
            </View>

            <View style={styles.heading2View}>
              <Text style={styles.heading2}>
                India's Only Property Portal sharing Brokerage with both Owners and Tenants!
              </Text>
            </View>

            <View style={{zIndex:0,marginTop:330,position:"absolute",marginLeft:"3%"}}>
              <View style={styles.marginTop20}>
                  <View style={{flexDirection:'row',paddingRight:25,marginTop:20}}>
                    <View style={styles.block}>
                      <Text style={[styles.heading3,{fontSize:25,width:75,transform: [{ rotate: "270deg" }]}]}>EARN</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:-18}}>
                      <View style={{marginLeft:0}}>
                        <Text style={[styles.heading3,]}>Upto</Text>
                        <Text style={[styles.heading3,{fontSize:45,}]}>50%</Text>
                      </View>  
                      <View style={{paddingLeft:5}}>
                        <Text style={[styles.heading3,{fontSize:25,}]}>BROKERAGE FOR</Text>
                        <Text style={[styles.heading3,{fontSize:25,marginTop:10,}]}>LISTING WITH US</Text>
                      </View> 
                    </View>  
                  </View>  
              </View>
              <View style = {styles.lineStyle}></View>
              <View style={[styles.marginBottom30]}>
                <Text style={[styles.heading2,{fontSize:14,fontWeight:'bold'}]}>Upto 50% Discount On Brokerage For Tenants/Buyers</Text>
              </View> 
              <View style={[styles.alignCenter]}>
                  <Button
                    onPress         = {this.login.bind(this)}
                    titleStyle      = {styles.buttonText2}
                    title           = "Post & Earn"
                    buttonStyle     = {styles.button2}
                    containerStyle  = {[styles.buttonContainer2,styles.marginBottom15]}
                  /> 
              </View>
            </View> 

            <View style={styles.optionsWrapper}>
              <View style={styles.buttonContainer}>
                {activeBtn=='Residential-Sell'
                ?
                  <React.Fragment>
                    <Button
                      titleStyle      = {styles.activeButtonText}
                      title           = "BUY"
                      buttonStyle     = {styles.activeButton}
                    />
                  </React.Fragment>
                :
                  <Button
                    onPress         = {()=>this.handleOption('Residential-Sell')}
                    titleStyle      = {styles.buttonText}
                    title           = "BUY"
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
                    title           = "RENT"
                    buttonStyle     = {styles.activeButton}

                  />
                </React.Fragment>
              :
                <Button
                  onPress         = {()=>this.handleOption('Residential-Rent')}
                  titleStyle      = {styles.buttonText}
                  title           = "RENT"
                  buttonStyle     = {styles.button}
                />
              }
              </View>

              <View style={styles.buttonContainer1}>
              {activeBtn=='Commercial-Sell' || activeBtn=='Commercial-Rent'
              ?
                <React.Fragment>
                  <Button
                    titleStyle      = {styles.activeButtonText}
                    title           = "COMMERCIAL"
                    buttonStyle     = {styles.activeButton}

                  />
                </React.Fragment>
              :
                <Button
                  onPress         = {()=>this.handleOption('Commercial-Sell')}
                  titleStyle      = {styles.buttonText}
                  title           = "COMMERCIAL"
                  buttonStyle     = {styles.button}
                />
              }
              </View>
            </View>



            <View style={styles.formInputView}>
              <View style={[styles.inputWrapper]}>
                <View style={[styles.inputTextWrapper,Platform.OS==="android" ? this.state.searchText.length > 0 ? {width:"78%"}: {width:"83%"} : null]}>
                  <Autocomplete
                    data                      = {this.state.locSearchResults}
                    style                     = {[{height: 40,fontSize:14,fontFamily:"Roboto-Regular",paddingHorizontal: 5,backgroundColor:"#fff"}]}
                    clearButtonMode           = {'always'} 
                    listStyle                 = {Platform.OS === "android" ? {maxHeight:390,zIndex: 20, position: 'absolute'} : {maxHeight:300,zIndex: 20, position: 'absolute'}} 
                    tintColor                 = {colors.button}
                    inputContainerPadding     = {0}
                    labelHeight               = {15}
                    titleFontSize             = {10}
                    inputContainerStyle       = {{borderColor:"#fff",borderWidth:0}}
                    baseColor                 = {'#666'}
                    textColor                 = {'#666'}
                    placeholder               = "Enter Society, Location or Address..."
                    value                     = {this.state.searchText}
                    onChangeText              = {(searchText) => this.handleLocation(searchText)}
                    keyboardShouldPersistTaps ='always'
                    ontentContainerStyle      = {{flex:1}}
                    renderItem={({ item, i }) => (
                        <TouchableOpacity keyboardShouldPersistTaps='always'  onPress={() => this.setState({ searchText: item,location:item,locSearchResults:[] })}>
                          <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                    )}
                  >
                  </Autocomplete>
                </View>
                {Platform.OS === "android" ?
                  this.state.searchText.length > 0 ? 
                    <View style={{backgroundColor:"#fff",width:"5%",height:40}} onPress={() => this.clearInputData()}> 
                      <Text style={{paddingTop:6,fontSize:18,fontWight:"bold"}} onPress={() => this.clearInputData()}>X</Text>
                    </View>
                    :
                    null
                  :
                  null
                }  
                <TouchableOpacity 
                  onPress = {this.handleSearch.bind(this)}
                  style={styles.searchBtnWrapper}
                >
                    <Image 
                      source={require('../../images/search.jpg') }
                      style={styles.searchBtnWrapper}
                      style={{ width: 20 }}
                      resizeMode="contain"
                    />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

