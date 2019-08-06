import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter, Link} 		    from 'react-router-dom';
import { connect } 				from 'react-redux';

import './SearchProperty.css';

class SearchProperty extends Component {
	constructor(){
		super();
		this.state = {
			budgetList1 	: [],
			budgetList2 	: [],
			transactionType : "Commercial-Sell",
			budget          : "",
			propertySubType : [],
		}
		this.handleSearch = this.handleSearch.bind(this);
	}
	componentDidMount() {
	localStorage.removeItem('searchData');
	this.setState({
			budgetList1 : ["00 - 05 Lac","05 - 10 Lac","10 - 20 Lac","30 - 40 Lac",
						  "20 - 30 Lac", "30 - 40 Lac","40 - 50 Lac",
						  "50 - 60 Lac","60 - 70 Lac","70 - 80 Lac",
						  "80 - 99 Lac","1 - 1.2 Cr","1.2 - 1.4 Cr","1.4 - 1.6 Cr",
						  "1.6 - 1.8 Cr","1.8 - 1.99 Cr"] ,
			budgetList2 : ["5000","10000","15000","20000","25000","30000","40000","50000","60000","80000", "1 Lac", "1.2 Lac", "1.5 Lac"] 
		})

	}

	propertyType(event){
		event.preventDefault()
		$("#propertyDiv").toggle();
		$("#budget").hide();
	}

	budget(event){
		event.preventDefault()
		$("#propertyDiv").hide();
	}
	
	handleSearch(event){
		if(this.props.propertyType == "Commercial"){
			var property  	 	= this.refs.transactionType.value.split("-");
			var propertyType 	= property[0];
			var transactionType = property[1];
		}

		const formValues = {
			transactionType : this.props.propertyType == "Commercial" ? transactionType : this.props.transactionType,
			location        : this.refs.location.value,
			budget 			: this.refs.budget.value,
			propertyType   	: this.props.propertyType == "Commercial" ? propertyType : this.props.propertyType,
			propertySubType : this.state.propertySubType,
		}
		var searchData = JSON.stringify(formValues);
		localStorage.setItem("searchData",searchData);
	}

	propertySubType(e){
		  if(e.target.checked)
		  {
		  this.state.propertySubType.push(e.target.getAttribute('value'));

		  console.log("propertySubType",this.state.propertySubType);
		  }
		  else{
		  this.state.propertySubType.pop(e.target.getAttribute('value'));
		  console.log("propertySubType",this.state.propertySubType);

		  }
	}


	render() {
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
				<form>
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchProperty noPad">
						{this.props.propertyType === "Commercial" ?
						<div>
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12">
							 <div className="form-group noPad">
							  		<div className="col-lg-12 input-group noPad">
								  		<select className="form-control col-lg-12 noPad budgetOption" ref="transactionType" onChange={this.handleSearch.bind(this)}>
									    	<option value="Commercial-Sell"  className="">Buy</option>
									    	<option value="Commercial-Rent"  className="">Rent</option>
										</select>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 noPad">
								<input type="text" placeholder="Enter Location..." ref="location" className="col-lg-12 hSearch" onChange={this.handleSearch.bind(this)} />
							</div>
						</div>
						:
						<div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 noPad">
							<input type="text" placeholder="Enter Location..." ref="location" className="col-lg-12 hSearch" onChange={this.handleSearch.bind(this)} />
						</div>
						}

						<div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 searchDrop" id="pType" onClick={this.propertyType.bind(this)}>
							<div className="col-lg-12 noPad">
							   	Property Type
					  			&nbsp;<i className="fa fa-caret-down pull-right"></i>
					  		</div>

						</div>
						
						<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad" onClick={this.budget.bind(this)}>
							<div className="col-lg-12 noPad">
					  			 <div className="form-group noPad">
							  		<div className="col-lg-12 input-group noPad">
								  		<select className="form-control col-lg-12 noPad budgetOption" ref="budget" onChange={this.handleSearch.bind(this)}>
									    	<option value=""  className="hidden">Budget</option>
									    	{this.props.transactionType === "Sell"  || this.state.transactionType === "Commercial-Sell"?
								    			this.state.budgetList1.map((budget,index)=>{
										    		return(
										    				<option value={budget} key={index} className="selectOption">{budget}</option>
										    			);
										    		})
											:
											this.state.budgetList2.map((budget,index)=>{
									    		return(
									    				<option value={budget} key={index} className="selectOption">{budget}</option>
									    			);
									    		})
											}
										</select>
									</div>
								  </div>
					  		</div>
						</div>
						<div className="col-lg-1 sImg noPad">
							<Link to={"/SearchResults"}>	
								<img alt=""  src="/images/TGK-key.png" className="col-lg-12 tgkImg noPad" />
							</Link>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="col-lg-4 noDiv"></div>
						{this.props.propertyType === "Commercial" ?
							<div className="col-lg-12" id="propertyDiv">
						  	<div className="col-lg-12">
								<h5>Commercial</h5>
								<span className="col-lg-6"><input type="checkBox" value="Office in IT Park/SEZ" onChange={this.propertySubType.bind(this)} />&nbsp;Office in IT Park/SEZ</span>
								<span className="col-lg-6"><input type="checkBox" value="Commercial Office Space" onChange={this.propertySubType.bind(this)} />&nbsp;Commercial Office Space</span>
								<span className="col-lg-6"><input type="checkBox" value="Commercial Showroom" onChange={this.propertySubType.bind(this)}/>&nbsp;Commercial Showroom</span>
								<span className="col-lg-6"><input type="checkBox" value="Commercial Shop" onChange={this.propertySubType.bind(this)}/>&nbsp; Commercial Shop</span>
								<span className="col-lg-6"><input type="checkBox" value="Industrial Building" onChange={this.propertySubType.bind(this)}/>&nbsp;Industrial Building</span>
								<span className="col-lg-6"><input type="checkBox" value="Warehouse/Godown" onChange={this.propertySubType.bind(this)}/>&nbsp;Warehouse/Godown </span>
							</div>
						</div>
						:

						<div className="col-lg-12" id="propertyDiv">
						  	<div className="col-lg-12 noPad">
								<h5>Residential</h5>
								<span className="col-lg-6"><input type="checkBox" value="MultiStory Apartment" onChange={this.propertySubType.bind(this)}/>&nbsp;MultiStory Apartment</span>
								<span className="col-lg-6"><input type="checkBox" value="Residential House" onChange={this.propertySubType.bind(this)}/>&nbsp;Residential House</span>
								<span className="col-lg-6"><input type="checkBox" value="Studio Apartment" onChange={this.propertySubType.bind(this)}/>&nbsp;Studio Apartment</span>
								<span className="col-lg-6"><input type="checkBox" value="Villa / Bunglow" onChange={this.propertySubType.bind(this)}/>&nbsp;Villa / Bunglow</span>
								<span className="col-lg-6"><input type="checkBox" value="Penthouse" onChange={this.propertySubType.bind(this)}/>&nbsp;Penthouse</span>
							</div>
						</div>
						}
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(SearchProperty);
