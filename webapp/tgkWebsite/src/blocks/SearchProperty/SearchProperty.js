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
			propertyList1			: [],
			propertyList2			: [],
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
			
			budgetList1 : [
				{value: 1000000, option: "Upto 10 Lac"},
				{value: 2000000, option: "Upto 20 Lac"},
				{value: 3000000, option: "Upto 30 Lac"},
				{value: 4000000, option: "Upto 40 Lac"},
				{value: 5000000, option: "Upto 50 Lac"},
				{value: 6000000, option: "Upto 60 Lac"},
				{value: 7000000, option: "Upto 70 Lac"},
				{value: 8000000, option: "Upto 80 Lac"},
				{value: 9000000, option: "Upto 90 Lac"},
				{value: 10000000, option: "Upto 1 Cr"},
				{value: 20000000, option: "Upto 2 Cr"},
				{value: 30000000, option: "Upto 3 Cr"},
				{value: 50000000, option: "Upto 5 Cr"},
				{value: 100000000, option: "Upto 10 Cr"},
			],

			budgetList2 : [
				{value: 5000, option: "Upto 5000"},
				{value: 10000, option: "Upto 10000"},
				{value: 15000, option: "Upto 15000"},
				{value: 20000, option: "Upto 20000"},
				{value: 25000, option: "Upto 25000"},
				{value: 30000, option: "Upto 30000"},
				{value: 40000, option: "Upto 40000"},
				{value: 50000, option: "Upto 50000"},
				{value: 60000, option: "Upto 60000"},
				{value: 70000, option: "Upto 70000"},
				{value: 80000, option: "Upto 80000"},
				{value: 90000, option: "Upto 90000"},
				{value: 100000, option: "Upto 1 Lac"},
			],
			propertyList1 : [
				{name:'MultiStory Apartment'},
				{name:'Residential House'},
				{name:'Studio Apartment'},
				{name:'Villa / Bunglow'},
				{name:'Penthouse'}
			],

			propertyList2 : [
				{name:'Office in IT Park/SEZ'},
				{name:'Commercial Office Space'},
				{name:'Commercial Showroom'},
				{name:'Commercial Shop'},
				{name:'Industrial Building'},
				{name:'Warehouse/Godown'}
			]
		})



			if(this.props.propertyType === "Commercial"){
			var property  	 	= this.refs.transactionType.value.split("-");
			var propertyType 	= property[0];
			var transactionType = property[1];
			this.setState({
				transactionType	: this.refs.transactionType.value,
			})
		}

		console.log("this.props.propertyType == ", this.props.propertyType );

		const formValues = {
			// transactionType : this.props.propertyType == "Commercial" ? transactionType : this.props.transactionType,
			transactionType : this.props.propertyType === "Commercial" ? transactionType : "Sell",
			location        : this.refs.location.value,
			budget 			: [this.state.budget],
			// propertyType   	: this.props.propertyType == "Commercial" ? propertyType : this.props.propertyType,
			propertyType   	: this.props.propertyType === "Commercial" ? propertyType : "Residential",
			propertySubType : this.state.propertySubType,
			areaMin 		: 0,
			areaMax 		: 0,
			floor			: "",
		}
		var searchData = JSON.stringify(formValues);
		localStorage.setItem("searchData",searchData);
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
		if(this.props.propertyType === "Commercial"){
			var property  	 	= this.refs.transactionType.value.split("-");
			var propertyType 	= property[0];
			var transactionType = property[1];
			this.setState({
				transactionType	: this.refs.transactionType.value,
				location 		: this.refs.location.value,
			})
		}

		const formValues = {
			transactionType : this.props.propertyType === "Commercial" ? transactionType : this.props.transactionType,
			// transactionType : this.props.propertyType == "Commercial" ? transactionType : "Sell",
			location        : this.refs.location.value,
			budget 			: [this.state.budget],
			// propertyType   	: this.props.propertyType == "Commercial" ? propertyType : this.props.propertyType,
			propertyType   	: this.props.propertyType === "Commercial" ? propertyType : "Residential",
			propertySubType : this.state.propertySubType,
			// areaMin 		: 0,
			// areaMax 		: 0,
			floor			: "",
			// constructionType: "",
			furnishedStatus : "",
			flatType 		: "",
			propertyAge 	: "",
			availability    : "",

		}
		var searchData = JSON.stringify(formValues);
		localStorage.setItem("searchData",searchData);

	}
	searchResultbtn(){
		if(this.props.propertyType === "Commercial"){
			var property  	 	= this.refs.transactionType.value.split("-");
			var propertyType 	= property[0];
			var transactionType = property[1];
			this.setState({
				transactionType	: this.refs.transactionType.value,
				location 		: this.refs.location.value,
			})
		}

		const formValues = {
			transactionType : this.props.propertyType === "Commercial" ? transactionType : this.props.transactionType,
			// transactionType : this.props.propertyType == "Commercial" ? transactionType : "Sell",
			location        : this.refs.location.value,
			budget 			: [this.state.budget],
			// propertyType   	: this.props.propertyType == "Commercial" ? propertyType : this.props.propertyType,
			propertyType   	: this.props.propertyType === "Commercial" ? propertyType : "Residential",
			propertySubType : this.state.propertySubType,
			// areaMin 		: 0,
			// areaMax 		: 0,
			floor			: "",
			// constructionType: "",
			furnishedStatus : "",
			flatType 		: "",
			propertyAge 	: "",
			availability    : "",
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

	handleBudget(event){
		this.setState({budget: event.target.value})
	}


	render() {
		console.log("this.props.propertyType",this.props.propertyType)
		console.log("this.state.transactionType",this.props.transactionType)

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
								    <button className="dropdown-toggle btn col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt39">
							      		{this.props.propertyType === "Commercial" ?
										<div className="col-lg-12 ">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertyList2.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad">
																<input type="checkbox" className="" value={data.name} key={index}  onChange={this.propertySubType.bind(this)}/>&nbsp;{data.name}
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
													this.state.propertyList1.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad"><input type="checkBox" value={data.name} key={index} onChange={this.propertySubType.bind(this)}/>&nbsp;{data.name}</span>
														)
													})

												}
											</div>
										</div>
										}
								    </ul>
								</div>
							</div>
						
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
							  	 	<button className="btn dropdown-toggle  col-lg-12" type="button" data-toggle="dropdown">Budget
								   		<span className="caret"></span>
								   	</button>
								    <ul className="dropdown-menu col-lg-12 noPad mt39">
									{this.props.transactionType === "Sell"|| (this.props.propertyType === "Commercial" && this.state.transactionType === "Commercial-Sell")?
									    this.state.budgetList1.map((budget,index)=>{
								    		return(
												<span className="col-lg-12 checkbg">
								    				<input type="radio" value={budget.value} key={index} ref="budget" name="budget" className="selectOption" onClick={this.handleBudget.bind(this)}/>&nbsp; {budget.option}
								    			</span>
								    			);
									    	})
									    :
									    this.state.budgetList2.map((budget,index)=>{
								    		return(
													<span className="col-lg-12">
									    				<input type="radio" value={budget.value} key={index} ref="budget" name="budget" className="selectOption" onClick={this.handleBudget.bind(this)}/>&nbsp; {budget.option}
									    			</span>
								    			);
								    		})
								    	}
								    </ul>
								</div>
							</div>

							<div className="col-lg-1 sImg noPad">
									<Link to={"/SearchResults"} onClick={this.searchResultbtn.bind(this)}>	
										<img alt=""  src="/images/TGK-key.png" className="col-lg-12 tgkImg" />
									</Link>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}

export default withRouter(SearchProperty);
