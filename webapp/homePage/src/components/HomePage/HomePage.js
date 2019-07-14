import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";

import './HomePage.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';
import './HomePage.css';
/*var formValues=[];*/
export default class HomePage extends Component {
	redirectToForm(event){
		event.preventDefault();
		this.props.history.push('/modalBackground');
	}
	render() {
		return (
			<div className="col-lg-12 BoxSize">
				<div className="col-lg-2 col-lg-offset-5">
					<img src="images/Logo.png" className="hImg pull-right"/>
				</div>
				<div className="col-lg-5 pull-right ">
					<nav className="navbar  navText ">
					    <div className="container-fluid ">
						    <ul className="nav navbar-nav ">
							      <li className="active"><a href="#">HOME</a></li>
							      <li className="dropdown">
							        <a className="dropdown-toggle" data-toggle="dropdown" href="#">ABOUT US
							        <span className="caret"></span></a>
							        <ul className="dropdown-menu">
							          <li><a href="#">Page 1-1</a></li>
							          <li><a href="#">Page 1-2</a></li>
							          <li><a href="#">Page 1-3</a></li>
							        </ul>
							      </li>
							      <li className="dropdown">
							        <a className="dropdown-toggle" data-toggle="dropdown" href="#">CONTACT US
							        <span className="caret"></span></a>
							        <ul className="dropdown-menu">
							          <li><a href="#">Page 1-1</a></li>
							          <li><a href="#">Page 1-2</a></li>
							          <li><a href="#">Page 1-3</a></li>
							        </ul>
							      </li>
							      <li className="dropdown">
							        <a className="dropdown-toggle" data-toggle="dropdown" href="#">MY PROFILE
							        <span className="caret"></span></a>
							        <ul className="dropdown-menu">
							          <li><a href="#">Page 1-1</a></li>
							          <li><a href="#">Page 1-2</a></li>
							          <li><a href="#">Page 1-3</a></li>
							        </ul>
							      </li>
						    </ul>
					    </div>
					</nav>
				</div>
				<div className=" col-lg-12  hText">
					<h2>EVERY DREAM HAS A KEY</h2>
					<h4 className="hText1">India's Only Property Portal sharing Brokerage with both Owners and Tenants!</h4>
				</div>
				<div className="col-lg-6 col-lg-offset-4 mt-10">
					<button className="col-lg-3 btn btn-bg">Buy</button>
					<button className="col-lg-3 btn btn-bg ml-10">Rent</button>
					<button className="col-lg-3 btn btn-bg ml-10">Commercial</button>
				</div>
				<div className="col-lg-5 col-lg-offset-3">
					<div className="col-lg-10">
						<input type="text" placeholder="  Enter Society, Location or Address" className="hSearch"  />
					</div>
					<div className="col-lg-1 S-img">
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
		);
	}
}