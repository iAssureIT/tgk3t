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

import { Button,Icon, SearchBar } from 'react-native-elements';

import ValidationComponent from "react-native-form-validator";

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default class Home extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      searchText: '',
      activeBtn: 'buy',
    };
  }

  searchUpdated=(searchText)=>{
    this.setState({searchText});
  }

  handleOption = (option)=>{
    this.setState({activeBtn:option});
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
            source={require('../../images/Home-Screen.png')}
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
            </View>

            <View style={[styles.alignCenter,styles.marginBottom30]}>
              <Text style={styles.heading2}>Tenants/Buyers</Text>
              <Text style={styles.heading3}>Upto 50% Discount</Text>
              <Text style={styles.heading3}>On Brokerage</Text>
              <Text style={styles.heading3}>for Renting/Buying with us!</Text>
            </View>

            <View style={[styles.alignCenter]}>
              <Text style={[styles.heading2,{marginBottom:10}]}>Welcome Owners</Text>
                <Button
                  onPress         = {()=>this.props.navigation.navigate('MobileScreen')}
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

