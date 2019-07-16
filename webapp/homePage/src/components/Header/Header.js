import React, { Component } from 'react';
import'./Header.css';

export default class Header extends Component {
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad  ">
				<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-lg-offset-5">
					<img src="images/Logo.png" className="hImg pull-right"/>
				</div>
				<div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 pull-right headerMenu ">
					<nav className="navbar  ">
					    <ul className="nav navbar-nav ">
					      <li className="active"><a href="#">HOME</a></li>
					      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">ABOUT US <span className="caret"></span></a>
					        <ul className="dropdown-menu">
					          <li><a href="#">Page 1-1</a></li>
					          <li><a href="#">Page 1-2</a></li>
					          <li><a href="#">Page 1-3</a></li>
					        </ul>
					      </li>
					      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">CONTACT US <span className="caret"></span></a>
					        <ul className="dropdown-menu">
					          <li><a href="#">Page 1-1</a></li>
					          <li><a href="#">Page 1-2</a></li>
					          <li><a href="#">Page 1-3</a></li>
					        </ul>
					      </li>
					      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">MY PROFILE <span className="caret"></span></a>
					        <ul className="dropdown-menu">
					          <li><a href="#">Page 1-1</a></li>
					          <li><a href="#">Page 1-2</a></li>
					          <li><a href="#">Page 1-3</a></li>
					        </ul>
					      </li>
					      
					    </ul>
					</nav>
				</div>
			</div>
		);
	}
}
