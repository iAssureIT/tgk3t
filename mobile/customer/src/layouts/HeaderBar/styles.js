import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor:colors.primary,
    padding:0,
    margin:0,
    paddingTop:0,
    marginTop:0,
    ...Platform.select({
      ios:{
         height: 100 ,
    paddingTop:25,
      },
      android : {
      }
    }),
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    elevation: 2
  },

  logoSize:{
    height:10,
  }

});
