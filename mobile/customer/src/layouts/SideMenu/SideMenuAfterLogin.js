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

import { 
	NavigationActions,
	StackActions, 
	withNavigationFocus 
} from 'react-navigation';

import { DrawerActions }    from 'react-navigation-drawer';
import { Icon } 			from 'react-native-elements';
import styles 				from './styles.js';
import {colors} 			from '../../config/styles.js';
import AsyncStorage         from '@react-native-community/async-storage';


export default class SideMenuAfterLogin extends React.Component {

 navigateScreen=(route)=>{
    const navigateAction = NavigationActions.navigate({
    routeName: route,
    params: {},
    action: NavigationActions.navigate({ routeName: route }),
  });
  this.props.navigation.dispatch(navigateAction);
}


  constructor(props){
    super(props);
    this.state={
      uid:"",
      token:'',
      fullName:""
    };
  }	

  componentWillReceiveProps(nextProps){
        this._retrieveData();
  }
  componentDidMount(){
        this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const uid      = await AsyncStorage.getItem('uid');
      const token    = await AsyncStorage.getItem('token');
      const fullName = await AsyncStorage.getItem('fullName');
      // if (uid !== null && token !== null) {
        this.setState({uid:uid})
        this.setState({token:token})
        this.setState({fullName:fullName})
      // }
    } catch (error) {
    }
  }


   logout= async () => {
      await AsyncStorage.removeItem('uid');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('fullName');
      this.props.navigation.closeDrawer();
      this.navigateScreen('Home');
  }

  home(){
  	this.navigateScreen('Home');
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }


 login(){
    AsyncStorage.setItem("originPage","home");
    // console.log("token in home screen",this.state.token);
    this.navigateScreen("MobileScreen");
 // this.navigateScreen("Availability");
  }

  postPrpoperty(){
     AsyncStorage.removeItem('propertyId');
     this.state.token ? this.navigateScreen("BasicInfo") :this.navigateScreen("MobileScreen"); 
  }

  render(){
  	// this._retrieveData();
	  	return(
	      	<ScrollView contentContainerStyle={[styles.container]} scrollsToTop={false}>
		      	<ImageBackground 
		          source={require('../../images/sideMenu1.png')}
		          style={styles.bgImage}
		          resizeMode="cover"
		        >
			        <Icon 
			          onPress={()=>this.props.navigation.dispatch(DrawerActions.closeDrawer())}
		              size={25} 
		              name='close' 
		              type='font-awesome' 
		              color={colors.white} 
		              containerStyle={styles.sliderCrossIcon}
		            />
			    	<View style={{width:"100%",marginTop:80}}>
				        <Image
				            style={[styles.logoImage]}
				            source={require("../../images/logo.png")}
				            resizeMode="contain"
				         />
					    {this.state.fullName ?
					    <View style={{width:"100%",flexDirection:'row',marginTop:45}}>     
					        <Icon 
				              size={15} 
				              name='user' 
				              type='font-awesome' 
				              color={colors.white} 
				              containerStyle={styles.iconContainer1}
				            />
					        <Text style={{color:'#fff',fontFamily: 'Roboto-Regular',fontSize: 14,paddingTop:7}}>{"Welcome "+this.state.fullName}</Text>
				        </View>
				        :
				        null
				     }
				    </View>    
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
		        	<TouchableOpacity onPress={()=>this.postPrpoperty()}>
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
			        {this.state.token ?
			        	<TouchableOpacity onPress={()=>this.navigateScreen('MyPostedProperties')}>
				        	<View style={styles.menu}>
				        		<Icon 
				              size={18} 
				              name='home' 
				              type='font-awesome' 
				              color={colors.primary} 
				              containerStyle={styles.iconContainer}
				            />
				        		<Text style={styles.menuText}>My Posted Properties</Text>
				        	</View>
			        	</TouchableOpacity>
			        	:
			        	null
			        }
			        {this.state.token ?
			        	<TouchableOpacity onPress={()=>this.navigateScreen('MyInterestedProperties')}>
				        	<View style={styles.menu}>
				        		<Icon 
				              size={18} 
				              name='home' 
				              type='font-awesome' 
				              color={colors.primary} 
				              containerStyle={styles.iconContainer}
				            />
				        		<Text style={styles.menuText}>My Interested Properties</Text>
				        	</View>
			        	</TouchableOpacity>
			        	:
			        	null
		        	}
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
		        	<TouchableOpacity onPress={this.login.bind(this)}>
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

