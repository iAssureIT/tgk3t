import React , { Component }from 'react';

import './NavTab.css';
import axios from 'axios';
import 'bootstrap/js/tab.js';



class NavTab extends Component{

		
	render() {
    return (

    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

			   <ul className="nav nav-pills mb-3 marg_btm_nav " id="pills-tab" role="tablist">
				  <li className="nav-item">
				    <a className="nav-link " id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">Commercial</a>
				  </li>
				  <li className="nav-item ">
				    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Residential</a>
				  </li>
			  </ul>
			  <div className="tab-content  " id="pills-tabContent">
				  <div className="tab-pane fade  " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
					  	<button href="#form" className="pill_marg_rght">Rent</button>
					   	<button href="#form" className="pill_marg_rght">Resale</button>
					    <button href="#form" className="pill_marg_rght">PG/Hostel</button>
					    <button href="#form" className="pill_marg_rght">Flatmates</button>
				  </div>
				  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
				  		<button href="#form" className="pill_marg_rght">Rent</button>
					   	<button href="#form" className="pill_marg_rght">Sale</button>
				  </div>
			  </div>
			</div>
		  </div>

		

		);
	}
	


}

export default NavTab;