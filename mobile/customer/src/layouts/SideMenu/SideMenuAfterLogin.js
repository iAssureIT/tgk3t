import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  // AsyncStorage,
  Image
} from 'react-native';

import { Icon } 			from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation'
import styles 				from './styles.js';
import {colors} 			from '../../config/styles.js';
import AsyncStorage 		from '@react-native-community/async-storage';

export default class SideMenu extends React.Component {

	navigateScreen=(route)=>{
		const navigateAction = StackActions.reset({
             index: 0,
            actions: [
            		NavigationActions.navigate({ routeName: route}),
            	],
        });
        this.props.navigation.dispatch(navigateAction);
	}


  constructor(props){
    super(props);
    this.state={
      uid:"",
      token:''
    };
  }	

  componentDidMount(){
        this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      const token = await AsyncStorage.getItem('token');
      // if (uid !== null && token !== null) {
        this.setState({uid:uid})
        this.setState({token:token})
      // }
    } catch (error) {
    }
  }


   logout= async () => {
      await AsyncStorage.removeItem('uid');
      await AsyncStorage.removeItem('token');
      this.props.navigation.closeDrawer();
      this.navigateScreen('MobileScreen');
  }

  home(){
  	this.navigateScreen('Home')
    this.props.navigation.closeDrawer();
  }


  render(){
	  	return(
	      	<ScrollView contentContainerStyle={[styles.container]} scrollsToTop={false}>
		      	<ImageBackground 
		          source={require('../../images/sideMenu.png')}
		          style={styles.bgImage}
		          resizeMode="cover"
		        >
		        	<Image
		            style={styles.logoImage}
		            source={require("../../images/logo.png")}
		            resizeMode="contain"
		          />
		        </ImageBackground>

		        <View style={styles.menuWrapper}>
		        	<TouchableOpacity onPress={this.home.bind(this)}>
			        	<View style={styles.menu}>
			        		<Icon 
			              size={18} 
			              name='desktop-mac' 
			              type='material-community' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        		<Text style={styles.menuText}>Home</Text>
			        	</View>
		        	</TouchableOpacity>
		        	<TouchableOpacity onPress={()=>this.navigateScreen('SearchProperty')}>
			        	<View style={styles.menu}>
			        		<Icon 
			              size={20} 
			              name='search-web' 
			              type='material-community' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        		<Text style={styles.menuText}>Search Property</Text>
			        	</View>
		        	</TouchableOpacity>
		        	<TouchableOpacity onPress={()=>this.navigateScreen('MobileScreen')}>
			        	<View style={styles.menu}>
			        		<Icon 
			              size={18} 
			              name='home-city' 
			              type='material-community' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        		<Text style={styles.menuText}>Post Property</Text>
			        	</View>
		        	</TouchableOpacity>
		        	<TouchableOpacity onPress={()=>this.navigateScreen('MyPostedProperties')}>
			        	<View style={styles.menu}>
			        		<Icon 
			              size={18} 
			              name='home' 
			              type='font-awesome' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        		<Text style={styles.menuText}>My Property</Text>
			        	</View>
		        	</TouchableOpacity>
		        	<TouchableOpacity onPress={()=>this.navigateScreen('MyInterestedProperties')}>
			        	<View style={styles.menu}>
			        		<Icon 
			              size={18} 
			              name='home' 
			              type='font-awesome' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        		<Text style={styles.menuText}>My Interested</Text>
			        	</View>
		        	</TouchableOpacity>
			        {this.state.token ?
			        	<TouchableOpacity onPress={this.logout.bind(this)}>
				        	<View style={styles.menu}>
				        		<Icon 
				              size={18} 
				              name='power' 
				              type='material-community' 
				              color={colors.primary} 
				              containerStyle={styles.iconContainer}
				            />
				        		<Text style={styles.menuText}>Logout</Text>
				        	</View>
			        	</TouchableOpacity>
			        	:
			        	<TouchableOpacity onPress={()=>this.navigateScreen('MobileScreen')}>
				        	<View style={styles.menu}>
				        		<Icon 
				              		size={18} 
				              		name='power' 
				              		type='material-community' 
				              		color={colors.primary} 
				              		containerStyle={styles.iconContainer}
				            	/>
				        		<Text style={styles.menuText}>Login</Text>
				        	</View>
			        	</TouchableOpacity>
			        }
		        </View>
	  		</ScrollView>
	  	);
	}

}