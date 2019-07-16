import React,{Component} 		from 'react';
import HomePageBanner           from '../HomePageBanner/HomePageBanner.js';
import PropertyCondition  		from '../PropertyCondition/PropertyCondition.js';
import PopularPlace  			from '../Profile/PopularPlace.js';
import HomePageFooter  			from '../Profile/HomePageFooter.js';
import MainFooter  				from '../MainFooter/MainFooter.js';
import Description  			from '../HomePageDescription/Description.js';
import Footer  					from '../Footer/Footer.js';

import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';
import './HomePage.css';
/*var formValues=[];*/
export default class HomePage extends Component {

	render() {
		return (
		  <div className="">
		      <HomePageBanner />
		      <Description/>
		      <PropertyCondition carouselvalue={true} inputData={{category:"Residential", type:"Sale", showprops:8}}/>
		      <PropertyCondition carouselvalue={false} inputData={{category:"Residential", type:"Buy", showprops:8}}/>
		      <PopularPlace />
		      <MainFooter />
		   </div>
		);
	}
}