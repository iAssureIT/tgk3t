import React , { Component }	from 'react';
import axios 					from 'axios';
import $ 						from "jquery";
import {withRouter, Link} 		from 'react-router-dom';
import { connect } 				from 'react-redux';

import './SearchResults.css';

class SearchResults extends Component {

	constructor(){
		super();
		this.state = {
			budgetList1 	: [],
			budgetList2 	: [],
			inputData  		: "",
			propertyType	: "Commercial-Sell",
			budget          : "",
			propertySubType : [],
			location        : "",
			floor           : "",
			constructionType: [],
			all 			: []
		}
		this.handleSearch = this.handleSearch.bind(this);
	}
	componentDidMount() {
		var data = JSON.parse(localStorage.getItem('searchData'));
		if(data)
		{
			this.setState({
				location		: data.location,
				budget 			: data.budget,
				propertySubType	: data.propertySubType,
				propertyType	: data.propertyType+"-"+data.transactionType,
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
					this.state.all = propertySubType.map((item,index)=>{
					var propPresent = this.state.propertySubType.find((obj)=>{
						return item.name === obj
					})
					console.log("propPresent",propPresent);
					var newObj = Object.assign({},item);
					if(propPresent){
						newObj.checked = true
					}else{
						newObj.checked = false
					}
					return newObj;
				})
				
			})
		
		}
					

		var formValues = {
			startRange:0,
			limitRange:6,
		}

		 axios
        .post('/api/properties/listofproperty/Residential/Sell')
        .then( (res) =>{
          this.setState({
          	inputData : res.data,
          },()=>{
          	console.log("inputData",this.state.inputData);
          })

        })
        .catch((error) =>{
          console.log("error = ", error);
        });	

		this.setState({
			budgetList1 : ["00 - 05 Lac","05 - 10 Lac","10 - 20 Lac","30 - 40 Lac",
						  "20 - 30 Lac", "30 - 40 Lac","40 - 50 Lac",
						  "50 - 60 Lac","60 - 70 Lac","70 - 80 Lac",
						  "80 - 99 Lac","1 - 1.2 Cr","1.2 - 1.4 Cr","1.4 - 1.6 Cr",
						  "1.6 - 1.8 Cr","1.8 - 1.99 Cr"] ,
			budgetList2 : ["5000","10000","15000","20000","25000","30000","40000","50000","60000","80000", "1 Lac", "1.2 Lac", "1.5 Lac"] 
		})



		 var $select = $(".floorOption");

		    for (var i=-2;i<=60;i++){
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
		})
		
		if(event.target.checked)
		{
			this.state.propertySubType.push(event.target.getAttribute('value'));
			this.state.constructionType.push(event.target.getAttribute('value'));
			// console.log("propertySubType",this.state.propertySubType);
			// console.log("constructionType",this.state.constructionType);
		}
		else{
			this.state.propertySubType.pop(event.target.getAttribute('value'));
			this.state.constructionType.pop(event.target.getAttribute('value'));
			// console.log("propertySubType",this.state.propertySubType);
			// console.log("constructionType",this.state.constructionType);
		}

	}


	render() {
		// console.log("floor",this.state.floor);
		// console.log("location",this.state.location);
		// console.log("budget",this.state.budget);
		// console.log("propertySubType",this.state.propertySubType);
		// console.log("propertyType",this.state.propertyType);
		console.log("all",this.state.all);
	
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
				<form>
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 searchDiv">
						{/*---------------Search Bar-------------------*/}
						<div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 searchBar">
							<div className="col-lg-2 col-md-1 col-xs-12 col-sm-12 noPad">
							  	<div className="dropdown">
									<select className="custom-select form-control"  ref="propertyType" placeholder="" id='select' name="propertyType" value={this.state.propertyType} onChange={this.handleSearch.bind(this)}>
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
							
							<div className="col-lg-4 col-md-3 col-xs-12 col-sm-12 propertyType noPad">
							  	<div className="dropdown" id="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Property Type
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 col-md-12 col-xs-12 col-sm-12 pad mt36">
							      		{this.state.propertyType === "Commercial-Rent" || this.state.propertyType === "Commercial-Sell" ?
										<div className="col-lg-12">
										  	<div className="col-lg-12">
												<h5>Commercial</h5>
												{
													this.state.all.map((data,index)=>{
														return(
															<span className="col-lg-6 noPad"><input type="checkBox" value={data.name} key={index} checked={data.checked} onChange={this.handleSearch.bind(this)}/>&nbsp;{data.name}</span>
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
															<span className="col-lg-6 noPad"><input type="checkBox" value={data.name} key={index} checked={data.checked} onChange={this.handleSearch.bind(this)}/>&nbsp;{data.name}</span>
														)
													})

												}
											</div>
										</div>
										}
								    </ul>
								</div>
							</div>


							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad">
							  	<div className="dropdown">
							    {this.state.propertyType === "Commercial-Sell" || this.state.propertyType === "Residential-Sell" ?
									<select className="custom-select form-control"  ref="budget" value={this.state.budget} name="budget" placeholder="" onChange={this.handleSearch.bind(this)}>
									   	<option value="" className="hidden">Budget</option>
							    			{this.state.budgetList1.map((budget,index)=>{
									    		return(
									    				<option value={budget} key={index} className="selectOption">{budget}</option>
									    			);
									    		})
							    			}
									</select>
									:
									<select className="custom-select form-control"  ref="budget" name="budget" value={this.state.budget} placeholder="" onChange={this.handleSearch.bind(this)}>
										<option value="" className="hidden">Budget</option>
										{this.state.budgetList2.map((budget,index)=>{
									    		return(
									    				<option value={budget} key={index} className="selectOption">{budget}</option>
									    			);
									    		})
										}
									</select>
								}	
								</div>
							</div>
						
							<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 noPad">
							  	<div className="dropdown">
									<select className="custom-select form-control floorOption" ref="floor" name="floor" value={this.state.floor}  id='' onChange={this.handleSearch.bind(this)}>
									  	<option value="" className="hidden">Floor</option>
									</select>
								</div>
							</div>

							<div className="col-lg-2 col-md-1 col-xs-12 col-sm-12 areaBtn noPad">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Area
								    <span className="caret caretMl"></span></button>
								    <ul className="dropdown-menu col-lg-12 noPad mt36">
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" placeholder="Min"/>
							      		<input type="text" className="col-lg-3 col-md-3 col-xs-12 col-sm-12 marginLeft" placeholder="Max"/>
							      		<span className="col-lg-3 col-md-3 col-xs-12 col-sm-12 sqftMt">Sqft</span>
							      		<button type="button" className="col-lg-2 col-md-2 col-xs-12 col-sm-12 goBtn btn">Go</button>
								    </ul>
								</div>
							</div>

							<div className="col-lg-2 col-md-3 col-xs-12 col-sm-12 constructionBtn noPad">
							  	<div className="dropdown">
								    <button className="btn dropdown-toggle bgWhite col-lg-12" type="button" data-toggle="dropdown">Construction Status
								    <span className="caret caretMlC"></span></button>
								    <ul className="dropdown-menu col-lg-10 col-md-12 col-xs-12 col-sm-12 pad mt36">
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox" value="Ready To Move" onChange={this.handleSearch.bind(this)}/> Ready To Move</div>
								    	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><input type="checkBox" value="Under Construction" onChange={this.handleSearch.bind(this)}/> Under Construction</div>
								    </ul>
								</div>
							</div>
							
						</div>

					</div>
				</form>

			{/*-------------------Results------------------------*/}
				<div className="col-lg-12  col-md-10 col-xs-12 col-sm-12 searchResults noPad">
					<div className="col-lg-12 col-md-1 col-xs-12 col-sm-12 result noPad">
						{this.state.inputData && this.state.inputData.length>0  ?
							this.state.inputData.map((myProperty,index)=>{
							return(
								<div key={index} className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox bgWhite">			
									<div className="row pull-right topRightTriangle" id="triangle-topright">				</div>	
										<div className="row">
											<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">				
												{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-right ">
													<h5 className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pull-right intrestBtn">
														<i  className="fa fa-heart-o heartBtn" onClick={this.heartClick.bind(this)}></i>&nbsp;<span>{this.state.heartStatus}</span>
													</h5>
												</div>*/}
											
											<img alt=""  className="propertyImgDiv" src={myProperty.gallery.Images[0]} />
										</div>
										<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 noPad">				
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
												<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 propertySubText1">				
													<i className="fa fa-inr"></i>&nbsp;
													<span>
														{myProperty.financial && myProperty.financial.totalPrice ? myProperty.financial.totalPrice : "-"}
													</span>
												</div>

														<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 propertySubText1">				
															{
																myProperty.propertyDetails && myProperty.propertyDetails.bedrooms ? myProperty.propertyDetails.bedrooms 
																: 
																"-"
															}
															&nbsp;BHK
															&nbsp;
															<i className="fa fa-map-marker text-warning"/>
															&nbsp;
															{myProperty.propertyLocation  &&  myProperty.propertyLocation.city && myProperty.propertyLocation.society
																? 
																myProperty.propertyLocation.society +", "+myProperty.propertyLocation.city 
																:
																 "-"
															}
														</div>
													
														<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noPad pull-right">				
															{myProperty.transactionType ?
																myProperty.transactionType ==="Sell" ?
																<span className="pull-right text-right col-lg-8  noPad transactionLabel">Sale</span>
																:
																myProperty.transactionType ==="Rent" ?
																<span className="pull-right text-right col-lg-8 noPad transactionLabel">{myProperty.transactionType}</span>
																:
																null
															:
															"-"
															}
														</div>	
														

													</div>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/bed.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">
																{myProperty.propertyDetails && myProperty.propertyDetails.bedrooms ? myProperty.propertyDetails.bedrooms : "-"}
															</span>
															<br/> Beds
														</div>
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">
																{myProperty.propertyDetails && myProperty.propertyDetails.bathrooms ? myProperty.propertyDetails.bathrooms : "-"}
															</span>
															<br/>Baths
														</div>
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">{myProperty.floor? myProperty.floor :"-"}  /  {myProperty.floor? myProperty.totalFloor :"-"}</span><br/>Floor / Total Floor
														</div>
														<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
															<img alt=""  src="/images/Icons/face.png" className="imgIcon"/>&nbsp;
															<span className="propertySubText1">{myProperty.propertyDetails? myProperty.propertyDetails.facing :"-"}</span><br/>Facing
														</div>
													</div>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal mt20">				
														<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
															Super Area : <b>{myProperty.propertyDetails ? myProperty.propertyDetails.superArea : "-"}&nbsp;Sqft</b>
														</div>
														<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
															Possession by : <span className="propertySubText2">{myProperty.propertyDetails ? myProperty.propertyDetails.availableFrom : "-"}</span>
														</div>
														<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">				
				                                      		<Link to={"/PropertyProfile/"+myProperty._id} target="_blank">
																<button className="btn pull-right btnDetails">Details &nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									)
								})
							:
							<div className="col-lg-12 text-center"><h5>Search reults will be shown <b>here...</b></h5></div>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SearchResults);
