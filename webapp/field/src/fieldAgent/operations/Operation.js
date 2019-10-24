import React, { Component }   from 'react';
import $ 					  from "jquery";
import Query                  from './query/Query.js';
import  Properties 			  from './Properties/Properties.js';

import './Operation.css';


export default class Operation extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			propertyStatus :"VerifyPending",
			// propertyStatus :"assignedTo",
		}

		this.propertyFieldStatus=this.propertyFieldStatus.bind(this);
	}

	propertyStatus(event){
	// 	event.preventDefault();
	// 	this.setState({
	// 		propertyStatus : $(event.target).attr('property-status'),
	// 	})
	}

	propertyFieldStatus(event){
		event.preventDefault();
		this.setState({
			propertyStatus : $(event.target).attr('property-status'),
		})

	}

	render() {
		return (
			<div className="container-fluid bodyDiv ">
				<div className="tableinnetWrap1 innerblock innerblock1">
					<div className="">
					  <h2>Operations</h2>
					  <br/>
					 {/* <!-- Nav pills -->
					 <div className=" col-lg-12 col-md-12">
						  <ul className="nav nav-pills textC col-lg-12 col-md-12 noPad" role="tablist">
						    <li className="nav-item col-lg-2 col-md-2 active navPillsMargin ">
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="WIP" onClick={this.propertyStatus.bind(this)}>WIP
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin ">
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="New" onClick={this.propertyStatus.bind(this)}>New
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="ReListing" onClick={this.propertyStatus.bind(this)}>Re-Listing </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Verified" onClick={this.propertyStatus.bind(this)}>Verified </a>
						       <span className="badge badge-secondary label-warning badgeP">3</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Listed" onClick={this.propertyStatus.bind(this)}>Listed </a>
						       <span className="badge badge-secondary label-warning badgeP">9</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#Query">Query </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>		    
						  </ul>
					 </div>*/}



					 <div className=" col-lg-12 col-md-12">
						  <ul className="nav nav-pills textC col-lg-12 col-md-12 noPad" role="tablist">
						   
						    <li className="nav-item col-lg-2 col-md-2 active navPillsMargin ">
						      {/*<a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="assignedTo" onClick={this.propertyFieldStatus.bind(this)}>New*/}
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="VerifyPending" onClick={this.propertyFieldStatus.bind(this)}>New SA
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin ">
						      {/*<a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="assignedTo" onClick={this.propertyFieldStatus.bind(this)}>New*/}
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="New" onClick={this.propertyFieldStatus.bind(this)}>New Client
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						     <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Meetings" onClick={this.propertyFieldStatus.bind(this)}>Meetings </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Shown" onClick={this.propertyFieldStatus.bind(this)}>Shown </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Shortlisted" onClick={this.propertyFieldStatus.bind(this)}>Shortlisted </a>
						       <span className="badge badge-secondary label-warning badgeP">3</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Token Recd" onClick={this.propertyFieldStatus.bind(this)}>Token Recd </a>
						       <span className="badge badge-secondary label-warning badgeP">9</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Contract Due" onClick={this.propertyFieldStatus.bind(this)}>Contract Due </a>
						       <span className="badge badge-secondary label-warning badgeP">9</span>
						    </li>
						    {/*<li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#Query">Query </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>*/}		    
						  </ul>
					 </div>

					  
					  {/*<!-- Tab panes -->*/}
					  <div className="tab-content  noPad ">
						     <div id="propertyStatus" className="container active tab-pane ">
						       <Properties status={this.state.propertyStatus} /> 
						    </div>
						    <div id="Query" className="container tab-pane fade">
						      <Query />
						    </div>
						 </div>   
					</div>
				</div>
			</div>

		);
	}
}
