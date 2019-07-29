import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutSystemSecurity from './coreAdmin/LayoutSystemSecurity/LayoutSystemSecurity.js';
import Layout from './coreAdmin/Layout/Layout.js';
import './lib/router.js';
import axios from 'axios';
import $ from 'jquery';

axios.defaults.baseURL = 'http://qatgk3tapi.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';



 class App extends Component {

	componentDidMount(){
    $(document).ready(function () {
	       $('#sidebarCollapse').on('click', function () {
	           $('#sidebar').toggleClass('active');
			   $('#dashbordid').toggleClass('dashboardeffect');
	       });
    	});

    window.onscroll = function() {scrollFunction()};

	  function scrollFunction() {
	    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
	      document.getElementById("mySidenav").style.top = "0";
	    } else {
	      document.getElementById("mySidenav").style.top = "50px";
	    }
	  }
  
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
