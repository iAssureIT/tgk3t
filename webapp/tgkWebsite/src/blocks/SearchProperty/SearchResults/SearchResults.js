import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter, Link} 		from 'react-router-dom';
import { connect } 				from 'react-redux';
import PropBox from './propBox.js';
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
			propertyTransList		: [],
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
				propertyTypeBoolean		: true,
			},()=>{
					var propertySubType = [];
					if(data.propertyType === "Residential")
					{
						propertySubType = this.state.propertyList1;
					}
					else{
						propertySubType = this.state.propertyList2;
					}
					console.log("propertySubType",propertySubType);
					var propertySubTypeList = propertySubType.map((item,index)=>{
					var propPresent = this.state.propertySubType.find((obj)=>{
						return item.name === obj
					})
					var newObj = Object.assign({},item);
					console.log("propPresent",propPresent);
					if(propPresent){
						newObj.checked = true
					}else{
						newObj.checked = false
					}
					return newObj;
				})
				this.setState({propertySubTypeList:propertySubTypeList});
			})
		}


  		axios
			.post("http://localhost:50012/api/search/properties/", data)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
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

			floorList : [
				{value: "-1", 	option: "Basement"	},
				{value:  "0", 	option: "Ground"	},
				{value: '1-5', 	option: "1-5"		},
				{value: '5-10', option: "5-10"		},
				{value: '<10',	option: "Higher floors"}
			],

			flatTypeList : [
				{value: 1, 	option: "1 BHK"	},
				{value: 2, 	option: "2 BHK"	},
				{value: 3, 	option: "3 BHK"	},
				{value: 4,  option: "4 BHK" },
				{value: 5,	option: "5 BHK"	}
			],

			propertyAgeList : [
				{value: "New", 	option: "New"	},
				{value: "1-2", 	option: "1 - 2 Years"	},
				{value: "2-5", 	option: "2 - 5 Years"	},
				{value: "5-8",  option: "5 - 8 BHK" },
				{value: "<8",	option: "< 8 Years"	}
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
			],
			propertyTransList : [
			]
			})

		



		var $select = $(".floorOption");
		$select.append($('<option></option>').val(-1).html("Basement"));
		$select.append($('<option></option>').val(0).html("Ground"));

	    for (var i=1;i<=60;i++){
	        $select.append($('<option></option>').val(i).html(i))
	    }
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
			propertyTypeBoolean	: false,
		},()=>{
			console.log("name",name);
			console.log("target",target);

		var propertyTransactionType 	= this.state.propertyTransactionType.split("-");
		console.log("propertyTransactionType",propertyTransactionType)
		this.setState({
			propertyType 	: propertyTransactionType[0],
			transactionType : propertyTransactionType[1],
		})

		})
	}


	handleArea(){
		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.areaMin = this.refs.areaMin.value;
		formValues.areaMax = this.refs.areaMax.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);

	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
				this.refs.areaMin.value = "";
				this.refs.areaMax.value = "";
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleBudget(event){
		console.log("selected Budget = ",event.target.value);
		this.setState({budget : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.budget = event.target.value;

		var searchData = JSON.stringify(formValues);

		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);

	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleFurnish(event){
		console.log("selected furnish = ",event.target.value);
		this.setState({furnish : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.floor = event.target.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
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
		formValues.floor = event.target.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
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
		formValues.floor = event.target.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
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

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handleBHK(event){
		var flatType=[];
		if(event.target.checked)
		{
			flatType.push(event.target.getAttribute('value'));
			console.log("flatType",flatType);
		}
		else{
			flatType.pop(event.target.getAttribute('value'));
			console.log("flatType",flatType);
		}
		this.setState({flatType : flatType})

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.floor = this.state.flatType;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
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
			.post("http://localhost:50012/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}

	handlePropSubType1(event){
		event.preventDefault();
		const checkedPropSubType=[]
		if(event.target.checked)
		{
			this.state.propertySubType.push(event.target.getAttribute('value'));
			console.log("propertySubType push",this.state.propertySubType);
		}
		else{
			this.state.propertySubType.pop(event.target.getAttribute('value'));
			console.log("propertySubType pop",this.state.propertySubType);
		}
		var propertySubTypeList=this.state.propertySubTypeList;
		for(let i=0; i <this.state.propertySubTypeList.length; i++){
			for (let j=0; j < this.state.propertySubType.length; j++) {
				if(this.state.propertySubTypeList[i].name === this.state.propertySubType[j]){
					propertySubTypeList[i].checked = true;
				}else{
					propertySubTypeList[i].checked = false;
				}
				this.setState({
					propertySubTypeList : propertySubTypeList,
				});
			}
		
		}
	}

	handlePropSubType(event){
		if(event.target.checked)
		{
			this.state.propertySubType.push(event.target.getAttribute('value'));
			console.log("propertySubType push",this.state.propertySubType);
		}
		else{
			for (var i = this.state.propertySubType.length - 1; i >= 0; i--) {
				if(this.state.propertySubType[i] === event.target.getAttribute('value')){
					this.state.propertySubType.splice(i,1)
				}
			}
		}
		console.log("this.state.propertySubType",this.state.propertySubType);
		var propertySubType = [];
			if(this.state.propertyType === "Residential"){
				propertySubType = [{name:'MultiStory Apartment'},{name:'Residential House'},{name:'Studio Apartment'},{name:'Villa / Bunglow'},{name:'Penthouse'}];
			}else{
				propertySubType = [{name:'Office in IT Park/SEZ'},{name:'Commercial Office Space'},{name:'Commercial Showroom'},{name:'Commercial Shop'},{name:'Industrial Building'},{name:'Warehouse/Godown'}];
			}
			console.log("propertySubType",propertySubType);
			var propertySubTypeList = propertySubType.map((item,index)=>{
			var propPresent = this.state.propertySubType.find((obj)=>{
				return item.name === obj
			})
			var newObj = Object.assign({},item);
			console.log("propPresent",propPresent);
			if(propPresent){
				newObj.checked = true
			}else{
				newObj.checked = false
			}
			return newObj;
		})
		this.setState({propertySubTypeList:propertySubTypeList});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.floor = this.state.all;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		console.log("here searchData",searchData);
	  	axios
			.post("http://localhost:50012/api/search/properties/", formValues)
			.then((searchResults) => {
				console.log("here result =",searchResults.data);
				this.setState({ inputData : searchResults.data });
			})
	        .catch((error) =>{
	         	console.log("error = ", error);
	        });	
	}


	render() {
		console.log("propertyTypeBoolean",this.state.propertyTypeBoolean);
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
				<form>
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchDiv">
						{/*---------------Search Bar-------------------*/}
						<div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 searchBar">
							<div className="col-lg-2 col-md-1 col-xs-12 col-sm-12 noPad">
							  	<div className="dropdown">
									<select className="custom-select form-control"  ref="propertyTransactionType" placeholder="" id='select' name="propertyTransactionType" value={this.state.propertyTransactionType} onChange={this.handleSearch.bind(this)}>
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
								    	<input type="text" className="form-control" ref="location" name="location" value={this.state.location} placeholder="Enter Location..." onChange={this.handleSearch.bind(this)}/>
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
						       		<span className="badge badge-secondary badgeP"><i className="fa fa-check"></i></span>
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      		{this.state.propertyType === "Commercial" && this.state.propertyTypeBoolean === true?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertySubTypeList.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad">
																<input type="checkbox" name ="propertySubType"ref="propertySubType" className="" value={data.name} key={index} checked={data.checked} onChange={this.handlePropSubType.bind(this)}/>&nbsp;{data.name}
															</span>
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
															<span className="col-lg-6 noPad"><input type="checkbox" name ="propertySubType" ref="propertySubType" value={data.name} key={index} checked={data.checked} onChange={this.handlePropSubType.bind(this)}/>&nbsp;{data.name}</span>
														)
													})

												}
											</div>
										</div>
										:
										this.state.propertyType === "Commercial" && this.state.propertyTypeBoolean === false?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.propertyList2.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad"><input type="checkbox" name ="propertySubType" ref="propertySubType" value={data.name} key={index}  onChange={this.handlePropSubType.bind(this)}/>&nbsp;{data.name}</span>
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
															<span className="col-lg-6 noPad"><input type="checkbox" name ="propertySubType" ref="propertySubType" value={data.name} key={index}  onChange={this.handlePropSubType.bind(this)}/>&nbsp;{data.name}</span>
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
								   		<span className="caret"></span>
								   	</button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
									{this.state.transactionType === "sell" ?
									    this.state.budgetList1.map((budget,index)=>{
								    		return(
												<span className="col-lg-12">
								    				<input type="radio" value={budget.value} key={index} ref="budget" name="budget" className="selectOption" onChange={this.handleBudget.bind(this)} />&nbsp; {budget.option}
								    			</span>
								    			);
									    	})
									    :
									    this.state.budgetList2.map((budget,index)=>{
								    		return(
													<span className="col-lg-12">
									    				<input type="radio" value={budget.value} key={index} ref="budget" name="budget" className="selectOption" onChange={this.handleBudget.bind(this)} />&nbsp; {budget.option}
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
									<button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">BHK
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
								    	{
								    		this.state.flatTypeList.map((flatType,index)=>{
									    		return(
														<span className="col-lg-12">
									    					<input type="checkbox" value={flatType.value} key={index} className="selectOption" onChange={this.handleBHK.bind(this)}/>&nbsp; {flatType.option}
									    				</span>
									    			);
									    		})
								    	}
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
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 mt36">
										<span className="col-lg-12"><input type="radio" name="furnishedStatus" ref="" className="" value="Full furnished" onChange={this.handleFurnish.bind(this)}/>&nbsp; Full furnished<br /></span>
										<span className="col-lg-12"><input type="radio" name="furnishedStatus" ref="" className="" value="Semi furnished" onChange={this.handleFurnish.bind(this)}/>&nbsp; Semi furnished<br /></span>
										<span className="col-lg-12"><input type="radio" name="furnishedStatus" ref="" className="" value="Unfurnished" onChange={this.handleFurnish.bind(this)}/>&nbsp; Unfurnished<br /></span>
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
									<button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Floor
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
								    	{
								    		this.state.floorList.map((floor,index)=>{
									    		return(
													<span className="col-lg-12">
										    			<input type="radio" value={floor.value} key={index} ref="floor" name="floor" className="selectOption" onChange={this.handleFloor.bind(this)}/>&nbsp;{floor.option}
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
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
								    	{
								    		this.state.propertyAgeList.map((age,index)=>{
									    		return(
													<span className="col-lg-12">
									    					<input type="radio" value={age.value} key={index} ref="age" name="propertyAge" className="selectOption" onChange={this.handleAge.bind(this)}/> &nbsp; {age.option}
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
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
								    	{
								    		this.state.MISCList.map((misc,index)=>{
									    		return(
														<span className="col-lg-12">
									    					<input type="radio" value={misc.value} key={index} ref="age" name="propertyAge" className="selectOption" /> &nbsp; {misc.option}
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
								    <span className="caret"></span></button>
								    <ul className="dropdown-menu col-lg-12 mt36">
										<span className="col-lg-12"><input type="radio" name="availability" ref="" className="" value="Immediate" onChange={this.handleAvailability.bind(this)}/>&nbsp; Immediate<br /></span>
										<span className="col-lg-12"><input type="radio" name="availability" ref="" className="" value="2 Weeks" onChange={this.handleAvailability.bind(this)} />&nbsp; 2 Weeks<br /></span>
										<span className="col-lg-12"><input type="radio" name="availability" ref="" className="" value="2-4 Weeks" onChange={this.handleAvailability.bind(this)}/>&nbsp; 2-4 Weeks<br /></span>
										<span className="col-lg-12"><input type="radio" name="availability" ref="" className="" value="After a month" onChange={this.handleAvailability.bind(this)}/>&nbsp; After a month<br /></span>
								    </ul>
								</div>
							</div>
							{/*<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 areaBtn noPad property">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Area
								    <span className="caret"></span></button>
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
								    <span className="caretC"></span></button>
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
				
					<div className="col-lg-12  col-md-10 col-xs-12 col-sm-12 noPad">
				{
					this.state.inputData.length>0 
						? 
							this.state.inputData.map( (property,index)=>{ 
								return(	<div className={"x-"+index} key={index}> <PropBox myProperty={property}/> </div>  );
							})
						:
							<div className="boxmsg col-lg-8 col-lg-offset-2"><p> 
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