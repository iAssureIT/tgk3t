import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor: '#ccc',
    minHeight:'90%',
    width: window.width,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width:'90%',
    // marginHorizontal:'5%',
    backgroundColor:colors.white,
    padding:'5%',
    margin:'5%'
  },
  heading:{
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    color:colors.black,
    // textAlign: 'center'
  },
  heading2: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color:colors.black,
  },
  inputText:{
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color:colors.grey,
  },
  heading3: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color:colors.black,
  },
  heading4: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color:colors.black,
  },
  divider:{
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    marginLeft:'-6%',
    marginRight: '-6%',
    marginVertical:'5%'
  },
  dividerInside:{
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    marginVertical:'5%'
  },
  alignCenter:{
    alignItems:'center'
  },
  text:{
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color:colors.black,
  },
  inputWrapper : {
    width:'100%',
    borderColor: colors.black,
    borderWidth:1,
    flexDirection:'row',
    borderRadius: 3,
  },
  inputWrapper2:{
    width:'46%',
    borderColor: colors.black,
    borderWidth:1,
    flexDirection:'row',
    borderRadius: 3,
  },
  inputImgWrapper : {
    width:'12%',
    justifyContent:'center',
    alignItems:'center',
    borderRightWidth:1,
    borderColor: colors.black,
    marginVertical:5,
  },
  inputImgWrapper2:{
    width:'25%',
    justifyContent:'center',
    alignItems:'center',
    borderRightWidth:1,
    borderColor: colors.black,
    marginVertical:5,
  },
  inputTextWrapper : {
    width:'88%',
    justifyContent:'center'
  },
  inputTextWrapper2 : {
    width:'75%',
    justifyContent:'center'
  },
  inputRightWrapper:{
    width:'13%',
    justifyContent:'center',
    alignItems:'center',
    borderLeftWidth:1,
    borderColor: colors.black,
    marginVertical:5,
  },
  textContainer:{
    height:40,
    paddingLeft:4
  },
  textInputContainer:{
    backgroundColor:'transparent',
    borderBottomColor: "transparent"
  },
  textTitle:{
    fontFamily:"Roboto-Regular",
    top:0,
  },
  textStyle:{
    fontFamily:"Roboto-Regular",
    backgroundColor:'transparent',
    paddingTop:0,
    marginTop:-6,
  },
  textLabel:{
    backgroundColor:'#fff',
    fontFamily:"Roboto-Regular",
    top:-10,
    // left:-4,
    paddingHorizontal:2
  },
  inputText2Wrapper:{
    width:'74%',
    justifyContent:'center'
  },
  eyeWrapper:{
    width:'14%',
    justifyContent:'center',
    alignItems:'center',
  },
  marginBottom25:{
    marginBottom: 25
  },
  marginBottom15:{
    marginBottom: 15
  },
  marginBottom5:{
    marginBottom: 5
  },
  button:{
    width:'100%',
    backgroundColor: colors.button,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  },
  buttonSmall:{
    width:'100%',
    backgroundColor: colors.white,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4,
    elevation: 4
  },
  buttonText:{
    color: colors.white,
    fontSize: 16,
    fontFamily:"Roboto-Regular",
  },
  buttonSmallText:{
    color: colors.black,
    fontSize: 14,
    fontFamily:"Roboto-Regular",
  },
  buttonContainer:{
    width:'100%',
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
  tabWrap:{
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: colors.button,
    // borderRadius: 25
  },
  tabView:{
    flexDirection: 'row',
    width:'33.33%',
    paddingVertical: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.button,
  },
  activeTabView:{
    flexDirection: 'row',
    width:'33.33%',
    paddingVertical: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.primary,
    elevation: 6,
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
    borderRightWidth:1,
    borderColor: colors.primary,
  },
  tabText:{
    fontSize: 12,
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    marginLeft: 5
  },

  ddContainer:{
    backgroundColor:'transparent',
    height: 40,
    paddingLeft:4
  },
  ddItemText:{
    fontFamily:"Roboto-Regular"
  },
  ddInputContainer:{
    borderBottomColor: 'transparent',
  },
  ddLabelText:{
    backgroundColor:'#fff',
    top:0,
    // left:5,
    fontFamily:"Roboto-Regular",
    fontSize:15,
    paddingHorizontal:2
  },
  ddStyle:{
    fontFamily:"Roboto-Regular"
  },
  descriptionView:{
    borderWidth:1,
    borderColor:colors.black,
    padding : 6,
    borderRadius: 4
  },
  weekWrap:{
    width:'100%',
    flexDirection:'row',
  },
  weekView:{
    width:'14.27%',
    backgroundColor: colors.button,
    paddingHorizontal: 5,
    paddingVertical:15
  },
  activeWeekView:{
    width:'14.27%',
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    paddingVertical:15,
    elevation: 4
  },
  tableHead:{
    backgroundColor: colors.button,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:2,
    paddingVertical:10
  },
  tableHeadText:{
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    textAlign:'center',
    color: colors.white
  },
  tableRow:{
    backgroundColor: colors.white,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:2,
    paddingVertical:10
  },
  tableText:{
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    textAlign:'center',
    color: colors.black
  }
});