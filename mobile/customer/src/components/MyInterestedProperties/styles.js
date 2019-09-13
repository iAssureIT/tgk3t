import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor: '#ccc',
    // minHeight:'90%',
    width: window.width,
    alignItems: 'center',
  },
  formWrapper: {
    width:'100%',
    backgroundColor:colors.white,
    padding:'5%',
  },
  btnWrapper:{
    width:'100%',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  button:{
    width:'100%',
    backgroundColor: colors.white,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    elevation: 5,
  },
  button2:{
    width:'100%',
    backgroundColor: colors.golden,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    elevation: 5,
  },
  button3:{
    width:'100%',
    backgroundColor: colors.primary,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    elevation: 5,
  },
  button4:{
    width:'100%',
    backgroundColor: colors.white,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    elevation: 5,
  },
  buttonContainer:{
    width:'46%',
    ...Platform.select({
      ios:{
        justifyContent:'center',
        marginLeft: 40

      },
      android : {
        alignItems:'center'
      }
    })
  },
  buttonContainer2:{
    width:'40%',
  },
  buttonContainer3:{
    width:'70%',
  },
  buttonContainer4:{
    width:'30%',
  },
  buttonContainer5:{
    width:'100%',
  },
  buttonText:{
    color: colors.black,
    fontSize: 14,
    fontFamily:"Roboto-Regular",
  },
  buttonText2:{
    color: colors.white,
    fontSize: 14,
    fontFamily:"Roboto-Regular",
  },
  marginBottom20:{
    marginBottom:20,
  },
  marginBottom15:{
    marginBottom:15
  },
  marginBottom5:{
    marginBottom:5
  },
  // propertyWrap:{
  //   width:'100%',
  //   borderRadius:4,
  //   elevation:5,
  // },
  bgImage: {
    width:'100%',
    height:200,
    alignItems:'flex-end',
  },
  bgImage2:{
    width:'100%',
    height:300,
  },
  textSmall: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color:colors.black,
  },
  textSmallLight:{
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color:colors.grey,
  },
  textLarge: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color:colors.black,
  },
  textHeading: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color:colors.black,
  },
  textHeadingSmall:{
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    color:colors.black,
  },
  divider:{
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    // marginVertical:'5%'
  },
  heading:{
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color:colors.black,
    textAlign: 'center'
  },
});
