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
    paddingHorizontal:'5%',
    paddingVertical:'5%',
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
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

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
    width:'40%',
    backgroundColor: colors.primary,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    elevation: 5,
    marginTop:10,
    marginLeft:20,
    flexDirection:"row"
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
  propertyWrap:{
    width:'100%',
    ...Platform.select({
      ios:{
       borderWidth:1,
       borderRadius:4,
       borderColor:'#ccc',
        elevation:3,
      },
      android : {
        borderRadius:4,
        elevation:3,
      }
    })
  },
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
    fontSize: 14,
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
  buttonIcon:{
    height:15,
    width:30,
    marginLeft:10
  }
});
