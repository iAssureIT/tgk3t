import {createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import AuthLoadingScreen from '../layouts/AuthLoading/AuthLoadingScreen.js' 
import Home from '../components/Home/Home.js';
import SideMenu from '../layouts/SideMenu/SideMenu.js';
import SignUp from '../components/SystemSecurity/SignUp/SignUp.js';
import BasicInfo from '../components/PostAndEarn/BasicInfo.js';
import PropertyDetails from '../components/PostAndEarn/PropertyDetails.js';
import FinancialDetails from '../components/PostAndEarn/FinancialDetails.js';
import Availability from '../components/PostAndEarn/Availability.js';
import Congratulation  from '../components/PostAndEarn/Congratulation.js';
import SearchProperty   from '../components/SearchProperty/SearchProperty.js';
import PropertyList     from '../components/Property/PropertyList.js';
import PropertyDetailsPage  from '../components/Property/PropertyDetailsPage.js';
import MyPostedProperties from '../components/MyPostedProperties/MyPostedProperties.js';
import MyInterestedProperties from '../components/MyInterestedProperties/MyInterestedProperties.js';
import MobileScreen from '../components/SystemSecurity/LoginMobNo/MobileScreen.js';
import OTPScreen from '../components/SystemSecurity/LoginOTP/OTPScreen.js';

const HomeStack = createStackNavigator({

  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  PropertyList:{
    screen: PropertyList,
    navigationOptions: {
      header: null
    }
  },
  PropertyDetailsPage:{
    screen: PropertyDetailsPage,
    navigationOptions: {
      header: null
    }
  },
   BasicInfo:{
    screen: BasicInfo,
    navigationOptions: {
      header: null
    }
  },

  PropertyDetails:{
    screen: PropertyDetails,
    navigationOptions: {
      header: null
    }
  },

   FinancialDetails:{
    screen: FinancialDetails,
    navigationOptions: {
      header: null
    }
  },
   Availability:{
    screen: Availability,
    navigationOptions: {
      header: null
    }
  },
  SignUp:{
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  SearchProperty:{
    screen: SearchProperty,
    navigationOptions: {
      header: null
    }
  },
  PropertySearchProperty:{
    screen: SearchProperty,
    navigationOptions: {
      header: null
    }
  },
  Congratulation:{
    screen: Congratulation,
    navigationOptions: {
      header: null
    }
  }, 
  MyPostedProperties:{
    screen: MyPostedProperties,
    navigationOptions: {
      header: null
    }
  },
  MyInterestedProperties:{
    screen: MyInterestedProperties,
     navigationOptions: {
      header: null
    }
  },
   MobileScreen:{
    screen: MobileScreen,
    navigationOptions: {
      header: null
    }
  },
  OTPScreen:{
    screen: OTPScreen,
    navigationOptions: {
      header: null
    }
  },
  
});

const drawer = createDrawerNavigator({
	Home : {
		screen: HomeStack
	}
},{
  contentComponent: SideMenu
});



// export default HomeStack;
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: drawer,
    // Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));