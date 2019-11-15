import {createAppContainer} 	  from 'react-navigation';
import { createSwitchNavigator }  from 'react-navigation';
import {createStackNavigator}  	  from 'react-navigation-stack';
import { createDrawerNavigator }  from 'react-navigation-drawer';
import AuthLoadingScreen          from '../layouts/AuthLoading/AuthLoadingScreen.js' 
import Home                   	  from '../components/Home/Home.js';
import MobileScreen               from '../components/SystemSecurity/LoginMobNo/MobileScreen.js';
import OTPScreen                  from '../components/SystemSecurity/LoginOTP/OTPScreen.js';
import SideMenu                   from '../layouts/SideMenu/SideMenu.js';
import PropertyList               from '../components/Property/PropertyList/PropertyList.js';
import PropertyDetails            from '../components/Property/PropertyDetails/PropertyDetails.js';
const MainNavigator = createStackNavigator({
  MobileScreen: {
    screen: MobileScreen,
    navigationOptions: {
      header: null
    }
  },
  Home: {
  	screen: Home,
  	navigationOptions: {
      header: null
    }
  },
  MobileScreen: {
  	screen: MobileScreen,
  	navigationOptions: {
      header: null
    }
  },
  OTPScreen: {
  	screen: OTPScreen,
  	navigationOptions: {
      header: null
    }
  },
  PropertyList: {
    screen: PropertyList,
    navigationOptions: {
      header: null
    }
  }, 
  PropertyDetails: {
    screen: PropertyDetails,
    navigationOptions: {
      header: null
    }
  },
});

const drawer = createDrawerNavigator({
	Home : {
		screen: MainNavigator
	}
},{
  drawerLockMode: 'locked-closed',
  contentComponent: SideMenu,
  drawerPosition: 'right'
});


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: drawer,
    // Auth: AuthStack,
  },
  {
    unmountInactiveRoutes: true,
    initialRouteName: 'AuthLoading',
  }
));