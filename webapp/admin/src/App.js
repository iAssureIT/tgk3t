import React,{Component} 	from 'react';
import LayoutSystemSecurity from './coreAdmin/LayoutSystemSecurity/LayoutSystemSecurity.js';
import Layout 				from './coreAdmin/Layout/Layout.js';
import axios 				from 'axios';
import $ 					from 'jquery';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lib/router.js';


// axios.defaults.baseURL = 'http://localhost:5018/';

axios.defaults.baseURL = 'http://qatgk3tapi.iassureit.com/';
// axios.defaults.baseURL = 'http://qalyvoapi.nurseryworld.in/';

// axios.defaults.baseURL = 'http://uatapi.lyvo.in/';
axios.defaults.headers.post['Content-Type'] = 'application/json';



 class App extends Component {

	componentDidMount(){
   $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           // $('#sidebar').toggleClass('active');
       });
    });
    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           // $('#sidebarCollapse').toggleClass('longmar');
       });
    });
    $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
           // $('#dashbordid').toggleClass('dashboardeffect');
       });
    });

   //  window.onscroll = function() {scrollFunction()};

	  // function scrollFunction() {
	  //   if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
	  //     document.getElementById("mySidenav").style.top = "0";
	  //   } else {
	  //     document.getElementById("mySidenav").style.top = "50px";
	  //   }
	  // }
  
	}
 render(){
    
		  return (
		    <div>
		      <Layout />
		      {/*<LayoutSystemSecurity />*/}
		    </div>
		    
		    );
		 }  
}
  
export default App;
