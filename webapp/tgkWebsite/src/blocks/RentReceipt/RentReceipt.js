import React , { Component }from 'react';
import axios                from 'axios';
import {withRouter}         from 'react-router-dom';

import './RentReceipt.css';

// import 'bootstrap/js/tab.js';
// import "bootstrap/dist/css/bootstrap.min.css";


class RentReceipt extends Component{

		constructor(props){
			super(props);
			this.state = {

			};
		}

	    componentDidMount(){
		      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
		  }

		createUser6(event){
			event.preventDefault();
			console.log("abc");
			const formValues = {
				"tenant_name" 			: this.refs.tenant_name.value,
				"owner_name" 			: this.refs.owner_name.value,
				"tenant_phone" 			: this.refs.tenant_phone.value,
				"owner_phone" 			: this.refs.owner_phone.value,
				"rent" 					: this.refs.rent.value,
				"owner_plan" 			: this.refs.owner_plan.value,
				"property_address" 		: this.refs.property_address.value,
				"owner_address" 		: this.refs.owner_address.value,
				"receipt_start_date" 	: this.refs.receipt_start_date.value,
				"receipt_end_date" 		: this.refs.receipt_end_date.value,
				
				
			};
			//this.props.fun(formValues);
			axios
				.post('http://jsonplaceholder.typicode.com/posts',{ formValues })
				.then( (res) =>{
					console.log(res);
					if(res.status == 201){
						//alert("Data inserted successfully!")
						this.refs.tenant_name.value = '';
						this.refs.owner_name.value = '';
						this.refs.tenant_phone.value 	  = '';
						this.refs.owner_phone.value 	  = '';
						this.refs.rent.value 	  = '';
						this.refs.owner_plan.value 	  = '';
						this.refs.property_address.value 	  = '';
						this.refs.owner_address.value 	  = '';
						this.refs.receipt_start_date.value 	  = '';
						this.refs.receipt_end_date.value 	  = '';
						
					}
				})
				.catch((error)=>{
				                        console.log("error = ",error);
				                        if(error.message === "Request failed with status code 401")
				                        {
				                             swal("Your session is expired! Please login again.","", "error");
				                             this.props.history.push("/");
				                        }
				});
		}

	render() {
    return (
      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content margTop">
		<form onSubmit={this.createUser6.bind(this)} id="form">
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
				<label className="title_sz">Create Rent Receipts</label>
				<label>Looking for rent receipts for tax saving? Do it in a click by filling the form 
				below, take the print of the generated pdf and you are done. Easy 😊</label>
			  </div>
			</div>

		  	<div class="row detailsRow rw_marg_btm">
				<div class="col-lg-1 col-md-1 col-sm-1"></div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Tenant Name</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control " type="text" name="tenant_name" ref="tenant_name" id="tenantName" placeholder="Tenant's Name" required=""/>
						</div>
					</div>
				</div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Owner Name</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control" type="text" name="owner_name" ref="owner_name" id="ownerName" placeholder="Owner's Name" required=""/>
						</div>
					</div>
				</div>
			</div>

			<div class="row detailsRow rw_marg_btm">
				<div class="col-lg-1 col-md-1 col-sm-1"></div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Tenant Phone</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control " type="text" name="tenant_phone" ref="tenant_phone" id="tenantName" placeholder="to receive sms with receipts" required=""/>
						</div>
					</div>
				</div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Owner Phone</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control" type="text" name="owner_phone" ref="owner_phone" id="ownerName" placeholder="Owner 10 digit mobile number" required=""/>
						</div>
					</div>
				</div>
			</div>

			<div class="row detailsRow rw_marg_btm">
				<div class="col-lg-1 col-md-1 col-sm-1"></div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Rent</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control " type="text" name="rent" ref="rent" id="tenantName" placeholder="Monthly Rent in Rs." required=""/>
						</div>
					</div>
				</div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Owner Plan</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control" type="text" name="owner_plan" ref="owner_plan" id="ownerName" placeholder="Owner's Plan" required=""/>
						</div>
					</div>
				</div>
			</div>

			<div class="row detailsRow rw_marg_btm">
				<div class="col-lg-1 col-md-1 col-sm-1"></div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Rented Property Address</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<textarea class="form-control " cols="50" rows="6" type="" name="property_address" ref="property_address" id="tenantName" placeholder="Monthly Rent in Rs." required=""/>
						</div>
					</div>
				</div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Owner Address</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<textarea class="form-control" cols="50" rows="6" type="textarea" name="owner_address" ref="owner_address" id="ownerName" placeholder="Owner's Plan" required=""/>
						</div>
					</div>
				</div>
			</div>

			<div class="row detailsRow rw_marg_btm">
				<div class="col-lg-1 col-md-1 col-sm-1"></div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Receipt Start Date</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control " type="date" name="receipt_start_date" ref="receipt_start_date" id="tenantName" placeholder="Monthly Rent in Rs." required=""/>
						</div>
					</div>
				</div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Receipt End Date</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control" type="date" name="receipt_end_date" ref="receipt_end_date" id="ownerName" placeholder="Owner's Plan" required=""/>
						</div>
					</div>
				</div>
			</div>

			<div class="row detailsRow rw_marg_btm">
				<div class="col-lg-1 col-md-1 col-sm-1"></div>
				<div class="col-lg-5 col-md-5 col-sm-5">
					<div class="row">
						<div class="col-lg-4 col-md-4">
							<div class="formLabel inputBoxKey">Email</div>
						</div>
						<div class="col-lg-8 col-md-8">
							<input class="form-control " type="email" name="email" ref="email" id="tenantName" placeholder="Email to receive PDF link" required=""/>
						</div>
					</div>
				</div>
				
			</div>

			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="form-group col-lg-12">
				  <div className="col-lg-8">
					  <div className="col-lg-8">
					       <button type="submit" classNameName="btn">Generate Rent Receipt Now</button>
					  </div>
				  </div>
				</div>
			</div>
			</div>
		</form>
	</div>

		);
	}
	


}

export default withRouter(RentReceipt);