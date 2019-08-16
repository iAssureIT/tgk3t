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
import { TextField } from 'react-native-material-textfield';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import CheckBox from 'react-native-check-box'

import HeaderBar from '../../layouts/HeaderBar/HeaderBar.js';
import styles from './styles.js';
import {colors,sizes} from '../../config/styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from "react-native-datepicker";

const window = Dimensions.get('window');

export default class PropertyDetails4 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      superArea : '',
      builtArea : '',
      expectedRate : '',
      totalAsk : '',
      totalAskIndex : 0,
      availableFromDate : '',
      dropdownData:[
      {
        value: 'Monthly'
      },
      {
        value: 'Yearly'
      }],
      internalAmenities: [
        {
          value: 'Gas Pipeline',
          checked: false,
          iconName: 'pipe',
          iconType: 'material-community' 
        },{
          value: 'Internet Services',
          checked: false,
          iconName: 'wifi',
          iconType: 'feather'
        },{
          value: 'Lift',
          checked: false,
          iconName: 'elevator',
          iconType: 'foundation'
        },{
          value: 'Air Conditioner',
          checked: false,
          iconName: 'air-conditioner',
          iconType: 'material-community'
        },{
          value: 'Intercom',
          checked: false,
          iconName: 'user-check',
          iconType: 'feather'
        },{
          value: 'Power Backup',
          checked: false,
          iconName: 'battery-alert',
          iconType: 'material-community'
        },{
          value: 'Water Supply',
          checked: false,
          iconName: 'water-pump',
          iconType: 'material-community',
          options:[
            {
              value: '24x7',
              checked: false
            },{
              value: 'Corporation',
              checked: false
            },{
              value: 'Borewell',
              checked: false
            },
          ]
        }
      ],
      externalAmenities: [
        {
          value: 'Club House',
          checked: false,
          iconName: 'cards-playing-outline',
          iconType: 'material-community' 
        },{
          value: 'Shopping Center',
          checked: false,
          iconName: 'shopping',
          iconType: 'material-community'
        },{
          value: 'Sewage Treatment Plant',
          checked: false,
          iconName: 'building',
          iconType: 'font-awesome'
        },{
          value: 'Swimming Pool',
          checked: false,
          iconName: 'swim',
          iconType: 'material-community'
        },{
          value: 'Children\'s Play Area',
          checked: false,
          iconName: 'child',
          iconType: 'font-awesome'
        },{
          value: 'Internal Gym',
          checked: false,
          iconName: 'run',
          iconType: 'material-community'
        },{
          value: 'Park',
          checked: false,
          iconName: 'trees',
          iconType: 'foundation',
        }
      ],
    };
  }

  onSelect=(index,value)=>{
    this.setState({
      totalAskIndex: index,
    });
  }

  handleOnClickInternal = (index)=>{
    let {internalAmenities} = this.state;
    let checked = !internalAmenities[index].checked;
    internalAmenities[index].checked = checked;
    this.setState({internalAmenities});
  }

  handleOnClickInternalOption = (index,optionIndex)=>{
    let {internalAmenities} = this.state;
    let options = internalAmenities[index].options;
    let checked = !options[optionIndex].checked;
    options[optionIndex].checked = checked;
    internalAmenities[index].options = options;
    this.setState({internalAmenities});
  }

  handleOnClickExternal = (index)=>{
    let {externalAmenities} = this.state;
    let checked = !externalAmenities[index].checked;
    externalAmenities[index].checked = checked;
    this.setState({externalAmenities});
  }

  render(){

    const { navigation } = this.props;
    let {activeTab} = this.state;

    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
                My Apartment has following Amenities
              </Text>
            </View>

            <View style={styles.divider}></View>

            <Text style={[styles.heading3,styles.marginBottom5]}>Select the amenities available</Text>
            
            <Text style={[styles.heading2,styles.marginBottom15]}>Internal</Text>
            <View style={{}}>
              {this.state.internalAmenities.map((data,index)=>(
                <React.Fragment key={index}>
                  <CheckBox
                    key={index}
                    style={{marginBottom:10}}
                    onClick={() => this.handleOnClickInternal(index)}
                    isChecked={data.checked}
                    rightTextStyle={{marginLeft:0}}
                    checkBoxColor= {colors.grey}
                    rightTextView = {
                      <View style={{flexDirection:'row',flex:1}}>
                        <Icon
                          name={data.iconName} 
                          type={data.iconType}
                          size={18}
                          color= {colors.button}
                          containerStyle = {{marginHorizontal:10}}
                        />
                        <Text style={styles.inputText}>{data.value}</Text>
                      </View>
                    }
                  />
                  {data.options
                  ? 
                    <View style={{paddingLeft:30}}>
                      {data.options.map((optionData,optionIndex)=>(
                        <CheckBox
                          key={optionIndex}
                          style={{marginBottom:10}}
                          onClick={() => this.handleOnClickInternalOption(index,optionIndex)}
                          isChecked={optionData.checked}
                          rightTextStyle={{marginLeft:0}}
                          checkBoxColor= {colors.grey}
                          rightTextView = {
                          <View style={{flex:1}}>
                            <Text style={[styles.inputText,{marginLeft:10}]}>{optionData.value}</Text>
                          </View>}
                        />  
                      ))
                      }
                      
                    </View>
                  :
                    null
                  }
                </React.Fragment>  
              ))
              }
            </View>

            <View style={styles.dividerInside}></View>

            <Text style={[styles.heading2,styles.marginBottom15]}>External</Text>
            <View style={styles.marginBottom15}>
              {this.state.externalAmenities.map((data,index)=>(
                <React.Fragment key={index}>
                  <CheckBox
                    key={index}
                    style={{marginBottom:10}}
                    onClick={() => this.handleOnClickExternal(index)}
                    isChecked={data.checked}
                    rightTextStyle={{marginLeft:0}}
                    checkBoxColor= {colors.grey}
                    rightTextView = {
                      <View style={{flexDirection:'row',flex:1}}>
                        <Icon
                          name={data.iconName} 
                          type={data.iconType}
                          size={18}
                          color= {colors.button}
                          containerStyle = {{marginHorizontal:10}}
                        />
                        <Text style={styles.inputText}>{data.value}</Text>
                      </View>
                    }
                  />
                </React.Fragment>  
              ))
              }
            </View>            

            <Button
              onPress         = {()=>this.props.navigation.navigate('PropertyDetails5')}
              titleStyle      = {styles.buttonText}
              title           = "Save & Next"
              buttonStyle     = {styles.button}
              containerStyle  = {[styles.buttonContainer,styles.marginBottom15]}
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

