import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";

import Header 					from "../../blocks/common/Header/Header.js";
import MainFooter  				from '../../blocks/common/MainFooter/MainFooter.js';

import BannerwithModal			from "../../blocks/Banner/BannerwithModal.js";
import PropertyCondition  		from '../../blocks/PropertyCondition/PropertyCondition.js';
import PopularPlace  			from '../../blocks/Profile/PopularPlace.js';
import Description  			from '../../blocks/HomePageDescription/Description.js';

import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

import './HomePage.css';


export default class HomePage extends Component {
	
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad BoxSize">
				<Header />

				<BannerwithModal />

			    <Description/>

			    <PropertyCondition carouselvalue={true} inputData={{category:"Residential", type:"Sale", showprops:8}}/>

			    <PopularPlace />

			    <MainFooter />

			    
			</div>
		);
	}
}