import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor: colors.primary,
    //minHeight:'83%',
    width: window.width,
    zIndex:0
  },
  bgImage: {
    width:'100%',
    height:window.height,
  },
  headingText:{
    fontSize: 28,
    textTransform: 'uppercase',
    color: colors.white
  },
  headingView:{
    alignItems: 'center',
    marginTop: 40,
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
    textAlign: 'center'
  },
  heading2View:{
    paddingHorizontal:'4%',
    alignItems:'center',
    marginBottom:30
  },
  optionsWrapper:{
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: '5%',
    marginBottom:5,
    flexWrap:'wrap',
    width: '100%',
  },
  buttonContainer:{
    width:'31%',
  },
  buttonContainer2:{
    width:'90%',
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
  button:{
    width:'100%',
    backgroundColor: colors.white,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  },
  button2:{
    width:'100%',
    backgroundColor: colors.button,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  },
  activeButton:{
    width:'100%',
    backgroundColor: colors.golden,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  },
  buttonText:{
    color: colors.black,
    fontSize: 15,
    fontFamily:"Roboto-Regular",
  },
  buttonText2:{
    color: colors.white,
    fontSize: 16,
    fontFamily:"Roboto-Regular",
  },
  activeButtonText:{
    color: colors.white,
    fontSize: 15,
    fontFamily:"Roboto-Regular",
  },
  inputWrapper:{
    width:'90%',
    flexDirection:'row',
    borderRadius: 4,
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
    height: 50,
    borderTopRightRadius:4,
    borderBottomRightRadius:4
  },
  inputTextWrapper:{
    width:'83%',
    justifyContent:'center'
  },
  formInputView:{
    width:'100%',
    alignItems:'center',
    marginBottom: 30
  },
  searchContainer:{
    borderTopWidth:0,
    borderRightWidth:0,
    borderBottomWidth:0,
    padding:0,
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4
  },
  searchInput:{
    backgroundColor:colors.white,
    fontSize: 13,
    fontFamily: 'Roboto-Regular'
  },
  searchInputContainer:{
    width:'100%',
    backgroundColor: colors.white
  },
  alignCenter:{
    alignItems:'center',
    justifyContent:'center'
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
    borderBottomColor: colors.golden,
    transform: [
      {rotate: '180deg'}
    ],
    marginLeft:10
  },
   item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor:'#fff',
    width:'75%',
    marginLeft:20,
    zIndex:1
  },
});
