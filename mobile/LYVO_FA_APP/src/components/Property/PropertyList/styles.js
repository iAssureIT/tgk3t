import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor: colors.white,
    //minHeight:'83%',
    width: window.width, 
    zIndex:-10
  }, 
  boxV:{
    flex:1,
    borderColor:'#aaa',
    borderWidth:1,
    borderRadius:8,
    paddingVertical:5,
    width:"100%",
    marginLeft:"6%",
    marginTop:20,
  },
   title:{
  fontFamily:"Montserrat-SemiBold",fontSize:16,color:'#666',textAlign:'left',marginTop:3
  },
  titleNo:{
    fontWeight: 'bold',  
    fontFamily:"Montserrat-Bold",
    fontSize:22,
    color:'#000',
    textAlign:'left',
    zIndex:2, 
  },
  titleInfo:{
    fontFamily:"Montserrat-Bold",fontSize:22,color:'#333',textAlign:'left',
  },
  headerBox:{
    width:"100%",
    height:60,
    backgroundColor:colors.button,
  },
  header:{
    color:'#fff',
    fontSize:25,
    marginTop:10,
    fontWeight: 'bold',
    alignItems:"center"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 110/2,
    backgroundColor: '#fff',
    position:"absolute",
    zIndex:1,
    left:330,
    top:15,

  },
  propetyList:{
    height:120,
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:10,
    borderWidth:1,
    flex:1
  },
  propImg:{
    width:"100%",
    height:100,
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:10,
    flex:0.3
  },
  propertyData:{
    fontSize:10,
    paddingVertical:10,
    flex:0.7
  },
  propText:{
    paddingHorizontal:3,
    paddingVertical:7,
  }
});
