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
			transactionType : "Commercial-Sell"
		}
		this.handleSearch = this.handleSearch.bind(this);
	}
	componentDidMount() {
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
		event.preventDefault();
		var transactionType = this.refs.transactionType.value;
		this.setState({
			transactionType : this.refs.transactionType.value,
		})
	}

	render() {
		
		   
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
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
							<input type="text" placeholder="Enter Location..." className="col-lg-12 hSearch"  />
						</div>
					</div>
					:
					<div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 noPad">
						<input type="text" placeholder="Enter Location..." className="col-lg-12 hSearch"  />
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
							  		<select className="form-control col-lg-12 noPad budgetOption">
								    	<option value=""  className="hidden">Budget</option>
								    	{this.props.transactionType === "Sell"  || this.state.transactionType === "Commercial-Sell"?
							    			this.state.budgetList1.map((budget,index)=>{
									    		return(
									    				<option value="" key={index} className="selectOption">{budget}</option>
									    			);
									    		})
										:
										this.state.budgetList2.map((budget,index)=>{
								    		return(
								    				<option value="" key={index} className="selectOption">{budget}</option>
								    			);
								    		})
										}
									</select>
								</div>
							  </div>
				  		</div>
					</div>
					<div className="col-lg-1 sImg noPad">
						<Link to={"/SearchResults/"+this.props.propertyType+"-"+this.props.transactionType}>	
							<img alt=""  src="/images/TGK-key.png" className="col-lg-12 tgkImg noPad" />
						</Link>
					</div>
				</div>
				<div className="col-lg-12">
					<div className="col-lg-4 noDiv"></div>
					{this.props.propertyType === "Commercial" ?
						<div className="col-lg-8" id="propertyDiv">
					  	<div className="col-lg-12">
							<h5>Commercial</h5>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Office Space</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Shop / Showroom</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Commercial Land</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Warehouse</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Industrial Building</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Industrial Shed</span>
						</div>
					</div>
					:
					<div className="col-lg-8" id="propertyDiv">
					  	<div className="col-lg-12 noPad">
							<h5>Residential</h5>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;MultiStory Apartment</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Residential House</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Studio Apartment</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Villa / Bunglow</span>
							<span className="col-lg-6"><input type="checkBox" />&nbsp;Penthouse</span>
						</div>
					</div>
					}
				</div>
			 </div>
		);
	}
}

export default withRouter(SearchProperty);
