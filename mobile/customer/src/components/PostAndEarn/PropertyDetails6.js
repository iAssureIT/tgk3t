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
import TimePicker from "react-native-24h-timepicker";
import Modal from "react-native-modal";
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

export default class PropertyDetails6 extends ValidationComponent{
  constructor(props){
    super(props);
    this.state={
      mobile : '',
      builtArea : '',
      expectedRate : '',
      totalAsk : '',
      activeIndex : 0,
      availableFromDate : '',
      time1: "00:00",
      time2: "00:00",
      availability:"",
      available:[],
      openModal: false,
      dropdownData:[
      {
        value: 'Everyday(Mon-Sun)'
      },
      {
        value: 'Weekdays(Mon-Fri)'
      },
      {
        value: 'Weekdays(Sat-Sun)'
      },
      {
        value: 'Monday'
      },
      {
        value: 'Tuesday'
      },
      {
        value: 'Wednesday'
      },
      {
        value: 'Thursday'
      },
      {
        value: 'Friday'
      },
      {
        value: 'Saturday'
      },
      {
        value: 'Sunday'
      }],
      toggle : false,
      toggleText:'My Self'
    };
  }

  setActive=(index)=>{
    this.setState({activeIndex:index});
  }

  onToggle=()=>{
    let {toggle} = this.state;
    if(toggle){
      this.setState({toggleText:'My Self'})
    }else{
      this.setState({toggleText:'Someone else'})
    }
    this.setState({toggle:!this.state.toggle});
  }

  onCancel1() {
    this.TimePicker1.close();
  }
 
  onConfirm1(hour, minute) {
    this.setState({ time1: `${hour}:${minute}` });
    this.TimePicker1.close();
  } 
  onCancel2() {
    this.TimePicker2.close();
  }
 
  onConfirm2(hour, minute) {
    this.setState({ time2: `${hour}:${minute}` });
    this.TimePicker2.close();
  }

  handleAvailability(event){
    console.log("Avialbaility",this.state.availability);
    console.log("From Time",this.state.time1);
    console.log("To Time",this.state.time2);
    const availability = this.state.available;
    const day  = this.state.availability;
    const time = this.state.time1 + ' - ' + this.state.time2;

    if(day!=="" && time!==""){
      console.log("day",day);
      console.log("time",time);
      availability.push({
      "availability" : day,
      "time" : time,
      });
      this.setState({
        "available" : availability,
        "openModal": true
      },()=>{

        console.log("available=>",this.state.available);
      });
    }else{

    };  
  }

  render(){

    const { navigation } = this.props;
    let {activeIndex} = this.state;
    // let weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

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

            <View style={[{width:'100%',flexDirection:'row'},styles.marginBottom25]}>
                {/*First View*/}
              <View style={{width:'28%'}}>
                <Text style={[styles.heading2,styles.marginBottom15]}>From Time</Text>
                <View style={[styles.inputWrapper3]}>
                  <View style={styles.inputImgWrapper2}>
                    <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                  </View>
                  <View style={styles.inputTextWrapper2}>
                    <TouchableOpacity
                        onPress={() => this.TimePicker1.open()}
                      >
                      <Text style={styles.timeSelect}>{this.state.time1}</Text>
                      </TouchableOpacity>

                      <TimePicker
                        ref={ref => {
                          this.TimePicker1 = ref;
                        }}
                        onCancel={() => this.onCancel1()}
                        onConfirm={(hour, minute) => this.onConfirm1(hour, minute)}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                      />
                  </View>
                </View>
              </View>
              
              
              <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.heading3}></Text>
              </View>

               {/*Second View*/}
              <View style={{width:'28%'}}>
                <Text style={[styles.heading2,styles.marginBottom15]}>To Time</Text>
                <View style={[styles.inputWrapper3]}>
                  <View style={styles.inputImgWrapper2}>
                    <Icon name="building" type="font-awesome" size={15}  color="#aaa" style={{}}/>
                  </View>
                  <View style={styles.inputTextWrapper2}>
                    <TouchableOpacity
                        onPress={() => this.TimePicker2.open()}
                      >
                      <Text style={styles.timeSelect}>{this.state.time2}</Text>
                      </TouchableOpacity>

                      <TimePicker
                        ref={ref => {
                          this.TimePicker2 = ref;
                        }}
                        onCancel={() => this.onCancel2()}
                        onConfirm={(hour, minute) => this.onConfirm2(hour, minute)}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                      />
                  </View>
                </View>
              </View>
              <View style={{width:'8%',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.heading3}></Text>
              </View>
              <View style={[{width:'28%'},styles.marginBottom15]}>
                <Text style={[styles.heading2,styles.marginBottom15]}></Text>
                <Button 
                  onPress         = {()=>this.handleAvailability()}
                  titleStyle      = {styles.buttonSmallText}
                  title           = "Add Slot"
                  buttonStyle     = {styles.buttonSmall}
                  containerStyle  = {[styles.buttonContainer,styles.marginBottom15]}
                  on
                  iconRight
                  icon = {
                    <Icon
                      name="plus" 
                      type="material-community"
                      size={20}
                      color={colors.black}
                    />
                  }
                />
            </View> 
          </View>

           {/* <View style={[styles.marginBottom25,styles.weekWrap]}>
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
            </View>*/}

            <View style={[styles.marginBottom25,{width:'100%'}]}>
              <Table borderStyle={{borderColor:'transparent'}} style={{ alignContent: "center"}}>
                <Row
                  data={["Availability","Time","Action"]}
                  style={styles.tableHead}
                  textStyle={styles.tableHeadText}
                  flexArr={[2, 1, 1]}
                />
                {
                  this.state.available.map((data,index)=>(
                  <Row
                    key={index}
                    data={[data.availability,data.time,
                      <TouchableOpacity>
                        <Icon name="trash-can-outline" type="material-community" size={18} color="#dc3545" style={{fontWeight:'600'}}/>
                      </TouchableOpacity>
                    ]}
                    style={[styles.tableRow, index%2 && {backgroundColor: '#f1f1f1'}]}
                    textStyle={styles.tableText}
                    flexArr={[2, 1, 1]}
                  />
                ))
                }
              </Table>
            </View>



            <Button
              onPress         = {()=>this.props.navigation.navigate('PropertyDetails7')}
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
        <Modal isVisible={this.state.openModal} 
             onBackdropPress={() => this.setState({ openModal: false })}
             coverScreen={true}
             hideModalContentWhileAnimating={true}
             style={{paddingHorizontal:'5%',zIndex:999}}
             animationOutTiming={500}>
        <View style={{backgroundColor:"#fff",alignItems:'center',borderRadius:20,paddingVertical:30,paddingHorizontal:10}}>
          <View style={{justifyContent:'center',backgroundColor:"#34be34",width:60,height:60,borderRadius:30,overflow:'hidden'}}>
            <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}}/>
          </View>
          <Text style={{fontFamily:'Montserrat-Regular',fontSize:15,textAlign:'center',marginTop:20}}>
            Availability slot is sucessfully added.
          </Text>

          <View style={{width:'100%',borderBottomRightRadius:500,marginTop:15}}>
            <Button
              onPress         = {()=>this.setState({openModal:false})}
              titleStyle      = {styles.buttonText}
              title           = "OK"
              buttonStyle     = {styles.buttonSignUp}
              containerStyle  = {styles.buttonContainer}
            />
          </View>
        </View>
      </Modal>
      </React.Fragment>
    );
    
  }
}



