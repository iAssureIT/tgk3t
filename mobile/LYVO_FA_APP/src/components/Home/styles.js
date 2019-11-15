import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

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
        
        // elevation: 5,
        // shadowOpacity: 0.8,
        // shadowRadius: 2, 
        // shadowOffset: { width: 0, height: 1 },


  },
   title:{
  fontFamily:"Montserrat-SemiBold",fontSize:16,color:'#666',textAlign:'left',marginTop:3
  },
  titleNo:{
        fontWeight: 'bold',  
  fontFamily:"Montserrat-Bold",fontSize:22,color:'#000',textAlign:'left',marginTop:3,
  },
  titleInfo:{
    fontFamily:"Montserrat-Bold",fontSize:22,color:'#333',textAlign:'left',
  },
  headerBox:{
    width:"100%",
    height:100,
    backgroundColor:colors.button,
  },
  header:{
    color:'#fff',
    fontSize:25,
    marginTop:10,
    fontWeight: 'bold',  
  }
});
