import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({
	container:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
  },
  bgImage: {
    width:null,
    height:250,
    // justifyContent:'center',
    // alignItems: 'flex-start',
    borderBottomWidth:2,
    borderColor:'#ff0'
  },
  logoImage:{
  	height:55,
    marginLeft:5
  },
  menuWrapper:{
  	width:'100%',
  	paddingTop: 15
  },
  menu:{
  	width:'100%',
  	flexDirection:'row',
  	paddingVertical:10,
  	alignItems:'center',
  },
  iconContainer:{
  	backgroundColor:'#fff',
  	height: 35,
  	width: 35,
  	alignItems:'center',
  	justifyContent: 'center',
  	marginRight:15,
  	marginLeft:25,
  	borderWidth: 1,
  	borderColor: '#f1f1f1',
  	borderRadius: 3,
  	shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,

		// elevation: 0.5,
  },
    iconContainer1:{
    // backgroundColor:'#fff',
    color:"#fff",
    height: 35,
    width: 15,
    alignItems:'center',
    justifyContent: 'center',
    marginRight:5,
    marginLeft:25,

    // elevation: 0.5,
  },
  menuText:{
  	color: colors.primary,
  	fontFamily: 'Roboto-Regular',
  	fontSize: 14
  },
  sliderCrossIcon:{
    marginLeft:"85%",
   ...Platform.select({
      ios:{
        marginTop:35,
      },
      android : {
        marginTop:10,
      }
    })
  }
});