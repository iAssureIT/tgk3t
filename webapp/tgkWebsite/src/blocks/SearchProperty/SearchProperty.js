import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter, Link} 		from 'react-router-dom';
import { connect } 				from 'react-redux';
import swal                     from 'sweetalert';

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
			budget          		: 0,
			propertySubType 		: [],
			propertySubTypeArray	: [],
			location        		: "",
			locSearchResults 		: "",
			transactionTypeDefault  : "Sell"
		}
		this.handleSearch = this.handleSearch.bind(this);
	}
	componentDidMount() {

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

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
				{value: 5000, option: "Upto 5,000"},
				{value: 10000, option: "Upto 10,000"},
				{value: 15000, option: "Upto 15,000"},
				{value: 20000, option: "Upto 20,000"},
				{value: 25000, option: "Upto 25,000"},
				{value: 30000, option: "Upto 30,000"},
				{value: 40000, option: "Upto 40,000"},
				{value: 50000, option: "Upto 50,000"},
				{value: 60000, option: "Upto 60,000"},
				{value: 70000, option: "Upto 70,000"},
				{value: 80000, option: "Upto 80,000"},
				{value: 90000, option: "Upto 90,000"},
				{value: 100000, option: "Upto 1 Lac"},
			],
			propertyList1 : [
				{name:'MultiStorey Apartment', checked:false},
				{name:'Residential House', checked:false},
				{name:'Studio Apartment', checked:false},
				{name:'Villa', checked:false},
				{name:'Penthouse', checked:false}
			],

			propertyList2 : [
				{name:'Office in IT Park/SEZ', checked:false},
				{name:'Commercial Office Space', checked:false},
				{name:'Commercial Showroom', checked:false},
				{name:'Commercial Shop', checked:false},
				{name:'Industrial Building', checked:false},
				{name:'Warehouse/Godown', checked:false}
			],
		})



			if(this.props.propertyType === "Commercial"){
			var property  	 	= this.refs.transactionType.value.split("-");
			var propertyType 	= property[0];
			var transactionType = property[1];
			this.setState({
				transactionType	: this.refs.transactionType.value,
			})
		}

		const formValues = {
			transactionType : this.props.propertyType === "Commercial" ? transactionType : "Sell",
			location        : this.state.location,
			budget 			: this.state.budget,
			propertyType   	: this.props.propertyType === "Commercial" ? propertyType : "Residential",
			propertySubType : this.state.propertySubType,
			floor			: "",
		}
		var searchData = JSON.stringify(formValues);
		localStorage.setItem("searchData",searchData);

		$(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");                
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");                
        });
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
				location 		: this.state.location,
			})
			var commercialData ={
				propertyType    : propertyType,
				transactionType : transactionType,
			}
			this.props.inputData(commercialData);
		}

	

		const formValues = {
			transactionType : this.props.propertyType === "Commercial" ? transactionType : this.props.transactionType,
			location        : this.state.location,
			budget 			: this.state.budget,
			propertyType   	: this.props.propertyType === "Commercial" ? propertyType : "Residential",
			propertySubType : this.state.propertySubType,
			floor			: "",
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
			transactionType : this.props.propertyType === "Commercial" ? transactionType : this.props.transactionType ? this.props.transactionType : "Sell",
			// transactionType : this.props.propertyType == "Commercial" ? transactionType : "Sell",
			location        : this.state.location,
			budget 			: this.state.budget,
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
			uid				: localStorage.getItem('uid')
		}
		var searchData = JSON.stringify(formValues);
		localStorage.setItem("searchData",searchData);

	}
	propertySubType(event){
	  if(event.target.checked){
		  this.state.propertySubType.push(event.target.getAttribute('value'));
	  }else{
		  for (var i = this.state.propertySubType.length - 1; i >= 0; i--) {
				if(this.state.propertySubType[i] === event.target.getAttribute('value')){
					this.state.propertySubType.splice(i,1)
				}
			}
	  }

	}

	handleBudget(event){
		this.setState({budget: event.target.value})
	}

	handleLocation(event){
		var location = this.refs.location.value;

		this.setState({
			location :location
		},()=>{
			if(this.state.location.length>=3)
			{
			axios({
			      method: 'get',
			      url: 'http://locationapi.iassureit.com/api/subareas/get/searchresults/' + this.state.location,
			    })				
				.then((searchResults) => {
					if(searchResults.data.length>0){
						var cities = searchResults.data.map(a=>a.cityName);
						cities = [...new Set(cities)];

						var areas = searchResults.data.map(a=>a.areaName);
						areas = [...new Set(areas)];

						var subareaName = searchResults.data.map(a=>a.subareaName);
						subareaName = [...new Set(subareaName)];

						for(let i=0; i<cities.length; i++) {
							for(let j=0; j<areas.length; j++) {
								areas[j] = areas[j] + ', ' + cities[i];
							}
						}

						for(let i=0; i<cities.length; i++) {
							for(let j=0; j<subareaName.length; j++) {
								subareaName[j] = subareaName[j] + ', ' + cities[i];
							}
						}

						var citiesAreas = cities.concat(areas);
						var citiesAreassubAreas = citiesAreas.concat(subareaName);


						this.setState({
							locSearchResults : citiesAreassubAreas,
						});					

					}
				})
		        .catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
											localStorage.removeItem("uid");
											localStorage.removeItem("token");
				                             this.props.history.push("/");
				                        }
				                });
			}
		})
		

	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
				<form onClick={this.searchResultbtn.bind(this)}>
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchProperty noPad mb10">
						{this.props.propertyType === "Commercial" ?
						<div>
							<div className="col-lg-2 col-md-2 col-xs-2 col-sm-2 noPad ">
							 	<div className="form-group noPad">
							  		<div className="col-lg-12 input-group noPad">
								  		<select className="form-control col-lg-12 noPad budgetOption" ref="transactionType" onChange={this.handleSearch.bind(this)}>
									    	<option value="Commercial-Sell"  className="">Buy</option>
									    	<option value="Commercial-Rent"  className="">Rent</option>
										</select>
									</div>
								</div>
							</div>
						
							<div className="col-lg-4 col-md-4 col-xs-2 col-sm-2 noPad locPlace">
								<input type="text" list="locationSearches" placeholder="Enter Location..." ref="location" value={this.state.location} className="col-lg-12 hSearch col-xs-12 noPad" onChange={this.handleLocation.bind(this)} />								
							</div>
						</div>
						:
						<div className="col-lg-6 col-md-6 col-xs-4 col-sm-4 noPad locPlace">
							<input type="text" list="locationSearches" placeholder="Enter Location..." ref="location" value={this.state.location} className="col-lg-12 hSearch col-xs-10" onChange={this.handleLocation.bind(this)} />
						</div>
						}

						<datalist id="locationSearches">
					    	{this.state.locSearchResults.length>0 ?
					    		this.state.locSearchResults.map( (result,index)=>{
						    		return(<option value={result} key={index} />)
					    		})
					    		: ""
					    	}								
						</datalist>

						<div className="col-lg-3 col-md-3 col-xs-4 col-sm-4 propertyType noPad property hidden-xs hidden-sm">
							  	<div className="dropdown" id="dropdown">
								    <button className="dropdown-toggle btn divWhite col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt39 noPad">
							      		{this.props.propertyType === "Commercial" ? 
										<div className="col-lg-12 noPad ">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertyList2.map((data,index)=>{
														return(
															<span className="col-lg-6 col-xs-12 noPad inputStyledbtn">
																<input type="checkbox" className="" value={data.name} id={data.name} key={index}  onChange={this.propertySubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</span>
														)
													})

												}
											</div>
										</div>
										:
										<div className="col-lg-12 noPad">
										  	<div className="col-lg-12">
												<h5>Residential</h5>
												{
													this.state.propertyList1.map((data,index)=>{
														return(
															<span key={index} className="col-lg-6 col-md-6 col-xs-12 col-sm-12 noPad inputStyledbtn">
																<input type="checkBox" value={data.name} id={data.name} onChange={this.propertySubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</span>
														)
													})

												}
											</div>
										</div>
										}
								    </ul>
								</div>
							</div>
							{/*resp*/}
							<div className="col-lg-3 col-md-3 col-xs-4 col-sm-4 propertyType1 noPad property hidden-lg hidden-md">
							  	<div className="dropdown" id="dropdown">
								    <button className="dropdown-toggle btn divWhite1 col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad  noPad">
								    	<div className="mt39 hidden-xs hidden-sm"></div>
							      		{this.props.propertyType === "Commercial" ? 
										<div className="col-lg-12 noPad ">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertyList2.map((data,index)=>{
														return(
															<span className="col-lg-6 col-xs-12 noPad inputStyledbtn">
																<input type="checkbox" className="" value={data.name} id={data.name} key={index}  onChange={this.propertySubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</span>
														)
													})

												}
											</div>
										</div>
										:
										<div className="col-lg-12 noPad">
										  	<div className="col-lg-12">
												<h5>Residential</h5>
												{
													this.state.propertyList1.map((data,index)=>{
														return(
															<span key={index} className="col-lg-6 col-md-6 col-xs-12 col-sm-12 noPad inputStyledbtn">
																<input type="checkBox" value={data.name} id={data.name} onChange={this.propertySubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</span>
														)
													})

												}
											</div>
										</div>
										}
								    </ul>
								</div>
							</div>
						{/*end*/}
						
							<div className="col-lg-2 col-md-2 col-xs-3 col-sm-3 noPad property hidden-xs hidden-sm">
							  	<div className="dropdown">
							  	 	<button className="btn dropdown-toggle divWhite col-lg-12 col-md-12 col-xs-12 col-sm-12" type="button" data-toggle="dropdown">Budget
								   		<span className="caret"></span>
								   	</button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad mt39 scrollable-menu">
									{this.props.transactionType === "Rent" || (this.props.propertyType === "Commercial" && this.state.transactionType === "Commercial-Rent")?
								     this.state.budgetList2.map((budget,index)=>{
							    		return(
												<span className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputStyledbtn" key={index}>
								    				<input type="radio" value={budget.value} ref="budget" id={budget.value} name="budget" className="selectOption" onClick={this.handleBudget.bind(this)}/>&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
								    				<span className="radioBoxBlock"></span>
								    			</span>
							    			);
							    		})
								     	:
									    this.state.budgetList1.map((budget,index)=>{
								    		return(
												<span  key={index} className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputStyledbtn">
								    				<input type="radio" value={budget.value} ref="budget" id={budget.value} name="budget" className="selectOption" onClick={this.handleBudget.bind(this)}/>&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
								    				<span className="radioBoxBlock"></span>
								    			</span>
								    			);
									    	})
								    	}
								    </ul>
								</div>
							</div>
							{/*resp*/}
							<div className="col-lg-2 col-md-2 col-xs-3 col-sm-3 noPad property hidden-lg hidden-md">
							  	<div className="dropdown">
							  	 	<button className="btn dropdown-toggle divWhite1 col-lg-12 col-md-12 col-xs-12 col-sm-12" type="button" data-toggle="dropdown">Budget
								   		<span className="caret"></span>
								   	</button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad mt39 scrollable-menu1">
									{this.props.transactionType === "Rent" || (this.props.propertyType === "Commercial" && this.state.transactionType === "Commercial-Rent")?
								     this.state.budgetList2.map((budget,index)=>{
							    		return(
												<span className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputStyledbtn" key={index}>
								    				<input type="radio" value={budget.value} ref="budget" id={budget.value} name="budget" className="selectOption" onClick={this.handleBudget.bind(this)}/>&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
								    				<span className="radioBoxBlock"></span>
								    			</span>
							    			);
							    		})
								     	:
									    this.state.budgetList1.map((budget,index)=>{
								    		return(
												<span  key={index} className="col-lg-12 col-md-12 col-xs-12 col-sm-12 inputStyledbtn">
								    				<input type="radio" value={budget.value} ref="budget" id={budget.value} name="budget" className="selectOption" onClick={this.handleBudget.bind(this)}/>&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
								    				<span className="radioBoxBlock"></span>
								    			</span>
								    			);
									    	})
								    	}
								    </ul>
								</div>
							</div>
							{/*end*/}

							<div className="col-lg-1 col-md-1 col-xs-1 col-sm-1 hidden-sm hidden-xs  noPad">
									<Link to={"/SearchResults"}>	
										<button className="btn sImg1 col-lg-9" onClick={this.searchResultbtn.bind(this)}>
											<img alt=""  src="/images/new/search.jpg" className="col-lg-12 col-md-12 col-xs-12 col-sm-6 tgkImg" />
										</button>
									</Link>
							</div>
						{/*resp*/}
						<div className="col-lg-1 col-md-1 col-xs-1 col-sm-1 hidden-lg hidden-md  noPad">
									<Link to={"/SearchResults"}>	
										<button className="btn sImg noPad" onClick={this.searchResultbtn.bind(this)}>
											<img alt=""  src="/images/new/search.jpg" className="col-lg-12 col-md-12 col-xs-12 col-sm-6 tgkImg" />
										</button>
									</Link>
							</div>
						{/*end*/}
						</div>
					</form>
				</div>
			);
		}
	}

export default withRouter(SearchProperty);
