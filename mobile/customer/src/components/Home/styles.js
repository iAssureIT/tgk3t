import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor: colors.white,
    //minHeight:'83%',
    width: window.width, 
    zIndex:0,
    minHeight:window.height-0,

  }, 
  bgImage: {
    width:window.width,
    height:window.height,
  },
  headingText:{
    fontSize: 26,
    textTransform: 'uppercase',
    color: colors.white,
    fontFamily:'Roboto-Regular',
    textAlign: 'center'
  },
  headingView:{
    alignItems: 'center',
    ...Platform.select({
      ios:{
         marginTop: 120,
      },
      android : {
         marginTop: 120,
      }
    }),
    marginBottom: 10
  },
  heading2:{
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color:colors.white,
    textAlign: 'center'
  },
  heading3:{
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color:colors.white,
    fontWeight:'bold'
  },
  heading2View:{
    paddingHorizontal:'4%',
    alignItems:'center',
    marginBottom:50
  },
  optionsWrapper:{
    flexDirection: 'row',
    // justifyContent:'space-between',
    paddingHorizontal: '5%',
    // marginBottom:5,
    flexWrap:'wrap',
    width: '100%',
  },
  buttonContainer:{
    width:'18%',
  },
  buttonContainer1:{
    width:'35%',
  },
  buttonContainer2:{
    width:'90%',
    ...Platform.select({
      ios:{
        justifyContent:'center',
      },
      android : {
        alignItems:'center'
      }
    })
  },
  button:{
    width:'100%',
    backgroundColor: colors.black,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:0,
    borderWidth:0.5,
    borderColor:"#ccc",
    borderBottomWidth:0,
  },
  button2:{
    backgroundColor: colors.button,
    height: 55,
    borderRadius:4,
    width:"40%",
    ...Platform.select({
      ios:{
        marginLeft:"30%"
      },
    })

  },
  activeButton:{
    width:'100%',
    backgroundColor: colors.white,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:0,
    borderWidth:0.5,
    borderBottomWidth:0,
    borderColor:"#ccc",
    fontWeight:'900'
  },
  buttonText:{
    color: colors.white,
    fontSize: 15,
    fontFamily:"Roboto-Regular",
    fontWeight:'bold'
  },
  buttonText2:{
    color: colors.white,
    fontSize: 16,
    fontFamily:"Roboto-Regular",
    alignItems: 'center',
    fontWeight:'bold'
  },
  activeButtonText:{
    color: colors.black,
    fontSize: 15,
    fontFamily:"Roboto-Regular",
    fontWeight:'bold'
  },
  inputWrapper:{
    width:'90%',
    flexDirection:'row',
    height:40
    // borderRadius: 4,
  },
  inputIconWrapper:{
    width:'12%',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:5,
  },
  searchBtnWrapper:{
    width:'17%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
    height: 40,
    borderTopRightRadius:0,
    borderBottomRightRadius:0
  },
  inputTextWrapper:{
    width:'83%',
    justifyContent:'center'
  },
  formInputView:{
    width:'100%',
    alignItems:'center',
    marginBottom: 30,
  },
  searchContainer:{
    borderTopWidth:0,
    borderRightWidth:0,
    borderBottomWidth:0,
    padding:0,
    borderRadius:0,
  },
  searchInput:{
    backgroundColor:colors.white,
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  searchInputContainer:{
    width:'100%',
    backgroundColor: colors.white,
    borderRadius:0,
    borderWidth:0,
  },
  alignCenter:{
    alignItems:'center',
    justifyContent:'center',
    width:"100%",
  },
  marginBottom30:{
    marginBottom:30
  },
  marginBottom15:{
    marginBottom:15
  },
  triangle:{
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.white,
    transform: [
      {rotate: '180deg'}
    ],
    marginLeft:10
  },

   item: {
    width:'100%',
    maxHeight:300,
    ...Platform.select({
      ios:{
        fontSize: 15,
        padding: 6,
      },
      android : {
        fontSize: 13,
        padding: 4,
      }
    })
  },
   
  marginTop20:{
    marginTop:20
  },
  block:{
     ...Platform.select({
      ios:{
           marginTop:"3%"
      },
      android : {
        marginTop:"5.5%"
      }
    })
  },
  lineStyle:{
      borderWidth: 0.5,
      borderColor:'white',
      margin:10,
      width:"95%"
 },
 autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});
