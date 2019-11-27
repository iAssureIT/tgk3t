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

  UNSAFE_componentWillReceiveProps(nextProps){
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
    this.setState({
      token:token,
      uid  :uid
    })
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



  login(){
    AsyncStorage.setItem("originPage","post");
    // console.log("token in home screen",this.state.token);
    AsyncStorage.removeItem('propertyId');


    if(this.state.token == null || this.state.token == ""|| this.state.token=="No token"){
       this.navigateScreen("MobileScreen");
    }else{
       this.navigateScreen("BasicInfo");
    }

       // this.navigateScreen("Congratulation");
  }
 
  render(){
    const { navigation } = this.props;
    let {activeBtn} = this.state;
    // console.log("this.props.navigation = ",this.props.navigation);
    return (
      <React.Fragment>
        <HeaderBar navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
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
                    placeholder='Enter Society, Location or Address'
                    onChangeText = {(searchText) => this.handleLocation(searchText)}
                    value={this.state.searchText}
                  />
                </View>
                <TouchableOpacity 
                  onPress = {this.handleSearch.bind(this)}
                  style={styles.searchBtnWrapper}
                >
                  <View >
                    <Image 
                      source={require('../../images/search.jpg') }
                      style={styles.searchBtnWrapper}
                      style={{ width: 20 }}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flatList}>
                  <FlatList
                    data={this.state.locSearchResults}
                    renderItem={this._renderList}
                  />
              </View>
              {/*<View style={[styles.marginBottom30,styles.marginTop20]}>
                <Text style={[styles.heading3,{fontSize:20,textAlign:'center',fontWeight:"900"}]}>Welcome Owners</Text>
                  <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:"#f00",height:40,width:90,transform: [{ rotate: "270deg" }]}}>
                      <Text style={[styles.heading3,{fontSize:30}]}>EARN</Text>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:"#f00"}}>
                      <View style={{marginLeft:0}}>
                        <Text style={[styles.heading3]}>Upto</Text>
                        <Text style={[styles.heading3,{fontSize:45}]}>50%</Text>
                      </View>  
                      <View style={{marginLeft:5}}>
                        <Text style={[styles.heading3,{fontSize:25}]}>BROKERAGE FOR</Text>
                        <Text style={[styles.heading3,{fontSize:25,marginTop:10}]}>LISTING WITH US</Text>
                      </View> 
                    </View>  
                  </View>  
              </View>*/}

              <View style={[styles.marginBottom30,styles.marginTop20]}>
                <Text style={[styles.heading3,{fontSize:20,textAlign:'center',fontWeight:"900",marginBottom:30}]}>Welcome Owners</Text>
                  <View style={{flexDirection:'row',paddingRight:25}}>
                    <View style={styles.block}>
                      <Text style={[styles.heading3,{fontSize:25,width:75,transform: [{ rotate: "270deg" }]}]}>EARN</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:-20}}>
                      <View style={{marginLeft:0}}>
                        <Text style={[styles.heading3]}>Upto</Text>
                        <Text style={[styles.heading3,{fontSize:45}]}>50%</Text>
                      </View>  
                      <View style={{paddingLeft:10}}>
                        <Text style={[styles.heading3,{fontSize:25}]}>BROKERAGE FOR</Text>
                        <Text style={[styles.heading3,{fontSize:25,marginTop:10}]}>LISTING WITH US</Text>
                      </View> 
                    </View>  
                  </View>  
              </View>


              <View style={[styles.alignCenter]}>
                  <Button
                    // onPress         = {()=>this.props.navigation.navigate('MobileScreen')}
                    // onPress         = {()=>this.props.navigation.navigate('PropertyDetails6')}
                    onPress         = {this.login.bind(this)}
                    titleStyle      = {styles.buttonText2}
                    title           = "Post & Earn"
                    buttonStyle     = {styles.button2}
                    containerStyle  = {[styles.buttonContainer2,styles.marginBottom15]}
                    iconRight
                    // icon = {<Icon
                    //   name="chevrons-right" 
                    //   type="feather"
                    //   size={22}
                    //   color="white"
                    // />}

                  /> 
                
                <Text style={styles.heading2}>Upto 50% Discount On</Text>
                <Text style={[styles.heading2,styles.marginBottom15]}>Brokerage For Tenants/Buyers</Text>
              </View>
            </View>
{/*              <View style={[styles.alignCenter,styles.marginBottom30,styles]}>
                <Text style={styles.heading2}>For our Buyers / Tenants</Text>
                <Text style={styles.heading3}>Upto 50% Discount</Text>
                <Text style={styles.heading3}>On Brokerage</Text>
                <Text style={styles.heading3}>for Renting/Buying with us!</Text>
              </View>

              <View style={[styles.alignCenter]}>
                <Text style={[styles.heading2,{marginBottom:10}]}>Welcome Owners</Text>
                  <Button
                    // onPress         = {()=>this.props.navigation.navigate('MobileScreen')}
                    // onPress         = {()=>this.props.navigation.navigate('PropertyDetails6')}
                    onPress         = {this.login.bind(this)}
                    titleStyle      = {styles.buttonText2}
                    title           = "Post & Earn"
                    buttonStyle     = {styles.button2}
                    containerStyle  = {[styles.buttonContainer2,styles.marginBottom15]}
                    iconRight
                    icon = {<Icon
                      name="chevrons-right" 
                      type="feather"
                      size={22}
                      color="white"
                    />}
                  /> 
                
                <Text style={styles.heading2}>Earn upto 50% Brokerage for</Text>
                <Text style={[styles.heading2,styles.marginBottom15]}>Listing With Us!</Text>
              </View>*/}
          </ImageBackground>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

