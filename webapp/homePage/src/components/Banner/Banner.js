import React, { Component } from 'react';
import "./banner.css";
import axios from 'axios';
import NavBar             from '../Navbar/Navbar.js';



export default class Banner extends Component {

	constructor(props){
		super(props);
		this.state={
			persons:[]

		}
	}
	componentDidMount() {
		axios.get('https://jsonplaceholder.typicode.com/users')
			 .then(res=>{
			 	// console.log(res.data);

			 	this.setState({persons:res.data});
			 })
	}

		 getTextValue(event){
		 	// axios.get()
		 		event.preventDefault();
		 		const propDetails={
		 		 searchbyaddress : this.refs.searchbyaddress.value,
				 searchbyproperty: parseInt(this.refs.searchbyproperty.value),
				 searchbybudget  : this.refs.searchbybudget.value,
		 		}
				console.log("propDetails",propDetails);

		 }
		searchListData(){
				
		 }
		 
	render() {
		return (
		  	<div className="">
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-primary banner "> 
				   <div className="searchboxcontainer mt240">
						<form action="" method="" >
							<div className="col-lg-12 col-md-12 col-sm-12 searchboxmain">
								<div className="col-lg-3 col-md-3 col-sm-12 noPaddingLR">
									<input type="text" className="form-control search-slt" ref ="searchbyaddress" placeholder="Enter City,Area" />
								</div>
								<div className="col-lg-3 col-md-3 col-sm-12 noPaddingLR">
									<select className="form-control search-budget" ref ="searchbyproperty" id="exampleFormControlSelect1">
										<option>Property Type</option>
										<option>1 BHK</option>
										<option>2 BHK</option>
										<option>3 BHK</option>
										<option>4 BHK</option>
										<option>5 BHK</option>
									</select>
								</div>
								<div className="col-lg-3 col-md-3 col-sm-12 noPaddingLR">
									<select className="form-control search-budget" ref ="searchbybudget" id="exampleFormControlSelect1">
										<option>Budget</option>
										<option>5000-10000</option>
										<option>10000-15000</option>
										<option>15000-20000</option>
										<option>20000-25000</option>
										<option>25000-30000</option>
										<option>30000-35000</option>
										<option>35000-40000</option>
										<option>40000-45000</option>
										<option>45000-50000</option>
									</select>
								</div>
								<div className="col-lg-3 col-md-3 col-sm-12 noPaddingLR">
									<button type="button" className="btn btn-danger wrn-btn" onClick={this.getTextValue.bind(this)}>Search</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
