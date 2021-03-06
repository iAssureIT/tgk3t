import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter, Link} 		from 'react-router-dom';
import { connect } 				from 'react-redux';
import PropBox 					from './propBox.js';
import Loader 					from 'react-loader-spinner'
import swal                     from 'sweetalert';
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
			propertyTransactionType	: "Residential-Sell",
			budget          		: "",
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
			checkPropValue			: false,
			checkBudgetValue		: false,
			isLoading				: true,
			propertyTransList		: [],
			locSearchResults		: "",
		}
	}

	componentDidMount() {

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

		window.scrollTo(0, 0);
		var data = JSON.parse(localStorage.getItem('searchData'));
		console.log("data",data);
		if(data)
		{
			this.setState({
				location				: data.location,
				budget 					: parseInt(data.budget),
				propertySubType			: data.propertySubType,
				propertyTransactionType	: data.propertyType+"-"+data.transactionType,
				propertyType            : data.propertyType,
				transactionType         : data.transactionType,
			},()=>{
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
						console.log("here propPresent ",propPresent);
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
					},()=>{
						console.log("here propertySubTypeList in didmount",this.state.propertySubTypeList);

					});

					var budgetL = [];
					if(data.transactionType === "Sell"){
						budgetL = this.state.budgetList1;
					}else{
						budgetL = this.state.budgetList2;
					}

					for(var i=0; i<budgetL.length; i++){
						if(budgetL[i].value === this.state.budget){
							budgetL[i].checked = true;
						}else{
							budgetL[i].checked = false;
						}
					}
					if(i >= budgetL.length){
						// console.log("budgetList = ",budgetL);
						this.setState({budgetList:budgetL});
					}
				})

			if(data.propertySubType && data.propertySubType.length > 0){
				this.setState({
					checkPropValue      : true,
				})
			}
			if(data.budget && data.budget.length > 0 && data.budget!==""){
				this.setState({
					checkBudgetValue    : true,
				})
			}
		}


  		axios
			.post("/api/search/properties/", data)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data, isLoading:false });
				console.log("searchResults",searchResults)
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


		this.setState({
			budgetList1 : [
				{value: 1000000, option: "Upto 10 Lac", checked:false},
				{value: 2000000, option: "Upto 20 Lac", checked:false},
				{value: 3000000, option: "Upto 30 Lac", checked:false},
				{value: 4000000, option: "Upto 40 Lac", checked:false},
				{value: 5000000, option: "Upto 50 Lac", checked:false},
				{value: 6000000, option: "Upto 60 Lac", checked:false},
				{value: 7000000, option: "Upto 70 Lac", checked:false},
				{value: 8000000, option: "Upto 80 Lac",checked:false},
				{value: 9000000, option: "Upto 90 Lac",checked:false},
				{value: 10000000, option: "Upto 1 Cr",checked:false},
				{value: 20000000, option: "Upto 2 Cr",checked:false},
				{value: 30000000, option: "Upto 3 Cr",checked:false},
				{value: 50000000, option: "Upto 5 Cr",checked:false},
				{value: 100000000, option: "Upto 10 Cr",checked:false},
			],

			budgetList2 : [
				{value: 5000,  option: "Upto 5,000",checked:false},
				{value: 10000, option: "Upto 10,000",checked:false},
				{value: 15000, option: "Upto 15,000",checked:false},
				{value: 20000, option: "Upto 20,000",checked:false},
				{value: 25000, option: "Upto 25,000",checked:false},
				{value: 30000, option: "Upto 30,000",checked:false},
				{value: 40000, option: "Upto 40,000",checked:false},
				{value: 50000, option: "Upto 50,000",checked:false},
				{value: 60000, option: "Upto 60,000",checked:false},
				{value: 70000, option: "Upto 70,000",checked:false},
				{value: 80000, option: "Upto 80,000",checked:false},
				{value: 90000, option: "Upto 90,000",checked:false},
				{value: 100000, option: "Upto 1 Lac",checked:false},
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
				{value: "New", 	option: "Newly Built"	},
				{value: "<4", 	option: "Less than 4 Years"	},
				{value: "4-8", 	option: "4 - 8 Years"	},
				{value: "8-12",  option: "8 - 12 Years" },
				{value: ">12",	option: "Above 12 Years"	},
			],

			MISCList : [
				{value: "Family", 			option: "Family"	},
				{value: "Company", 			option: "Company"	},
				{value: "Bachelors", 		option: "Bachelors"	},
				{value: " Pet Allowed",  	option: "Pet Allowed" },
				{value: "Non-Veg Allowed",	option: "Non-Veg Allowed"	}
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
			propertyTransList : [
			]
			})
		
		 

		 var S1 =window.screen.width
		 console.log("s1==========",S1)

		 if(S1>400){
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
		 
	}

	propertyType(event){
		event.preventDefault();
		$("#propertyDiv").toggle();
		$("#budget").hide();
	}

	handlePropTranType(event){
		var propertyTransactionType 	= event.target.value.split("-");
		this.setState({
			propertyType 			: propertyTransactionType[0],
			transactionType 		: propertyTransactionType[1],
			propertyTransactionType : event.target.value,
			propertyTypeBoolean 	:false,
			budgetBoolean			:false,
			isLoading				:true
		},()=>{
			var formValues = JSON.parse(localStorage.getItem("searchData"));
			var propertySubType = [];
			if(this.state.propertyType === "Residential"){
					propertySubType = this.state.propertyList1;
			}else{
					propertySubType = this.state.propertyList2;
			}

			this.setState({
				propertySubTypeList : propertySubType
			},()=>{
				var propertySubType = [];
				for (var i = this.state.propertySubTypeList.length - 1; i >= 0; i--) {
					if(this.state.propertySubTypeList[i].checked === true){
						var pSubType = this.state.propertySubTypeList[i].name;
						if(pSubType){
							propertySubType.push(pSubType);
						}
					}
				}
				formValues.propertySubType = propertySubType;
				var found = this.state.propertySubTypeList.find((element)=>{return element.checked === true}); 
				if(found && found.checked === true){
					this.setState({checkPropValue:true})
				}else{
					this.setState({checkPropValue:false})
				}
			})

			var budget = [];
			if(this.state.transactionType === "Sell"){
				budget = this.state.budgetList1;
			}else{
				budget = this.state.budgetList2;
			}

			this.setState({
				budgetList : budget,
			},()=>{
				var budgetList = "";
				for (var i = this.state.budgetList.length - 1; i >= 0; i--) {
					if(this.state.budgetList[i].checked === true){
						var budgetValue = this.state.budgetList[i].name;
						if(budgetValue){
							budgetList.push(budgetValue);
						}
					}
				}
				formValues.budget = budgetList;
				var found = this.state.budgetList.find((element)=>{return element.checked === true}); 
				if(found && found.checked === true){
					this.setState({checkBudgetValue:true})
				}else{
					this.setState({checkBudgetValue:false})
				}
			})

			var formValues = JSON.parse(localStorage.getItem("searchData"));	
			formValues.propertyType    = this.state.propertyType;
			formValues.transactionType = this.state.transactionType;

			var searchData = JSON.stringify(formValues);

			localStorage.removeItem("searchData");
			localStorage.setItem("searchData",searchData);
			console.log("formValues",formValues);
		  	axios
				.post("/api/search/properties/", formValues)
				.then((searchResults) => {
					console.log("searchResults",searchResults);
					this.setState({ inputData : searchResults.data, isLoading:false });
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
		})
	}

	handleLocation(event){
		this.setState({
			location : event.target.value,
			isLoading: true,
		},()=>{
			if(this.state.location.length>=3)
			{
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
		});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.location = event.target.value;
		var searchData = JSON.stringify(formValues);

		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);

	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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


	handleBudget(event){
		// var budget = [];
		this.setState({isLoading:true});
		this.state.budgetList.map((item,index)=>{
			if(item.value == parseInt(event.currentTarget.value)){	
				item.checked = true
			}else{
				item.checked = false				
			}
		})
		var found = this.state.budgetList.find((element)=>{return element.checked === true}); 
		if(found && found.checked === true){
			this.setState({checkBudgetValue:true})
		}else{
			this.setState({checkBudgetValue:false})
		}

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.budget = event.currentTarget.value;
		console.log("formValues",formValues);
		var searchData = JSON.stringify(formValues);

		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);

	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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

	handleFurnish(event){
		this.setState({isLoading:true});
		this.setState({furnish : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.furnishedStatus = event.target.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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

	handleAge(event){
		this.setState({isLoading:true});
		this.setState({propertyAge : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.propertyAge = event.target.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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

	handleAvailability(event){
		this.setState({isLoading:true});
		this.setState({availability : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.availability = event.target.value;
		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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

	handleFloor(event){
		this.setState({isLoading:true});
		this.setState({floor : event.target.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.floor = event.target.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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

	handleBHK(event){
		this.setState({isLoading:true});
		if(event.target.checked){
			this.state.flatType.push(event.target.getAttribute('value'));
		}else{
			for (var i = this.state.flatType.length - 1; i >= 0; i--) {
				if(this.state.flatType[i] === event.target.getAttribute('value')){
					this.state.flatType.splice(i,1)
				}
			}
		}

		this.setState({flatType : this.state.flatType})

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.flatType = this.state.flatType;
		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
				console.log("result",searchResults.data);
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
	
	handleConstruction(){
		this.setState({isLoading:true});
		this.setState({constructionType : this.refs.constructionType.value});

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		formValues.constructionType = this.refs.constructionType.value;

		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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

	handlePropSubType(event){
		this.setState({isLoading:true});
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
				console.log("here propertySubTypeList in function check ", this.state.propertySubTypeList);
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
				console.log("here propertySubTypeList in function uncheck ", this.state.propertySubTypeList);

			});
		}

		var found = this.state.propertySubTypeList.find((element)=>{return element.checked === true}); 
		if(found && found.checked === true){
			this.setState({checkPropValue:true})
		}else{
			this.setState({checkPropValue:false})
		}


		var formValues = JSON.parse(localStorage.getItem("searchData"));
		var propertySubType = [];
		for (var i = this.state.propertySubTypeList.length - 1; i >= 0; i--) {
			if(this.state.propertySubTypeList[i].checked === true){
				var pSubType = this.state.propertySubTypeList[i].name;
				if(pSubType){
					propertySubType.push(pSubType);
				}
			}
		}
		formValues.propertySubType = propertySubType;
		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
	  	axios
			.post("/api/search/properties/", formValues)
			.then((searchResults) => {
				this.setState({ inputData : searchResults.data,isLoading:false });
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

	reset(event){
		event.preventDefault();
		this.setState({
			inputData  				: "",
			propertyTransactionType	: "Residential-Sell",
			budget          		: [],
			propertySubType 		: [],
			propertyType            : "",
			transactionType         : "",
			constructionType		: [],
			floor 					: "",
			flatType                : [],
			furnish                	: "",
			propertyAge             : "",
			availability            : "",
			checkPropValue			: false,
			checkBudgetValue		: false,
			propertyTransList		: [],
			locSearchResults		: "", 
			isLoading				:false  
		})
		var propertySubType = [];
		this.state.propertySubTypeList.map((item,index)=>{
			item.checked = false;
			propertySubType.push(item);
		})
		this.setState({propertySubTypeList:propertySubType});

		var budget = [];
		this.state.budgetList.map((item,index)=>{
			item.checked = false;
			budget.push(item);
		})
		this.setState({budgetList:budget});

  		$("input[type='checkbox']:checked").prop("checked", false);
  		$("input[type='radio']:checked").prop("checked", false);

		var formValues = JSON.parse(localStorage.getItem("searchData"));
		console.log("formValues",formValues);
  		formValues.propertyType = "Residential";
  		formValues.transactionType = "Sell";
  		formValues.availability = "";
  		formValues.flatType = [];
  		formValues.floor = "";
  		formValues.furnishedStatus = "";
  		formValues.propertySubType = [];
  		formValues.budget = [];


		var searchData = JSON.stringify(formValues);
		localStorage.removeItem("searchData");
		localStorage.setItem("searchData",searchData);
		axios
		.post("/api/search/properties/", formValues)
		.then((searchResults) => {
			this.setState({ inputData : searchResults.data,isLoading:false });
			console.log("searchResults",searchResults)
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

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
				<form>
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchDiv">
						{/*---------------Search Bar-------------------*/}
						<div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 searchBar">
							<div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 noPad">
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
							<div className="col-lg-9 col-md-9 col-xs-12 col-sm-12 noPad">
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
								  		<div className="input-group-addon searchIcon" onChange={this.handleLocation.bind(this)}>
					                     	<i className="fa fa-search"></i>
					                    </div>
								  	</div>
								</div>
							</div>
						</div>
						<div className="col-lg-8 col-md-12 col-xs-12 col-sm-12 searchDiv1">
							<div className="col-lg-2 col-md-2 col-xs-6 col-sm-6 property propertyType noPad hidden-xs hidden-sm">
							  	<div className="dropdown" id="dropdown">
						       		{this.state.checkPropValue === true ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
								    <button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12" type="button" data-toggle="dropdown">Property Type
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      	{
										<div className="col-lg-12 noPad">
										  	<div className="col-lg-12">
												<h5>{this.state.propertyType}</h5>
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
									}
								    </ul>
								</div>
							</div>
							{/*resp*/}
							<div className="col-lg-2 col-md-2 col-xs-6 col-sm-6 property propertyType1 hidden-lg hidden-md noPad">
							  	<div className="dropdown" id="dropdown">
						       		{this.state.checkPropValue === true ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
								    <button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12" type="button" data-toggle="dropdown">Property Type
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      	{
										<div className="col-lg-12 noPad">
										  	<div className="col-lg-12">
												<h5>{this.state.propertyType}</h5>
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
									}
								    </ul>
								</div>
							</div>
							{/*end*/}
							<div className="col-lg-2 col-md-2 col-xs-6 col-sm-6 noPad property">
							  	<div className="dropdown">
						       		{this.state.checkBudgetValue === true ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
							  	 	<button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12 col-sm-12" type="button" data-toggle="dropdown">Budget
								   		<b className="caret pull-right"></b>
								   	</button>
								    <ul className="dropdown-menu scrollable-menu col-lg-12 pad mt36">
									{
									    this.state.budgetList.map((budget,index)=>{
								    		return(
												<span key={index} className="col-lg-12 col-xs-12 col-md-12 col-sm-12 checkbg inputStyledbtn">
								    				<input type="radio" value={budget.value} id={"id-"+budget.value} ref="budget" name="budget" className="selectOption" checked={budget.checked} onChange={this.handleBudget.bind(this)} />&nbsp; <label htmlFor={"id-"+budget.value}>{budget.option}</label>
													<span className="radioBoxBlock"></span>
								    			</span>
								    			);
									    	})
								    }
								    </ul>
								</div>
							</div>
							<div className="col-lg-1 col-md-2 col-xs-6 col-sm-6 noPad property">
							  	<div className="dropdown">
						       		{this.state.flatType && this.state.flatType.length >0 ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12 pad" type="button" data-toggle="dropdown">BHK
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 pad mt36">
										<div className="col-md-12">
								    	{
							    			this.state.flatTypeList.map((flatType,index)=>{
								    			return(
													<span key={index} className="col-lg-12 col-xs-12 noPad inputStyledbtn">
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
							<div className="col-lg-2 col-md-2 col-xs-6 col-sm-6 noPad property">
							  	<div className="dropdown">
						       		{this.state.furnish ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12" type="button" data-toggle="dropdown">Furnished
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 mt36">
										<span className="col-lg-12 inputStyledbtn">
											<input type="radio" name="furnishedStatus" ref="" className="" id="fullFurnished" value="Fully furnished" onChange={this.handleFurnish.bind(this)}/>&nbsp; 
											<label htmlFor="fullFurnished">Fully Furnished<br /></label>
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
							<div className="col-lg-1 col-md-1 col-xs-6 col-sm-6 noPad property">
							  	<div className="dropdown">
						       		{this.state.floor ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12 " type="button" data-toggle="dropdown">Floor
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 pad mt36">
								    	{
								    		this.state.floorList.map((floor,index)=>{
									    		return(
													<span className="col-lg-12 col-xs-12 inputStyledbtn" key={index}>
										    			<input type="radio" value={floor.value} key={index} ref="floor" name="floor" id={floor.value} className="selectOption" onChange={this.handleFloor.bind(this)}/>&nbsp; <label htmlFor={floor.value}>{floor.option}</label>
														<span className="radioBoxBlock"></span>
													</span>
									    		);
									    	})
								    	}
								    </ul>
								</div>
							</div>
							<div className="col-lg-1 col-md-2 col-xs-6 col-sm-6 noPad property">
							  	<div className="dropdown">
						       		{this.state.propertyAge ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12" type="button" data-toggle="dropdown">Age
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36 pAge">
								    	{
								    		this.state.propertyAgeList.map((age,index)=>{
									    		return(
													<span className="col-lg-12 col-xs-12 inputStyledbtn" key={index}>
									    				<input type="radio" value={age.value} id={age.value} ref="age" name="propertyAge" className="selectOption" onChange={this.handleAge.bind(this)}/> &nbsp; <label htmlFor={age.value}>{age.option}</label>
														<span className="radioBoxBlock"></span>
									    			</span>
									    		);
									    	})
								    	}
								    </ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-2 col-xs-6 col-sm-6 noPad property">
							  	<div className="dropdown">
						       		{this.state.availability ? 
						       			<span className="badge badge-secondary badgeP">
						       			<i className="fa fa-check"></i></span> 
						       		: null
						       		}
									<button className="btn dropdown-toggle bgWhite col-lg-12 col-xs-12" type="button" data-toggle="dropdown">Availability
								    <b className="caret pull-right"></b></button>
								    <ul className="dropdown-menu col-lg-12 col-xs-12 mt36">
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="Immediate" ref="" className="" value="0" onChange={this.handleAvailability.bind(this)}/>&nbsp; <label htmlFor="Immediate">Immediate</label><br /><span className="radioBoxBlock"></span></span>
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="twoWeeks" ref="" className="" value="14" onChange={this.handleAvailability.bind(this)} />&nbsp; <label htmlFor="twoWeeks">2 Weeks</label><br /><span className="radioBoxBlock"></span></span>
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="twoFourWeeks" ref="" className="" value="30" onChange={this.handleAvailability.bind(this)}/>&nbsp; <label htmlFor="twoFourWeeks">2-4 Weeks</label><br /><span className="radioBoxBlock"></span></span>
										<span className="col-lg-12 inputStyledbtn"><input type="radio" name="availability" id="afterAMonth" ref="" className="" value="31" onChange={this.handleAvailability.bind(this)}/>&nbsp; <label htmlFor="afterAMonth">After a month</label><br /><span className="radioBoxBlock"></span></span>
								    </ul>
								</div>
							</div>
							  	<button className="btn bgWhite col-lg-1 col-xs-6" title="Reset" onClick={this.reset.bind(this)}><span className="glyphicon glyphicon-repeat"></span></button>
						</div>
					</div>
				</form>

			{/*-------------------Results------------------------*/}
				
				<div className="col-lg-12 col-md-10 col-xs-12 col-sm-12 noPad">
				{this.state.isLoading === false ?
					this.state.inputData && this.state.inputData.length>0 ? 
						<PropBox searchResult={this.state.inputData}/>				
					:
					<div className="boxmsg col-lg-8 col-lg-offset-2">
						<p> 
							Properties for this search options could not be found. <br/> 
							Please change the search filters and try again. 
						</p>
					</div>
					:
					<div className="col-lg-12 searchLoader text-center">
					<Loader
				         type="Oval"
				         color="#F5AD3E"
				         height="100"
				         width="100"
				      />
				    </div>  
				}
				</div>
			</div>
		);
	}
}

export default withRouter(SearchResults);