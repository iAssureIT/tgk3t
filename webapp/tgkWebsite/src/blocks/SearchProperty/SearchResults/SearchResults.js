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
			budgetList1 			: [],
			budgetList2 			: [],
			inputData  				: "",
			propertyTransactionType	: "Commercial-Sell",
			budget          		: "",
			propertySubType 		: [],
			propertyType            : "",
			transactionType         : "",
			location        		: "",
			constructionType		: [],
			all 					: [],
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
				propertytype            : data.propertyType,
				transactionType         : data.transactionType,
			},()=>{
					var propertySubType = [];
					if(data.propertyType === "Residential")
					{
						propertySubType = [{name:'MultiStory Apartment'},{name:'Residential House'},{name:'Studio Apartment'},{name:'Villa / Bunglow'},{name:'Penthouse'}];
					}
					else{
						propertySubType = [{name:'Office in IT Park/SEZ'},{name:'Commercial Office Space'},{name:'Commercial Showroom'},{name:'Commercial Shop'},{name:'Industrial Building'},{name:'Warehouse/Godown'}];
					}
					console.log("propertySubType",propertySubType);
					var all = propertySubType.map((item,index)=>{
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
					this.setState({all:all});
			})
		}
					

		var formValues = {
			startRange:0,
			limitRange:6,
		}

		//  axios
  //       .post('/api/properties/listofproperty/Residential/Sell')
  //       .then( (res) =>{
  //         this.setState({
  //         	inputData : res.data,
  //         },()=>{
  //         	console.log("inputData",this.state.inputData);
  //         })

  //       })
  //       .catch((error) =>{
  //         console.log("error = ", error);
  //       });	

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
			[name]       : target
		},()=>{
			console.log("name",name);
			console.log("target",target);

		var propertyTransactionType 	= this.state.propertyTransactionType.split("-");
		console.log("propertyTransactionType",propertyTransactionType)
		this.setState({
			propertyType 	: propertyTransactionType[0],
			transactionType : propertyTransactionType[1],
		})

		console.log("state.propertySubType",this.state.propertySubType);
		console.log("ref.propertySubType",this.refs.propertySubType.value);

		// if(event.target.checked)
		// {
		// 	this.state.propertySubType.push(event.target.getAttribute('value'));
		// 	// this.state.constructionType.push(event.target.getAttribute('value'));
		// }
		// else{
		// 	this.state.propertySubType.pop(event.target.getAttribute('value'));
		// 	// this.state.constructionType.pop(event.target.getAttribute('value'));
		// }

		var formValues = {
				transactionType : propertyTransactionType[1],
				propertyType   	: propertyTransactionType[0],
				floor           : this.refs.floor.value,
				areaMin			: this.refs.areaMin.value,
				areaMax 		: this.refs.areaMax.value,
				budget          : this.state.budget,
				propertySubType : this.state.propertySubType,
				constructionType: this.refs.constructionType.value,
			}
		console.log("formValues",formValues);

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

	handleBudget(){

		console.log("selected Budget = ",this.refs.budget.value);
		this.setState({budget : this.refs.budget.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.budget = this.refs.budget.value;

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

	handleFloor(){
		console.log("selected floor = ",this.refs.floor.value);
		this.setState({floor : this.refs.budget.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.floor = this.refs.floor.value;

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

	handlePropSubType(){

		console.log("selected constriction = ",this.refs.propertySubType.value);
		this.setState({propertySubType : this.refs.propertySubType.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.propertySubType = this.refs.propertySubType.value;

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
		console.log("all",this.state.all)
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
							
							<div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 property propertyType noPad">
							  	<div className="dropdown" id="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      		{this.state.propertyType === "Commercial" ?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.all.map((data,index)=>{
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
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Residential</h5>
												{
													this.state.all.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad"><input type="checkbox" name ="propertySubType" ref="propertySubType" value={data.name} key={index} checked={data.checked} onChange={this.handlePropSubType.bind(this)}/>&nbsp;{data.name}</span>
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
							    {this.state.transactionType === "sell" ?
									<select className="custom-select form-control btn"  ref="budget" value={this.state.budget} name="budget" placeholder="" onChange={this.handleBudget.bind(this)}>
									   	<option value="" className="hidden">Budget</option>
							    			{this.state.budgetList1.map((budget,index)=>{
									    		return(
									    				<option value={budget.value} key={index} className="selectOption">{budget.option}</option>
									    			);
									    		})
							    			}
									</select>
									:
									<select className="custom-select form-control btn"  ref="budget" name="budget" value={this.state.budget} placeholder="" onChange={this.handleBudget.bind(this)}>
										<option value="" className="hidden">Budget</option>
										{this.state.budgetList2.map((budget,index)=>{
									    		return(
									    				<option value={budget.value} key={index} className="selectOption">{budget.option}</option>
									    			);
									    		})
										}
									</select>
								}	
								</div>
							</div>
						
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad property">
							  	<div className="dropdown">
									<select className="custom-select form-control floorOption btn" ref="floor" name="floor" value={this.state.floor}  id='' onChange={this.handleFloor.bind(this)}>
									  	
									  	<option value="" className="hidden">Floor </option>
									</select>
								</div>

								   {/* <span className="caret caretMl"></span>
*/}
							</div>

							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 areaBtn noPad property">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Area
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" ref="areaMin" placeholder="Min" />
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" ref="areaMax" placeholder="Max" />
							      		<span className="col-lg-3 col-md-3 col-xs-12 col-sm-12 sqftMt">Sqft</span>
							      		<button type="button" className="col-lg-2 col-md-2 col-xs-12 col-sm-12 goBtn" onClick={this.handleArea.bind(this)} >Go</button>
								    </ul>
								</div>
							</div>

							<div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 constructionBtn noPad property">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Construction Status
								    <span className="caret caretMlC"></span></button>
								    <ul className="dropdown-menu col-lg-10 col-md-12 col-xs-12 col-sm-12 pad mt36">
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox" value="Ready To Move" name="constructionType" ref="constructionType" onChange={this.handleConstruction.bind(this)}/> Ready To Move</div>
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox" value="Under Construction" name="constructionType" ref="constructionType" onChange={this.handleConstruction.bind(this)}/> Under Construction</div>
								    </ul>
								</div>
							</div>
							
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
