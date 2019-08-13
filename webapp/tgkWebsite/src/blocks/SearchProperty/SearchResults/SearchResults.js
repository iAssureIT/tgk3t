import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter, Link} 		from 'react-router-dom';
import { connect } 				from 'react-redux';
import PropBox 					from './propBox.js';
import './SearchResults.css';

class SearchResults extends Component {

	constructor(){
		super();
		this.state = {
			budgetList              : [],
			budgetList1 			: [],
			budgetList2 			: [],
			propertyList1			: [],
			propertyList2			: [],
			inputData  				: "",
			propertyTransactionType	: "Commercial-Sell",
			budget          		: [],
			propertySubType 		: [],
			propertyType            : "",
			transactionType         : "",
			location        		: "",
			constructionType		: [],
			propertySubTypeList 	: [],
			floorList               : [],
			flatTypeList			: [],
			propertyAgeList         : [],
			MISCList                : [],
			floor 					: "",
			flatType                : [],
			furnish                	: "",
			propertyAge             : "",
			availability            : "",
			propertyTypeBoolean		: false,
			budgetBoolean			: false,
			checkPropValue			: false,
			propertyTransList		: [],
			locSearchResults		: "",
		}
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		var data = JSON.parse(localStorage.getItem('searchData'));
		console.log("data",data);
		if(data)
		{
			this.setState({
				location				: data.location,
				budget 					: data.budget,
				propertySubType			: data.propertySubType,
				propertyTransactionType	: data.propertyType+"-"+data.transactionType,
				propertyType            : data.propertyType,
				transactionType         : data.transactionType,
			},()=>{
				console.log("propertyTransactionType",this.state.propertyTransactionType);
					var propertySubType = [];
					if(data.propertyType === "Residential"){
						propertySubType = this.state.propertyList1;
					}else{
						propertySubType = this.state.propertyList2;
					}

					var propertySubTypeList = propertySubType.map((item,index)=>{
						var propPresent = this.state.propertySubType.find((obj)=>{
							return item.name === obj
						})
						var newObj = Object.assign({},item);
						if(propPresent){
							newObj.checked = true
						}else{
							newObj.checked = false
						}
						return newObj;
					})

					this.setState({
						propertySubTypeList : propertySubTypeList,
						propertyTypeBoolean : true,
					});

					var budget = [];
					if(data.transactionType === "Sell"){
						budget = this.state.budgetList1;
					}else{
						budget = this.state.budgetList2;
					}

					var budgetList = budget.map((item,index)=>{
						var budgetPresent = this.state.budget.find((obj)=>{
							return item.value === parseInt(obj)
						});
						var newObj = Object.assign({},item);
						if(budgetPresent){
							newObj.checked = true
						}else{
							newObj.checked = false
						}
						return newObj;
					})
					this.setState({budgetList:budgetList},()=>{
						this.setState({
							budgetBoolean : true
						})
					});
				})

			if(data.propertySubType && data.propertySubType.length > 0){
				this.setState({
					checkPropValue      : true
				})
			}
		}


  		axios
			.post("/api/search/properties/", data)
			.then((searchResults) => {
				console.log("searchResults =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	


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
				{value: 5000,  option: "Upto 5,000"},
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

			floorList : [
				{value: "-1", 	option: "Basement"	},
				{value:  "0", 	option: "Ground"	},
				{value: '1-5', 	option: "1-5"		},
				{value: '5-10', option: "5-10"		},
				{value: '>10',	option: "Higher floors"}
			],

			flatTypeList : [
				{value: 1, 	option: "1 BHK"	},
				{value: 2, 	option: "2 BHK"	},
				{value: 3, 	option: "3 BHK"	},
				{value: 4,  option: "4 BHK" },
				{value: 5,	option: "5 BHK"	}
			],

			propertyAgeList : [
				{value: "Under Construction",	option: "Under Construction"},
				{value: "New", 	option: "New"	},
				{value: "1-2", 	option: "1 - 2 Years"	},
				{value: "2-5", 	option: "2 - 5 Years"	},
				{value: "5-8",  option: "5 - 8 Years" },
				{value: ">8",	option: "> 8 Years"	},
			],

			MISCList : [
				{value: "Family", 			option: "Family"	},
				{value: "Company", 			option: "Company"	},
				{value: "Bachelors", 		option: "Bachelors"	},
				{value: " Pet Allowed",  	option: "Pet Allowed" },
				{value: "Non-Veg Allowed",	option: "Non-Veg Allowed"	}
			],

			propertyList1 : [
				{name:'MultiStory Apartment'},
				{name:'Residential House'},
				{name:'Studio Apartment'},
				{name:'Villa'},
				{name:'Penthouse'}
			],

			propertyList2 : [
				{name:'Office in IT Park/SEZ'},
				{name:'Commercial Office Space'},
				{name:'Commercial Showroom'},
				{name:'Commercial Shop'},
				{name:'Industrial Building'},
				{name:'Warehouse/Godown'}
			],
			propertyTransList : [
			]
			})


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
		event.preventDefault();
		$("#propertyDiv").toggle();
		$("#budget").hide();
	}

	handleSearch(event){
		const target = event.target.value;
		const name   = event.target.name;
		this.setState({
			[name]       		: target,
		},()=>{
		var propertyTransactionType 	= this.state.propertyTransactionType.split("-");
		this.setState({
			propertyType 	: propertyTransactionType[0],
			transactionType : propertyTransactionType[1],
		})

		})
	}

	handlePropTranType(event){
		console.log("selected value = ",event.target.value);
		var propertyTransactionType 	= event.target.value.split("-");
		console.log("propertyTransactionType",propertyTransactionType)
		this.setState({
			propertyType 			: propertyTransactionType[0],
			transactionType 		: propertyTransactionType[1],
			propertyTransactionType : event.target.value,
			propertyTypeBoolean 	:false,
			budgetBoolean			:false,
		},()=>{
			var formValues = JSON.parse(localStorage.getItem("searchData"));
			formValues.propertyType = this.state.propertyType;
			formValues.transactionType = this.state.transactionType;

			console.log("formValues",formValues);
			var searchData = JSON.stringify(formValues);

			localStorage.removeItem("searchData");
			localStorage.setItem("searchData",searchData);

		  	axios
				.post("/api/search/properties/", formValues)
				.then((searchResults) => {
					this.setState({ inputData : searchResults.data });
				})
		        .catch((error) =>{
		         	console.log("error = ", error);
		        });	

		})
	}

	handleLocation(event){


		console.log("selected value = ",event.target.value);
		this.setState({
			location : event.target.value
		},()=>{
			if(this.state.location.length>=3)
			{
				console.log("location",this.state.location);
			axios({
			      method: 'get',
			      url: 'http://locationapi.iassureit.com/api/subareas/get/searchresults/' + this.state.location,
			    })				
				.then((searchResults) => {
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
				})
		        .catch((error) =>{
		         	console.log("error = ", error);
		        });	
			}
		});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.location = event.target.value;
		console.log("formValues",formValues);
		var searchData = JSON.stringify(formValues);

		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);

	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleArea(){
		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.areaMin = this.refs.areaMin.value;
		formValues.areaMax = this.refs.areaMax.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);

	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data });
				this.refs.areaMin.value = "";
				this.refs.areaMax.value = "";
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleBudget(event){
		// var budget = [];
		this.state.budgetList.map((item,index)=>{
			if(item.value == parseInt(event.currentTarget.value)){	
				item.checked = true
			}else{
				item.checked = false				
			}
		})
		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.budget = event.currentTarget.value;
		console.log("formValues",formValues);
		var searchData = JSON.stringify(formValues);

		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);

	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleFurnish(event){
		this.setState({furnish : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.furnishedStatus = event.target.value;
		console.log("formValues",formValues);

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleAge(event){
		console.log("selected propertyAge = ",event.target.value);
		this.setState({propertyAge : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.propertyAge = event.target.value;
		console.log("formValues",formValues);

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleAvailability(event){
		console.log("selected Availability = ",event.target.value);
		this.setState({availability : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.availability = event.target.value;
		console.log("formValues",formValues);
		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleFloor(event){
		console.log("selected floor = ",event.target.value);
		this.setState({floor : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.floor = event.target.value;
		console.log("formValues",formValues);

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
		
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleBHK(event){
		if(event.target.checked){
			this.state.flatType.push(event.target.getAttribute('value'));
		}else{
			this.state.flatType.pop(event.target.getAttribute('value'));
		}

		this.setState({flatType : this.state.flatType},()=>{
			console.log("flatType",this.state.flatType);
		})

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.flatType = this.state.flatType;
		console.log("formValues",formValues);
		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}
	
	handleConstruction(){
		console.log("selected constriction = ",this.refs.constructionType.value);
		this.setState({constructionType : this.refs.constructionType.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.constructionType = this.refs.constructionType.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handlePropSubType(event){
		var checkedPropSubType=[];
		if(event.target.checked){
			checkedPropSubType = event.target.getAttribute('value');
			var propertySubTypeList=this.state.propertySubTypeList;
			for(let i=0; i <propertySubTypeList.length; i++){
				for (let j=0; j < checkedPropSubType.length; j++) {
					if(propertySubTypeList[i].name === checkedPropSubType){
						propertySubTypeList[i].checked = true;
					}
				}
			}
			this.setState({
				propertySubTypeList : propertySubTypeList,
			},()=>{
				console.log("propertySubTypeList=>",this.state.propertySubTypeList);
			});
		}else{
			checkedPropSubType = event.target.getAttribute('value');
			var propertySubTypeList=this.state.propertySubTypeList;
			for(let i=0; i <propertySubTypeList.length; i++){
				for (let j=0; j < checkedPropSubType.length; j++){
					if(propertySubTypeList[i].name === checkedPropSubType){
						propertySubTypeList[i].checked = false;
					}
				}
			}
			this.setState({
				propertySubTypeList : propertySubTypeList,
			},()=>{
			// 	const data = this.state.propertySubTypeList;
			// 	let found = data.find(element => element.checked === true);
			// 	console.log("found",found);
			// 	if(found && found.length > 0){
			// 		this.setState({
			// 			checkPropValue : true
			// 		})
			// 	}
			// 	else{
			// 		this.setState({
			// 			checkPropValue : false
			// 		})
			// 	}
			});
		}



		var formValues = JSON.parse(localStorage.getItem("searchData"));
		var propertySubType = [];
		for (var i = this.state.propertySubTypeList.length - 1; i >= 0; i--) {
			propertySubType[i] = this.state.propertySubTypeList[i].name;
		}
		formValues.propertySubType = propertySubType;
		console.log("formValues",formValues);
		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	

	}

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
				<form>
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchDiv">
						{/*---------------Search Bar-------------------*/}
						<div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 searchBar">
							<div className="col-lg-2 col-md-1 col-xs-12 col-sm-12 noPad">
							  	<div className="dropdown">
									<select className="custom-select form-control"  ref="propertyTransactionType" placeholder="" id='select' name="propertyTransactionType" value={this.state.propertyTransactionType} onChange={this.handlePropTranType.bind(this)}>
							    		<optgroup label="Residential">
											<option value="Residential-Sell">Buy</option>
											<option value="Residential-Rent">Rent</option>
										</optgroup>
											<optgroup label="Commercial">
											<option value="Commercial-Sell">Buy</option>
											<option value="Commercial-Rent">Rent</option>
										</optgroup>
									</select>
								</div>
							</div>
							<div className="col-lg-10 col-md-2 col-xs-12 col-sm-12 noPad">
								<div className="form-group"  id="" >
								    <div className="input-group inputBox-main " id="">
								    	<input type="text" className="form-control" list="locationSearches" ref="location" name="location" value={this.state.location} placeholder="Enter Location..." onChange={this.handleLocation.bind(this)}/>
										<datalist id="locationSearches">
									    	{this.state.locSearchResults.length>0 ?
									    		this.state.locSearchResults.map( (result,index)=>{
										    		return(<option value={result} key={index} />)
									    		})
									    		: ""
									    	}								
										</datalist>
								  		<div className="input-group-addon inputIcon">
					                     	<i className="fa fa-search"></i>
					                    </div>
								  	</div>
								</div>
							</div>
						</div>
						<div className="col-lg-8 col-md-12 col-xs-12 col-sm-12 searchDiv1">
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 property propertyType noPad">
							  	<div className="dropdown" id="dropdown">
						       		{this.state.checkPropValue === true ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      		{this.state.propertyType === "Commercial" && this.state.propertyTypeBoolean === true?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertySubTypeList.map((data,index)=>{
														return(
															<div className="col-lg-6 noPad inputStyledbtn" key={index}>
																<input type="checkbox" name ="propertySubType" ref="propertySubType" className="" value={data.name}  checked={data.checked} id={data.name} onChange={this.handlePropSubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</div>
														)
													})

												}
											</div>
										</div>
										:
							      		this.state.propertyType === "Residential" && this.state.propertyTypeBoolean === true?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Residential</h5>
												{
													this.state.propertySubTypeList.map((data,index)=>{
														return(
															<div className="col-lg-6 noPad inputStyledbtn" key={index}>
																<input type="checkbox" name ="propertySubType" ref="propertySubType" checked={data.checked} id={data.name} onChange={this.handlePropSubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</div>
														)
													})

												}
											</div>
										</div>
										:
										this.state.propertyType === "Commercial"?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertyList2.map((data,index)=>{
														return(
															<div className="col-lg-6 noPad inputStyledbtn" key={index}>
																<input type="checkbox" name ="propertySubType" ref="propertySubType" value={data.name} id={data.name} onChange={this.handlePropSubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</div>
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
															<div className="col-lg-6 noPad inputStyledbtn" key={index}>
																<input type="checkbox" name ="propertySubType" ref="propertySubType" value={data.name} id={data.name} onChange={this.handlePropSubType.bind(this)}/>&nbsp;<label htmlFor={data.name}>{data.name}</label>
																<span className="checkBoxBlock"></span>
															</div>
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
						       		<span className="badge badge-secondary badgeP"><i className="fa fa-check"></i></span> 
							  	 	<button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Budget
								   		<b className="caret pull-right"></b>
								   	</button>
								    <ul className="dropdown-menu scrollable-menu col-lg-12 pad mt36">
									{this.state.transactionType === "Sell" &&  this.state.budgetBoolean === true?
									    this.state.budgetList.map((budget,index)=>{
								    		return(
												<span key={index} className="col-lg-12 checkbg inputStyledbtn">
								    				<input type="radio" value={budget.value} id={budget.value} ref="budget" name="budget" className="selectOption" checked={budget.checked} onChange={this.handleBudget.bind(this)} />&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
													<span className="radioBoxBlock"></span>
								    			</span>
								    			);
									    	})
									    :
									    this.state.transactionType === "Rent" &&  this.state.budgetBoolean === true?
									    this.state.budgetList.map((budget,index)=>{
								    		return(
												<span className="col-lg-12 inputStyledbtn">
								    				<input type="radio" value={budget.value} id={budget.value} key={index} ref="budget" name="budget" className="selectOption" checked={budget.checked} onChange={this.handleBudget.bind(this)} />&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
													<span className="radioBoxBlock"></span>
								    			</span>
								    			);
								    		})
									    :
									    this.state.transactionType === "Sell" ?
									    this.state.budgetList1.map((budget,index)=>{
								    		return(
												<span key={index} className="col-lg-12 inputStyledbtn">
								    				<input type="radio" value={budget.value} id={budget.value} ref="budget" name="budget" className="selectOption" checked={budget.checked} onChange={this.handleBudget.bind(this)} />&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
													<span className="radioBoxBlock"></span>
								    			</span>
								    			);
								    		})
									    :
								      	this.state.budgetList2.map((budget,index)=>{
							    			return(
												<span className="col-lg-12 inputStyledbtn">
								    				<input type="radio" value={budget.value} id={budget.value} key={index} ref="budget" name="budget" className="selectOption" checked={budget.checked} onChange={this.handleBudget.bind(this)} />&nbsp; <label htmlFor={budget.value}>{budget.option}</label>
													<span className="radioBoxBlock"></span>
								    			</span>
							    				);
							    			})
								    	}
								    </ul>
								</div>
							</div>
							<div className="col-lg-1 col-md-2 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
						       		{this.state.flatType && this.state.flatType.length >0 ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12 pad" type="button" data-toggle="dropdown">BHK
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 pad mt36">
										<div className="col-md-12">
								    	{
							    			this.state.flatTypeList.map((flatType,index)=>{
								    			return(
													<span key={index} className="col-lg-12 noPad inputStyledbtn">
								    					<input type="checkbox" value={flatType.value}  className="selectOption" id={flatType.value} onChange={this.handleBHK.bind(this)}/>&nbsp; <label htmlFor={flatType.value}>{flatType.option}</label>
														<span className="checkBoxBlock"></span>
								    				</span>
								    			);
								    		})
								    	}
								    	</div>
								    </ul>
								</div>

							</div>
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
						       		{this.state.furnish ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Furnished
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 mt36">
										<span className="col-lg-12 inputStyledbtn">
											<input type="radio" name="furnishedStatus" ref="" className="" id="fullFurnished" value="Full furnished" onChange={this.handleFurnish.bind(this)}/>&nbsp; 
											<label htmlFor="fullFurnished">Full furnished<br /></label>
											<span className="radioBoxBlock"></span>
										</span>
										<span className="col-lg-12 inputStyledbtn">
											<input type="radio" name="furnishedStatus" ref="" className="" id="semiFurnished" value="Semi furnished" onChange={this.handleFurnish.bind(this)}/>&nbsp; 
											<label htmlFor="semiFurnished">Semi furnished<br /></label>
											<span className="radioBoxBlock"></span>
										</span>
										<span className="col-lg-12 inputStyledbtn">
											<input type="radio" name="furnishedStatus" ref="" className="" id="unfurnished" value="Unfurnished" onChange={this.handleFurnish.bind(this)}/>&nbsp; 
											<label htmlFor="unfurnished">Unfurnished<br /></label>
											<span className="radioBoxBlock"></span>
										</span>
								    </ul>
								</div>
							</div>
							<div className="col-lg-1 col-md-1 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
						       		{this.state.floor ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12 " type="button" data-toggle="dropdown">Floor
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 pad mt36">
								    	{
								    		this.state.floorList.map((floor,index)=>{
									    		return(
													<span className="col-lg-12 inputStyledbtn" key={index}>
										    			<input type="radio" value={floor.value} key={index} ref="floor" name="floor" id={floor.value} className="selectOption" onChange={this.handleFloor.bind(this)}/>&nbsp; <label htmlFor={floor.value}>{floor.option}</label>
														<span className="radioBoxBlock"></span>
													</span>
									    		);
									    	})
								    	}
								    </ul>
								</div>
							</div>
							<div className="col-lg-1 col-md-2 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
						       		{this.state.propertyAge ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Age
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36 pAge">
								    	{
								    		this.state.propertyAgeList.map((age,index)=>{
									    		return(
													<span className="col-lg-12 inputStyledbtn" key={index}>
									    				<input type="radio" value={age.value} id={age.value} ref="age" name="propertyAge" className="selectOption" onChange={this.handleAge.bind(this)}/> &nbsp; <label htmlFor={age.value}>{age.option}</label>
														<span className="radioBoxBlock"></span>
									    			</span>
									    		);
									    	})
								    	}
								    </ul>
								</div>
							</div>
							<div className="col-lg-1 col-md-1 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
						       		{this.state.MISC ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">MISC
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36 misc">
								    	{
								    		this.state.MISCList.map((misc,index)=>{
									    		return(
														<span key={index} className="col-lg-12 inputStyledbtn">
									    					<input type="radio" value={misc.value} ref="age" name="propertyAge" className="selectOption" /> &nbsp; {misc.option}
															<span className="radioBoxBlock"></span>
									    				</span>
									    			);
									    		})
								    	}
								    </ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
						       		{this.state.availability ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Availability
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 mt36">
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="Immediate" ref="" className="" value="0" onChange={this.handleAvailability.bind(this)}/>&nbsp; <label htmlFor="Immediate">Immediate</label><br /><span className="radioBoxBlock"></span></span>
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="twoWeeks" ref="" className="" value="14" onChange={this.handleAvailability.bind(this)} />&nbsp; <label htmlFor="twoWeeks">2 Weeks</label><br /><span className="radioBoxBlock"></span></span>
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="twoFourWeeks" ref="" className="" value="30" onChange={this.handleAvailability.bind(this)}/>&nbsp; <label htmlFor="twoFourWeeks">2-4 Weeks</label><br /><span className="radioBoxBlock"></span></span>
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="afterAMonth" ref="" className="" value="31" onChange={this.handleAvailability.bind(this)}/>&nbsp; <label htmlFor="afterAMonth">After a month</label><br /><span className="radioBoxBlock"></span></span>
								    </ul>
								</div>
							</div>
							{/*<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 areaBtn noPad property">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Area
								    <span className="caret pull-right"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" ref="areaMin" placeholder="Min" />
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" ref="areaMax" placeholder="Max" />
							      		<span className="col-lg-3 col-md-3 col-xs-12 col-sm-12 sqftMt">Sqft</span>
							      		<button type="button" className="col-lg-2 col-md-2 col-xs-12 col-sm-12 goBtn" onClick={this.handleArea.bind(this)} >Go</button>
								    </ul>
								</div>
							</div>

							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 constructionBtn noPad property">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Construction Status
								    <span className="caret pull-rightC"></span></button>
								    <ul className="dropdown-menu col-lg-10 col-md-12 col-xs-12 col-sm-12 pad mt36">
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox" value="Ready To Move" name="constructionType" ref="constructionType" onChange={this.handleConstruction.bind(this)}/> Ready To Move</div>
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox" value="Under Construction" name="constructionType" ref="constructionType" onChange={this.handleConstruction.bind(this)}/> Under Construction</div>
								    </ul>
								</div>
							</div>*/}
						</div>
					</div>
				</form>

			{/*-------------------Results------------------------*/}
				
				<div className="col-lg-12 col-md-10 col-xs-12 col-sm-12 noPad">
				{
					this.state.inputData.length>0 ? 
						this.state.inputData.map( (property,index)=>{ 
							return(	<div className={"x-"+index} key={index}> <PropBox myProperty={property}/> </div>  );
						})
					:
					<div className="boxmsg col-lg-8 col-lg-offset-2">
						<p> 
							Properties for this search options could not be found. <br/> 
							Please change the search filters and try again. 
						</p>
					</div>
				}
				</div>
			</div>
		);
	}
}

export default withRouter(SearchResults);