import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';

import {NavigationActions} from 'react-navigation';

import styles from './styles.js';
import {colors} from '../../config/styles.js';

export default class SideMenu extends React.Component {

	navigateScreen=(route)=>{
		const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
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
          />
        </ImageBackground>

        <View style={styles.menuWrapper}>
        	<TouchableOpacity onPress={()=>this.navigateScreen('Home')}>
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
        	<TouchableOpacity onPress={()=>this.navigateScreen('SignUp')}>
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
        	<TouchableOpacity onPress={()=>this.navigateScreen('Logout')}>
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
        </View>

  		</ScrollView>
  	);
	}

}