import React, { Component } from 'react';
import "./navbar.css";

export  default class Navbar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar mb0">
				  <div className="container-fluid">
				  	<div className="row">
					  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 orangebg topStrip"> 
					  		<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1"> </div>
					  		<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
					  			<span className="glyphicon glyphicon-phone"></span> +91 - 992 393 3933 
					  			<span className="glyphicon glyphicon-envelope pl10"></span> info@thegoldenkey.com 
					  		</div>
					  		<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"> </div>
					  		<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
					  			<i className="fa fa-facebook"></i> 
					  			<i className="fa fa-linkedin pl10"></i>
					  			<i className="fa fa-twitter pl10"></i>
					  		</div>
					  		<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1"> </div>
					  	</div>
				  	</div>
				    <div className="navbar-header col-lg-3 col-md-3 col-sm-3 col-xs-3">
				      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>                        
				      </button>
				      <a className="navbar-brand" href="#">The Golden Key</a>
				    </div>
				    <div className="collapse navbar-collapse col-lg-6 col-md-6 col-sm-6 col-xs-6" id="myNavbar">
				      <ul className="nav navbar-nav">
				        <li className="active"><a href="#">Buy</a></li>
				        <li className="dropdown">
				          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Rent <span className="caret"></span></a>
				          <ul className="dropdown-menu">
				            <li><a href="#">Page 1-1</a></li>
				            <li><a href="#">Page 1-2</a></li>
				            <li><a href="#">Page 1-3</a></li>
				          </ul>
				        </li>
				        <li><a href="#">Sell</a></li>
				        <li><a href="#">Help</a></li>
				      </ul>
				    </div>
				      <ul className="nav navbar-nav navbar-right col-lg-3 col-md-3 col-sm-3 col-xs-3">
				        <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
				        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
				      </ul>
				  </div>
				</nav>
			</div>
		);
	}
}
