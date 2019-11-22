import React, { Component }   from 'react';
import axios                  from 'axios';
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
			userRole 	   : "",
			propDataCount  : []
			// propertyStatus :"assignedTo",
		}

		this.propertyFieldStatus=this.propertyFieldStatus.bind(this);
		this.getTotalCount = this.getTotalCount.bind(this);

	}
	componentDidMount() {
		this.getTotalCount();

		var userRole = localStorage.getItem('userRole')
		this.setState({
			userRole : userRole
		})
		// console.log("userRole===",this.state.userRole)
		// console.log("propDataCount===",this.state.propDataCount)
	}
	getTotalCount(){
		 var userId = localStorage.getItem("user_ID");
		 var userRole = localStorage.getItem("userRole");
		 console.log("userRole====",userRole)
			if((userRole ==="Field Manager")||(userRole ==="Field Manager")){
				axios
				    .get('/api/fieldagent/get/interestedproperties_totalcount/all')
				    .then(
				      (res)=>{
				        const postCount = res.data;
				        
				        this.setState({
				          propDataCount : postCount,
				        },()=>{
				        	
				        console.log("aaaaa.....",this.state.propDataCount);
				        });
				      }
				    )
				    .catch();
			}
			else{
				axios
				    .get('/api/fieldagent/get/interestedproperties_totalcount/'+userId)
				    .then(
				      (res)=>{
				        const postCount = res.data;
				        
				        this.setState({
				          propDataCount : postCount,
				        },()=>{
				        	
				        console.log("aaaaa.....",this.state.propDataCount);
				        });
				      }
				    )
				    .catch();
					}
			

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
					 <div className=" col-lg-12 col-md-12">
						  <ul className="nav nav-pills textC col-lg-12 col-md-12 noPad" role="tablist">
						   
						    <li className="nav-item col-lg-2 col-md-2 active navPillsMargin ">
						      {/*<a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="assignedTo" onClick={this.propertyFieldStatus.bind(this)}>New*/}
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="VerifyPending" onClick={this.propertyFieldStatus.bind(this)}>New SA
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.newSACount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin ">
						      {/*<a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="assignedTo" onClick={this.propertyFieldStatus.bind(this)}>New*/}
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="New" onClick={this.propertyFieldStatus.bind(this)}>New Client
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.newClientCount}</span>
						    </li>
						     <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="meetingSet" onClick={this.propertyFieldStatus.bind(this)}>Meetings </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.meetingCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Shown" onClick={this.propertyFieldStatus.bind(this)}>Shown </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.shownCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Shortlisted" onClick={this.propertyFieldStatus.bind(this)}>Shortlisted </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.shortlistedCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="TokenReceived" onClick={this.propertyFieldStatus.bind(this)}>Token Recd </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.tokenReceivedCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="ContractDue" onClick={this.propertyFieldStatus.bind(this)}>Contract Due </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.contractDueCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Discarded" onClick={this.propertyFieldStatus.bind(this)}>Discarded </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.discardedCount}</span>
						    </li>
						    {/*<li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#Query">Query </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>*/}		    
						  </ul>
					 </div>

					  
					  {/*<!-- Tab panes -->*/}
					  <div className="tab-content container noPad ">
						     <div id="propertyStatus" className="container-fluid active tab-pane ">
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
