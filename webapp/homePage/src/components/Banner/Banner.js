import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import {withRouter} from 'react-router-dom';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

import './Banner.css';


class Banner extends Component {
	redirectToForm(event){
		event.preventDefault();
		this.props.history.push('/LoginMobNum');
	}
	handleColor(){
		 $("#Buy").toggleClass("intro");
	}

	render() {
		return (
			<div>
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb90">
				
				<div className=" col-lg-12  ">
					<h2 className="hText">EVERY DREAM HAS A KEY</h2>
					<h4 className="hText1">India's Only Property Portal sharing Brokerage with both Owners and Tenants!</h4>
				</div>
				<div className="col-lg-6 col-lg-offset-4 mt-10">
					<button id="Buy" 		className="col-lg-3 btn btn-bg" onClick={this.handleColor.bind(this)}>Buy</button>
					<button id="Rent" 		className="col-lg-3 btn btn-bg ml-10">Rent</button>
					<button id="Commercial" className="col-lg-3 btn btn-bg ml-10">Commercial</button>
				</div>
				<div className="col-lg-5 col-lg-offset-3">
					<div className="col-lg-10">
						<input type="text" placeholder="  Enter Society, Location or Address" className="hSearch"  />
					</div>
					<div className="col-lg-1 S-img">
						<div className=" col-lg-12 S-img1 ">
							<img src="/images/TGK-key.png" />
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-lg-offset-4 mt-64">
					<div className="col-lg-5 br2">
						<span className="postDetails">Welcome Owners</span>
						<button className="btn bg-primary btnPost" onClick={this.redirectToForm.bind(this)}> Post & Earn</button>
						<span><b> Earn upto 50% Brokerage for <br/>Listing With Us!</b>
						</span>
					</div>
					<div className="col-lg-6 ">
						<span className="postDetails">Tenants/Buyers</span>
						<span className="postDetails1"><b>Upto 50% Discount </b></span>
						<span className="postDetails2"><b>On Brokerage</b></span>
						<span className="postDetails3"><b>for Renting/Buying with us!</b></span>
						
					</div>
				</div>
			</div>
			</div>
		);
	}
}
export default withRouter(Banner);