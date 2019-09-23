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
  AsyncStorage,
  Alert
} from 'react-native';
import axios          from 'axios';


import { Button,Icon, SearchBar } from 'react-native-elements';
import ValidationComponent        from "react-native-form-validator";
import HeaderBar                  from '../../layouts/HeaderBar/HeaderBar.js';
import styles                     from './styles.js';
import {colors}                   from '../../config/styles.js';

const window = Dimensions.get('window');

export default class Home extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      searchText      : '',
      activeBtn       : 'Residential-Sell',
      location        :'',
      locSearchResults:'',
      uid:"",
    };
  }


  handleOption = (option)=>{
    this.setState({activeBtn:option});
  }

  componentDidMount(){
    var uid = this.props.navigation.getParam('uid','No uid');
    var token = this.props.navigation.getParam('token','No token');
    this.setState({
      "uid":uid,
      "token":token,
    },()=>{
      console.log("uid",this.state.uid,"token",this.state.token)
    })
    this._retrieveData();
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+ AsyncStorage.getItem("token");
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


            this.setState({
              locSearchResults : citiesAreassubAreas,
            },()=>{
              console.log("locSearchResults",this.state.locSearchResults)
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
    console.log('item1',item)
    this.setState({'searchText':item})
  }

   _renderList = ({ item }) => {
    console.log("item",item);
    return (
     <TouchableWithoutFeedback onPress={(item)=>this._selectedItem(item)}>
       <View style={styles.container}>
            <Text style={styles.item} onPress={(item)=>this._selectedItem(item)}>{item}</Text>
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
    // const originPage = "post" ;
    const token = this.state.token;
    console.log("state token",this.state.token);
    if(token!=="No token"){
      this.props.navigation.navigate('PropertyDetails1');
    }else{
      this.props.navigation.navigate('MobileScreen');
    }
  }

  _retrieveData = async () => {
    try {
      const uid        = await AsyncStorage.getItem('uid');
      const token      = await AsyncStorage.getItem('token');
      console.log("async get token in mob screen out",token);
      if (token !== null ) {
      console.log("async get token in mob screen in",token);

        this.setState({token:token})
      }
    } catch (error) {
    }
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
                <Text style={{fontFamily:'Roboto-Regular'}}>Every dream </Text>
                <Text style={{fontFamily:'Roboto-Medium'}}>has a key</Text>
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
              <View style={styles.container}>
                  <FlatList
                    data={this.state.locSearchResults}
                    renderItem={this._renderList}
                    // renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                  />
              </View>
            </View>

            <View style={[styles.alignCenter,styles.marginBottom30]}>
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

            </View>
          </ImageBackground>
        </ScrollView>
      
      </React.Fragment>
    );
    
  }
}

