import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor: colors.white,
    //minHeight:'83%',
    width: window.width,
    // position:"absolute"
  },


  formWrapper: {
    width:'100%',
    backgroundColor:colors.white,
    padding:'5%',
  },
  optionsWrapper:{
    flexDirection: 'row',
    justifyContent:'space-between',
    // paddingHorizontal: '5%',
    marginBottom:5,
    flexWrap:'wrap',
    width: '100%',
  },
   marginBottom45:{
    marginBottom: 45
  },

  buttonContainer:{
    width:'31%',
    elevation:8
  },

  buttonContainer1:{
    width:'48%',
    elevation:8
  },

  activeButtonText:{
    color: colors.white,
    fontSize: 15,
    fontFamily:"Roboto-Medium",
  },
  activeButton:{
    width:'100%',
    backgroundColor: colors.golden,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
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
  buttonText:{
    color: colors.black,
    fontSize: 15,
    fontFamily:"Roboto-Medium",
  },
  button:{
    width:'100%',
    backgroundColor: colors.white,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    elevation: 8,
    ...Platform.select({
      ios:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }
    })
  },
  searchInputWrapper:{
    width:'100%',
    borderRadius: 4,
  },
  marginBottom25:{
    marginBottom:25
  },
  resetBtn:{
    marginBottom:15,
    marginLeft:"67%",
    flexDirection:"row"
  },
  marginBottom5:{
    marginBottom:5
  },
  inputTextWrapper:{
    width:'100%',
    justifyContent:'center',

  },
  searchContainer:{
    borderTopWidth:0,
    borderRightWidth:0,
    borderBottomWidth:0,
    padding:0,
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
     ...Platform.select({
      ios:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }
    })
  },
  searchInputContainer:{
    width:'100%',
    backgroundColor: colors.white,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput:{
    backgroundColor:colors.white,
    fontSize: 13,
    fontFamily: 'Roboto-Regular'
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
  outerView:{
    width:'100%'
  },
  inputText:{
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color:colors.grey,
  },
  heading:{
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color:colors.black,
  },
  tabWrap:{
    width: '100%',
    flexDirection: 'row',
  },
  tabView:{
    flexDirection: 'row',
    width:'33.33%',
    paddingVertical: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.searchButton,
  },
  tabViewAuto:{
    flexDirection: 'row',
    width:'auto',
    paddingVertical: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.searchButton,
  },
  activeTabView:{
    flexDirection: 'row',
    width:'33.33%',
    paddingVertical: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.searchPrimary,
    elevation: 6,
     borderBottomWidth:3,
    borderBottomColor:colors.button, 
  },
  activeTabViewAuto:{
    flexDirection: 'row',
    width:'auto',
    paddingVertical: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.searchPrimary,
    elevation: 6,
     borderBottomWidth:3,
    borderBottomColor:colors.button, 
  },
  borderRadiusLeft:{
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  borderRadiusRight:{
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  borderRadiusLeft2:{
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  borderRadiusRight2:{
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  tabBorder:{
    borderWidth:1,
    borderColor: "#ddd",
  },

  tabText:{
    fontSize: 13,
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    marginLeft: 5,
    textAlign:'center',
  },
  tabView2:{
    width:'20%',
    backgroundColor: colors.searchButton,
    paddingHorizontal: 5,
    paddingVertical:15
  },
  tabViewFloor:{
    width:'20%',
    backgroundColor: colors.searchButton,
    paddingHorizontal: 3,
    paddingVertical:15,
    textAlign:'center',
  },
   tabViewAge:{
    width:'auto',
    backgroundColor: colors.searchButton,
    paddingHorizontal: 5,
    paddingVertical:15,
    textAlign:'center',
    marginLeft:3,
    marginRight:3,
    borderRadius:4,
  },
  tabViewAvl:{
    width:'25%',
    backgroundColor: colors.searchButton,
    paddingHorizontal: 3,
    paddingVertical:15,
    // textAlign:'center',
  },
  activeTabView2:{
    width:'20%',
    backgroundColor: colors.searchPrimary,
    paddingHorizontal: 5,
    paddingVertical:15,
    elevation: 4,
    borderBottomWidth:3,
    borderBottomColor:colors.button, 
  },
  activeTabViewFloor:{
    width:'20%',
    backgroundColor: colors.searchPrimary,
    paddingHorizontal: 3,
    paddingVertical:10,
    elevation: 4,
    textAlign:'center',
   borderBottomWidth:3,
    borderBottomColor:colors.button, 
  },
  activeTabViewAge:{
    width:'auto',
    backgroundColor: colors.searchPrimary,
    paddingHorizontal: 5,
    paddingVertical:15,
    elevation: 4,
    textAlign:'center',
    marginLeft:3,
    marginRight:3,
    borderRadius:4,
    borderBottomWidth:3,
    borderBottomColor:colors.button, 
  },
  activeTabViewAvl:{
    width:'25%',
    backgroundColor: colors.searchPrimary,
    paddingHorizontal: 3,
    paddingVertical:15,
    elevation: 4,
    borderBottomWidth:3,
    borderBottomColor:colors.button, 
    // textAlign:'center',
  },
  buttonSubmitContainer:{
    width:'100%',
    ...Platform.select({
      ios:{
        justifyContent:'center',

      },
      android : {
        alignItems:'center'
      }
    })
  },
  buttonSubmitText:{
    color: colors.white,
    fontSize: 16,
    fontFamily:"Roboto-Regular",
  },
  buttonSubmit:{
    width:'100%',
    backgroundColor: colors.button,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  }, 
  horizontalScroll:{
    width:'100%'
  },
  paddLeft5:{
    paddingLeft:6,
    paddingRight:6,
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
        padding: 6,
      }
    })
  },
   
  marginTop20:{
    marginTop:20
  },

});


