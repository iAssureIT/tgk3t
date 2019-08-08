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
			budgetList1 			: [],
			budgetList2 			: [],
			transactionType 		: "Commercial-Sell",
			budget          		: "",
			propertySubType 		: [],
			propertySubTypeArray	: [],
			location        		: "",
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
		var propertySubType = [];
					if(this.props.propertyType === "Commercial")
					{
						propertySubType = ['Office in IT Park/SEZ','Commercial Office Space','Commercial Showroom','Commercial Shop','Industrial Building','Warehouse/Godown'];
					}
					else{
						propertySubType = ['MultiStory Apartment','Residential House','Studio Apartment','Villa / Bunglow','Penthouse'];
					}
		this.setState({propertySubTypeArray:propertySubType})
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
			this.setState({
				transactionType	: this.refs.transactionType.value,
				location 		: this.refs.location.value,
			})
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
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
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

						<div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 propertyType noPad">
							  	<div className="dropdown" id="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt39">
							      		{this.props.propertyType === "Commercial" ?
										<div className="col-lg-12 ">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertySubTypeArray.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad">
																<input type="checkbox" className="" value={data} key={index}  onChange={this.propertySubType.bind(this)}/>&nbsp;{data}
															</span>
														)
													})

												}
											</div>
										</div>
										:
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Residential</h5>
												{
													this.state.propertySubTypeArray.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad"><input type="checkBox" value={data} key={index} onChange={this.propertySubType.bind(this)}/>&nbsp;{data}</span>
														)
													})

												}
											</div>
										</div>
										}
								    </ul>
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
					</form>
				</div>
			);
		}
	}

export default withRouter(SearchProperty);
