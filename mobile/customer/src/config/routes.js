import {createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import AuthLoadingScreen from '../layouts/AuthLoading/AuthLoadingScreen.js' 
import Home from '../components/Home/Home.js';
import SideMenu from '../layouts/SideMenu/SideMenu.js';
import SignUp from '../components/PostAndEarn/SignUp.js';
import PropertyDetails1 from '../components/PostAndEarn/PropertyDetails1.js';
import PropertyDetails2 from '../components/PostAndEarn/PropertyDetails2.js';
// import PropertyDetails3 from '../components/PostAndEarn/PropertyDetails3.js';
import PropertyDetails4 from '../components/PostAndEarn/PropertyDetails4.js';
import PropertyDetails5 from '../components/PostAndEarn/PropertyDetails5.js';
import PropertyDetails6 from '../components/PostAndEarn/PropertyDetails6.js';
import PropertySuccess from '../components/PostAndEarn/PropertySuccess.js';
import SearchProperty from '../components/SearchProperty/SearchProperty.js';
import PropertyList from '../components/Property/PropertyList.js'
import PropertyDetails from '../components/Property/PropertyDetails.js'

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
  PropertyDetails:{
    screen: PropertyDetails,
    navigationOptions: {
      header: null
    }
  },
  PropertyDetails5:{
    screen: PropertyDetails5,
    navigationOptions: {
      header: null
    }
  },
  PropertyDetails1:{
    screen: PropertyDetails1,
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
  
  PropertySuccess:{
    screen: PropertySuccess,
    navigationOptions: {
      header: null
    }
  },
   PropertyDetails6:{
    screen: PropertyDetails6,
    navigationOptions: {
      header: null
    }
  },

  PropertyDetails4:{
    screen: PropertyDetails4,
    navigationOptions: {
      header: null
    }
  },
  // PropertyDetails3:{
  //   screen: PropertyDetails3,
  //   navigationOptions: {
  //     header: null
  //   }
  // },

  PropertyDetails2:{
    screen: PropertyDetails2,
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