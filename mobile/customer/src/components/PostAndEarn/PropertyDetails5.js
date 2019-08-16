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
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";
import SwitchToggle from 'react-native-switch-toggle';

const window = Dimensions.get('window');

export default class PropertyDetails5 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      mobile : '',
      builtArea : '',
      expectedRate : '',
      totalAsk : '',
      activeIndex : 0,
      availableFromDate : '',
      dropdownData:[
      {
        value: 'EveryDay'
      },
      {
        value: 'Sunday'
      }],
      toggle : false,
      toggleText:'I'
    };
  }

  setActive=(index)=>{
    this.setState({activeIndex:index});
  }

  onToggle=()=>{
    let {toggle} = this.state;
    if(toggle){
      this.setState({toggleText:'I'})
    }else{
      this.setState({toggleText:'Someone else'})
    }
    this.setState({toggle:!this.state.toggle});
  }

  render(){

    const { navigation } = this.props;
    let {activeIndex} = this.state;
    let weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    let tableData = [
      {availability:'Weekend', time: '5pm - 7pm'},
      {availability:'Mon, Wed', time: '11pm - 1pm'},
      {availability:'EveryDay', time: '8pm - 10pm'},
    ];

    return (
      <React.Fragment>
        <HeaderBar showBackBtn={true} navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
          <View style={styles.formWrapper}>
            <View>
              <Text style={styles.heading}>
                Please tell us your availability to plan visit
              </Text>
            </View>

            <View style={styles.divider}></View>

            <Text style={[styles.heading2,styles.marginBottom5]}>Who will show?</Text>
            <View style={styles.marginBottom15}>
              <SwitchToggle
                switchOn={this.state.toggle}
                onPress={()=>this.onToggle()}
                circleColorOn={colors.button}
                circleColorOff={colors.primary}
                buttonText={this.state.toggleText}
                containerStyle={{
                  width: 140,
                  height: 38,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  padding: 0,
                  borderWidth:1,
                  borderColor:'#ccc',
                  padding:2
                }}
                circleStyle={{
                  width: 100,
                  height: 34,
                  borderRadius: 20,
                  justifyContent:'center',
                  alignItems:'center',
                }}
                buttonTextStyle={{
                  color:'#fff',
                  fontFamily:'Roboto-Regular',
                  fontSize: 13
                }}
              />
            </View>
            
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="mobile" type="entypo" size={16}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label                 = "Phone Number"
                  onChangeText          = {mobile => {this.setState({mobile})}}
                  lineWidth             = {1}
                  tintColor             = {colors.button}
                  inputContainerPadding = {0}
                  labelHeight           = {15}
                  labelFontSize         = {sizes.label}
                  titleFontSize         = {sizes.title}
                  baseColor             = {'#666'}
                  textColor             = {'#666'}
                  value                 = {this.state.mobile}
                  containerStyle        = {styles.textContainer}
                  inputContainerStyle   = {styles.textInputContainer}
                  titleTextStyle        = {styles.textTitle}
                  style                 = {styles.textStyle}
                  labelTextStyle        = {styles.textLabel}
                  keyboardType          = "numeric"
                />
              </View>
            </View>

            <Text style={[styles.heading2,styles.marginBottom15]}>Visiting Schedule (Add as many as you like)</Text>
            <View style={[styles.inputWrapper,styles.marginBottom25]}>
              <View style={styles.inputImgWrapper}>
                <Icon name="calendar" type="font-awesome" size={18}  color="#aaa" style={{}}/>
              </View>
              <View style={styles.inputTextWrapper}>
                <Dropdown
                  label               = 'Availability'
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
                  labelTextStyle      = {styles.ddLabelText}
                  style               = {styles.ddStyle}
                  data                = {this.state.dropdownData}
                  value               = {this.state.availability}
                  onChangeText        = {availability => {this.setState({availability});}}
                />
              </View>
            </View>
            
            <View style={[{width:'100%',flexDirection:'row',justifyContent:'space-between'},styles.marginBottom25]}>
              <View style={[styles.inputWrapper2]}>
                <View style={styles.inputImgWrapper2}>
                  <Icon name="calendar" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper2}>
                  <DatePicker
                    style={{
                      flex:1,
                      width: "100%",
                      marginRight:5,
                    }}
                    date={this.state.fromDate}
                    mode="date"
                    placeholder="From"
                    format="DD/MM/YYYY"
                   
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        alignItems:'flex-start',
                        fontFamily:'Montserrat-Regular',
                        paddingLeft:5
                      },
                      dateTouchBody:{
                        fontFamily:'Montserrat-Regular'
                      },
                      dateText:{
                        fontFamily:'Montserrat-Regular'
                      },
                      placeholderText:{
                        fontFamily:'Montserrat-Regular'
                      }
                    }}
                    onDateChange={fromDate => {this.setState({ fromDate})}}
                    showIcon = {false}
                    minDate = {new Date()}
                  />
                </View>
              </View>

              <View style={[styles.inputWrapper2]}>
                <View style={styles.inputImgWrapper2}>
                  <Icon name="calendar" type="font-awesome" size={16}  color="#aaa" style={{}}/>
                </View>
                <View style={styles.inputTextWrapper2}>
                  <DatePicker
                    style={{
                      flex:1,
                      width: "100%",
                      marginRight:5,
                    }}
                    date={this.state.startTime}
                    mode="date"
                    placeholder="Start Time"
                    format="DD/MM/YYYY"
                   
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        alignItems:'flex-start',
                        fontFamily:'Montserrat-Regular',
                        paddingLeft:5
                      },
                      dateTouchBody:{
                        fontFamily:'Montserrat-Regular'
                      },
                      dateText:{
                        fontFamily:'Montserrat-Regular'
                      },
                      placeholderText:{
                        fontFamily:'Montserrat-Regular'
                      }
                    }}
                    onDateChange={startTime => {this.setState({ startTime})}}
                    showIcon = {false}
                    minDate = {new Date()}
                  />
                </View>
              </View>
            </View> 

            <View style={[{width:'40%'},styles.marginBottom15]}>
              <Button
                titleStyle      = {styles.buttonSmallText}
                title           = "Add Slot"
                buttonStyle     = {styles.buttonSmall}
                containerStyle  = {[styles.buttonContainer,styles.marginBottom15]}
                iconRight
                icon = {<Icon
                  name="plus" 
                  type="material-community"
                  size={20}
                  color={colors.black}
                />}
              />
            </View> 

            <View style={[styles.marginBottom25,styles.weekWrap]}>
            {weekDays.map((data,index)=>(
              <TouchableOpacity 
                onPress={()=>this.setActive(index)}
                key={index} 
                style={[(index==activeIndex?styles.activeWeekView:styles.weekView),(index==0?styles.borderRadiusLeft2:(index==6)?styles.borderRadiusRight2:null),(index<6)?styles.tabBorder:null]}
              >
                <Text style={styles.tabText}>{data}</Text>
              </TouchableOpacity>
            ))
            }
            </View>

            <View style={[styles.marginBottom25,{width:'100%'}]}>
              <Table borderStyle={{borderColor:'transparent'}} style={{ alignContent: "center"}}>
                <Row
                  data={["Availability","Time","Action"]}
                  style={styles.tableHead}
                  textStyle={styles.tableHeadText}
                />
                {tableData.map((data,index)=>(
                  <Row
                    key={index}
                    data={[data.availability,data.time,
                      <TouchableOpacity>
                        <Icon name="trash-can-outline" type="material-community" size={18} color="#dc3545" style={{fontWeight:'600'}}/>
                      </TouchableOpacity>
                    ]}
                    style={[styles.tableRow, index%2 && {backgroundColor: '#f1f1f1'}]}
                    textStyle={styles.tableText}
                  />
                ))
                }
              </Table>
            </View>

            <Button
              onPress         = {()=>this.props.navigation.navigate('PropertySuccess')}
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

