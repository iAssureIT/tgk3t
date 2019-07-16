import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import Header 					from "../Header/Header.js";
import Banner 					from "../Banner/Banner.js";
import PropertyCondition  		from '../webPage/PropertyCondition/PropertyCondition.js';
import PopularPlace  			from '../webPage/Profile/PopularPlace.js';
import HomePageFooter  			from '../webPage/Profile/HomePageFooter.js';
import Description  			from '../webPage/HomePageDescription/Description.js';
import MainFooter  				from '../webPage/MainFooter/MainFooter.js';
import Footer  					from '../webPage/Footer/Footer.js';


import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

import './HomePage.css';


export default class HomePage extends Component {
	// redirectToForm(event){
	// 	event.preventDefault();
	// 	this.props.history.push('/LoginMobNum');
	// }
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad BoxSize">
				<Header />

				<Banner />

			    <Description/>

			    <PropertyCondition carouselvalue={true} inputData={{category:"Residential", type:"Sale", showprops:8}}/>

			    <PropertyCondition carouselvalue={false} inputData={{category:"Residential", type:"Buy", showprops:8}}/>

			    <PopularPlace />

			    <MainFooter />

			    <Footer />
			</div>
		);
	}
}