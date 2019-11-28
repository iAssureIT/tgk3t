import React, { Component } 	from 'react';
import Header 					from "../../blocks/common/Header/Header.js";
import MainFooter  				from '../../blocks/common/MainFooter/MainFooter.js';
import AboutUsInfo  			from './AboutUsInfo.js';


export default class AboutUs extends Component {
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad BoxSize1">
				<Header />
				<AboutUsInfo />
				<MainFooter />
			</div>
		);
	}
}
